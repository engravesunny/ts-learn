# 声明文件，混入Mixins

## 声明文件 declare

> 当时用第三方库的时候，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。

```ts
declare var 声明全局变量
declare function 声明全局方法
declare class 声明全局类
declare enum 声明全局枚举类型
declare namespace 声明（含有子属性的）全局对象
interface 和 type 声明全局类型
/// <reference /> 三斜线指令
```

例如我们有一个`express` 和 `axios`

```ts
import axios from 'axios'
import express from 'express'
// 报错，无法找到“express”的声明文件
```

发现`express` 报错了

让我们去下载他的声明文件

`npm install @types/node -D`

那为什么`axios` 没有报错

我们可以去`node_modules` 下面去找`axios` 的`package json`

```ts
// 第24行
  "types": "index.d.ts",
```

发现axios已经指定了声明文件 所以没有报错可以直接用

通过语法declare 暴露我们声明的axios 对象

declare  const axios: AxiosStatic;

如果有一些第三方包确实没有声明文件我们可以自己去定义

名称.d.ts 创建一个文件去声明

- **案例手写声明文件**

index.ts

```ts
import axios from "axios";
import express from 'express';

const app = express()

const router = express.Router()

app.use('/api',router)

router.get('/list',(req,res)=>{
    res.json({
        code:200
    })
})

app.listen(9001,()=>{
    console.log(9001)
})
```

express.d.ts

```ts
declare module 'express' {
    interface Router {
        get(path:string,cb:(req:any,res:any)=>void):void
    }
    interface App {
        use(path:string,router:Router):void
        listen(port:number,cb?:()=>void)
    }

    interface Express {
        ():App
        Router():Router
    }
    const express:Express
    export default express
}
```

## Mixins混入

> TyepScript混入Mixins其实vue也有mixins这个东西 你可以把他看作为合并

- **1.对象混入**

> 可以使用es6的`Object.assign` 合并多个对象
> 此时 `people` 会被推断成一个交差类型 `Name & Age & sex`

```ts
interface Name {
    name: string
}
interface Age {
    age: number
}
interface Sex {
    sex: number
}
 
let people1: Name = { name: "小满" }
let people2: Age = { age: 20 }
let people3: Sex = { sex: 1 }
 
const people = Object.assign(people1,people2,people3)
```

- **2.类的混入**

> 首先声明两个mixins类（严格模式要关闭不然编译不过）

```ts
class A {
  type: boolean = false
  changeType() {
    this.type = !this.type
  }
}
class B {
  naem:string = '张三'
  getName():string{
    return this.name
  }
}
```

>下面创建一个类，结合了这两个mixins
&nbsp;
> 首先应该注意到的是，没使用extends而是使用implements。 把类当成了接口
&nbsp;
> 我们可以这么做来达到目的，为将要mixin进来的属性方法创建出占位属性。 这告诉编译器这些成员在运行时是可用的。 这样就能使用mixin带来的便利，虽说需要提前定义一些占位属性

```ts
class C implements A111,B111{
    type:boolean
    name:string
    constructor(type:boolean,name:string){
        this.type = type
        this.name = name
    }
    changeType(): void {
        
    }
    getName(): string {
        return this.name
    }
}
```

> 最后，创建这个帮助函数，帮我们做混入操作。 它会遍历mixins上的所有属性，并复制到目标上去，把之前的占位属性替换成真正的实现代码

**Object.getOwnPropertyNames()可以获取对象自身的属性，除去他继承来的属性，
对它所有的属性遍历，它是一个数组，遍历一下它所有的属性名**

```ts
Mixins(C, [A, B])
function Mixins(curCls: any, itemCls: any[]) {
    itemCls.forEach(item => {
        Object.getOwnPropertyNames(item.prototype).forEach(name => {
            curCls.prototype[name] = item.prototype[name]
        })
    })
}
```
