// Recent Comments free version 3.2 by KenaT (đã chỉnh sửa)

// Cấu hình
var nc = 20;                 // số lượng bình luận
var length_name = 20;        // độ dài tên
var length_content = 100;    // độ dài nội dung bình luận

// Trang chủ và admin
var home_page = window.location.origin; 
var admin_uri = 'https://www.facebook.com/leanhduc.pro.vn/';

// Ảnh mặc định khi không có avatar
var no_avatar = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjUv12wy7wUBrThObx-dWlnAaHA5wur1RC1E3wHVmC1dxuM9dg1xN1t0MAvGruqaxhtAiATsd8KVU7rmivwLR_3kFgTEVhCiPJg2g3917u71Pzlm612vnkQgRiBmMkf1fVeeW6RDuyax1YDjMOWqkTcPbPIlqzkCD-aNGcWO0FNVouCwBUC7FStm7k4RY-1/s320/unnamed%20(2).png';
var admin_avatar = no_avatar;

// Các biến toàn cục
var tt = 0, u = 0, d = [], p = [], pn = [], j2 = [], tb = [], t = [], pi = [], ti = [], a = [], im = [], alt = [], ur = [], ura = [], ima = [];
var a3 = location.href, y = a3.indexOf("?m=0");

// Hàm callback lấy thông tin trang hoặc bài
function rc_avatar2(a) {
    if (d[u].indexOf("/p/") !== -1) {
        pn[u] = 1;
        t[u] = a.entry.title.$t;
    } else {
        t[u] = a.feed.title.$t;
        var num = a.feed.openSearch$totalResults.$t;
        var i = parseInt((num - 1) / 200) + 1;
        pn[u] = i;
    }
    u++;
}

// Giới hạn ký tự nội dung bình luận
var length_content = 50; 
// Giới hạn ký tự tên tác giả
var length_name = 20; 

function rc_avatar1(tfeed) {
    tt = tfeed.feed.openSearch$totalResults.$t;

    // Lấy tiêu đề feed
    tb = tfeed.feed.title.$t;
    if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
        tb = tb.replace(/^Blog:\s*/i, "");
    }

    // Lấy thông tin tác giả blog
    if ("uri" in tfeed.feed.author[0]) ura = tfeed.feed.author[0].uri.$t;
    ima = tfeed.feed.author[0].gd$image.src;

    for (var g = 0; g < nc && g < tt; g++) {
        var c = tfeed.feed.entry[g];

        // 👉 Bỏ qua nếu comment đã bị xoá hoặc không có nội dung
        if (c.gd$deleted === "true" 
            || c.thr$deleted === "true" 
            || (c.category && c.category.some(cat => cat.term === "deleted")) 
            || !c.content 
            || (c.content && c.content.$t.trim() === "")) {
            continue;
        }

        var lkParts = c.link[0].href.split("/");
        var bid = lkParts[4], pid = lkParts[5], cid = lkParts[8];
        d[g] = c["thr$in-reply-to"].href;
        if (y !== -1) d[g] += "?m=0";
        pi[g] = c.gd$extendedProperty[0].value;
        ti[g] = c.gd$extendedProperty[1].value;
        p[g] = cid;

        // Nội dung bình luận
        var e = c.content ? c.content.$t : (c.summary ? c.summary.$t : "&#8592;");
        e = e.replace(/<br \/>/g, " ")
             .replace(/@<a.*?a>/g, "")
             .replace(/<[^>]*>/g, "");

        if (e.length <= length_content) {
            j2[g] = e;
        } else {
            var truncated = e.substring(0, length_content);
            var lastSpace = truncated.lastIndexOf(" ");
            if (lastSpace > 0) {
                truncated = truncated.substring(0, lastSpace);
            }
            j2[g] = truncated + "&#133;"; // thêm dấu …
        }

        // Tác giả
        var a2 = c.author[0].name ? c.author[0].name.$t : "Anonymous";
        if (a2.length < length_name) {
            a[g] = a2;
        } else {
            a2 = a2.substring(0, length_name);
            a[g] = a2 + "&#133;";
        }

        if ("uri" in c.author[0]) ur[g] = c.author[0].uri.$t;

        // Avatar
        var avatarSrc = c.author[0].gd$image.src;
        if (avatarSrc.indexOf("blank.gif") !== -1) {
            im[g] = no_avatar;
            alt[g] = "Anonymous";
        } else {
            im[g] = avatarSrc;
            alt[g] = a[g];
        }

        // Nạp feed để lấy tiêu đề bài viết
        var script = document.createElement("script");
        if (d[g].indexOf("/p/") !== -1) {
            script.src = "https://www.blogger.com/feeds/" + bid + "/pages/default/" + pid + "?alt=json-in-script&callback=rc_avatar2";
        } else {
            script.src = home_page + "/feeds/" + pid + "/comments/default?alt=json-in-script&max-results=1&callback=rc_avatar2";
        }
        document.body.appendChild(script);
    }
}

// Hàm render ra HTML
function rc_avatar() {
  var e = "<ul>";
  for (var z = 0; z < nc && z < tt; z++) {
    // Xử lý tiêu đề bài viết
    t[z] = t[z].replace("Comments on " + tb + ": ", "");
    var r = "";
    if (pn[z] === 1) {
      r = "#c";
    } else {
      var cp = "commentPage=" + pn[z] + "#c";
      r = (y !== -1 ? "&" + cp : "?" + cp);
    }

    // Xác định class admin/author
    var liClass = ((ur[z] == ura && im[z] == ima) || 
                   (ur[z] == admin_uri && im[z] == admin_avatar)) 
                  ? "rc-admin" : "rc-author";

    // Render HTML
    e += '<li class="' + liClass + '">';
    e += '<div class="rc-item">';

    // Bọc avatar + text trong cùng một <a>
    e += '<a href="' + d[z] + r + p[z] + '" rel="nofollow" title="' + a[z] + " on " + t[z] + '" class="rc-link">';

    // Avatar bên trái
    e += '<img alt="' + alt[z] + '" class="rc-avatar" src="' + im[z] + '"/>';

    // Khối text bên phải (theo cột dọc)
    e += '<div class="rc-text">';
    e += '<h4 class="rc-name">' + a[z] + '</h4>';        // tên tác giả
    e += '<p class="rc-content">' + j2[z] + '</p>';      // nội dung comment
    if (pi[z] !== "true") {
      e += "<span class='rc-date'>" + ti[z] + "</span>"; // ngày tháng
    }
    e += '</div>'; // đóng rc-text

    e += '</a>'; // đóng link
    e += '</div>'; // đóng rc-item
    e += '</li>';
  }
  e += "</ul>";

  // Gắn vào DOM
  document.getElementById("rc-avatar-plus").innerHTML = e;
}


// Hàm hiển thị câu đúng ngữ pháp
function updateCommentSentence() {
  var el = document.getElementById("totalComments_bottom");
  if (!el) return;
  var count = parseInt(el.innerText, 10);
  var sentence = (count === 1) 
    ? "There is 1 comment" 
    : "There are " + count + " comments";
  var target = document.getElementById("commentSentence");
  if (target) {
    target.innerText = sentence;
  }
}

// Nạp feed chính
document.write('<script src="' + home_page + "/feeds/comments/default?alt=json-in-script&max-results=" + nc + '&callback=rc_avatar1"><\/script>');
