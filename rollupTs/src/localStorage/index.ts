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

