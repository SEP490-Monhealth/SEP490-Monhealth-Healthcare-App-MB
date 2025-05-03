# 🌱 Monhealth - Ứng dụng chăm sóc sức khỏe toàn diện

<div align="center">
  <img src="https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Monhealth%2Ftests%2F29.jpg?alt=media&token=b73e8c97-8545-4ed7-ace1-97b92de428e3" alt="Monhealth Home Meal Tab Screen" />
  <p><i>Theo dõi sức khỏe của bạn mọi lúc, mọi nơi</i></p>
</div>

## 📱 Tổng quan

**Monhealth** là ứng dụng di động hiện đại giúp người dùng quản lý sức khỏe toàn diện trong cuộc sống hàng ngày. Được phát triển bằng React Native và Expo, ứng dụng mang đến trải nghiệm mượt mà, nhanh chóng trên cả nền tảng iOS và Android.

## ✨ Tính năng chính

### 📊 Quản lý dinh dưỡng & bữa ăn

- **Theo dõi chi tiết**: Ghi lại và phân tích lượng calo, protein, carbs và chất béo từ mỗi bữa ăn
- **Thư viện thực phẩm**: Cơ sở dữ liệu đầy đủ với hàng nghìn món ăn phổ biến
- **Biểu đồ dinh dưỡng**: Hiển thị tiến trình và xu hướng dinh dưỡng theo thời gian

### 💧 Theo dõi nước uống

- **Nhắc nhở thông minh**: Thông báo uống nước định kỳ dựa trên thói quen cá nhân
- **Mục tiêu tùy chỉnh**: Điều chỉnh mục tiêu lượng nước uống dựa trên nhu cầu cá nhân
- **Theo dõi trực quan**: Biểu đồ trực quan hiển thị lượng nước uống hàng ngày

### 🏋️ Gợi ý và theo dõi bài tập

- **Thư viện bài tập**: Hàng trăm bài tập với hướng dẫn chi tiết
- **Lịch tập luyện**: Lập kế hoạch tập luyện với nhắc nhở tự động
- **Đo lường kết quả**: Theo dõi tiến trình và calo đã đốt cháy qua từng buổi tập

### 🥗 Phân loại thực phẩm thông minh

- **Tìm kiếm nhanh**: Dễ dàng tìm thực phẩm theo tên hoặc danh mục
- **Phân loại chi tiết**: Nhóm thực phẩm theo đặc tính dinh dưỡng và lợi ích sức khỏe
- **Gợi ý cá nhân hóa**: Đề xuất thực phẩm phù hợp với mục tiêu sức khỏe

## 🛠️ Công nghệ sử dụng

### Frontend

- **React Native**: Framework xây dựng ứng dụng di động đa nền tảng
- **Expo**: Bộ công cụ và dịch vụ giúp đơn giản hóa quá trình phát triển
- **TypeScript**: Hệ thống kiểu dữ liệu tĩnh giúp code an toàn và dễ bảo trì
- **TailwindCSS (nativewind)**: Công cụ styling hiệu quả với các utility classes

### State Management & Data Fetching

- **Zustand**: Quản lý state toàn cục đơn giản và mạnh mẽ
- **React Query**: Quản lý trạng thái server-side, caching và đồng bộ dữ liệu
- **AsyncStorage**: Lưu trữ dữ liệu cục bộ trên thiết bị

### Networking & Integration

- **Axios**: Thư viện HTTP client mạnh mẽ cho giao tiếp API
- **SignalR**: Hỗ trợ kết nối realtime cho các tính năng tương tác

### UI/UX Components

- **Lottie**: Tạo hoạt ảnh đẹp mắt và mượt mà
- **React Native SVG**: Hỗ trợ đồ họa vector
- **React Native Circular Progress**: Tạo biểu đồ tròn hiển thị tiến trình

### Validation & Security

