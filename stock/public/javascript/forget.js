var express = require('express');
var forgetrouter = express.Router();
var nodemailer = require('nodemailer');
var myDBconn = require('../../app');
var connection = null;

forgetrouter.post('/forget', (req, res) => {
    if (req.body.email === undefined) {
        res.send({
            code: 400,
            msg: '必填參數不能為空，請仔細檢查'
        })
    } else {
        // 資料庫連接
        connection = myDBconn.createConnection();
        connection.connect();
        var result1
        var sql = "SELECT * From member Where email = ?"
        var params = req.body.email
        connection.query(sql, params, (err, result) => {
            if (err) {
                console.log('查詢忘記秘密碼信箱數據異常')
                return
            } else {
                if (result.length !== 0) {
                    forget(req.body.mail, result[0].name, result[0].password,req)
                    result1 = {
                        code: 200,
                        msg: '您的個人訊息已發送至您的信箱，請注意查收!'
                    }
                } else {
                    result1 = {
                        code: 401,
                        msg: '暫無此用戶，請先去註冊!'
                    }
                }
            }
            // 返回結果
            res.send(result1)
            connection.end();
        })
    }
})
// 發送信箱找回密碼
function forget(email, name, password, req) {
    let transporter = nodemailer.createTransport({
        host: 'Gmail',
        // secure: true,
        // port: 3306,
        auth: {
            user: 'a0977355994@gmail.com', //信箱
            pass: '!ji394su3520' //信箱密碼
        }
    })
    //3.發送郵件
    let mailOptions = {
        from: 'a0977355994@gmail.com', // 寄件者
        to: email, // 收件者
        subject: '忘記密碼找回', // 信件標題
        html: `用戶名:<b>${name}</b>，<br>信箱:<b>${email}</b>，<br>密碼:<b>${password}</b>，<br>請妥善保管您的個人信息!</b>`
    };
    //4.判斷發送是否成功
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log('發送異常' + err);
        } else {
            let data = {
                code: 200,
                msg: '驗證發送成功',
            }
            res.send(data);
        }
    })
}
module.exports = forgetrouter;