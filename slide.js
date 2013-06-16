
var Slide = function (conf) {
  this.num = conf.num || 3;       
	if ( !conf.id ) {
	    throw new Error('The constructor Slide must have id parameter.');
	}
	this.id = conf.id;
	this.timer = conf.timer || 3000;
};

Slide.prototype = {

    createIndexList: function () { 
		var doc = document,
		    fragment = doc.createFragment(),
            li,
			link,
			index,
            i;

		for (i = 0; i < this.num; i++) {
			li = doc.createElement('li');
			link = doc.createElement('link');
			index = doc.createTextNode(i + 1);
			link.appendChild(index);
			li.appendChild(link);
			fragment.appendChild(li);
		}

		return fragment;
	},

    animate: function (isLeft) {
        var images = this.getImages(),
			img,
			parent,   // 幻灯片元素
			ul,       // 幻灯片容器
			isLeft = isLeft || false,  // 是否向左移动
			first,   // 第一个子元素
			last;    // 最后一个元素


		img = images[0];//this.currentIndex];
        parent = img.parentNode;
		ul = parent.parentNode;

		if (!isLeft) {
			ul.appendChild(parent);
		} else {
			first = this.getFirstElement(ul);
			last = this.getLastElement(ul);

		    ul.insertBefore(last, first);
		}

		/*
        // Version 0.1
		if ( isLeft ) {
		    this.currentIndex = this.currentIndex === 0 ? (len - 2) : 
				(this.currentIndex === 1 ? (len -1) : this.currentIndex - 2);
		}

		for (i = 0; i < this.num; i++) {
		    index = i + this.currentIndex + 1;
			if (index >= len) {
				index -= len;
			}
			this.show(images[index]);

			show[index] = 1;
		} 

		for (i = 0; i < len; i++) {
		    if ( !show[i] ) {
			    this.hide(images[i]);
			}
		}
		
		if (++this.currentIndex === len) {
		    this.currentIndex = 0;
		}*/
	},

	getFirstElement: function (parentElement) {
	    var firstElement = parentElement.firstChild;
	    
		while ( firstElement && firstElement.nodeType !== 1 ) {
		    firstElement = firstElement.nextSibling;
		}

		return firstElement;
	},

	getLastElement: function (parentElement) {
	    var lastElement = parentElement.lastChild;

		while ( lastElement && lastElement.nodeType !== 1 ) {
		    lastElement = lastElement.previousSibling;
		}

		return lastElement;
	},

	/*
    hide: function (element) {
	    element.style.display = 'none';  
	},

	
	show: function (element) {
	    element.style.display = 'block';	  
	},
	*/

	getImages: function () {
		var doc = document,
			ul = doc.getElementById(this.id),
		    images = ul.getElementsByTagName('img');
		    
		return images;
	},

	each: function (arr, fn) {
	    var i,
            len = arr.length;
		
		for (i = 0; i < len; i++) {
		    fn.call(null, arr[i], i, arr);
		}
	},

	instance: function () {
        var timer = this.timer;
		var that = this;
		var slideLeft = document.getElementById('btn-slideLeft');
		var slideRight = document.getElementById('btn-slideRight');

		function play() {
		    that.animate.apply(that, arguments);
		}

		function clickRightHandler() {
		    clearInterval(Slide.play);
			play();
			Slide.play = setInterval(play, timer);
		}

		function clickLeftHandler() {
		    clearInterval(Slide.play);
			play(true);
			Slide.play = setInterval(play, timer);
		}

	    Slide.play = setInterval(play, timer);  
		this.addEvent(slideLeft, 'click', clickLeftHandler);
		this.addEvent(slideRight, 'click', clickRightHandler);
	},

	addEvent: function (element, type, handler) {
	    if (element.addEventListener) {
		    element.addEventListener(type, handler, false);
		}  else if (element.attachEvent) {
		    element.attachEvent('on' + type, handler);
		} else {
		    element['on' + type] = handler;
		}
	},

	makeArray: function (arrayLike) {
	    var array = null;
	    try {
		    array = Array.prototype.slice.call(arrayLike, 0);
		} catch (ex) {
			array = [];
		    for (var i = 0, len = arrayLike.length; i < len; i++) {
			    array.push(arrayLike[i]);
			}
		}

		return array;
	}
};

var slide = new Slide({id: 'slide'});
slide.instance();

