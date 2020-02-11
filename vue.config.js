/*
 * @Author: DevinShi
 * @Date: 2020-02-06 03:24:53
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2020-02-11 19:30:02
 * @Description: file content description
 */
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
const MarkdownItContainer = require("markdown-it-container");
const MarkdownItCheckBox = require("markdown-it-task-checkbox");
const MarkdownItDec = require("markdown-it-decorate");
// const ConcatPlugin = require("webpack-concat-plugin");
// const CompressionPlugin = require("compression-webpack-plugin");

/**
 * 增加 hljs 的 classname
 */
const wrapCustomClass = function(render) {
  return function(...args) {
    return render(...args)
      .replace('<code class="', '<code class="hljs ')
      .replace("<code>", '<code class="hljs">');
  };
};

/**
 * Format HTML string
 */
const convertHtml = function(str) {
  return str.replace(/(&#x)(\w{4});/gi, $0 =>
    String.fromCharCode(
      parseInt(
        encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, "$2"),
        16
      )
    )
  );
};

// module.exports = {
//   // 修改 src 目录 为 examples 目录
//   pages: {
//     index: {
//       entry: "examples/pc/main.ts",
//       template: "public/index.html",
//       filename: "index.html"
//     }
//   },

//   css: {
//     loaderOptions: {
//       less: {
//         modifyVars: {
//           // 'primary-color': '#1DA57A',
//           // 'link-color': '#1DA57A',
//           // 'border-radius-base': '2px',
//         },
//         javascriptEnabled: true
//       }
//     }
//   },

//   configureWebpack: () => ({
//     name: "vue-cli3-template",
//     resolve: {
//       alias: {}
//     }
//     // plugins: genPlugins()
//   }),
//   pluginOptions: {
//     "style-resources-loader": {
//       preProcessor: "less",
//       patterns: ["node_modules/ant-design-vue/dist/antd.less"]
//     },
//     lintStyleOnBuild: true,
//     stylelint: {}
//   }
// };

const vueMarkdown = {
  raw: true,
  preprocess: (MarkdownIt, source) => {
    MarkdownIt.renderer.rules.table_open = function() {
      return '<table class="table">';
    };
    // ```html``` 给这种样式加个class hljs
    MarkdownIt.renderer.rules.fence = wrapCustomClass(
      MarkdownIt.renderer.rules.fence
    );
    // ```code``` 给这种样式加个class code_inline
    const codeInline = MarkdownIt.renderer.rules.code_inline;
    MarkdownIt.renderer.rules.code_inline = function(...args) {
      args[0][args[1]].attrJoin("class", "code_inline");
      return codeInline(...args);
    };
    return source;
  },
  use: [
    [
      MarkdownItContainer,
      "demo",
      {
        validate: params => params.trim().match(/^demo\s*(.*)$/),
        render: function(tokens, idx) {
          if (tokens[idx].nesting === 1) {
            return `<demo-block>
                        <div slot="highlight">`;
          }
          return "</div></demo-block>\n";
        }
      }
    ],
    [
      MarkdownItCheckBox,
      {
        disabled: true
      }
    ],
    [MarkdownItDec]
  ]
};

const cdn = {
  // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
  externals: {
    "vue-router": "VueRouter",
    vue: "Vue", // 左侧vue是我们自己引入时候要用的，右侧是开发依赖库的主人定义的不能修改
    vuex: "Vuex",
    "ant-design-vue": "antd"
  },
  // cdn的css链接
  css: [],
  // cdn的js链接
  js: [
    "https://cdn.staticfile.org/vue/2.6.10/vue.min.js",
    "https://cdn.staticfile.org/vuex/3.0.1/vuex.min.js",
    "https://cdn.staticfile.org/vue-router/3.0.3/vue-router.min.js"
  ]
};

const devNeedCdn = true;

module.exports = {
  lintOnSave: false,
  publicPath: "./",
  // 修改 src 目录 为 examples 目录
  pages: {
    index: {
      entry: "examples/pc/main.ts",
      template: "public/index.html",
      filename: "index.html"
    }
    // mobile: {
    //   entry: 'examples/mobile/main.ts',
    //   template: 'public/mobile.html',
    //   filename: 'mobile.html'
    // }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 'primary-color': '#1DA57A',
          // 'link-color': '#1DA57A',
          // 'border-radius-base': '2px',
        },
        javascriptEnabled: true
      }
    }
  },
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("examples"))
      .set("@mobile", resolve("examples/mobile"));

    config.module
      .rule("md")
      .test(/\.md/)
      .use("vue-loader")
      .loader("vue-loader")
      .end()
      .use("vue-markdown-loader")
      .loader("vue-markdown-loader/lib/markdown-compiler")
      .options(vueMarkdown);
  },
  //webpack 配置
  configureWebpack: config => {
    config.plugins = [
      ...config.plugins,
      // new ConcatPlugin({
      //   // examples
      //   uglify: false,
      //   sourceMap: false,
      //   name: "dap-ui",
      //   outputPath: "./",
      //   fileName: "[name].less",
      //   filesToConcat: ["./packages/**/*.less"],
      //   attributes: {
      //     async: true
      //   }
      // })
    ];
    if (devNeedCdn) {
      config.externals = cdn.externals;
    }
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: ["node_modules/ant-design-vue/dist/antd.less"]
    },
    lintStyleOnBuild: true,
    stylelint: {}
  }
};
