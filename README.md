# 康禾医养微信小程序

> 作者：liem

## 项目简介

康禾医养微信小程序是一个原生微信小程序项目，为老年人和慢性病患者提供健康管理与医疗服务。涵盖首页、医疗、健康、家庭、个人中心等多个模块，提供在线咨询、用药管理、健康监测、紧急求助等功能。

## 功能模块

### 首页（index）
- 健康概览：实时显示心率、血压、血氧等健康指标
- 快捷服务入口：在线问诊、用药管理、预约挂号
- 今日提醒：用药提醒、复诊提醒

### 医疗服务（service）
- 上门护理：专业护理人员上门服务
- 康复理疗：康复理疗项目预约
- 心理关怀：心理咨询与疏导
- 专业陪诊：就医陪护服务

### 健康监测（health）
- 心率监测：实时心率数据
- 血压监测：血压数据记录与趋势
- 血氧监测：血氧饱和度监测
- 健康评估：综合健康评分

### 慢病管理（chronic）
- 慢性病记录：高血压、糖尿病等慢病管理
- 用药记录：用药情况跟踪
- 病情跟踪：症状变化记录

### 在线咨询（consult）
- 图文咨询：与医生在线交流
- 咨询记录：历史咨询查看

### 用药管理（prescription）
- 处方查看：医生开具的处方
- 用药提醒：按时服药提醒

### 家庭管理（family）
- 家庭成员：添加与管理家庭成员
- 健康动态：查看家人健康状态
- 用药提醒：为家人设置用药提醒

### 个人中心（profile）
- 用户信息：个人信息管理
- 登录认证：手机号登录
- 紧急求助：一键 SOS 求助

### 登录（login）
- 手机号登录
- 验证码登录

## 技术栈

| 技术 | 说明 |
|------|------|
| 微信小程序原生框架 | WXML + WXSS + JavaScript |
| 自定义组件 | modal、doctor-card、health-card、sos-button |
| 微信小程序 API | 网络、存储、位置、设备等 |

## 自定义组件

| 组件 | 路径 | 说明 |
|------|------|------|
| `modal` | `components/modal/` | 通用模态框组件 |
| `doctor-card` | `components/doctor-card/` | 医生信息卡片 |
| `health-card` | `components/health-card/` | 健康数据卡片 |
| `sos-button` | `components/sos-button/` | 紧急求助按钮 |
| `auth` | `components/auth/` | 权限验证组件 |

## 项目结构

```
├── app.js                    # 小程序入口
├── app.json                  # 全局配置（页面路由、窗口、tabBar）
├── app.wxss                  # 全局样式
├── project.config.json       # 项目配置
├── project.private.config.json  # 项目私有配置
├── components/               # 自定义组件
│   ├── modal/                # 模态框
│   ├── auth/                 # 权限验证
│   ├── doctor-card/          # 医生卡片
│   ├── health-card/          # 健康卡片
│   └── sos-button/           # SOS 按钮
├── pages/                    # 页面
│   ├── index/                # 首页
│   ├── service/              # 医疗服务
│   ├── health/               # 健康监测
│   ├── family/               # 家庭管理
│   ├── profile/              # 个人中心
│   ├── login/                # 登录
│   ├── consult/              # 在线咨询
│   ├── chronic/              # 慢病管理
│   └── prescription/         # 用药管理
├── services/                 # 业务服务
│   ├── medical.js            # 医疗服务
│   ├── scheduler.js          # 定时任务
│   └── sos.js                # 紧急求助
├── utils/                    # 工具函数
│   ├── api.js                # API 接口管理
│   ├── util.js               # 通用工具
│   ├── validator.js          # 数据验证
│   ├── locator.js            # 定位工具
│   └── encrypt.js            # 加密工具
└── images/                   # 图片资源
    ├── tab-icons/            # tabBar 图标
    └── ...                   # 其他图标
```

## 使用方式

### 环境要求
- 微信开发者工具（最新版本）
- 微信 AppID（需在微信公众平台注册）

### 运行步骤

1. 打开微信开发者工具
2. 选择「导入项目」
3. 选择本项目所在目录
4. 填入你的 AppID（或使用测试号）
5. 点击确定即可预览

### 真机预览

1. 在微信开发者工具中点击「预览」
2. 用微信扫描二维码
3. 在手机上体验小程序

## 配置说明

### API 配置
在 `utils/api.js` 中配置后端 API 地址：

```javascript
const BASE_URL = 'https://your-api-domain.com'
```

### 地图配置
在 `utils/locator.js` 中配置地图 API 密钥（用于位置服务）。

### tabBar 配置
`app.json` 中已配置底部导航栏，包含首页、医疗、健康、个人四个标签。

## 许可证

MIT License
