window.onload = function () {

	imgLoad('wrap', 'box');

	$('body').on('click', '.newImg', function (e) {
		var _this = $(this);
		imgShow("#outerdiv", "#innerdiv", "#bigimg", _this);
	});

	$('#topdiv').on('click', function () {
		$('body,html').animate({
			scrollTop: 0
		}, 500);
	});

	var data = [
		{ 'src': '1.jpg', 'title': '介绍一下图片吧' , location:'图书馆', time: '两周前' },
		{ 'src': '2.jpg', 'title': '介绍一下图片吧' , location:'诚园8斋', time: '两周前' },
		{ 'src': '3.jpg', 'title': '介绍一下图片吧' , location:'软件学院', time: '两周前' },
		{ 'src': '4.jpg', 'title': '介绍一下图片吧' , location:'1895', time: '两周前' },
		{ 'src': '5.jpg', 'title': '介绍一下图片吧' , location:'学三食堂', time: '两周前' },
		{ 'src': '6.jpg', 'title': '介绍一下图片吧' , location:'45楼', time: '两周前' },
		{ 'src': '7.jpg', 'title': '介绍一下图片吧' , location:'教室内', time: '两周前' },
		{ 'src': '8.jpg', 'title': '介绍一下图片吧' , location:'宿舍里', time: '两周前' },
		{ 'src': '9.jpg', 'title': '介绍一下图片吧' , location:'33楼', time: '两周前' },
		{ 'src': '10.jpg', 'title': '介绍一下图片吧' , location:'大活', time: '两周前' },
		{ 'src': '11.jpg', 'title': '介绍一下图片吧' , location:'求实会堂', time: '两周前' },
		{ 'src': '12.jpg', 'title': '介绍一下图片吧' , location:'广场', time: '两周前' },
		{ 'src': '13.jpg', 'title': '介绍一下图片吧' , location:'斗兽场', time: '两周前' },
		{ 'src': '14.jpg', 'title': '介绍一下图片吧' , location:'46教学楼', time: '两周前' },
		{ 'src': '15.jpg', 'title': '介绍一下图片吧' , location:'天大北门', time: '两周前' },
		{ 'src': '16.jpg', 'title': '介绍一下图片吧' , location:'操场', time: '两周前' },
		{ 'src': '17.jpg', 'title': '介绍一下图片吧' , location:'齐园超市', time: '两周前' },
		{ 'src': '18.jpg', 'title': '介绍一下图片吧' , location:'格园楼下', time: '两周前' },
		{ 'src': '19.jpg', 'title': '介绍一下图片吧' , location:'天大东门', time: '两周前' },
		{ 'src': '20.jpg', 'title': '介绍一下图片吧' , location:'青园餐厅', time: '两周前' },
	];

	//瀑布流
	window.onscroll = function () {

		if ($(window).scrollTop() > (windowH/2)) {
			$('#topdiv').fadeIn(300);
		} else {
			$('#topdiv').fadeOut(300);
		}

		if (getCheck()) {
			var wrap = document.getElementById('wrap');
			for (i in data) {

				var box = document.createElement('div');
				box.className = 'box';
				wrap.appendChild(box);
				
				var info = document.createElement('div');
				info.className = 'info';
				box.appendChild(info);

				var pic = document.createElement('div');
				pic.className = 'pic';
				info.appendChild(pic);
				
				var img = document.createElement('img');
				img.src = 'img/' + data[i].src;
				img.className = 'newImg'
				info.appendChild(img);
				
				var textInfo = document.createElement('div');
				textInfo.className = 'textInfo';
				info.appendChild(textInfo);
				$(".info").trigger("create");

				var location = document.createElement('img')
				location.className = 'location';
				location.src = 'img/location.png';
				textInfo.appendChild(location);
				var pone = document.createElement('p');
				pone.className = 'locationtext';
				pone.innerHTML = data[i].location;
				textInfo.appendChild(pone);

				var time = document.createElement('img')
				time.className = 'time';
				time.src = 'img/time.png';
				textInfo.appendChild(time);
				$(".textInfo").trigger("create");
				var ptwo = document.createElement('p');
				ptwo.innerHTML = data[i].time;
				textInfo.appendChild(ptwo);
				$(".textInfo").trigger("create");

				var title = document.createElement('div');
				title.className = 'title';
				info.appendChild(title);
				
				var a = document.createElement('a');
				a.innerHTML = data[i].title;
				title.appendChild(a);

			}
			imgLoad('wrap', 'box');
		}
	}
}
/**
* 滚动加载
*/
function imgLoad(wrap, box) {
	var wrap = document.getElementById(wrap);
	var boxs = getClass(wrap, box);
	//colsNumber
	var boxW = boxs[0].offsetWidth;
	var colsNum = Math.floor(document.documentElement.clientWidth / boxW);
	wrap.style.width = boxW * colsNum + 'px';
	//
	var everyH = [];//colHeight
	for (var i = 0; i < boxs.length; i++) {
		if (i < colsNum) {
			everyH[i] = boxs[i].offsetHeight;
		} else {
			var minH = Math.min.apply(null, everyH);//col min height
			var minIndex = getIndex(minH, everyH); //mindex
			getStyle(boxs[i], minH, boxs[minIndex].offsetLeft, i);
			everyH[minIndex] += boxs[i].offsetHeight;//update minHeight
		}
	}
}

