(function (window) {
    function Probar($proBar,$proLine,$proDot) {
        return new Probar.prototype.init($proBar,$proLine,$proDot);
    }
    Probar.prototype = {
        constructor: Probar,
        init: function($proBar,$proLine,$proDot) {
           this.$proBar = $proBar;
           this.$proLine = $proLine;
           this.$proDot = $proDot;
        },
        isMove:false,
        proClick:function(callBack){
            var $this = this;
            //监听背景点击
            this.$proBar.click(function(event){
                if(player.currentIndex==-1){
                    //没有播放过音乐
                    $(".songs").eq(0).find(".listplay").trigger("click");
                }
                event = event || window.event;//兼容IE
                //获取背景距离窗口的位置 
                var normalLeft = $(this).offset().left;
                //获取点击位置距离窗口的位置
                var eventLeft =event.pageX;
                //设置前景的宽度
                $this.$proLine.css("width", eventLeft - normalLeft);
                $this.$proDot.css("left", eventLeft - normalLeft);
                //计算进度条的比例
                var value = (eventLeft - normalLeft)/$(this).width();
                
                callBack(value);
            });
        },
        proMove : function(callBack){
            var $this = this;
            var normalLeft = this.$proBar.offset().left;
            var barWidth = this.$proBar.width();
           
            //1.监听鼠标的按下事件
            this.$proBar.mousedown(function(){
                $this.isMove = true;
                 //2.监听鼠标的移动事件
                 $(document).mousemove(function(event){
                    //设为不可选中
                    $('body').css("user-select","none");
                    //获取点击位置距离窗口的位置
                    var eventLeft =event.pageX;
                    //设置前景的宽度
                    var m = eventLeft - normalLeft;
                    if(m<0){
                        m=0;
                    }else if(m>parseInt($this.$proBar.css("width"))){
                        m=parseInt($this.$proBar.css("width"));
                    }
                    // var n = parseInt($('.music_pro_bar').css('width'));
                    $this.$proLine.css("width", m);
                    $this.$proDot.css("left",m);
                   
                });

                //3.监听鼠标的抬起事件
                $(document).mouseup(function(event){
                    $(document).unbind("mouseup"); 
                    // alert('aaa');
                    $this.isMove = false;
                    $('body').css("user-select","text");
                    $(document).off("mousemove");
                     //计算进度条的比例
                     var eventLeft =event.pageX;
                     var value = (eventLeft - normalLeft)/$this.$proBar.width();
                     callBack(value);
                     if(player.currentIndex==-1){
                        //没有播放过音乐
                        $(".songs").eq(0).find(".listplay").trigger("click");
                    }
                });
            });
        },
        setProgess: function(value){
            if (this.isMove) return;
            if(value<0||value>100) return;
            this.$proLine.css({
                "width":value+"%"
            })
            this.$proDot.css({
                "left":value+"%"
            })
        }
    }    
    Probar.prototype.init.prototype = Probar.prototype;
    window.Probar = Probar;
})(window);