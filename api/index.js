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

/**
 * 
 * 修改已申请的客户信息
 */
export const updateCustomerPool = (data) => {
  return httpServer({
    host: 'baseHost',
    method:'post',
    data,
    url: `interface/customer/updateCustomerPool`,
  })
}
