
// 下方圖表
function chart(StockName1 = "台積電", StockName2 = "鴻海", data1 = [900, 600, 800, 810, 560, 550, 40, 50, 60, 70, 80, 1000], data2) {


    data2 = [300, 800, 1000, 110, 200, 400, 80, 20, 60, 90, 100, 500];
    Chart.defaults.color = '#FFFFFF';
    const ctx = document.getElementById('myChart');
    const labels = ['一月份', '二月份', '三月份', '四月份', '五月份', '六月份', '七月份', '八月份', '九月份', '十月份', '十一月份', '十二月份'];  // 设置 X 轴上对应的标签
    const data = {
        labels: labels,
        datasets: [{
            label: StockName1,
            data: data1,

            // fill: {
            //     target: 'origin', above: 'rgb(200, 200, 255,0.8)'
            // },
            borderColor: ['rgb(75, 192, 192)'], // 设置线的颜色
            tension: 0.1
        }, {
            label: StockName2,
            data: data2,

            // fill: {
            //     target: 'origin', above: 'rgb(240, 120, 0,0.8)'
            // },
            borderColor: ['rgb(255,255, 200)'], // 设置线的颜色
            tension: 0.1
        }],
    };
    const config = {
        type: 'line', // 设置图表类型
        data: data,
    };
    const myChart = new Chart(ctx, config);
}
chart(123, 456, data1 = [1000, 2, 3]);
//下方圖表


// 上方圖表
Chart.defaults.color = '#FFFFFF';
new Chart(document.getElementById("myChart1"), {
    type: 'line',
    data: {
        labels: ['2022/10', '2022/11', '2022/12', '2023/01', '2023/02', '2023/03', '2023/04', '2023/05', '2023/06', '2023/07', '2023/08', '2023/09'],

        datasets: [
            {
                label: '台股',
                data: [12949.75, 14879.55, 14137.69, 15265.20, 15503.79, 15868.06, 15579.18, 16578.96, 16915.54, 17145.43, 16634.51, 16619.14],
                backgroundColor: "#D200D2",
                borderColor: "#D200D2",
                label: '大盤指數',
            },
        ]
    }
});
// 上方圖表


// 搜尋股票
const addOptional_stock = document.getElementById('addOptional_stock');
const CloseBtn = document.getElementsByClassName('CloseBtn');
const Optional_stock_btn = document.getElementById('Optional_stock_btn');
$('.stock_search_btn').on('click', function () {
    // console.log(stock_search_input.value);
    SearchStock(stock_search_select.value);
})
// 搜尋股票

// 自選股表格
let uid = 100;
optional_stock(uid);
function optional_stock(x) {
    let url = "http://localhost:2407/Search/collect/" + x;
    $.ajax({
        url: `${url}`,
        type: "GET",
        success: function (res) {
            var res = JSON.parse(res);
            let optional_stock = document.getElementById('optional_stock');
            optional_stock.innerHTML = "";
            res.map(
                function (res, index) {
                    let UpDownValue;
                    if (res.UpDown == "+") {
                        UpDownValue = `<td style="color:red;">${res.UpDownPrice}</td>`
                    } else if (res.UpDown == "-") { UpDownValue = `<td style="color:green;">-${res.UpDownPrice}</td>` }
                    else {
                        UpDownValue = `<td>${res.UpDownPrice}</td>`
                    }
                    let temp = `
                    <tr>
                        <td><button onclick="deleteStock()" class="deleteStock" value="${res.StockNumber}" ></button></td>
                        <td>${index + 1}</td>
                        <td>${res.StockNumber}</td>
                        <td>${res.StockName}</td>
                        <td>${res.StockPrice}</td>
                        <td>${res.ClinchNumber}</td>` +
                        UpDownValue + `
                    </tr>

        `
                    optional_stock.innerHTML += temp;
                }
            )
            $('.deleteStock').on('click', function () {
                console.log($(this).val());
                StockNumber = $(this).val();
                deleteStock_detail(StockNumber)
                addOptional_stock.style.display = "block";
                overlay.style.visibility = "visible";
                Optional_stock_btn.innerText = '刪除自選股'

                // 刪除自選股
                Optional_stock_btn.onclick = function () {
                    var data = JSON.stringify({
                        StockNumber: parseInt(StockNumber),
                        CollectState: 0,
                        uid: 100
                    })
                    console.log(data)
                    $.ajax({
                        url: 'http://localhost:2407/update',
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        data: data,
                        success: function (res) {
                            console.log(res)
                            window.location.reload();
                        }, error: function (res) {
                            console.log(res)
                        },


                    })
                }
            })
        }
    })
}



