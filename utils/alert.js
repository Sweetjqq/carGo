/**
 * 有按钮的提示
 * @method alert
 * @param {string} title 提示标题.
 * @param {string} content 提示内容.
 * @param {boolean} showCancel 是否显示取消按钮.
 */
const alert = (
  title = '提示',
  content = defaultAlertMsg,
  showCancel = false
) => {
  if (typeof content === 'object') {
    content = JSON.stringify(content) || defaultAlertMsg;
  }
  wx.showModal({
    title: title,
    content: content,
    showCancel: showCancel,
  });
};

export default alert;