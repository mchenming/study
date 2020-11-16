function Animal(name){
    this.name = name
}
Animal.prototype.eat = function(){
    console.log('吃肉')
}
let animal = new Animal('狮子')
let animal2 = new Animal('老虎')

console.log(animal.__proto__ == Animal.prototype)
console.log(animal.__proto__.constructor == Animal)
console.log(Animal.prototype.__proto__ == Object.prototype)
console.log(Animal.__proto__ == Function.prototype)
console.log(Function.prototype.__proto__ == Object.prototype)
console.log(Object.prototype.__proto__ == null)