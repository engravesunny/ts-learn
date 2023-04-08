"use strict";
// // class
// // class的基本用法 继承 和 类型约束 implements
// // 挂载点
// interface Options {
//     el: string | HTMLElement
// }
// // vue类 类型约束 接口
// interface VueCls {
//     options:Options
//     init():void
// }
// // 结点类型约束
// interface Vnode {
//     tar:string, // 目标节点
//     text?:string, // 节点内容
//     children?:Vnode[] // 子节点
// }
// // 虚拟dom
// class Dom {
//     // 创建元素结点
//     createElement(el:string) {
//         return document.createElement(el)
//     }
//     // 设置节点内容
//     setText(el:HTMLElement, text?:string | null) {
//         if(text){
//             el.textContent = text
//         }
//     }
//     render(data:Vnode) {
//         let root = this.createElement(data.tar)
//         if(data.children &&  Array.isArray(data.children)){
//             data.children.forEach(item => {
//                 let child = this.render(item)
//                 root.appendChild(child)
//             })
//         } else {
//             this.setText(root, data.text)
//         }
//         return root
//     }
// }
// class Vue extends Dom implements VueCls {
//     options: Options
//     constructor (options: Options) {
//         super() // 父类的prototype.constructor.call
//         this.options = options
//         this.init()
//     }
//     init():void {
//         let data:Vnode = {
//             tar:'div',
//             children:[
//                 {
//                     tar:'h1',
//                     text:'子节点1'
//                 },
//                 {
//                     tar:'h2',
//                     text:'子节点2'
//                 }
//             ]
//         }
//         let app = typeof this.options.el == 'string' ?  document.querySelector(this.options.el):this.options.el
//         app?.appendChild(this.render(data))
//     }
// }
// new Vue({
//     el:"#app"
// })
// get set
// class Ref {
//     content: any
//     constructor(value: any) {
//         this.content = value
//     }
//     get value() {
//         return this.content + '111'
//     }
//     set value(newVal) {
//         this.content = newVal + '123'
//     }
// }
// const val = new Ref('元数据')
// val.value = '修改后'
// console.log(val.value);
// abstract class Vue {
//     name:string
//     constructor(name:string){
//         this.name = name
//     }
//     getName():string{
//         return this.name
//     }
// }
// class React extends Vue {
//     constructor(name:string){
//         super(name)
//     }
//     setName(name:string):void{
//         this.name = name
//     }
// }
// const react = new React("哒哒哒奥迪")
// react.setName('大大大大')
// console.log(react.getName());
// class Person {
//     private name:string
//     private age:number
//     constructor (name:string,age:number) {
//         this.name = name
//         this.age = age
//     }
//     private init():void {
//         this.name += '你好啊'
//     }
//     protected setAge():void {
//         this.age += 1
//     }
// }
// let person_s = new Person('小明',18)
// person_s.age // 报错，属性“age”为私有属性，只能在类“Person”中访问。
// person_s.setAge() // 报错，属性“setAge”受保护，只能在类“Person”及其子类中访问。
// class Student extends Person {
//     stuNum:string
//     constructor (stuNum:string,name:string,age:number) {
//         super(name,age)
//         this.stuNum = stuNum
//     }
//     setStuInfo(){
//         this.age += 1 // 报错，属性“age”为私有属性，只能在类“Person”中访问
//         this.setAge() // protected修饰的方法可以在子类中使用
//         this.init() // 报错，属性“init”为私有属性，只能在类“Person”中访问。
//     }
//     getStuInfo(){
//         console.log(this.stuNum);
//     }
// }
// interface ReactCls{
//     reactName:string
//     init():void
// }
// class Vue {
//     name:string
//     option:Options
//     static version:string
//     constructor(option:Options,name:string){
//         this.option = option
//         this.name = name
//     }
//     static run () {
//         return this.output();
//     }
//     static output() {
//         console.log(this.name);
//     }
// }
// class React extends Vue implements ReactCls {
//     reactName:string
//     constructor(reactName:string){
//         super({el:"#app"},"name")
//         this.reactName = reactName
//     }
//     init():void{
//     }
// }
// abstract class A {
//     public name:string
//  }
//  new A() // 报错，无法创建抽象类的实例。
class A {
    constructor(name) {
        this.name = name;
    }
    print() {
        return this.name;
    }
}
class B extends A {
    constructor() {
        super('大大大大');
    }
    getName() {
        return this.name;
    }
}
