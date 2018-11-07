//main-slider
new Siema({
	selector: '.main-slider .ms-container',
	duration: 200,
	//easing: 'cubic-bezier(.11,.73,.57,1.53)',
});

new Siema({
	selector: '.t-slider',
	duration: 200,
	perPage: {
		0: 1,
		375: 2,
		768: 3,
	},
});

let menu_li = document.querySelectorAll('[data-href]'),
	header = document.querySelectorAll('header'),
	menu_active = document.querySelectorAll('header menu ul li.active');
menu_li.forEach(menu_li => menu_li.addEventListener('click', menuClick));

function menuClick(){
	let attr = this.getAttribute("data-href"),
		scrollTop = document.querySelectorAll('.'+attr)[0].offsetTop,
		headerH = document.querySelectorAll('header')[0].clientHeight,
		y = document.documentElement.scrollTop;
	this.classList.add('active');

	//console.log(screenTop + ' ' + headerH);
	if(y < headerH) {
		scrollTo(document.documentElement, scrollTop - (headerH - 39), 1000);
	}else {
		scrollTo(document.documentElement, scrollTop - headerH, 1000);
	}
	for(i=0; i<menu_li.length; i++) {
		menu_li[i].classList.remove('active');
	}
	
}

function scrollTo(element, to, duration) {
    var start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 20;
        
    var animateScroll = function(){        
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};

//header scroll
document.addEventListener("scroll", sticky);

function sticky() {
	let y = document.documentElement.scrollTop,
		headerH = header[0].clientHeight;
		//console.log(headerH);
	if(y > headerH) {
		header[0].classList.add('sticky');
	}else {
		header[0].classList.remove('sticky');
	}
	for(i=0;i<menu_li.length;i++) {
		let attr = menu_li[i].getAttribute("data-href"),
			scrollTop = document.querySelectorAll('.'+attr)[0].offsetTop;

		if(scrollTop - headerH <= y) {
			//console.log(menu_li);
			for(c=0;c<menu_li.length;c++) {
				menu_li[c].classList.remove('active');
			}
			menu_li[i].classList.add('active');
		}else {
			menu_li[i].classList.remove('active');
		}
		//console.log(scrollTop);
	}
	//console.log(y)
}

//menu
const bar = document.querySelectorAll('.bars')[0];
let default_var = 0,
	menu = document.querySelectorAll('header .menu')[0];
bar.addEventListener('click', barClick);

function barClick() {
	let menu_H = document.querySelectorAll('header .menu')[0].clientHeight,
		y = document.documentElement.scrollTop;
		console.log(menu_H);
	if(default_var==0) {
		default_var++;
		this.classList.add('active');
		menu.classList.add('show');
	}else {
		default_var = 0;
		this.classList.remove('active');
		menu.classList.remove('show');
		if(y !== 0) {
			scrollTo(document.documentElement, y + menu_H, 1000);
		}
	}
}