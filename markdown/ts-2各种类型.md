# TS 第二天 联合类型 / 交叉类型 / 类型断言

## 一、联合类型

> 例如我们的手机号通常是11位数字类型，而这时产品需要支持座机号 也就是字符串类型
> 所以我们就可以使用联合类型支持座机号字符串

```typescript
let myPhone:number | string = 13888888888
myPhone = '010-8200-00000'  
// myPhone = true // 报错， 不能将类型boolean分配给类型string|number
```

- **总结**：在考虑多类型变量时可以使用`|`符号给变量约束多种类型

## 二、交叉类型

> 多种类型的集合，联合对象将具有所联合类型的所用成员

```typescript
interface People{
    name:string,
    age:number
}
interface Man{
    sex:number
}
const me = (man:People & Man) => {
    console.log(me.name)
    console.log(me.age)
    console.log(me.sex)
}
me({age:18,sex:1,name:'me'}) // 18 1 me
// me({name:'me',age:11}) // 报错， 类型 "{ name: string; age: number; }" 中缺少属性 "sex"，但类型 "Man" 中需要该属性
```

- **总结**：`&`与上面的`|`就像是`与`和`或`的关系，`|`是任意一个，`&`则是每个都要有

## 三、类型断言

> 语法：值 as 类型 或者 <类型>值 - - `value as string` `<string>value`

```typescript
interface A {
    run:string
}
interface B {
    build:string
}
const fn = (a:A|B) => {
    return a.run
}
// 报错，类型“B”上不存在属性“run”
const fn = (a:A|B) =>{
    return (a as A).run
}
// 可以使用类型断言来推断他传入的是A接口的值
```

- **注意**：**类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误**

> as const
> 基本类型

```typescript
const name = 'qqq'
name = 'aaa' // 报错，无法修改
```

```typescript
let name = 'qqq' as const
name = 'aaa' // 报错，无法修改
```

> 数组

```typescript
let a1 = [10,20] as const;
const a2 = [10,20];

a1.push(30) // 报错，此时已经断言字面量为[10,20]数据无法做任何和修改
// 报错为 类型“readonly [10, 20]”上不存在属性“push”
a2.push(30) // 通过，没有修改指针
```

- 类型断言不具有影响力

> 下面的例子中，将something段艳伟boolean虽然可以编译通过，但不会影响something输出的值，编译过程中会删除类型断言

```typescript
function toBoolean(something: any):boolean {
    return something as boolean;
}
toBoolean(1) // 返回值为1
```

- **总结**：类型断言就像是在告诉ts，我认为这个变量会是什么类型，你不用管，但ts会相信我们所说的话，但这个变量本来的值并不会因为类型断言而改变
- **注意**：无论是断言为常量的还是定义为常量的基础类型变量，其值都不可改变，但定义为const的数组可以用方法改变内容，而断言为const的数组则不行

## 四、内置对象

> ECMAScript的内置对象
> `Boolean`、`Number`、`String`、`RegExp`、`Date`、`Error`

```typescript
let nb:Boolean = new Boolean(1)
console.log(nb);
let nn:Number = new Number(true)
console.log(nn);
let s:String = new String('11111')
console.log(s);
let nd:Date = new Date()
console.log(nd);
let nr:RegExp = /^1/
console.log(nr);
let ne:Error = new Error('error')
console.log(ne);
/**
 * 
 * [Boolean: true] [Number: 1] [String: '11111'] 2023-03-27T11:51:45.029Z /^1/ Error: error...
 */

```

> `DOM`和`BOM`的内置对象
> Document,HTMLElement,Event,NodeList等

