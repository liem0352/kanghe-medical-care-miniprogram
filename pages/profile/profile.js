// pages/profile/profile.js
const app = getApp();

Page({
  data: {
    user: {
      avatar: "/images/logo.png",
      name: "张明惠",
      age: 68,
      membership: "金卡会员",
      healthScore: 98,
      serviceCount: 36,
      points: 128,
      unreadMessages: 3
    },
    fontSizes: [
      { size: 'normal', label: '标准' },
      { size: 'large', label: '大号' },
      { size: 'xlarge', label: '加大' },
      { size: 'xxlarge', label: '特大' }
    ],
    currentFontSize: 'normal',
    showFontModal: false,
    currentSubMenu: null
  },

  onLoad() {
    const savedFontSize = app.globalData.fontSize || 'normal';
    this.setData({
      currentFontSize: savedFontSize
    });
  },

  logout() {
    wx.showModal({
      title: '确定退出登录？',
      content: '退出后仍可查看公共内容',
      success: (res) => {
        if (res.confirm) {
          app.globalData.userInfo = null;
          app.globalData.token = null;
          wx.redirectTo({
            url: '/pages/login/login'
          });
        }
      }
    });
  },

  showFontSettings() {
    this.setData({
      showFontModal: true,
      currentSubMenu: null
    });
  },

  closeFontModal() {
    this.setData({
      showFontModal: false
    });
  },

  fontSizeChange(e) {
    this.setData({
      currentFontSize: e.detail.value
    });
  },

  confirmFontSize() {
    const { currentFontSize } = this.data;
    app.setFontSize(currentFontSize);
    this.closeFontModal();
    wx.showToast({
      title: '字体设置已更新',
      icon: 'success'
    });
  },

  toggleSubMenu(e) {
    const menu = e.currentTarget.dataset.menu;
    this.setData({
      currentSubMenu: this.data.currentSubMenu === menu ? null : menu,
      showFontModal: false
    });
    wx.vibrateShort({ type: 'light' });
  }
});
