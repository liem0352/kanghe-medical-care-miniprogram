// pages/chronic/chronic.js
const app = getApp();

Page({
  data: {
    recordTypes: ['血压', '血糖', '心率', '体重', '步数', '其他'],
    recordTypeIndex: 0,
    recordValue: '',
    recordNote: '',
    showRecordModal: false
  },

  onLoad() {
    // 初始化图表
    wx.nextTick(() => {
      this.createPressureChart();
      this.createSugarChart();
    });
  },

  goBack() {
    wx.navigateBack();
  },

  addNewRecord() {
    this.setData({
      showRecordModal: true,
      recordTypeIndex: 0,
      recordValue: '',
      recordNote: ''
    });
  },

  closeRecordModal() {
    this.setData({
      showRecordModal: false
    });
  },

  recordTypeChange(e) {
    this.setData({
      recordTypeIndex: e.detail.value
    });
  },

  inputRecordValue(e) {
    this.setData({
      recordValue: e.detail.value
    });
  },

  inputRecordNote(e) {
    this.setData({
      recordNote: e.detail.value
    });
  },

  saveHealthRecord() {
    const { recordTypes, recordTypeIndex, recordValue, recordNote } = this.data;
    const recordType = recordTypes[recordTypeIndex];
    
    if (!recordValue) {
      wx.showToast({
        title: '请输入测量数值',
        icon: 'none'
      });
      return;
    }
    
    wx.showLoading({
      title: '保存中...',
    });
    
    setTimeout(() => {
      wx.hideLoading();
      this.closeRecordModal();
      wx.showToast({
        title: '记录添加成功',
        icon: 'success'
      });
      
      // 在实际应用中，这里应该发送数据到后端
      console.log('保存健康记录:', {
        type: recordType,
        value: recordValue,
        note: recordNote
      });
    }, 1500);
  },

  markTaken(e) {
    const medicationId = e.currentTarget.dataset.id;
    wx.showLoading({
      title: '记录中...',
    });
    
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '已记录用药情况',
        icon: 'success'
      });
      
      // 在实际应用中，这里应该发送数据到后端
      console.log('记录用药:', medicationId);
    }, 1000);
  },

  createPressureChart() {
    const ctx = wx.createCanvasContext('pressureChart');
    const width = wx.getSystemInfoSync().windowWidth - 30;
    
    // 血压数据
    const sysData = [142, 138, 136, 145, 140, 135, 132];  // 收缩压
    const diaData = [85, 82, 80, 92, 85, 80, 78];        // 舒张压
    
    const points = this.generateChartPoints(sysData, diaData, width);
    
    // 绘制背景网格
    this.drawChartGrid(ctx, width, 150);
    
    // 绘制收缩压曲线
    this.drawChartLine(ctx, points.sysPoints, '#ff6b6b');
    
    // 绘制舒张压曲线
    this.drawChartLine(ctx, points.diaPoints, '#5cadff');
    
    // 添加图表标签
    this.addChartLabels(ctx, points.labels, width);
    
    ctx.draw();
  },
  
  createSugarChart() {
    const ctx = wx.createCanvasContext('sugarChart');
    const width = wx.getSystemInfoSync().windowWidth - 30;
    
    // 血糖数据
    const sugarData = [6.8, 7.2, 6.5, 7.8, 6.2, 5.9, 6.1];
    const points = this.generateSingleChartPoints(sugarData, width);
    
    // 绘制背景网格
    this.drawChartGrid(ctx, width, 150);
    
    // 绘制血糖曲线
    this.drawChartLine(ctx, points.dataPoints, '#19be6b');
    
    // 添加图表标签
    this.addChartLabels(ctx, points.labels, width);
    
    ctx.draw();
  },
  
  generateChartPoints(sysData, diaData, width) {
    const height = 150;
    const padding = 20;
    const labelHeight = 30;
    
    // 计算最大值最小值
    const maxSys = Math.max(...sysData);
    const minSys = Math.min(...sysData);
    const maxDia = Math.max(...diaData);
    const minDia = Math.min(...diaData);
    
    const sysPoints = [];
    const diaPoints = [];
    const labels = [];
    
    // X轴步长
    const stepX = (width - 2 * padding) / (sysData.length - 1);
    
    // 生成坐标点
    sysData.forEach((value, i) => {
      const x = padding + i * stepX;
      const y = padding + (height - padding - labelHeight) * (1 - (value - minSys) / (maxSys - minSys || 1));
      sysPoints.push({x, y, value});
      
      // 日期标签
      if (i % 2 === 0) {
        labels.push({
          x,
          y: height - 5,
          text: `7/${15 + i}`
        });
      }
    });
    
    diaData.forEach((value, i) => {
      const x = padding + i * stepX;
      const y = padding + (height - padding - labelHeight) * (1 - (value - minDia) / (maxDia - minDia || 1));
      diaPoints.push({x, y, value});
    });
    
    return { sysPoints, diaPoints, labels };
  },
  
  generateSingleChartPoints(data, width) {
    const height = 150;
    const padding = 20;
    const labelHeight = 30;
    
    // 计算最大值最小值
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    
    const dataPoints = [];
    const labels = [];
    
    // X轴步长
    const stepX = (width - 2 * padding) / (data.length - 1);
    
    // 生成坐标点
    data.forEach((value, i) => {
      const x = padding + i * stepX;
      const y = padding + (height - padding - labelHeight) * (1 - (value - minValue) / (maxValue - minValue || 1));
      dataPoints.push({x, y, value});
      
      // 日期标签
      if (i % 2 === 0) {
        labels.push({
          x,
          y: height - 5,
          text: `7/${15 + i}`
        });
      }
    });
    
    return { dataPoints, labels };
  },
  
  drawChartGrid(ctx, width, height) {
    const padding = 20;
    const labelHeight = 30;
    
    // 绘制网格
    ctx.setStrokeStyle('#f0f0f0');
    ctx.setLineWidth(1);
    
    // 水平线
    for (let i = 0; i <= 4; i++) {
      const y = padding + i * (height - padding - labelHeight) / 4;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }
    
    // 垂直线（只绘制部分）
    for (let i = 2; i < 7; i += 2) {
      const x = padding + i * (width - 2 * padding) / 6;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - labelHeight);
      ctx.stroke();
    }
  },
  
  drawChartLine(ctx, points, color) {
    ctx.setStrokeStyle(color);
    ctx.setLineWidth(2);
    
    // 绘制连线
    ctx.beginPath();
    points.forEach((point, i) => {
      if (i === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.stroke();
    
    // 绘制数据点
    points.forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      
      // 绘制数值标签
      ctx.setFillStyle('#333');
      ctx.setFontSize(10);
      ctx.fillText(point.value, point.x - 10, point.y - 10);
    });
  },
  
  addChartLabels(ctx, labels, width) {
    const padding = 20;
    ctx.setFillStyle('#999');
    ctx.setFontSize(10);
    
    labels.forEach(label => {
      ctx.fillText(label.text, label.x - 10, label.y);
    });
    
    // 绘制坐标轴
    ctx.setStrokeStyle('#999');
    ctx.setLineWidth(1);
    
    // Y轴
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, 150 - 30);
    ctx.stroke();
    
    // X轴
    ctx.beginPath();
    ctx.moveTo(padding, 150 - 30);
    ctx.lineTo(width - padding, 150 - 30);
    ctx.stroke();
  }
});