Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showInsurance: {
      value: false,
      type: Boolean
    },
    orInsuraData:{
      value:[],
      type:Array
    },
    selectedIns:{
      value:[],
      type:Array
    }
  },
  observers: {
    'orInsuraData,selectedIns': function(orInsuraData,selectedIns) {
      console.log(orInsuraData,selectedIns,'2222')
      if(orInsuraData.length>0&&selectedIns.length>0){
        let newArr = this.copyArr(selectedIns),
           newTwo = this.copyArr(orInsuraData);
         this.setData({
          selectedIns:[]
         })
        newArr.forEach(item=>{
          let inx = orInsuraData.findIndex(val => {
             return val.dictValue == item;
          })
          if(inx>=0){
            newTwo[inx].isSelect=true;
          }
        })
        this.setData({
          orInsuraData:newTwo
        })
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    copyArr(source) {
      let sourceCopy = source instanceof Array ? [] : {};
      for (let item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? this.copyArr(source[item]) : source[item];
      }
      return sourceCopy;
    },
    move(){},
    closeEvent(){
      this.setData({
        showInsurance:false
      })
    },
    selectEvent(e){
      const {inx}=e.currentTarget.dataset;
      const {orInsuraData}=this.data;
      this.setData({
        [`orInsuraData[${inx}].isSelect`]:orInsuraData[inx].isSelect?false:true
      })
    },
     saveTime(){
      const {orInsuraData}=this.data;
      let arr=[];
      orInsuraData.forEach(item=>{
        if(item.isSelect){
          arr.push({
            dictLabel:item.dictLabel,
            dictValue:item.dictValue
          })
        }
      })
      this.closeEvent();
      this.triggerEvent('saveInsurance',{
        reInsData:arr
      })
     }
  }
})