import httpServer from '../utils/http-server';
/**
 * 
 * 获取首页banner
 */
export const getBanners = (data) => {
  return httpServer({
    host: 'baseHost',
    method: 'post',
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
    method: 'post',
    data,
    isFail: true,
    url: `interface/customer/getPoolCustomerList`,
  })
}

/**
 * 抢客户（客户池）
 */
export const saveCustomerPool = (data) => {
  return httpServer({
    host: 'baseHost',
    method: 'post',
    data,
    allReponse: true,
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
    method: 'post',
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
    isFail: true,
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
    method: 'post',
    data,
    url: `interface/customer/updateCustomer`,
  })
}

/**
 * 获取字典
 */
export const getDictData = (dictType) => {
  return httpServer({
    host: 'baseHost',
    isFail: true,
    url: `interface/common/getDictData/${dictType}`,
  })
}

/**
 * 培训视频列表
 * @param {*} data 
 */
export const getTrainList = (data) => {
  return httpServer({
    host: 'baseHost',
    method: 'post',
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
    method: 'post',
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
    method: 'post',
    data,
    url: `interface/custrain/getTrainById`,
  })
}
/**
 * 我的客户列表
 * @param {*} data 
 */
export const getCustomerList = (data) => {
  return httpServer({
    host: 'baseHost',
    method: 'post',
    data,
    url: `interface/customer/getCustomerList`,
  })
}
/**
 * 新增客户
 * @param {*} data 
 */
export const addCustomer = (data) => {
  return httpServer({
    host: 'baseHost',
    method: 'post',
    data,
    url: `interface/customer/addCustomer`,
  })
}
/**
 * 新增拜访
 * @param {*} data 
 */
export const addCusVisit = (data) => {
  return httpServer({
    host: 'baseHost',
    method: 'post',
    data,
    url: `interface/cusvisit/addCusVisit`,
  })
}

/**
 * 找支持客户列表
 * @param {*} data 
 */
export const supportList = (data) => {
  return httpServer({
    host: 'baseHost',
    method: 'post',
    data,
    url: `interface/cussupport/getCustomerList`,
  })
}

/**
 *  修改找支持的未读状态
 * @param {*} data 
 */
export const updateSupportMsgStatus= (customerId) => {
  return httpServer({
    host: 'baseHost',
    url: `interface/cussupport/updateSupportMsgStatus/${customerId}`,
  })
}

/**
 * 访客户列表
 * @param {*} data 
 */
export const getVisitCustomerList = (data) => {
  return httpServer({
    host: 'baseHost',
    method: 'post',
    data,
    url: `interface/cusvisit/getCustomerList`,
  })
}
/**
 * 支持记录列表
 * @param {*} data 
 */
export const getCusVisitList = (data) => {
  return httpServer({
    host: 'baseHost',
    method: 'post',
    data,
    url: `interface/cussupport/getCusVisitList`,
  })
}

/**
 * 支新增支持内容
 * @param {*} data 
 */
export const addCusSupprot = (data) => {
  return httpServer({
    host: 'baseHost',
    method: 'post',
    data,
    url: `interface/cussupport/addCusSupprot`,
  })
}
/**
 *拜访记录列表
 * @param {*} data 
 */
export const getVisitList = (data) => {
  return httpServer({
    host: 'baseHost',
    method: 'post',
    data,
    url: `interface/cusvisit/getCusVisitList`,
  })
}
/**
 *客户详情
 * @param {*} data 
 */
export const getCustomerById = (customerId) => {
  return httpServer({
    host: 'baseHost',
    isFail: true,
    url: `interface/customer/getCustomer/${customerId}`,
  })
}

/**
 * 我的审核
 * @param {*} data 
 */
export const getExamineList = (data) => {
  return httpServer({
    host: 'baseHost',
    method: 'post',
    data,
    url: `interface/saler/getCustomerListBySaler`,
  })
}

/**
 * 我的拜访记录列表
 * @param {*} data 
 */
export const myVisitList = (data) => {
  return httpServer({
    host: 'baseHost',
    method: 'post',
    data,
    url: `interface/saler/getCusVisitListBySaler`,
  })
}

/**
 * 我的培训列表学习列表
 * @param {*} data 
 */
export const myTrainList = (data) => {
  return httpServer({
    host: 'baseHost',
    method: 'post',
    data,
    url: `interface/saler/getTrainListBySaler`,
  })
}