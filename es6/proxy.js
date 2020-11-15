// proxy代理 + reflect 反射作用

// 以后所有对象Object的新方法都会放到Reflect 原有的方法也会迁移到Reflect上
// let obj ={
//     a:123,
//     b:{
//         b:{
//             b:200
//         }
//     }
// }
let obj =[1,2,3,5]
let handler = {
    get(target,key){
        // return target[key]
        // 相当于懒加载模式 只有取值时判断value为对象时才会重新添加代理 
        // 区别object.defineProperty一上来就递归给每一个key都添加getter setter

        if (typeof target[key] === 'object') {
            console.log('取值')
            return new Proxy(target[key],handler)
        }
        return Reflect.get(target,key)
    },
    set(target,key,value){
        console.log('set了')
        console.log(key)
        // target[key] = value
        // return true
        if (target[key]!==value) {
            return Reflect.set(target,key,value)
        }
        return true
    }
}
let proxy = new Proxy(obj,handler)

proxy.c = 100
// proxy.b.b.b=200
// proxy.push(5)
console.log(proxy)