# TS编写localStorage插件

> 在我们使用cookie的时候是可以设置有效期的，但是localStorage本身是没有该机制的，只能人为的手动删除，否则会一直存放在浏览器当中，可不可以跟cookie一样设置一个有效期。如果一直存放在浏览器又感觉有点浪费，那我们可以把localStorage进行二次封装实现该方案。
> 在我们使用cookie的时候是可以设置有效期的，但是localStorage本身是没有该机制的，只能人为的手动删除，否则会一直存放在浏览器当中，可不可以跟cookie一样设置一个有效期。如果一直存放在浏览器又感觉有点浪费，那我们可以把localStorage进行二次封装实现该方案。

## enum定义枚举

```ts
//字典 Dictionaries    expire过期时间key    permanent永久不过期
export enum Dictionaries {
    expire = '__expire__',
    permanent = 'permanent'
}
```

## type ts 定义类型

```ts

import { Dictionary } from "../enmu"

// 过期时间 永久或者时间戳
export type expire = Dictionary.permanent | number


// 存储数据类型
export interface Data <T> {
    value:T
    [Dictionary.expire]:expire
}

// get返回值类型
export interface Result<T> {
    message:string,
    value:T
}

export interface StorageCls {
    get:<T>(key:Key)=>Result<T>,
    set:<T>(key:Key,value:T,expire:expire)=>void,
    remove:(key:Key)=>void,
    clear:()=>void
}

export type Key = string
```

## index.ts主要实现思路

```ts
import { Key,StorageCls,expire,Data,Result } from "./type";
import { Dictionary } from "./enmu";
export class Storage implements StorageCls {
    get <T> (key:Key):Result<T>{
        const value = localStorage.getItem(key)
        const data:Data<T> = JSON.parse(value)
        if(value){
            // 存了key，拿取key
            const now = new Date().getTime()
            if(typeof data[Dictionary.expire] === 'number' && data[Dictionary.expire] < now) {
                // 已过期
                // 删除key
                this.remove(key)
                return {
                    message:`${key}已过期`,
                    value:null
                }
            } else {
                
                // 未过期
                return {
                    message:'读取成功',
                    value:data.value
                }
            }
        } else {
            // 未存key
            console.warn('key值无效');
            return {
                message:`${key}无效`,
                value:null
            }
        }
    }
    set<T>(key:Key,value:T,expire:expire = Dictionary.permanent){
        const data = JSON.stringify({
            value,
            [Dictionary.expire]:expire
        })
        localStorage.setItem(key,data)
    }
    remove(key:Key){
        if(localStorage.getItem(key)){
            localStorage.removeItem(key)
        }
    }  
    clear(){
        localStorage.clear()
    }
}
```

## rollup.config.js配置

```ts
import ts from 'rollup-plugin-typescript2'
import path from 'path'
import {fileURLToPath} from 'url'
const metaUrl = fileURLToPath(import.meta.url)
const dirName = path.dirname(metaUrl)
export default {
     input:'./src/index.ts',
     output:{
         file:path.resolve(dirName,'./dist/index.js')
     },
     plugins:[
        ts()
     ]
}
```

## tyconfig.json

```js
"module": "ESNext",
"moduleResolution": "node",
"strict": false
```

## 测试index.html引入调用

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>rollupTs</title>
</head>
<body>
    <script type="module">
        import {Storage} from '../lib/index.js'
        let a = new Storage()
        a.set('key',{key:1111},new Date().getTime()+5000)
        setInterval(() => {
            console.log(new Date().getTime(),a.get('key'));
        }, 500);
    </script>
</body>
</html>
```

## 测试结果

![test](https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/test_1.png)
