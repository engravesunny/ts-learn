# 类 class ts 写法

## 一、定义一个类

> ES6提供了更接近传统语言的写法，引入了Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类。基本上，ES6的class可以看作只是一个语法糖，它的绝大部分功能，ES5都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已

- ts中不允许在`constructor`中定义变量，需要在`constructor`上方进行先声明

```typescript
class Person {
    constructor (name,age) {
        this.name = name  // 报错，类型“Person”上不存在属性“name”。
    }
    run () {

    }
}
```

- 定义了变量不用也会报错 ， 通常是给默认值 或者 进行赋值操作

```typescript
class Person {
    name:string 
    age:number // 报错，属性“age”没有初始化表达式，且未在构造函数中明确赋值。
    constructor (name:string) {
        this.name = name
    }
}
```

- 正确写法

```ts
class Person {
    name:string
    age:number
    constructor (name:string,age:number) {
        this.name = name
        this.age = age
    }
}
```

## 二、类修饰符

> 总共有三个 public private protected

- public:默认修饰符，他可以让我们定义的变量或者方法在 类内部 类外部 以及 子类 都可以访问
- private:使用private修饰的变量或方法只能在类内部进行访问，子类和外部都不可以访问
- protect:使用protect修饰的变量或方法只能在类内部和子类进行访问，类外部不可以访问

```ts
class Person {
    private name:string
    private age:number
    constructor (name:string,age:number) {
        this.name = name
        this.age = age
    }
    private init():void {
        this.name += '你好啊'
    }
    protected setAge():void {
        this.age += 1
    }
}

let person_s = new Person('小明',18)

person_s.age // 报错，属性“age”为私有属性，只能在类“Person”中访问。
person_s.setAge() // 报错，属性“setAge”受保护，只能在类“Person”及其子类中访问。

class Student extends Person {
    stuNum:string
    constructor (stuNum:string,name:string,age:number) {
        super(name,age)
        this.stuNum = stuNum
    }
    setStuInfo(){
        this.age += 1 // 报错，属性“age”为私有属性，只能在类“Person”中访问
        this.setAge() // protected修饰的方法可以在子类中使用
        this.init() // 报错，属性“init”为私有属性，只能在类“Person”中访问。
    }
    getStuInfo(){
        console.log(this.stuNum);
    }
    
}
```

## 三、static 静态属性和静态方法

> 静态属性是整个类共有的属性。举个例子才好理解：有一个学生`Student`类，里面有`name`、`age`、`count`（班级学生数量）等的属性。这里的`name`和`age`是一个学生所特有的，但是`count`呢？它不是，我们不希望每一个学生拥有不同的学生的数量，所以我们把`count`定义成`static`类型的数据

- 1.我们用`static` 定义的属性 不可以通过`this` 去访问 只能通过类名去调用

```ts
class Vue {
    option:Options
    static version:string
    constructor(option:Options){
        this.option = option
    }
}
const vue = new Vue({el:"#app"})

vue.version // 报错，属性“version”在类型“Vue”上不存在。你的意思是改为访问静态成员“Vue.version”吗?
```

- 2.static 静态函数 同样也是不能通过this 去调用 也是通过类名去调用

```ts
class Vue {
    name:string
    option:Options
    static version:string
    constructor(option:Options,name:string){
        this.option = option
        this.name = name
    }
    static run () {
        return console.log(this.name);
    }
}
const vue = new Vue({el:"#app"},'name')

// vue.version // 报错，属性“version”在类型“Vue”上不存在。你的意思是改为访问静态成员“Vue.version”吗?
vue.run() // 报错，属性“run”在类型“Vue”上不存在。你的意思是改为访问静态成员“Vue.run”吗?
```

- 3.如果两个函数都是static 静态的是可以通过this互相调用

```ts
class Vue {
    name:string
    option:Options
    static version:string
    constructor(option:Options,name:string){
        this.option = option
        this.name = name
    }
    static run () {
        return this.output();
    }
    static output() {
        console.log(this.name);
    }
}
```

## 四、interface定义类

> `ts` `interface` 定义类 使用关键字 `implements`   后面跟`interface`的名字 多个用逗号隔开 继承还是用`extends`

```ts
interface ReactCls{
    reactName:string
    init():void
}

class Vue {
    name:string
    option:Options
    static version:string
    constructor(option:Options,name:string){
        this.option = option
        this.name = name
    }
    static run () {
        return this.output();
    }
    static output() {
        console.log(this.name);
    }
}

class React extends Vue implements ReactCls {
    reactName:string

    constructor(reactName:string){
        super({el:"#app"},"name")
        this.reactName = reactName
    }
    init:void // 报错，函数实现缺失或未立即出现在声明之后，不能只声明，要有具体实现
    init():void{
        
    }

}
```

## 五、抽象类

> 应用场景如果你写的类实例化之后毫无用处此时我可以把他定义为抽象类 或者你也可以把他作为一个基类-> 通过继承一个派生类去实现基类的一些方法

- 1.抽象类无法被实例化

```ts
abstract class A {
   public name:string
   
}
 
new A() // 报错，无法创建抽象类的实例。
```

- 2. 我们定义的抽象方法必须在派生类实现

```ts
abstract class A {
    name: string
    constructor(name: string) {
        this.name = name
    }
    print(): string {
        return this.name
    }

    abstract getName(): string
}

class B extends A {
    constructor() {
        super('大大大大')
    }
    getName(): string {
        return this.name
    }
}
```

## 六、简单vue实现

```ts
// 挂载点
interface Options {
    el: string | HTMLElement
}

// vue类 类型约束 接口
interface VueCls {
    options:Options
    init():void
}

// 结点类型约束
interface Vnode {
    tar:string, // 目标节点
    text?:string, // 节点内容
    children?:Vnode[] // 子节点
}


// 虚拟dom
class Dom {
    // 创建元素结点
    createElement(el:string) {
        return document.createElement(el)
    }

    // 设置节点内容
    setText(el:HTMLElement, text?:string | null) {
        if(text){
            el.textContent = text
        }
    }

    render(data:Vnode) {
        let root = this.createElement(data.tar)
        if(data.children &&  Array.isArray(data.children)){
            data.children.forEach(item => {
                let child = this.render(item)
                root.appendChild(child)
            })
        } else {
            this.setText(root, data.text)
        }
        return root
    }
}


class Vue extends Dom implements VueCls {
    options: Options
    constructor (options: Options) {
        super() // 父类的prototype.constructor.call
        this.options = options
        this.init()
    }
    init():void {
        let data:Vnode = {
            tar:'div',
            children:[
                {
                    tar:'h1',
                    text:'子节点1'
                },
                {
                    tar:'h2',
                    text:'子节点2'
                }
            ]
        }
        let app = typeof this.options.el == 'string' ?  document.querySelector(this.options.el):this.options.el
        app?.appendChild(this.render(data))
    }
}

new Vue({
    el:"#app"
})
```
