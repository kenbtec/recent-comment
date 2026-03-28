<script type="text/javascript">
// Cấu hình
var maxComments = 30;          // số bình luận lấy về
var maxNameLength = 30;        // giới hạn tên
var maxContentLength = 100;    // giới hạn nội dung
var defaultAvatar = "https://img.icons8.com/ios-filled/50/000000/user.png"; // avatar mặc định
var blogUrl = "https://www.fearlessgeneration.xyz"; // thay bằng domain blog của bạn
var adminName = "Admin";       // tên admin
var adminAvatar = "https://img.icons8.com/color/48/000000/admin-settings-male.png"; // avatar admin

// Hàm hiển thị bình luận
function rc_avatar1(json) {
  var comments = json.feed.entry || [];
  var html = "<ul>";

  for (var i = 0; i < comments.length && i < maxComments; i++) {
    var entry = comments[i];
    var author = entry.author[0].name.$t;
    var link = entry.link.find(l => l.rel === "alternate").href;
    var content = (entry.content ? entry.content.$t : "").replace(/<.*?>/g, "");
    var avatar = (entry.author[0].gd$image ? entry.author[0].gd$image.src : defaultAvatar);

    // Rút gọn tên và nội dung
    if (author.length > maxNameLength) author = author.substring(0, maxNameLength) + "...";
    if (content.length > maxContentLength) content = content.substring(0, maxContentLength) + "...";

    // Nếu là admin thì dùng avatar riêng
    if (author === adminName) avatar = adminAvatar;

    html += "<li style='margin-bottom:10px; display:flex; align-items:center;'>"
         + "<img src='" + avatar + "' style='width:32px;height:32px;border-radius:50%;margin-right:8px;'/>"
         + "<div><strong>" + author + "</strong><br/>"
         + "<a href='" + link + "' target='_blank'>" + content + "</a></div></li>";
  }

  html += "</ul>";
  document.getElementById("rc-avatar-plus").innerHTML = html;
}

// Gọi feed bình luận Blogger
var s = document.createElement("script");
s.src = blogUrl + "/feeds/comments/default?alt=json-in-script&max-results=" + maxComments + "&callback=rc_avatar1";
document.body.appendChild(s);
</script>
