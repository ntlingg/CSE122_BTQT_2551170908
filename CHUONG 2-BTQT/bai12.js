var tenThu = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
var nutIn = document.getElementById("nut-in");

function inLich() {
    var ngay = Number(document.getElementById("o-ngay").value);
    var thang = Number(document.getElementById("o-thang").value);
    var nam = Number(document.getElementById("o-nam").value);
    var d = new Date(nam, thang - 1, ngay);

    if (d.getDate() != ngay || d.getMonth() != thang - 1 || d.getFullYear() != nam) {
        alert("Ngày tháng năm không hợp lệ!");
        return;
    }
    var thu = tenThu[d.getDay()];
    var gio = new Date().getHours();
    var loiChao;
    if (gio < 12) {
        loiChao = "Chào buổi sáng!";
    } else if (gio < 18) {
        loiChao = "Chào buổi chiều!";
    } else {
        loiChao = "Chào buổi tối!";
    }
    document.getElementById("nam").innerHTML = nam;
    document.getElementById("thang").innerHTML = "Tháng " + (d.getMonth() + 1);
    document.getElementById("so-ngay").innerHTML = ngay;
    document.getElementById("thu").innerHTML = thu.normalize("NFC");
    document.getElementById("loi-chao").innerHTML = loiChao.normalize("NFC");
}
nutIn.addEventListener("click", inLich);
inLich();