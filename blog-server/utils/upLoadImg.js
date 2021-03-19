const path = require('path')
// 上传图片
const multer = require('koa-multer');
function getImgName(params) {
    let randomString =  String(Date.now())
    let first = randomString.slice( randomString.length - 8 )
    let second = String(Math.floor(Math.random() * 100000))
    return first + second
}
const storage = multer.diskStorage({
    destination (req, file, cb) {
        // 设置文件的存储目录，需提前创建
        cb(null,path.join(__dirname,'../public/images/blog-thumbnail/'))
    },
    filename (req, file, cb) {
        // 设置 文件名
        const name = file.originalname;
        // console.log(file)
        // 设置文件的后缀名，
        //我这里取的是上传文件的originalname属性的后四位，
        // 即： .png，.jpg等，这样就需要上传文件的后缀名为3位
        const extension = name.substring(name.length - 4);
        cb(null, 'thum' + getImgName() + extension);
    }
})
const upload = multer({ storage: storage })
 module.exports =  upload