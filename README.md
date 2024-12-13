# Web Development Project

- Chỉ push code lên branch `develop`

## Front-end
### 1. Naming convention
- Sử dụng `options` API của Vue
- Routes: đặt tên theo kebab-case (`/about/contact-information`)

### 2. Run front-end

```
$ cd client
$ npm install
$ npm run serve
```

## Back-end

### 1. Naming convention
**API & Routes**: kebab-case 
- `/about/contact-information`


**Files**:
- Đặt tên files bằng camelCase (ngoại trừ `/models` dùng PascalCase)

- `/models`:  User.js, Product.js, Category.js...
- `/controllers`:  userC.js, productC.js...
- `/routes`: userR.js, adminR.js...

### Run backend
```
$ cd server
$ npm install
$ npm start
```