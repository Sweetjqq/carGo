// app.js
require('./utils/index');
import {
  login
} from 'api/login.js'
App({
  onLaunch() {
    this.getPixelRatio();
  },
  globalData: {
    userInfo: null
  },
  getPixelRatio() {
    wx.pixelRatio=2;
    wx.getSystemInfo({
      success: function (res) {
        wx.pixelRatio=res.pixelRatio;
      }
    })
  },
  getUser(cb) {
    // 登录
    wx.login({
      success: res => {
        login(res.code).then(data => {
          console.log(data, '登录')
          wx.myOpenId = data.openid;
          if(data.phone){
            wx.myPhone = data.phone;
            cb();
          }else{
            wx.reLaunch({
              url: '/pages/login/login',
            })
          }
        }).catch(()=>{
          this.showTip('获取用户信息失败是否重新获取？',()=>{
            this.getUser(cb)
          })
        });
        
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  /**
   * 消息提示
   */
  showTip(content, event, title, btnTxt) {
    wx.showModal({
      title: title ? title : '消息提示',
      content: content ? content : '系统繁忙请稍后再试',
      showCancel: false,
      confirmText: btnTxt ? btnTxt : '确定',
      success: function (res) {
        if (typeof (event) == 'function') {
          event();
        }
      }
    })
  },
})