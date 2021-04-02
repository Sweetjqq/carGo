import httpServer from '../utils/http-server';
/**
 * 
 * 获取首页banner
 */
export const getBanners = (data) => {
  return httpServer({
    host: 'baseHost',
    method:'post',
    data,
    url: `interface/common/getBanners`,
  })
}

/**
 * 
 * 获取机会客户列表
 */

export const getPoolCustomerList = (data) => {
  return httpServer({
    host: 'baseHost',
    method:'post',
    data,
    url: `/interface/customer/getPoolCustomerList`,
  })
}

/**
 * 
 * 抢客户（客户池）
 */
export const saveCustomerPool = (data) => {
  return httpServer({
    host: 'baseHost',
    method:'post',
    data,
    url: `interface/customer/saveCustomerPool`,
  })
}

/**
 * 
 * 修改已申请的客户信息（改客户池）
 */
export const updateCustomerPool = (data) => {
  return httpServer({
    host: 'baseHost',
    method:'post',
    data,
    url: `interface/customer/updateCustomerPool`,
  })
}

/**
 * 获取之前抢到的客户详情
 */
export const getApplyCustomer = (customerApplyId) => {
  return httpServer({
    host: 'baseHost',
    isFail:true,
    url: `interface/customer/getCustomerPool/${customerApplyId}`,
  })
}

/**
 * 
 * 修改我的客户信息
 */
export const updateCustomer = (data) => {
  return httpServer({
    host: 'baseHost',
    method:'post',
    data,
    url: `interface/customer/updateCustomer`,
  })
}






// 培训视频详情star

/**
 * 培训视频列表
 * @param {*} data 
 */
export const getTrainList = (data) => {
  return httpServer({
    host: 'baseHost',
    method:'post',
    data,
    url: `interface/custrain/getTrainList`,
  })
}
/**
 * 返回培训视频进度
 * @param {*} data 
 */
export const updateDuration = (data) => {
  return httpServer({
    host: 'baseHost',
    method:'post',
    data,
    url: `interface/custrain/updateDuration`,
  })
}
/**
 * 培训视频详情
 * @param {*} data 
 */
export const getTrainById = (data) => {
  return httpServer({
    host: 'baseHost',
    method:'post',
    data,
    url: `interface/custrain/getTrainById`,
  })
}

// 培训视频详情 end