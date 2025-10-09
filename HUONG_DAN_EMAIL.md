# Hướng Dẫn Nhanh - Email Contact Form

## 🎯 Đã Làm Gì?

Tôi đã thêm đầy đủ tính năng gửi email cho trang contact với các tính năng:

### ✅ Chức năng chính

1. **Gửi email thực tế** - Sử dụng Resend API (dịch vụ email chuyên nghiệp)
2. **Chống spam tự động** - Giới hạn 3 email/giờ mỗi địa chỉ IP
3. **Bảo mật tốt** - Validation, sanitization, và rate limiting
4. **UI/UX đẹp** - Loading state, thông báo success/error, counter ký tự
5. **Email template đẹp** - HTML email với design chuyên nghiệp

## 📁 Files Đã Tạo/Sửa

1. **`lib/rate-limit.ts`** - Hệ thống chống spam
2. **`app/api/contact/route.ts`** - API endpoint xử lý gửi email
3. **`app/contact/page.tsx`** - Contact form với state management
4. **`env.example`** - Template cho environment variables
5. **`EMAIL_SETUP.md`** - Hướng dẫn chi tiết setup
6. **`package.json`** - Đã cài `resend` package

## 🚀 Cách Setup Nhanh

### Bước 1: Cài đặt packages (Đã làm sẵn)

```bash
npm install resend @react-email/components @react-email/render
```

**Lưu ý**: Packages đã được cài đặt sẵn trong project!

### Bước 2: Đăng ký Resend (Miễn phí)

```
1. Vào https://resend.com
2. Đăng ký tài khoản
3. Lấy API Key
```

### Bước 3: Tạo file .env.local

Tạo file `.env.local` trong thư mục gốc:

```env
# Email Configuration
RESEND_API_KEY=re_xxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=onboarding@resend.dev
CONTACT_EMAIL=dangnguyen28.work@gmail.com
```

**Chú ý:**

- `RESEND_API_KEY`: Lấy từ Resend dashboard
- `RESEND_FROM_EMAIL`: Dùng `onboarding@resend.dev` cho testing
- `CONTACT_EMAIL`: Email của bạn nhận tin nhắn

### Bước 4: Test

```bash
npm run dev
```

Vào `/contact` và gửi thử!

## 🛡️ Tính năng Chống Spam

### Cách hoạt động:

- **Giới hạn**: 3 email/giờ mỗi IP
- **Tracking**: Dùng IP address
- **Thông báo**: Tự động báo còn bao nhiêu lượt
- **Timeout**: Tự động reset sau 1 giờ

### Tùy chỉnh giới hạn:

Sửa trong `app/api/contact/route.ts`:

```typescript
rateLimit(ip, {
  maxRequests: 5, // 5 emails thay vì 3
  windowMs: 30 * 60 * 1000, // 30 phút thay vì 1 giờ
});
```

## 📧 Email Nhận Được

Khi có người gửi form, bạn sẽ nhận email với:

- **Subject**: "Portfolio Contact: [chủ đề]"
- **Reply-To**: Email người gửi (reply trực tiếp được)
- **Nội dung**:
  - Tên người gửi
  - Email
  - Chủ đề
  - Tin nhắn
  - IP address (để track)

## 🎨 UI Features

### Form hiển thị:

- ✅ **Required fields** - Đánh dấu \* đỏ
- ✅ **Character counter** - Hiện số ký tự còn lại
- ✅ **Loading state** - Spinner khi đang gửi
- ✅ **Success message** - Màu xanh khi thành công
- ✅ **Error message** - Màu đỏ khi lỗi
- ✅ **Remaining count** - Hiện còn bao nhiêu lượt gửi
- ✅ **Auto-clear** - Message tự mất sau 5 giây
- ✅ **Form reset** - Xóa sạch sau khi gửi thành công

## 🔒 Bảo Mật

### Các biện pháp:

