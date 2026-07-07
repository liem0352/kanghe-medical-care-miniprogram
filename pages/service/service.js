// pages/service/service.js
Page({
  data: {
    currentCategory: 'all',
    showServiceModal: false,
    historyFilter: 0, // 0:全部 1:进行中 2:已完成
    currentService: {
      title: '',
      price: '',
      time: '',
      desc: ''
    },
    services: [
      { type: 'homeCare', emoji: '💉', title: "上门护理", price: "¥120/次", time: "明天 上午 9:00-12:00", desc: "专业护士上门提供基础医疗服务" },
      { type: 'delivery', emoji: '📦', title: "送药上门", price: "免费", time: "2小时内送达", desc: "处方药品快速配送服务" },
      { type: 'consultation', emoji: '👨‍⚕️', title: "专家咨询", price: "¥80/次", time: "随时可约", desc: "三甲医院专家在线问诊" },
      { type: 'ambulance', emoji: '🚑', title: "一键急救", price: "免费", time: "立即响应", desc: "紧急情况快速响应服务" },
      { type: 'rehabilitation', emoji: '🛠️', title: "康复理疗", price: "¥150/次", time: "明天 10:00-17:00", desc: "专业康复师上门服务" },
      { type: 'psychological', emoji: '😊', title: "心理关怀", price: "¥100/次", time: "预约后1小时内", desc: "专业心理咨询师服务" },
      { type: 'massage', emoji: '💆‍♂️', title: "中医推拿", price: "¥120/次", time: "明天 14:00-20:00", desc: "传统中医理疗按摩" },
      { type: 'meal', emoji: '🍱', title: "助餐服务", price: "¥25/餐", time: "每日11:30-12:30", desc: "营养师搭配的健康餐食" },
      { type: 'companion', emoji: '👥', title: "专业陪诊", price: "¥90/次", time: "提前一天预约", desc: "专业人员陪同就医" }
    ],
    resources: [
      { id: 1, type: 'hospital', emoji: '🏥', name: "市一医院", top: 40, left: 38 },
      { id: 2, type: 'pharmacy', emoji: '💊', name: "康健大药房", top: 50, left: 52 },
      { id: 3, type: 'doctor', emoji: '👨‍⚕️', name: "李医生", top: 35, left: 55 },
      { id: 4, type: 'clinic', emoji: '🏥', name: "社区诊所", top: 60, left: 45 },
      { id: 5, type: 'pharmacy', emoji: '💊', name: "百姓大药房", top: 30, left: 60 }
    ],
    healthNews: [
      { id: 1, emoji: '🥗', title: "夏季健康饮食指南", desc: "营养师推荐的夏季养生食谱" },
      { id: 2, emoji: '🏃‍♂️', title: "老年人运动指南", desc: "适合长者的安全运动方式" },
      { id: 3, emoji: '😴', title: "改善睡眠质量", desc: "7个方法帮你睡得更香" }
    ],
    serviceHistory: [
      { id: 1, type: "上门护理", date: "2023-07-17", detail: "李护士 · 测量血压血糖", provider: "李护士", cost: "¥120", status: "已完成", statusClass: "status-completed" },
      { id: 2, type: "送药上门", date: "2023-07-10", detail: "硝苯地平片等3种药物", provider: "康健大药房", cost: "¥0", status: "已完成", statusClass: "status-completed" },
      { id: 3, type: "中医推拿", date: "2023-07-05", detail: "王医师 · 肩颈按摩", provider: "王医师", cost: "¥120", status: "已完成", statusClass: "status-completed" },
      { id: 4, type: "专家咨询", date: "2023-07-20", detail: "心血管疾病咨询", provider: "张主任", cost: "¥80", status: "进行中", statusClass: "status-pending" }
    ]
  },
  
  onLoad() {
    // 初始化筛选后的服务列表
    this.setData({
      filteredServices: this.data.services,
      filteredHistory: this.data.serviceHistory
    });
  },
  
  // 返回上一页
  goBack() {
    wx.navigateBack();
  },
  
  // 切换服务分类
  changeCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({ currentCategory: category });
    
    if (category === 'all') {
      this.setData({ filteredServices: this.data.services });
      return;
    }
    
    // 根据分类过滤服务
    const categoryMap = {
      emergency: ['ambulance'],
      daily: ['meal', 'companion'],
      health: ['delivery', 'rehabilitation', 'psychological'],
      special: ['homeCare', 'consultation', 'massage']
    };
    
    const filtered = this.data.services.filter(service => 
      categoryMap[category].includes(service.type)
    );
    
    this.setData({ filteredServices: filtered });
  },
  
  // 请求服务
  requestService(e) {
    const type = e.currentTarget.dataset.type;
    
    // 一键急救特殊处理
    if (type === 'ambulance') {
      wx.navigateTo({
        url: '/pages/sos/sos'
      });
      return;
    }
    
    // 查找对应服务
    const service = this.data.services.find(s => s.type === type) || {
      title: '定制服务',
      price: '¥0-¥200',
      time: '1-3小时',
      desc: '根据需求定制的专属服务'
    };
    
    this.setData({
      showServiceModal: true,
      currentService: service
    });
  },
  
  // 关闭服务模态框
  closeServiceModal() {
    this.setData({ showServiceModal: false });
  },
  
  // 确认服务预约
  confirmService() {
    const { title } = this.data.currentService;
    this.closeServiceModal();
    
    wx.showLoading({
      title: '预约中...',
    });
    
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: `已成功预约${title}服务`,
        icon: 'success',
        duration: 2000
      });
    }, 1500);
  },
  
  // 刷新服务资源
  refreshResources() {
    wx.showToast({
      title: '资源已刷新',
      icon: 'success'
    });
  },
  
  // 查看资源详情
  showResourceDetail(e) {
    const id = e.currentTarget.dataset.id;
    const resource = this.data.resources.find(r => r.id === id);
    
    wx.showModal({
      title: resource.name,
      content: `${resource.emoji} 点击可查看详细信息`,
      showCancel: false
    });
  },
  
  // 查看健康资讯详情
  viewMoreNews() {
    wx.navigateTo({
      url: '/pages/news/news'
    });
  },
  
  // 筛选服务记录
  filterHistory(e) {
    const index = e.detail.value;
    this.setData({ historyFilter: index });
    
    if (index == 0) {
      this.setData({ filteredHistory: this.data.serviceHistory });
      return;
    }
    
    const statusMap = {
      1: '进行中',
      2: '已完成'
    };
    
    const filtered = this.data.serviceHistory.filter(item => 
      item.status === statusMap[index]
    );
    
    this.setData({ filteredHistory: filtered });
  },
  
  // 查看服务记录详情
  viewHistoryDetail(e) {
    const id = e.currentTarget.dataset.id;
    const record = this.data.serviceHistory.find(r => r.id === id);
    
    wx.showModal({
      title: `${record.type}服务详情`,
      content: `服务时间: ${record.date}\n服务人员: ${record.provider}\n费用: ${record.cost}`,
      showCancel: false
    });
  },
  
  // 显示搜索框
  showSearch() {
    wx.showToast({
      title: '搜索功能',
      icon: 'none'
    });
  }
});