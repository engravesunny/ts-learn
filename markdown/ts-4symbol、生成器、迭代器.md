# Symbol、生成器、迭代器、Set、Map等等

## 一、元组类型

> 元组就是数组的变种

- 元组与集合的不同之处在于，
- 元组中的元素类型可以是不同的，
- 而且数量固定。
- 元组的好处在于可以把多个元素作为一个单元传递。
- 如果一个方法需要返回多个值，可以把这多个值作为元组返回，
- 而不需要创建额外的类来表示。

```ts
let arr: [number, boolean] = [1, false]

let arr1: readonly [number, boolean, undefined] = [1, true, undefined]
```

- 元组类型还可以支持自定义名称和变为可选的
- 元组成员必须全部具有或全部不具有名称。

```ts
let arr2: [x: number, y?: string] = [1]
```

- 应用场景 例如定义excel返回的数据

```ts
let excel: [string, string, number, string][] = [
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
]
```

- **总结**：元组就像是各种类型混合的变形数组而且其元素数量是预先设置好的，但可以设置个别元素为可选元素，**元组成员必须全部具有或全部不具有名称**。

## 二、枚举类型

> 枚举是 C 语言中的一种基本数据类型，用于定义一组具有离散值的常量。，它可以让数据更简洁，更易读。
> 枚举类型通常用于为程序中的一组相关的常量取名字，以便于程序的可读性和维护性。
> 定义一个枚举类型，需要使用 enum 关键字，后面跟着枚举类型的名称，以及用大括号 {} 括起来的一组枚举常量。每个枚举常量可以用一个标识符来表示，也可以为它们指定一个整数值，如果没有指定，那么默认从 0 开始递增。

- 1.数字枚举

```ts
enum Types {
    Red,
    Blue,
    Green
}
```

- 下面代表从1开始递增

```ts
enum Types2 {
    Red = 1,
    Blue,
    Green
}
```

- 2.字符串枚举

> 字符串枚举的概念很简单。 在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化。

```ts
enum Types3 {
    num,
    Red = 'red',
    Blue = 'blue',
    Green = 'green'
}
```

- 由于字符串枚举没有自增长的行为，
- 字符串枚举可以很好的序列化。
- 换句话说，如果你正在调试并且必须要读一个数字枚举的运行时的值，
- 这个值通常是很难读的 - 它并不能表达有用的信息，
- 字符串枚举允许你提供一个运行时有意义的并且可读的值，独立于枚举成员的名字。

- 3.异构枚举

> 混合字符串和数字成员

```ts
enum Types4 {
    No = 'no',
    Yes = 1
}
```

- 4.接口枚举

> 定义一个枚举`Types`定义一个接口`A` 他有一个属性`red` 值为`Types.yyds`
> 声明对象的时候要遵循这个规则

```ts
enum Types5 {
    yyds,
    dddd
}
interface A {
    red: Types5.yyds
}

let obj: A = {
    red: Types5.yyds
}
```

- 5.`const`枚举

- `let`  和 `var` 都是不允许的声明只能使用 `const`
- 大多数情况下，枚举是十分有效的方案
- 然而在某些情况下需求很严格
- 为了避免在额外生成的代码上的开销和额外的非直接的对枚举成员的访问
- 我们可以使用 `const` 枚举。 常量枚举通过在枚举上使用 `const` 修饰符来定义
- `const` 声明的枚举会被编译成常量

```ts
const enum Types6 {
    No = 'no',
    Yes = 1
}
console.log(Types6.No);

// js
// console.log("no" /* Types6.No */);
```

- 普通声明的枚举编译完后是个对象

```ts
enum Types7 {
    No = 'no',
    Yes = 1
}
console.log(Types7.No);

// js
// var Types7;
// (function (Types7) {
//     Types7["No"] = "no";
//     Types7[Types7["Yes"] = 1] = "Yes";
// })(Types7 || (Types7 = {}));
// console.log(Types7.No);
```

- 6.反向映射

```ts
enum Enum {
    fall
}
let a = Enum.fall
console.log(a);  // 0
let namess = Enum[a]

console.log(namess); // fall

// js
// var Enum;
// (function (Enum) {
//     Enum[Enum["fall"] = 0] = "fall";
// })(Enum || (Enum = {}));
// let a = Enum.fall;
// console.log(a); // 0
// let namess = Enum[a];
// console.log(namess); // fall
```

