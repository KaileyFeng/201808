
var heard = document.getElementById('header');
var bottons = heard.getElementsByTagName('a');
var shopList = document.getElementById('shopList');
    data = null;
var xhr = new XMLHttpRequest();
xhr.open('get','data/product.json',false);
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
        data = JSON.parse(xhr.responseText);
    }
}
xhr.send();

function bindHtml(data){
    var str=``;
    data.forEach(function(item){
        str += `<li>
                <img src="${item.img}" alt="">
                <p class="title">${item.title}</p>
                <p class="hot">${item.hot}</p>
                <del>￥9999</del>
                <span>￥${item.price}</span>
                <p class="time">上架时间：${item.time}</p>
            </li>`
    })
    shopList.innerHTML = str;
}
bindHtml(data);
console.log('data')
for(var i=0;i<bottons.length;i++){
    bottons[i].index = -1;
    bottons[i].onclick = function(){
        this.index *=-1;
        var value = this.getAttribute('attrName');
        sortArray.call(this,value);
        changeColor.call(this);
        clearArr.call(this);
    }
}
console.log('data')
function sortArray(value,index){
    for (var i=0;i<bottons.length;i++){
        var that = this;
        if(value == 'time'){
            data.sort(function(a,b){
                return (new Date(a.time)-new Date(b.time))*that.index;
            })
        }else{
            data.sort(function(a,b){
                return (a[value]-b[value])*that.index;
            })
        }
    }
    bindHtml(data);
}
function changeColor(){
    var down = this.children[1];
    var up = this.children[0];
    if(this.index == -1){
        down.classList.add('bg');
        up.classList.remove('bg');
    }
    else{
        up.classList.add('bg');
        down.classList.remove('bg');
    }
}

function clearArr(){
    for(var i=0;i<bottons.length;i++){
        if(this != bottons[i]){
            bottons[i].children[0].classList.remove('bg');
            bottons[i].children[1].classList.remove('bg');
            bottons[i].index = -1;
        }
    }
}
