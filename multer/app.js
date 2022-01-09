const fs = require('fs');
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

try {
	fs.readdirSync('uploads');
} catch(error){
	console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
	fs.mkdirSync('uploads');
}

const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, done){
			done(null, 'uploads/'); // 이곳에 저장되게 된다.
		},
		filename(req, file, done){ // 이름을 어떻게 처리할지
			const ext = path.extname(file.originalname);
			done(null, path.basename(file.originalname, ext) + Date.now() + ext); // 해당 이름으로 저장되게 된다.
		},
	}),
	limits : {fileSize : 5*1024*1024},
});

app.get('/', (req, res, next) => {
	res.sendFile(path.join(__dirname, './multer.html'));
});

app.post('/upload', upload.single('image'), (req, res) => {
	console.log(req.file, req.body);
	res.send('ok');
})

app.listen(3000, () => {
	console.log('3000번 포트에서 듣는 중');
})