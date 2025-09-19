window.onload = function () {
  if (sessionStorage.getItem("user") == null) {
    window.location.replace("../index.html");
    alert("Your email id is not registered in the site");
  } else {
    var logout = document.getElementById("logout");
    logout.onclick = function () {
      sessionStorage.clear();
      var log_out = document.getElementById("log_out");
      log_out.innerHTML = "Please wait....";
      setTimeout(function () {
        window.location = "../index.html";
      }, 2000);
    };

    var user_email = sessionStorage.getItem("user");
    var json_text = localStorage.getItem(user_email);
    var obj_data = JSON.parse(json_text);
    var profile_name = document.getElementById("profile_name");
    profile_name.innerHTML = atob(obj_data.username);
    document.getElementById("profile_username").innerHTML = atob(
      obj_data.username
    );
    //profile picture coding
    var imag_url = localStorage.getItem(user_email + "image");
    var profile_picture = document.getElementById("profile_picture");
    profile_picture.style.backgroundImage = "url(" + imag_url + ")";
    profile_picture.style.backgroundPosition = "center";
    profile_picture.style.backgroundSize = "cover";
    if (localStorage.getItem(user_email + "image") != null) {
      var container = document.getElementById("container");
      container.style.display = "none";
    }

    var profile_upload = document.getElementById("profile_upload");

    profile_upload.onchange = function () {
      var reader = new FileReader();
      reader.readAsDataURL(profile_upload.files[0]);
      reader.onload = function () {
        var file_name = reader.result;
        var profile_pic = document.getElementById("profile_pic");
        var profile_icon = document.getElementById("profile_icon");
        var next_btn = document.getElementById("next");
        profile_pic.style.backgroundImage = "url(" + file_name + ")";
        profile_pic.style.backgroundPosition = "center";
        profile_pic.style.backgroundSize = "cover";
        profile_icon.style.display = "none";
        next_btn.style.display = "block";
        next_btn.onclick = function () {
          localStorage.setItem(user_email + "image", file_name);
          var container = document.getElementById("container");
          container.style.display = "none";
          window.location = location.href;
        };
      };
    };
  }
};