- **Zod**: Xác thực schema dữ liệu mạnh mẽ
- **React Hook Form**: Quản lý form và validation hiệu quả

### Development Tools

- **ESLint & Prettier**: Đảm bảo code style nhất quán
- **Jest**: Framework testing cho unit tests
- **React Testing Library**: Công cụ kiểm thử UI components

## 📥 Cài đặt và khởi chạy

### Yêu cầu hệ thống

- Node.js (v18.0.0 trở lên)
- npm hoặc yarn
- Expo CLI
- Máy ảo Android/iOS hoặc thiết bị thật

### Các bước cài đặt

1. **Clone dự án**

   ```bash
   git clone https://github.com/SEP490-Monhealth/SEP490-Monhealth-Healthcare-App-MB.git
   cd Monhealth-Healthcare-App-MB
   ```

2. **Cài đặt các gói phụ thuộc**

   ```bash
   npm install
   # hoặc
   yarn install
   ```

3. **Thiết lập biến môi trường**

   ```bash
   cp .env.example .env
   # Cập nhật các giá trị trong file .env
   ```

4. **Khởi chạy ứng dụng**

   ```bash
   # Khởi động Expo server
   npx expo start

   # Chạy trên Android
   npm run android

   # Chạy trên iOS
   npm run ios

   # Chạy trên Web
   npm run web
   ```

5. **Build ứng dụng cho môi trường cụ thể**

   ```bash
   # Build cho môi trường development
   npm run build:dev

   # Build cho môi trường preview
   npm run build:preview

   # Build cho production (Android)
   npm run build:android:prod

   # Build cho production (iOS)
   npm run build:ios:prod
   ```

## 🧪 Kiểm thử

```bash
# Chạy tất cả các test
npm run test

# Kiểm tra độ phủ test
npm run coverage

# Kiểm tra lỗi cú pháp
npm run lint

# Sửa lỗi cú pháp tự động
npm run lint:fix
```

## 📁 Cấu trúc thư mục

```
monhealth/
├── app/                # Thư mục chính chứa các routes và screens
│   ├── (auth)/         # Stack điều hướng cho các màn hình đăng nhập/đăng ký
│   ├── (tabs)/         # Các tab chính của ứng dụng
│   ├── index.tsx       # Entry point của ứng dụng
│   └── _layout.tsx     # Layout tổng thể
├── assets/             # Hình ảnh, fonts và tài nguyên tĩnh
├── components/         # React components tái sử dụng
│   ├── common/         # Components cơ bản (buttons, inputs, etc.)
│   ├── features/       # Components đặc thù cho từng tính năng
│   └── layout/         # Components layout
├── constants/          # Các hằng số và giá trị cấu hình
├── hooks/              # Custom React hooks
├── services/           # Logic giao tiếp API và xử lý dữ liệu
├── stores/             # Zustand stores để quản lý state
├── types/              # TypeScript type definitions
└── utils/              # Các hàm tiện ích
```

## 👥 Nhóm phát triển

Dự án được phát triển bởi nhóm 5 thành viên tài năng:

- **Văn Hữu Toàn** - Team Leader & UI/UX Designer
- **Nguyễn Quốc Đại** - Lead Developer & Architect
- **Phan Văn Khải** - QA Engineer & Testing
- **Phạm Hoài Duy** - Backend Integration & API Developer
- **Nguyễn Phạm Khanh** - Data Management & Performance Optimization

## 📄 Giấy phép

Dự án được phát hành dưới [Giấy phép MHA](LICENSE).

## 📞 Liên hệ và hỗ trợ

Nếu bạn có bất kỳ câu hỏi hoặc đề xuất nào, vui lòng liên hệ:

- **Email**: monhealth.contact@gmail.com
- **GitHub**: [SEP490-Monhealth](https://github.com/SEP490-Monhealth)

---

<div align="center">
  <p>© 2025 Monhealth. Mọi quyền được bảo lưu.</p>
</div>