1. **Rate Limiting** - Chống spam
2. **Email Validation** - Regex kiểm tra format
3. **Max Length** - Giới hạn độ dài input
4. **Input Sanitization** - Xóa ký tự nguy hiểm `<>`
5. **Required Fields** - Không cho gửi thiếu thông tin
6. **IP Tracking** - Log IP trong email

### Validation:

```typescript
- Name: max 100 ký tự
- Email: format chuẩn
- Subject: max 200 ký tự
- Message: max 2000 ký tự
```

## 🌐 Production Deploy

### Vercel (Khuyến nghị)

```
1. Push code lên GitHub
2. Deploy trên Vercel
3. Settings → Environment Variables
4. Thêm:
   - RESEND_API_KEY
   - RESEND_FROM_EMAIL
   - CONTACT_EMAIL
```

### Netlify/Others

Tương tự, thêm environment variables vào settings.

## 💰 Chi Phí

**Resend Free Tier:**

- 3,000 emails/tháng
- 100 emails/ngày
- Hoàn toàn đủ cho portfolio

**Pro ($20/tháng):**

- Chỉ cần khi > 3,000 emails/tháng

## 📊 Test Cases

### Test 1: Gửi email bình thường

- Điền đầy đủ thông tin
- Click "Send Message"
- ✅ Thấy loading spinner
- ✅ Success message hiện ra
- ✅ Email đến inbox
- ✅ Form được reset

### Test 2: Spam protection

- Gửi 3 email liên tiếp
- ✅ Cả 3 đều gửi thành công
- Gửi email thứ 4
- ✅ Bị chặn với message báo đợi
- ✅ Hiện thời gian còn lại

### Test 3: Validation

- Để trống field
- ✅ Browser validation chặn
- Nhập email sai format
- ✅ Browser validation chặn
- Nhập quá 2000 ký tự
- ✅ Input bị limit

## 🐛 Debug

### Build Error: Module not found

**Lỗi**: `Can't resolve '@react-email/render'`

**Giải pháp**:

```bash
npm install @react-email/components @react-email/render
```

Resend cần các packages này để hoạt động. Đã được cài đặt sẵn trong project!

### Email không gửi?

```bash
# Check console logs
npm run dev
# Gửi email và xem terminal

# Lỗi thường gặp:
# - RESEND_API_KEY chưa set
# - API key sai
# - Domain chưa verify (nếu dùng domain riêng)
```

### Rate limit không hoạt động?

```bash
# Development mode: Rate limit reset khi restart server
# Production: Dùng Redis (xem EMAIL_SETUP.md)
```

## 📝 Các File Quan Trọng

```
lib/
  rate-limit.ts          # Logic chống spam

app/
  api/
    contact/
      route.ts           # API endpoint gửi email
  contact/
    page.tsx             # Contact form UI

env.example              # Template env vars
.env.local              # Actual env vars (không commit)
```

## 🎓 Học Thêm

- Chi tiết: Xem `EMAIL_SETUP.md`
- Resend docs: https://resend.com/docs
- React forms: https://react.dev/reference/react-dom/components/form

## ❓ FAQ

**Q: Có cần verify domain không?**
A: Không bắt buộc. Dùng `onboarding@resend.dev` cho test. Verify domain cho production để tránh spam folder.

**Q: Rate limiting có dùng database không?**
A: Không, dùng in-memory. Production nên dùng Redis.

**Q: Email vào spam?**
A: Verify domain và setup SPF/DKIM records trong Resend.

**Q: Có lưu messages vào database không?**
A: Chưa. Có thể thêm Supabase integration sau.

**Q: Resend có phải dịch vụ tốt nhất?**
A: Resend rất tốt cho Next.js. Alternatives: SendGrid, AWS SES, Mailgun.

---

## 🎉 Hoàn Thành!

Giờ bạn có thể:

- ✅ Nhận email từ contact form
- ✅ Chống spam tự động
- ✅ Deploy production ngay
- ✅ Scale tốt với rate limiting

**Chúc bạn thành công!** 🚀

Có câu hỏi? Inbox hoặc check `EMAIL_SETUP.md` cho chi tiết!
