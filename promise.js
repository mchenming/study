let Promise = require('./mypromise')
// promise 解决异步编程的方法
// 多个异步方法串行问题 链式调用(还是基于回调的)
// 多个异步并发的问题 同时拿到两个异步的执行结果 promise.all

// es6规范中的一个class

// 每个promise需要提供一个执行器函数executor(这个函数会立即执行)
// new Promise()之后会返回一个promise实例这个实例存在一个then方法
// executor中需要提供一个成功的方法和一个失败的方法
let p = new Promise((resolve,reject)=>{
    // setTimeout(_=>{
    //     resolve('hhahaha')
    //     reject('error')
    // },1000)
    resolve('success')
    // throw new Error('报错了')
    // resolve('hahahah')
})
let p3 = p.then((res)=>{
    return new Promise((resolve,reject)=>{
        reject('err')
    })
    // return 100
})
// 链式调用的实现是每一次都返回一个新的promise

// console.log('2')
console.log('p3'+p3)
p3.then(res=>{
    console.log('成功'+res)
},err=>{
    console.log('失败'+err)
})