// 自選股表格



// 加入自選股

// 加入自選股
document.getElementById('CloseBtn').addEventListener("click", function () {
    addOptional_stock.style.display = "none";
    RankDetail.style.display = "none";
    overlay.style.visibility = "hidden";
})

$('.deleteStock').on('click', function () {
    console.log($(this).parent().siblings().eq(1).text());
    x = $(this).parent().siblings().eq(1).text();
    deleteStock_detail(x)
    addOptional_stock.style.display = "block";
    overlay.style.visibility = "visible";
    Optional_stock_btn.innerText = '刪除自選股'
})
function deleteStock_detail(x) {
    let addOptional_stock_Content = document.getElementById('addOptional_stock_Content');
    let temp = "http://localhost:2407/Search/" + x;
    $.ajax({
        url: `${temp}`,
        type: "GET",
        success: function (res) {
            var res = JSON.parse(res);
            let UpDownPriceColor;
            if (res.length === 0) {
                alert("查無資料");
            } else {
                res[0];
                addOptional_stock.style.display = "block";
                overlay.style.visibility = "visible";
                Optional_stock_btn.innerText = '刪除自選股';
            }
            let UpDownValue;
            if (res[0].UpDown == "+") {
                UpDownValue = `<div style="color:red;">${res[0].UpDownPrice}</div>`
            } else if (res[0].UpDown == "-") { UpDownValue = `<div style="color:green;">-${res[0].UpDownPrice}</div>` }
            else {
                UpDownValue = `<div>${res[0].UpDownPrice}</div>`
            }
            addOptional_stock_Content.innerHTML = `
        <div class="title">${res[0].StockNumber}${res[0].StockName}</div>
        <hr>
        <div class="content">
            <div class="StockContent">
                <div>股價</div>
                <div>${res[0].StockPrice}</div>
            </div>
            <div class="StockContent">
                <div>成交量</div>
                <div>${res[0].ClinchNumber}</div>
            </div>
            <div class="StockContent">
                <div>漲幅</div>`
                + `${UpDownValue}` +
                `</div>
            <div class="StockContent">
                <div>公司產業</div>
                <div>${res[0].CompanyIndustry}</div>
            </div>
            <div class="StockContent">
                <div>股本(億)</div>
                <div>${res[0].CapitalStock}</div>
            </div>
            <div class="StockContent">
                <div>市值(億)</div>
                <div>${res[0].MarketValue}</div>
            </div>
            <div class="StockContent">
                <div>現金股利</div>
                <div>${res[0].CashDividend}</div>
            </div>
            <div class="StockContent">
                <div>除息日期</div>
                <div>${res[0].DividendDate}</div>
            </div>
        </div>
        `
        }
    })
}


// 刪除自選股





