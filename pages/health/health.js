// pages/health/health.js
const app = getApp();

Page({
  data: {
    healthData: {
      heartRate: 72,
      bloodPressure: "118/75",
      bloodOxygen: 98
    },
    alerts: [],
    updateTime: "刚刚",
    heartStatus: "good",
    bloodStatus: "good",
    oxygenStatus: "good",
    chartData: [],
    chartWidth: 700,
    chartHeight: 300
  },
  
  onLoad() {
    // 1. 首先初始化画布
    this.initCanvas();
    
    // 2. 然后初始化数据
    this.initData();
    
    // 3. 开始模拟
    this.startSimulation();
    
    // 注册全局数据更新事件
    if (app.globalDataChangeCallback === undefined) {
      app.globalDataChangeCallback = () => {
        this.setData({
          healthData: app.globalData.healthData
        });
        this.updateStatus();
      };
    }
  },
  
  initData() {
    // 初始化状态
    this.updateStatus();
    
    // 添加emoji到预警记录
    const alerts = [
      {time: "今日 10:25", status: "血压异常", details: "您的血压偏高（142/85mmHg），请注意休息", statusIcon: "🩸"},
      {time: "昨天 15:32", status: "血氧不足", details: "您的血氧饱和度低于阈值（89%），请注意深呼吸", statusIcon: "🫁"},
      {time: "前天 08:15", status: "心率异常", details: "检测到突发性心动过速（110次/分钟），请检查", statusIcon: "💓"}
    ];
    
    this.setData({
      alerts,
      updateTime: this.getCurrentTime()
    });
    
    // 获取设备信息设置图表尺寸
    wx.getSystemInfo({
      success: res => {
        const screenWidth = res.screenWidth;
        this.setData({
          chartWidth: screenWidth * 0.9,
          chartHeight: screenWidth * 0.4
        }, () => {
          // 尺寸设置完成后，生成图表数据
          this.generateChartData();
        });
      }
    });
  },
  
  updateStatus() {
    const heartStatus = this.getHeartStatus(this.data.healthData.heartRate);
    const bloodStatus = this.getBloodStatus(this.data.healthData.bloodPressure);
    const oxygenStatus = this.getOxygenStatus(this.data.healthData.bloodOxygen);
    
    // 转换为状态类名
    const getStatusClass = (status) => {
      if (status === "正常") return "good";
      if (status === "偏高" || status === "偏低") return "warning";
      return "danger";
    };
    
    this.setData({
      heartStatus: getStatusClass(heartStatus),
      bloodStatus: getStatusClass(bloodStatus),
      oxygenStatus: getStatusClass(oxygenStatus)
    });
  },
  
  getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  },
  
  getHeartStatus(rate) {
    if (rate < 60 || rate > 100) return '异常';
    if (rate < 70 || rate > 90) return '偏高';
    return '正常';
  },
  
  getBloodStatus(bp) {
    const [systolic] = bp.split('/').map(Number);
    if (systolic < 90 || systolic > 140) return '危险';
    if (systolic < 100 || systolic > 130) return '偏高';
    return '正常';
  },
  
  getOxygenStatus(oxygen) {
    if (oxygen < 92) return '危险';
    if (oxygen < 95) return '偏低';
    return '正常';
  },
  
  // 生成初始图表数据
  generateChartData() {
    const data = [];
    for (let i = 0; i < 60; i++) {
      // 模拟正常心率波动 (65-85之间)
      const value = 65 + Math.sin(i * 0.2) * 10 + Math.random() * 5;
      data.push(Math.round(value));
    }
    this.setData({ chartData: data }, () => {
      // 数据设置完成后，绘制图表
      this.drawChart();
    });
  },
  
  // 初始化Canvas
  initCanvas() {
    this.ctx = wx.createCanvasContext('heartRateChart', this);
  },
  
  // 绘制心率图
  drawChart() {
    // 确保画布上下文已初始化
    if (!this.ctx) {
      console.warn("Canvas context not initialized yet");
      return;
    }
    
    const data = this.data.chartData;
    const { chartWidth, chartHeight } = this.data;
    
    // 如果没有获取到设备尺寸，使用默认值
    const width = chartWidth || 700;
    const height = chartHeight || 300;
    
    const padding = 30;
    
    // 清除画布
    this.ctx.clearRect(0, 0, width, height);
    
    // 绘制网格背景
    this.ctx.setFillStyle('#f5f9ff');
    this.ctx.fillRect(0, 0, width, height);
    
    this.ctx.setStrokeStyle('rgba(0, 0, 0, 0.05)');
    this.ctx.setLineWidth(1);
    
    // 绘制水平网格线
    for (let i = 0; i <= 5; i++) {
      const y = padding + i * (height - 2 * padding) / 5;
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(width, y);
      this.ctx.stroke();
      
      // 绘制刻度值
      const value = 100 - i * 20;
      this.ctx.setFillStyle('#7e8aa6');
      this.ctx.setFontSize(20);
      this.ctx.fillText(value.toString(), 5, y + 5);
    }
    
    // 计算X轴步长
    const stepX = (width - 2 * padding) / (data.length - 1);
    
    // 绘制曲线
    this.ctx.beginPath();
    this.ctx.setStrokeStyle('#ff5252');
    this.ctx.setLineWidth(3);
    this.ctx.setLineCap('round');
    
    data.forEach((value, index) => {
      const x = padding + index * stepX;
      const y = padding + (100 - value) * (height - 2 * padding) / 100;
      
      if (index === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    });
    
    this.ctx.stroke();
    
    // 绘制最后的数据点
    const lastValue = data[data.length - 1];
    const lastX = padding + (data.length - 1) * stepX;
    const lastY = padding + (100 - lastValue) * (height - 2 * padding) / 100;
    
    this.ctx.beginPath();
    this.ctx.setFillStyle('#ff5252');
    this.ctx.arc(lastX, lastY, 6, 0, Math.PI * 2);
    this.ctx.fill();
    
    this.ctx.draw();
  },
  
  // 开始伪实时模拟
  startSimulation() {
    this.simulationInterval = setInterval(() => {
      // 更新时间
      this.setData({
        updateTime: this.getCurrentTime()
      });
      
      // 更新心率图数据 - 移除第一个数据，添加新数据
      const newData = [...this.data.chartData.slice(1)];
      const lastValue = newData[newData.length - 1];
      
      // 随机波动 (+/- 3 bpm)
      const fluctuation = (Math.random() - 0.5) * 6;
      let newValue = lastValue + fluctuation;
      
      // 确保在合理范围内 (60-100 bpm)
      if (newValue < 60) newValue = 60 + Math.random() * 5;
      if (newValue > 100) newValue = 100 - Math.random() * 5;
      
      newData.push(Math.round(newValue));
      
      this.setData({
        chartData: newData
      }, () => {
        this.drawChart();
      });
    }, 5000); // 每5秒更新一次
  },
  
  onUnload() {
    // 清除定时器
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
    }
  }
});