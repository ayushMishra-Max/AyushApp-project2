if (sessionStorage.getItem("user") == null) {
  window.location.replace("../../../index.html");
} else {
  var current_user = sessionStorage.getItem("user");
  var add = document.getElementById("add");
  var close = document.getElementById("close");
  var new_contact = document.getElementById("new_contact");

  new_contact.onclick = function () {
    var contact_bg = document.getElementById("contact_bg");
    contact_bg.style.display = "block";
    close.onclick = function () {
      contact_bg.style.display = "none";
    };
  };
  // Add contact in local storage
  add.onclick = function () {
    var c_name = document.getElementById("c_name");
    var c_num = document.getElementById("c_num");
    if (c_name.value != "" && c_num.value != "") {
      var new_con = { name: c_name.value, number: c_num.value };
      var json_txt = JSON.stringify(new_con);
      localStorage.setItem(current_user + "_contact" + c_name.value, json_txt);
      // Hide the popup
      var contact_bg = document.getElementById("contact_bg");
      contact_bg.style.display = "none";
      setTimeout(function () {
        window.location.reload(true);
      }, 200);
    } else {
      alert("Please enter name and phone number");
      return false;
    }
  };
  var user_email = sessionStorage.getItem("user");
  var json_text = localStorage.getItem(user_email);
  var obj_data = JSON.parse(json_text);
  var profile_name = document.getElementById("username");
  profile_name.innerHTML = atob(obj_data.username);
  if (user_email) {
    var imageData = localStorage.getItem(user_email + "image");
    if (imageData) {
      var profilePic = document.getElementById("profile_pic");
      if (profilePic) {
        profilePic.style.backgroundImage = "url('" + imageData + "')";
        profilePic.style.backgroundPosition = "center";
        profilePic.style.backgroundSize = "cover";
      }
    }
  }
  function all_contact() {
    for (i = 0; i < localStorage.length; i++) {
      var all_keys = localStorage.key(i);
      if (all_keys.match(sessionStorage.getItem("user") + "_contact")) {
        var json_tx = localStorage.getItem(all_keys);
        var obj = JSON.parse(json_tx);

        var contact_box = document.createElement("DIV");
        contact_box.setAttribute("id", "contact");
        var name_p = document.createElement("P");
        name_p.setAttribute("class", "contact_name");
        var name_i = document.createElement("I");
        name_i.setAttribute("class", "fas fa-user");
        var tool = document.createElement("DIV");
        tool.setAttribute("id", "tool");
        var edit_i = document.createElement("I");
        edit_i.setAttribute("class", "fas fa-edit edit");
        var del_i = document.createElement("I");
        del_i.setAttribute("class", "fas fa-trash del");
        var line = document.createElement("HR");
        line.setAttribute("color", "purple");
        line.setAttribute("width", "75%");
        line.setAttribute("size", "1");
        var num_p = document.createElement("P");
        var num_i = document.createElement("I");
        num_i.setAttribute("class", "fas fa-mobile-alt");
        name_p.appendChild(name_i);
        name_p.innerHTML += "" + obj.name;

        tool.appendChild(edit_i);
        tool.appendChild(del_i);

        num_p.appendChild(num_i);
        num_p.innerHTML += "" + obj.number;

        contact_box.appendChild(name_p);
        contact_box.appendChild(tool);
        contact_box.appendChild(line);
        contact_box.appendChild(num_p);

        var all_contact_box = document.getElementById("all_contact_box");
        all_contact_box.appendChild(contact_box);
      }
    }
  }
  all_contact();
  var search = document.getElementById("search");
  search.oninput = function () {
    var all_contact_name = document.getElementsByClassName("contact_name");
    var i;
    for (i = 0; i < all_contact_name.length; i++) {
      if (
        all_contact_name[i].innerHTML
          .toUpperCase()
          .match(search.value.toUpperCase())
      ) {
        all_contact_name[i].parentElement.style.display = "block";
      } else {
        all_contact_name[i].parentElement.style.display = "none";
      }
    }
  };
  function del() {
    var del = document.getElementsByClassName("del");
    var i;
    for (i = 0; i < del.length; i++) {
      del[i].onclick = function () {
        var parent = this.parentElement.parentElement;
        var p_ele = parent.getElementsByClassName("contact_name")[0];
        var username = p_ele.innerHTML.replace(
          '<i class="fas fa-user"></i>',
          ""
        );

        localStorage.removeItem(current_user + "_contact" + username.trim());
        parent.className = "animate__animated animate__bounceOut";
        setTimeout(function () {
          parent.remove();
        }, 1000);
      };
    }
  }
  del();

  function edit() {
    var edit_icon = document.getElementsByClassName("edit");
    var i;
    for (i = 0; i < edit_icon.length; i++) {
      edit_icon[i].onclick = function () {
        var parent = this.parentElement.parentElement;
        var para = parent.getElementsByTagName("P");
        var name = para[0].innerHTML
          .replace('<i class="fas fa-user"></i>', "")
          .trim();
        var number = para[1].innerHTML
          .replace('<i class="fas fa-mobile-alt"></i>', "")
          .trim();
        var c_name = document.getElementById("c_name");
        var c_num = document.getElementById("c_num");
        var add_btn = document.getElementById("new_contact");
        var c_heading = document.getElementById("c_heading");
        var add = document.getElementById("add");
        var close = document.getElementById("close");
        c_name.value = name;
        c_num.value = number;
        c_heading.innerHTML = "Edit contact";
        add.innerHTML = "Update";
        add_btn.click();
        close.style.display = "none";
        localStorage.removeItem(current_user + "_contact" + name);
      };
    }
  }
  edit();
}
