const express = require('express');

const router = express.Router();

router.get('/:id', (req, res) => {
	// 현재 라우터 주소는 host/user/ 이다.
	// 여기서 다시 /user 주소에 대해 라우팅을 시행하면,
	// /user/user 에 대해 맵핑되는 라우터가 생기게된다.
	
	// :id는 정규식 표현으로, 라우트 매개변수 패턴이다
	// req.params 객체 안의 프로퍼티로 들어가게된다.
	// 대신 /user/ 밑의 어떠한 값도 모두 이곳으로 들어오게 되므로, 되도록 마지막에 라우팅을 달아야한다.
	
	// 쿼리스트링의 경우 req.query 객체 안에 정리되어 있다.
	res.send('<h1>Hello User</h1>' + '<p>User id : ' + req.params.id + '</p>');
});

module.exports = router;