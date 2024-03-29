let outer = document.getElementById('outer');
let swiper = document.getElementById('swiper');
console.log(swiper);
let focus = document.getElementById('focus');
let imgs = swiper.getElementsByTagName('img');
let lis = focus.getElementsByTagName('li');
let left = outer.getElementsByTagName('a')[0];
let right = outer.getElementsByTagName('a')[1];
let data = null;
let timer = null;
let step = 0;
let isClick = true;

let xhr = new XMLHttpRequest();
xhr.open('get', 'data.json', false);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        data = JSON.parse(xhr.responseText);
        console.log(data);
        bindHTML()
    }
}
xhr.send();

function bindHTML() {
    var imgStr = ``, lisStr = ``;
    for (let i = 0; i < data.length; i++) {
        imgStr += `<div><img data-src="img/${data[i].src}"></div>`;
        lisStr += `<li class="${i == 0 ? 'selected' : ''}"></li>`;
    }
    imgStr += `<div><img data-src="img/${data[0].src}"></div>`;
    swiper.innerHTML = imgStr
    focus.innerHTML = lisStr;
    utils.css(swiper, 'width', 1000 * (data.length + 1));
    lazyImg();
}
function lazyImg() {
    for (let i = 0; i < imgs.length; i++) {
        let cur = imgs[i];
        let newImg = new Image;
        let url = cur.getAttribute('data-src');
        newImg.src = url;
        newImg.onload = function () {
            cur.src = this.src;
            newImg = null;
            animated(cur, {opacity: 1}, 700)
        }
    }
}
timer = setInterval(autoMove, 2000);
function autoMove() {
    if (step >= data.length) {
        step = 0;
        utils.css(swiper, 'left', 0)
    }
    step++;
    animated(swiper, {left: step * -1000}, 1000, function () {
        isClick = true;
    });
    focusTip();
}
function focusTip() {
    for (let i = 0; i < lis.length; i++) {
        if (step == i) {
            lis[i].classList.add('selected');
        } else {
            lis[i].classList.remove('selected');
        }
        if (step == data.length) {
            lis[0].classList.add('selected');
        }
    }
}
outer.onmouseover = function () {
    clearInterval(timer);
    utils.css(left, 'display', 'block');
    utils.css(right, 'display', 'block');
}
outer.onmouseout = function () {
    timer = setInterval(autoMove, 2000);
    utils.css(left, 'display', 'none');
    utils.css(right, 'display', 'none');
}
right.onclick = function () {
    if (isClick) {
        isClick = false;
        autoMove();
    }
}
left.onclick = function () {
    if (isClick) {
        isClick = false;
        if (step <= 0) {
            step = data.length;
            utils.css(swiper, 'left', -1000 * step);
        }
        step--;
        animated(swiper, {left: -1000 * step}, 1000, function () {
            isClick = true;
        })
        focusTip();
    }
}
for (let i = 0; i < lis.length; i++) {
    lis[i].onclick = function () {
        if (isClick) {
            isClick = false;
            step = i - 1;
            autoMove();
        }
    }
}