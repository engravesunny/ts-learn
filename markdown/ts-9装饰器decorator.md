# 装饰器

> Decorator 装饰器是一项实验性特性，在未来的版本中可能会发生改变
> 它们不仅增加了代码的可读性，清晰地表达了意图，而且提供一种方便的手段，增加或修改类的功能
> 若要启用实验性的装饰器特性，你必须在命令行或tsconfig.json里启用编译器选项
> `"experimentalDecorators": true,                   /* Enable experimental support for legacy experimental decorators. */`

## 装饰器定义

> 装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上。

```ts
class A {
    constructor{

    }
}
```

> 定义一个类装饰器函数 他会把ClassA的构造函数传入你的watcher函数当做第一个参数

```ts
const watcher : ClassDecorator = (target: Function)=> {
    target.prototype.getParams = <T>(params:T):T => {
        return params
    }
}
```

> 使用的时候 直接通过@函数名使用

```ts
@watcher
class A {
    constructor{

    }
}
```

> 验证

```ts
const a = new A();
console.log((a as any).getParams('123'));
```

## 装饰器工厂

> 其实也就是一个高阶函数 外层的函数接受值 里层的函数最终接受类的构造函数

```ts
const watcher = (name: string): ClassDecorator => {
    return (target: Function) => {
        target.prototype.getParams = <T>(params: T): T => {
            return params
        }
        target.prototype.getOptions = (): string => {
            return name
        }
    }
}
 
@watcher('name')
class A {
    constructor() {
 
    }
}
 
const a = new A();
console.log((a as any).getParams('123'));
```

## 装饰器组合

> 就是可以使用多个装饰器

```ts
const watcher2 = (name:string) => {
    return (target: Function) => {
        target.prototype.getNames = ():string => {
            return name
        }
    }
}
const watcher = (name: string): ClassDecorator => {
    return (target: Function) => {
        target.prototype.getParams = <T>(params: T): T => {
            return params
        }
        target.prototype.getOptions = (): string => {
            return name
        }
    }
}

@watcher2('name2')
@watcher('name')
class A {
    constructor() {
 
    }
}
 
const a = new A();
console.log((a as any).getParams('123'));
```

## 方法装饰器

> 返回三个参数

- 1.对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
- 2.成员的名字。
- 3.成员的属性描述符。

```js
[
  {},
  'setParasm',
  {
    value: [Function: setParasm],
    writable: true,
    enumerable: false,
    configurable: true
  }
]
```

```ts
const met:MethodDecorator = (...args) => {
    console.log(args);
}
 
class A {
    constructor() {
 
    }
    @met
    getName ():string {
        return '小满'
    }
}
 
 
const a = new A();
```

## 属性装饰器

> 返回两个参数

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 属性的名字。

`[ {}, 'name', undefined ]`

```ts
const met:PropertyDecorator = (...args) => {
    console.log(args);
}
 
class A {
    @met
    name:string
    constructor() {
 
    }
   
}
 
 
const a = new A();
```

## 参数装饰器

> 返回三个参数

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。
3. 参数在函数参数列表中的索引。

`[ {}, 'setParasm', 0 ]`

```ts
const met:ParameterDecorator = (...args) => {
    console.log(args);
}
 
class A {
    constructor() {
 
    }
    setParasm (@met name:string = '213') {
 
    }
}
 
 
const a = new A();
```

- 用装饰器，实现一个简便的发送网络请求的Http类

```ts
import axios from 'axios'
// 首先定义一个类
console.log('------------------------------------------------')
const Base = (name:string) => {
    const fn:ClassDecorator = (target) => {
        // console.log(target);
        target.prototype.name = '张三'
        target.prototype.fn = () => {
            console.log(name);
        }
    }
    return fn
}

const Get = (url:string) => {
    const fn:MethodDecorator = (target,propertyKey,descriptor:PropertyDescriptor) => {
        console.log(target,propertyKey,descriptor);
        axios.get(url).then(res=>{
            descriptor.value(res.data)
        })
    }
    return fn
}

@Base('李四')
class Http {
    @Get('http://kecat.top/post/ts-1%E5%90%84%E7%A7%8D%E7%B1%BB%E5%9E%8B.md')
    getPost(data:any):void{
        console.log(data);
    }
}

const http = new Http() as any

http.getPost()
```
