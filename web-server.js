const express = require('express');
const session = require('express-session');
const fileStore = require('session-file-store')(session);
const app = express();
require('dotenv').config(); // Environment Variable Setting

// Local Db Config
require('./server/service/memo_service').init()
require('./server/service/file_service').init()

// const https = require('https');
const fs = require('fs');
const path = require('path');
const serveStatic = require('serve-static');      //특정 폴더의 파일들을 특정 패스로 접근할 수 있도록 열어주는 역할
const cookieParser = require('cookie-parser');
const cors = require('cors'); // CORS 설정
const utils = require('./server/utils/commandUtil');

// [s] Swagger Config
const { swaggerUi, specs } = require("./swagger/swagger")
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))
// [e] Swagger Config

// [s] Module Features
const accountFeature = require('./server/features/account/index')
const androidFeature = require('./server/features/android/index')
const appFeature = require('./server/features/app/index')
const deeplinkFeature = require('./server/features/deeplink/index')
const dummyFeature = require('./server/features/dummy/index')
const uploadsFeature = require('./server/features/uploads/index')
const javaFeature = require('./server/features/java/index')
const memoFeature = require('./server/features/memo/index')
const memoUploadFeature = require('./server/features/memo_upload/index')
const tilFeature = require('./server/features/til/index')
// [e] Module Features

// 폴더 경로 설정.
const view_dist = path.join(__dirname, '', '/public/views');
const public = path.join(__dirname, '', '/public');

// api 호출하기전 맨 첨에 설정되어야 한다 node express pipeline 참고
app.use(cors());
// 서버가 읽을 수 있도록 HTML 의 위치를 정의해줍니다. 
app.set('views', view_dist)
// Web Client Resource
app.use(express.static(public))
// Upload File Resource.
app.use('/resource', serveStatic(path.join(__dirname, 'resource')))

// 서버가 HTML 렌더링을 할 때, EJS엔진을 사용하도록 설정합니다. 
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// const morgan = require('morgan')
// const winston = require('./utils/winston')

// app.use(morgan('combined', { stream: winston.stream }));

// Json Body Parser
app.use(express.urlencoded({
  limit: "50mb",
  extended: true
}))
app.use(express.json({
  limit: "50mb"
})); // API Call 할때.

app.use('/', accountFeature);
app.use('/', androidFeature);
app.use('/', appFeature);
app.use('/', deeplinkFeature);
app.use('/', dummyFeature);
app.use('/', uploadsFeature);
app.use('/', javaFeature);
app.use('/', memoFeature);
app.use('/', memoUploadFeature);
app.use('/', tilFeature);

app.use(cookieParser(process.env.COOKIE_KEY)); // 쿠키 세팅      

var concat = require('concat-stream');
app.use(function (req, res, next) {
  req.pipe(concat(function (data) {
    req.body = data;
    next();
  }));
});

// 세션 사용
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new fileStore()
}));

// Handle Error Setting
app.use(function (err, req, res, next) {
  console.log('Handle Error\t' + err + '\n\turl\t' + req.url);
  next(err);
});
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err || 'Error!!');
});

// 업로드 용 디렉토리 생성 로직.
utils.checkDir(fs, process.env.UPLOAD_ROOT, function (isSuccess, msg) {
  if (isSuccess) {
    utils.checkDir(fs, process.env.UPLOAD_IMG, null);
    utils.checkDir(fs, process.env.UPLOAD_TXT, null);
    utils.checkDir(fs, process.env.UPLOAD_ETC, null);
  } else {
    console.log("실패! " + msg);
  }
})

// 릴리즈 모드
// if (process.env.BUILD_TYPE == 'RELEASE') {
//   // Server Start.. && SSL 세팅.
//   https.createServer({
//     key: fs.readFileSync('./ssl/privkey.pem'),
//     cert: fs.readFileSync('./ssl/cert.pem'),
//     ca: fs.readFileSync('./ssl/chain.pem')
//   }, app).listen(process.env.PORT, () => {
//     console.log('Release Https Server Start, Port: ' + process.env.PORT);
//   });

//   // redirect http -> https
//   const http = require('http');
//   const httpApp = express();
//   const httpPort = 100;
//   httpApp.all('*', (req, res, next) => {
//     res.redirect('https://' + req.hostname + ':' + process.env.PORT);
//   });
//   http.createServer(httpApp).listen(httpPort, () => {
//     console.log('Http Server Start, Port: ' + httpPort);
//   });
// }
// // 개발 모드
// else {

// if (process.env.BUILD_TYPE == 'RELEASE') {
//   const redirectApp = express();
//   redirectApp.all('*', (req, res, next) => {
//     console.log("Request Url " + req.url)
//     res.redirect('https://' + process.env.HOST);
//   });
//   const redirectHttp = require('http');
//   redirectHttp.createServer(redirectApp).listen(100, () => {
//     console.log('Redeirect Http Server Start, Port: ' + 100);
//   })
// }

const http = require('http');
http.createServer(app).listen(process.env.PORT, () => {
  console.log('Http Server Start, Port: ' + process.env.PORT);
})
// }

