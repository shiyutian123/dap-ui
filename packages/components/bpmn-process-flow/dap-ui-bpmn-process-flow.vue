<!--
 * @Author: your name
 * @Date: 2020-03-01 14:05:31
 * @LastEditTime: 2020-03-22 20:40:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /dap-vue-ui/packages/components/bpmn-process-flow/dap-ui-bpmn-process-flow.vue
 -->
<template>
  <div class="bpmn-process-flow">
    <dap-ui-modal v-bind="modalConfig" @ok="handleOk" @cancel="handleCancel">
      <div class="process-flow-content">
        <div class="canvas" id="js-canvas"></div>
      </div>
      <div class="masking" v-show="loading">
        <a-spin tip="流程图加载中..." size="large" />
        <!-- <nz-spin nzSimple nzSize="large" nzTip="脚本加载中..."></nz-spin> -->
      </div>
    </dap-ui-modal>
  </div>
</template>

<script>
import * as X2JS from "x2js";

var BpmnJS;
export default {
  name: "DapUiBpmnProcessFlow",
  props: {
    extraProp: {
      type: Object
    },
    loading: {
      type: Boolean,
      default: function() {
        return false;
      }
    }
  },
  data() {
    return {
      primaryColor: 'rgb(48, 129, 251)',
      modeler: undefined,
      modalConfig: {
        visible: false,
        title: "流程图",
        size: "large",
        modalClass: "dap-ui-bpmn-process-flow"
      }
    };
  },
  methods: {
    loadResources({ domain, callback }) {
      this.modalConfig.visible = true;
      this.$asyncLoadResource(
        `${domain}/bpmn-js/diagram-js.css`,
        "link",
        "diagram-js-css"
      ).then();
      this.$asyncLoadResource(
        `${domain}/bpmn-js/css/bpmn.css`,
        "link",
        "bpmn-css"
      ).then();
      this.$asyncLoadResource(
        `${domain}/bpmn-js/bpmn-modeler.development.js`,
        "script",
        "bpmnjs"
      ).then(() => {
        BpmnJS = window.BpmnJS;
        this.initBpmnCanvas();
        callback && callback();
      });
    },
    initBpmnCanvas() {
      this.modeler = new BpmnJS({
        container: "#js-canvas"
      });
      const bjsPoweredByDom = document.querySelectorAll(".bjs-powered-by")[0];
      if (bjsPoweredByDom) {
        bjsPoweredByDom.style.display = "none";
      }
      const djsPaletteDom = document.querySelectorAll(".djs-palette")[0];
      if (djsPaletteDom) {
        djsPaletteDom.style.display = "none";
      }
    },
    importDiagramForJson(diagramJSON) {
      const x2js = new X2JS();
      const xml = x2js.js2xml(diagramJSON);
      this.importDiagram(xml).then(() => {
        setTimeout(() => {
          const djsGroup = document.querySelectorAll(".djs-group");
          for (let i = 0; i < djsGroup.length; i++) {
            djsGroup[i].addEventListener("click", e => {
              e.stopPropagation();
            });
            djsGroup[i].addEventListener("dblclick", e => {
              e.stopPropagation();
            });
            djsGroup[i].addEventListener("mousedown", e => {
              e.stopPropagation();
            });
          }
          const djsSegmentDraggers = document.querySelectorAll(
            ".djs-segment-dragger"
          );
          for (let i = 0; i < djsSegmentDraggers.length; i++) {
            djsSegmentDraggers[i].addEventListener("click", e => {
              e.stopPropagation();
            });
            djsSegmentDraggers[i].addEventListener("dblclick", e => {
              e.stopPropagation();
            });
            djsSegmentDraggers[i].addEventListener("mousedown", e => {
              e.stopPropagation();
            });
          }
          const rectDoms = document.getElementsByTagName("rect");
          for (let i = 0; i < rectDoms.length; i++) {
            rectDoms[i].addEventListener("click", e => {
              e.stopPropagation();
            });
            rectDoms[i].addEventListener("dblclick", e => {
              e.stopPropagation();
            });
            rectDoms[i].addEventListener("mousedown", e => {
              e.stopPropagation();
            });
          }
        });
      });
    },
    importDiagram(diaramXML) {
      return new Promise((resolve, reject) => {
        this.modeler.importXML(diaramXML, err => {
          if (err) {
            reject(err);
          }
          const canvas = this.modeler.get("canvas");
          // zoom to fit full viewport
          canvas.zoom("fit-viewport");
          resolve();
        });
      });
    },
    handleCancel() {
      this.modalConfig.visible = false;
      this.modeler.destroy();
      this.modeler = undefined;
    },
    handleOk() {
      this.modalConfig.visible = false;
    },
    fillColor() {
      const nodePath = this.extraProp.nodePath;
      if (!nodePath || nodePath.length === 0) {
        return;
      }
      const shapeElements = document.querySelectorAll(".djs-element.djs-shape");
      const connElements = document.querySelectorAll(
        ".djs-element.djs-connection"
      );
      // TODO: 替换流程节点的样式为产品样式
      this.replaceNodeToCustom(
        shapeElements,
        this.extraProp.nodes
      );
      this.replaceConnToCustom();
      this.replaceGatewayToCustom();

      for (let i = 0; i < nodePath.length; i++) {
        const node = nodePath[i];
        for (let j = 0; j < shapeElements.length; j++) {
          try {
            if (
              this.getEleDataId(shapeElements[j]) === node.to ||
              this.getEleDataId(shapeElements[j])
                .toUpperCase()
                .indexOf(node.to) > -1
            ) {
              const djsVisualDom = shapeElements[j].querySelectorAll(
                ".djs-visual"
              )[0];
              if (node.to === "START" || node.to === "END") {
                djsVisualDom.getElementsByTagName("circle")[0].style.stroke =
                  `${this.primaryColor}`;
                djsVisualDom.getElementsByTagName("text")[0].style.fill =
                  `${this.primaryColor}`;
              } else {
                djsVisualDom.getElementsByTagName("rect")[0].style.stroke =
                  `${this.primaryColor}`;
                if (djsVisualDom.getElementsByTagName("path")[0]) {
                  djsVisualDom.getElementsByTagName("path")[0].style.fill =
                    `${this.primaryColor}`;
                }
                djsVisualDom.getElementsByTagName("text")[0].style.fill =
                  "rgb(255, 255, 255)";
              }
            }
          } catch (err) {
            console.error(err);
          }
        }
        const conns = this.extraProp.connects.filter(
          item => item.endNodeId === node.to
        );
        conns.forEach(conn => {
          if (conn.startNodeId.indexOf("ExclusiveGateway") > -1) {
            let exclusiveGateway = this.extraProp
              .definitions.process.exclusiveGateway;
            if (!Array.isArray(exclusiveGateway) && exclusiveGateway) {
              exclusiveGateway = [exclusiveGateway];
            }
            exclusiveGateway = exclusiveGateway.filter(
              item => item._id === conn.startNodeId
            );
            let bingonGatway, incoming, incomingConn;
            for (const gatway of exclusiveGateway) {
              if (bingonGatway) {
                break;
              }
              incoming = exclusiveGateway.filter(
                item => item._id === conn.startNodeId
              )[0].incoming;
              if (!Array.isArray(incoming) && incoming) {
                incoming = [incoming];
              }
              incoming.forEach(inc => {
                incomingConn = this.extraProp.connects.filter(
                  item => item.connId === inc.__text
                )[0];
                if (incomingConn.startNodeId === node.from) {
                  bingonGatway = gatway;
                }
              });
            }
            if (bingonGatway) {
              for (let k = 0; k < shapeElements.length; k++) {
                if (this.getEleDataId(shapeElements[k]) === bingonGatway._id) {
                  const gDom = shapeElements[k].querySelectorAll(
                    ".djs-visual"
                  )[0];
                  gDom.getElementsByTagName("polygon")[0].style.stroke =
                    `${this.primaryColor}`;
                  gDom.getElementsByTagName("path")[0].style.fill =
                    `${this.primaryColor}`;
                  gDom.getElementsByTagName("path")[0].style.stroke =
                    `${this.primaryColor}`;
                }
              }
              for (let k = 0; k < connElements.length; k++) {
                if (
                  this.getEleDataId(connElements[k]) === incomingConn.connId
                ) {
                  const djsVisualDom = connElements[k].querySelectorAll(
                    ".djs-visual"
                  )[0];
                  djsVisualDom.getElementsByTagName("path")[0].style.stroke =
                    `${this.primaryColor}`;
                  djsVisualDom.getElementsByTagName("path")[0].style[
                    "marker-end"
                  ] = `url("#sequenceflow-blue")`;
                }
              }

              let outgoing = bingonGatway.outgoing;
              if (!Array.isArray(outgoing) && outgoing) {
                outgoing = [outgoing];
              }
              outgoing = outgoing.filter(item => item.__text === conn.connId);
              outgoing.forEach(out => {
                const outgoingConn = this.extraProp.connects.filter(
                  item => item.connId === out.__text
                )[0];
                if (outgoingConn && outgoingConn.endNodeId === node.to) {
                  for (let k = 0; k < connElements.length; k++) {
                    if (
                      this.getEleDataId(connElements[k]) === outgoingConn.connId
                    ) {
                      const djsVisualDom = connElements[k].querySelectorAll(
                        ".djs-visual"
                      )[0];
                      const pathDom = djsVisualDom.getElementsByTagName(
                        "path"
                      )[0];
                      pathDom.style.stroke = `${this.primaryColor}`;
                      pathDom.style["marker-end"] = `url("#sequenceflow-blue")`;
                      if (
                        pathDom.style["marker-start"] &&
                        pathDom.style["marker-start"].indexOf(
                          "conditional-default-flow-marker-white-gray"
                        ) > -1
                      ) {
                        pathDom.style[
                          "marker-start"
                        ] = `url("#conditional-default-flow-marker-white-blue")`;
                      }
                    }
                  }
                }
              });
            }
          } else {
            for (let k = 0; k < connElements.length; k++) {
              if (
                this.getEleDataId(connElements[k]) === conn.connId &&
                conn.startNodeId === node.from
              ) {
                const djsVisualDom = connElements[k].querySelectorAll(
                  ".djs-visual"
                )[0];
                djsVisualDom.getElementsByTagName("path")[0].style.stroke =
                  `${this.primaryColor}`;
                djsVisualDom.getElementsByTagName("path")[0].style[
                  "marker-end"
                ] = `url("#sequenceflow-blue")`;
              }
            }
          }
        });
      }
    },
    replaceNodeToCustom(shapeElements, nodePath) {
      const svgDom = document
        .getElementById("js-canvas")
        .getElementsByTagName("svg")[0];
      let defsDom = svgDom.getElementsByTagName("defs")[0];
      const linerGradientStr = `
        <marker id="conditional-default-flow-marker-white-gray" viewBox="0 0 20 20" refX="0" refY="10" markerWidth="10" markerHeight="10" orient="auto"><path d="M 6 4 L 10 16" style="fill: rgb(205, 205, 205); stroke-width: 1px; stroke-linecap: round; stroke-dasharray: 10000, 1; stroke: rgb(205, 205, 205);"></path></marker>
        <marker id="conditional-default-flow-marker-white-blue" viewBox="0 0 20 20" refX="0" refY="10" markerWidth="10" markerHeight="10" orient="auto"><path d="M 6 4 L 10 16" style="fill: ${this.primaryColor}; stroke-width: 1px; stroke-linecap: round; stroke-dasharray: 10000, 1; stroke: ${this.primaryColor};"></path></marker>
        <marker id="sequenceflow-gray" viewBox="0 0 20 20" refX="11" refY="10" markerWidth="10" markerHeight="10" orient="auto">
            <circle cx="6" cy="10" r="4.5" style="stroke: rgb(205, 205, 205);fill: rgb(205, 205, 205);"></circle>
        </marker>
        <marker id="sequenceflow-blue" viewBox="0 0 20 20" refX="11" refY="10" markerWidth="10" markerHeight="10" orient="auto">
            <circle cx="6" cy="10" r="4.5" style="stroke: ${this.primaryColor};fill: ${this.primaryColor};"></circle>
        </marker>
        <marker id="sequenceflow-start" viewBox="0 0 20 20" refX="11" refY="10" markerWidth="10" markerHeight="10" orient="auto">
            <circle cx="6" cy="10" r="4.5" style="stroke: url('#red-orange');fill: url('#red-orange');"></circle>
        </marker>
        <marker id="sequenceflow1" viewBox="0 0 20 20" refX="11" refY="10" markerWidth="10" markerHeight="10" orient="auto">
            <circle cx="6" cy="10" r="4.5" style="stroke: url('#node1');fill: url('#node1');"></circle>
        </marker>
        <marker id="sequenceflow2" viewBox="0 0 20 20" refX="11" refY="10" markerWidth="10" markerHeight="10" orient="auto">
            <circle cx="6" cy="10" r="4.5" style="stroke: url('#node2');fill: url('#node2');"></circle>
        </marker>
        <marker id="sequenceflow3" viewBox="0 0 20 20" refX="11" refY="10" markerWidth="10" markerHeight="10" orient="auto">
            <circle cx="6" cy="10" r="4.5" style="stroke: url('#node3');fill: url('#node3');"></circle>
        </marker>
        <marker id="sequenceflow4" viewBox="0 0 20 20" refX="11" refY="10" markerWidth="10" markerHeight="10" orient="auto">
            <circle cx="6" cy="10" r="4.5" style="stroke: url('#node4');fill: url('#node4');"></circle>
        </marker>
        <linearGradient id="node1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:rgb(62,147,157);
            stop-opacity:1"></stop>
            <stop offset="100%" style="stop-color:rgb(223,237,242);
            stop-opacity:1"></stop>
        </linearGradient>
        <linearGradient id="node2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:rgb(82,61,141);
            stop-opacity:1"></stop>
            <stop offset="100%" style="stop-color:rgb(255,211,235);
            stop-opacity:1"></stop>
        </linearGradient>
        <linearGradient id="node3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:rgb(44,124,239);
            stop-opacity:1"></stop>
            <stop offset="100%" style="stop-color:rgb(185,222,252);
            stop-opacity:1"></stop>
        </linearGradient>
        <linearGradient id="node4" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:rgb(250,134,126);
            stop-opacity:1"></stop>
            <stop offset="100%" style="stop-color:rgb(255,229,202);
            stop-opacity:1"></stop>
        </linearGradient>
        <linearGradient id="red-orange" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:rgb(255,90,0);
            stop-opacity:1"></stop>
            <stop offset="100%" style="stop-color:rgb(255,255,0);
            stop-opacity:1"></stop>
        </linearGradient>
        `;
      if (defsDom) {
        defsDom.innerHTML = defsDom.innerHTML + linerGradientStr;
      } else {
        defsDom = document.createElement("defs");
        defsDom.innerHTML = linerGradientStr;
        svgDom.appendChild(defsDom);
      }
      let nodeStep = 0;
      const linerGradients = ["node1", "node2", "node3", "node4"];
      for (let i = 0; i < shapeElements.length; i++) {
        const shapeElement = shapeElements[i];
        const elementId = this.getEleDataId(shapeElement);
        if (elementId.indexOf("Participant_") > -1) {
          const djsVisualDom = shapeElement.querySelectorAll(".djs-visual")[0];
          djsVisualDom.getElementsByTagName("rect")[0].style.stroke = "none";
          djsVisualDom.getElementsByTagName("polyline")[0].style.stroke =
            "none";
        }
        if (elementId.indexOf("Task_") > -1) {
          // 从nodes中找到对应的id的node
          const node = nodePath.filter(item => item.nodeId === elementId)[0];
          // 替换节点
          const index = nodeStep++ % 4;
          const linearGradient = linerGradients[index];
          node.linearGradient = linearGradient;
          node.markerEnd = `sequenceflow${index + 1}`;
          let icon = ``;
          if (node.nodeStatus === "approving") {
            if (this.isIE()) {
              icon = `<text lineheight="1.2" class="djs-label" style="font-family: Arial, sans-serif;font-size: 12px;font-weight: normal;fill: rgb(255, 0, 28);"><tspan x="84" y="4">审批中</tspan></text>`;
            } else {
              icon = `<image x="90" y="-5" width="16" xlink:href="./assets/approving.png" />`;
            }
          } else if (typeof node.nodeStatus !== "undefined") {
            if (this.isIE()) {
              icon = `<text lineheight="1.2" class="djs-label" style="font-family: Arial, sans-serif;font-size: 12px;font-weight: normal;fill: rgb(137, 189, 119);"><tspan x="84" y="4">通过</tspan></text>`;
            } else {
              icon = `<image x="90" y="-5" width="16" xlink:href="./assets/approvePass.jpg" />`;
            }
          }
          const nodeStr = `<g class="djs-visual"><rect x="0" y="0" width="100" height="80" rx="2" ry="2" style="stroke: rgb(226, 226, 226);stroke-width: 2px;fill: white;"></rect><path d="M0.5,27.5 L99.5,27.5 L99.5,2 C99.5,1.17157288 98.8284271,0.5 98,0.5 L2,0.5 C1.17157288,0.5 0.5,1.17157288 0.5,2 L0.5,27.5 Z" style="
                fill: rgb(226, 226, 226);
                "></path><text lineheight="1.2" class="djs-label" style="font-family: Arial, sans-serif;font-size: 12px;font-weight: normal;fill: rgb(140, 140, 140);"><tspan x="10" y="18">${node.name}</tspan></text>${icon}<text x="10" y="46" lineheight="1.2" class="djs-label" style="font-family: Arial, sans-serif;font-size: 8px;font-weight: normal;fill: rgb(0, 0, 0);">
                <tspan>审批类型：${node.typeName}</tspan>
                </text><text x="10" y="68" lineheight="1.2" class="djs-label" style="font-family: Arial, sans-serif;font-size: 8px;font-weight: normal;fill: rgb(0, 0, 0);">
                <tspan>审批人类型：${node.approveTypeMeaning}</tspan>
                </text>
                </g>`;
          // const parser = new DOMParser();
          // shapeElement.removeChild(shapeElement.querySelectorAll('.djs-visual')[0]);
          // shapeElement.appendChild(parser.parseFromString(nodeStr, 'image/svg+xml').getElementsByTagName('g')[0]);
          // shapeElement.innerHTML = nodeStr;

          const dummy = document.createElement("div");
          dummy.innerHTML = "<svg>" + nodeStr + "</svg>";
          const svgChildNodes = dummy.childNodes[0].childNodes;
          shapeElement.removeChild(
            shapeElement.querySelectorAll(".djs-visual")[0]
          );
          shapeElement.appendChild(svgChildNodes[0]);
        }
        if (
          (elementId.indexOf("StartEvent_") > -1 ||
            elementId.indexOf("EndEvent_") > -1) &&
          elementId.indexOf("_label") === -1
        ) {
          let nodeStr;
          if (elementId.indexOf("StartEvent_") > -1) {
            // const name = this.extraProp.processName + '录入';
            // nodeStr = `<g class="djs-visual"><rect x="0" y="0" width="100" height="80" rx="2" ry="2" style="stroke: url('#red-orange');stroke-width: 2px;fill: url('#red-orange');"></rect>
            // <rect x="10" y="20" width="80" height="40" rx="8" ry="8" style="
            //     fill: rgba(0, 0, 0, .2);
            // "></rect>
            // <text x="14" y="44" lineheight="1.2" class="djs-label" style="font-family: Arial, sans-serif;font-size: 8px;font-weight: normal;fill: rgb(255, 255, 255);">${name}</text></g>`;
            nodeStr = `<g class="djs-visual"><circle cx="18" cy="18" r="18" style="stroke: ${this.primaryColor};stroke-width: 2px;fill: white;fill-opacity: 0.95;"></circle><text x="10" y="21" lineheight="1.2" class="djs-label" style="font-family: Arial, sans-serif;font-size: 8px;font-weight: normal;fill: ${this.primaryColor};">开始</text></g>`;
          } else {
            // const name = '流程结束';
            // nodeStr = `<g class="djs-visual"><rect x="0" y="0" width="100" height="80" rx="2" ry="2" style="stroke: url('#red-orange');stroke-width: 2px;fill: url('#red-orange');"></rect>
            // <rect x="10" y="20" width="80" height="40" rx="8" ry="8" style="
            //     fill: rgba(0, 0, 0, .2);
            // "></rect>
            // <text x="32" y="45" lineheight="1.2" class="djs-label" style="font-family: Arial, sans-serif;font-size: 10px;font-weight: normal;fill: rgb(255, 255, 255);">${name}</text></g>`;
            nodeStr = `<g class="djs-visual"><circle cx="18" cy="18" r="18" style="stroke: rgb(226, 226, 226);stroke-width: 2px;fill: white;fill-opacity: 0.95;"></circle><text x="10" y="21" lineheight="1.2" class="djs-label" style="font-family: Arial, sans-serif;font-size: 8px;font-weight: normal;fill: rgb(226, 226, 226);">结束</text></g>`;
          }
          // const transformArr = shapeElement.getAttribute('transform').split(' ');
          // transformArr[transformArr.length - 1] = `${parseInt(transformArr[transformArr.length - 1].substr(0, transformArr[transformArr.length - 1].length - 1)) - 22})`;
          // shapeElement.setAttribute('transform', transformArr.join(' '));

          // shapeElement.innerHTML = nodeStr;

          const dummy = document.createElement("div");
          dummy.innerHTML = "<svg>" + nodeStr + "</svg>";
          const svgChildNodes = dummy.childNodes[0].childNodes;
          shapeElement.removeChild(
            shapeElement.querySelectorAll(".djs-visual")[0]
          );
          shapeElement.appendChild(svgChildNodes[0]);
        } else if (elementId.indexOf("_label") > -1) {
          shapeElement
            .querySelectorAll(".djs-visual")[0]
            .getElementsByTagName("text")[0].style.fill = "transparent";
        }
      }
      // this.resetTaskNodeOffset(shapeElements);
      // this.resetConnectionOffset();
    },
    replaceConnToCustom() {
      const shapeElements = document.querySelectorAll(
        ".djs-element.djs-connection"
      );
      for (let i = 0; i < shapeElements.length; i++) {
        const pathDom = shapeElements[i]
          .querySelectorAll(".djs-visual")[0]
          .getElementsByTagName("path")[0];
        pathDom.style.stroke = `rgb(236, 236, 236)`;
        pathDom.style["marker-end"] = `url('#sequenceflow-gray')`;
        if (
          pathDom.style["marker-start"] &&
          pathDom.style["marker-start"].indexOf(
            "conditional-default-flow-marker-white-black"
          ) > -1
        ) {
          pathDom.style[
            "marker-start"
          ] = `url("#conditional-default-flow-marker-white-gray")`;
        }
      }
    },
    replaceGatewayToCustom() {
      const shapeElements = document.querySelectorAll(".djs-element.djs-shape");
      for (let i = 0; i < shapeElements.length; i++) {
        const shapeElement = shapeElements[i];
        const elementId = this.getEleDataId(shapeElement);
        if (elementId.indexOf("Gateway") > -1) {
          const djsConnVisualDom = shapeElement.querySelectorAll(
            ".djs-visual"
          )[0];
          djsConnVisualDom.getElementsByTagName("polygon")[0].style.stroke =
            "rgb(226, 226, 226)";
          djsConnVisualDom.getElementsByTagName("path")[0].style.stroke =
            "rgb(226, 226, 226)";
          djsConnVisualDom.getElementsByTagName("path")[0].style.fill =
            "rgb(226, 226, 226)";
        }
      }
    },
    getEleDataId(ele) {
      if (ele.dataset) {
        return ele.dataset.elementId;
      } else {
        return ele.getAttribute("data-element-id");
      }
    },
    isIE() {
      return "ActiveXObject" in window;
    }
  }
};
</script>
<style src="./index.less" lang="less"></style>
