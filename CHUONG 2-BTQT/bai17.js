const oHoTen = document.getElementById('ho-ten');
const oEmail = document.getElementById('email');
const oMatKhau = document.getElementById('mat-khau');
const oXacNhan = document.getElementById('xac-nhan-mat-khau');
const bieuThucEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Đặt trạng thái cho một nhóm nhập liệu
function datTrangThai(idNhom, idThongBao, hopLe, noiDung) {
    const nhom = document.getElementById(idNhom);
    const thongBao = document.getElementById(idThongBao);

    nhom.classList.remove('hop-le', 'bi-loi');
    nhom.classList.add(hopLe ? 'hop-le' : 'bi-loi');
    thongBao.textContent = (hopLe ? '✓ ' : '✗ ') + noiDung;

    return hopLe;
}

function kiemTraHoTen() {
    const giaTri = oHoTen.value.trim();
    if (giaTri === '') {
        return datTrangThai('nhom-ho-ten', 'thong-bao-ho-ten', false, 'Họ và tên không được để trống');
    }
    return datTrangThai('nhom-ho-ten', 'thong-bao-ho-ten', true, 'Hợp lệ');
}

function kiemTraEmail() {
    const giaTri = oEmail.value.trim();
    if (giaTri === '') {
        return datTrangThai('nhom-email', 'thong-bao-email', false, 'Email không được để trống');
    }
    if (!bieuThucEmail.test(giaTri)) {
        const thieuMienEmail = giaTri.includes('@') && !giaTri.split('@')[1].includes('.');
        const noiDung = thieuMienEmail
            ? 'Email không hợp lệ (thiếu tên miền)'
            : 'Email không hợp lệ';
        return datTrangThai('nhom-email', 'thong-bao-email', false, noiDung);
    }
    return datTrangThai('nhom-email', 'thong-bao-email', true, 'Hợp lệ');
}

function kiemTraMatKhau() {
    const giaTri = oMatKhau.value;
    if (giaTri.length < 6) {
        return datTrangThai('nhom-mat-khau', 'thong-bao-mat-khau', false, 'Mật khẩu phải có ít nhất 6 ký tự');
    }
    return datTrangThai('nhom-mat-khau', 'thong-bao-mat-khau', true, 'Hợp lệ');
}

function kiemTraXacNhan() {
    const giaTri = oXacNhan.value;
    if (giaTri === '') {
        return datTrangThai('nhom-xac-nhan', 'thong-bao-xac-nhan', false, 'Vui lòng xác nhận mật khẩu');
    }
    if (giaTri !== oMatKhau.value) {
        return datTrangThai('nhom-xac-nhan', 'thong-bao-xac-nhan', false, 'Mật khẩu xác nhận không khớp');
    }
    return datTrangThai('nhom-xac-nhan', 'thong-bao-xac-nhan', true, 'Hợp lệ');
}

// Hàm được gọi bởi onsubmit trong HTML
function kiemTraBieuMau(event) {
    // Chạy đủ 4 hàm để hiện toàn bộ thông báo (không dừng ở lỗi đầu tiên)
    const ketQua = [
        kiemTraHoTen(),
        kiemTraEmail(),
        kiemTraMatKhau(),
        kiemTraXacNhan()
    ];
    const tatCaHopLe = ketQua.every(Boolean);
    if (!tatCaHopLe) {
        event.preventDefault();
        return false;
    }
    // Dữ liệu đúng: bài này chưa có server nên chỉ báo thành công
    event.preventDefault();
    alert('Đăng ký thành công!');
    return false;
}
// Kiểm tra tức thì khi rời ô và khi đang gõ
oHoTen.addEventListener('blur', kiemTraHoTen);
oEmail.addEventListener('blur', kiemTraEmail);
oMatKhau.addEventListener('blur', kiemTraMatKhau);
oXacNhan.addEventListener('blur', kiemTraXacNhan);

oHoTen.addEventListener('input', kiemTraHoTen);
oEmail.addEventListener('input', kiemTraEmail);
oMatKhau.addEventListener('input', function () {
    kiemTraMatKhau();
    // Nếu đã nhập ô xác nhận thì kiểm tra lại cho khớp với mật khẩu mới
    if (oXacNhan.value !== '') {
        kiemTraXacNhan();
    }
});
oXacNhan.addEventListener('input', kiemTraXacNhan);