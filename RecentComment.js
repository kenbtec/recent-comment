<script type="text/javascript">
// RecentComment.js
// Widget hiển thị bình luận gần đây cho Blogger

// Cấu hình
var blogUrl = "https://www.fearlessgeneration.xyz"; // thay bằng domain blog của bạn
var maxComments = 30;
var defaultAvatar = "https://img.icons8.com/ios-filled/50/000000/user.png";

// Hàm hiển thị danh sách bình luận
function rc_avatar(json) {
  var comments = json.feed.entry || [];
  var html = "<ul>";

  for (var i = 0; i < comments.length && i < maxComments; i++) {
    var entry = comments[i];
    var author = entry.author[0].name.$t;
    var link = entry.link.find(l => l.rel === "alternate").href;
    var content = (entry.content ? entry.content.$t : "").replace(/<.*?>/g, "");
    var avatar = (entry.author[0].gd$image ? entry.author[0].gd$image.src : defaultAvatar);

    if (content.length > 100) content = content.substring(0, 100) + "...";

    html += "<li style='margin-bottom:10px; display:flex; align-items:center;'>"
         + "<img src='" + avatar + "' style='width:32px;height:32px;border-radius:50%;margin-right:8px;'/>"
         + "<div><strong>" + author + "</strong><br/>"
         + "<a href='" + link + "' target='_blank'>" + content + "</a></div></li>";
  }

  html += "</ul>";
  document.getElementById("rc-avatar-plus").innerHTML = html;
}

// Hàm hiển thị tổng số bình luận
function totalComments(json) {
  document.getElementById("Stats1_totalComments").innerHTML = json.feed.openSearch$totalResults.$t;
}

// Tự động gọi feed bình luận Blogger
(function() {
  var s1 = document.createElement("script");
  s1.src = blogUrl + "/feeds/comments/default?alt=json-in-script&max-results=" + maxComments + "&callback=rc_avatar";
  document.body.appendChild(s1);

  var s2 = document.createElement("script");
  s2.src = blogUrl + "/feeds/comments/default?alt=json-in-script&max-results=0&callback=totalComments";
  document.body.appendChild(s2);
})();
</script>