// 搜尋股票資料
function SearchStock(x) {
    let addOptional_stock_Content = document.getElementById('addOptional_stock_Content');
    let temp = "http://localhost:2407/Search/" + x;
    let uid = 100;
    $.ajax({
        url: `${temp}`,
        type: "GET",
        success: function (res) {
            var res = JSON.parse(res);

            if (res.length === 0) {
                alert("查無資料")
            } else {
                res[0];
                addOptional_stock.style.display = "block";
                overlay.style.visibility = "visible";
                Optional_stock_btn.innerText = '加入自選股';

            }
            var UpDownValue;
            if (res[0].UpDown == "+") {
                UpDownValue = `<div style="color:red;">${res[0].UpDownPrice}</div>`
            } else if (res[0].UpDown == "-") { UpDownValue = `<div style="color:green;">-${res[0].UpDownPrice}</div>` }
            else {
                UpDownValue = `<div>${res[0].UpDownPrice}</div>`
            }
            addOptional_stock_Content.innerHTML = `
        <div class="title">${res[0].StockNumber}${res[0].StockName}</div>
        <hr>
        <div class="content">
            <div class="StockContent">
                <div>股價</div>
                <div>${res[0].StockPrice}</div>
            </div>
            <div class="StockContent">
                <div>成交量</div>
                <div>${res[0].ClinchNumber}</div>
            </div>
            <div class="StockContent">
                <div>漲幅</div>`
                + `${UpDownValue}` +
                `</div>
            <div class="StockContent">
                <div>公司產業</div>
                <div>${res[0].CompanyIndustry}</div>
            </div>
            <div class="StockContent">
                <div>股本(億)</div>
                <div>${res[0].CapitalStock}</div>
            </div>
            <div class="StockContent">
                <div>市值(億)</div>
                <div>${res[0].MarketValue}</div>
            </div>
            <div class="StockContent">
                <div>現金股利</div>
                <div>${res[0].CashDividend}</div>
            </div>
            <div class="StockContent">
                <div>除息日期</div>
                <div>${res[0].DividendDate}</div>
            </div>
        </div>
        `
            // 加入自選股
            Optional_stock_btn.onclick = function () {
                let data = JSON.stringify({
                    "uid": uid,
                    "StockNumber": res[0].StockNumber
                })
                $.ajax({
                    url: " http://localhost:2407/CreateCollect",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    data: data,
                    success: function (res) {
                        console.log(res)
                        window.location.reload();
                    }

                })
            }
        }
    })
}

stock_search_select.onmousedown = function () {
    if (this.options.length > 4) {
        this.size = 4;
        stock_search_select.style.height = "auto";
    }
}
stock_search_select.onblur = function () {
    this.size = 0;
    stock_search_select.style.height = "100%"
}
stock_search_select.onchange = function () {
    this.size = 0;
    stock_search_select.style.height = "100%";

}
function select_search() {
    $.ajax({
        url: "http://localhost:2407/select",
        type: "GET",
        success: function (res) {
            var res = JSON.parse(res);
            stock_search_select = document.getElementById('stock_search_select');

            res.map(x => {
                let temp = `
<option value="${x.StockNumber}">${x.StockNumber}${x.StockName}</option><br>
`
                stock_search_select.innerHTML += temp;

            }
            );
        },
        // error: function () {
        //     alert("連線異常!")
        // },
    })
}
select_search();

// 搜尋股票資料

