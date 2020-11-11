let fs = require('fs')
// const { promisify } = require('util')

// fs.readFile('./name.txt','utf-8',function(err,data){
//     console.log(err,data)
//     fs.readFile(data,'utf-8',function(err,data){
//         console.log(err,data)
//     })
// })


// function read(...args){
//     return new Promise((resovle,reject)=>{
//         fs.readFile(...args,function(err,data){
//             if (err) {
//                 reject(err)
//             }
//             resovle(data)
//         })
//     })
// }

// promise 特性 then方法中传递的函数成功失败这两个函数的返回值可以返回一个promise
// 如果返回的是一个promise的话 会用这个promise的状态作为下一次then的结果
// 如果自己有捕获错误他就不会找catch
// 这个函数还可以返回普通值 只要不是error ，不是promise 都叫普通值会将这个值作为下一次then的结果

function promisify(fn){
    return (...args)=>{
        return new Promise((resolve,reject)=>{
            fn(...args,function(err,data){
                if (err) reject(err)
                resolve(data)
            })
        })
    }
}
let read = promisify(fs.readFile)

read('./name22.txt','utf-8').then(res=>{
    // console.log(res)
    return read(res+111,'utf-8')
},err=>{
    console.log(err)
    console.log(123)
}).then(res=>{
    console.log(234)
    console.log(res)
},reason=>{
    console.log(reason)
}).catch(err=>{
    console.log(445)
})