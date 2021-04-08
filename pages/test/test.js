// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showInsurance:true,
    orInsuraData:[{"createBy":"admin","createTime":"2021-03-17 17:23:58","updateBy":null,"updateTime":null,"remark":null,"dictCode":108,"dictSort":2,"dictLabel":"物流责任险","dictValue":"2","dictType":"sys_risk_type"},{"createBy":"admin","createTime":"2021-03-17 17:23:17","updateBy":null,"updateTime":null,"remark":null,"dictCode":107,"dictSort":1,"dictLabel":"雇主责任险","dictValue":"gzzrx","dictType":"sys_risk_type"}],
    selected:[2]
  },
  getInsData(e){
    console.log(e,'eeeee')
    console.log(e.detail.reInsData)
  },
})