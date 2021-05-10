Page({
  data: {
    webView: '',
  },

  onLoad: function (options) {
    this.setData({
      options
    })
  },

  onShow: function () {
    const {
      options
    } = this.data;
    const url = decodeURIComponent(options.webView);
    let webView = url;
    this.setData({
      webView,
      url,
    });
  },

  onShareAppMessage: function () {
    return {
      path: `/pages/web-view/web-view?webView=${encodeURIComponent(
        this.data.url
      )}`,
    };
  },
});