const Koa = require('koa');
const app = new Koa();
const fs = require('fs');

const render = (page) => {
    return new Promise((resolve, reject) => {
        let pageUrl = `../page/${page}`;
        fs.readFile(pageUrl, 'binary', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        });
    })
}

const route = async (url) => {
    let page = '404';
    switch (url) {
        case '/':
        case '/index':
            page = 'index';
            break;
        case '/todo':
            page = 'todo';
            break;
        case '/404':
            page = '404';
            break;
        default:
            page = '404';
            break;
    }
    let html = render(page + '.html');
    return html;
}

app.use(async (ctx) => {
    let url = ctx.request.url;
    let html = await route(url);
    ctx.set('Content-Type', 'text/html; charset=utf-8');
    ctx.body = html;
})

app.listen(3000, () => {
    console.log('start')
})