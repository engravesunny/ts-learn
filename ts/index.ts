// 一、 基础类型


// 1.字符串类型 string
let a:string = 'aaa'
let b:string = `${a}bbb`   // 模板字符串

// 2.数字类型 number
let num:number = 111
let num2:number = NaN   // NaN，Infinity也属于number
let infi:number = -Infinity
let decimal: number = 6;//十进制
let hex: number = 0xf00d;//十六进制
let binary: number = 0b1010;//二进制
let octal: number = 0o744;//八进制s

// 3.布尔类型 (new Boolean()返回的是Boolean对象,不是boolean值)

// let bool:boolean = new Boolean()  这样会报错，new Boolean() 返回的是Boolean对象

// 需要改为

let bool:Boolean = new Boolean(1)  // [Boolean: true]

// console.log(bool);

// 4.空值类型

// let v1:void = null // 严格模式下会报错，void类型不能赋值为null
let v2:void = undefined
// 也可以定义没有返回值的函数

let fn = ():void => {return } 
// 或者
function fnx():void{
    // ...
    return
}


// 5.null和undefined类型
let u:undefined = undefined
let n:null = null

//undenfined类型的变量可以赋值给string类型的变量

let test1:void = undefined
let numm:number = 111

// num = test1  // 报错，void类型不可赋值给其他类型

let test2:null = null
let test3:undefined = undefined

// numm = test2 // 报错，不能将类型“null”分配给类型“number”

// numm = test3 // 报错，不能将类型“undefined”分配给类型“number”



// 二、 any和unknown

// nodejs环境执行ts
// npm i @types/node --save-dev
// npm i ts-node --g


// 1.any
// 没有强制限定哪种类型，随时切换类型都可以 我们可以对 any 进行任何操作，不需要检查类型
let anys:any = 123
anys = '123'
anys = true

// 没有指定类型的变量默认为any类型
let any2;
any2 = true
any2 = 123
any2 = '123'

// 弊端如果使用any 就失去了TS类型检测的作用

// 2.unknow

// unknow 可以定义任何类型的值

let value:unknown;

value = true;
value = 1234
value = '1234'
value = []
value = {}
value = null
value = undefined
value = Symbol('type')

// unknown不能作为子类型只能作为父类型
let names:unknown = '123'
// let names2:string = names // 报错，不能将类型“unknown”分配给类型“string”


// any可以作为子类型，也可以作为父类型
let name3:any = '123'
let name4:string = name3

// unknown的可服赋值对象只有unknow和any
let bbb:unknown = '123'
let aaa:any = bbb

// any类型的对象，在获取不存在的属性时不会报错
let obj:any = {a:1}
obj.b  // 不报错

// unknown类型的对象 不能调用属性和方法

let obj2:unknown = {a:111,fn:():number=>111}

// obj2.a // 报错
// obj2.fn() // 报错
// obj2.b // 报错



// 三、 接口和对象类型

// 在typescript中定义对象的方式使用关键字interface（接口）

interface Person{
    a:number,
    b:string
}


// 这样写会报错，使用接口定义对象时不能多属性也不能少属性
// 必须与所使用的接口保持一致
// const person:Person = {
//     a:222
// }

// 正确写法
const person:Person = {
    a:222,
    b:'222'
}

// 重名interface，会自动合并
interface Accc{
    a:number
}
interface Accc{
    b:string
}
const accc:Accc = {
    a:222,
    b:'222'
}

// 继承

interface Bccc extends Accc{
    c:boolean
}

const bccc:Bccc = {
    a:222,
    b:'222',
    c:true
}

// 对于可选的属性可以在定义接口时使用 ?操作符

interface Cccc{
    ac?:boolean,
    bc:string
}

const cccc:Cccc = {
    bc:'ccc'
}

// 对于要给要在实例化接口时添加接口属性以外的属性，可以在定义接口时使用 任意属性 [propName: string]

interface Dccc{
    a:string,
    b:number,
    [propName:string]:any
}
const dccc:Dccc = {
    a:'a',
    b:222,
    c:true
}

// 但要注意，在使用任意属性后 该接口的所有确定属性和可选属性都必须为任意属性的类型的子集

// 只读属性
// readonly 不可以被赋值，只可以读取

interface Eccc{
    readonly a:string,
    b:boolean
}
const eccc:Eccc = {
    a:'123',
    b:true
}

// eccc.a = '1233' // 报错，无法为“a”赋值，因为它是只读属性。

// 添加函数

interface Fccc {
    a:number,
    b?:string,
    fn:(a:string)=>number
}

const fccc:Fccc = {
    a:111,
    fn:(a:string)=>{
        return Number(a)
    }
}

// 四、数组类型

// 定义方式
// 1.类型[]

let arra:number[] = [213]

// let arrb:number[] = [1,2,3,4,'22'] // 报错，不能将类型“string”分配给类型“number”。

// 使用操作方法添加也会报错

let arrb:number[] = [1,2,3,]
// arrb.push('1') // 报错，类型“string”的参数不能赋给类型“number”的参数。
 
// 2.数组泛型 Array<类型>

let arrc:Array<string> = ['1','2']

// 3.用接口表示数组 一般用来描述类数组

interface NumberArray{
    [index:number]:number
}

let arrd:NumberArray = [1,2,3,4,5]

// console.log(arrd[3]); // 4

// 4.多维数组

let data:number[][] = [[1,2],[1,2]]

// arguments类数组


function Arr1(...args:any): void {
    console.log(arguments)
    //错误的arguments 是类数组不能这样定义
    // let arr:number[] = arguments
}
// Arr1(111, 222, 333)
 
 
 
function Arr2(...args:any): void {
    console.log(arguments) 
    //ts内置对象IArguments 定义
    let arr:IArguments = arguments
}
// Arr2(111, 222, 333)
 
//其中 IArguments 是 TypeScript 中定义好了的类型，它实际上就是：
interface IArguments {
    [index: number]: any;
    length: number;
    callee: Function;
}

// 五、函数扩展

// 函数类型

//注意，参数不能多传，也不能少传 必须按照约定的类型来
const fn1 = (arr:number[],name:string):string => {
    return name
}

fn1([1,2,3],'张三')

// 可选参数

// 通过?表示改参数为可选参数
// 注意：必选参数不能位于可选参数后。
const fn2 = (arr:number[],name?:string):number[] => {
    return arr
}

fn2([1,2,3,4])
// fn2() // 报错，应有 1-2 个参数，但获得 0 个。ts(2554)

// 参数默认值

const fn3 = (arr:number[] = [1,2,3,4]):number[] => {
    return arr
}

fn3()


// 接口定义参数
interface Fnccc {
    (num1:number,str1:string):number
}

const fn4:Fnccc = (num:number,str:string):number => 123

interface User {
    name:string,
    age:number
}

const getUserInfo = (user:User):User=>{
    return user
}

// 函数重载

function fn5(params: number): void 
 
function fn5(params: string, params2: number): void
 
function fn5(params: any, params2?: any): void {
 
    console.log(params)
 
    console.log(params2)
 
}
 
 
 
fn5(123)
 
fn5('123',456)