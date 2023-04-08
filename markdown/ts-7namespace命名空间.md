# namespace命名空间

> 我们在工作中无法避免全局变量造成的污染，TypeScript提供了`namespace` 避免这个问题出现

- 内部模块，主要用于组织代码，避免命名冲突。
- 命名空间内的类默认私有
- 通过 `export` 暴露
- 通过 `namespace` 关键字定义

> **TypeScript与ECMAScript 2015一样，任何包含顶级import或者export的文件都被当成一个模块。相反地，如果一个文件不带有顶级的import或者export声明，那么它的内容被视为全局可见的（因此对模块也是可见的）**
> 命名空间中通过export将想要暴露的部分导出
> 如果不用export 导出是无法读取其值的

```ts
namespace a {
    export const Time: number = 1000
    export const fn = <T>(arg: T): T => {
        return arg
    }
    fn(Time)
}
 
 
namespace b {
     export const Time: number = 1000
     export const fn = <T>(arg: T): T => {
        return arg
    }
    fn(Time)
}
 
a.Time
b.Time
```

## 嵌套命名空间

```ts
namespace a {
    export namespace b {
        export class Vue {
            parameters: string
            constructor(parameters: string) {
                this.parameters = parameters
            }
        }
    }
}
 
let v = a.b.Vue
 
new v('1')
```

## 抽离命名空间

```ts
// a.ts
export namespace V {
    export const a = 1
}

// b.ts
import {V} from '../observer/index'
 
console.log(V);
```

// {a:1}

## 简化命名空间

```ts
namespace A  {
    export namespace B {
        export const C = 1
    }
}
 
import X = A.B.C
 
console.log(X);
```

## 合并命名空间

> **重名的命名空间会合并**

![合并](https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/ts1.png)

## 三斜线指令

三斜线指令是包含单个XML标签的单行注释。 注释的内容会做为编译器指令使用。

三斜线指令仅可放在包含它的文件的最顶端。 一个三斜线指令的前面只能出现单行或多行注释，这包括其它的三斜线指令。 如果它们出现在一个语句或声明之后，那么它们会被当做普通的单行注释，并且不具有特殊的涵义。

`/// <reference path="..." />`指令是三斜线指令中最常见的一种。 它用于声明文件间的 依赖。

三斜线引用告诉编译器在编译过程中要引入的额外的文件。

你也可以把它理解能import，它可以告诉编译器在编译过程中要引入的额外的文件

例如a.ts

```ts
namespace A {
    export const fn = () => 'a'
}
```

b.ts

```ts
namespace A {
    export const fn2 = () => 'b'
}
```

index.ts

引入之后直接可以使用变量A

```ts
///<reference path="./index2.ts" />
///<reference path="./index3.ts" />
 
 
console.log(A);
```

声明文件引入

例如，把 `/// <reference types="node" />`引入到声明文件，表明这个文件使用了 @types/node/index.d.ts里面声明的名字； 并且，这个包需要在编译阶段与声明文件一起被包含进来。

仅当在你需要写一个d.ts文件时才使用这个指令。

```ts
///<reference types="node" />
```

注意事项：

如果你在配置文件 配置了`noResolve` 或者自身调用自身文件会报错