- **总结**：
- 1.枚举类型通常用于为程序中的一组相关的常量取名字，以便于程序的可读性和维护性，默认从 0 开始递增
- 2.字符串枚举允许你提供一个运行时有意义的并且可读的值，独立于枚举成员的名字
- 3.`const`枚举，`const` 声明的枚举会被编译成常量，在某种要求非常苛刻的情况下，可以使用`const`枚举
- 4.反向映射，Enum[Enum["fall"] = 0] = "fall"

## 三、类型别名

- 1.类型推论

> 我声明了一个变量但是没有定义类型,TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论

```ts
let str11 = 'sss' // let str11: string
// str11 = 12333  // 不能将类型“number”分配给类型“string”。
```

> 如果你声明变量没有定义类型也没有赋值这时候TS会推断成`any`类型可以进行任何操作

```ts
let aaaa;  // let aaaa: any

aaaa = 1
aaaa = true
aaaa = '123' // 都不会报错
```

- 2.类型别名

> `type` 关键字（可以给一个类型定义一个名字）多用于复合类型

- 1)定义类型别名

```ts
type str = string

let str222: str = '111'  // let str222: string
```

- 2)定义函数别名

```ts
type fn = () => string

// let strFn:fn = () => 111 // 不能将类型“number”分配给类型“string”
let strFns: fn = () => '111'
```

- 3)定义联合类型别名

```ts
type abc = string | number

let sabc: abc = 123

let nabc: abc = '123'
```

- 4)定义值的别名

```ts
type value = 1 | '213' | true

// let conss:value = '123'  // 不能将类型“"123"”分配给类型“value”
let conss: value = 1
```

- 3.`type` 和 `interface` 的区别

- 1)interface可以继承，type只能通过 & 交叉类型合并
- 2)type可以定义联合类型并可以使用一些操作符，interface不行
- 3)interface遇到重名接口会合并，type遇到重复会报错

- 4.type高级用法

> 左边的值会作为右边值的子类型遵循图中上下的包含关系

```ts
type a1 = 1 extends number ? 1 : 0 //1

type a2 = 1 extends Number ? 1 : 0 //1

type a3 = 1 extends Object ? 1 : 0 //1

type a4 = 1 extends any ? 1 : 0 //1

type a5 = 1 extends unknown ? 1 : 0 //1

type a6 = 1 extends never ? 1 : 0 //0
```

- 层级关系 上包含下

```ts
unknown any
Object 
Number String Boolean
number string boolean
1 'test' true
never
```

> never 类型
> TypeScript 将使用 never 类型来表示不应该存在的状态
> 返回never的函数必须存在无法达到的终点
> 因为必定抛出异常，所以 error 将不会有返回值

```ts
// 因为必定抛出异常，所以 error 将不会有返回值
function error(message: string): never {
    throw new Error(message);
}

// 因为存在死循环，所以 loop 将不会有返回值
function loop(): never {
    while (true) {
    }
}

// never 与 void 的差异

//void类型只是没有返回值 但本身不会出错
function Void(): void {
    console.log();
}

//只会抛出异常没有返回值
function Never(): never {
    throw new Error('aaa')
}

// never 类型的一个应用场景

type A2 = '小满' | '大满' | '超大满' 
 
function isXiaoMan(value:A2) {
   switch (value) {
       case "小满":
           break 
       case "大满":
          break 
       case "超大满":
          break 
       default:
          //是用于场景兜底逻辑
          const error:never = value;
          return error
   }
}
```

## 五、Symbol

> 自ECMAScript 2015起，symbol成为了一种新的原生类型，就像number和string一样。
> symbol类型的值是通过Symbol构造函数创建的。
> 可以传递参做为唯一标识 只支持 string 和 number类型的参数

```ts
let sym1 = Symbol(1)
let sym2 = Symbol(1)
console.log(sym1 === sym2);

console.log(Symbol.for('sym1') === Symbol.for('sym1'));


let objss = {
    [sym1]:1,
    [sym2]:2,
    name:'111'
}

console.log(objss[sym1]);
```

- 1.Symbol的值是唯一的

```ts
const sym3 = Symbol(1)
const sym4 = Symbol(1)
// console.log(sym3 === sym4); // 本身为false 此比较似乎是无意的，因为类型“typeof sym3”和“typeof sym4”没有重叠。
```

- 2.用作对象属性的键

