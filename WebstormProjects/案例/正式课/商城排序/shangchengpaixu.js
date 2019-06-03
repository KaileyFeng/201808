let header = document.getElementById('header');
let shopList = document.getElementById("shopList");
let buttons = header.getElementsByTagName('a');
let data = null;
let xhr = new XMLHttpRequest();
xhr.open('get', 'data/product.json', false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        data = JSON.parse(xhr.responseText);
    }
}
xhr.send();
//绑定数据到页面上
function bindHtml(data) {
    let str = ``;
    data.forEach(function (item) {
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
//给每一个按钮添加点击事件实现排序
for (var i = 0; i < buttons.length; i++) {
    buttons[i].index = -1;
    buttons[i].onclick = function(){
        let value = this.getAttribute('attrName');
        productSort.call(this,value);
        changeArrow.call(this);
        clearArrow.call(this);
    }

}
function productSort(value){
    let that = this;
    if(value==='time'){
        data.sort(function(a,b){
            return (new Date(a.time) - new Date(b.time))*that.index;
        })
    }else{
        data.sort(function(a,b){
            return (a[value] - b[value])*that.index;
        })
    }
    bindHtml(data);
}
function changeArrow(){
    let down = this.children[1];
    let up = this.children[0];
    if(this.index<0){
        down.classList.add('bg');
        up.classList.remove('bg');
    }else{
        up.classList.add('bg');
        down.classList.remove('bg');
    }
}
//清除其他箭头的颜色
function clearArrow(){
    for (let i = 0; i < buttons.length; i++) {
      if(this != buttons[i]){
          buttons[i].children[0].classList.remove('bg');
          buttons[1].children[1].classList.remove('bg');
          buttons[i].index =-1;
      }

    }
}