var express = require("express");
var router = express.Router();
const mariadb = require("mariadb");
var multer = require("multer");

//이미지 저장 경로 및 이름 설정
var storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./uploadedImage/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// 이미지 저장을 위한 미들웨어 설정
var upload = multer({ storage: storage });

//mariadb 연결
let pool = mariadb.createPool({
  host: "127.0.0.1",
  database: "blog",
  port: "3307",
  user: "root",
  password: "cheerup1004",
});

//sql 실행 함수
function executeQuery(query) {
  return new Promise(function (resolve) {
    pool
      //db 커넥션 확인
      .getConnection()
      //db 커넥션 잘 되있음.
      .then((conn) => {
        //쿼리 실행
        conn
          .query(query)
          .then((rows) => {
            // query 결과
            resolve(rows);
          })
          .catch((err) => {
            // 풀 해제
            conn.release();
          });
      })
      //db 커넥션 잘 안되있음.
      .catch((err) => {
        console.log(err);
      });
  });
}

/* GET home page. */
router.get("/", async function (req, res, next) {
  res.render("home", { title: "Hyeok's Records" });
});

/* GET book page */
router.get("/book", async function (req, res, next) {
  //R (read)
  let selectTest = await executeQuery("SELECT * FROM book");
  console.log("select-------------");
  console.log(selectTest);
  res.render("book", { title: "Hyeok's Books" });
});

/* Post Book data */
router.post(
  "/send_book",
  upload.single("image"),
  async function (req, res, next) {
    var title = req.body.title;
    var text = req.body.text;
    var image_path = req.file.path;

    let insertTest = await executeQuery(
      `INSERT INTO book (title, text, image_path) VALUES ('${title}', '${text}', '${image_path}')`
    );
    console.log("insert-------------");
    console.log(insertTest);
    res.render("book", { title: "Hyeok's Books" });
  }
);

/* Delete book */
router.post("/delete_book", async function (req, res, next) {
  //D (delete)
  /*let deleteTest = await executeQuery("DELETE FROM user");
  // let deleteTest = await executeQuery("DELETE FROM user WHERE user_index = 1");
  console.log("delete-------------");
  console.log(deleteTest);
*/
});

/* GET musical page */
router.get("/musical", async function (req, res, next) {
  //R (read)
  let selectTest = await executeQuery("SELECT * FROM musical");
  // let selectTest = await executeQuery("SELECT * FROM image WHERE image_index = 2");
  console.log("select-------------");
  console.log(selectTest);
  /*
  //U (update)
  let updateTest = await executeQuery("UPDATE list SET title = '노동 동요'");
  console.log("update-------------");
  console.log(updateTest);*/
  res.render("musical", { title: "Hyeok's Musicals" });
});

/* Post Musical data */
router.post(
  "/send_musical",
  upload.single("image"),
  async function (req, res, next) {
    var title = req.body.title;
    var text = req.body.text;
    var image_path = req.file.path;

    let insertTest = await executeQuery(
      `INSERT INTO musical (title, text, image_path) VALUES ('${title}', '${text}', '${image_path}')`
    );
    console.log("insert-------------");
    console.log(insertTest);
    res.render("msical", { title: "Hyeok's Musicals" });
  }
);

/* Delete musical */
router.post("/delete_muscial", async function (req, res, next) {
  //D (delete)
  /*let deleteTest = await executeQuery("DELETE FROM user");
  // let deleteTest = await executeQuery("DELETE FROM user WHERE user_index = 1");
  console.log("delete-------------");
  console.log(deleteTest);
*/
});

module.exports = router;
