// components/modal/modal.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
      show: {
        type: Boolean,
        value: false
      },
      title: {
        type: String,
        value: ''
      },
      confirmText: {
        type: String,
        value: '确定'
      },
      cancelText: {
        type: String,
        value: '取消'
      },
      showCancel: {
        type: Boolean,
        value: true
      },
      confirmType: {
        type: String,
        value: '' // 可选值：submit, reset等
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
      onClose() {
        this.triggerEvent('close');
        this.setData({
          show: false
        });
      },
  
      onCancel() {
        this.triggerEvent('cancel');
        this.setData({
          show: false
        });
      },
  
      onConfirm() {
        this.triggerEvent('confirm');
      }
    }
  })