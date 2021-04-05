import alert from './alert';
import tip from './tip';
import * as hosts from './env-config'
const app = getApp();

function httpServer(opt) {
  const DEFAULT_REQUEST_OPTIONS = {
    url: '',
    data: {},
    header: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
    isFail: false,
  };

  let options = Object.assign({}, DEFAULT_REQUEST_OPTIONS, opt);
  let {
    url,
    data,
    header,
    method,
    isFail,
    allReponse,
    host
  } = options;
  let timer = null;

  timer = setTimeout(() => {
    tip.loading();
  }, 3000);

  return new Promise(function (resolve, reject) {
    wx.request({
      url: url.includes('http') ? url : `${hosts[host]}${url}`,
      data,
      method,
      header,
      isFail,
      allReponse,
      success: function (res) {
        clearTimeout(timer);
        if (res && res.statusCode == 200 && res.data.code == 0) {
          allReponse ? resolve(res.data) : resolve(res.data.result);
        } else if (res && res.statusCode == 200 && isFail) {
          reject(res.data);
        } else {
          alert('提示', res.data && res.data.message ? res.data.message : '系统错误请稍后再试');
        }
      },
      fail: function (err) {
        console.log(err, "*****")
        clearTimeout(timer);
        if (err.message) {
          alert('提示', err.message);
        } else {
          console.log('failed', err);
          tip.error('请求失败!');
        }
        reject(err);
      },
      complete: function () {
        tip.loaded();
      },
    });
  });
}

export default httpServer;