<p align="center">
  <img src="./assets/readme/hero.svg" width="100%" alt="kanghe-medical-care-miniprogram 康禾医养微信小程序,原生小程序医养健康管理系统">
</p>

# 康禾医养微信小程序

一个原生微信小程序项目，为老年人和慢性病患者提供健康管理与医疗服务。涵盖首页、医疗、健康、家庭、个人中心等模块，提供在线咨询、用药管理、健康监测、紧急求助等功能。

## 功能模块

| 模块 | 路径 | 说明 |
|------|------|------|
| 首页 | `index` | 健康概览（心率/血压/血氧）、快捷服务入口、今日提醒 |
| 医疗服务 | `service` | 上门护理、康复理疗、心理关怀、专业陪诊 |
| 健康监测 | `health` | 心率/血压/血氧监测、健康评估 |
| 慢病管理 | `chronic` | 慢性病记录、用药记录、病情跟踪 |
| 在线咨询 | `consult` | 图文咨询、咨询记录 |
| 用药管理 | `prescription` | 处方查看、用药提醒 |
| 家庭管理 | `family` | 家庭成员、健康动态、为家人设置提醒 |
| 个人中心 | `profile` | 用户信息、登录认证、紧急求助 |
| 登录 | `login` | 手机号登录、验证码登录 |

## 技术栈

| 技术 | 说明 |
|------|------|
| 微信小程序原生框架 | WXML + WXSS + JavaScript |
| 自定义组件 | modal、doctor-card、health-card、sos-button、auth |
| 微信小程序 API | 网络、存储、位置、设备等 |

## 自定义组件

| 组件 | 路径 | 说明 |
|------|------|------|
| `modal` | `components/modal/` | 通用模态框 |
| `doctor-card` | `components/doctor-card/` | 医生信息卡片 |
| `health-card` | `components/health-card/` | 健康数据卡片 |
| `sos-button` | `components/sos-button/` | 紧急求助按钮 |
| `auth` | `components/auth/` | 权限验证组件 |

## 项目结构

```
├── app.js · app.json · app.wxss          # 入口与全局配置
├── project.config.json
├── components/                            # 自定义组件
│   ├── modal/  auth/  doctor-card/
│   ├── health-card/  sos-button/
├── pages/                                # 页面
│   ├── index/  service/  health/  family/
│   ├── profile/  login/  consult/
│   └── chronic/  prescription/
├── services/                             # 业务服务
│   ├── medical.js  scheduler.js  sos.js
├── utils/                                # 工具函数
│   ├── api.js  util.js  validator.js
│   ├── locator.js  encrypt.js
└── images/                               # 图片资源（tab-icons 等）
```

## 使用方式

**环境**：微信开发者工具（最新版本）+ 微信 AppID（需在公众平台注册）

1. 打开微信开发者工具 →「导入项目」→ 选择本项目目录
2. 填入 AppID（或使用测试号）→ 确定预览
3. 真机预览：点击「预览」生成二维码，微信扫码体验

## 配置说明

- **API 配置**：`utils/api.js` 中设置 `BASE_URL`
- **地图配置**：`utils/locator.js` 中配置地图 API 密钥
- **tabBar**：`app.json` 配置底部导航（首页、医疗、健康、个人）

## 许可证

MIT License

---

<p align="center"><sub>作者 liem · 康禾医养微信小程序</sub></p>
