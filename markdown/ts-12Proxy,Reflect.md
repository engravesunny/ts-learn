# Proxy Refelct 拦截

## Proxy对象代理

> `Proxy` 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）

- 参数
- `target`
  - 要使用 `Proxy` 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
- `handler`
  - 一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 `p` 的行为。
- `handler.get()` 本次使用的`get`
  - 属性读取操作的捕捉器。
- `handler.set()` 本次使用的`set`
  - 属性设置操作的捕捉器。

## Reflect

> 与大多数全局对象不同Reflect并非一个构造函数，所以不能通过new运算符对其进行调用，或者将Reflect对象作为一个函数来调用。Reflect的所有属性和方法都是静态的（就像Math对象）

- Reflect.get(target, name, receiver)
- Reflect.get方法查找并返回target对象的name属性，如果没有该属性返回undefined
- Reflect.set(target, name,value, receiver)
- Reflect.set方法设置target对象的name属性等于value。

```ts
type Person = {
    name: string,
    age: number,
    text: string
}
 
 
const proxy = (object: any, key: any) => {
    return new Proxy(object, {
        get(target, prop, receiver) {
            console.log(`get key======>${key}`);
            return Reflect.get(target, prop, receiver)
        },
 
        set(target, prop, value, receiver) {
            console.log(`set key======>${key}`);
 
            return Reflect.set(target, prop, value, receiver)
        }
    })
}
 
const logAccess = (object: Person, key: 'name' | 'age' | 'text') => {
    return proxy(object, key)
}
 
let man: Person = logAccess({
    name: "小满",
    age: 20,
    text: "我的很小"
}, 'age')
 
man.age  = 30
 
console.log(man);
```

使用泛型+`keyof`优化

```ts
type Person = {
    name: string,
    age: number,
    text: string
}
 
 
const proxy = (object: any, key: any) => {
    return new Proxy(object, {
        get(target, prop, receiver) {
            console.log(`get key======>${key}`);
            return Reflect.get(target, prop, receiver)
        },
 
        set(target, prop, value, receiver) {
            console.log(`set key======>${key}`);
 
            return Reflect.set(target, prop, value, receiver)
        }
    })
}
 
 
const logAccess = <T>(object: T, key: keyof T): T => {
    return proxy(object, key)
}
 
let man: Person = logAccess({
    name: "小满",
    age: 20,
    text: "我的很小"
}, 'age')
 
 
let man2 = logAccess({
    id:1,
    name:"小满2"
}, 'name')
 
man.age = 30
 
console.log(man);
```

## 案例简单实现一个mobx观察者模式

```ts
// Proxy Reflect

let person = { name:'李华', age:20 }

// Proxy有两个参数
// target（要用Proxy包装的对象，只能是引用类型）和handle（以函数为属性的对象，定义在代理target是要执行的行为）

let personProxy = new Proxy(person,{
    // 拦截get
    get(target,key,receiver){

    },
    // 拦截set
    set(target,key,value,receiver){
        return true
    },
    // 拦截删除
    deleteProperty(target,p:string){
        return true
    },
    // 拦截函数调用
    apply(){

    },
    // 拦截in
    has(){
        return true
    },
    // 拦截for in
    ownKeys(){
        const res:ArrayLike<string | symbol> = []
        return res
    }
    // ...
})


// Reflect

// Reflect并非一个构造函数，想Math一样，Reflect的所有属性和方法都是静态的，可以直接调用

const person2 = { name:"王明",age:24 }

Reflect.get(person,'name')

//  一个 mobx 观察者模式

const list:Set<Function> = new Set()

const autorun = (fn:Function) => {
    if(fn){
        list.add(fn)
    }
}

const observable = <T extends object>(params:T) => {
    return new Proxy(params,{
        set(target,key,value,receiver){
            const result = Reflect.set(target,key,value,receiver)
            list.forEach(fn => fn())
            return result
        }
    })
}

const person3 = observable({name:'张力',age:21})

autorun(()=>{console.log('变化了');})

person3.name = '夏浩'
person3.age = 20
```
