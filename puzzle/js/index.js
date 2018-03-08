$(document).ready(function () {
    var mainBoxWidth = $("#mainBox").width();
    var leftPadding = (mainBoxWidth - $("#outBox").width() - $('#relatedInfo').width()) / 2;
    $("#outBox").css("margin-left", leftPadding);
    $('#logo').css('margin-left', leftPadding);
    $('#auth').css('margin-left', leftPadding + 150);
    var res = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    showNineImg(res);

    $(".img-btu").click(function (e) {
        var btuNum = '#' + $(this).attr("id");
        var currentA = $(btuNum)
        var currentImg = currentA.find("img")
        var currentImgUrl = currentImg.attr("src");

        var imgNum;
        for (var i = 0; i < 10; i++) {
            if (btuNum == "#btu1") imgNum = 1;
            else if (btuNum == "#btu2") imgNum = 2;
            else if (btuNum == "#btu3") imgNum = 3;
            else if (btuNum == "#btu4") imgNum = 4;
            else if (btuNum == "#btu5") imgNum = 5;
            else if (btuNum == "#btu6") imgNum = 6;
            else if (btuNum == "#btu7") imgNum = 7;
            else if (btuNum == "#btu8") imgNum = 8;
            else if (btuNum == "#btu9") imgNum = 9;
        }
        var tempUp = $("#btu" + (imgNum - 3)).find("img").attr("src");
        var tempDown = $("#btu" + (imgNum + 3)).find("img").attr("src");
        var tempLeft = $("#btu" + (imgNum - 1)).find("img").attr("src");
        var tempRight = $("#btu" + (imgNum + 1)).find("img").attr("src");
        if (tempUp == "./img/9.gif") {
            $("#btu" + (imgNum - 3)).find("img").attr("src", currentImgUrl);
            currentImg.attr("src", "./img/9.gif");
        } else if (tempDown == "./img/9.gif") {
            $("#btu" + (imgNum + 3)).find("img").attr("src", currentImgUrl);
            currentImg.attr("src", "./img/9.gif");
        } else if (tempLeft == "./img/9.gif") {
            $("#btu" + (imgNum - 1)).find("img").attr("src", currentImgUrl);
            currentImg.attr("src", "./img/9.gif");
        } else if (tempRight == "./img/9.gif") {
            $("#btu" + (imgNum + 1)).find("img").attr("src", currentImgUrl);
            currentImg.attr("src", "./img/9.gif");
        }

        verR();
    });

    function verR() {
        var temp = '';
        var tempnum = 0;
        for (var i = 0; i < 8; i++) {
            var aId = '#btu' + (i + 1);
            var imgSrc = './img/' + (i + 1) + '.gif';
            if ($(aId).find("img").attr("src") == imgSrc) {
                temp += '1';
            } else {
                temp += '0';
            };
        };
        if (temp == '11111111') {
            var str = $('#timeText').html();
            window.setTimeout(function () {
                alert('恭喜！用时为 ' + str);
                console.log('success');
            }, 100);
            clearTime(timecount);
        }
    };

    function showNineImg(arr) {
        var arr1 = [1,2,3,4,5,6,7,8,9];
        var temp;
        function tk() {
            for (var i = 0; i < arr.length; i++) {
                    var inde = Math.floor(Math.random()*arr1.length);
                    arr[i] = arr1[inde];
                    arr1.splice(inde,1);
                };
            };
        tk();
        console.log(arr.toString());
        if (arr.toString() == arr1.toString()) {
            tk();
        };
        for (var int = 0; int < 10; int++) {
            var aId = "#btu" + (int + 1);
            var imgSrc = "./img/" + res[int] + ".gif";
            $(aId).find("img").attr("src", imgSrc);
        }
    };

    $('#refresh').click(function () {
        showNineImg(res);
        clearTime(timecount);
        timecount = null;
        $('#timeText').html('00 min 00 sec');
    });

    $('#homing').click(function () {
        for (var i = 0; i < 10; i++) {
            var aId = '#btu' + (i + 1);
            var imgSrc = './img/' + (i + 1) + '.gif';
            $(aId).find("img").attr("src", imgSrc);
        };
        clearTime(timecount);
        timecount = null;
        $('#timeText').html('00 min 00 sec');
    })
    var timecount;
    $('.imgBox').click(function () {
        if (timecount != null) {
            console.log('clicked');
        } else {
            console.log('click')
            var times = 1;
            timecount = window.setInterval(function () {
                var hour, min, sec;
                if (times < 60) {
                    hour = 0;
                    min = 0;
                    sec = times;
                    $('#timeText').html(numToStr(min) + ' min ' + numToStr(sec) + ' sec');
                } else if (times < 3600) {
                    hour = 0;
                    min = Math.floor(times / 60);
                    sec = times - min * 60;
                    $('#timeText').html(numToStr(min) + ' min ' + numToStr(sec) + ' sec');
                } else if (times < 3600 * 60) {
                    hour = Math.floor(times / 3600);
                    min = Math.floor((times - hour * 3600) / 60);
                    sec = times - hour * 3600 - mini * 60;
                    $('#timeText').html(numToStr(hour) + ' hour ' + numToStr(min) + ' min');
                } else {
                    times = 0;
                    hour = 0;
                    min = 0;
                    sec = 0;
                    $('#timeText').html(numToStr(min) + ' min ' + numToStr(sec) + ' sec');
                }
                times++;
                console.log(times);
            }, 1000)
        }
    });
    function clearTime(e) {
        clearInterval(e);
    }

    function numToStr(num) {
        if (num < 10) {
            return '0' + num;
        } else {
            return '' + num;
        }
    }
});