```ts
let sym = Symbol()

let obj_1 = {
    [sym]:'value'
}

console.log(obj_1[sym]);  // 'value'
```

> 使用symbol定义的属性，是不能通过如下方式遍历拿到的

```ts
const symbol1 = Symbol(1)
const symbol2 = Symbol(2)

const obj_2 = {
    [symbol1]:'111',
    [symbol2]:'222',
    age:19,
    sex:1
}

for(let key in obj_2){
    console.log(key)
}
// age
// sex


console.log(Object.keys(obj_2));  // [ 'age', 'sex' ]

console.log(Object.getOwnPropertyNames(obj_2)); // [ 'age', 'sex' ]

console.log(JSON.stringify(obj_2)); // {"age":19,"sex":1}
```

> 如何拿到

```ts
console.log(Object.getOwnPropertySymbols(obj_2)); // [ Symbol(1), Symbol(2) ]
```

> es6 的 Reflect 拿到对象的所有属性

```ts
console.log(Reflect.ownKeys(obj_2));   // [ 'age', 'sex', Symbol(1), Symbol(2) ]
```

## 六、Symbol.iterator 迭代器 和 生成器 for of

> 支持遍历大部分类型迭代器 arr nodeList argumetns set map 等

```ts
let arr_it = [1,2,3,4]

let iterator = arr_it[Symbol.iterator]();


console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: 4, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

> 测试迭代器，定义map，set，实现迭代器原理

```ts
interface Item {
    name:string,
    age:number
}

let array:Array<Item> = [{name:'111',age:11},{name:'222',age:22},{name:'333',age:33},{name:'444',age:44}]


let set:Set<number> = new Set([1,1,1,2,2,2,3,3,3])

console.log(set);  // Set(3) { 1, 2, 3 }

type mapType = number | string

let map:Map<mapType,mapType> = new Map()

map.set('111',11)
map.set('222',22)

console.log(map);  // Map(2) { '111' => 11, '222' => 22 }

console.log(map.get('111'));  // 11

function gen(arr:any):void {
    let it:Iterator<any> = arr[Symbol.iterator]();
    let next:any = { done:false }
    while(!next.done){
        next = it.next()
        if(!next.done){
            console.log(next.value);
            
        }
    }
}

gen(array) 

// { name: '111', age: 11 }
// { name: '222', age: 22 }
// { name: '333', age: 33 }
// { name: '444', age: 44 }

gen(map)

// [ '111', 11 ]
// [ '222', 22 ]

gen(set)

// 1
// 2
// 3
```

> 我们平时开发中不会手动调用iterator 应为 他是有语法糖的就是for of  记住 for of 是不能循环对象的应为对象没有 iterator

```ts
for(let value of map){
    console.log(value); 
}

// [ '111', 11 ]
// [ '222', 22 ]
```

> 数组解构的原理其实也是调用迭代器的

```ts
let [a11,b11,c11] = [1,2,3]
console.log(a11,b11,c11);  // 1 2 3
let a111 = [...[1,2,3]]
console.log(a111);  // [ 1, 2, 3 ]
```

- 以下为这些symbols的列表：
- Symbol.hasInstance
  - 方法，会被instanceof运算符调用。构造器对象用来识别一个对象是否是其实例。
- Symbol.isConcatSpreadable
  - 布尔值，表示当在一个对象上调用Array.prototype.concat时，这个对象的数组元素是否可展开。
- Symbol.iterator
  - 方法，被for-of语句调用。返回对象的默认迭代器。
- Symbol.match
  - 方法，被String.prototype.match调用。正则表达式用来匹配字符串。
- Symbol.replace
  - 方法，被String.prototype.replace调用。正则表达式用来替换字符串中匹配的子串。
- Symbol.search
  - 方法，被String.prototype.search调用。正则表达式返回被匹配部分在字符串中的索引。
- Symbol.species
  - 函数值，为一个构造函数。用来创建派生对象。
- Symbol.split
  - 方法，被String.prototype.split调用。正则表达式来用分割字符串。
- Symbol.toPrimitive
  - 方法，被ToPrimitive抽象操作调用。把对象转换为相应的原始值。
- Symbol.toStringTag
  - 方法，被内置方法Object.prototype.toString调用。返回创建对象时默认的字符串描述。
- Symbol.unscopables
  - 对象，它自己拥有的属性会被with作用域排除在外。
