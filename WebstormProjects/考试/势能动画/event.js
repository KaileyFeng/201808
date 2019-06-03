function on(ele, type, fn) {
    if (!ele['my' + type]) {
        ele['my' + type] = [];
    }
    let a = ele['my' + type];
    for (var i = 0; i < a.length; i++) {
        if (a[i] === fn) {
            return
        }
    }
    a.push(fn);
}
function fire(type,e) {
    var a = this['my'+type];
    if(a&&a.length>0){
        for (var i = 0; i < a.length; i++) {
           if(typeof a[i] === 'function' ){
               a[i].call(this,e)
           }else{
               a.splice(i,1)
               i--
           }
        }
    }
}
function off(ele,type,fn) {
    var a = ele['my'+type];
    if(a&&a.length>0){
        for (var i = 0; i < a.length; i++) {
            if(a[i] === fn){
                a[i] = null;
            }
        }
    }
}