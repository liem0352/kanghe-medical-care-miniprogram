// pages/login/login.js
const app = getApp();

Page({
  showUnsupportedModal: false,
  
  onLoad() {
    // 检查设备生物识别支持情况
    this.checkBiometricSupport();
  },
  
  // 检查设备支持的生物识别方式
  async checkBiometricSupport() {
    try {
      // 检查是否支持 Soter 生物认证
      const res = await wx.checkIsSupportSoterAuthentication();
      const supportInfo = {
        face: res.supportMode.includes('facial'),
        fingerprint: res.supportMode.includes('fingerPrint')
      };
      app.globalData.biometricSupport = supportInfo;
      
      if (!supportInfo.face && !supportInfo.fingerprint) {
        this.setData({
          showUnsupportedModal: true
        });
      }
    } catch (err) {
      console.error('检查生物识别支持时出错:', err);
      wx.showToast({
        title: '获取设备信息失败',
        icon: 'none'
      });
    }
  },
  
  async loginWithFace() {
    const support = app.globalData.biometricSupport?.face;
    if (!support) {
      wx.showToast({
        title: '当前设备不支持人脸识别',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    wx.showLoading({
      title: '人脸识别中',
      mask: true
    });
    
    try {
      // 开始人脸识别
      await this.startSoterAuthentication('facial');
      
      // 人脸识别成功后的登录逻辑
      wx.hideLoading();
      this.doLogin();
    } catch (err) {
      console.error('人脸识别失败:', err);
      wx.hideLoading();
      let errorMsg = '人脸识别失败';
      
      switch (err.errCode) {
        case 90010: errorMsg = '生物识别功能不可用'; break;
        case 90011: errorMsg = '未开启生物识别'; break;
        case 90012: errorMsg = '未录入人脸信息'; break;
        case 90013: errorMsg = '超时'; break;
        case 90014: errorMsg = '用户取消'; break;
      }
      
      wx.showModal({
        title: '提示',
        content: errorMsg,
        showCancel: false
      });
    }
  },
  
  async loginWithFingerprint() {
    const support = app.globalData.biometricSupport?.fingerprint;
    if (!support) {
      wx.showToast({
        title: '当前设备不支持指纹识别',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    wx.showLoading({
      title: '指纹验证中',
      mask: true
    });
    
    try {
      // 开始指纹识别
      await this.startSoterAuthentication('fingerPrint');
      
      // 指纹识别成功后的登录逻辑
      wx.hideLoading();
      this.doLogin();
    } catch (err) {
      console.error('指纹识别失败:', err);
      wx.hideLoading();
      let errorMsg = '指纹识别失败';
      
      switch (err.errCode) {
        case 90010: errorMsg = '生物识别功能不可用'; break;
        case 90011: errorMsg = '未开启指纹识别'; break;
        case 90012: errorMsg = '未录入指纹'; break;
        case 90013: errorMsg = '超时'; break;
        case 90014: errorMsg = '用户取消'; break;
      }
      
      wx.showModal({
        title: '提示',
        content: errorMsg,
        showCancel: false
      });
    }
  },
  
  // 生物识别认证方法
  startSoterAuthentication(mode) {
    return new Promise((resolve, reject) => {
      wx.startSoterAuthentication({
        requestAuthModes: [mode],
        challenge: 'kanghe_medical_' + new Date().getTime(),
        authContent: mode === 'facial' ? '请正对屏幕' : '请验证指纹',
        success: (res) => {
          if (res.authMode === mode && res.resultJSON.signature) {
            resolve(res);
          } else {
            reject({
              errMsg: '验证失败',
              errCode: 999
            });
          }
        },
        fail: reject
      });
    });
  },
  
  // 实际登录逻辑
  doLogin() {
    app.globalData.token = 'user_token_' + Date.now();
    app.globalData.userInfo = {
      name: '张三',
      age: 68,
      membership: '金卡会员'
    };
    
    wx.showToast({
      title: '登录成功',
      icon: 'success'
    });
    
    wx.switchTab({
      url: '/pages/index/index',
    });
  },
  
  loginWithFamily() {
    wx.navigateTo({
      url: '/pages/family/family',
    });
  },
  
  closeUnsupportedModal() {
    this.setData({
      showUnsupportedModal: false
    });
  }
});