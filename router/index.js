// router 객체로 라우팅 분리하는 방법
const express=require('express');

const router=express.Router();

router.get('/', (req, res, next) => {
	next('route');
	// 이 밑의 모든 미들웨어는 실행되지 않는다.
}, (req, res, next) => {
	// 다음 라우터로 바로 넘어가는 기능. router기능으로 인해 .use로 연결된 라우터들 중 다음 라우터로 넘어가게된다.
	console.log('실행되지 않는다.');
}, (req, res, next) => {
	console.log('실행되지 않는다.');
});

router.get('/', (req, res, next) => {
	console.log('실행된다.');
	res.send('Hello Express 2');
})

module.exports = router;