const Koa = require('koa2')
const app = new Koa()
// const mongoose = require('mongoose')
const bodyparser = require('koa-bodyparser')
app.use(bodyparser())
//引入connect
const {connect, initSchemas} = require('./database/init.js');
const Router  = require("koa-router");
const cors = require('koa2-cors')
app.use(cors())
let user = require('./appApi/user')
let goods = require('./appApi/goods.js')

// 装载所有子路由
let router = new Router()
router.use('/user',user.routes())
router.use('/goods',goods.routes())
// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())


//立即执行函数
;(async () =>{
    await connect()
    initSchemas()
})()

app.use(async(ctx)=>{
    ctx.body = '<h1>hello Koa2</h1>'
})

app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})