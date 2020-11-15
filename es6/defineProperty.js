// defineProperty(修改原对象) proxy（代理）数据劫持
// let obj = {}
// let content = undefined
// Object.defineProperty(obj,'a',{
//     enumerable:false,  // 是否可枚举 如果es5来模拟es6的类需要使用此方法
//     configurable:false, // 能不能被配置 来判断是否能被重新定义
//     get(){
//         return content
//     },
//     set(newval){
//         content = newval
//     }
// })
// obj.a = 'hello'
// console.log(obj.a)

// let obj1= Object.freeze({})    // 当前被冻结后的对象不能再次被改写
// Object.defineProperty(obj1,'a',{
//     get(){},
//     set(){}
// })

// 数据劫持  vue 要监控数据的变化  数据变化后需要更新视图
let data = {
    a:1,
    b:2,
    obj:{
        a:1
    }
}

const update=()=>{
    console.log('updata view') // 模拟更新视图
}

//不支持数组的方法 push pop unshift shift sort slice...
function defineReactive(data,key,value) {
    observer(value)
    Object.defineProperty(data,key,{
        get(){
            return value
        },
        set(newvalue) {
            if(value !== newvalue) {
                value = newvalue
                update()
            }
        }
    })
}
function observer(data){
    if (typeof data == 'object' && data !==null) {
        for (const key in data) {
            defineReactive(data,key,data[key])
        }
    } else {
        return data
    }
}
observer(data)
data.a = 100
data.a = 100
