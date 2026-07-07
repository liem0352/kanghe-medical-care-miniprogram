// pages/prescription/prescription.js
Page({
  data: {
    showDeliveryModal: false,
    selectedTime: 0,
    timeOptions: [
      "今天 18:00前送达",
      "明天 10:00前送达",
      "明天 14:00前送达",
      "明天 18:00前送达"
    ]
  },
  
  goBack() {
    wx.navigateBack();
  },
  
  showInsuranceDetail() {
    wx.showModal({
      title: '医保详情',
      content: '参保单位: 肇庆市基本医疗保险\n参保状态: 正常\n累计支出: ¥4,256.30\n账户余额: ¥2,536.50',
      showCancel: false
    });
  },
  
  requestDelivery() {
    this.setData({
      showDeliveryModal: true
    });
  },
  
  timeChange(e) {
    this.setData({
      selectedTime: e.detail.value
    });
  },
  
  closeDeliveryModal() {
    this.setData({
      showDeliveryModal: false
    });
  },
  
  confirmDelivery() {
    this.closeDeliveryModal();
    wx.showLoading({
      title: '处理中...',
    });
    
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '药品配送已安排!',
        icon: 'success',
        duration: 2000
      });
    }, 1500);
  }
});