// 排名
const RankDetail = document.getElementById('RankDetail');
const RankDetail_title = document.getElementById('RankDetail_title');
$('.rank_five').on('click', function () {
    RankDetail.style.display = "block";
    overlay.style.visibility = "visible";
    RankDetail_title.innerText = this.innerText;
    if (this.innerText == "今日成交量前五名") {
        volume();
    } else if (this.innerText == "今日漲幅前五名") {
        up();
    } else if (this.innerText == "今日跌幅前五名") {
        down();
    } else {
        turnover();
    }
})
function down() {
    $.ajax({
        url: "http://localhost:2407/down",
        type: "GET",
        success: function (res) {
            var res = JSON.parse(res)
            console.log(res);
            var el = document.getElementById("tdRankDetail");
            var td = "";
            for (let i = 0; i < 5; i++) {
                var temp;
                if (res[i].UpDown == "+") {
                    temp = `<div style="color:red;">${res[i].UpDownPrice}</div>`
                } else if (res[i].UpDown == "-") { temp = `<div style="color:green;">-${res[i].UpDownPrice}</div>` }
                else {
                    temp = `<div>${res[i].UpDownPrice}</div>`
                }

                td = (
                    ` <div class="td">
                            <div>${res[i].Rank}</div>
                                <div>${res[i].StockNumber}</div>
                                <div>${res[i].StockName}</div>
                                <div>${res[i].StockPrice}</div>
                                <div>${res[i].ClinchNumber}</div>` + temp + `</div>`
                )
                el.innerHTML += td;
            }
        },
        // error: function () {
        //     alert("連線異常!")
        // },
    })
}
function volume() {
    $.ajax({
        url: "http://localhost:2407/volume",
        type: "GET",
        success: function (res) {
            var res = JSON.parse(res)
            var el = document.getElementById("tdRankDetail");
            var td = "";
            for (let i = 0; i < 5; i++) {
                var temp;
                if (res[i].UpDown == "+") {
                    temp = `<div style="color:red;">${res[i].UpDownPrice}</div>`
                } else if (res[i].UpDown == "-") { temp = `<div style="color:green;">-${res[i].UpDownPrice}</div>` }
                else {
                    temp = `<div>${res[i].UpDownPrice}</div>`
                }

                td = (
                    ` <div class="td">
                            <div>${res[i].Rank}</div>
                                <div>${res[i].StockNumber}</div>
                                <div>${res[i].StockName}</div>
                                <div>${res[i].StockPrice}</div>
                                <div>${res[i].ClinchNumber}</div>` + temp + `</div>`
                )
                el.innerHTML += td;
            }
        },
        // error: function () {
        //     alert("連線異常!")
        // },
    })
}
function up() {
    $.ajax({
        url: "http://localhost:2407/up",
        type: "GET",
        success: function (res) {
            var res = JSON.parse(res)
            console.log(res);
            var el = document.getElementById("tdRankDetail");
            var td = "";
            for (let i = 0; i < 5; i++) {
                var temp;
                if (res[i].UpDown == "+") {
                    temp = `<div style="color:red;">${res[i].UpDownPrice}</div>`
                } else if (res[i].UpDown == "-") { temp = `<div style="color:green;">-${res[i].UpDownPrice}</div>` }
                else {
                    temp = `<div>${res[i].UpDownPrice}</div>`
                }

                td = (
                    ` <div class="td">
                            <div>${res[i].Rank}</div>
                                <div>${res[i].StockNumber}</div>
                                <div>${res[i].StockName}</div>
                                <div>${res[i].StockPrice}</div>
                                <div>${res[i].ClinchNumber}</div>` + temp + `</div>`
                )
                el.innerHTML += td;
            }
        },
        // error: function () {
        //     alert("連線異常!")
        // },
    })
}
function turnover() {
    $.ajax({
        url: "http://localhost:2407/turnover",
        type: "GET",
        success: function (res) {
            var res = JSON.parse(res)
            console.log(res);
            var el = document.getElementById("tdRankDetail");
            var td = "";
            for (let i = 0; i < 5; i++) {
                var temp;
                if (res[i].UpDown == "+") {
                    temp = `<div style="color:red;">${res[i].UpDownPrice}</div>`
                } else if (res[i].UpDown == "-") { temp = `<div style="color:green;">-${res[i].UpDownPrice}</div>` }
                else {
                    temp = `<div>${res[i].UpDownPrice}</div>`
                }

                td = (
                    ` <div class="td">
                            <div>${res[i].Rank}</div>
                                <div>${res[i].StockNumber}</div>
                                <div>${res[i].StockName}</div>
                                <div>${res[i].StockPrice}</div>
                                <div>${res[i].ClinchNumber}</div>` + temp + `</div>`
                )
                el.innerHTML += td;
            }
        },
        // error: function () {
        //     alert("連線異常!")
        // },
    })
}
// 排名

// 排名關閉按鈕
document.getElementById('RankCloseBtn').addEventListener("click", function () {
    RankDetail.style.display = "none";
    overlay.style.visibility = "hidden";
    document.getElementById("tdRankDetail").innerHTML = "";
})
// 排名關閉按鈕


