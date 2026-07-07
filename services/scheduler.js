// 基于LBS的医护人员调度
export const findAvailableMedics = (serviceType) => {
    return new Promise((resolve) => {
      wx.getLocation({
        type: 'wgs84',
        success: (loc) => {
          // 获取10km半径内的可用医护资源
          wx.request({
            url: 'https://scheduler-api.example.com/medics',
            method: 'GET',
            data: {
              lat: loc.latitude,
              lon: loc.longitude,
              radius: 10, // km
              skill: serviceType
            },
            success: resolve
          })
        }
      })
    })
  }
  
  // 动态定价模型
  export const calculateServicePrice = (params) => {
    const basePrice = 100 // 基础服务费
    const distanceFactor = Math.max(1, params.distance / 5) // 距离因子
    const urgencyFactor = params.urgent ? 1.5 : 1 // 紧急程度
    const durationFactor = params.duration / 30 // 时长因子
    
    // 综合定价公式
    return Math.round(basePrice * distanceFactor * urgencyFactor * durationFactor)
  }