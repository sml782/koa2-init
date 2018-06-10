const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');

// ctx.request和ctx.req的区别:
//     ctx.request:是Koa2中context经过封装的请求对象，它用起来更直观和简单。
//     ctx.req:是context提供的node.js原生HTTP请求对象。这个虽然不那么直观，但是可以得到更多的内容，适合我们深度编程。
app.use(bodyParser());

app.use(async (ctx) => {
    if (ctx.url === '/' && ctx.method === 'GET') {
        // 显示表单页面
        let html = `
            <h1>Koa2 request post demo</h1>
            <form method="POST"  action="/">
                <p>userName</p>
                <input name="userName" /><br/>
                <p>age</p>
                <input name="age" /> <br/>
                <p>webSite</p>
                <input name='webSite' /><br/>
                <button type="submit">submit</button>
            </form>
        `;
        ctx.body = html;
    } else if (ctx.url === '/' && ctx.method === 'POST') {
        let postData = ctx.request.body;
        ctx.body = {
            postData,
            req: ctx.req,
            request: ctx.request
        };
    } else {
        ctx.body = '<h1>404</h1>';
    }
})

app.listen(3000, () => {
    console.log('server is starting')
})