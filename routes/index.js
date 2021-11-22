var express = require("express");
var router = express.Router();
const mariadb = require("mariadb");

//mariadb 연결
let pool = mariadb.createPool({
  host: "127.0.0.1",
  database: "test",
  port: "3309",
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
  res.render("index", { title: "Express" });
});

// send = 값만 보내는 거, rnder = page를 보내는 거
router.get("/hello_world", function (req, res, next) {
  res.render("hello_world", {
    title: "Express",
    name: "이혁기",
    age: "24",
  });
});

module.exports = router;
