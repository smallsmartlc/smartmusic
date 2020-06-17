(function (window) {
    function Lyric(path) {
        return new Lyric.prototype.init(path);
    }
    Lyric.prototype = {
        constructor: Lyric,
        musicList: [],
        init:  function(path) {
            this.path = path;
        },
        times:[],
        lyrics:[],
        index:-1,
        i:0,
        loadLyric:function(callBack){
            var $this = this;
            $.ajax({
                url:$this.path,
                dataType:"text",
                success:function(data){
                //   console.log(data);
                    $this.parseLyric(data);
                    callBack();
                },
                error:function(e){
                    console.log(e);
                }
            });
        },
        parseLyric:function(data){
            var $this = this;
            //清空上一首歌的歌词和时间信息
            $this.times = [];
            $this.lyrics = [];
            $this.i = 0;
            $this.index=-1;
            var arr = data.split("\n");
            // console.log(arr);
            var timeReg = /\[(\d*:\d*\.\d*)\]/;
            //遍历取出每一条歌词
            $.each(arr,function(index,ele){
                //处理空字符串歌词
                if(ele=="") return true;
                var lrc =ele.split("]")[1];
                if(lrc.length<=1) return true;
                $this.lyrics.push(lrc);

                var res = timeReg.exec(ele);
                // console.log(res);
                
                if(res==null) return true;
                var timeStr = res[1];//00:00.92
                var res2 = timeStr.split(":");
                var min = parseInt(res2[0])*60;
                var sec = parseFloat(res2[1]);
                var time = parseFloat(Number(min+sec).toFixed(2));
                $this.times.push(time);

            });
            
        },
        currentIndex:function(currentTime){
            while(currentTime < this.times[this.i-1]) {
                this.index--;
                // this.times.shift();//删除数组最前面的一个元素
                this.i--;
            }
            while (currentTime >= this.times[this.i]) {
                this.index++;
                // this.times.shift();//删除数组最前面的一个元素
                this.i++;
            }
            return this.index;
        }
    }
    Lyric.prototype.init.prototype = Lyric.prototype;
    window.Lyric = Lyric;
})(window);
