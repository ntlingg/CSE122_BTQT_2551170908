var nutGat = document.getElementById("nutGat");
var ghiChu = document.getElementById("ghiChu");
function capNhatGhiChu() {
  if (document.body.classList.contains("toi")) {
    ghiChu.textContent = "Đây là giao diện ở chế độ TỐI (đang bật).";
  } else {
    ghiChu.textContent = "Đây là giao diện ở chế độ SÁNG (đang bật).";
  }
}
nutGat.addEventListener("click", function () {
  document.body.classList.toggle("toi");
  capNhatGhiChu();
});