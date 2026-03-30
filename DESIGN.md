# Tài liệu Hệ thống Thiết kế: VietCraftUpgrade Wiki

Hệ thống thiết kế này được xây dựng để chuyển đổi một trang tài liệu kỹ thuật khô khan thành một trải nghiệm thị giác cao cấp, đậm chất "High-Tech Minecraft". Chúng ta không chỉ xây dựng một trang Wiki; chúng ta đang kiến tạo một giao diện điều khiển (interface) hiện đại, nơi mà sự thô mộc của các khối vuông Minecraft kết hợp với sự tinh xảo của ngôn ngữ thiết kế tương lai.

## 1. Creative North Star: "The Neon Forge" (Lò Đúc Neon)

Tầm nhìn sáng tạo của hệ thống này tập trung vào sự tương phản giữa bóng tối sâu thẳm của màn đêm (Deep Space) và ánh sáng rực rỡ của năng lượng Redstone cải tiến. 

*   **Tính Đột Phá:** Phá bỏ các lưới (grid) cứng nhắc bằng cách sử dụng các lớp layer chồng lớp, tạo cảm giác như các cửa sổ hologram đang lơ lửng.
*   **Sự Bất Đối Xứng Ý Đồ:** Sử dụng các khoảng trắng (void) lớn để điều hướng mắt người dùng vào các khối nội dung quan trọng, thay vì dàn trải đều trên màn hình.
*   **Chiều Sâu Tonal:** Không sử dụng đường kẻ để chia tách, mà sử dụng sự thay đổi sắc độ của bóng tối để định hình không gian.

---

## 2. Hệ Thống Màu Sắc (Color Palette)

Chúng ta tuân thủ quy tắc **"No-Line"**: Cấm tuyệt đối việc sử dụng đường kẻ 1px để phân chia khu vực. Ranh giới giữa các phần phải được định nghĩa bằng sự thay đổi màu nền hoặc hiệu ứng phát sáng (glow).

