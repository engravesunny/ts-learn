"use strict";
// // 一、 基础类型
// // 1.字符串类型 string
// let a:string = 'aaa'
// let b:string = `${a}bbb`   // 模板字符串
// // 2.数字类型 number
// let num:number = 111
// let num2:number = NaN   // NaN，Infinity也属于number
// let infi:number = -Infinity
// let decimal: number = 6;//十进制
// let hex: number = 0xf00d;//十六进制
// let binary: number = 0b1010;//二进制
// let octal: number = 0o744;//八进制s
// // 3.布尔类型 (new Boolean()返回的是Boolean对象,不是boolean值)
// // let bool:boolean = new Boolean()  这样会报错，new Boolean() 返回的是Boolean对象
// // 需要改为
// let bool:Boolean = new Boolean(1)  // [Boolean: true]
// // console.log(bool);
// // 4.空值类型
// // let v1:void = null // 严格模式下会报错，void类型不能赋值为null
// let v2:void = undefined
// // 也可以定义没有返回值的函数
// let fn = ():void => {return } 
// // 或者
// function fnx():void{
//     // ...
//     return
// }
// // 5.null和undefined类型
// let u:undefined = undefined
// let n:null = null
// //undenfined类型的变量可以赋值给string类型的变量
// let test1:void = undefined
// let numm:number = 111
// // num = test1  // 报错，void类型不可赋值给其他类型
// let test2:null = null
// let test3:undefined = undefined
// // numm = test2 // 报错，不能将类型“null”分配给类型“number”
// // numm = test3 // 报错，不能将类型“undefined”分配给类型“number”
// // 二、 any和unknown
// // nodejs环境执行ts
// // npm i @types/node --save-dev
// // npm i ts-node --g
// // 1.any
// // 没有强制限定哪种类型，随时切换类型都可以 我们可以对 any 进行任何操作，不需要检查类型
// let anys:any = 123
// anys = '123'
// anys = true
// // 没有指定类型的变量默认为any类型
// let any2;
// any2 = true
// any2 = 123
// any2 = '123'
// // 弊端如果使用any 就失去了TS类型检测的作用
// // 2.unknow
// // unknow 可以定义任何类型的值
// let value:unknown;
// value = true;
// value = 1234
// value = '1234'
// value = []
// value = {}
// value = null
// value = undefined
// value = Symbol('type')
// // unknown不能作为子类型只能作为父类型
// let names:unknown = '123'
// // let names2:string = names // 报错，不能将类型“unknown”分配给类型“string”
// // any可以作为子类型，也可以作为父类型
// let name3:any = '123'
// let name4:string = name3
// // unknown的可服赋值对象只有unknow和any
// let bbb:unknown = '123'
// let aaa:any = bbb
// // any类型的对象，在获取不存在的属性时不会报错
// let obj:any = {a:1}
// obj.b  // 不报错
// // unknown类型的对象 不能调用属性和方法
// let obj2:unknown = {a:111,fn:():number=>111}
// // obj2.a // 报错
// // obj2.fn() // 报错
// // obj2.b // 报错
// // 三、 接口和对象类型
// // 在typescript中定义对象的方式使用关键字interface（接口）
// interface Person{
//     a:number,
//     b:string
// }
// // 这样写会报错，使用接口定义对象时不能多属性也不能少属性
// // 必须与所使用的接口保持一致
// // const person:Person = {
// //     a:222
// // }
// // 正确写法
// const person:Person = {
//     a:222,
//     b:'222'
// }
// // 重名interface，会自动合并
// interface Accc{
//     a:number
// }
// interface Accc{
//     b:string
// }
// const accc:Accc = {
//     a:222,
//     b:'222'
// }
// // 继承
// interface Bccc extends Accc{
//     c:boolean
// }
// const bccc:Bccc = {
//     a:222,
//     b:'222',
//     c:true
// }
// // 对于可选的属性可以在定义接口时使用 ?操作符
// interface Cccc{
//     ac?:boolean,
//     bc:string
// }
// const cccc:Cccc = {
//     bc:'ccc'
// }
// // 对于要给要在实例化接口时添加接口属性以外的属性，可以在定义接口时使用 任意属性 [propName: string]
// interface Dccc{
//     a:string,
//     b:number,
//     [propName:string]:any
// }
// const dccc:Dccc = {
//     a:'a',
//     b:222,
//     c:true
// }
// // 但要注意，在使用任意属性后 该接口的所有确定属性和可选属性都必须为任意属性的类型的子集
// // 只读属性
// // readonly 不可以被赋值，只可以读取
// interface Eccc{
//     readonly a:string,
//     b:boolean
// }
// const eccc:Eccc = {
//     a:'123',
//     b:true
// }
// // eccc.a = '1233' // 报错，无法为“a”赋值，因为它是只读属性。
// // 添加函数
// interface Fccc {
//     a:number,
//     b?:string,
//     fn:(a:string)=>number
// }
// const fccc:Fccc = {
//     a:111,
//     fn:(a:string)=>{
//         return Number(a)
//     }
// }
// // 四、数组类型
// // 定义方式
// // 1.类型[]
// let arra:number[] = [213]
// // let arrb:number[] = [1,2,3,4,'22'] // 报错，不能将类型“string”分配给类型“number”。
// // 使用操作方法添加也会报错
// let arrb:number[] = [1,2,3,]
// // arrb.push('1') // 报错，类型“string”的参数不能赋给类型“number”的参数。
// // 2.数组泛型 Array<类型>
// let arrc:Array<string> = ['1','2']
// // 3.用接口表示数组 一般用来描述类数组
// interface NumberArray{
//     [index:number]:number
// }
// let arrd:NumberArray = [1,2,3,4,5]
// // console.log(arrd[3]); // 4
// // 4.多维数组
// let data:number[][] = [[1,2],[1,2]]
// // arguments类数组
// function Arr1(...args:any): void {
//     console.log(arguments)
//     //错误的arguments 是类数组不能这样定义
//     // let arr:number[] = arguments
// }
// // Arr1(111, 222, 333)
// function Arr2(...args:any): void {
//     console.log(arguments) 
//     //ts内置对象IArguments 定义
//     let arr:IArguments = arguments
// }
// // Arr2(111, 222, 333)
// //其中 IArguments 是 TypeScript 中定义好了的类型，它实际上就是：
// interface IArguments {
//     [index: number]: any;
//     length: number;
//     callee: Function;
// }
// // 五、函数扩展
// // 函数类型
// //注意，参数不能多传，也不能少传 必须按照约定的类型来
// const fn1 = (arr:number[],name:string):string => {
//     return name
// }
// fn1([1,2,3],'张三')
// // 可选参数
// // 通过?表示改参数为可选参数
// // 注意：必选参数不能位于可选参数后。
// const fn2 = (arr:number[],name?:string):number[] => {
//     return arr
// }
// fn2([1,2,3,4])
// // fn2() // 报错，应有 1-2 个参数，但获得 0 个。ts(2554)
// // 参数默认值
// const fn3 = (arr:number[] = [1,2,3,4]):number[] => {
//     return arr
// }
// fn3()
// // 接口定义参数
// interface Fnccc {
//     (num1:number,str1:string):number
// }
// const fn4:Fnccc = (num:number,str:string):number => 123
// interface User {
//     name:string,
//     age:number
// }
// const getUserInfo = (user:User):User=>{
//     return user
// }
// // 函数重载
// function fn5(params: number): void 
// function fn5(params: string, params2: number): void
// function fn5(params: any, params2?: any): void {
//     console.log(params)
//     console.log(params2)
// }
// fn5(123)
// fn5('123',456)
// // -------------------------------------------------------------------------------------------------------
// // 03-27
// // 一、联合类型
// // 例如我们的手机号通常是11位数字类型，而这时产品需要支持座机号 也就是字符串类型
// // 所以我们就可以使用联合类型支持座机号字符串
// let myPhone:number | string = 13888888888
// myPhone = '010-8200-0000'
// // myPhone = true // 报错，不能将类型“boolean”分配给类型“string | number”
// // 二、交叉类型
// // 多种类型的集合，联合对象将具有所联合类型的所有成员
// interface People{
//     name:string,
//     age:number
// }
// interface Man{
//     sex:number
// }
// const me = (man:People & Man) => {
//     console.log(man.name);
//     console.log(man.age);
//     console.log(man.sex);
// }
// me({age:18,name:'me',sex:1}) //me 18 1
// // me({name:'me',age:11}) // 报错， 类型 "{ name: string; age: number; }" 中缺少属性 "sex"，但类型 "Man" 中需要该属性
// // 三、类型断言
// // 语法： 值 as 类型 或者 <类型>值 value as string <string>value
// interface A {
//     run:string
// }
// interface B {
//     build:string
// }
// // const fnaaaa = (aaaa: A | B):string => {
// //     return aaaa.run
// // }
// // 报错，类型“B”上不存在属性“run”
// const fnaaaa = (aaaa: A | B):string => {
//     return (aaaa as A).run
// }
// // 可以使用类型断言来推断他传入的是A接口的值
// // 需要注意的是，类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误
// // as const 
// const names_aaa = '小满'
// // names_aaa = 'aa' //无法修改
// let names2_aaaa = '小满' as const
// // names2_aaaa = 'aa' //无法修改
// // 数组
// let a1 = [10, 20] as const;
// const a2 = [10, 20];
// // a1.unshift(30); // 错误，此时已经断言字面量为[10, 20],数据无法做任何修改, 类型“readonly [10, 20]”上不存在属性“unshift”
// a2.unshift(30); // 通过，没有修改指针
// // 类型断言是不具有影响力的
// // 在下面的例子中，将 something 断言为 boolean 虽然可以通过编译，但是并没有什么用 并不会影响结果, 因为编译过程中会删除类型断言
// function toBoolean(something: any): boolean {
//     return something as boolean;
// }
// // toBoolean(1);
// // 返回值为 1
// // 四、内置对象
// // JavaScript 中有很多内置对象，它们可以直接在 TypeScript 中当做定义好了的类型
// // ECMAScript 的内置对象
// // Boolean、Number、string、RegExp、Date、Error
// console.log('----------------------------------------------------------');
// let nb:Boolean = new Boolean(1)
// console.log(nb);
// let nn:Number = new Number(true)
// console.log(nn);
// let s:String = new String('11111')
// console.log(s);
// let nd:Date = new Date()
// console.log(nd);
// let nr:RegExp = /^1/
// console.log(nr);
// // let ne:Error = new Error('error')
// // console.log(ne);
// /**
//  * 
//  * [Boolean: true] [Number: 1] [String: '11111'] 2023-03-27T11:51:45.029Z /^1/ Error: error...
//  */
// // DOM 和 BOM 的内置对象
// // Document、HTMLElement、Event、NodeList 等
// // let body: HTMLElement = document.body;
// // let allDiv: NodeList = document.querySelectorAll('div');
// // //读取div 这种需要类型断言 或者加个判断应为读不到返回null
// // let div:HTMLElement = document.querySelector('div') as HTMLDivElement
// // document.addEventListener('click', function (e: MouseEvent) {
// // });
// //dom元素的映射表
// interface HTMLElementTagNameMap {
//     "a": HTMLAnchorElement;
//     "abbr": HTMLElement;
//     "address": HTMLElement;
//     "area": HTMLAreaElement;
//     "article": HTMLElement;
//     "aside": HTMLElement;
//     "audio": HTMLAudioElement;
//     "b": HTMLElement;
//     "base": HTMLBaseElement;
//     "bdi": HTMLElement;
//     "bdo": HTMLElement;
//     "blockquote": HTMLQuoteElement;
//     "body": HTMLBodyElement;
//     "br": HTMLBRElement;
//     "button": HTMLButtonElement;
//     "canvas": HTMLCanvasElement;
//     "caption": HTMLTableCaptionElement;
//     "cite": HTMLElement;
//     "code": HTMLElement;
//     "col": HTMLTableColElement;
//     "colgroup": HTMLTableColElement;
//     "data": HTMLDataElement;
//     "datalist": HTMLDataListElement;
//     "dd": HTMLElement;
//     "del": HTMLModElement;
//     "details": HTMLDetailsElement;
//     "dfn": HTMLElement;
//     "dialog": HTMLDialogElement;
//     "dir": HTMLDirectoryElement;
//     "div": HTMLDivElement;
//     "dl": HTMLDListElement;
//     "dt": HTMLElement;
//     "em": HTMLElement;
//     "embed": HTMLEmbedElement;
//     "fieldset": HTMLFieldSetElement;
//     "figcaption": HTMLElement;
//     "figure": HTMLElement;
//     "font": HTMLFontElement;
//     "footer": HTMLElement;
//     "form": HTMLFormElement;
//     "frame": HTMLFrameElement;
//     "frameset": HTMLFrameSetElement;
//     "h1": HTMLHeadingElement;
//     "h2": HTMLHeadingElement;
//     "h3": HTMLHeadingElement;
//     "h4": HTMLHeadingElement;
//     "h5": HTMLHeadingElement;
//     "h6": HTMLHeadingElement;
//     "head": HTMLHeadElement;
//     "header": HTMLElement;
//     "hgroup": HTMLElement;
//     "hr": HTMLHRElement;
//     "html": HTMLHtmlElement;
//     "i": HTMLElement;
//     "iframe": HTMLIFrameElement;
//     "img": HTMLImageElement;
//     "input": HTMLInputElement;
//     "ins": HTMLModElement;
//     "kbd": HTMLElement;
//     "label": HTMLLabelElement;
//     "legend": HTMLLegendElement;
//     "li": HTMLLIElement;
//     "link": HTMLLinkElement;
//     "main": HTMLElement;
//     "map": HTMLMapElement;
//     "mark": HTMLElement;
//     "marquee": HTMLMarqueeElement;
//     "menu": HTMLMenuElement;
//     "meta": HTMLMetaElement;
//     "meter": HTMLMeterElement;
//     "nav": HTMLElement;
//     "noscript": HTMLElement;
//     "object": HTMLObjectElement;
//     "ol": HTMLOListElement;
//     "optgroup": HTMLOptGroupElement;
//     "option": HTMLOptionElement;
//     "output": HTMLOutputElement;
//     "p": HTMLParagraphElement;
//     "param": HTMLParamElement;
//     "picture": HTMLPictureElement;
//     "pre": HTMLPreElement;
//     "progress": HTMLProgressElement;
//     "q": HTMLQuoteElement;
//     "rp": HTMLElement;
//     "rt": HTMLElement;
//     "ruby": HTMLElement;
//     "s": HTMLElement;
//     "samp": HTMLElement;
//     "script": HTMLScriptElement;
//     "section": HTMLElement;
//     "select": HTMLSelectElement;
//     "slot": HTMLSlotElement;
//     "small": HTMLElement;
//     "source": HTMLSourceElement;
//     "span": HTMLSpanElement;
//     "strong": HTMLElement;
//     "style": HTMLStyleElement;
//     "sub": HTMLElement;
//     "summary": HTMLElement;
//     "sup": HTMLElement;
//     "table": HTMLTableElement;
//     "tbody": HTMLTableSectionElement;
//     "td": HTMLTableDataCellElement;
//     "template": HTMLTemplateElement;
//     "textarea": HTMLTextAreaElement;
//     "tfoot": HTMLTableSectionElement;
//     "th": HTMLTableHeaderCellElement;
//     "thead": HTMLTableSectionElement;
//     "time": HTMLTimeElement;
//     "title": HTMLTitleElement;
//     "tr": HTMLTableRowElement;
//     "track": HTMLTrackElement;
//     "u": HTMLElement;
//     "ul": HTMLUListElement;
//     "var": HTMLElement;
//     "video": HTMLVideoElement;
//     "wbr": HTMLElement;
// }
// // 定义Promise
// // 如果我们不指定返回的类型TS是推断不出来返回的是什么类型
// // https://img-blog.csdnimg.cn/1027f6bee3a84aa58ea4d349a50f48e0.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAcXExMTk1NTY2MzEz,size_20,color_FFFFFF,t_70,g_se,x_16
// // 指定返回的类型
// // https://img-blog.csdnimg.cn/b4e56fb2426e4502a043d43642312cd8.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAcXExMTk1NTY2MzEz,size_20,color_FFFFFF,t_70,g_se,x_16
// // 函数定义返回promise 语法规则:Promise<T> 类型
// // https://img-blog.csdnimg.cn/68d399594565403cb757e7000b1e9a4b.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAcXExMTk1NTY2MzEz,size_20,color_FFFFFF,t_70,g_se,x_16
// function promise():Promise<number>{
//     return new Promise<number>((resolve,reject)=>{
//         resolve(1)
//     })
//  }
//  promise().then(res=>{
//      console.log(res)
//  })
// 元祖类型
// 元组就是数组的变种
// 元组与集合的不同之处在于，
// 元组中的元素类型可以是不同的，
// 而且数量固定。
// 元组的好处在于可以把多个元素作为一个单元传递。
// 如果一个方法需要返回多个值，可以把这多个值作为元组返回，
// 而不需要创建额外的类来表示。
let arr = [1, false];
let arr1 = [1, true, undefined];
// 元组类型还可以支持自定义名称和变为可选的
// 元组成员必须全部具有或全部不具有名称。
let arr2 = [1];
// 应用场景 例如定义excel返回的数据
let excel = [
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
];
// 枚举类型
// 1.数字枚举
// 默认从零开始逐渐加1递增
var Types;
(function (Types) {
    Types[Types["Red"] = 0] = "Red";
    Types[Types["Blue"] = 1] = "Blue";
    Types[Types["Green"] = 2] = "Green";
})(Types || (Types = {}));
// 下面代表从1开始递增
var Types2;
(function (Types2) {
    Types2[Types2["Red"] = 1] = "Red";
    Types2[Types2["Blue"] = 2] = "Blue";
    Types2[Types2["Green"] = 3] = "Green";
})(Types2 || (Types2 = {}));
// 2.字符串枚举
// 字符串枚举的概念很简单。 在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化。
var Types3;
(function (Types3) {
    Types3[Types3["num"] = 0] = "num";
    Types3["Red"] = "red";
    Types3["Blue"] = "blue";
    Types3["Green"] = "green";
})(Types3 || (Types3 = {}));
// 由于字符串枚举没有自增长的行为，
// 字符串枚举可以很好的序列化。 
// 换句话说，如果你正在调试并且必须要读一个数字枚举的运行时的值，
// 这个值通常是很难读的 - 它并不能表达有用的信息，
// 字符串枚举允许你提供一个运行时有意义的并且可读的值，独立于枚举成员的名字。
// 3.异构枚举
// 美居客一混合字符串和数字成员
var Types4;
(function (Types4) {
    Types4["No"] = "no";
    Types4[Types4["Yes"] = 1] = "Yes";
})(Types4 || (Types4 = {}));
// 接口枚举
// 定义一个枚举Types 定义一个接口A 他有一个属性red 值为Types.yyds
// 声明对象的时候要遵循这个规则
var Types5;
(function (Types5) {
    Types5[Types5["yyds"] = 0] = "yyds";
    Types5[Types5["dddd"] = 1] = "dddd";
})(Types5 || (Types5 = {}));
let obj = {
    red: Types5.yyds
};
console.log("no" /* Types6.No */);
// js
console.log("no" /* Types6.No */);
// 普通声明的枚举编译完后是个对象
var Types7;
(function (Types7) {
    Types7["No"] = "no";
    Types7[Types7["Yes"] = 1] = "Yes";
})(Types7 || (Types7 = {}));
console.log(Types7.No);
// 6.反向映射
var Enum;
(function (Enum) {
    Enum[Enum["fall"] = 0] = "fall";
})(Enum || (Enum = {}));
let a = Enum.fall;
console.log(a); // 0
let namess = Enum[a];
console.log(namess); // fall
