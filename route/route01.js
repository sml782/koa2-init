const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
const fs = require('fs');

router
    .get('/', (ctx, next) => {
        ctx.body = '主页';
    })
    .get('/todo', (ctx, next) => {
        ctx.body = 'todo';
    })

app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000, () => {
        console.log('start')
    })