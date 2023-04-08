# 泛型

> 泛型在TypeScript 是很重要的东西 例如vue3 是用ts编写的 里面用到了非常多的泛型

## 泛型函数

> 一个是数字类型的函数，另一个是字符串类型的函数,其实就是类型不同，
> 实现的功能是一样的，这时候我们就可以使用泛型来优化

```ts
function num111 (a:number, b:number): Array<number> {
    return [a,b]
}
num111(1,2)
function str111 (a:string,b:string):Array<string>{
    return [a,b]
}
str111('1','2')
```

- **泛型优化**

> 语法为函数名字后面跟一个<参数名> 参数名可以随便写 例如我这儿写了T
> 当我们使用这个函数的时候把参数的类型传进去就可以了 （也就是动态类型）

```ts
function Add<T>(a:T,b:T):Array<T>{
    return [a,b]
}

Add(1,2)
Add('1','2')
// Add(1,'2') // 报错，类型“string”的参数不能赋给类型“number”的参数。
```

> 我们也可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以。

```ts
function Sub<T,K>(a:T,b:K):Array<T|K>{
    return [a,b]
}

Sub(1,'2')
Sub('111',false)
```

## 定义泛型接口

> 声明接口的时候 在名字后面加一个<参数>
> 使用的时候传递类型

```ts
interface MyInter<T> {
    (arg:T):T
}

function fn<T>(arg:T):T{
    return arg
}

let result:MyInter<number> = fn

result(123)
```

## 对象字面量泛型

```ts
let foo: { <T>(arg:T):T }

// foo = <T>(arg:T):T => {
//     return arg
// }
foo = function<T>(arg:T):T {
    return arg
}

foo('123')
```

## 泛型约束

> 我们期望在一个泛型的变量上面，获取其length参数，但是，有的数据类型是没有length属性的

```ts
function getLength<T>(arg:T) {
    // return arg.length   // 类型“T”上不存在属性“length”
}
```

- 这时候我们就可以使用**泛型约束**

> 于是，我们就得对使用的泛型进行约束，我们约束其为具有length属性的类型，这里我们会用到interface,代码如下

```ts
interface Len {
    length:number
}

function getLength2<T extends Len>(arg:T):number{
    return arg.length
}

getLength2('123')
```

## 使用keyof 约束对象

- 其中使用了**TS泛型**和**泛型约束**。
- 首先定义了**T类型并**使用**extends**关键字继承**object**类型的子类型，
- 然后使用**keyof**操作符获取**T类型**的所有**键**，
- 它的返回 类型是**联合 类型**，
- 最后利用**extends关键字约束 K类型必须为keyof T联合类型的子类型**

```ts
function prop<T, K extends keyof T>(obj:T,key:K){
    return obj[key]
}

let o = {
    a:1,b:2
}

prop(o,'a')
prop(o,'b')
// prop(o,'c') // 报错, 类型“"c"”的参数不能赋给类型“"a" | "b"”的参数。ts(2345)
```

## 泛型类

> 声明方法跟函数类似名称后面**定义<类型>**
> 使用的时候确定类型`new Sub<number>()`

```ts
class Sub2<T>{
    attr: T[] = [];
    add (a:T):T[] {
       return [a]
    }
 }
  
 let s = new Sub2<number>()
 s.attr = [1,2,3]
 s.add(123)
  
 let str = new Sub2<string>()
 str.attr = ['1','2','3']
 str.add('123')
```
