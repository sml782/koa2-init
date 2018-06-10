const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
// const router = new Router();
// const router = new Router({
//     prefix: '/r'
// });
const fs = require('fs');

let home = new Router();
home
    .get('/index', (ctx, next) => {
        ctx.body = 'home';
    })
    .get('/todo', (ctx, next) => {
        ctx.body = 'todo';
    })

let page = new Router();
page
    .get('/index', (ctx, next) => {
        ctx.body = 'page';
    })
    .get('/todo', (ctx, next) => {
        ctx.body = 'todo';
    })

let router = new Router();
router
    .use('/home', home.routes(), home.allowedMethods())
    .use('/page', page.routes(), page.allowedMethods());

app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000, () => {
        console.log('start')
    })