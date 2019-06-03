function Promise(executer){
    let self = this;
    self.status = 'pending';
    self.value = undefined;
    self.reason = undefined;
    self.onFulFilledCallBacks=[];
    self.onRejectedCallBacks = []
    function resolve(value){
        if(self.status === 'pending'){
            self.value = value
            self.status = 'resolved'
        }
    }
    function reject(reason){
        if(self.status === 'pending'){
            self.value = reason;
            self.status = 'rejected'
        }
    }
    try{
        executer(resolve,reject)
    }catch (e){
        rejected(self.reason)
    }

}
Promise.prototype.then = function(onfulfilled,onrejected){
    let self = this;
    if(self.status === 'resolved'){
        onfulfilled(self.value)
    }
    if(self.status === 'rejected'){
        onrejected(self.reason)
    }
    if(self.status === 'pending'){
        self.onFulFilledCallBacks.push(
            onfulfilled
        )
        self.onRejectedCallBacks.push(
            onrejected
        )
    }
}
module.exports =Promise