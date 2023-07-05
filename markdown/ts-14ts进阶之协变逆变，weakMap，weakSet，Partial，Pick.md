# TS进阶之类型兼容，weakMap，weakSet，Partial，Pick

## 类型兼容

> 所谓的类型兼容性，就是用于确定一个类型是否能赋值给其他的类型。typeScript中的类型兼容性是基于结构类型的（也就是形状），如果A要兼容B 那么A至少具有B相同的属性。

- 1. 协变 也可以叫鸭子类型

> 什么是鸭子类型？
> &nbsp;
> 一只鸟 走路像鸭子 ，游泳也像，做什么都像，那么这只鸟就可以成为鸭子类型。

```ts
// 协变
interface AAA {
    name:string,
    age:number
}

interface BBB {
    name:string,
    age:number,
    sex:number
}

let aaa:AAA = {
    name:'小飞',
    age:18
}

let baa:BBB = {
    name:'小强',
    age:20,
    sex:1
}

// baa = aaa // 报错，类型 "AAA" 中缺少属性 "sex"，但类型 "BBB" 中需要该属性

aaa = baa // 可以赋值
```

- `aaa` 为主类型， `baa` 为子类型，子类型必须要完全覆盖主类型才可以赋值，可以多但不能少

- 2. 逆变

> 逆变一般发生于函数的参数上面

```ts
// 逆变

let abb = (params:AAA) => {

}

let bbb = (params:BBB) => {

}


// abb = bbb // 报错， 不能将类型“(params: BBB) => void”分配给类型“(params: AAA) => void”。
// 参数“params”和“params” 的类型不兼容。
//   类型 "AAA" 中缺少属性 "sex"，但类型 "BBB" 中需要该属性

bbb = abb // 可以赋值，
```

> 道理与协变一样 调用`bbb`相当于调用`abb`，要把`bbb`的参数`BBB`类型赋值到`abb`的`AAA`类型，此时`AAA`类型还是主类型，`BBB`类型还是子类型，子类型要完全覆盖主类型才可以进行赋值操作

- 3. 双向协变

> 双向协变 即为 允许`abb = bbb`的操作 在ts2.0之前可以 但出于安全考虑 ts2.0 之后会报错
> &nbsp;
> 在`tsconfig`中将`strictFunctionTypes`设为`true`，则可以进行双向协变操作

## Set，Map，weakMap，weakSet

> 在es5的时候常用的Array object ，在es6又新增了两个类型，Set和Map，类似于数组和对象

- 1. Set定义与方法

> 集合是由一组无序且唯一(即不能重复)的项组成的，可以想象成集合是一个既没有重复元素，也没有顺序概念的数组

```ts
let set1:Set<number> = new Set([1,2,3,4,4,4,4])

set1.add(22)

// set1.forEach 遍历
// set1.delete() 删除
// set1.has() 查询
// set1.keys() 返回一个迭代器对象，该迭代器包含Set对象中每个元素的键（与值相同）。
// set1.clear()
// set1.size()
// set1.values() 获取Set对象中的所有值
```

- 2.Map定义与方法

> 它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键，是一种更完善的 `Hash` 结构实现。如果你需要“键值对”的数据结构，`Map` 比 `Object` 更合适

```ts
let map1:Map<string,any> = new Map()

map1.set('111',111)
map1.set('222',222)
map1.set('333',333)
map1.set('444',444)
map1.set('555',555)


// map1.clear()
// map1.delete()
// map1.forEach() 遍历
// map1.get()
// map1.has()
// map1.set() 添加键值对

// map1.keys() Map.keys() 返回的是一个迭代器，而不是一个数组 可以使用for of 遍历

// console.log(map1.keys());

for(let key of set1.keys()){
    console.log(key)
}
```

- 3.WeakSet 和 WeakMap

> Weak 在英语的意思就是弱的意思，weakSet 和 weakMap 的键都是弱引用，不会被计入垃圾回收
> &nbsp;
> 首先obj引用了这个对象 + 1，aahph也引用了 + 1，wmap也引用了，但是不会  + 1，应为他是弱引用，不会计入垃圾回收，因此 obj 和 aahph 释放了该引用 weakMap 也会随着消失的，但是有个问题你会发现控制台能输出，值是取不到的，应为V8的GC回收是需要一定时间的，你可以延长到500ms看一看，并且为了避免这个问题不允许读取键值，也不允许遍历，同理weakSet 也一样

```ts
let obj:any = {name:'小满zs'} //1
let aahph:any = obj //2
let wmap:WeakMap<object,string> = new WeakMap()
 
wmap.set(obj,'爱安徽潘慧') //2 他的键是弱引用不会计数的
 
obj = null // -1
aahph = null;//-1
//v8 GC 不稳定 最少200ms
 
setTimeout(()=>{
    console.log(wmap)
},500)
```

- weakMap,weakSet详细内容
- weakMap weakSet  弱引用
- WeakMap 和 WeakSet 是 JavaScript 的两个内置对象，它们是 Map 和 Set 的弱引用版本。它们之所以被称为弱引用，是因为它们允许其键和值被垃圾回收，即使它们仍然存在于 WeakMap 或 WeakSet 中。
- 下面是 WeakMap 和 WeakSet 的特性：
  - 1.WeakMap 和 WeakSet 只允许使用对象作为键或值。原始值（如字符串、数字和布尔值）不能被用作键或值。
  - 2.WeakMap 和 WeakSet 中的键和值是弱引用的，这意味着如果没有其他引用指向它们，它们将被垃圾回收。
  - 3.WeakMap 中的键是不可枚举的，因此无法使用 for...of 或 forEach 方法进行遍历。
  - 4.WeakMap 和 WeakSet 没有 size 属性，也不能使用 clear() 方法。
  - 5.WeakMap 和 WeakSet 不能被迭代，因此无法使用 keys()、values() 和 entries() 方法。
  - 6.WeakMap 和 WeakSet 无法被序列化为 JSON。

> WeakMap 和 WeakSet 通常用于需要存储临时数据的场景，
> 例如缓存或事件处理程序，因为它们可以自动释放占用的内存。
> 但是，由于它们的特殊性质，它们可能不适合所有情况，
> 因此需要根据实际需求进行选择。

## Partial Pick

- 1.Particl (变为可选)

> 源码

```ts
/**
 * Make all properties in T optional
  将T中的所有属性设置为可选
 */
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```

- keyof 是干什么的？
- in 是干什么的？
- ? 是将该属性变为可选属性
- T[P] 是干什么的？

1. keyof我们讲过很多遍了 将一个接口对象的全部属性取出来变成联合类型
2. in 我们可以理解成for in P 就是key 遍历  keyof T  就是联合类型的每一项
3. ？这个操作就是将每一个属性变成可选项
4. T[P] 索引访问操作符，与 JavaScript 种访问属性值的操作类似

```ts
type personsss = {
    name:string,
    age:number
}

type personaaa = Partial<personsss>

// 相当于
// type personaaa = {
//     name?: string | undefined;
//     age?: number | undefined;
// }

// Partial 源码
// type Partial<T> = {
//     [P in keyof T]?: T[P];
// };

const personxxx:Partial<personsss> = {
    
}
```

- 2.Pick（筛选（或过滤））

> 从类型定义T的属性中，选取指定一组属性，返回一个新的类型定义。

```ts
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

> 类似于筛选或过率

```ts
// Pick

type name222 = Pick<personsss,'name'|'age'>

// 相当于 筛选（或过滤）
// type name222 = {
//     name: string;
//     age: number;
// }

// pick源码
// type Pick<T, K extends keyof T> = {
//     [P in K]: T[P];
// };
```
