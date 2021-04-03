// pages/smsCode/smsCode.js
import {
  getVerificationCode,
  verification
} from '../../api/login'
let app =getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    seconds: 60
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.mobile = options.phone;
    this.setData({
      showPhone: options.phone.substr(0, 3) + "****" + options.phone.substr(7)
    })
    this.getSmsCode();
  },
  // 获取输入的验证码
  getInputValue(e) {
    this.setData({
      smsCode: e.detail.value
    })
  },
  // 发送验证码
  getSmsCode() {
      const {
        mobile
      } = this.data;
      getVerificationCode(mobile).then(data=>{
        this.initTime(60)
      })
  },
  // 校验验证码
  verifySmsCode(verifyCode) {
    const {
      smsCode,
      mobile
    } = this.data;
    verification({
      "phone": mobile,
      "verificationCode": smsCode,
      "wechatId": wx.myOpenId
    }).then(data=>{
      this.clearTimer();
      wx.reLaunch({
        url: '/"pages/index/index"',
      })
    })
  },
  initTime(time) {
    console.log(time);
    if (typeof time != "number") return
    if (time <= 0) return;
    if (this.countTimer) return;
    this.countTimer = setInterval(() => {
      --time
      if (time < 0) {
        this.clearTimer()
      } else {
        this.setData({
          seconds: time
        })
      }
    }, 1000)
  },
  onUnload() {
    this.clearTimer()
  },
  clearTimer() {
    if (this.countTimer) {
      clearInterval(this.countTimer)
      this.countTimer = null
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})