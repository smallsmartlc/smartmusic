var lock = false;
var curIndex = -1;
$(function(){
    //0.添加(自定义滚动条)
    $(".msclist").mCustomScrollbar();
    $(".lyric_contain").mCustomScrollbar();
    //3.2 动态创建的动作只能用事件委托,改成事件委托

    //初始化事件监听
    initEvents();
    function initEvents() {
            //1.监听歌曲移入移出事件
        $('.msclist').delegate(".songs","mouseenter",function () {
            //显示子菜单
            $(this).find(".limenu").stop().fadeIn(100);
            //隐藏时长
            $(this).find(".litime>span").stop().fadeOut(0);
            $(this).find(".litime a").stop().fadeIn(100);
        });
        $('.msclist').delegate(".songs","mouseleave",function () {
            //显示时长
            $(this).find(".limenu").stop().fadeOut(100);
            $(this).find(".litime>span").stop().fadeIn(100);
            $(this).find(".litime a").stop().fadeOut(0);
            //隐藏子菜单
        });
        //双击播放事件
        $('.msclist').delegate(".songs","dblclick",function () {
            $(this).find('.listplay').trigger('click');
        });
        $('.msclist').delegate(".licheck>i","click",function () {
            if($(this).attr("all")=='true'){
                if ($(this).attr('class')=='checked') {
                    $('.licheck>i').removeClass('checked');
                }else{
                    $('.licheck>i').addClass('checked');
                }
            }else{
                $(this).toggleClass("checked")
                if ($(this).attr('class')!='checked') {
                    $(".title .licheck i").removeClass('checked');
                }
            };
        });
    
       var $musicPlay = $(".music_play");
       //3.添加子菜单播放按钮的监听
       $('.msclist').delegate(".listplay",'click',function() {
           lock=!lock;
           var $item = $(this).parents(".songs");
           // console.log($item.get(0).index);
           // console.log($item.get(0).music);
           
           // 3.1 切换播放图标
           $(this).toggleClass("listplay2");
           // 3.2复原其他的播放图标
           $item.siblings().find(".listplay").removeClass("listplay2");
           // 3.3同步底部播放按钮
           // 
           if($(this).attr("class").indexOf("listplay2")==-1){
            // if ($(this).hasClass("listplay2")) {
               $musicPlay.removeClass("music_play2");
               //让文字取消高亮
               $item.find("div a").css("opacity","0.7");
               isPlay = false;
               //
               $(this).find(".limenu").css("display","block");
               
            }else{
                //播放状态
                $musicPlay.addClass("music_play2");
                //让文字高亮
                $item.siblings().find("div a").css("opacity","0.7");
                $item.find("div a").css("opacity","1");
                isPlay = true;
                //3.8还原滚动条
                
            }
            //3.4切换序号的状态
            $item.siblings().find(".linum").removeClass("linum2");
            $item.find(".linum").toggleClass("linum2");
            
            //3.5播放音乐
            player.playMusic($item.get(0).index,$item.get(0).music);
            
            //3.6 切换歌曲信息
            initMusicInfo($item.get(0).music);
            //3.7 切换歌词信息
            //改写在3.5playMusic方法中
           //3.8 切换评论信息//写在3.6中
        });
        //3+.添加子菜单添加按钮的监听
        $('.msclist').delegate(".listadd",'click',function() {
             var sucbox = $(".addsuc");
             var failbox = $(".addfail");
             var musicid = $(this).parents(".songs").attr("musicid");
             $.ajax({
                 url : "/smartmusic/addMusicById",
                 dataType : "text" ,
                 data : {
                     musicid : musicid
                 },
                 success: function (data) {
                     if(parseInt(data)==915){
                         if(sucbox.eq(0).css("display")=="none"){
                             sucbox.fadeIn();
                             setTimeout(function(){
                                 sucbox.fadeOut();
                             },2000);
                         }
                     }else{
                         failbox.find("h2").text(data);
                         if(failbox.eq(0).css("display")=="none"){
                             failbox.fadeIn();
                             setTimeout(function(){
                                 failbox.fadeOut();
                             },2000);
                         }
                     }
                 },
                 error : function (e) {
                     console.log(e);
                     failbox.find("h2").text("服务器异常,请联系管理员");
                     if(failbox.eq(0).css("display")=="none"){
                         failbox.fadeIn();
                         setTimeout(function(){
                             failbox.fadeOut();
                         },2000);
                     }
                 }
             });
        });


       //4.监听底部控制区域播放按钮的点击
        $musicPlay.click(function(){
            //判断是否播放过音乐
            if(player.currentIndex==-1){
                //没有播放过音乐
                $(".songs").eq(0).find(".listplay").trigger("click");
            }else{
                //播放过音乐
                $(".songs").eq(player.currentIndex).find(".listplay").trigger("click");
            }
        });
        //5.监听底部控制区域上一首按钮的点击
        $(".music_pre").click(function(){
            $(".songs").eq(player.preIndex()).find(".listplay").trigger("click");
        });
        //6.监听底部控制区域下一首按钮的点击
        $(".music_next").click(function(){
            $(".songs").eq(player.nextIndex()).find(".listplay").trigger("click");
        });
        //6+.监听底部控制区域下载按钮的点击
        $(".music_down").click(function(){
            if(player.currentIndex==-1){
                //没有播放过音乐
                $(".songs").eq(0).find(".listdown")[0].click();
            }else{
                $(".songs").eq(player.currentIndex).find(".listdown")[0].click();
            }
        });
        //7+,监听子菜单分享按钮的事件 http://182.92.159.13:8080/smartmusic/
        $('.msclist').delegate(".listshare",'click',function() {
            var imgsrc = "http://182.92.159.13:9915/smartmusic/"+$(".song_info_pic img").attr("src");
            var name =  $(this).parents(".songs").find(".liname a").text();
            var author =  $(this).parents(".songs").find(".lisinger a").text();
            window.open("http://connect.qq.com/widget/shareqq/index.html?url=http://182.92.159.13:9915/smartmusic&sharesource=qzone&title=smart音乐--smallsmart的歌单&pics="+imgsrc+"&summary="+name+"--"+author+"&desc=我在smart音乐发现一首好歌,快来一起听吧","_blank");
        });
        //7,监听删除按钮的事件,事件委托
        $('.msclist').delegate(".listdel",'click',function() {
            //找到被点击的音乐
            var $item = $(this).parents(".songs");
            //判断当前删除的音乐是否是正在播放的
            if($item.get(0).index==player.currentIndex){
                $(".music_next").trigger("click");
            }
            var nowurl = window.location.href;
            var error = -1;
            var musicid = $item.attr("musicid");
            if(nowurl.indexOf("usercenter")!=-1){
                $.ajax({
                    url : "/smartmusic/removeMusicById",
                    dataType : "text" ,
                    data : {
                        musicid : musicid
                    },
                    success: function (data) {
                        if(!parseInt(data)==915){
                            error = 400;
                        }
                    },
                    error : function () {
                        error = 400;
                    }
                })
            }
            if(error>0) return;
            $item.remove();
            player.changeMsc($item.get(0).index);

            // 重新排序
            $(".songs").each(function(index,ele){
                ele.index = index;
                $(ele).find(".linum").text(index+1);
            }) ;

        });
        //8.监听播放的进度
        player.musicTimeUpdate(function(MscTime,MscCurTime,mills,curmills){
            //同步时间
            $('.end_time').text(MscTime);
            $('.start_time').text(MscCurTime+" / ");
            //同步进度条
            //计算播放比例
            var value = (curmills / mills) *100;
            if(value==100){
                setTimeout(function(){
                    $(".music_next").trigger("click");
                },1000);
            }
            if(isNaN(value)) value=0;
            progress.setProgess(value);
            //实现歌词的同步
            var index;
            
            index = lyric.currentIndex(curmills);
            
            var $item = $(".lyric li").eq(index);
            $item.addClass("cur");
            $item.siblings().removeClass("cur");
            if (index<=2||isNaN(index)) {
                return;
            }
            if(curIndex!=index){
            //    $(".lyric").css({
            //     marginTop:(-index+2)*30
            // });
            $(".lyric_contain").mCustomScrollbar("scrollTo",(index-2)*30,{
                scrollInertia: 200
            });
            curIndex=index; 
            }
            
        });
        //9.监听声音按钮的点击
        $(".msc_sound").click(function(){
            //图标切换
            $(this).toggleClass("no_voice");
            //声音切换
            if($(this).attr("class").indexOf("no_voice")!=-1){
                //变为没有声音
                player.musicVoiceSeekTo(0);
            }else{
                //变为有声音
                player.musicVoiceSeekTo(1);
            }
        });
        //10,监听顶部下载,删除,清空列表,添加按钮的点击
        $(".bt_download").click(function(){
            var checks = $(".checked");
            var i = 0;
            for (; i < checks.length; i++) {
                var down = $(checks[i]).parents(".songs").find(".listdown")[0];
                if(down) down.click();
            }
            if(i==0){
                var infobox = $(".sendfail");
                infobox.find("h2").text("请先选中歌曲,再下载")
                infobox.fadeIn(500);
                infobox.fadeOut(500);
            }
        });
        $(".bt_delete").click(function(){
            var checks = $(".checked");
            var i = 0;
            for (; i < checks.length; i++) {
                var del = $(checks[i]).parents(".songs").find(".listdel")[0];
                if(del) del.click();
            }
            if(i==0){
                var infobox = $(".sendfail");
                infobox.find("h2").text("请先选中歌曲,再删除")
                infobox.fadeIn(500);
                infobox.fadeOut(500);
            }
        });
        $(".bt_deleteall").click(function(){
            var nowurl = window.location.href;
            var error = -1;
            if(nowurl.indexOf("usercenter")!=-1){
                $.ajax({
                    type: "post",
                    url : "/smartmusic/removeMusicByUserID",
                    dataType : "text" ,
                    success: function (data) {
                        if(!parseInt(data)==915){
                            error = 400;
                        }
                    },
                    error : function () {
                        error = 400;
                    }
                })
            }
            if(error>0) return;
            $(".songs").remove();
        });
        $(".bt_addto").click(function(){
            var checks = $(".checked");
            var i = 0;
            for (; i < checks.length; i++) {
                var del = $(checks[i]).parents(".songs").find(".listadd")[0];
                if(del) del.click();
            }
            if(i==0){
                var infobox = $(".sendfail");
                infobox.find("h2").text("请先选中歌曲,再删除")
                infobox.fadeIn(500);
                infobox.fadeOut(500);
            }
        });
        $(".music_fav").click(function () {
            if(player.currentIndex==-1){
                //没有播放过音乐
                $(".songs").eq(0).find(".listadd")[0].click();
            }else{
                $(".songs").eq(player.currentIndex).find(".listadd")[0].click();
            }
        })
        //11,评论区
        //加载评论
        $(".music_comment").click(function() {
            var musicid;
            if(player.currentIndex==-1){
                //没有播放过音乐
                musicid = $(".songs").eq(0).attr("musicid");
            }else{
                musicid = $(".songs").eq(player.currentIndex).attr("musicid");
            }
            $.ajax({
                type: "post",
                url : "/smartmusic/selectCommentByMusicID",
                dataType : "json",
                data : {
                  musicid : musicid
                },
                success: function (data) {
                    var commentwrap = $(".comments");
                    commentwrap.text("");
                    $.each(data, function (index, ele) {
                        var commentbox = $("<div class=\"comment_wrap\">\n" +
                            "                        <div class=\"comment_username\">"+ele.username+"</div>\n" +
                            "                        <div class=\"comment_time\">"+ele.comment_time+"</div>\n" +
                            "                        <div class=\"comment_info\">"+ele.content+"</div>\n" +
                            "                    </div>");
                        commentbox.get(0).index = index;
                        commentbox.get(0).comment = ele;
                        commentwrap.append(commentbox);
                    });
                    var comment = $(".comment_wrap");
                    for (let index = 0; index < comment.length; index++) {
                        (function (index){
                            var len = 100;//默认最多显示字数
                            var txtbox = comment.eq(index).find(".comment_info");//获取div对象
                            var content = txtbox.text();
                            var span = "<span>"+content.substring(0,len)+"</span>";
                            var viewAll = content.length>len?"查看全文":"";
                            var a = "<a href='javascript:;' class='initAll'>"+viewAll+"</a>";
                            txtbox.text("");
                            txtbox.append(span);
                            txtbox.append(a);
                            //查看全文
                            txtbox.delegate(".initAll",'click',function() {
                                var _this = $(this);
                                if(_this.text() == "查看全文"){      //如果a中含有"展开"则显示"收起"
                                    _this.text("<<收起");
                                    _this.prev('span').text(content);
                                }else{
                                    _this.text("查看全文");
                                    _this.prev('span').text(content.substring(0,len));
                                }
                            });
                        })(index)
                    }
                },
                error : function () {
                }
            });
            $(".comment_box").fadeToggle(1000);

            //滚动条事件
            // $(".comment_main").scroll(function() {
            //     viewH =$(this).height(),//可见高度
            //     contentH =$(this).get(0).scrollHeight,//内容高度
            //     scrollTop =$(this).scrollTop();//滚动高度
            //     if(scrollTop>=(contentH-viewH)-0.5){
            //         $(".loading").show();
            //     }else{
            //         $(".loading").hide();
            //     }
            // })
        });
        //发送评论
        $(".comment_foot .send").click(function () {
            var txtbox = $(".inputwrap input");
            var infobox = $(".sendfail");
            var isLogin = 0;
            $.ajax({
                type: "get",
                url: "/smartmusic/getsession",
                dataType: "text",
                success: function (res) {
                    if (!(parseInt(res)==915)) {
                        infobox.find("h2").text("登陆后才可以评论哦")
                        infobox.fadeIn(500);
                        infobox.fadeOut(500);
                        return;
                    }
                }
            });
            if(txtbox.val().length<10){
                infobox.find("h2").text("评论不能少于十个字")
                infobox.fadeIn(500);
                infobox.fadeOut(500);
                return;
            }
            if(txtbox.val().length>140){
                infobox.find("h2").text("不能多于140字")
                infobox.fadeIn(500);
                infobox.fadeOut(500);
                return;
            }
            var info = txtbox.val();
            txtbox.val("");
            var musicid;
            if(player.currentIndex==-1){
                //没有播放过音乐
                musicid = $(".songs").eq(0).attr("musicid");
            }else{
                musicid = $(".songs").eq(player.currentIndex).attr("musicid");
            }
            $.ajax({
                type: "post",
                url : "/smartmusic/addCommentByid",
                dataType : "text" ,
                data : {
                    musicid : musicid,
                    content : info,
                },
                success: function (data) {
                    console.log(parseInt(data)==915)
                    if (parseInt(data)==915) {
                        infobox.find("h2").text("成功发表评论")
                        infobox.fadeIn(500);
                        infobox.fadeOut(500);
                        $(".music_comment")[0].click();
                        return;
                    }else{
                        infobox.find("h2").text("评论失败")
                        infobox.fadeIn(500);
                        infobox.fadeOut(500);
                        return;
                    }
                },
                error : function () {
                    infobox.find("h2").val("服务器内部错误,请联系管理员")
                    infobox.fadeIn(500);
                    infobox.fadeOut(500);
                    return;
                }
            })
        });
    }  
});   
// $('.songs').hover(function () {//改成事件委托
//     //显示子菜单
//     $(this).find(".limenu").stop().fadeIn(100);
//     //隐藏时长
//     $(this).find(".litime>span").stop().fadeOut(0);
//     $(this).find(".litime a").stop().fadeIn(100);
// },function () {
//     //显示时长
//     $(this).find(".limenu").stop().fadeOut(100);
//     $(this).find(".litime>span").stop().fadeIn(100);
//     $(this).find(".litime a").stop().fadeOut(0);
//     //隐藏子菜单
// })
//2.监听复选框点击事件
// $('.licheck>i').click(function(){
//     if($(this).attr("all")=='true'){
//         if ($(this).attr('class')=='checked') {
//             $('.licheck>i').removeClass('checked');
//         }else{
//             $('.licheck>i').addClass('checked');
//         }
//     }else{
//         $(this).toggleClass("checked")
//         if ($(this).attr('class')!='checked') {
//             $(".title .licheck i").removeClass('checked');
//         }
//     };
// });
