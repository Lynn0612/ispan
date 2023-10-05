// http://localhost/phpmyadmin/
// http://127.0.0.1:2407/
// http://127.0.0.1:2407/article  //文章頁面路徑

var express = require('express');
var app = express();
app.use(express.json());

//session
var session = require('express-session');
app.use(session({
    secret: 'user',
    resave: false,
    saveUninitialized: false,
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 180 * 60 * 1000
    }
}))


var cors = require('cors');
var x = cors();
app.use(x);
const port = 2407;

app.listen(port, function () {
    console.log('伺服器啟動中' + new Date().toLocaleTimeString());
})


var mysql = require('mysql');
var myDBconn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'stock',
    multipleStatements: true,
})

myDBconn.connect(function (err) {
    if (err) {
        console.log('資料庫有問題:');
        console.log(err);
    } else {
        console.log('資料庫Ok');
    }
})



//輸出資料庫
module.exports = myDBconn;

//ejs
app.set('view engine', 'ejs');

//靜態檔設定
app.use(express.static('public'));

//index路由
app.get('/', function (req, res) {
    myDBconn.query(`SELECT * FROM article`, [], function (err, data) {
        res.render('index.ejs', {
            title: data[0].title,
            body: data[0].content,
            tag: data[0].tag,
            title1: data[1].title,
            body1: data[1].content,
            tag1: data[1].tag,
            title2: data[2].title,
            body2: data[2].content,
            tag2: data[2].tag
        })
    })
})
//article路由
var articleRouter = require('./article')
app.use('/article', articleRouter)

//stock路由
app.get('/stock', function (req, res) {
    res.render('stock.ejs')
})

//about路由
app.get('/about', function (req, res) {
    res.render('about.ejs')
})
// forget路由
app.get('/forget', function (req, res) {
    res.render('forget.ejs')
})


//member路由
app.get('/member', function (req, res) {
    myDBconn.query('SELECT * FROM member WHERE uid = ?', [req.session.user.uid], function (err, data) {
        res.render('member.ejs', {
            name: data[0].name,
            account: data[0].account
        })
    })
})


// 註冊
app.post('/register', (req, res) => {
    const { name, account, password } = req.body;

    //將註冊數據 寫入資料庫
    const sql = 'INSERT INTO member (name,account,password) VALUES (?, ?, ?)';
    myDBconn.query(sql, [name, account, password], (err, results) => {
        if (err) {
            console.error('Error inserting user data: ' + err.stack);
            res.json({ success: false });
        } else {
            console.log('User registered successfully.');
            res.json({ success: true });
        }
    });
});
// 登入
app.post('/login', (req, res) => {
    const { account, password } = req.body;

    // 在此查詢用戶帳號及密碼
    const sql = 'SELECT * FROM member WHERE account = ? AND password = ?';
    myDBconn.query(sql, [account, password], (err, results) => {
        if (err) {
            console.error('Error querying user data: ' + err.stack);
            res.json({ success: false });
        } else {
            if (results.length > 0) {
                console.log('登入成功');
                req.session.user = {
                    uid: results[0].uid,
                    name: results[0].name,
                    account: results[0].account,
                    password: results[0].password
                }
                res.json({ success: true, uid: results[0].uid, name: results[0].name, account: results[0].account });
            } else {
                console.log('Login failed. Invalid credentials.');
                res.json({ success: false });
            }
        }
    });
});


// 登出
app.get('/reset-session', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        } else {
            console.log('Session destroyed');
        }
    });
});


// 驗證密碼是否匹配
// app.get('/checkPassword', (req, res) => {
//     myDBconn.query('SELECT * FROM member WHERE name = ? AND password = ?', [name, oldPassword], (err, results) => {
//         if (err) {
//             console.error('查詢錯誤:', err);
//             res.status(500).json({ success: false, message: '密碼更改失敗' });
//         } else if (results.length === 0) {
//             res.status(401).json({ success: false, message: '舊密碼不正確' });
//         } else {

            // 修改密碼
            // app.post('/changePassword', (req, res) => {
            //     const { name, newPassword } = req.body;
                // 更新密碼
//                 myDBconn.query('UPDATE member SET password = ? WHERE name = ?', [newPassword, name], (err) => {
//                     if (err) {
//                         console.error('更新密碼錯誤:', err);
//                         res.status(500).json({ success: false, message: '密碼更改失敗' });
//                     } else {
//                         res.json({ success: true, message: '密碼已成功更改' });
//                     }
//                 });
//             })
//         }
//     })
// })