### Bảng Màu Chủ Đạo
- **Primary (#ff8f73):** Màu cam nhiệt hạch, dùng cho các điểm chạm quan trọng (CTA), trạng thái Active.
- **Surface (#0e0e0e):** Màu nền đen sâu thẳm, tạo cảm giác không gian vô tận.
- **Surface Container Tiers:**
    - `surface_container_low` (#131313): Dùng cho các vùng nội dung phụ.
    - `surface_container` (#1a1a1a): Dùng cho thẻ (cards) hoặc khối lệnh.
    - `surface_container_high` (#20201f): Dùng cho các thành phần nổi lên khi hover.

### Quy tắc "Glass & Gradient"
Để tạo cảm giác cao cấp, các thành phần nổi (floating) như Sidebar hoặc Sticky Header phải sử dụng hiệu ứng **Glassmorphism**:
- Background: `rgba(26, 26, 26, 0.8)`
- Backdrop-blur: `12px`
- Border: "Ghost Border" (Sử dụng `outline_variant` ở mức 15% độ mờ).

---

## 3. Hệ Thống Typography

Sự kết hợp giữa **Space Grotesk** (Heading - mang tính kỹ thuật, hình khối) và **Inter** (Body - tối ưu đọc hiểu).

| Cấp bậc | Font Family | Size | Ghi chú |
| :--- | :--- | :--- | :--- |
| **Display LG** | Space Grotesk | 3.5rem | Dùng cho tiêu đề trang chính, viết hoa toàn bộ. |
| **Headline MD** | Space Grotesk | 1.75rem | Tiêu đề các mục lớn, kèm theo một dải gradient mờ phía sau. |
| **Title SM** | Inter | 1rem | Tiêu đề thẻ hoặc nhãn (label) đậm. |
| **Body LG** | Inter | 1rem | Nội dung hướng dẫn chi tiết, line-height 1.6 cho sự thông thoáng. |
| **Label MD** | Inter | 0.75rem | Mã lệnh, permissions, metadata. |

---

## 4. Phân Lớp & Chiều Sâu (Elevation)

Chúng ta loại bỏ hoàn toàn đổ bóng (drop shadow) đen xì truyền thống. Thay vào đó, sử dụng **Tonal Layering**.

- **Layering Principle:** Một thẻ `surface_container` đặt trên nền `surface` sẽ tự tạo ra chiều sâu mà không cần shadow.
- **Ambient Glow:** Khi một thẻ được hover, thay vì đổ bóng, hãy sử dụng một lớp "Ambient Glow" bằng màu `primary` với độ mờ cực thấp (4-8%) và bán kính blur lớn (30px+).
- **Ghost Border Fallback:** Chỉ sử dụng viền khi cần phân tách các khối lệnh (Command Blocks). Viền phải dùng `outline_variant` với opacity 10%.

---

## 5. Các Thành Phần (Components)

### Sidebar Navigation
- Không sử dụng nền đặc. Sử dụng Glassmorphism.
- Trạng thái Active: Một dải sáng mỏng (2px) màu `primary` ở cạnh trái, kèm hiệu ứng lan tỏa ánh sáng nhẹ sang phải.

### Feature Cards (Thẻ Tính Năng)
- **Cấu trúc:** Nền `surface_container`, bo góc `md` (0.375rem).
- **Animation:** Khi hover, thẻ dịch chuyển nhẹ lên trên (-4px) và viền "Ghost Border" sáng lên rõ hơn. 
- **Quy tắc:** Tuyệt đối không dùng Divider line bên trong thẻ. Dùng spacing `spacing.4` (1rem) để tách ảnh và chữ.

### Command Blocks (Khối Lệnh)
- Nền `surface_container_lowest` (#000000) để tạo sự khác biệt hoàn toàn với nội dung hướng dẫn.
- Font: Inter (Mono-style) màu `secondary`.
- Prefix `$` hoặc `>` sử dụng màu `tertiary` (#ffb95c) để tạo điểm nhấn kỹ thuật.

### Permission Tables (Bảng Quyền)
- Không kẻ bảng. 
- Dòng tiêu đề dùng `surface_container_high`. Các dòng nội dung xen kẽ giữa `surface` và `surface_container_low` để phân biệt mà không cần dòng kẻ.

### Sticky Header
- Chiều cao cố định `spacing.16`.
- Hiệu ứng: Khi cuộn trang, header chuyển từ trong suốt sang Glassmorphism với một dải gradient mờ màu `primary_dim` ở đáy để tạo ranh giới.

---

## 6. Do's and Don'ts (Nên và Không nên)

### ✅ Nên (Do's)
- **Sử dụng Padding rộng rãi:** Hãy để nội dung "thở". Sử dụng tối thiểu `spacing.6` cho các container lớn.
- **Gradients Tinh Tế:** Sử dụng gradient từ `primary` sang `primary_container` cho các nút bấm quan trọng nhất để tạo sự khối.
- **Vietnamese Readability:** Đảm bảo dấu câu trong tiếng Việt không bị cắt mất khi sử dụng line-height chặt chẽ.

### ❌ Không nên (Don'ts)
- **Không dùng Border 100% Opaque:** Điều này làm thiết kế trông rẻ tiền và giống như các template cũ.
- **Không dùng màu trắng tuyệt đối (#FFFFFF) cho văn bản quá dài:** Hãy dùng `on_surface_variant` (#adaaaa) cho nội dung mô tả để giảm mỏi mắt trên nền tối.
- **Không dùng hiệu ứng chuyển cảnh gắt:** Mọi chuyển động (hover, mở menu) phải có duration từ 200ms - 300ms với curve `cubic-bezier(0.4, 0, 0.2, 1)`.

---
*Hệ thống thiết kế này không chỉ là một bộ quy tắc, nó là một tuyên ngôn về thẩm mỹ hiện đại dành cho cộng đồng Minecraft Việt Nam. Hãy sử dụng nó để tạo ra những trải nghiệm đẳng cấp.*