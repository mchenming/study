// 被观察者
class Subject{
    constructor(name){
        this.name = name
        this.arr = []
        this.status = '哈哈哈哈'
    }
    attach(obs){
        this.arr.push(obs)
    }
    setStatus(status){
        this.status = status
        this.arr.forEach(item=>{
            item.update(this.status)
        })
    }
}

class Observe{
    constructor(name) {
        this.name = name
    }
    update(status){
        console.log(this.name + ':' + status)
    }
}

let baby = new Subject('我是被观察者的对象')

let personOne = new Observe('观察者1号')
let personTwo = new Observe('观察者2号')
baby.attach(personOne)
baby.attach(personTwo)

baby.setStatus('嘻嘻嘻嘻')