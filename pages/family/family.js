// pages/family/family.js
Page({
    data: {
      familyMembers: [
        {
          id: 1,
          name: "李丽",
          age: 45,
          relation: "配偶",
          status: "健康状态良好",
          phone: "13800138000",
          avatar: "/images/avatar1.png"
        },
        {
          id: 2,
          name: "张晓明",
          age: 22,
          relation: "儿子",
          status: "无异常数据",
          phone: "13900139000",
          avatar: "/images/avatar2.png"
        },
        {
          id: 3,
          name: "王梅",
          age: 68,
          relation: "母亲",
          status: "需要关注血压",
          phone: "13700137000",
          avatar: "/images/avatar3.png"
        }
      ],
      showAddMemberModal: false,
      newMember: {
        name: "",
        relation: "",
        phone: ""
      },
      relations: ["配偶", "父亲", "母亲", "儿子", "女儿", "其他亲属"],
      relationIndex: 0
    },
    
    goBack() {
      wx.navigateBack();
    },
    
    callMember(e) {
      const phone = e.currentTarget.dataset.phone;
      wx.makePhoneCall({
        phoneNumber: phone
      });
    },
    
    messageMember(e) {
      const phone = e.currentTarget.dataset.phone;
      wx.sendSms({
        phoneNumber: phone,
        content: '您好，我在康禾医养平台给您留言'
      });
    },
    
    addFamilyMember() {
      this.setData({
        showAddMemberModal: true,
        newMember: {
          name: "",
          relation: "",
          phone: ""
        }
      });
    },
    
    closeAddMemberModal() {
      this.setData({
        showAddMemberModal: false
      });
    },
    
    inputName(e) {
      this.setData({
        'newMember.name': e.detail.value
      });
    },
    
    relationChange(e) {
      const index = e.detail.value;
      const relation = this.data.relations[index];
      this.setData({
        'newMember.relation': relation,
        relationIndex: index
      });
    },
    
    inputPhone(e) {
      this.setData({
        'newMember.phone': e.detail.value
      });
    },
    
    confirmAddMember() {
      const { name, relation, phone } = this.data.newMember;
      
      if (!name || !relation || !phone) {
        wx.showToast({
          title: '请填写完整信息',
          icon: 'none'
        });
        return;
      }
      
      const newId = this.data.familyMembers.length + 1;
      const newMember = {
        id: newId,
        name,
        relation,
        phone,
        status: "等待绑定授权",
        avatar: "/images/avatar-default.png"
      };
      
      this.setData({
        familyMembers: [...this.data.familyMembers, newMember],
        showAddMemberModal: false
      });
      
      wx.showToast({
        title: '已发送绑定邀请',
        icon: 'success'
      });
    }
  });