// app.js
App({
    onLaunch() {
      // 初始化全局数据
      this.globalData = {
        userInfo: null,
        token: null,
        fontSize: 'normal',
        healthData: {
          heartRate: Math.floor(Math.random() * 20) + 70,
          bloodPressure: `${Math.floor(Math.random() * 40) + 110}/${Math.floor(Math.random() * 20) + 60}`,
          bloodOxygen: Math.floor(Math.random() * 10) + 90
        }
      };
      
      // 健康数据更新定时器
      this.updateHealthTimer();
    },
    
    onShow() {
      // 应用显示时刷新健康数据
      this.updateHealthData();
    },
    
    updateHealthTimer() {
      if (this.healthTimer) clearInterval(this.healthTimer);
      
      // 每3分钟更新一次健康数据
      this.healthTimer = setInterval(() => {
        this.updateHealthData();
      }, 180000);
    },
    
    updateHealthData() {
      const newData = {
        heartRate: Math.floor(Math.random() * 20) + 70,
        bloodPressure: `${Math.floor(Math.random() * 40) + 110}/${Math.floor(Math.random() * 20) + 60}`,
        bloodOxygen: Math.floor(Math.random() * 10) + 90
      };
      
      this.globalData.healthData = newData;
      
      // 通知页面健康数据已更新
      this.notifyHealthDataChange();
      
      return newData;
    },
    
    notifyHealthDataChange() {
      const pages = getCurrentPages();
      if (pages.length > 0) {
        const currentPage = pages[pages.length - 1];
        if (currentPage.updateHealthData) {
          currentPage.updateHealthData();
        }
      }
    }
  });