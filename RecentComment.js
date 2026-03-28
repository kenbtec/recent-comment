/* Recent Comment By Ngô Hoàng Anh Tuấn */

// Cấu hình
var numComments = 5;                  // số bình luận hiển thị
var showAvatar = true;                // có hiển thị avatar
var avatarSize = 42;                  // kích thước avatar
var roundAvatar = true;               // avatar bo tròn
var characters = 40;                  // số ký tự nội dung hiển thị
var showMorelink = false;             // có hiển thị link "More" hay không
var defaultAvatar = "https://blogblog.com/img/b16-rounded.gif"; // avatar mặc định
var hideCredits = true;               // ẩn phần credit
var moreLinktext = " More »";         // text cho link "More"

// Hàm hiển thị bình luận
function rc_avatar(json) {
  var html = "<ul class='idbcomments'>";
  var entries = json.feed.entry || [];

  for (var i = 0; i < entries.length && i < numComments; i++) {
    var entry = entries[i];
    var author = entry.author[0].name.$t;
    var link = entry.link.find(l => l.rel === "alternate").href;
    var avatar = entry.author[0].gd$image ? entry.author[0].gd$image.src : defaultAvatar;
    var content = entry.content.$t.replace(/<.*?>/g, "");

    if (content.length > characters) {
      content = content.substring(0, characters) + "...";
      if (showMorelink) {
        content += " <a href='" + link + "'>" + moreLinktext + "</a>";
      }
    }

    html += "<li>";
    if (showAvatar) {
      html += "<div class='avatarImage'>"
           + "<img src='" + avatar + "' width='" + avatarSize + "' height='" + avatarSize + "'"
           + (roundAvatar ? " style='border-radius:50%;'" : "")
           + "/></div>";
    }
    html += "<a href='" + link + "'><strong>" + author + "</strong></a><br/>" + content;
    html += "</li>";
  }

  html += "</ul>";

  if (!hideCredits) {
    html += "<div style='display:block;'>Recent Comment By Ngô Hoàng Anh Tuấn</div>";
  }

  document.getElementById("rc-avatar-plus").innerHTML = html;
}
