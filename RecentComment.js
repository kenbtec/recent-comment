// Recent Comments free version 3.2 by http://duypham.info

var copyright_by_duypham_dot_info = "Recent Comments free version 3.2 by http://duypham.info";

// Cấu hình hiển thị
var nc = 30;                // số lượng comment
var length_name = 30;       // độ dài tối đa của tên
var length_content = 100;   // độ dài tối đa của nội dung

// Avatar mặc định
var no_avatar = "https://1.bp.blogspot.com/-TrAcs0QeGmk/YPLQdMWjrcI/AAAAAAAAAm8/K1HEOZmwNFooyMLefdRqv4nMmtsgA0bSgCLcBGAsYHQ/s16000/favicon.png";

// Trang chủ và avatar admin
var home_page = "https://https://www.fearlessgeneration.xyz";
var admin_uri = "https://www.facebook.com/ngohoanganhtuan266/";
var admin_avatar = no_avatar;

// Hàm chính xử lý comment
function recentComments(json) {
    var comments = json.feed.entry;
    var html = "";

    for (var i = 0; i < nc && i < comments.length; i++) {
        var author = comments[i].author[0].name.$t;
        var link = comments[i].link[2].href;
        var content = comments[i].content ? comments[i].content.$t : comments[i].summary.$t;

        // Cắt ngắn tên và nội dung nếu quá dài
        if (author.length > length_name) {
            author = author.substring(0, length_name) + "...";
        }
        if (content.length > length_content) {
            content = content.substring(0, length_content) + "...";
        }

        // Avatar
        var avatar = comments[i].author[0].gd$image ? comments[i].author[0].gd$image.src : no_avatar;
        if (author === "Admin") {
            avatar = admin_avatar;
        }

        // Tạo HTML hiển thị
        html += "<li>";
        html += "<img src='" + avatar + "' alt='avatar' />";
        html += "<a href='" + link + "'>" + author + "</a>: " + content;
        html += "</li>";
    }

    // Gắn vào phần tử có id 'recent-comments'
    document.getElementById("recent-comments").innerHTML = "<ul>" + html + "</ul>";
}
