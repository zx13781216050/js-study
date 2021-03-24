$(function () {
    //自定义滚动条
    $(".content_list").mCustomScrollbar();
    var $audio = $("audio");
    var player = Player($audio);
    //加载歌曲列表
    getPlayerList();
    function getPlayerList() {
        $.ajax({
            url: "./source/musiclist.json",
            dataType: "json",
            success: function (data) {
                player.musicList = data;
                var $musicList = $(".content_list ul");
                //遍历获取到达数据，创建每一条音乐
                $.each(data, function (index, ele) {
                    var $item = createMusicItem(index, ele);

                    $musicList.append($item);
                })
            },
            error: function (e) {
                console.log(e);
            }
        });
    }

    //初始化事件监听
    initEvents();
    function initEvents() {
        //监听歌曲的移入移出事件
        $(".content_list").delegate(".list_music", "mouseenter", function () {
            // 显示子菜单
            $(this).find(".list_menu").stop().fadeIn(100);
            $(this).find(".list_time a").stop().fadeIn(100);
            // 隐藏时长
            $(this).find(".list_time span").stop().fadeOut(100);
        });
        $(".content_list").delegate(".list_music", "mouseleave", function () {
            // 隐藏子菜单
            $(this).find(".list_menu").stop().fadeOut(100);
            $(this).find(".list_time a").stop().fadeOut(100);
            // 显示时长
            $(this).find(".list_time span").stop().fadeIn(100);
        });
        //监听复选框的点击事件
        $(".content_list").delegate(".list_check", "click", function () {
            $(this).toggleClass("list_checked");
        });
        //添加子菜单播放按钮的监听
        var $musicPlay = $(".music_play");
        $(".content_list").delegate(".list_menu_play", "click", function () {
            var $item = $(this).parents(".list_music");

            //切换菜单播放图标
            $(this).toggleClass("list_menu_play2");
            //复原其他的播放图标
            $item.siblings().find(".list_menu_play").removeClass("list_menu_play2");
            //同步底部播放按钮
            if ($(this).attr("class").indexOf("list_menu_play2") != -1) {
                $musicPlay.addClass("music_play2");
                //让文字高亮
                $item.find("div").css("color", "#fff");
                $item.siblings().find("div").css("color", "rgba(255,255,255,0.5");
            } else {
                $musicPlay.removeClass("music_play2");
                $item.find("div").css("color", "rgba(255,255,255,0.5)");
            }
            //切换序号状态
            $item.find(".list_number").toggleClass("list_number2");
            $item.siblings().find(".list_number").removeClass("list_number2");
            //播放音乐
            player.playMusic($item.get(0).index, $item.get(0).music);
        })

    }

    function createMusicItem(index, music) {
        var $item = $(`<li class="list_music">
        <div class="list_check"><i></i></div>
        <div class="list_number">${index + 1}</div>
        <div class="list_name">${music.name}
            <div class="list_menu">
                <a href="javascript:;" title="播放" class="list_menu_play"></a>
                <a href="javascript:;" title="添加"></a>
                <a href="javascript:;" title="下载"></a>
                <a href="javascript:;" title="分享"></a>

            </div>
        </div>
        <div class="list_singer">${music.singer}</div>
        <div class="list_time">
            <span>${music.time}</span>
            <a href="javascript:;" title="删除"></a>

        </div>
    </li>`);
        $item.get(0).index = index;
        $item.get(0).music = music;
        return $item;
    }
});