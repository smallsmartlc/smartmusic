(function (window) {
    function Player($audio) {
        return new Player.prototype.init($audio);
    }
    Player.prototype = {
        constructor: Player,
        musicList: [],
        init:  function($audio) {
            this.$audio = $audio;
            this.audio = $audio.get(0);
        },
        currentIndex:-1,
        playMusic:function (index,music) {
            //判断是否是同一首音乐
            if(index==this.currentIndex){
                // 同一首
                if(this.audio.paused){
                    //暂停
                    this.audio.play();
                }else{
                    this.audio.pause();
                }
            }else{
                //不是同一首
                this.$audio.attr("src" ,music.linkUrl);
                this.audio.play();
                this.currentIndex = index;
                //3.7 切换歌词信息
                initLyricInfo(music);
                 //3.8还原滚动条
                $(".lyric_contain").mCustomScrollbar("scrollTo","top",{
                    scrollInertia: 0
                });
            }
        },
        preIndex:function () {
            var index = this.currentIndex-1;
            if(index<0)  {index = this.musicList.length-1;}
            return index;
        },
        nextIndex:function () {
            var index = this.currentIndex+1;
            if(index>this.musicList.length-1) {index = 0;}
            return index;
        },
        changeMsc:function(index){
            //删除对应的数据
            this.musicList.splice(index,1);
            //判断当前删除的是否是正在播放音乐的前面
            if(index<this.currentIndex){
                this.currentIndex--;
            }
        },
        musicTimeUpdate:function(callBack){
            this.$audio.on("timeupdate",function(){
                var MscTime = formatDate(this.duration);
                var MscCurTime  = formatDate(this.currentTime);
                callBack(MscTime,MscCurTime,this.duration,this.currentTime);
            })
        },
        musicSeekTo:function(value){
            if (isNaN(value)) {
                return;
            }
            var a = this.audio.duration;
            if (isNaN(a)) {
                a = parseInt(defaultTime.split(":")[0]*60)+parseInt(defaultTime.split(":")[1]);
            }
            this.audio.currentTime = parseInt(a*value);
            // $(".lyric_contain").mCustomScrollbar("scrollTo",0,{
            //     scrollInertia: 0
            // });
        },
        musicVoiceSeekTo:function(value){
            if(isNaN(value)) return;
            if(value<0) value=0;
            if(value>=1) value=1;
            this.audio.volume = value;
        }
    }
    Player.prototype.init.prototype = Player.prototype;
    window.Player = Player;
})(window);
//格式化时间的方法
function formatDate(time){
    if(isNaN(time)){
        return;
    }
    var min = parseInt(time/60);
    var sec = parseInt(time%60);
    if(min<10){
        min = "0"+min;
    }
    if(sec<10){
        sec = "0"+sec;
    }
    return min+":"+sec;
}