var signup_box = document.getElementById("signup");
var login_box = document.getElementById("log_in");
var log_btn = document.getElementById("login_link");
var sign_btn = document.getElementById("sign_link");
log_btn.onclick = function () {
  signup_box.style.display = "none";
  login_box.style.display = "block";
};
sign_btn.onclick = function () {
  signup_box.style.display = "block";
  login_box.style.display = "none";
};
