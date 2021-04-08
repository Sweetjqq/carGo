// pages/edit-myVisit/edit-myVisit.js
import {
  getDictData,
  getCusVisitDetail,
  updateCusVisit
} from '../../api/index';
import {
  baseHost
} from '../../utils/env-config';
let app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    visitType: [],
    customer: {
      customerName: '',
      visitType: null,
      visitDate: '',
      visitPost: '',
      visitName: '',
      visitContent: '',
      needSupport: ''
    },
    visitId: '',
    fileArr: [],
    baseHost,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      visitId
    } = options;
    this.setData({
      visitId
    }, () => {
      this.getDictData();
    })

  },
  getDictData() {
    getDictData('sys_visit_type').then(data => {
      this.setData({
        visitType: data
      }, () => {
        this.getCustomerById();
      })
    })
  },
  bindPickerChange(event) {
    const {
      value
    } = event.detail;
    const {
      customer,
      visitType
    } = this.data;
    const {
      type
    } = event.currentTarget.dataset;
    switch (type) {
      case 'visitType':
        customer[type] = visitType[value].dictValue;
        customer.visitType_value = visitType[value].dictLabel;
        break;
      case "visitDate":
        customer[type] = value;
        break;
      default:
        break;
    }
    this.setData({
      customer
    })
  },
  getInputValue(event) {
    const {
      customer
    } = this.data;
    const {
      type
    } = event.currentTarget.dataset;
    const {
      value
    } = event.detail;
    this.setData({
      customer: {
        ...customer,
        [type]: value
      }
    })
  },
  // 获取详情
  getCustomerById() {
    let {
      visitId,
      visitType
    } = this.data;
    getCusVisitDetail(visitId).then(data => {
      //  处理picker数据
      visitType.map(item => {
        if (data.visitType === item.dictValue) {
          data.visitType_value = item.dictLabel;
        }
      })
      this.setData({
        customer: data,
        fileArr: data.visitFiles ? data.visitFiles : []
      })
    })
  },
  deleteImg(e) {
    const {
      index
    } = e.currentTarget.dataset;
    let {
      fileArr
    } = this.data;
    fileArr.splice(index, 1);
    this.setData({
      fileArr
    })
  },
  // 上传图片
  chooseImg: function (e) {
    const {
      fileArr
    } = this.data;
    var that = this;
    if (fileArr.length >= 3) {
      wx.showToast({
        title: '最多只能上传三张图片',
        icon: 'none',
        duration: 1500
      })
      return
    }
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths[0];
        if (wx.uploadFile) {
          wx.showLoading({
            title: '图片上传中...',
            mask: true
          })
          let pramData = {
            phone: wx.myPhone,
            wechatId: wx.myOpenId,
            file: [tempFilePaths]
          }
          console.log(pramData, tempFilePaths, '上传图片入参')
          wx.uploadFile({
            url: `${baseHost}interface/cusvisit/uploadFile`,
            filePath: tempFilePaths,
            name: 'file',
            formData: pramData,
            success: (res) => {
              wx.hideLoading()
              res = JSON.parse(res.data);
              console.log(res, 'chenggg')
              if (res.code == '0' && res.suc) {
                that.setData({
                  fileArr: fileArr.concat(res.result)
                })
              } else {
                app.showTip('图片上传失败,请稍后再试', '提示')
              }
            },
            fail: function (res) {
              wx.hideLoading()
              console.log(res, 'shibai')
              app.showTip('图片上传失败,请稍后再试', '提示')
            }
          })
        } else {
          app.showTip('您的微信版本过低请升级版本', '提示')
        }
      }
    });
  },
  submit() {
    const {
      customer,
      fileArr
    } = this.data;
    let pramData = {
      ...customer,
      "filesPath": fileArr,
      "wechatId": wx.myOpenId,
      "phone": wx.myPhone
    }
    updateCusVisit(pramData).then(() => {
      console.log(222222222222);
      app.showTip('修改拜访记录成功', () => {
        wx.navigateBack({})
      })
    }).catch(error => {
      console.log(error)
    })
  }
})