// PK的下拉選單
stock_pk_select.onmousedown = function () {
    if (this.options.length > 6) {
        this.size = 6;
        stock_pk_select.style.height = "auto";
    }
}
stock_pk_select.onblur = function () {
    this.size = 0;
    stock_pk_select.style.height = "100%"
}
stock_pk_select.onchange = function () {
    this.size = 0;
    stock_pk_select.style.height = "100%";
    let temp = "http://localhost:2407/Search/" + stock_pk_select.value;
    $.ajax({
        url: `${temp}`,
        type: "GET",
        success: function (res) {
            var res = JSON.parse(res);
            StockName1 = res[0].StockName;
            data1 = res[0].data;


            if (res.length === 0) {
                res[0] = "查無資料";
                console.log(res[0])

            } else {
                res[0];
                console.log(res[0])
            }
            const stock_pk_2_top_center0 = document.getElementById('stock_pk_2_top_center0');
            stock_pk_2_top_center0.innerHTML = `<div class="top">股票代號${res[0].StockNumber}</div><div class="bottom">${res[0].StockName}</div> `

            const stock_pk_2_center0 = document.getElementById('stock_pk_2_center0');
            stock_pk_2_center0.innerHTML = `<div class="center1">${res[0].CompanyIndustry}</div>
                <div class="center1">${res[0].CapitalStock}</div>
                <div class="center1">${res[0].MarketValue}</div> `


            const stock_pk_2_center1 = document.getElementById('stock_pk_2_center1');
            stock_pk_2_center1.innerHTML = `<div class="center1">${res[0].Eps}</div>
                <div class="center1">${res[0].PBRatio}</div>
                <div class="center1">${res[0].EpsYear}</div> `

            const stock_pk_2_center2 = document.getElementById('stock_pk_2_center2');
            stock_pk_2_center2.innerHTML = `<div class="center1">${res[0].StockDividends}</div>
                <div class="center1">${res[0].CashDividend}</div>
                <div class="center1">${res[0].DividendDate}</div> `

            const stock_pk_2_center3 = document.getElementById('stock_pk_2_center3');
            stock_pk_2_center3.innerHTML = `<div class="center1">${res[0].DebtRatio}</div>
                <div class="center1">${res[0].ROA}</div>
                <div class="center1">${res[0].ROE}</div> `

            chart(StockName1);



        },
        // error: function () {
        //     alert("資料錯誤")
        // }
    })
}
stock_pk_select2.onmousedown = function () {
    if (this.options.length > 6) {
        this.size = 6;
        this.style.height = "auto";
    }
}
stock_pk_select2.onblur = function () {
    this.size = 0;
    this.style.height = "100%"
}
stock_pk_select2.onchange = function () {
    this.size = 0;
    this.style.height = "100%";
    let temp = "http://localhost:2407/Search/" + stock_pk_select2.value;
    $.ajax({
        url: `${temp}`,
        type: "GET",
        success: function (res) {
            var res = JSON.parse(res);

            if (res.length === 0) {
                res[0] = "查無資料";
                console.log(res[0])

            } else {
                res[0];
                console.log(res[0])
            }
            const stock_pk_2_top_right0 = document.getElementById('stock_pk_2_top_right0');
            stock_pk_2_top_right0.innerHTML = `<div class="top">股票代號${res[0].StockNumber}</div><div class="bottom">${res[0].StockName}</div> `

            const stock_pk_2_right0 = document.getElementById('stock_pk_2_right0');
            stock_pk_2_right0.innerHTML = `<div class="right1">${res[0].CompanyIndustry}</div>
                <div class="right1">${res[0].CapitalStock}</div>
                <div class="right1">${res[0].MarketValue}</div> `


            const stock_pk_2_right1 = document.getElementById('stock_pk_2_right1');
            stock_pk_2_right1.innerHTML = `<div class="right1">${res[0].Eps}</div>
                <div class="right1">${res[0].PBRatio}</div>
                <div class="right1">${res[0].EpsYear}</div> `

            const stock_pk_2_right2 = document.getElementById('stock_pk_2_right2');
            stock_pk_2_right2.innerHTML = `<div class="right1">${res[0].StockDividends}</div>
                <div class="right1">${res[0].CashDividend}</div>
                <div class="right1">${res[0].DividendDate}</div> `

            const stock_pk_2_right3 = document.getElementById('stock_pk_2_right3');
            stock_pk_2_right3.innerHTML = `<div class="right1">${res[0].DebtRatio}</div>
                <div class="right1">${res[0].ROA}</div>
                <div class="right1">${res[0].ROE}</div> `



        },
        // error: function () {
        //     alert("資料錯誤")
        // }
    })

}
// PK的下拉選單
function select() {
    $.ajax({
        url: "http://localhost:2407/select",
        type: "GET",
        success: function (res) {
            var res = JSON.parse(res);
            stock_pk_select = document.getElementById('stock_pk_select');
            stock_pk_select2 = document.getElementById('stock_pk_select2');
            res.map(x => {
                let temp = `
<option value="${x.StockNumber}">${x.StockNumber}${x.StockName}</option><br>
`
                stock_pk_select.innerHTML += temp;
                stock_pk_select2.innerHTML += temp;
            }
            );
        },
        error: function () {
            alert("連線異常!")
        },
    })
}
select();
// PK的下拉選單
