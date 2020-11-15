

function cloneDeep(value){
    if (value == undefined) return value
    if (typeof value !== 'object') return value
    if (value instanceof RegExp) return new RegExp(value)
    if (value instanceof Date) return new Date(value)
    if (typeof value == 'object' && value !==null) {
        let newobj = new value.constructor
        for (let key in value) {
            if(value.hasOwnProperty(key)){ // 不拷贝原型链上到属性
                newobj[key]= cloneDeep(value[key])
            }
        }
        return newobj
    }
}

let obj = [{ajb: {abc: {jj:'woshi1'}}}]
let newobj = cloneDeep(obj)
newobj[0].ajb = [4,3,2,1]
console.log(obj,newobj)