var box = document.getElementById('box');
var uls = box.getElementsByTagName('ul');
uls = utils.toArray(uls);
var data = null;
var minH = null;
var winH = utils.win('clientHeight');
var img = box.getElementsByTagName('img');
ajax();
function ajax(){
    var xhr = new XMLHttpRequest();
    xhr.open('get','product.json',false);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            data = JSON.parse(xhr.responseText);
            console.log(data);
            bindHTML(20);
        }
    }
    xhr.send();
}
function bindHTML(n){
    for(var i=0;i<n;i++){
        uls.sort(function(a,b){
            return a.offsetHeight - b.offsetHeight
        })
        var randomNum = utils.getRandom(0,21);
        uls[0].innerHTML+=`<li>
                <div style="height: ${data[randomNum].height}px">
                 <img data-src="${data[randomNum].img}" alt="" style='transition: opacity 1s'>
                </div>
                <p>这是第${randomNum}张图片</p>
            </li>`
        minH = uls[0].offsetHeight;
    }
}
window.onscroll = function(){
    var winT = utils.win('scrollTop');
    if(winT+winH>minH){
        ajax();
    }
    lazy()
}
lazy()
function lazy(){
    for(var i=0;i<img.length;i++){
        lazyImg(img[i]);
    }
}
function lazyImg(ele){
    var winT = utils.win('scrollTop');
    var imgH = ele.offsetHeight;
    var imgT = utils.offset(ele).top;
    console.log(winT);
    if(winT+winH>imgT+imgH){
        var newImg = new Image;
        var url = ele.getAttribute('data-src')
        newImg.src = url;
        newImg.onload = function(){
            ele.src = this.src;
            ele.style.opacity = 1;
            // fadeIn(ele);
        }
    }
}
// function fadeIn(ele){
//     var opacity = utils.css(ele,'opacity');
//     ele.timer = setInterval(function(){
//         opacity += 0.04;
//         console.log(1)
//         utils.css(ele,'opacity',opacity);
//         if(opacity>=1){
//             clearInterval(ele.timer);
//             utils.css(ele,'opacity',1);
//         }
//     },17)
// }