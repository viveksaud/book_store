const express = require('express');
const router = express.Router();
// const Book = require("./modals/bookModel");
const multer = require('multer');
const BookController = require('./controllers/bookController');


let imageName;
const bookController  = new BookController();


///photo upload using multer///
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    imageName = 
        file.originalname.trim() + 
        "-" + 
        Date.now() +
        "-" + 
        Math.round(Math.random() * 1e9);
    cb(null, imageName);
  },
});

const upload = multer({ storage: storage });
///photo upload using multer///

router.post('/add', upload.single("image"), (req,res)=>{
    bookController.addBook(req,res,imageName);
});

// router.get('/:id', (req,res)=>{
//     bookController.getBook(req,res);
// });
router.get('/:id', 
    bookController.getBook
);

//?=limit=20
router.get('/', bookController.getBooks);

router.put('/update/:id', bookController.updateBook);

router.delete('/delete/:id', bookController.deleteBook);

//search/all/?q=
router.get('/search/all', bookController.searchBook);


module.exports = router;