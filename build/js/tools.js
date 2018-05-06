(function ($, player) {
    player.renderPlayer = function (data) {
        $('.img_wrapper img').attr('src', data.image);
        $('.song_name').html(data.song);
        $('.singer_name').html(data.singer);
        $('.alub_name').html(data.album);
        $('.total_time').text(player.getAudioTime()['totalTime']);
        if (data.islike) {
            $('.like_btn').toggleClass('islike');
        };
        if(myAudio.paused) {
            $('.play_btn').addClass('ispause');
        }
    },
    player.getAudioTime = function() {
        function fix(num) {
            return ('' + num).length < 2 ? ((new Array(2 + 1)).join('0') + num).slice(-2) : '' + num;
        }
        var curTime = fix(parseInt(myAudio.currentTime / 62)) + ':' + fix(parseInt(myAudio.currentTime % 60)),
            totalTime = fix(parseInt(myAudio.duration / 60)) + ":" + fix(parseInt(myAudio.duration % 60)),
            present = (((myAudio.currentTime  / myAudio.duration) - 1) * 100).toFixed(2);
        return {
            curTime: curTime,
            totalTime: totalTime,
            present: present
        }
    },
    player.renderAudioTime = function() {
        var timeInfo = player.getAudioTime();
        // console.log(timeInfo.curTime, timeInfo.present)
        $('.cur_time').text(timeInfo.curTime);
        $('.top').css('left', timeInfo.present + '%');
    },
    player.getDate = function(searchValue) {
        $.ajax({
            type: 'GET',
            url: '../json/infor.json',
            // dataType: 'jsonp',
            // data: 'q=' + searchValue + '&count=6',
            success: function(data) {
                player.songsList = data;
                player.renderPlayer(data[player.curIndex]);
            },
            error: function() {
                console.log('error')
            }
        })
    },
    $('.like_btn').on('click', player.changeLoveState = function() {
        $(this).toggleClass('islike');
        !player.songsList[player.curIndex].islike;
    }),
    $('.prev_btn').on('click', player.prevSong = function() {
        if(player.curIndex == 0) {
            player.curIndex = player.songsList.length - 1;
        }else {
            player.curIndex --;
        }
        player.renderPlayer(player.songsList[player.curIndex]);
    }),
    $('.next_btn').on('click', player.nextSong = function() {
        if(player.curIndex == player.songsList.length - 1) {
            player.curIndex = 0;
        }else {
            player.curIndex ++;
        }
        player.renderPlayer(player.songsList[player.curIndex]);
    }),
    $('.play_btn').on('click', player.cheangePlayState = function() {
        $(this).toggleClass('ispause');
        myAudio.paused ? myAudio.play() : myAudio.pause();
    }),
    $('.move_btn').on('touchstart', function(touch) {
        console.log('touchstart');
        var touchEvent = touch.touches[0],
            startX = touchEvent.clientX,
            posX = parseInt(window.getComputedStyle(this)['left']),
            moveMax = parseInt(window.getComputedStyle(document.getElementsByClassName('bottom')[0])['width']);
        $('.move_btn').on('touchmove', function(touch) {
            console.log('touchmove');
            var endX = touch.touches[0].clientX;
            myAudio.currentTime += parseInt((endX - startX) / moveMax * myAudio.duration)
            console.log((endX - startX) / moveMax, myAudio.currentTime)
        });
        $('.move_btn').on('touchend', function(touch) {
            console.log('touchend');
            $(this).off('touchmove');
            $(this).off('touchstart');
        });
    }),
    player.getStyle = function(ele, attr) {
        if(window.getComputedStyle) {
            return window.getComputedStyle(ele)[attr];
        }else {
            return ele.currentStyle[attr];
        }
    }
})(window.Zepto, window.player = {})
