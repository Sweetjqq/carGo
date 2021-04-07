// pages/visit-detail/conponents/new-visit/new-visit.js

import {
  addCusVisit
} from '../../../../api/index';
import {
  baseHost
} from '../../../../utils/env-config';
let app = getApp()
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    customer: {
      type: Object,
      value: {
        customerName: '',
        visitType: null,
        visitDate: '',
        visitPost: '',
        visitName: '',
        visitContent: '',
        needSupport: ''
      }
    },
    visitType: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    fileArr: [],
    baseHost: baseHost
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
    addVisit(params) {
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
      addCusVisit(pramData).then(() => {
        app.showTip('新增拜访记录成功', () => {
          wx.navigateBack({})
        })
      }).catch(error => {
        console.log(error)
      })
    },
    submit() {
      const {
        customer,
        fileArr
      } = this.data;
      wx.showLoading({
        title: '提交中...',
        mask: true
      })
      let pramData = {
        ...customer,
        "file": fileArr,
        "wechatId": wx.myOpenId,
        "phone": wx.myPhone
      }
      wx.uploadFile({
        url: `${baseHost}interface/cusvisit/addCusVisit`,
        filePath: tempFilePaths,
        name: 'file',
        header: {
          'Content-Type': 'form-data',
        },
        // formData: pramData,
        success: function (res) {
          console.log(res)
          wx.hideLoading()
          res = JSON.parse(res.data);
        },
        fail: function (res) {
          wx.hideLoading()
          console.log(res, 'shibai')
        }
      })
    },
    // 上传图片
    chooseImg: function (e) {
      const {
        fileArr
      } = this.data;
      var that = this;
      if (fileArr.length > 3) {
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
        sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
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
                  console.log(res, "********")
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
    }
  }
})