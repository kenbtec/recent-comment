function rc_avatar(json) {
  var html = "<ul class='idbcomments'>";
  var entries = json.feed.entry || [];

  for (var i = 0; i < entries.length && i < 5; i++) {
    var entry = entries[i];
    var author = entry.author[0].name.$t;
    var link = entry.link.find(l => l.rel === "alternate").href;
    var avatar = entry.author[0].gd$image ? entry.author[0].gd$image.src : "https://blogblog.com/img/b16-rounded.gif";
    var content = entry.content.$t.replace(/<.*?>/g, "");

    if (content.length > 40) {
      content = content.substring(0, 40) + "...";
    }

    html += "<li><div class='avatarImage'><img src='" + avatar + "' style='width:42px;height:42px;border-radius:50%;'/></div>"
          + "<a href='" + link + "'><strong>" + author + "</strong></a><br/>" + content + "</li>";
  }

  html += "</ul>";
  document.getElementById("rc-avatar-plus").innerHTML = html;
}
