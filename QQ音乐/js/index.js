$(function () {
    //自定义滚动条
    $(".content_list").mCustomScrollbar();

    var $audio = $("audio");
    var player = Player($audio);
    var progress;
    var voiceProgress;
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
                });
                initMusicInfo(data[0]);
                initMusicLyric(data[0]);

            },
            error: function (e) {
                console.log(e);
            }
        });
    }
    //初始化歌曲信息
    function initMusicInfo(music) {
        //获取对应的元素
        var $musicImage = $(".song_info_pic img");
        var $musicName = $(".song_info_name a");
        var $musicSinger = $(".song_info_singer a");
        var $musicAblum = $(".song_info_ablum a");
        var $musicProgressName = $(".music_pregress_name");
        var $musicProgressTime = $(".music_pregress_time");
        var $musicBg = $(".mask_bg");
        //给获取的元素赋值
        $musicImage.attr("src", music.cover);
        $musicName.text(music.name);
        $musicSinger.text(music.singer);
        $musicAblum.text(music.album);
        $musicProgressName.text(music.name + " / " + music.singer);
        $musicProgressTime.text("00:00" + " / " + music.time);
        $musicBg.css("background", `url("${music.cover}")`);
    }
    //初始化歌词信息
    function initMusicLyric(music) {
        var lyric = new Lyric(music.link_lrc);
        var $lryicContainer = $(".song_lyric");
        lyric.loadLyric(function () {
            //创建歌词列表
            $.each(lyric.lyrics, function (index, ele) {
                var $item = $(`<li>${ele}<li>`);
                $lryicContainer.append($item);
            })
        });
    }
    //初始化进度条
    initProgress();
    function initProgress() {
        var $progressBar = $(".music_progress_bar");
        var $progressLine = $(".music_progress_line");
        var $progressDot = $(".music_progress_dot");
        progress = Progress($progressBar, $progressLine, $progressDot);
        progress.progressClick(function (value) {
            player.musicSeekTo(value);
        });
        progress.progressMove(function (value) {
            player.musicSeekTo(value);

        });


        var $voiceBar = $(".music_voice_bar");
        var $voiceLine = $(".music_voice_line");
        var $voiceDot = $(".music_voice_dot");
        voiceProgress = Progress($voiceBar, $voiceLine, $voiceDot);
        voiceProgress.progressClick(function (value) {
            player.musicVoiveSeekTo(value);
        });
        voiceProgress.progressMove(function (value) {
            player.musicVoiceSeekTo(value);

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
            //切换歌曲信息
            initMusicInfo($item.get(0).music);
        });
        //监听底部控制区域播放按钮
        $musicPlay.click(function () {
            //判断有没有播放音乐
            if (player.currentIndex == -1) {
                $(".list_music").eq(0).find(".list_menu_play").trigger("click");
            } else {
                $(".list_music").eq(player.currentIndex).find(".list_menu_play").trigger("click");
            }
        });
        //监听底部控制区域上一首按钮
        $(".music_pre").click(function () {
            $(".list_music").eq(player.preIndex()).find(".list_menu_play").trigger("click");
        });
        //监听底部控制区域下一首按钮
        $(".music_next").click(function () {
            $(".list_music").eq(player.nextIndex()).find(".list_menu_play").trigger("click");
        });
        //监听删除按钮
        $(".content_list").delegate(".list_menu_del", "click", function () {

            var $item = $(this).parents(".list_music");
            //判断当前删除的是否是正在播放的
            if ($item.get(0).index == player.currentIndex) {
                $(".music_next").trigger("click");
            }
            $item.remove();
            player.changeMusic($item.get(0).index);
            //重新排序
            $(".list_music").each(function (index, ele) {
                ele.index = index;
                $(ele).find(".list_number").text(index + 1);
            })
        });
        //监听播放的进度
        player.musicTimeUpdate(function (currentTime, duration, timeStr) {
            //同步时间
            $(".music_progress_time").text(timeStr);
            //同步进度条
            var value = currentTime / duration * 100;
            progress.setProgress(value);
        });
        //监听声音按钮
        $(".music_voice_icon").click(function () {
            //图标切换
            $(this).toggleClass("music_voice_icon2");
            //声音切换
            if ($(this).attr("class").indexOf("music_voice_icon2") != -1) {
                //变为没有声音
                player.musicVoiceSeekTo(0);
            } else {
                //变为有声音
                player.musicVoiceSeekTo(1);
            }
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
            <a href="javascript:;" title="删除" class="list_menu_del"></a>

        </div>
    </li>`);
        $item.get(0).index = index;
        $item.get(0).music = music;
        return $item;
    }
    //定义一个格式化时间的方法

});