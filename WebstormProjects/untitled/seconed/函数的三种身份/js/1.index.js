// 函数的三种身份

    /*
    *
    * 函数的三种身份：
    *   1，普通函数
    *       堆栈内存释放
    *       作用域链
    *
    *
    *   2，普通对象
    *       和一个普通的obj没啥区别 就是对键值对的增删改查
    *
    *   3，类
    *       prototype 原型
    *       __proto__ 原型链
    *       实例
    *
    *   三种角色之间没有什么必然关系
    * */
/*
    function Fn(){
        var n = 10;
        this.m = 100;
    }
    Fn.prototype.aa = function(){
        console.log(this.m)

    }
    Fn.bb = function(){
        console.log('bb')
    }
    // Fn()  // this -> window  普通函数执行  有一个私有变量 n 和原型 以及属性没有关系

    // 类  构造函数执行
    var f = new Fn();  // this -> f
    console.log(f.n); // undefined n是私有变量 和实例没有关系
    console.log(f.m); // 100    实例的私有属性
    f.aa(); // 100      通过 __proto__ 找到Fn.prototype上的方法

    console.log(f.bb); // undefined 把Fn当做普通对象设置的属性而已 和实例没有关系



    // 普通对象
    //Fn.bb
    console.log(Fn.bb)
   */