function getClass(aElement, className) {
	var obj = aElement.getElementsByTagName('*');
	var arr = [];
	for (var i = 0; i < obj.length; i++) {
		if (obj[i].className == className) {
			arr.push(obj[i]);
		}
	}
	return arr;
}
/**
* col min index
*/
function getIndex(minH, everyH) {
	for (index in everyH) {
		if (everyH[index] == minH) return index;
	}
}
/**
* check
*/
function getCheck() {
	var documentH = document.documentElement.clientHeight;
	var scrollH = document.documentElement.scrollTop || document.body.scrollTop;
	return documentH + scrollH >= getLastH() ? true : false;
}
/**
* 最后box的高度
*/
function getLastH() {
	var wrap = document.getElementById('wrap');
	var boxs = getClass(wrap, 'box');
	return boxs[boxs.length - 1].offsetTop + boxs[boxs.length - 1].offsetHeight;
}
/**
* css
*/
var getStartNum = 0;//row number
function getStyle(box, top, left, index) {
	if (getStartNum >= index) return;
	$(box).css({
		'position': 'absolute',
		'top': top,
		"left": left,
		"opacity": "0",
	});
	$(box).stop().animate({
		"opacity": "1"
	}, 999);
	getStartNum = index;//更新请求数据的条数位置
};

var windowW = $(window).width(); 
var windowH = $(window).height(); 

function imgShow(outerdiv, innerdiv, bigimg, _this) {
	var src = _this.attr("src");  
	$(bigimg).attr("src", src); 
	console.log($('#bigimg').attr('src'));
	var thisimg = new Image();
	thisimg.src = src;
	thisimg.onload = function () {
		var realWidth = thisimg.width;
		var realHeight = thisimg.height;

		console.log(realHeight, realWidth);
		var imgWidth, imgHeight;
		var tempW = Math.floor(windowW / realWidth);
		var tempH = Math.floor(windowH / realHeight);
		if ((realWidth * tempH) > windowW) {
			imgWidth = realWidth * tempW;
			imgHeight = realHeight * tempW;
		} else {
			imgWidth = realWidth * tempH;
			imgHeight = realHeight * tempH;
		};
		$(bigimg).css("width", imgWidth);//display image  

		var padLeft = (windowW - imgWidth) / 2; 
		var padTop = (windowH - imgHeight) / 2; 
		$(innerdiv).css({ "top": padTop, "left": padLeft });
		$(outerdiv).fadeIn('800');

	};
	$(outerdiv).click(function () { 
		$(this).fadeOut('800');
	});
}