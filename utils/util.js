const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const isEmpty = (obj) => [Object, Array].includes((obj || {}).constructor) &&
  !Object.entries(obj || {}).length;

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 设置缓存
 * k 键
 * v 值
 * t 秒
 */
const setRedis = (k, v, t) => {
  wx.setStorageSync(k, v)
  var seconds = parseInt(t)
  if (seconds > 0) {
    var newtime = Date.parse(new Date())
    newtime = newtime / 1000 + seconds;
    wx.setStorageSync(k + 'redis', newtime + "")
  } else {
    wx.removeStorageSync(k + 'redis')
  }
}

/**
 * 读取缓存 
 */
const getRedis = k => {
  var deadtime = parseInt(wx.getStorageSync(k + 'redis'))
  if (deadtime) {
    if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
      wx.removeStorageSync(k);
      console.log("过期了")
      return null
    }
  }
  var res = wx.getStorageSync(k)
  if (res) {
    return res
  } else {
    return null
  }
}

/**
 * 删除缓存
 */
const delRedis = k => {
  wx.removeStorageSync(k);
  wx.removeStorageSync(k + 'redis');
}

/**
 * 清除所有缓存
 */
const clearRedis = () => {
  wx.clearStorageSync();
}
//秒倒计时 获取时分秒
const countDownTime = time => {
  if (typeof time != "number") {
    throw Error("time type error")
  }
  if (time < 0) {
    throw Error("time must greater than 0")
  }
  const days = formatNumber(time / 86400 | 0)
  const hours = formatNumber((time % (86400)) / 3600 | 0)
  const minutes = formatNumber((time % (60 * 60)) / 60 | 0)
  const seconds = formatNumber(time % 60 | 0)
  return {
    days,
    hours,
    minutes,
    seconds
  }
}
module.exports = {
  formatTime,
  isEmpty,
  formatNumber,
  setRedis,
  getRedis,
  delRedis,
  clearRedis,
  countDownTime
}