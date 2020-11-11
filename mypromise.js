const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'
let called
function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('CHHAINING CYCLE DETECTED FOR PROMISE #<PROMISE'))
    }
    // 如果当前x是一个对象或者函数就暂且将他定义为promise
    if ((typeof x == 'object' && x !== null) || typeof x == 'function') {
        // 如何判断一个对象是否是promise  promise必须要有一个then方法
        try {
            // 有可能then方法再别人的promise中通过Object.defineProperty定义的取值的时候可能会发生异常，那就将这个promise2变成失败状即可
            let then = x.then
            if (typeof then == 'function') {
                // 如果有then函数什么他是一个promise
                then.call(x, (y) => {
                    if (called) {
                        return 
                    }
                    called = true
                    resolve(y)
                }, r => {
                    if (called) {
                        return 
                    }
                    called = true
                    reject(r)
                })
            } else {
                resolve(x)
            }
        } catch (error) {
            if (called) {
                return 
            }
            called = true
            //如果x取then的时候可能会发生异常，如果有异常
            reject(error)
        }
    } else {
        //普通值的情况直接成功即可
        resolve(x)
    }
}

class Promise {
    constructor(executor) {
        this.status = PENDING
        this.value = undefined
        this.reason = undefined
        this.onResolvedCallbacks = []
        this.onRejectCallbacks = []
        let resolve = (value) => { // 成功的回调
            // 如果value也是一个promise
            if (value instanceof Promise) {
                return value.then(resolve,reject)
            }
            if (this.status === PENDING) {
                this.status = RESOLVED
                this.value = value
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }
        let reject = (reason) => {  // 失败的回调
            if (this.status === PENDING) {
                this.status = REJECTED
                this.reason = reason
                this.onRejectCallbacks.forEach(fn => fn())
            }
        }
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }
    then(onFulfilled, onRejected) {
        let promise2 = new Promise((resolve, reject) => {
            onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val=>val
            onRejected = typeof onRejected === 'function' ? onRejected : err=> {throw err}

            // console.log(this.status)
            if (this.status === RESOLVED) {
                setTimeout(() => {
                    try {
                        console.log(888)
                        let x = onFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            }
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0);
            }
            if (this.status === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0)
                })
                this.onRejectCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0);
                })
            }
        })
        return promise2
    }
    catch(errCallback) {
        // catch原理就是then方法没有传入成功的方法
        return this.then(null,errCallback)
    }
}
// npm i promises-aplus-tests -g
// defer()函数作为延迟操作减少一层new promise
Promise.defer = Promise.deferred = function (){
    let dfd = {}
    dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}
// 静态方法
Promise.resolve =  function (value){
    return new Promise((resolve,reject)=>{
        resolve(value)
    })
}

Promise.reject =  function (reason){
    // 直接将原因抛出没有等待的效果
    return new Promise((resolve,reject)=>{
        reject(reason)
    })
}

module.exports = Promise
