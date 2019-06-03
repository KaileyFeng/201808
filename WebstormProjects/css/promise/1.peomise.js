let Promise = require('./Promise')
let p = new Promise(function(resolve,reject){
    setTimeout(function(){
        reject('123')
    },1000)
})
p.then(function(data){
    console.log(data)
})