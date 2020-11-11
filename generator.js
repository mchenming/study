// 生成器如何解决异步编程yield
function * read(){ // 生成的是迭代器
    yield 1;
    yield 2;
}
let it = read()  // iterator
let r = it.next()  // 迭代一次让函数执行 碰到yield就停止 返回的结果是一个对象{ value: 1, done: false }
console.log(r)
r = it.next()  // 迭代一次让函数执行 碰到yield就停止 返回的结果是一个对象{ value: 1, done: false }
console.log(r)
r = it.next()  // 迭代一次让函数执行 碰到yield就停止 返回的结果是一个对象{ value: 1, done: false }
console.log(r)

let fs =require('fs').promises
function * see () {
    let src = yield fs.readFile('./name.txt','utf-8')
    let age = yield fs.readFile(src,'utf-8')
    return age
}

let its = see()
let {value} = its.next()
value.then(res=>{
    let {value} = its.next(res)
    value.then(res=>{
        console.log(res)
    })
})