// 成交量前5名
app.get("/volume", function (req, res) {
    myDBconn.query("Select * From volume join stock_total on volume.StockNumber = stock_total.StockNumber ORDER BY `volume`.`Rank`; ", [],
        function (err, rows) {
            res.send(JSON.stringify(rows));
        }
    )
})
// 漲幅前5名
app.get("/up", function (req, res) {
    myDBconn.query("Select * From up join stock_total on up.StockNumber = stock_total.StockNumber ORDER BY `up`.`Rank`; ", [],
        function (err, rows) {
            res.send(JSON.stringify(rows));
        }
    )
})
// 跌幅前5名
app.get("/down", function (req, res) {
    myDBconn.query("Select * From down join stock_total on down.StockNumber = stock_total.StockNumber ORDER BY `down`.`Rank`; ", [],
        function (err, rows) {
            res.send(JSON.stringify(rows));
        }
    )
})
// 成交金額前五名
app.get("/turnover", function (req, res) {
    myDBconn.query("Select * From turnover join stock_total on turnover.StockNumber = stock_total.StockNumber ORDER BY `turnover`.`Rank`; ", [],
        function (err, rows) {
            res.send(JSON.stringify(rows));
        }
    )
})
// 查詢股票名稱及代號
app.get("/select", function (req, res) {
    myDBconn.query("SELECT * FROM `stock_total` ORDER BY `StockNumber` DESC", [],
        function (err, rows) {
            res.send(JSON.stringify(rows));
        }
    )
})

// 查詢該股票詳細資料
app.get("/Search/:id", function (req, res) {
    myDBconn.query("SELECT * FROM `stock_total`WHERE StockNumber = ? ; ", [req.params.id],
        function (err, rows) {
            res.send(JSON.stringify(rows))
        }
    )
})

//新增自選股
app.post("/CreateCollect", function (req, res) {
    myDBconn.query("INSERT INTO `collect` ( `uid`, `StockNumber`) VALUES  (?, ?)",
        [req.body.uid, req.body.StockNumber],
        function (err, rows) {
            if (rows.affectedRows) {
                res.end(
                    JSON.stringify(('update success'))
                )
            } else {
                res.end(
                    JSON.stringify(('update failed'))
                )
            }
        }
    )
})
//刪除自選股
app.post("/update", function (req, res) {
    myDBconn.query("update `collect` set  CollectState = ? where StockNumber = ? AND uid = ? ",
        [req.body.CollectState, req.body.StockNumber, req.body.uid],
        function (err, rows) {
            if (rows.affectedRows) {
                res.end(
                    JSON.stringify(('update success'))
                )
            } else {
                res.end(
                    JSON.stringify(('update failed'))
                )
            }
        }

    )
})

//查詢自選股
app.get("/Search/collect/:id", function (req, res) {
    myDBconn.query("Select * From collect LEFT join stock_total on collect.StockNumber = stock_total.StockNumber LEFT join member on member.uid = collect.uid WHERE  collect.uid=? AND Collect.CollectState='1' ", [req.params.id],
        function (err, rows) {
            res.send(JSON.stringify(rows));
        }
    )
})

//查詢自選股有被新增
app.get("/Search/collect/:id/:number", function (req, res) {
    myDBconn.query("Select * From collect LEFT join stock_total on collect.StockNumber = stock_total.StockNumber LEFT join member on member.uid = collect.uid WHERE collect.uid=? AND stock_total.StockNumber=? ORDER BY `collect`.`CollectState` DESC;", [req.params.id, req.params.number],
        function (err, rows) {
            res.send(JSON.stringify(rows));
        }
    )
})


//串email 
// const express = require('express');
// const app = express();

// const PORT = process.env.PORT || 2407;

//Middleware
app.use(express.static('publics'))

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/public/about.ejs')
})

app.get("/square_box", function (req, res) {
    myDBconn.query("Select * From turnover join stock_total on turnover.StockNumber = stock_total.StockNumber ORDER BY `turnover`.`Rank`; ", [],
        function (err, rows) {
            res.send(JSON.stringify(rows));
        }
    )
})
// app.listen(PORT,()=>{
//     console.log(`Server running on port ${PORT}`)
// })
