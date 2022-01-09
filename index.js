const express = require('express');
const path = require('path');

// 아래는 익스프레스에서 자주 사용되는 패키지들입니다.
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');

// dot env : process.env 를 파일에서 자동적으로 설정해준다. -> 보안과도 관련 있음.
dotenv.config();

const app = express();

app.set('port', process.env.PORT || 3000); // js 특성 이용, PORT 값이 없으면 기본으로 3000설정.


// 설치했던 패키지들을 app.use에 연결한다. 각종 req, res, next 들은 미들 웨어 내부에 있다. next도 내부적으로 알아서 호출한다.
app.use((req, res, next) => { // 미들웨어의 확장.
	if(process.env.NODE_ENV === 'production'){
		morgan('combined')(req, res, next);
	}
	else {
		morgan('dev')(req, res, next);
	}
});
app.use('/', express.static(path.join(__dirname, 'public')));
// 정적인 파일을 제공하는 라우터 역할을 한다.
// 예를들어, /index.html 을 치면 그대로 표현한다. . 부분에 public 등을 치면 해당 폴더 하위의 내용만 보여준다. 이를 통해 보안을 강화할 수 있다.
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // 기존 querystring 모듈을 통해 처리
// body-parser에 대한 내용이다. 해당 패키지는 4.16 버전 이후 합병되었다.
// 폼 데이터나 ajax 요청의 데이터를 처리
app.use(cookieParser(process.env.COOKIE_SECRET)); // 쿠키를 해석해 req.cookies 객체로 만든다. 첫 인수로 비밀키를 넣을 수 있다.
app.use(session({ // 로그인 등의 이유로 세션을 구현하거나 특정 사용자를 위한 데이터를 임시 저장할 때 유용
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false
  },
  name: 'session-cookie'
}))

app.use((req, res, next) => { // 일반적인 미들웨어의 사용.
  console.log('모든 요청에 다 실행된다.');
  /*
    app.use(미들웨어) 모든요청에서 실행,
    app.use(주소, 미들웨어) 해당 주소로 시작하는 요청에서만 실행
    app.post(주소, 미들웨어) 주소로 시작하는 요청 중 post 요청에서 실행
    미들웨어는 next를 호출해야 다음 미들웨어로 넘어간다.
   */
  next();
});

app.get('/', (req, res) => { // app.get 이란 GET 방식으로 '/' 주소로 하는 요청을 받을 때 응답에 대한 코드를 작성하게 된다.
  // res.send('Hello Express'); , send는 한번만 보낼 수 있음.
  // res.sendFile(path.join(__dirname, './index.html')); 파일을 보낼 때 path를 이용해 지정
  // throw new Error('에러는 에러처리 미들웨어로 갑니다.');
  res.sendFile(path.join(__dirname, './index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message); // 500번 상태코드를 보냄.
})

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});