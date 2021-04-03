import httpServer from '../utils/http-server';


/**
 * 发送验证码
 */
export const getVerificationCode = (phone) => {
  return httpServer({
    host: 'baseHost',
    url: `interface/mobileUser/getVerificationCode/${phone}`,
  })
}
/**
 * 验证手机号
 */
export const phoneChecke = (phone) => {
  return httpServer({
    host: 'baseHost',
    isFail: true,
    url: `interface/mobileUser/phoneChecking/${phone}`,
  })
}
/**
 * 
 * 验证手机号及验证码
 */

export const verification = (data) => {
  return httpServer({
    host: 'baseHost',
    method:'post',
    data,
    url: `interface/mobileUser/verification`,
  })
}

/**
 * 登录
 */
export const login = (code) => {
  return httpServer({
    host: 'baseHost',
    isFail:true,
    url: `interface/mobileUser/interface/login/${code}`,
  })
} 

/**
 * 我的详细信息
 */
export const myData = (data) => {
  return httpServer({
    host: 'baseHost',
    method:'post',
    data,
    url: `interface/saler/getSalerInfo`,
  })
} 


/**
 * 获取我的数据统计
 */
export const myDataInfo = (data) => {
  return httpServer({
    host: 'baseHost',
    method:'post',
    data,
    url: `interface/saler/statistics`,
  })
} 