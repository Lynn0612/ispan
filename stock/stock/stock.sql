-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2023-09-14 05:13:22
-- 伺服器版本： 10.4.28-MariaDB
-- PHP 版本： 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `stock`
--

-- --------------------------------------------------------

--
-- 資料表結構 `collect`
--

CREATE TABLE `collect` (
  `CollectID` int(10) NOT NULL,
  `uid` int(11) NOT NULL,
  `StockNumber` varchar(10) NOT NULL,
  `CollectState` varchar(10) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 傾印資料表的資料 `collect`
--

INSERT INTO `collect` (`CollectID`, `uid`, `StockNumber`, `CollectState`) VALUES
(8, 101, '2405', '1'),
(43, 100, '9910', '1');

-- --------------------------------------------------------

--
-- 資料表結構 `down`
--

CREATE TABLE `down` (
  `Rank` varchar(100) NOT NULL,
  `StockNumber` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `down`
--

INSERT INTO `down` (`Rank`, `StockNumber`) VALUES
('3', '2482'),
('2', '2538'),
('1', '3043'),
('5', '3416'),
('4', '8467');

-- --------------------------------------------------------

--
-- 資料表結構 `member`
--

CREATE TABLE `member` (
  `uid` int(11) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `account` varchar(50) NOT NULL,
  `password` varchar(1024) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `member`
--

INSERT INTO `member` (`uid`, `name`, `account`, `password`) VALUES
(100, 'hank', 'hank', 'hank');

-- --------------------------------------------------------

--
-- 資料表結構 `stock_total`
--

CREATE TABLE `stock_total` (
  `StockNumber` varchar(100) NOT NULL,
  `StockName` varchar(100) NOT NULL,
  `StockPrice` varchar(100) NOT NULL,
  `ClinchNumber` varchar(100) NOT NULL,
  `UpDown` varchar(100) NOT NULL,
  `UpDownPrice` varchar(100) NOT NULL,
  `CompanyIndustry` varchar(100) NOT NULL,
  `CapitalStock` varchar(100) NOT NULL,
  `MarketValue` varchar(100) NOT NULL,
  `StockDividends` varchar(100) NOT NULL,
  `CashDividend` varchar(100) NOT NULL,
  `DividendDate` varchar(100) NOT NULL,
  `Eps` varchar(100) NOT NULL,
  `PBRatio` varchar(100) NOT NULL,
  `EpsYear` varchar(100) NOT NULL,
  `DebtRatio` varchar(100) NOT NULL,
  `ROA` varchar(100) NOT NULL,
  `ROE` varchar(100) NOT NULL,
  `data` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `stock_total`
--

INSERT INTO `stock_total` (`StockNumber`, `StockName`, `StockPrice`, `ClinchNumber`, `UpDown`, `UpDownPrice`, `CompanyIndustry`, `CapitalStock`, `MarketValue`, `StockDividends`, `CashDividend`, `DividendDate`, `Eps`, `PBRatio`, `EpsYear`, `DebtRatio`, `ROA`, `ROE`, `data`) VALUES
('00919', '群益台灣精選高息', '21.12', '111,837', '-', '0.08', 'ETF', '234', '241.13', '-', '1.08', '2023-09-18', '-', '-', '-', '-', '-', '-', '[13148,29259,44117,30549,27808,249744,115491,151047,145368]'),
('00929', '復華台灣科技優息', '17.54', '28,972', '-', '0.06', 'ETF', '-', '-', '0', '0.11', '2023-09-19', '-', '-', '-', '-', '-', '-', '[123056,310029,585277,156985,452368,354624,215635,654213,254321]'),
('2330', '台積電', '539', '15,234', '-', '3', '半導體', '2593.2 ', '13980', '-', '3.00', '2023-12-14', '14.55', '4.41', '14.99', '37.75%', '7.79%', '12.61%', '[620224,689581,553886,558359,745122,537092,551359,558741,530123,556954]'),
('2358', '廷鑫', '14.20', '26,234', '+', '1.25', '其他', '13.66', '19.40', '-', '0.2736', '2022-11-22', '-', '1', '-1.51', '53.24%', '-4.57%', '-10.93%', '[44599,23454,10586,11111,13000,8903,9708,6141,10453]'),
('2363', '矽統', '37.40', '96,667', '+', '0.60', '半導體', '74.96', '283.34', '-', '1.00', '2023-07-07', '48.31', '1.57', '0.65', '4.66%', '4.47%', '4.60%', '[11829,31023,27834,14003,12171,17813,42652,1014206,963526]'),
('2376', '技嘉', '307.5', '34,296', '-', '7.0', '電腦週邊', '63.57', '1,954.74', '-', '6.20', '2023-08-03', '45.38', '5.75', '6.93', '42.69%', '3.04%', '5.48%', '[71779,80665,93649,56340,261069,429248,611113,623859,610115]'),
('2382', '廣達', '242.0', '47,856', '-', '10.0', '電腦週邊', '386.26', '9,347.56', '-', '6.00', '2023-04-14', '27.88', '5.93', '4.31', '77.2%', '2.72%', '9.68%', '[52345,60383,124490,153262,465701,631464,1304909,1818692,1206532]'),
('2405', '輔信', '15.15', '22,620', '+', '15.15', '電腦週邊', '34.34', '52.03', '-', '0.20', '2023-07-25', '281', '1.17', '0.06', '16.63%', '0.19%', '0.2%', '[4838,15517,15822,15139,11972,58022,131987,37072,53012]'),
('2482', '連宇', '46.65', '3,757', '-', '3.55', '其他電子', '7.79', '36.33', '-', '1.50', '2023-07-18', '12.74', '3.38', '3.99', '25.36%', '11.31%', '15.48%', '[44964,120708,263744,93600,108179,162597,55302,27658,53654]'),
('2538', '基泰', '13.35', '2,880', '-', '1.45', '營建', '43.84', '58.53', '-', '0.50', '2023-07-04', '9.19', '1.06', '1.61', '68.16%', '8.35%', '26.4%', '[3090,4083,6023,4028,5960,2989,4036,17002,15023]'),
('2630', '亞航', '40.45', '25,367', '+', '3.55', '航運', '20.84', '84.28', '-', '0.36', '2023-03-23', '-', '3', '-0.16', '62.12%', '-0.06%', '-1.34%', '[436,2687,14239,36678,150601,163307,70386,10629,80365]'),
('3035', '智原', '360.0', '23,993', '-', '9.5', '半導體', '24.86', '894.78', '-', '5.00', '2023-06-15', '45.06', '10.59', '8.2', '34.42%', '6.35%', '9.66%', '[93412,347880,343329,164048,140563,269075,504407,377019,406546]'),
('3043', '科風', '52.1', '2,903', '-', '5.7', '其他電子', '3.9', '20.31', '0.70', '1.10', '2011-11-14', '20.28', '4.71', '2.22', '72.02%', '5.07%', '15.52%', '[1122,3451,5044,4531,9047,12305,6618,42964,30125]'),
('3231', '緯創', '109.00', '53,678', '-', '1.00', '電腦/周邊設備', '289.98', '3,189.79', '-', '2.60', '0000-00-00', '27.99', '33.51', '1.23', '73.94%', '2.32%', '5.75%', '[67128,89339,394026,466876,1014280,1283636,1160118,2165038,2363208]'),
('3416', '融程電', '120.0', '868', '-', '8.5', '電腦週邊', '7.68', '92.20', '-', '4.76', '2023-06-30', '18.41', '3.62', '3.47', '31.68%', '6.85%', '9.85%', '[704,6042,13425,7438,11546,5361,9315,8129,7123]'),
('3715', '定穎投控', '68.8', '99,106', '+', '68.8', '電子零組件', '27.76', '190.95', '-', '2.61', '2023-07-13', '32.59', '21.69', '1.20', '69.76%', '2.44%', '5.56%', '[4627,7063,93199,85084,162000,79294,116621,330085]'),
('6451', '訊芯-KY', '107.5', '1781', '+', '9.70', '半導體', '10.75', '115.52', '-', '1.17', '2023-07-27', '36.95', '1.7', '0.76', '54.55%', '1.45%', '2.09%', '[4302,5802,5510,4319,9793,15429,39035,10286,12635]'),
('8467', '波力-KY', '72.6', '369', '-', '5.3', '運動休閒', '5.12', '35.96', '-', '3.00', '2022-12-22', '11.39', '2.15', '6.84', '48.31%', '5.31%', '9.58%', '[216,386,1508,701,576,986,3415,2194,3012]'),
('9910', '豐泰', '195.50', '6,735', '+', '17.50', '運動休閒', '98.7', '1931', '1.2', '7.70', '2023-08-03', '24.62', '7.61', '2.06', '50.17%', '4.47%', '8.93%', '[45194,47327,23146,15989,43668,32414,35299,27885,36985]');

-- --------------------------------------------------------

--
-- 資料表結構 `turnover`
--

CREATE TABLE `turnover` (
  `Rank` varchar(100) NOT NULL,
  `StockNumber` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `turnover`
--

INSERT INTO `turnover` (`Rank`, `StockNumber`) VALUES
('4', '2330'),
('2', '2376'),
('1', '2382'),
('3', '3035'),
('5', '3715');

-- --------------------------------------------------------

--
-- 資料表結構 `up`
--

CREATE TABLE `up` (
  `Rank` varchar(100) NOT NULL,
  `StockNumber` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `up`
--

INSERT INTO `up` (`Rank`, `StockNumber`) VALUES
('4', '2358'),
('3', '2405'),
('5', '2630'),
('1', '6451'),
('2', '9910');

-- --------------------------------------------------------

--
-- 資料表結構 `volume`
--

CREATE TABLE `volume` (
  `Rank` varchar(100) NOT NULL,
  `StockNumber` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `volume`
--

INSERT INTO `volume` (`Rank`, `StockNumber`) VALUES
('2', '00919'),
('1', '00929'),
('4', '2363'),
('5', '3231'),
('3', '3715');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `collect`
--
ALTER TABLE `collect`
  ADD PRIMARY KEY (`CollectID`);

--
-- 資料表索引 `down`
--
ALTER TABLE `down`
  ADD PRIMARY KEY (`StockNumber`);

--
-- 資料表索引 `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`uid`);

--
-- 資料表索引 `turnover`
--
ALTER TABLE `turnover`
  ADD PRIMARY KEY (`StockNumber`);

--
-- 資料表索引 `up`
--
ALTER TABLE `up`
  ADD PRIMARY KEY (`StockNumber`);

--
-- 資料表索引 `volume`
--
ALTER TABLE `volume`
  ADD PRIMARY KEY (`StockNumber`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `collect`
--
ALTER TABLE `collect`
  MODIFY `CollectID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `member`
--
ALTER TABLE `member`
  MODIFY `uid` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
