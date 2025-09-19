window.onload = function(){
    if(sessionStorage.getItem("user")==null){
        window.location.replace("../../../index.html");
         alert("Your email id is not registered in the site");
       
    }
    else{


var open_box_btn = document.getElementById("open_video_box_btn");
var current_user = sessionStorage.getItem("user");
open_box_btn.onclick = function () {
  var add_video_box = document.getElementById("add_video_box");
  if (open_box_btn.className == "fas fa-plus-circle") {
    add_video_box.style.display = "block";
    open_box_btn.className = "fas fa-times-circle";
  } else if (open_box_btn.className == "fas fa-times-circle") {
    add_video_box.style.display = "none";
    open_box_btn.className = "fas fa-plus-circle";
  }
};

//add video in local storage
var add_video_btn = document.getElementById("add_video_btn");
add_video_btn.onclick = function () {
  var v_name = document.getElementById("video_name");
  var v_link = document.getElementById("video_link");
  if (v_name.value != "" && v_link.value != "") {
    var v_obj = { name: v_name.value, link: v_link.value };
    var v_txt = JSON.stringify(v_obj);

    localStorage.setItem(current_user + "IMAGES" + v_name.value, v_txt);
  } else {
    alert("Enter valid video name and video URL");
    return false;
  }
};

//fetch all videos from local storage

function load_video() {
  var i;
  for (i = 0; i < localStorage.length; i++) {
    var all_keys = localStorage.key(i);
    if (all_keys.match(current_user + "IMAGES")) {
      var v_data = localStorage.getItem(all_keys);
      var video_obj = JSON.parse(v_data);

      var div = document.createElement("DIV");
      div.setAttribute("id", "main_video_box");
      var p = document.createElement("P");
      p.setAttribute("id", "playlist_video_name");
      p.className = "p_v_name";
      p.innerHTML = video_obj.name;
      var play_btn = document.createElement("BUTTON");
      play_btn.setAttribute("type", "button");
      play_btn.setAttribute("url", video_obj.link);
      play_btn.setAttribute("id", "video_play_btn");
      play_btn.className = "v_play_btn";

      play_btn.innerHTML = "View";

      var del_btn = document.createElement("BUTTON");
      del_btn.setAttribute("id", "video_delete_btn");
      del_btn.setAttribute("type", "button");
      del_btn.innerHTML = "Delete";
      del_btn.className = "delete_btn";
      div.appendChild(p);
      div.appendChild(play_btn);
      div.appendChild(del_btn);
      var all_v = document.getElementById("galery");
      all_v.appendChild(div);
    }
  }
}
load_video();

// onclick video play button coding

function play_video() {
  var all_v_play_btn = document.getElementsByClassName("v_play_btn");
  var i;
  for (i = 0; i < all_v_play_btn.length; i++) {
    all_v_play_btn[i].onclick = function () {
      clear();
      var v_url = this.getAttribute("url");
      var src_tag = document.getElementById("img_source");
      src_tag.setAttribute("src", v_url);
      // video.load();
      // video.play();
      // play_btn.className = "fa-solid fa-circle-pause";
      this.innerHTML = "Viewing";
    };
  }
}
play_video();
function clear() {
  var all_v_play_btn = document.getElementsByClassName("v_play_btn");
  var i;
  for (i = 0; i < all_v_play_btn.length; i++) {
    all_v_play_btn[i].innerHTML = "View";
  }
}

// Next button coding

function next_btn() {
  var next_btn = document.getElementById("right_btn");
  next_btn.onclick = function () {
    var all_play_btn = document.getElementsByClassName("v_play_btn");
    var i;
    for (i = 0; i < all_play_btn.length; i++) {
      if (all_play_btn[i].innerHTML == "Viewing") {
        var next_element = all_play_btn[i].parentElement.nextSibling;
        var next_play_btn =
          next_element.getElementsByClassName("v_play_btn")[0];
        next_play_btn.click();
        return false;
      }
    }
  };
}
next_btn();

// Next button coding

function previous_btn() {
  var precious_btn = document.getElementById("left_btn");
  precious_btn.onclick = function () {
    var all_play_btn = document.getElementsByClassName("v_play_btn");
    var i;
    for (i = 0; i < all_play_btn.length; i++) {
      if (all_play_btn[i].innerHTML == "Viewing") {
        var previous_element = all_play_btn[i].parentElement.previousSibling;
        var previous_play_btn =
          previous_element.getElementsByClassName("v_play_btn")[0];
        previous_play_btn.click();
        return false;
      }
    }
  };
}
previous_btn();



//Delete button functionality

function delete_button() {
  all_del_btn = document.getElementsByClassName("delete_btn");
  var i;
  for (i = 0; i < all_del_btn.length; i++) {
    all_del_btn[i].onclick = function () {
      var parent = this.parentElement;
      var video_name = parent.getElementsByTagName("P")[0].innerHTML;
      localStorage.removeItem(current_user + "IMAGES" + video_name);
      parent.className = "animate__animated animate__bounceOut";
      setTimeout(function () {
        parent.remove();
      }, 1000);
    };
  }
}
delete_button();

//search functionality coding
var search_box = document.getElementById("search");
search_box.oninput = function () {
  var all_v_name = document.getElementsByClassName("p_v_name");
  var i;
  for (i = 0; i < all_v_name.length; i++) {
    if (
      all_v_name[i].innerHTML
        .toUpperCase()
        .match(search_box.value.toUpperCase())
    ) {
      all_v_name[i].parentElement.style.display = "block";
    } else {
      all_v_name[i].parentElement.style.display = "none";
    }
  }
}
    }}
