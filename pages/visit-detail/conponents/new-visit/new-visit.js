// pages/visit-detail/conponents/new-visit/new-visit.js
import {
  addCusVisit
} from '../../../../api/index';
import {
  baseHost
} from '../../../../utils/env-config';
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
    fileArr: []
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
          customer[type] = visitType[value].dictLabel;
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
      addCusVisit(params).then(data => {
        wx.showToast({
          title: '新增拜访记录成功',
          icon: 'success',
          duration: 1500
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/visit-customer/visit-customer',
          })
        }, 1600)
      }).catch(error => {
        console.log(error)
      })
    },
    submit() {
      const {
        customer,
        fileArr
      } = this.data;
      if (wx.uploadFile) {
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
          formData: pramData,
          success: function (res) {
            console.log(res)
            wx.hideLoading()
            res = JSON.parse(res.data);
            // if (res.isSuc) {
            //   console.log(res, "********")
            //   let setStr = `shopImgArr[${index}].files`,
            //     fileData = res.result[0];
            //   let files = that.data.shopImgArr[index].files;
            //   files.push(fileData)
            //   that.setData({
            //     [setStr]: files
            //   })
            // } else {
            //   utils.showModal('图片上传失败,请稍后再试', '提示')
            // }
          },
          fail: function (res) {
            wx.hideLoading()
            console.log(res, 'shibai')
            // utils.showModal('图片上传失败,请稍后再试', '提示')
          }
        })
      } else {
        // utils.showModal('您的微信版本过低请升级版本', '提示')
      }
    },
    // 上传图片
    chooseImg() {
      let {
        fileArr
      } = this.data;
      wx.chooseImage({
        count: 3, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        success: res => {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          console.log(tempFilePaths)
          fileArr.push(tempFilePaths);
          this.setData({
            fileArr
          })
        }
      });
    },

  }
})