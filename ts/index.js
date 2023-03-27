"use strict";
// 一、 基础类型
// 1.字符串类型 string
let a = 'aaa';
let b = `${a}bbb`; // 模板字符串
// 2.数字类型 number
let num = 111;
let num2 = NaN; // NaN，Infinity也属于number
let infi = -Infinity;
let decimal = 6; //十进制
let hex = 0xf00d; //十六进制
let binary = 0b1010; //二进制
let octal = 0o744; //八进制s
// 3.布尔类型 (new Boolean()返回的是Boolean对象,不是boolean值)
// let bool:boolean = new Boolean()  这样会报错，new Boolean() 返回的是Boolean对象
// 需要改为
let bool = new Boolean(1); // [Boolean: true]
// console.log(bool);
// 4.空值类型
// let v1:void = null // 严格模式下会报错，void类型不能赋值为null
let v2 = undefined;
// 也可以定义没有返回值的函数
let fn = () => { return; };
// 或者
function fnx() {
    // ...
    return;
}
// 5.null和undefined类型
let u = undefined;
let n = null;
//undenfined类型的变量可以赋值给string类型的变量
let test1 = undefined;
let numm = 111;
// num = test1  // 报错，void类型不可赋值给其他类型
let test2 = null;
let test3 = undefined;
// numm = test2 // 报错，不能将类型“null”分配给类型“number”
// numm = test3 // 报错，不能将类型“undefined”分配给类型“number”
// 二、 any和unknown
// nodejs环境执行ts
// npm i @types/node --save-dev
// npm i ts-node --g
// 1.any
// 没有强制限定哪种类型，随时切换类型都可以 我们可以对 any 进行任何操作，不需要检查类型
let anys = 123;
anys = '123';
anys = true;
// 没有指定类型的变量默认为any类型
let any2;
any2 = true;
any2 = 123;
any2 = '123';
// 弊端如果使用any 就失去了TS类型检测的作用
// 2.unknow
// unknow 可以定义任何类型的值
let value;
value = true;
value = 1234;
value = '1234';
value = [];
value = {};
value = null;
value = undefined;
value = Symbol('type');
// unknown不能作为子类型只能作为父类型
let names = '123';
// let names2:string = names // 报错，不能将类型“unknown”分配给类型“string”
// any可以作为子类型，也可以作为父类型
let name3 = '123';
let name4 = name3;
// unknown的可服赋值对象只有unknow和any
let bbb = '123';
let aaa = bbb;
// any类型的对象，在获取不存在的属性时不会报错
let obj = { a: 1 };
obj.b; // 不报错
// unknown类型的对象 不能调用属性和方法
let obj2 = { a: 111, fn: () => 111 };
// 这样写会报错，使用接口定义对象时不能多属性也不能少属性
// 必须与所使用的接口保持一致
// const person:Person = {
//     a:222
// }
// 正确写法
const person = {
    a: 222,
    b: '222'
};
const accc = {
    a: 222,
    b: '222'
};
const bccc = {
    a: 222,
    b: '222',
    c: true
};
const cccc = {
    bc: 'ccc'
};
const dccc = {
    a: 'a',
    b: 222,
    c: true
};
const eccc = {
    a: '123',
    b: true
};
const fccc = {
    a: 111,
    fn: (a) => {
        return Number(a);
    }
};
// 四、数组类型
// 定义方式
// 1.类型[]
let arra = [213];
// let arrb:number[] = [1,2,3,4,'22'] // 报错，不能将类型“string”分配给类型“number”。
// 使用操作方法添加也会报错
let arrb = [1, 2, 3,];
// arrb.push('1') // 报错，类型“string”的参数不能赋给类型“number”的参数。
// 2.数组泛型 Array<类型>
let arrc = ['1', '2'];
let arrd = [1, 2, 3, 4, 5];
// console.log(arrd[3]); // 4
// 4.多维数组
let data = [[1, 2], [1, 2]];
// arguments类数组
function Arr1(...args) {
    console.log(arguments);
    //错误的arguments 是类数组不能这样定义
    // let arr:number[] = arguments
}
// Arr1(111, 222, 333)
function Arr2(...args) {
    console.log(arguments);
    //ts内置对象IArguments 定义
    let arr = arguments;
}
// 五、函数扩展
// 函数类型
//注意，参数不能多传，也不能少传 必须按照约定的类型来
const fn1 = (arr, name) => {
    return name;
};
fn1([1, 2, 3], '张三');
// 可选参数
// 通过?表示改参数为可选参数
// 注意：必选参数不能位于可选参数后。
const fn2 = (arr, name) => {
    return arr;
};
fn2([1, 2, 3, 4]);
// fn2() // 报错，应有 1-2 个参数，但获得 0 个。ts(2554)
// 参数默认值
const fn3 = (arr = [1, 2, 3, 4]) => {
    return arr;
};
fn3();
const fn4 = (num, str) => 123;
const getUserInfo = (user) => {
    return user;
};
function fn5(params, params2) {
    console.log(params);
    console.log(params2);
}
fn5(123);
fn5('123', 456);
