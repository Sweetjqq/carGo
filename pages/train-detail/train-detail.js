// pages/train-detail/train-detail.js
let app = getApp();
import {
  updateDuration,
  getTrainById
} from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    video_real_time: 0, //实时播放进度
    initial_time: '', //视频跳转进度 秒
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let videoContext = wx.createVideoContext('myVideo')
    videoContext.seek(100)
    this.data.initial_time = 100;
  },
  //监听视频播放进度
  timeUpdate: function (e) {
    var duration = e.detail.duration
    var currentTime = parseInt(e.detail.currentTime)
    if (this.data.video_real_time == 0) {
      var jump_time = parseInt(this.data.initial_time) + parseInt(this.data.video_real_time)
    } else {
      var jump_time = parseInt(this.data.video_real_time)
    }
    if (currentTime > jump_time && currentTime - jump_time > 3) {
      let videoContext = wx.createVideoContext('myVideo')
      videoContext.seek(this.data.video_real_time)
      wx.showToast({
        title: '未完整看完该视频，不能快进',
        icon: 'none',
        duration: 2000,
      })
    }
    this.data.video_real_time = currentTime;
    this.data.duration = duration;
  },
  updateDuration() {
    updateDuration({
      "duration": "string",
      "queryType": "string",
      "recordType": "string",
      "trainId": 0,
      "wechatId": wx.myOpenId,
      "phone": wx.myPhone
    }).then((data) => {

    })
  },
  getTrainById(){
    getTrainById({
      "queryType": "string",
      "recordType": "string",
      "trainId": 0,
      "wechatId": wx.myOpenId,
      "phone": wx.myPhone
    }).then((data)=>{

    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTrainById();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.updateDuration();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  }
})