# Web Development Project
- Chỉ push code lên branch `develop`
## Refs
- API tham khảo: `https://furniture-api.fly.dev/#api-endpoints`
- Figma: `https://www.figma.com/design/gixsabCBgccjd2B8afw0a7/eCommerce-Website-%7C-Web-Page-Design-%7C-UI-KIT-%7C-Interior-Landing-Page-(Community)?node-id=0-1&p=f&t=twMyE89MLEiXLEg3-0`
## Front-end
### 1. Naming convention
- Sử dụng `options` API của Vue
- Routes: đặt tên theo kebab-case (`/about/contact-information`)

### 2. Run app

```
$ npm start
```


### 1. Naming convention
**API & Routes**: kebab-case 
- `/about/contact-information`


**Files**:
- Đặt tên files bằng camelCase (ngoại trừ `/models` dùng PascalCase)

- `/models`:  User.js, Product.js, Category.js...
- `/controllers`:  userC.js, productC.js...
- `/routes`: userR.js, adminR.js...
