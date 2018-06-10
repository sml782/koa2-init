const Koa = require('koa');
const app = new Koa();

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
        let postDate = await parsePostData(ctx);
        ctx.body = postDate;
    } else {
        ctx.body = '<h1>404</h1>';
    }
})

const parsePostData = (ctx) => {
    return new Promise((resolve, reject) => {
        try {
            let postData = '';
            ctx.req.on('data', (data) => {
                postData += data;
            })
            ctx.req.addListener('end', () => {
                let parseDate = await parsePostQuery(postData);
                resolve(parseDate);
            })
        } catch (error) {
            reject(error);
        }
    });
};

const parsePostQuery = (data) => {
    let queryData = {}
    let queryList = data.split('&');
    for( let [index,d] of queryList.entries() ){
        let itemList = d.split('=');
        console.log(itemList);
        queryData[itemList[0]] = decodeURIComponent(itemList[1]);
    } 
    return queryData
}

app.listen(3000, () => {
    console.log('server is starting')
})