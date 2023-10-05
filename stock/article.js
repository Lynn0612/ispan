var express = require('express');
var articleRouter = express.Router();
var myDBconn = require('./app');

var bp = require('body-parser');
var up = bp.urlencoded({ extended: true });

articleRouter.use(express.urlencoded({ extended: true }));


articleRouter.get('/', function (req, res) {
    var uid = req.session.user ? req.session.user.uid : 0
        myDBconn.query(`SELECT a.*, (SELECT count(*) FROM message m WHERE m.aid = a.aid) as message_count,(SELECT count(*) FROM likes WHERE likes.article_id=a.aid) as likes_count,(SELECT count(*) FROM likes WHERE article_id=a.aid AND user_id=?) as likeState,(SELECT count(*) FROM message WHERE aid=a.aid AND user_id=?) as comState FROM article a;`, [uid,uid], function (err, data) {
            // article全部,留言數量,按讚數量
            res.render('article', {
                name: '全部文章',
                data: data
            })
        })
})

articleRouter.get('/novice', function (req, res) {
    var uid = req.session.user ? req.session.user.uid : 0
    var chs = 'novice%';
    myDBconn.query(`SELECT a.*, (SELECT count(*) FROM message m WHERE m.aid = a.aid) as message_count,(SELECT count(*) FROM likes WHERE likes.article_id=a.aid) as likes_count,(SELECT count(*) FROM likes WHERE article_id=a.aid AND user_id=?) as likeState,(SELECT count(*) FROM message WHERE aid=a.aid AND user_id=?) as comState FROM article a WHERE tag LIKE ?`, [uid,uid,chs], function (err, data) {
        res.render('article', {
            name: '新手教學',
            data: data
        })
    })
})

articleRouter.get('/news', function (req, res) {
    var uid = req.session.user ? req.session.user.uid : 0
    var chs = 'news%';
    myDBconn.query(`SELECT a.*, (SELECT count(*) FROM message m WHERE m.aid = a.aid) as message_count,(SELECT count(*) FROM likes WHERE likes.article_id=a.aid) as likes_count,(SELECT count(*) FROM likes WHERE article_id=a.aid AND user_id=?) as likeState,(SELECT count(*) FROM message WHERE aid=a.aid AND user_id=?) as comState FROM article a WHERE tag LIKE ?`, [uid,uid,chs], function (err, data) {
        res.render('article', {
            name: '最新消息',
            data: data
        })
    })
})


articleRouter.get('/likes', function (req, res) {
    var uid = req.session.user ? req.session.user.uid : 0
    myDBconn.query(`SELECT likes.user_id, article.*,(SELECT count(*) FROM message m WHERE m.aid = article.aid) as message_count,(SELECT count(*) FROM likes WHERE likes.article_id=article.aid) as likes_count,(SELECT count(*) FROM likes WHERE article_id=article.aid AND user_id=?) as likeState,(SELECT count(*) FROM message WHERE aid=article.aid AND user_id=?) as comState FROM likes JOIN article ON likes.article_id = article.aid WHERE user_id = ?;`, [uid,uid,uid], function (err, data) {
        res.render('article', {
            name: '收藏文章',
            data: data
        })
    })
})


//內頁
articleRouter.get('/inside/:tag', function (req, res) {
    myDBconn.query(`SELECT * FROM article WHERE tag=?`, [req.params.tag], function (err, data) { //data為該文章內容
        myDBconn.query(`SELECT * FROM message WHERE aid=?`, [data[0].aid], function (err, msg) { //msg為該文章留言內容
            myDBconn.query("SELECT count(*) AS likes_count FROM `likes` WHERE article_id=?;", [data[0].aid], function (err, likes) { //likes為按讚數量
                var likeUid = req.session.user ? req.session.user.uid : 0  //有登入抓uid判斷有無按讚，沒登入帶0以免找不到uid報錯
                myDBconn.query("SELECT * FROM `likes` WHERE article_id=? AND user_id=?", [data[0].aid, likeUid], function (err, likeData) { //likeData為查詢uid跟文章id
                    var creatTime = data[0].creat_time.toLocaleString();
                    res.render('InsidePages', {
                        title: data[0].title,          //標題
                        content: data[0].content,      //內容
                        likes: likes[0].likes_count,   //按讚數量
                        creatTime: creatTime,          //發文時間
                        msgHave: msg[0],                //判斷有無留言
                        msg: msg,                      //留言內容
                        tag: req.params.tag,           //文章標籤
                        state: likeData[0],             //判斷有無按讚
                        userHave: req.session.user      //判斷有無登入
                    })
                })
            })
        })
    })
})

//message
articleRouter.post('/inside/:tag', up, function (req, res) {
    myDBconn.query(`SELECT * FROM article WHERE tag=?`, [req.params.tag], function (err, data) {
        var name = req.session.user ? req.session.user.name : 0;
        var userId=req.session.user ? req.session.user.uid : 0;
        myDBconn.query("INSERT INTO message (user_id,username, message, created_at, aid) VALUES (?,?, ?, current_timestamp(), ?)", [userId,name, req.body.msg, data[0].aid],
            function (err, results) {
                res.end(
                    JSON.stringify(('update success'))
                )
            });
    })
})


// likes
articleRouter.post('/inside/:tag/likes', up, function (req, res) {
    myDBconn.query("SELECT * FROM `member` WHERE account=?;", [req.body.account], function (err, memberData) {
        myDBconn.query(`SELECT * FROM article WHERE tag=?`, [req.params.tag], function (err, articleData) {
            myDBconn.query("SELECT * FROM `likes` WHERE user_id=? AND article_id=?;", [memberData[0].uid, articleData[0].aid], function (err, data) {
                var sql = data[0] ? "DELETE FROM likes WHERE `likes`.`id` = ?" : "INSERT INTO `likes` (`user_id`, `article_id`) VALUES (?, ?);";
                var val = data[0] ? [data[0].id] : [memberData[0].uid, articleData[0].aid];
                myDBconn.query(sql, val, function (err, results) {
                    res.end(
                        JSON.stringify(('update success'))
                    )
                })
            })
        })
    })
})

module.exports = articleRouter;