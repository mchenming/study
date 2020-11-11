
Promise.prototype.finally =function (callback) {
    return this.then((data)=>{
        // 使用promise.resolve确保callback中的promise执行完成
        return Promise.resolve(callback()).then(()=>data)
    },(err)=>{
        return Promise.resolve(callback()).then(()=>{throw err})
    })
}


// Promise.reject('100').finally(()=>{
//     console.log('is ok')
//     return new Promise((resolve,reject)=>{
//         // 和这个没什么关系只是等待
//         setTimeout(() => {
//             resolve('1222')
//         }, 2000);
//     })
// }).then(data=>{
//     console.log('成功：'+ data)
// }).catch(error=>{
//     console.log('失败：'+ error)
// })

// Promise.all 全部成功才成功 如果有任何一个失败了 就会执行失败的逻辑 Promise.race 能执行then方法的返回的一定是一个promise

function isPromise(promise){
    return typeof promise.then === 'function'
}

// Promise.race([]) // 赛跑谁最快就用谁的结果，可以做promise中端处理
const fs = require("fs").promises
Promise.all = function(promises) {
    return new Promise((resolve,reject)=>{
        let resultArr = []
        let idx = 0
        const processData = (data,index) =>{
            resultArr[index] = data
            if (++idx === promises.length) {
                resolve(resultArr)
            }
        }
        for(let i = 0;i<promises.length;i++) {
            let currentValue = promises[i]
            if (isPromise(currentValue)) {
                currentValue.then(res=>{
                    processData(res,i)
                },reject)
            } else {
                processData(currentValue,i)
            }
        }
    })
}

// 全部执行成功才回返回成功，只要有一个失败就失败
Promise.all([Promise.resolve(100),Promise.reject(200),3]).then(res=>{
    console.log(res)
},err=>{
    console.log('aaaaaaaaaaaaaaaaaaaaaaaa' +err)
})