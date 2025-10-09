# Email Configuration Setup Guide

Hướng dẫn cấu hình tính năng gửi email cho form liên hệ với chức năng chống spam.

## Tính năng

✅ **Gửi email qua Resend API** - Dịch vụ email hiện đại và đáng tin cậy  
✅ **Chống spam với Rate Limiting** - Giới hạn 3 email/giờ mỗi IP  
✅ **Validation đầy đủ** - Kiểm tra email, độ dài, và sanitize input  
✅ **UI/UX tốt** - Loading state, success/error messages, character counter  
✅ **Email đẹp mắt** - HTML email template chuyên nghiệp

## Bước 0: Cài đặt Dependencies (Nếu chưa có)

```bash
npm install resend @react-email/components @react-email/render
```

**Lưu ý**: Các packages này đã được cài đặt sẵn trong project. Chỉ cần chạy lại nếu bạn clone project mới hoặc gặp lỗi build.

## Bước 1: Đăng ký Resend

1. Truy cập [https://resend.com](https://resend.com)
2. Đăng ký tài khoản miễn phí
3. Xác thực email của bạn

## Bước 2: Lấy API Key

1. Đăng nhập vào Resend Dashboard
2. Vào phần **API Keys**
3. Click **Create API Key**
4. Đặt tên cho key (ví dụ: "Portfolio Production")
5. Copy API key (chỉ hiển thị 1 lần duy nhất!)

## Bước 3: Cấu hình Domain (Tùy chọn nhưng khuyến nghị)

### Option A: Sử dụng domain riêng (Khuyến nghị cho production)

1. Trong Resend Dashboard, vào **Domains**
2. Click **Add Domain**
3. Nhập domain của bạn (ví dụ: `yourdomain.com`)
4. Thêm các DNS records được cung cấp vào DNS provider của bạn:
   - MX record
   - TXT record (SPF)
   - CNAME record (DKIM)
5. Đợi verification hoàn tất (thường 5-15 phút)
6. Sau khi verify, bạn có thể dùng email như `contact@yourdomain.com`

### Option B: Sử dụng domain mặc định (Cho development)

- Resend cung cấp domain mặc định: `onboarding@resend.dev`
- Giới hạn: Chỉ gửi đến email của chính bạn
- Phù hợp cho testing

## Bước 4: Cấu hình Environment Variables

1. Tạo file `.env.local` trong thư mục gốc của project:

```bash
# Supabase Configuration (nếu đã có)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Email Configuration
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=contact@yourdomain.com
CONTACT_EMAIL=dangnguyen28.work@gmail.com
```

2. **RESEND_API_KEY**: API key từ bước 2
3. **RESEND_FROM_EMAIL**:
   - Nếu đã verify domain: `contact@yourdomain.com`
   - Nếu chưa: `onboarding@resend.dev`
4. **CONTACT_EMAIL**: Email của bạn để nhận tin nhắn từ form

## Bước 5: Test tính năng

1. Khởi động development server:

```bash
npm run dev
```

2. Truy cập `/contact`

3. Điền form và gửi thử

4. Kiểm tra:
   - ✅ Email đến inbox (hoặc spam folder)
   - ✅ Success message hiển thị
   - ✅ Form được reset
   - ✅ Remaining count giảm

5. Test rate limiting:
   - Gửi 3 email liên tiếp
   - Email thứ 4 sẽ bị chặn
   - Thông báo hiển thị thời gian chờ

## Cấu hình Rate Limiting

File: `lib/rate-limit.ts`

```typescript
// Mặc định: 3 emails/giờ
maxRequests: 3;
windowMs: 60 * 60 * 1000; // 1 hour

// Có thể tùy chỉnh trong route.ts:
rateLimit(ip, {
  maxRequests: 5, // Tăng lên 5 emails
  windowMs: 30 * 60 * 1000, // 30 phút
});
```

## Production Deployment

### Vercel

1. Vào Vercel Dashboard
2. Chọn project
3. Settings → Environment Variables
4. Thêm các biến:
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `CONTACT_EMAIL`

### Netlify

1. Site settings → Environment variables
2. Add variables tương tự

### Các platform khác

Thêm environment variables theo hướng dẫn của platform đó.

## Troubleshooting

### Build Error: Module not found '@react-email/render'

**Lỗi**:

```
Module not found: Can't resolve '@react-email/render'
```

**Nguyên nhân**: Resend cần React Email packages để hoạt động.

**Giải pháp**:

```bash
npm install @react-email/components @react-email/render
```

### Email không gửi được

1. **Kiểm tra API key**:
   - Đảm bảo copy đúng API key
   - Key phải có quyền send email

2. **Kiểm tra domain**:
   - Nếu dùng domain riêng, đảm bảo đã verify
   - DNS records đã được thêm đúng
   - Đợi DNS propagation (5-15 phút)

3. **Check console logs**:

```bash
# Xem logs trong terminal
# Error sẽ được log ra
```

4. **Rate limit**:
   - Có thể IP đã bị limit
   - Đợi 1 giờ hoặc reset server (dev mode)

### Email vào spam

1. **Setup SPF, DKIM, DMARC**:
   - Verify domain trong Resend
   - Thêm đầy đủ DNS records

2. **Tránh spam words**:
   - Không dùng quá nhiều từ như "free", "urgent"
   - Content quality tốt

3. **Warm up domain**:
   - Gửi ít email ban đầu
   - Tăng dần volume

### Rate limiting không hoạt động

1. **Development mode**:
   - Rate limit store trong memory
   - Reset khi restart server
   - Production khuyến nghị dùng Redis

2. **Multiple IPs**:
   - Có thể do proxy/load balancer
   - Check header `x-forwarded-for`

## Nâng cao

### Sử dụng Redis cho Rate Limiting (Production)

```bash
npm install ioredis
```

Tạo `lib/redis-rate-limit.ts`:

```typescript
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL);

export async function rateLimitRedis(ip: string) {
  const key = `rate-limit:${ip}`;
  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, 3600); // 1 hour
  }

  return {
    success: count <= 3,
    remaining: Math.max(0, 3 - count),
  };
}
```

### Email Templates tùy chỉnh

Chỉnh sửa template trong `app/api/contact/route.ts`:

```typescript
html: `
  // Custom HTML template
  <div style="...">
    ${sanitizedMessage}
  </div>
`;
```

### Lưu messages vào Database

```typescript
// Sau khi gửi email thành công
await supabase.from("contact_messages").insert({
  name: sanitizedName,
  email,
  subject: sanitizedSubject,
  message: sanitizedMessage,
  ip,
  created_at: new Date(),
});
```

## Giá Resend

- **Free tier**: 3,000 emails/tháng
- **Pro**: $20/tháng - 50,000 emails
- Đủ cho hầu hết portfolio sites

## Bảo mật

✅ **Rate limiting** - Chống spam  
✅ **Input validation** - Chống injection  
✅ **Input sanitization** - Chống XSS  
✅ **Max length** - Chống abuse  
✅ **Email validation** - Đảm bảo format đúng

## Support

Nếu gặp vấn đề:

- Check [Resend Documentation](https://resend.com/docs)
- Xem [Resend Status](https://status.resend.com)
- Contact Resend Support

---

**Chúc bạn thành công! 🚀**
