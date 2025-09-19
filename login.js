var signup_frm = document.getElementById("sign_frm");

signup_frm.onsubmit = function () {
  var user = btoa(document.getElementById("username").value);
  var email = btoa(document.getElementById("email").value);
  var phone = btoa(document.getElementById("phone").value);
  var password = btoa(document.getElementById("pass").value);
  var user_object_data = {
    username: user,
    email: email,
    phone: phone,
    password: password,
  };
  var user_text_data = JSON.stringify(user_object_data);
  if (user != "" && email != "" && phone != "" && password != "") {
    localStorage.setItem(email, user_text_data);
    var signup_btn = document.getElementById("sign_btn");
    signup_btn.style.background = "green";
    signup_btn.innerHTML = "Sign up sucessfull";
    setTimeout(function () {
      signup_btn.style.background =
        " linear-gradient(to left , #f80759 , #bc4e9c)";
      signup_btn.innerHTML = "Sign up";
      signup_frm.reset();
    }, 3000);
    return false;
  }
};
var email_input = document.getElementById("email");
email_input.onchange = function () {
  var email = btoa(document.getElementById("email").value);
  var signup_btn = document.getElementById("sign_btn");
  if (localStorage.getItem(email) != null) {
    alert("Your current email is alredy registered!");
    email_input.style.borderBottomColor = "red";
    signup_btn.style.background = "#ccc";
    signup_btn.disabled = "true";
    email_input.onclick = function () {
      email_input.value = "";
      email_input.style.borderBottomColor = "#ccc";
      signup_btn.disabled = "false";
      signup_btn.style.background =
        " linear-gradient(to left , #f80759 , #bc4e9c)";
    };
  }
};
var login_frm = document.getElementById("log_frm");
login_frm.onsubmit = function () {
  var email = document.getElementById("log_email");
  var password = document.getElementById("pwd");
  if (localStorage.getItem(btoa(email.value)) == null) {
    alert("Your current email is not registered");
  } else {
    var text_data = localStorage.getItem(btoa(email.value));
    var obj_data = JSON.parse(text_data);
    var correct_email = obj_data.email;
    var correct_password = obj_data.password;
    if (btoa(email.value) == correct_email) {
      if (btoa(password.value) == correct_password) {
        sessionStorage.setItem("user", btoa(email.value));
        window.location.replace("profile/profile.html");
      } else {
        alert("Log in failed! \nDue to wrong password");
      }
    }
  }
  return false;
};
