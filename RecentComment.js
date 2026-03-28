// Recent Comments free version 3.2 by KenaT (đã chỉnh sửa)

// Cấu hình
var nc = 20;                 // số lượng bình luận
var length_name = 20;        // độ dài tên
var length_content = 100;    // độ dài nội dung bình luận

// Trang chủ và admin
var home_page = window.location.origin; 
var admin_uri = 'https://www.facebook.com/leanhduc.pro.vn/';

// Ảnh mặc định khi không có avatar
var no_avatar = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/.../unnamed%20(2).png';
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

// Hàm callback lấy danh sách comment
function rc_avatar1(tfeed) {
    tt = tfeed.feed.openSearch$totalResults.$t;
    tb = tfeed.feed.title.$t;
    if ("uri" in tfeed.feed.author[0]) ura = tfeed.feed.author[0].uri.$t;
    ima = tfeed.feed.author[0].gd$image.src;

    for (var g = 0; g < nc && g < tt; g++) {
        var c = tfeed.feed.entry[g];
        var lkParts = c.link[0].href.split("/");
        var bid = lkParts[4], pid = lkParts[5], cid = lkParts[8];
        d[g] = c["thr$in-reply-to"].href;
        if (y !== -1) d[g] += "?m=0";
        pi[g] = c.gd$extendedProperty[0].value;
        ti[g] = c.gd$extendedProperty[1].value;
        p[g] = cid;

        // Nội dung
        var e = c.content ? c.content.$t : (c.summary ? c.summary.$t : "&#8592;");
        e = e.replace(/<br \/>/g, " ").replace(/@<a.*?a>/g, "").replace(/<[^>]*>/g, "");
        if (e.length < length_content) j2[g] = e;
        else {
            e = e.substring(0, length_content);
            var r = e.lastIndexOf(" ");
            j2[g] = e.substring(0, r) + "&#133;";
        }

        // Tác giả (fallback nếu không có tên)
        var a2 = c.author[0].name ? c.author[0].name.$t : "Anonymous";
        if (a2.length < length_name) a[g] = a2;
        else {
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

        // Gọi tiếp feed để lấy tiêu đề bài
        if (d[g].indexOf("/p/") !== -1) {
            document.write('<script src="https://www.blogger.com/feeds/' + bid + "/pages/default/" + pid + '?alt=json-in-script&callback=rc_avatar2"><\/script>');
        } else {
            document.write('<script src="' + home_page + "/feeds/" + pid + '/comments/default?alt=json-in-script&max-results=1&callback=rc_avatar2"><\/script>');
        }
    }
}

// Hàm render ra HTML
function rc_avatar() {
    var e = "<ul>";
    for (var z = 0; z < nc && z < tt; z++) {
        t[z] = t[z].replace("Comments on " + tb + ": ", "");
        var r = "";
        if (pn[z] === 1) r = "#c";
        else {
            var cp = "commentPage=" + pn[z] + "#c";
            r = (y !== -1 ? "&" + cp : "?" + cp);
        }

        e += '<li class="' + ((ur[z] == ura && im[z] == ima) || (ur[z] == admin_uri && im[z] == admin_avatar) ? "rc-admin" : "rc-author") + '">';
        e += '<div class="rc-item">';
        e += '<a href="' + d[z] + r + p[z] + '" rel="nofollow" title="' + a[z] + " on " + t[z] + '">';
        e += '<img alt="' + alt[z] + '" class="rc-avatar" src="' + im[z] + '"/>';
        e += '<div class="rc-text">';
        e += '<h4 class="rc-name">' + a[z] + '</h4>';        // tên tác giả
        e += '<p class="rc-content">' + j2[z] + '</p>';      // nội dung comment
        if (pi[z] !== "true") e += "<span class='rc-date'>" + ti[z] + "</span>"; // ngày tháng
        e += '</div>'; // đóng rc-text
        e += '</a>';
        e += '</div>';
        e += '</li>';
    }
    e += "</ul>";
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
