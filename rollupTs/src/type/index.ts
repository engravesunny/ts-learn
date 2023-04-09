
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

