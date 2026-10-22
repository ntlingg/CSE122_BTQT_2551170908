function dinhDangHaiChuSo(so){
    return so < 10 ? '0' + so : String(so);
}
function layDuongDanAnh(chuSo){
    return '0' + chuSo + '.gif';
}
function capNhatDongHo(){
    const bayGio = new Date();
    const gio = bayGio.getHours();
    const phut = bayGio.getMinutes();
    const giay = bayGio.getSeconds();
    const chuoiGio = dinhDangHaiChuSo(gio);
    const chuoiPhut = dinhDangHaiChuSo(phut);
    const chuoiGiay = dinhDangHaiChuSo(giay);

    document.getElementById('gio-chuc').src = layDuongDanAnh(chuoiGio.charAt(0));
    document.getElementById('gio-don-vi').src = layDuongDanAnh(chuoiGio.charAt(1));
    document.getElementById('phut-chuc').src = layDuongDanAnh(chuoiPhut.charAt(0));
    document.getElementById('phut-don-vi').src = layDuongDanAnh(chuoiPhut.charAt(1));
    document.getElementById('giay-chuc').src = layDuongDanAnh(chuoiGiay.charAt(0));
    document.getElementById('giay-don-vi').src = layDuongDanAnh(chuoiGiay.charAt(1));
    
    let loiChao = '';
    if (gio >=5 && gio <= 11){
        loiChao = 'Chào buổi sáng';
    } else if(gio >= 12 && gio <= 17){
        loiChao = 'Chào buổi chiều';
    } else{
        loiChao = 'Chào buổi tối';
    }
    document.getElementById('loi-chao').textContent = loiChao;
}
capNhatDongHo();
setInterval(capNhatDongHo,1000);



