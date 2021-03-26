const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const cors = require('koa2-cors')
const {accessLogger , logger } = require('./utils/koa4')
const index = require('./routes/index')
// error handler
onerror(app)
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(accessLogger())
app.use(cors())
app.use(json())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))


// routes
app.use(index.routes()).use(index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  logger.debug(err)
  console.error('server error', err, ctx)
});
console.log('localhost:25371')
module.exports = app