```typescript
let body:HTMLElement = document.body
let allDiv: NodeList = document.querySelectorAll('div')
let div:HTMLElement = document.querySelector('div') as HTMLDivElement
document.addEventListener('click', (e:MouseEvent) =>{})

// dom元素的映射表
interface HTMLElementTagNameMap {
    "a": HTMLAnchorElement;
    "abbr": HTMLElement;
    "address": HTMLElement;
    "applet": HTMLAppletElement;
    "area": HTMLAreaElement;
    "article": HTMLElement;
    "aside": HTMLElement;
    "audio": HTMLAudioElement;
    "b": HTMLElement;
    "base": HTMLBaseElement;
    "bdi": HTMLElement;
    "bdo": HTMLElement;
    "blockquote": HTMLQuoteElement;
    "body": HTMLBodyElement;
    "br": HTMLBRElement;
    "button": HTMLButtonElement;
    "canvas": HTMLCanvasElement;
    "caption": HTMLTableCaptionElement;
    "cite": HTMLElement;
    "code": HTMLElement;
    "col": HTMLTableColElement;
    "colgroup": HTMLTableColElement;
    "data": HTMLDataElement;
    "datalist": HTMLDataListElement;
    "dd": HTMLElement;
    "del": HTMLModElement;
    "details": HTMLDetailsElement;
    "dfn": HTMLElement;
    "dialog": HTMLDialogElement;
    "dir": HTMLDirectoryElement;
    "div": HTMLDivElement;
    "dl": HTMLDListElement;
    "dt": HTMLElement;
    "em": HTMLElement;
    "embed": HTMLEmbedElement;
    "fieldset": HTMLFieldSetElement;
    "figcaption": HTMLElement;
    "figure": HTMLElement;
    "font": HTMLFontElement;
    "footer": HTMLElement;
    "form": HTMLFormElement;
    "frame": HTMLFrameElement;
    "frameset": HTMLFrameSetElement;
    "h1": HTMLHeadingElement;
    "h2": HTMLHeadingElement;
    "h3": HTMLHeadingElement;
    "h4": HTMLHeadingElement;
    "h5": HTMLHeadingElement;
    "h6": HTMLHeadingElement;
    "head": HTMLHeadElement;
    "header": HTMLElement;
    "hgroup": HTMLElement;
    "hr": HTMLHRElement;
    "html": HTMLHtmlElement;
    "i": HTMLElement;
    "iframe": HTMLIFrameElement;
    "img": HTMLImageElement;
    "input": HTMLInputElement;
    "ins": HTMLModElement;
    "kbd": HTMLElement;
    "label": HTMLLabelElement;
    "legend": HTMLLegendElement;
    "li": HTMLLIElement;
    "link": HTMLLinkElement;
    "main": HTMLElement;
    "map": HTMLMapElement;
    "mark": HTMLElement;
    "marquee": HTMLMarqueeElement;
    "menu": HTMLMenuElement;
    "meta": HTMLMetaElement;
    "meter": HTMLMeterElement;
    "nav": HTMLElement;
    "noscript": HTMLElement;
    "object": HTMLObjectElement;
    "ol": HTMLOListElement;
    "optgroup": HTMLOptGroupElement;
    "option": HTMLOptionElement;
    "output": HTMLOutputElement;
    "p": HTMLParagraphElement;
    "param": HTMLParamElement;
    "picture": HTMLPictureElement;
    "pre": HTMLPreElement;
    "progress": HTMLProgressElement;
    "q": HTMLQuoteElement;
    "rp": HTMLElement;
    "rt": HTMLElement;
    "ruby": HTMLElement;
    "s": HTMLElement;
    "samp": HTMLElement;
    "script": HTMLScriptElement;
    "section": HTMLElement;
    "select": HTMLSelectElement;
    "slot": HTMLSlotElement;
    "small": HTMLElement;
    "source": HTMLSourceElement;
    "span": HTMLSpanElement;
    "strong": HTMLElement;
    "style": HTMLStyleElement;
    "sub": HTMLElement;
    "summary": HTMLElement;
    "sup": HTMLElement;
    "table": HTMLTableElement;
    "tbody": HTMLTableSectionElement;
    "td": HTMLTableDataCellElement;
    "template": HTMLTemplateElement;
    "textarea": HTMLTextAreaElement;
    "tfoot": HTMLTableSectionElement;
    "th": HTMLTableHeaderCellElement;
    "thead": HTMLTableSectionElement;
    "time": HTMLTimeElement;
    "title": HTMLTitleElement;
    "tr": HTMLTableRowElement;
    "track": HTMLTrackElement;
    "u": HTMLElement;
    "ul": HTMLUListElement;
    "var": HTMLElement;
    "video": HTMLVideoElement;
    "wbr": HTMLElement;
}

```

> 定义Promise

- **如果不指定返回类型，TS是推断不出返回的是什么类型的**

![返回类型](https://img-blog.csdnimg.cn/1027f6bee3a84aa58ea4d349a50f48e0.png)

- **指定返回的类型**

![指定类型](https://img-blog.csdnimg.cn/b4e56fb2426e4502a043d43642312cd8.png)

- **函数定义返回promise 语法规则:`Promise<T>` `类型`**

![语法规则](https://img-blog.csdnimg.cn/68d399594565403cb757e7000b1e9a4b.png)

```typescript
function promise():Promise<number> {
    return new Promise<number>((resolve,reject)=>{resolve(1)})
}
promise().then(res=>{
    console.log(res)
}) // 1
```
