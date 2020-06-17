var isPlay = false;
var $audio = $("audio");
var player = new Player($audio);
var defaultTime = 0;
var progress;
var voicepro ;
var lyric;

isLogin();

function isLogin() {
    $.ajax({
        type: "get",
        url: "/smartmusic/getsession",
        dataType: "text",
        success: function (res) {
            console.log(parseInt(res)==915);
            if (!(parseInt(res)==915)) {
                console.log("页面跳转");
                window.location.href='index.html';
            }
        },
        error : function(e){
            window.location.href='index.html';
        }
    });
}
getPlayList();

function getPlayList() {
    $.ajax({
        url: "/smartmusic/getMusicByid",
        dataType: "json",
        success: function (data) {
            player.musicList = data;
            //3.1遍历获取到的数据,创建每一条音乐
            var $msclist = $('.msclist ul');
            if(data.length>0){
                $.each(data, function (index, ele) {
                    var $item = createmscItem(index, ele);
                    $msclist.append($item);
                });
                initMusicInfo(data[0]);
                initLyricInfo(data[0]);
            }else{
                $msclist.append($("<span class='emptylist'>你的歌单空空如也,快去主页添加吧</span>"));
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
}
function createmscItem(index,music){
    var $item=$(
        "<li class=\"songs\" musicID = \""+music.musicid+"\">\r\n" + 
        "   <div class=\"licheck\"><i></i></div>\r\n" + 
        "   <div class=\"linum\">"+(index+1)+"</div>\r\n" + 
        "   <div class=\"liname\"><a href=\"javasctipt:;\">"+music.name+"</a>\r\n" + 
        "       <div class=\"limenu\">\r\n" + 
        "           <a href=\"javascript:;\" title=\"播放\" class = 'listplay'></a>\r\n" + 
        "           <a href=\"javascript:;\" title=\"添加\" style=\"display:none;\"></a>\r\n" + 
        "           <a href=\""+music.linkUrl+"\" title=\"下载\" download=\""+music.name+"-"+music.singer+".mp3\" class = 'listdown'></a>\r\n" +
        "           <a href=\"javascript:;\" title=\"分享\" class = 'listshare'></a>\r\n" + 
        "       </div>\r\n" + 
        "   </div>\r\n" + 
        "   <div class=\"lisinger\"><a href=\"javascript:;\">"+music.singer+"</a></div>\r\n" + 
        "   <div class=\"litime\">\r\n" + 
        "       <span>"+music.time+"</span>\r\n" + 
        "       <a href=\"javascript:;\" title=\"删除\" class='listdel'></a>\r\n" + 
        "   </div>\r\n" + 
        "</li>"
    );
    $item.get(0).index = index;
    $item.get(0).music = music;
    return $item;
}
function initMusicInfo(music) {
    var $mscImg = $(".song_info_pic img");
    var $songName = $(".song_info_name a");
    var $singerName = $(".song_info_singer a");
    var $ablumName = $(".song_info_ablum a");
    var $mscName = $(".msc_name");
    var $mscAuthor = $(".msc_author");
    var $msctime = $(".end_time");
    var $maskbg = $(".maskbg");
    // 给获取到的元素赋值
    $mscImg.attr("src",music.cover);
    $songName.text("歌曲名称:"+music.name);
    $singerName.text("歌手名:"+music.singer);
    $ablumName.text("专辑名:"+music.album);
    $mscName.text(music.name);
    $mscAuthor.text(" - "+music.singer);
    // $msctime.text(music.time);
    defaultTime = music.time;
    $maskbg.css("background-image"," url("+music.cover+")");
    $.ajax({
        type: "post",
        url : "/smartmusic/getCommentNumsByMusicID",
        dataType : "text",
        data : {
            musicid : music.musicid
        },
        success: function (data) {
            $(".comment_num").text(data);
        },
        error : function () {
        }
    });
}


function initLyricInfo(music){
    lyric = new Lyric(music.linkLrc);
    var $lrcContainer = $(".lyric");
    $lrcContainer.css("margin-top",0);
    //清空上一首音乐的歌词
    $lrcContainer.html("")
    lyric.loadLyric(function () {
        //创建歌词列表
        $.each(lyric.lyrics,function (index,ele) {
            var $item = $("<li>"+ele+"</li>");
            $lrcContainer.append($item);
        })
    });
}

//初始化进度条
initProgess();

function initProgess(){
    var $proBar =  $(".music_pro_bar");
    var $proLine =  $(".msc_pro_line");
    var $proDot =  $(".msc_pro_dot");
    progress  = Probar($proBar,$proLine,$proDot);

    //初始化进度条
    progress.proClick(function(value){
        player.musicSeekTo(value);
    });
    progress.proMove(function(value){
        player.musicSeekTo(value);
    });

    //音量进度条
    var $voiBar =  $(".music_sound_bar");
    var $voiLine =  $(".msc_sound_line");
    var $voiDot =  $(".msc_sound_dot");

        voicepro = Probar($voiBar,$voiLine,$voiDot);
        voicepro.proClick(function(value){
        player.musicVoiceSeekTo(value);
    });
    voicepro.proMove(function(value){
        player.musicVoiceSeekTo(value);
}); 

}