// index.js
Page({
    data: {
      user: {
        name: "张明惠",
        healthScore: 86
      },
      city: "肇庆",
      weatherData: {
        temperature: 28
      },
      healthData: {
        heartRate: [78, 82, 76, 79, 85, 80, 78], 
        bloodPressure: [125, 118, 122, 115, 120, 116, 122],
        dates: ['一', '二', '三', '四', '五', '六', '日'],
        lastUpdate: "今天 09:30"
      },
      // 服务菜单数据
      showServiceMenu: false,
      currentService: {
        name: "",
        items: []
      },
      services: [
        {
          name: "在线问诊",
          icon: "🩺",
          items: [
            {id: "c1", name: "图文咨询", url: "/pages/consultation/text"},
            {id: "c2", name: "视频问诊", url: "/pages/consultation/video"},
            {id: "c3", name: "电话咨询", url: "/pages/consultation/phone"}
          ]
        },
        {
          name: "用药管理",
          icon: "💊",
          items: [
            {id: "m1", name: "用药记录", url: "/pages/medication/record"},
            {id: "m2", name: "用药提醒", url: "/pages/medication/reminder"},
            {id: "m3", name: "药品库", url: "/pages/medication/library"}
          ]
        },
        {
          name: "预约挂号",
          icon: "📅",
          items: [
            {id: "a1", name: "预约医生", url: "/pages/appointment/doctor"},
            {id: "a2", name: "我的预约", url: "/pages/appointment/list"},
            {id: "a3", name: "预约记录", url: "/pages/appointment/history"}
          ]
        },
        {
          name: "健康档案",
          icon: "📋",
          items: [
            {id: "h1", name: "健康数据", url: "/pages/health/data"},
            {id: "h2", name: "体检报告", url: "/pages/health/report"},
            {id: "h3", name: "病历记录", url: "/pages/health/record"}
          ]
        },
        {
          name: "家庭账户",
          icon: "👨‍👩‍👧",
          items: [
            {id: "f1", name: "成员管理", url: "/pages/family/members"},
            {id: "f2", name: "健康动态", url: "/pages/family/status"},
            {id: "f3", name: "用药提醒", url: "/pages/family/reminders"}
          ]
        },
        {
          name: "健康报告",
          icon: "📊",
          items: [
            {id: "r1", name: "周报", url: "/pages/report/weekly"},
            {id: "r2", name: "月报", url: "/pages/report/monthly"},
            {id: "r3", name: "年度报告", url: "/pages/report/annual"}
          ]
        },
        {
          name: "运动计划",
          icon: "🏃",
          items: [
            {id: "s1", name: "计划制定", url: "/pages/fitness/plan"},
            {id: "s2", name: "运动记录", url: "/pages/fitness/record"},
            {id: "s3", name: "运动建议", url: "/pages/fitness/suggestion"}
          ]
        },
        {
          name: "营养膳食",
          icon: "🥗",
          items: [
            {id: "n1", name: "饮食建议", url: "/pages/nutrition/advice"},
            {id: "n2", name: "食谱推荐", url: "/pages/nutrition/recipes"},
            {id: "n3", name: "营养分析", url: "/pages/nutrition/analysis"}
          ]
        }
      ],
      reminders: [
        {
          id: "r1",
          type: "",
          title: "硝苯地平片",
          time: "上午 09:00 · 1粒",
          actionText: "记录",
          recorded: false
        },
        {
          id: "r2",
          type: "medication",
          title: "阿司匹林肠溶片",
          time: "晚上 19:00 · 1粒",
          actionText: "记录",
          recorded: false
        },
        {
          id: "r3",
          type: "appointment",
          title: "心血管内科复诊",
          time: "明天 10:30 · 门诊二楼",
          actionText: "查看",
          recorded: false
        }
      ],
      showEmergencyModal: false,
      showAddReminderModal: false,
      newReminderContent: "",
      newReminderTime: "",
      reminderTypeIndex: 0,
      reminderTypes: ["用药提醒", "复诊预约", "健康检测", "测量血压", "服药记录"],
      
      // 图表数据 - 随机生成
      chartData: null
    },
  
    onLoad() {
      // 初始化加载数据
      this.loadHealthData();
      
      // 生成随机图表数据
      this.generateRandomChartData();
    },
  
    onReady() {
      // 页面渲染完成后初始化图表
      this.initChart();
    },
  
    // 生成随机图表数据
    generateRandomChartData() {
      const heartRate = [];
      const bloodPressure = [];
      
      // 生成7天的随机数据
      for (let i = 0; i < 7; i++) {
        heartRate.push(Math.floor(Math.random() * 20) + 70); // 70-90之间的随机心率
        bloodPressure.push(Math.floor(Math.random() * 30) + 100); // 100-130之间的随机收缩压
      }
      
      this.setData({
        chartData: {
          dates: ['一', '二', '三', '四', '五', '六', '日'],
          heartRate,
          bloodPressure
        }
      });
    },
  
    // 加载健康数据（模拟API调用）
    loadHealthData() {
      // 实际项目中替换为API请求
      const healthData = {
        heartRate: Math.floor(Math.random() * 10) + 70,
        bloodPressure: `${Math.floor(Math.random() * 20) + 110}/${Math.floor(Math.random() * 15) + 70}`,
        bloodOxygen: Math.floor(Math.random() * 3) + 96,
        steps: (Math.floor(Math.random() * 2000) + 3000).toLocaleString(),
        lastUpdate: "今天 " + new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      };
  
      // 计算健康分数（示例算法）
      const healthScore = Math.min(100, Math.max(60, 85 + Math.floor(Math.random() * 10)));
  
      this.setData({
        healthData,
        healthScore
      });
    },
  
    // 初始化图表（关键）
    initChart() {
      if (!this.data.chartData) return;
      
      // 获取Canvas实际尺寸
      const query = wx.createSelectorQuery().in(this);
      query.select('#healthChart').boundingClientRect((res) => {
        if (!res) return;
        
        // 动态设置Canvas尺寸
        this.setData({
          chartWidth: res.width,
          chartHeight: res.height
        }, () => {
          // 渲染图表
          this.renderHealthChart();
        });
      }).exec();
    },
  
    // 渲染健康趋势图（优化版）
    renderHealthChart() {
      const ctx = wx.createCanvasContext('healthChart', this);
      const { chartWidth, chartHeight } = this.data;
      const { heartRate, bloodPressure, dates } = this.data.chartData;
      
      if (!chartWidth || !chartHeight) return;

      // 清空画布
      ctx.clearRect(0, 0, chartWidth, chartHeight);
      
      // 绘制背景
      ctx.setFillStyle('#f1f9f4');
      ctx.fillRect(0, 0, chartWidth, chartHeight);
      
      // 计算数据范围（确保有最小高度差）
      const allData = [...heartRate, ...bloodPressure];
      let minVal = Math.min(...allData);
      let maxVal = Math.max(...allData);
      if (maxVal - minVal < 20) {
        minVal = Math.max(0, minVal - 10);
        maxVal = maxVal + 10;
      }
      
      // 设置绘图区域边距
      const padding = {
        top: 20,
        right: 30,
        bottom: 40,
        left: 40
      };
      
      // 计算实际绘图区域
      const plotWidth = chartWidth - padding.left - padding.right;
      const plotHeight = chartHeight - padding.top - padding.bottom;
      
      // 绘制网格线
      ctx.setStrokeStyle('#e0e0e0');
      ctx.setLineWidth(1);
      
      // 水平网格线
      const horizontalLines = 5;
      for (let i = 0; i <= horizontalLines; i++) {
        const y = padding.top + (i * plotHeight / horizontalLines);
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(chartWidth - padding.right, y);
        ctx.stroke();
      }
      
      // 垂直网格线
      const verticalLines = dates.length - 1;
      for (let i = 0; i <= verticalLines; i++) {
        const x = padding.left + (i * plotWidth / verticalLines);
        ctx.beginPath();
        ctx.moveTo(x, padding.top);
        ctx.lineTo(x, chartHeight - padding.bottom);
        ctx.stroke();
      }
      
      // 绘制数据线
      const drawDataLine = (data, color) => {
        ctx.beginPath();
        ctx.setStrokeStyle(color);
        ctx.setLineWidth(2);
        
        data.forEach((val, i) => {
          const x = padding.left + (i * plotWidth / (data.length - 1));
          const y = padding.top + plotHeight - ((val - minVal) / (maxVal - minVal)) * plotHeight;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          
          // 绘制数据点
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.setFillStyle(color);
          ctx.fill();
        });
        
        ctx.stroke();
      };
      
      // 绘制心率线
      drawDataLine(heartRate, '#ff4d4f');
      
      // 绘制血压线
      drawDataLine(bloodPressure, '#1890ff');
      
      // 绘制坐标轴标签
      ctx.setFontSize(12);
      ctx.setFillStyle('#666');
      
      // X轴标签（日期）
      dates.forEach((date, i) => {
        const x = padding.left + (i * plotWidth / (dates.length - 1));
        ctx.fillText(date, x - 8, chartHeight - 15);
      });
      
      // Y轴标签（数值）
      const yLabels = 5;
      for (let i = 0; i <= yLabels; i++) {
        const value = Math.round(minVal + (i * (maxVal - minVal) / yLabels));
        const y = padding.top + plotHeight - (i * plotHeight / yLabels);
        ctx.fillText(value.toString(), 10, y + 4);
      }
      
      // 绘制图例
      ctx.setFontSize(14);
      
      // 心率图例
      ctx.setFillStyle('#ff4d4f');
      ctx.beginPath();
      ctx.arc(padding.left + 20, padding.top + 20, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText('心率', padding.left + 35, padding.top + 26);
      
      // 血压图例
      ctx.setFillStyle('#1890ff');
      ctx.beginPath();
      ctx.arc(padding.left + 20, padding.top + 50, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText('血压', padding.left + 35, padding.top + 56);
      
      // 渲染
      ctx.draw();
    },
    
    // 新的绘制线条方法
    drawLine(ctx, data, color, minVal, range, width, height) {
      if (!data || !data.length) return;
      
      const padding = 20;
      const step = (width - padding * 2) / (data.length - 1);
      const availableHeight = height - padding * 2;
      
      ctx.beginPath();
      ctx.setStrokeStyle(color);
      ctx.setLineWidth(2);
      
      data.forEach((val, i) => {
        const x = padding + i * step;
        const y = padding.top + plotHeight - ((val - minVal) / (maxVal - minVal)) * plotHeight;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        
        // 绘制数据点
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.setFillStyle(color);
        ctx.fill();
      });
      
      ctx.stroke();
    },
  
    // 绘制网格（辅助函数）
    drawGrid(ctx, width, height) {
      ctx.setStrokeStyle('#f0f0f0');
      ctx.setLineWidth(1);
  
      // 水平网格线（5条）
      for (let i = 0; i <= 5; i++) {
        const y = 30 + i * (height - 60) / 5;
        ctx.beginPath();
        ctx.moveTo(40, y);
        ctx.lineTo(width - 20, y);
        ctx.stroke();
      }
  
      // 垂直网格线（6条，对应星期）
      const xStep = (width - 60) / 6;
      for (let i = 0; i <= 6; i++) {
        const x = 40 + i * xStep;
        ctx.beginPath();
        ctx.moveTo(x, 30);
        ctx.lineTo(x, height - 30);
        ctx.stroke();
      }
    },
  
    // 绘制坐标轴
    drawAxis(ctx, dates, minVal, maxVal, width, height) {
      ctx.setFontSize(12);
      ctx.setFillStyle('#666');
      
      // 绘制日期标签（X轴）
      const padding = 20;
      const xStep = (width - padding * 2) / (dates.length - 1);
      dates.forEach((date, index) => {
        const x = padding + index * xStep;
        ctx.fillText(date, x - 8, height - 10);
      });
      
      // 绘制数值标签（Y轴）
      const yValues = [minVal, minVal + (maxVal - minVal) * 0.25, 
                      minVal + (maxVal - minVal) * 0.5, 
                      minVal + (maxVal - minVal) * 0.75, maxVal];
      const yStep = (height - padding * 2) / (yValues.length - 1);
      
      yValues.forEach((value, index) => {
        const y = height - padding - index * yStep;
        ctx.fillText(Math.round(value).toString(), 10, y + 4);
      });
    },
  
    // 绘制坐标轴标签（日期/数值）
    drawAxisLabels(ctx, width, height, dates) {
      ctx.setFontSize(12);
      ctx.setFillStyle('#666');
  
      // 绘制日期标签（X轴）
      const xStep = (width - 60) / (dates.length - 1);
      dates.forEach((date, index) => {
        const x = 40 + index * xStep;
        ctx.fillText(date, x - 8, height - 10);
      });
  
      // 绘制数值标签（Y轴）
      const yValues = [0, 20, 40, 60, 80, 100]; // 假设数据范围 0-100
      const yStep = (height - 60) / (yValues.length - 1);
      yValues.forEach((value, index) => {
        const y = 30 + index * yStep;
        ctx.fillText(value.toString(), 10, y + 4);
      });
    },
  
    // 绘制图例（心率/血压标识）
    drawLegend(ctx) {
      ctx.setFontSize(14);
      
      // 心率图例
      ctx.setFillStyle('#ff4d4f');
      ctx.beginPath();
      ctx.arc(20, 20, 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillText('心率', 35, 26);
  
      // 血压图例
      ctx.setFillStyle('#1890ff');
      ctx.beginPath();
      ctx.arc(20, 50, 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillText('血压', 35, 56);
    },
    
    // 显示紧急求助对话框
    showEmergency() {
      this.setData({
        showEmergencyModal: true
      });
    },
  
    // 取消紧急求助
    cancelEmergency() {
      this.setData({
        showEmergencyModal: false
      });
    },
  
    // 确认紧急求助
    confirmEmergency() {
      this.setData({
        showEmergencyModal: false
      });
      
      // 显示成功提示
      wx.showToast({
        title: '求助已发送！社区医疗中心将在3分钟内与您联系',
        icon: 'none',
        duration: 3000
      });
    },
  
    // 显示添加提醒对话框
    showAddReminder() {
      this.setData({
        showAddReminderModal: true,
        newReminderContent: "",
        newReminderTime: "",
        reminderTypeIndex: 0
      });
    },
  
    // 取消添加提醒
    cancelAddReminder() {
      this.setData({
        showAddReminderModal: false
      });
    },
  
    // 选择提醒类型
    bindReminderTypeChange(e) {
      this.setData({
        reminderTypeIndex: e.detail.value
      });
    },
  
    // 输入提醒内容
    bindReminderContentInput(e) {
      this.setData({
        newReminderContent: e.detail.value
      });
    },
  
    // 选择提醒时间
    bindReminderTimeChange(e) {
      this.setData({
        newReminderTime: e.detail.value
      });
    },
  
    // 添加新提醒
    addNewReminder() {
      const { newReminderContent, newReminderTime, reminderTypeIndex, reminderTypes } = this.data;
      
      if (!newReminderContent || !newReminderTime) {
        wx.showToast({
          title: '请填写完整信息',
          icon: 'none',
          duration: 2000
        });
        return;
      }
  
      const typeMap = {
        0: "medication",
        1: "appointment",
        2: "",
        3: "",
        4: ""
      };
  
      const newReminder = {
        id: "r" + new Date().getTime(),
        type: typeMap[reminderTypeIndex] || "",
        title: newReminderContent,
        time: newReminderTime + " · " + reminderTypes[reminderTypeIndex],
        actionText: reminderTypeIndex === 1 ? "查看" : "记录",
        recorded: false
      };
  
      this.setData({
        reminders: [...this.data.reminders, newReminder],
        showAddReminderModal: false
      });
  
      wx.showToast({
        title: '提醒添加成功',
        icon: 'success',
        duration: 2000
      });
    },
  
    // 处理提醒操作
    toggleReminderStatus(e) {
      const id = e.currentTarget.dataset.id;
      const reminders = this.data.reminders.map(item => {
        if (item.id === id) {
          return {
            ...item,
            recorded: !item.recorded
          };
        }
        return item;
      });
  
      this.setData({ 
        reminders 
      });
      
      // 如果是用药提醒，显示提示信息
      if (reminders.find(item => item.id === id).type === "medication") {
        const title = reminders.find(item => item.id === id).title;
        wx.showToast({
          title: reminders.find(item => item.id === id).recorded ? `${title} 已记录` : `${title} 重置为未记录`,
          icon: 'success',
          duration: 2000
        });
      }
    },
    
    // 导航到不同页面
    navigateTo(e) {
      const page = e.currentTarget.dataset.page;
      wx.navigateTo({
        url: page
      });
    },
  
    // 查看健康趋势
    viewHealthTrend() {
      wx.navigateTo({
        url: '/pages/health/trend'
      });
    },
  
    // 查看所有提醒
    viewAllReminders() {
      wx.navigateTo({
        url: '/pages/reminders/index',
        events: {
          acceptReminders: (data) => {
            console.log(data);
          }
        },
        success: (res) => {
          res.eventChannel.emit('passReminders', { reminders: this.data.reminders })
        }
      });
    },
    
    // 显示服务菜单
    showServiceMenu(e) {
      const serviceName = e.currentTarget.dataset.service;
      const service = this.data.services.find(s => s.name === serviceName);
      
      if (service) {
        this.setData({
          showServiceMenu: true,
          currentService: {
            name: service.name,
            items: service.items
          }
        });
      }
    },
    
    // 隐藏服务菜单
    hideServiceMenu() {
      this.setData({
        showServiceMenu: false
      });
    },
    
    // 导航到服务页面
    navigateToService(e) {
      const url = e.currentTarget.dataset.url;
      wx.navigateTo({
        url: url
      });
      this.hideServiceMenu();
    }
  });
