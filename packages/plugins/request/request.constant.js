/*
* @Author: DevinShi
* @Date: 2020-02-07 07:37:50
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-16 02:57:51
* @Description: file content description
*/

class HttpError {
    constructor(errorCode, errorMsg, error){
        this.errorCode = errorCode;
        this.errorMsg = errorMsg;
        this.error = error;
    }

}

const HTTP_ERROR_CONSTANT = {
    // 400 ~ 415 网络请求出现问题
    BadRequest: new HttpError(400, 'Bad Request 请求出现语法错误'),
    Unauthorized: new HttpError(401, 'Unauthorized 权限不足,访问被拒绝'),
    Forbidden: new HttpError(403, 'Forbidden 资源不可用,执行访问被禁止'),
    NotFound: new HttpError(404, 'Not Found 无法找到指定位置的资源'),
    MethodNotAllowed : new HttpError(405, 'Method Not Allowed 请求方法（GET、POST等）对指定的资源不适用'),
    NotAcceptable: new HttpError(406, 'Not Acceptable 指定的资源已经找到，但MIME类型和客户在Accpet头中所指定的不兼容'),   
    UnsupportedMedia: new HttpError(415, 'Unsupported Media 不支持的媒体类型'),
    BadRequestMin: new HttpError(9400, 'Bad Request 当前无法发起正确的网络请求, 请联系管理员'),
    BadRequestMax: new HttpError(9499, 'Bad Request 当前无法发起正确的网络请求, 请联系管理员'),

    // 500 ~ 599 服务器出现异常
    ServerError: new HttpError(500, 'Server Error 服务器遇到了意料不到的情况，不能完成客户的请求'),
    NotImplemented: new HttpError(501, 'Not Implemented 服务器不支持实现请求所需要的功能'),
    ServiceUnavailable: new HttpError(502, 'Service Unavailable 服务不可用'),
    GatewayTimeout: new HttpError(504, 'Gateway Timeout 网关超时'),
    HTTPVersionNotSupported: new HttpError(505, 'HTTP Version Not Supported 服务器不支持请求中所指明的HTTP版本'),
    ServerExceptionMin: new HttpError(9500, 'Server Exception 服务器出现异常，请耐心等待后重试或联系管理员'),
    ServerExceptionMax: new HttpError(9599, 'Server Exception 服务器出现异常，请耐心等待后重试或联系管理员'),
    
    // 600 ~ 出现未知异常
    UnkownError: new HttpError(600, 'Unkown Error 出现了未知错误,  请联系管理员'),
}

export {
    HttpError,
    HTTP_ERROR_CONSTANT
} 
