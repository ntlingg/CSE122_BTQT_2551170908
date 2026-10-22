let bieuThuc = '';
let daTinhXong = false;
const manHinhPhepTinh = document.getElementById('phep-tinh');
const manHinhKetQua = document.getElementById('ket-qua');
function capNhatManHinh() {
    manHinhPhepTinh.textContent = bieuThuc;
}
@param {string} kyTu 
function nhapKyTu(kyTu) {
    const toanTu = ['+', '−', '×', '÷'];
    if (daTinhXong) {
        if (toanTu.includes(kyTu) || kyTu === '%') {
            bieuThuc = manHinhKetQua.textContent + kyTu;
        } else {
            bieuThuc = (kyTu === '.') ? '0.' : kyTu;
            manHinhKetQua.textContent = '0';
        }
        daTinhXong = false;
        capNhatManHinh();
        return;
    }
    if (toanTu.includes(kyTu)) {
        if (bieuThuc === '') {
            if (kyTu === '−') {
                bieuThuc = '−';
                capNhatManHinh();
            }
            return;
        }
        const kyTuCuoi = bieuThuc.slice(-1);
        if (toanTu.includes(kyTuCuoi)) {
            bieuThuc = bieuThuc.slice(0, -1) + kyTu;
            capNhatManHinh();
            return;
        }
    }
    if (kyTu === '.') {
        const cacPhan = bieuThuc.split(/[+\−×÷()]/);
        const soHienTai = cacPhan[cacPhan.length - 1];
        if (soHienTai.includes('.')) {
            return;
        }
        if (soHienTai === '') {
            bieuThuc += '0.';
            capNhatManHinh();
            return;
        }
    }
    bieuThuc += kyTu;
    capNhatManHinh();
}
function nhapNgoac() {
    if (daTinhXong) {
        bieuThuc = '';
        manHinhKetQua.textContent = '0';
        daTinhXong = false;
    }
    const soMo = (bieuThuc.match(/\(/g) || []).length;
    const soDong = (bieuThuc.match(/\)/g) || []).length;
    const kyTuCuoi = bieuThuc.slice(-1);
    const toanTuHoacMoNgoac = ['+', '−', '×', '÷', '%', '(', ''];
    if (soMo > soDong && !toanTuHoacMoNgoac.includes(kyTuCuoi)) {
        bieuThuc += ')';
    } else {
        if (kyTuCuoi !== '' && !toanTuHoacMoNgoac.includes(kyTuCuoi)) {
            bieuThuc += '×(';
        } else {
            bieuThuc += '(';
        }
    }
    capNhatManHinh();
}
function xoaTatCa() {
    bieuThuc = '';
    daTinhXong = false;
    manHinhPhepTinh.textContent = '';
    manHinhKetQua.textContent = '0';
}
function xoaKyTuCuoi() {
    if (daTinhXong) {
        xoaTatCa();
        return;
    }
    bieuThuc = bieuThuc.slice(0, -1);
    capNhatManHinh();
}
function tinhKetQua() {
    if (!bieuThuc.trim()) return;
    try {
        let chuoiTinh = bieuThuc
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replac
        chuoiTinh = chuoiTinh.replace(/%([^\d]|$)/g, '/100$1');
        const soMo = (chuoiTinh.match(/\(/g) || []).length;
        const soDong = (chuoiTinh.match(/\)/g) || []).length;
        if (soMo > soDong) {
            chuoiTinh += ')'.repeat(soMo - soDong);
        }
        let ketQua = eval(chuoiTinh);
        if (ketQua === Infinity || ketQua === -Infinity || isNaN(ketQua)) {
            manHinhKetQua.textContent = 'Lỗi phép tính';
        } else {
            ketQua = Math.round(ketQua * 100000000) / 100000000;
            manHinhKetQua.textContent = ketQua;
        }
        daTinhXong = true;
    } catch (error) {
        manHinhKetQua.textContent = 'Lỗi';
        daTinhXong = true;
    }
}
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key >= '0' && key <= '9') {
        nhapKyTu(key);
    } else if (key === '.') {
        nhapKyTu('.');
    } else if (key === '+') {
        nhapKyTu('+');
    } else if (key === '-') {
        nhapKyTu('−');
    } else if (key === '*') {
        nhapKyTu('×');
    } else if (key === '/') {
        event.preventDefault(); 
        nhapKyTu('÷');
    } else if (key === '%') {
        nhapKyTu('%');
    } else if (key === '(' || key === ')') {
        nhapNgoac();
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        tinhKetQua();
    } else if (key === 'Backspace') {
        xoaKyTuCuoi();
    } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        xoaTatCa();
    }
});