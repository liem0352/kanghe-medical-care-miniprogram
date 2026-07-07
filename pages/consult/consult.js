Page({
    data: {
      doctors: [
        {
          id: 1,
          name: "张明华",
          title: "主任医师",
          department: "心血管内科",
          experience: "三甲医院20年经验",
          avatar: "/images/doctor1.jpg"
        },
        {
          id: 2,
          name: "李秋萍",
          title: "副主任医师",
          department: "内分泌科",
          experience: "糖尿病专家",
          avatar: "/images/doctor2.jpg"
        }
      ],
      history: [
        {
          date: "2023-07-17",
          doctor: "张明华主任医师",
          type: "视频",
          status: "已完成"
        },
        {
          date: "2023-07-10",
          doctor: "王建伟主治医师",
          type: "图文",
          status: "已完成"
        }
      ]
    },
    
    startVideoConsult(e) {
      const doctorId = e.currentTarget.dataset.id;
      if (doctorId) {
        wx.navigateTo({
          url: `/pages/video-consult/video-consult?doctorId=${doctorId}`
        });
      } else {
        wx.showModal({
          title: '选择医生',
          content: '请选择一位医生进行视频咨询',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        });
      }
    },
    
    startTextConsult(e) {
      const doctorId = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/pages/text-consult/text-consult?doctorId=${doctorId}`
      });
    }
  });