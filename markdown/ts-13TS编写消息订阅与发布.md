# 用TS编写消息订阅与发布

## 概述

> 什么是发布订阅模式呢？大家如果有js原生或者是vue2开发经验的话，已经用到了发布订阅模式例
> 如addEventListener， evnetBus，PubSub.js库

## 思维导图

![thinking_picture](https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/thinking_picture.webp)

## 代码实例

**`on` 订阅/监听**

**`emit` 发布/注册**

**`once` 只执行一次**

**`off` 解除绑定**

```ts
// 消息订阅与发布

interface EventOptions {
    on:(name:string,cb:Function)=>void
    emit:(name:string,...arg:Array<any>)=>void
    off:(name:string,fn:Function)=>void
    once:(name:string,fn:Function)=>void
}
// 订阅事件列表
interface EventList {
    // key事件名 Array:事件订阅函数数组
    [key:string]:Array<Function>
}

class Dispatch implements EventOptions {
    list:EventList
    constructor(){
        this.list = {}
    }
    on(name:string,cb:Function){
        const eventLi = this.list[name] || []
        eventLi.push(cb)
        this.list[name] = eventLi
    }
    emit(name:string,...arg:Array<any>){
        const eventLi = this.list[name]
        if(eventLi){
            eventLi.forEach(fn=>{
                fn.apply(this,arg)
            })
        } else {
            console.error(`${name}未知事件`)
        }
    }
    // 删除事件
    off(name:string,fn:Function){
        const eventLi = this.list[name]
        let ind;
        if(eventLi && fn){
            eventLi.forEach((fni,index)=>{
                if(fni === fn){
                    ind = index
                }
            })
            eventLi.splice(ind,1);
        } else {
            console.error(`${name}未知事件`);
        }
        this.list[name] = eventLi
    }
    // 只执行一次
    once(name:string,fn:Function){
        const fns = (...arg:Array<any>) => {
            fn.apply(this,arg)
            this.off(name,fns)
        }
        this.on(name,fns)
    }
}

// PubSub类比

// PubSub.subscribe('订阅消息名',(a, 传递来的参数 )=>{
    //回调
//})


/**
 * PubSub.publish('订阅消息名', ...携带参数 )
 * 
 * 
 * 
 */


const test = new Dispatch()

test.on('post',(...arg:Array<any>)=>{
    console.log(arg,1);
})
const fn = (...arg:Array<any>)=>{
    console.log(arg,2);
    
}

test.on('post',fn)

test.off('post',fn)

test.once('post',(...arg:Array<any>)=>{
    console.log(arg,3);
})

test.emit('post',1,false,'111')
test.emit('post',1,false,'111')
```

## 控制台输出

![EventBusImage](https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/EventBusImage.webp)
