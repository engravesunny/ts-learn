console.log(process.env);
import path from 'path'
import ts from 'rollup-plugin-typescript2'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import replace from 'rollup-plugin-replace'

const isDev = () => {
    return process.env.NODE_ENV === 'development'
}

export default {
    input:'./src/index.ts',

    output:{
        file:path.resolve(__dirname,'./lib/index.js'),
        sourcemap:true
    },
    plugins:[
        ts(),
        isDev() && serve({
            open:true,
            port:8080,
            openPage:'/public/index.html'
        }),
        isDev() && livereload(),
        terser(),
        replace({
            "process.env.NODE_ENV":JSON.stringify(process.env.NODE_ENV)
        })
    ],

}