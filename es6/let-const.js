// es6 规范尽量不要使用var

// var导致的问题
// 重复声明的问题
// 变量提升的问题  var  function  import
// var 默认回吧变量声明到全局上
// var没有作用域的概念
let b = 100
{   
    // console.log(b) // 暂存死区
    var a = 1
    let b = 2
}
// console.log(a)
// console.log(b)


// const p = 3.14
// p =100 //Assignment to constant variable.

const p = {
    r:3.14
}
p.r = 100  // const不能被深度修改 修改指针地址
