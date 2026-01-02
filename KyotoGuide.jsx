import React, { useMemo, useState } from "react";
import { MapPin, Clock, Star, Train, Info } from "lucide-react";

const PLACES_DATA = [
  // A1 Curry
  { id: "c1", category: "A", subCategoryId: "1", subCategory: "Curry", name: "森林食堂", rating: 3.86, transport: "JR二條", description: "植物系香料咖哩" },
  { id: "c2", category: "A", subCategoryId: "1", subCategory: "Curry", name: "Garam Masala", rating: 3.75, transport: "一乘寺", description: "激戰區霸主" },
  { id: "c3", category: "A", subCategoryId: "1", subCategory: "Curry", name: "Kara-Kusa Curry", rating: 3.53, transport: "四條", description: "歐風半半咖哩" },
  { id: "c4", category: "A", subCategoryId: "1", subCategory: "Curry", name: "Spice Chamber", rating: 3.78, transport: "四條", description: "辛辣Keema" },
  { id: "c7", category: "A", subCategoryId: "1", subCategory: "Curry", name: "Koisus", rating: 3.68, transport: "祇園四條", description: "祇園隱藏名店" },
  { id: "c8", category: "A", subCategoryId: "1", subCategory: "Curry", name: "Kamal", rating: 3.72, transport: "烏丸御池", description: "激辣牛肉與奶油雞" },
  { id: "c9", category: "A", subCategoryId: "1", subCategory: "Curry", name: "Karil", rating: 3.69, transport: "丸太町", description: "黃金比例香料" },
  { id: "c10", category: "A", subCategoryId: "1", subCategory: "Curry", name: "Songbird Coffee", rating: 3.62, transport: "二條城前", description: "鳥巢咖哩" },
  { id: "c11", category: "A", subCategoryId: "1", subCategory: "Curry", name: "近江屋清右衛門", rating: 3.58, transport: "丸太町", description: "歐風牛筋" },
  { id: "c12", category: "A", subCategoryId: "1", subCategory: "Curry", name: "Curry Plant", rating: 3.55, transport: "四條", description: "京鴨香料咖哩" },
  // A2 Donburi
  { id: "d1", category: "A", subCategoryId: "2.1", subCategory: "Donburi", name: "五機元", rating: 3.55, transport: "四條", description: "海鮮丼午餐" },
  { id: "d2", category: "A", subCategoryId: "2.2", subCategory: "Donburi", name: "天丼 Makino", rating: 3.58, transport: "河原町", description: "豪邁天丼" },
  { id: "d3", category: "A", subCategoryId: "2.4", subCategory: "Donburi", name: "Hisago", rating: 3.62, transport: "東山安井", description: "老舖親子丼" },
  { id: "d4", category: "A", subCategoryId: "2.4", subCategory: "Donburi", name: "鳥岩楼", rating: 3.58, transport: "千本今出川", description: "午餐限定親子丼" },
  { id: "d5", category: "A", subCategoryId: "2.2", subCategory: "Donburi", name: "天周", rating: 3.7, transport: "祇園四條", description: "穴子天丼" },
  { id: "d6", category: "A", subCategoryId: "2.3", subCategory: "Donburi", name: "Okaru", rating: 3.65, transport: "祇園四條", description: "起司豬排丼" },
  { id: "d7", category: "A", subCategoryId: "2.1", subCategory: "Donburi", name: "Totoya", rating: 3.68, transport: "梅小路", description: "鮪魚丼" },
  { id: "d10", category: "A", subCategoryId: "2.4", subCategory: "Donburi", name: "Hashidate", rating: 3.58, transport: "京都站", description: "鯛魚丼" },
  { id: "d8", category: "A", subCategoryId: "2.3", subCategory: "Donburi", name: "Steak Otsuka", rating: 3.82, transport: "嵐山", description: "夢幻和牛丼" },
  { id: "d9", category: "A", subCategoryId: "2.1", subCategory: "Donburi", name: "Uokeya U", rating: 3.78, transport: "祇園四條", description: "米其林鰻魚桶" },
  // A3 Pork Cutlet
  { id: "p1", category: "A", subCategoryId: "3", subCategory: "Pork Cutlet", name: "空蟬亭", rating: 3.92, transport: "千本丸太町", description: "低溫熟成粉紅豬排" },
  { id: "p2", category: "A", subCategoryId: "3", subCategory: "Pork Cutlet", name: "Katsukura", rating: 3.5, transport: "京都市役所", description: "名代炸豬排本店" },
  { id: "p3", category: "A", subCategoryId: "3", subCategory: "Pork Cutlet", name: "Tonkatsu Yamamoto", rating: 3.65, transport: "京都市役所", description: "老店豬排與可樂餅" },
  { id: "p5", category: "A", subCategoryId: "3", subCategory: "Pork Cutlet", name: "Katsudony", rating: 3.55, transport: "銀閣寺", description: "平價厚切" },
  { id: "p6", category: "A", subCategoryId: "3", subCategory: "Pork Cutlet", name: "Butagorira", rating: 3.6, transport: "丸太町", description: "大份量定食" },
  { id: "p7", category: "A", subCategoryId: "3", subCategory: "Pork Cutlet", name: "Daigo", rating: 3.68, transport: "西院", description: "薄麵衣名店" },
  { id: "p8", category: "A", subCategoryId: "3", subCategory: "Pork Cutlet", name: "Kimukatsu", rating: 3.45, transport: "四條", description: "千層豬排" },
  { id: "p9", category: "A", subCategoryId: "3", subCategory: "Pork Cutlet", name: "Tonkatsu Masuda", rating: 3.72, transport: "京都市役所", description: "必比登推薦" },
  { id: "p10", category: "A", subCategoryId: "3", subCategory: "Pork Cutlet", name: "Tonkatsu Ganko", rating: 3.48, transport: "京都站", description: "車站內景觀佳" },
  { id: "p11", category: "A", subCategoryId: "3", subCategory: "Pork Cutlet", name: "Katsuriki", rating: 3.65, transport: "今出川", description: "西陣厚切名店" },
  // A4 Hamburg Steak
  { id: "hb1", category: "A", subCategoryId: "4", subCategory: "Hamburg Steak", name: "東洋亭 本店", rating: 3.65, transport: "北山", description: "百年鋁箔漢堡排" },
  { id: "hb2", category: "A", subCategoryId: "4", subCategory: "Hamburg Steak", name: "Hamburg Labo", rating: 3.58, transport: "四條", description: "京都豬肉漢堡排" },
  { id: "hb3", category: "A", subCategoryId: "4", subCategory: "Hamburg Steak", name: "Grill Hasegawa", rating: 3.7, transport: "北大路", description: "排隊洋食" },
  { id: "hb5", category: "A", subCategoryId: "4", subCategory: "Hamburg Steak", name: "Hamburg Conel", rating: 3.52, transport: "京都市役所", description: "近江牛漢堡排" },
  { id: "hb6", category: "A", subCategoryId: "4", subCategory: "Hamburg Steak", name: "Bistro Sept", rating: 3.65, transport: "烏丸御池", description: "成人風格洋食" },
  { id: "hb7", category: "A", subCategoryId: "4", subCategory: "Hamburg Steak", name: "Kitchen Papa", rating: 3.68, transport: "千本上立賣", description: "米舖直營白飯絕佳" },
  { id: "hb8", category: "A", subCategoryId: "4", subCategory: "Hamburg Steak", name: "Hafuu 本店", rating: 3.85, transport: "京都市役所", description: "頂級和牛漢堡排" },
  { id: "hb9", category: "A", subCategoryId: "4", subCategory: "Hamburg Steak", name: "Salad no Mise Sancho", rating: 3.62, transport: "河原町", description: "沙拉與漢堡排" },
  { id: "hb10", category: "A", subCategoryId: "4", subCategory: "Hamburg Steak", name: "Pound 梅小路", rating: 3.55, transport: "梅小路", description: "熟成牛專門" },
  { id: "hb11", category: "A", subCategoryId: "4", subCategory: "Hamburg Steak", name: "Grill Aoi", rating: 3.6, transport: "京都站", description: "隱藏版洋食" },
  // A5 Burger
  { id: "bur1", category: "A", subCategoryId: "5", subCategory: "Burger", name: "Dragon Burger", rating: 3.55, transport: "東福寺", description: "世界冠軍芥末漢堡" },
  { id: "bur2", category: "A", subCategoryId: "5", subCategory: "Burger", name: "Grand Burger", rating: 3.6, transport: "今出川", description: "正統美式" },
  { id: "bur3", category: "A", subCategoryId: "5", subCategory: "Burger", name: "Smile Burger", rating: 3.45, transport: "高野", description: "外帶名店" },
  { id: "bur5", category: "A", subCategoryId: "5", subCategory: "Burger", name: "Craft Dining Upit", rating: 3.58, transport: "河原町", description: "溶岩起司漢堡" },
  { id: "bur6", category: "A", subCategoryId: "5", subCategory: "Burger", name: "Hamburger Kagawa", rating: 3.72, transport: "東福寺", description: "手切肉排" },
  { id: "bur7", category: "A", subCategoryId: "5", subCategory: "Burger", name: "The Burger Company", rating: 3.65, transport: "北山", description: "炭火燒烤" },
  { id: "bur8", category: "A", subCategoryId: "5", subCategory: "Burger", name: "Shake Shack", rating: 3.5, transport: "四條", description: "京都風裝潢" },
  { id: "bur9", category: "A", subCategoryId: "5", subCategory: "Burger", name: "Hard Rock Cafe", rating: 3.45, transport: "祇園四條", description: "町家風格" },
  { id: "bur10", category: "A", subCategoryId: "5", subCategory: "Burger", name: "J.S. BURGERS", rating: 3.4, transport: "烏丸御池", description: "東京時髦風" },
  { id: "bur11", category: "A", subCategoryId: "5", subCategory: "Burger", name: "Kua'aina", rating: 3.52, transport: "河原町", description: "夏威夷火山岩烤" },
  // A6 Yoshoku
  { id: "y1", category: "A", subCategoryId: "6", subCategory: "Yoshoku", name: "Grill Kodakara", rating: 3.72, transport: "岡崎道", description: "巨大蛋包飯" },
  { id: "y2", category: "A", subCategoryId: "6", subCategory: "Yoshoku", name: "Grill Demi", rating: 3.55, transport: "丸太町", description: "燉煮漢堡排" },
  { id: "y3", category: "A", subCategoryId: "6", subCategory: "Yoshoku", name: "Kitchen Gon", rating: 3.48, transport: "堀川下立賣", description: "皮尼亞飯" },
  { id: "y4", category: "A", subCategoryId: "6", subCategory: "Yoshoku", name: "Grill French", rating: 3.65, transport: "二條城前", description: "預約制洋食" },
  { id: "y5", category: "A", subCategoryId: "6", subCategory: "Yoshoku", name: "Grill Meiji-ya", rating: 3.6, transport: "八瀨", description: "觀光名店燉牛肉" },
  { id: "y6", category: "A", subCategoryId: "6", subCategory: "Yoshoku", name: "Yoshoku Ogata", rating: 4.1, transport: "烏丸御池", description: "洋食巔峰" },
  { id: "y7", category: "A", subCategoryId: "6", subCategory: "Yoshoku", name: "Kichi Kichi", rating: 3.8, transport: "三條", description: "爆漿蛋包飯" },
  { id: "y8", category: "A", subCategoryId: "6", subCategory: "Yoshoku", name: "Grill Takaraya", rating: 3.55, transport: "祇園四條", description: "舞妓愛店" },
  { id: "y9", category: "A", subCategoryId: "6", subCategory: "Yoshoku", name: "La Madrague", rating: 3.65, transport: "烏丸御池", description: "厚蛋三明治" },
  { id: "y10", category: "A", subCategoryId: "6", subCategory: "Yoshoku", name: "Grill New Rhein", rating: 3.5, transport: "祇園四條", description: "百年復古洋食" },
  // A7 Okonomiyaki
  { id: "ok1", category: "A", subCategoryId: "7", subCategory: "Okonomiyaki", name: "壹錢洋食", rating: 3.48, transport: "祇園四條", description: "京都風大阪燒" },
  { id: "ok2", category: "A", subCategoryId: "7", subCategory: "Okonomiyaki", name: "Kiraku", rating: 3.55, transport: "三條京阪", description: "在地老店" },
  { id: "ok3", category: "A", subCategoryId: "7", subCategory: "Okonomiyaki", name: "Warai", rating: 3.4, transport: "四條", description: "口感鬆軟" },
  { id: "ok4", category: "A", subCategoryId: "7", subCategory: "Okonomiyaki", name: "Oagari", rating: 3.52, transport: "祇園四條", description: "和牛九條蔥" },
  { id: "ok5", category: "A", subCategoryId: "7", subCategory: "Okonomiyaki", name: "Donguri", rating: 3.35, transport: "四條", description: "米粉大阪燒" },
  { id: "ok6", category: "A", subCategoryId: "7", subCategory: "Okonomiyaki", name: "Yamamoto Mambo", rating: 3.6, transport: "京都站", description: "曼波燒" },
  { id: "ok7", category: "A", subCategoryId: "7", subCategory: "Okonomiyaki", name: "Arata", rating: 3.65, transport: "京都站", description: "牛下巴肉燒" },
  { id: "ok8", category: "A", subCategoryId: "7", subCategory: "Okonomiyaki", name: "Gion Tanto", rating: 3.58, transport: "祇園四條", description: "巽橋旁絕景" },
  { id: "ok9", category: "A", subCategoryId: "7", subCategory: "Okonomiyaki", name: "Kyo-Chabana", rating: 3.5, transport: "京都站", description: "番茄大阪燒" },
  { id: "ok10", category: "A", subCategoryId: "7", subCategory: "Okonomiyaki", name: "Yume-ya", rating: 3.62, transport: "二條城前", description: "復古巨無霸" },
  // A8 Takoyaki
  { id: "tk1", category: "A", subCategoryId: "8", subCategory: "Takoyaki", name: "Tako-Tora", rating: 3.45, transport: "高野", description: "外皮酥脆" },
  { id: "tk2", category: "A", subCategoryId: "8", subCategory: "Takoyaki", name: "Karikari Hakase", rating: 3.35, transport: "四條", description: "錦市場平價" },
  { id: "tk3", category: "A", subCategoryId: "8", subCategory: "Takoyaki", name: "Tako-Masu", rating: 3.4, transport: "河原町", description: "新京極甜醬汁" },
  { id: "tk4", category: "A", subCategoryId: "8", subCategory: "Takoyaki", name: "Takoyaki Ipbo", rating: 3.3, transport: "伏見桃山", description: "學生愛店" },
  { id: "tk5", category: "A", subCategoryId: "8", subCategory: "Takoyaki", name: "Takoyaki Bar Tsubaki", rating: 3.5, transport: "河原町", description: "深夜章魚燒酒吧" },
  { id: "tk6", category: "A", subCategoryId: "8", subCategory: "Takoyaki", name: "Takoyaki no Acchan", rating: 3.55, transport: "東福寺", description: "東山在地人氣" },
  { id: "tk7", category: "A", subCategoryId: "8", subCategory: "Takoyaki", name: "Takoyaki Hiro", rating: 3.45, transport: "東寺", description: "昭和風靈魂小店" },
  { id: "tk8", category: "A", subCategoryId: "8", subCategory: "Takoyaki", name: "Tako-Q", rating: 3.3, transport: "祇園四條", description: "巨型爆彈燒" },
  { id: "tk9", category: "A", subCategoryId: "8", subCategory: "Takoyaki", name: "Gindaco Highball", rating: 3.1, transport: "河原町", description: "居酒屋型態" },
  { id: "tk10", category: "A", subCategoryId: "8", subCategory: "Takoyaki", name: "Daidan-en", rating: 3.5, transport: "西院", description: "西院老店" },
  // A9 Yakiniku
  { id: "yk_ayce1", category: "A", subCategoryId: "9.1", subCategory: "Yakiniku", name: "Chifaja", rating: 3.2, transport: "河原町", description: "平價吃到飽" },
  { id: "yk_ayce2", category: "A", subCategoryId: "9.1", subCategory: "Yakiniku", name: "Yaruki", rating: 3.15, transport: "京都市役所", description: "點餐式吃到飽" },
  { id: "yk1", category: "A", subCategoryId: "9.2", subCategory: "Yakiniku", name: "Yakiniku Hiro", rating: 3.68, transport: "京都市役所", description: "最強連鎖" },
  { id: "yk2", category: "A", subCategoryId: "9.2", subCategory: "Yakiniku", name: "Tendan", rating: 3.6, transport: "祇園四條", description: "高湯沾醬" },
  { id: "yk3", category: "A", subCategoryId: "9.2", subCategory: "Yakiniku", name: "Yakiniku Kitan", rating: 3.75, transport: "北山", description: "高級和牛" },
  { id: "yk4", category: "A", subCategoryId: "9.2", subCategory: "Yakiniku", name: "Yakiniku Bungo", rating: 3.62, transport: "京都市役所", description: "大分和牛" },
  { id: "yk5", category: "A", subCategoryId: "9.2", subCategory: "Yakiniku", name: "Itchou", rating: 3.55, transport: "河原町", description: "全個室" },
  { id: "yk6", category: "A", subCategoryId: "9.2", subCategory: "Yakiniku", name: "Yakiniku Dora", rating: 3.5, transport: "北大路", description: "家庭式燒肉" },
  { id: "yk7", category: "A", subCategoryId: "9.2", subCategory: "Yakiniku", name: "Ajiraku", rating: 3.58, transport: "東天王町", description: "煙霧繚繞老店" },
  { id: "yk8", category: "A", subCategoryId: "9.2", subCategory: "Yakiniku", name: "Yakiniku Kinoe", rating: 3.75, transport: "京都市役所", description: "時尚近江牛" },
  // A10 Hotpot
  { id: "hp_ayce1", category: "A", subCategoryId: "10.1", subCategory: "Hotpot", name: "Gyu-Zen", rating: 3.35, transport: "四條", description: "壽喜燒吃到飽" },
  { id: "hp_ayce2", category: "A", subCategoryId: "10.1", subCategory: "Hotpot", name: "Momo-no-ki", rating: 3.25, transport: "烏丸", description: "牛舌吃到飽" },
  { id: "hp1", category: "A", subCategoryId: "10.2", subCategory: "Hotpot", name: "Moritaya", rating: 3.7, transport: "京都市役所", description: "納涼床壽喜燒" },
  { id: "hp2", category: "A", subCategoryId: "10.2", subCategory: "Hotpot", name: "Junsei", rating: 3.62, transport: "蹴上", description: "南禪寺湯豆腐" },
  { id: "hp3", category: "A", subCategoryId: "10.2", subCategory: "Hotpot", name: "Mishima-tei", rating: 3.8, transport: "京都市役所", description: "頂級老舖" },
  { id: "hp4", category: "A", subCategoryId: "10.2", subCategory: "Hotpot", name: "Waringo", rating: 3.55, transport: "烏丸御池", description: "蔥花鮪魚鍋" },
  { id: "hp5", category: "A", subCategoryId: "10.2", subCategory: "Hotpot", name: "Toriyasa", rating: 3.75, transport: "河原町", description: "雞肉水炊鍋" },
  { id: "hp6", category: "A", subCategoryId: "10.2", subCategory: "Hotpot", name: "Iroha", rating: 3.6, transport: "河原町", description: "先斗町老店" },
  { id: "hp7", category: "A", subCategoryId: "10.2", subCategory: "Hotpot", name: "Junidanya", rating: 3.65, transport: "祇園四條", description: "涮涮鍋發源" },
  { id: "hp8", category: "A", subCategoryId: "10.2", subCategory: "Hotpot", name: "Yuzuya Ryokan", rating: 3.72, transport: "祇園四條", description: "柚子鍋" },
  // A11 Sweets - Matcha
  { id: "m1", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Matcha", name: "中村藤吉", rating: null, transport: "", description: "抹茶" },
  { id: "m2", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Matcha", name: "都路里", rating: null, transport: "", description: "抹茶" },
  { id: "m3", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Matcha", name: "伊藤久右衛門", rating: null, transport: "", description: "抹茶" },
  { id: "m4", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Matcha", name: "翠泉", rating: null, transport: "", description: "抹茶" },
  { id: "m5", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Matcha", name: "抹茶館/提拉米蘇", rating: null, transport: "", description: "抹茶" },
  { id: "m6", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Matcha", name: "丸久小山園/蛋糕捲", rating: null, transport: "", description: "抹茶" },
  { id: "m7", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Matcha", name: "一保堂/濃茶", rating: null, transport: "", description: "抹茶" },
  { id: "m8", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Matcha", name: "清水一芳園/泡沫冰", rating: null, transport: "", description: "抹茶" },
  { id: "m9", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Matcha", name: "Jouvencelle/巧克力鍋", rating: null, transport: "", description: "抹茶" },
  { id: "m10", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Matcha", name: "祇園小石/黑糖聖代", rating: null, transport: "", description: "抹茶" },
  // Wagashi
  { id: "sw1", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Wagashi", name: "出町双葉", rating: null, transport: "", description: "和菓子" },
  { id: "sw1-2", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Wagashi", name: "鍵善良房", rating: null, transport: "", description: "和菓子" },
  { id: "sw1-3", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Wagashi", name: "鶴屋吉信", rating: null, transport: "", description: "和菓子" },
  { id: "sw1-4", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Wagashi", name: "笹屋伊織", rating: null, transport: "", description: "和菓子" },
  { id: "w5", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Wagashi", name: "虎屋菓寮", rating: null, transport: "", description: "和菓子" },
  { id: "w6", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Wagashi", name: "宝泉/蕨餅", rating: null, transport: "", description: "和菓子" },
  { id: "w7", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Wagashi", name: "粟餅所澤屋", rating: null, transport: "", description: "和菓子" },
  { id: "w8", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Wagashi", name: "七條甘春堂/羊羹", rating: null, transport: "", description: "和菓子" },
  { id: "w9", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Wagashi", name: "老松/夏柑糖", rating: null, transport: "", description: "和菓子" },
  { id: "w10", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Wagashi", name: "然花抄院", rating: null, transport: "", description: "和菓子" },
  // Strawberry
  { id: "sw3", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Strawberry", name: "Maison de Frouge", rating: null, transport: "", description: "草莓" },
  { id: "s2", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Strawberry", name: "Fukunaga 901/草莓山", rating: null, transport: "", description: "草莓" },
  { id: "s3", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Strawberry", name: "無碍山房", rating: null, transport: "", description: "草莓" },
  { id: "s4", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Strawberry", name: "吉祥菓寮", rating: null, transport: "", description: "草莓" },
  { id: "s5", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Strawberry", name: "Strawberry Mania", rating: null, transport: "", description: "草莓" },
  { id: "s6", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Strawberry", name: "養老軒/大福", rating: null, transport: "", description: "草莓" },
  { id: "s7", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Strawberry", name: "Cafe Comme Ca", rating: null, transport: "", description: "草莓" },
  { id: "s8", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Strawberry", name: "Cherie Maison", rating: null, transport: "", description: "草莓" },
  { id: "s9", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Strawberry", name: "Ito Kacho", rating: null, transport: "", description: "草莓" },
  { id: "s10", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Strawberry", name: "Liberty", rating: null, transport: "", description: "草莓" },
  // IceCream
  { id: "sw4", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "IceCream", name: "Gion Kinana", rating: null, transport: "", description: "冰淇淋" },
  { id: "i2", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "IceCream", name: "Premarche", rating: null, transport: "", description: "冰淇淋" },
  { id: "i3", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "IceCream", name: "Sugitora", rating: null, transport: "", description: "冰淇淋" },
  { id: "i4", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "IceCream", name: "Shin-Setsu", rating: null, transport: "", description: "冰淇淋" },
  { id: "i5", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "IceCream", name: "Picaro", rating: null, transport: "", description: "冰淇淋" },
  { id: "i6", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "IceCream", name: "Babbi", rating: null, transport: "", description: "冰淇淋" },
  { id: "i7", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "IceCream", name: "Handels Vagen", rating: null, transport: "", description: "冰淇淋" },
  { id: "i8", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "IceCream", name: "Bel Amer", rating: null, transport: "", description: "冰淇淋" },
  { id: "i9", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "IceCream", name: "Arashiyama Yoshimura", rating: null, transport: "", description: "冰淇淋" },
  { id: "i10", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "IceCream", name: "Tsujiri Soft", rating: null, transport: "", description: "冰淇淋" },
  // Cake
  { id: "sw5", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Cake", name: "grains de vanille", rating: null, transport: "", description: "蛋糕" },
  { id: "sw5-2", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Cake", name: "Malebranche", rating: null, transport: "", description: "蛋糕" },
  { id: "k3", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Cake", name: "Patisserie S", rating: null, transport: "", description: "蛋糕" },
  { id: "k4", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Cake", name: "Assemblages Kakimoto", rating: null, transport: "", description: "蛋糕" },
  { id: "k5", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Cake", name: "Salon de Royal", rating: null, transport: "", description: "蛋糕" },
  { id: "k6", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Cake", name: "Qu'il Fait Bon", rating: null, transport: "", description: "蛋糕" },
  { id: "k7", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Cake", name: "KEIZO/10分蒙布朗", rating: null, transport: "", description: "蛋糕" },
  { id: "k8", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Cake", name: "Papa Jon's", rating: null, transport: "", description: "蛋糕" },
  { id: "k9", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Cake", name: "Chez La Mère", rating: null, transport: "", description: "蛋糕" },
  { id: "k10", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Cake", name: "Baikal", rating: null, transport: "", description: "蛋糕" },
  // Fruit Sandwich
  { id: "sw2", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "FruitSandwich", name: "Yaoiso", rating: null, transport: "", description: "水果三明治" },
  { id: "f2", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "FruitSandwich", name: "Cricket", rating: null, transport: "", description: "水果三明治" },
  { id: "f3", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "FruitSandwich", name: "Hosokawa", rating: null, transport: "", description: "水果三明治" },
  { id: "f4", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "FruitSandwich", name: "Daiwa", rating: null, transport: "", description: "水果三明治" },
  { id: "f5", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "FruitSandwich", name: "Koto-ka", rating: null, transport: "", description: "水果三明治" },
  { id: "f6", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "FruitSandwich", name: "Smart Coffee", rating: null, transport: "", description: "水果三明治" },
  { id: "f7", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "FruitSandwich", name: "Majisand", rating: null, transport: "", description: "水果三明治" },
  { id: "f8", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "FruitSandwich", name: "Inoda", rating: null, transport: "", description: "水果三明治" },
  { id: "f9", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "FruitSandwich", name: "Sentido", rating: null, transport: "", description: "水果三明治" },
  { id: "f10", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "FruitSandwich", name: "Weekend NY", rating: null, transport: "", description: "水果三明治" },
  // Pudding
  { id: "sw6", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Pudding", name: "Cafe Zou", rating: null, transport: "", description: "布丁" },
  { id: "pu2", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Pudding", name: "Madrague", rating: null, transport: "", description: "布丁" },
  { id: "pu3", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Pudding", name: "Takagi Coffee", rating: null, transport: "", description: "布丁" },
  { id: "pu4", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Pudding", name: "Francois", rating: null, transport: "", description: "布丁" },
  { id: "pu5", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Pudding", name: "Soiree", rating: null, transport: "", description: "布丁" },
  { id: "pu6", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Pudding", name: "Murakami Kaishindo", rating: null, transport: "", description: "布丁" },
  { id: "pu7", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Pudding", name: "Gion Pudding", rating: null, transport: "", description: "布丁" },
  { id: "pu8", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Pudding", name: "Maeda Coffee", rating: null, transport: "", description: "布丁" },
  { id: "pu9", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Pudding", name: "Ogawa Coffee", rating: null, transport: "", description: "布丁" },
  { id: "pu10", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Pudding", name: "Unir", rating: null, transport: "", description: "布丁" },
  // Dango
  { id: "sw7", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Dango", name: "Kamo Mitarashi", rating: null, transport: "", description: "糰子" },
  { id: "da2", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Dango", name: "Umezono", rating: null, transport: "", description: "糰子" },
  { id: "da3", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Dango", name: "Jumondo", rating: null, transport: "", description: "糰子" },
  { id: "da4", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Dango", name: "Kotoka", rating: null, transport: "", description: "糰子" },
  { id: "da5", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Dango", name: "Ichiwa", rating: null, transport: "", description: "糰子" },
  { id: "da6", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Dango", name: "Kazariya", rating: null, transport: "", description: "糰子" },
  { id: "da7", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Dango", name: "Oiwake", rating: null, transport: "", description: "糰子" },
  { id: "da8", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Dango", name: "Tsukigase", rating: null, transport: "", description: "糰子" },
  { id: "da9", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Dango", name: "Otabe", rating: null, transport: "", description: "糰子" },
  { id: "da10", category: "A", subCategoryId: "11", subCategory: "Sweets", childCategory: "Dango", name: "Amanoya", rating: null, transport: "", description: "糰子" },
  // A12 Chain
  { id: "ch1", category: "A", subCategoryId: "12", subCategory: "Chain", name: "Gyoza no Ohsho", rating: 3.3, transport: "大宮", description: "王將一號店" },
  { id: "ch2", category: "A", subCategoryId: "12", subCategory: "Chain", name: "Tenkaippin", rating: 3.6, transport: "茶山", description: "天下一品總店" },
  { id: "ch3", category: "A", subCategoryId: "12", subCategory: "Chain", name: "551 Horai", rating: 3.75, transport: "京都站", description: "蓬萊肉包" },
  { id: "ch4", category: "A", subCategoryId: "12", subCategory: "Chain", name: "Shinshindo", rating: 3.55, transport: "京都市役所", description: "麵包吃到飽" },
  { id: "ch5", category: "A", subCategoryId: "12", subCategory: "Chain", name: "Lipton Tea House", rating: 3.65, transport: "京都市役所", description: "立頓紅茶甜點" },
  { id: "ch6", category: "A", subCategoryId: "12", subCategory: "Chain", name: "Torikizoku", rating: 3.1, transport: "河原町", description: "鳥貴族" },
  { id: "ch7", category: "A", subCategoryId: "12", subCategory: "Chain", name: "Yojiya Cafe", rating: 3.58, transport: "祇園四條", description: "藝妓臉拉花" },
  { id: "ch8", category: "A", subCategoryId: "12", subCategory: "Chain", name: "Miyamoto Munashi", rating: 3.05, transport: "二條", description: "定食白飯續" },
  { id: "ch9", category: "A", subCategoryId: "12", subCategory: "Chain", name: "Sushi no Musashi", rating: 3.52, transport: "京都市役所", description: "武藏壽司" },
  { id: "ch10", category: "A", subCategoryId: "12", subCategory: "Chain", name: "Kyoto Katsugyu", rating: 3.45, transport: "三條", description: "勝牛本店" },
  // A13 Ramen
  { id: "r1", category: "A", subCategoryId: "13", subCategory: "Ramen", name: "本家 第一旭", rating: 3.74, transport: "京都站", description: "醬油豚骨" },
  { id: "r2", category: "A", subCategoryId: "13", subCategory: "Ramen", name: "Menya Inoichi", rating: 3.71, transport: "河原町", description: "豬一清湯" },
  { id: "r3", category: "A", subCategoryId: "13", subCategory: "Ramen", name: "Sen no Kaze", rating: 3.58, transport: "河原町", description: "千之風" },
  { id: "r4", category: "A", subCategoryId: "13", subCategory: "Ramen", name: "Touhichi", rating: 3.85, transport: "玄琢下", description: "醬油拉麵極致" },
  { id: "r5", category: "A", subCategoryId: "13", subCategory: "Ramen", name: "Menya Gokkei", rating: 3.72, transport: "一乘寺", description: "極雞濃湯" },
  { id: "r6", category: "A", subCategoryId: "13", subCategory: "Ramen", name: "Wajoryomen Sugari", rating: 3.65, transport: "四條", description: "牛腸沾麵" },
  { id: "r7", category: "A", subCategoryId: "13", subCategory: "Ramen", name: "Shinpuku Saikan", rating: 3.68, transport: "京都站", description: "新福菜館黑拉麵" },
  { id: "r8", category: "A", subCategoryId: "13", subCategory: "Ramen", name: "Menya Yukou", rating: 3.75, transport: "烏丸御池", description: "優光貝類湯" },
  { id: "r9", category: "A", subCategoryId: "13", subCategory: "Ramen", name: "Ginjo Ramen Kubota", rating: 3.73, transport: "五條", description: "久保田沾麵" },
  { id: "r10", category: "A", subCategoryId: "13", subCategory: "Ramen", name: "Ramen Mugyu", rating: 3.65, transport: "大宮", description: "黃金雞湯" },
  // A14 Bread
  { id: "br1", category: "A", subCategoryId: "14", subCategory: "Bread", name: "Le Petit Mec", rating: 3.82, transport: "今出川", description: "赤Mec可頌" },
  { id: "br2", category: "A", subCategoryId: "14", subCategory: "Bread", name: "Sizuya", rating: 3.25, transport: "京都站", description: "炸牛排三明治" },
  { id: "br3", category: "A", subCategoryId: "14", subCategory: "Bread", name: "Maruki Seipanjo", rating: 3.76, transport: "大宮", description: "熱狗麵包" },
  { id: "br4", category: "A", subCategoryId: "14", subCategory: "Bread", name: "Walder", rating: 3.72, transport: "河原町", description: "德式麵包" },
  { id: "br5", category: "A", subCategoryId: "14", subCategory: "Bread", name: "Flip up!", rating: 3.7, transport: "烏丸御池", description: "貝果名店" },
  { id: "br6", category: "A", subCategoryId: "14", subCategory: "Bread", name: "Grandir Oike", rating: 3.65, transport: "京都市役所", description: "帕尼尼" },
  { id: "br7", category: "A", subCategoryId: "14", subCategory: "Bread", name: "Fiveran", rating: 3.68, transport: "烏丸御池", description: "明太子法國" },
  { id: "br8", category: "A", subCategoryId: "14", subCategory: "Bread", name: "Nakagawa Komugiten", rating: 3.75, transport: "下鴨", description: "有機全麥" },
  { id: "br9", category: "A", subCategoryId: "14", subCategory: "Bread", name: "HANAKAGO", rating: 3.62, transport: "烏丸御池", description: "紅酒麵包" },
  { id: "br10", category: "A", subCategoryId: "14", subCategory: "Bread", name: "Kurs", rating: 3.66, transport: "二條城前", description: "質感三明治" },
  // A15 Cafe
  { id: "cf1", category: "A", subCategoryId: "15", subCategory: "Cafe", name: "Smart Coffee", rating: null, transport: "", description: "咖啡" },
  { id: "cf2", category: "A", subCategoryId: "15", subCategory: "Cafe", name: "Starbucks Ninenzaka", rating: null, transport: "", description: "咖啡" },
  { id: "cf3", category: "A", subCategoryId: "15", subCategory: "Cafe", name: "% Arabica", rating: null, transport: "", description: "咖啡" },
  { id: "cf4", category: "A", subCategoryId: "15", subCategory: "Cafe", name: "Wife & Husband", rating: null, transport: "", description: "咖啡" },
  { id: "cf5", category: "A", subCategoryId: "15", subCategory: "Cafe", name: "Weekenders Coffee", rating: null, transport: "", description: "咖啡" },
  { id: "cf6", category: "A", subCategoryId: "15", subCategory: "Cafe", name: "Blue Bottle", rating: null, transport: "", description: "咖啡" },
  { id: "cf7", category: "A", subCategoryId: "15", subCategory: "Cafe", name: "Inoda Coffee", rating: null, transport: "", description: "咖啡" },
  { id: "cf8", category: "A", subCategoryId: "15", subCategory: "Cafe", name: "Rokuyosha", rating: null, transport: "", description: "咖啡" },
  { id: "cf9", category: "A", subCategoryId: "15", subCategory: "Cafe", name: "Kurasu", rating: null, transport: "", description: "咖啡" },
  { id: "cf10", category: "A", subCategoryId: "15", subCategory: "Cafe", name: "Elephant Factory", rating: null, transport: "", description: "咖啡" },
  // A16 Yakitori
  { id: "yak1", category: "A", subCategoryId: "16", subCategory: "Yakitori", name: "Torito", rating: 3.65, transport: "神宮丸太町", description: "地雞" },
  { id: "yak2", category: "A", subCategoryId: "16", subCategory: "Yakitori", name: "Hitomi", rating: 3.75, transport: "三條", description: "人見" },
  { id: "yak3", category: "A", subCategoryId: "16", subCategory: "Yakitori", name: "Kushikura", rating: 3.68, transport: "烏丸御池", description: "百年町家" },
  { id: "yak4", category: "A", subCategoryId: "16", subCategory: "Yakitori", name: "Torisei", rating: 3.62, transport: "伏見桃山", description: "清酒倉庫" },
  { id: "yak5", category: "A", subCategoryId: "16", subCategory: "Yakitori", name: "Wabiya Korekido", rating: 3.7, transport: "祇園四條", description: "高級串燒" },
  { id: "yak6", category: "A", subCategoryId: "16", subCategory: "Yakitori", name: "Kushihatchin", rating: 3.45, transport: "四條", description: "串八連鎖" },
  { id: "yak7", category: "A", subCategoryId: "16", subCategory: "Yakitori", name: "Bajitofu", rating: 3.72, transport: "四條", description: "馬耳東風" },
  { id: "yak8", category: "A", subCategoryId: "16", subCategory: "Yakitori", name: "Tsujiya", rating: 3.55, transport: "大宮", description: "大眾酒場" },
  { id: "yak9", category: "A", subCategoryId: "16", subCategory: "Yakitori", name: "En-ya", rating: 3.6, transport: "河原町", description: "圓屋關東煮" },
  { id: "yak10", category: "A", subCategoryId: "16", subCategory: "Yakitori", name: "Tarokichi", rating: 3.68, transport: "祇園四條", description: "太郎吉" },
  // A17 Umeshu/Souvenir
  { id: "ume1", category: "A", subCategoryId: "17", subCategory: "Umeshu/Souvenir", name: "Ousu no Sato", rating: 4.5, transport: "祇園四條", description: "梅子專賣" },
  { id: "ume2", category: "A", subCategoryId: "17", subCategory: "Umeshu/Souvenir", name: "Choya", rating: 4.2, transport: "烏丸御池", description: "蝶矢體驗" },
  { id: "ume3", category: "A", subCategoryId: "17", subCategory: "Umeshu/Souvenir", name: "Tsunokiya", rating: 4, transport: "河原町", description: "錦市場酒舖" },
  { id: "ume4", category: "A", subCategoryId: "17", subCategory: "Umeshu/Souvenir", name: "Tanzan Shuzo", rating: 3.8, transport: "嵯峨嵐山", description: "丹山酒造" },
  { id: "ume5", category: "A", subCategoryId: "17", subCategory: "Umeshu/Souvenir", name: "Gekkeikan Museum", rating: 4.3, transport: "中書島", description: "月桂冠" },
  { id: "ume6", category: "A", subCategoryId: "17", subCategory: "Umeshu/Souvenir", name: "Kizakura Kappa", rating: 3.9, transport: "中書島", description: "黃櫻河童" },
  { id: "ume7", category: "A", subCategoryId: "17", subCategory: "Umeshu/Souvenir", name: "Sasaki Shuzo", rating: 4.1, transport: "二條城前", description: "佐佐木酒造" },
  { id: "ume8", category: "A", subCategoryId: "17", subCategory: "Umeshu/Souvenir", name: "Matsui Shuzo", rating: 4, transport: "出町柳", description: "松井酒造" },
  { id: "ume9", category: "A", subCategoryId: "17", subCategory: "Umeshu/Souvenir", name: "Takimoto", rating: 4.4, transport: "五條", description: "名酒館" },
  { id: "ume10", category: "A", subCategoryId: "17", subCategory: "Umeshu/Souvenir", name: "JR Isetan Liquor", rating: 4.2, transport: "京都站", description: "伊勢丹酒賣場" },
  // B Spots
  { id: "b1", category: "B", subCategoryId: "B", subCategory: "Spots", name: "Kiyomizu", rating: null, transport: "", description: "" },
  { id: "b2", category: "B", subCategoryId: "B", subCategory: "Spots", name: "Fushimi Inari", rating: null, transport: "", description: "" },
  { id: "b3", category: "B", subCategoryId: "B", subCategory: "Spots", name: "Arashiyama", rating: null, transport: "", description: "" },
  { id: "b4", category: "B", subCategoryId: "B", subCategory: "Spots", name: "Nishiki", rating: null, transport: "", description: "" },
  { id: "b5", category: "B", subCategoryId: "B", subCategory: "Spots", name: "Philosopher Path", rating: null, transport: "", description: "" },
  { id: "b6", category: "B", subCategoryId: "B", subCategory: "Spots", name: "Gion Shirakawa", rating: null, transport: "", description: "" },
  { id: "b7", category: "B", subCategoryId: "B", subCategory: "Spots", name: "Kyoto Tower", rating: null, transport: "", description: "" },
  { id: "b8", category: "B", subCategoryId: "B", subCategory: "Spots", name: "Nijo Castle", rating: null, transport: "", description: "" },
  { id: "b9", category: "B", subCategoryId: "B", subCategory: "Spots", name: "Kamo River", rating: null, transport: "", description: "" },
  { id: "b10", category: "B", subCategoryId: "B", subCategory: "Spots", name: "Pontocho", rating: null, transport: "", description: "" },
  // C Temples
  { id: "tmp1", category: "C", subCategoryId: "C", subCategory: "Temples", name: "Kinkakuji", rating: null, transport: "", description: "" },
  { id: "tmp2", category: "C", subCategoryId: "C", subCategory: "Temples", name: "Ginkakuji", rating: null, transport: "", description: "" },
  { id: "tmp3", category: "C", subCategoryId: "C", subCategory: "Temples", name: "Ryoanji", rating: null, transport: "", description: "" },
  { id: "tmp4", category: "C", subCategoryId: "C", subCategory: "Temples", name: "Nanzenji", rating: null, transport: "", description: "" },
  { id: "tmp5", category: "C", subCategoryId: "C", subCategory: "Temples", name: "Sanjusangendo", rating: null, transport: "", description: "" },
  { id: "tmp6", category: "C", subCategoryId: "C", subCategory: "Temples", name: "Eikando", rating: null, transport: "", description: "" },
  { id: "tmp7", category: "C", subCategoryId: "C", subCategory: "Temples", name: "Byodoin", rating: null, transport: "", description: "" },
  { id: "tmp8", category: "C", subCategoryId: "C", subCategory: "Temples", name: "Tofukuji", rating: null, transport: "", description: "" },
  { id: "tmp9", category: "C", subCategoryId: "C", subCategory: "Temples", name: "Kenninji", rating: null, transport: "", description: "" },
  { id: "tmp10", category: "C", subCategoryId: "C", subCategory: "Temples", name: "Daigoji", rating: null, transport: "", description: "" },
  // D Onsen
  { id: "ons1", category: "D", subCategoryId: "D", subCategory: "Onsen", name: "Funaoka", rating: null, transport: "", description: "" },
  { id: "ons2", category: "D", subCategoryId: "D", subCategory: "Onsen", name: "Tenzan", rating: null, transport: "", description: "" },
  { id: "ons3", category: "D", subCategoryId: "D", subCategory: "Onsen", name: "Kurama", rating: null, transport: "", description: "" },
  { id: "ons4", category: "D", subCategoryId: "D", subCategory: "Onsen", name: "Gokou", rating: null, transport: "", description: "" },
  { id: "ons5", category: "D", subCategoryId: "D", subCategory: "Onsen", name: "Umeyu", rating: null, transport: "", description: "" },
  { id: "ons6", category: "D", subCategoryId: "D", subCategory: "Onsen", name: "Hakusan", rating: null, transport: "", description: "" },
  { id: "ons7", category: "D", subCategoryId: "D", subCategory: "Onsen", name: "Fufu", rating: null, transport: "", description: "" },
  { id: "ons8", category: "D", subCategoryId: "D", subCategory: "Onsen", name: "Nizaemon", rating: null, transport: "", description: "" },
  { id: "ons9", category: "D", subCategoryId: "D", subCategory: "Onsen", name: "Hana", rating: null, transport: "", description: "" },
  { id: "ons10", category: "D", subCategoryId: "D", subCategory: "Onsen", name: "Genji", rating: null, transport: "", description: "" },
  // E Gay
  { id: "gay1", category: "E", subCategoryId: "E", subCategory: "Gay", name: "Azure", rating: 4.5, transport: "河原町", description: "Friendly Bar" },
  { id: "gay2", category: "E", subCategoryId: "E", subCategory: "Gay", name: "Apple", rating: 4.2, transport: "三條", description: "Chill Vibe" },
];

const categories = [
  { id: "A", label: "A 食" },
  { id: "B", label: "B 景點" },
  { id: "C", label: "C 寺廟" },
  { id: "D", label: "D 溫泉" },
  { id: "E", label: "E 同志場所" },
];

const defaultHours = { open: 10, close: 20 };

const PlaceCard = ({ place, rank }) => {
  const now = new Date();
  const hour = now.getHours();
  const isOpen = hour >= defaultHours.open && hour < defaultHours.close;
  return (
    <div className="bg-white shadow-sm rounded-xl p-4 flex flex-col gap-2 border border-slate-100">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-slate-500">#{rank}</div>
          <h3 className="text-lg font-semibold text-slate-800">{place.name}</h3>
          <p className="text-xs text-emerald-600 flex items-center gap-1">
            <Clock size={14} />
            {isOpen ? "Open now" : "Closed"} · {defaultHours.open}:00 - {defaultHours.close}:00
          </p>
        </div>
        <div className="flex items-center gap-1 text-amber-500 text-sm">
          <Star size={16} />
          <span>{place.rating ?? "N/A"}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <MapPin size={16} className="text-rose-500" />
        <span>{place.subCategory}</span>
        {place.childCategory && <span className="text-xs text-slate-400">/ {place.childCategory}</span>}
      </div>
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Train size={16} className="text-indigo-500" />
        <span>{place.transport || "地點未提供"}</span>
      </div>
      <p className="text-sm text-slate-700 leading-relaxed flex items-start gap-2">
        <Info size={16} className="text-blue-500 mt-0.5" />
        <span>{place.description || ""}</span>
      </p>
    </div>
  );
};

const KyotoGuide = () => {
  const [activeCategory, setActiveCategory] = useState("A");
  const [activeSub, setActiveSub] = useState(null);
  const [activeChild, setActiveChild] = useState(null);

  const filteredByCategory = useMemo(
    () => PLACES_DATA.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  const subCategories = useMemo(() => {
    const map = new Map();
    filteredByCategory.forEach((item) => {
      if (!map.has(item.subCategoryId)) {
        map.set(item.subCategoryId, item.subCategory);
      }
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [filteredByCategory]);

  const childCategories = useMemo(() => {
    if (!activeSub) return [];
    const set = new Set(
      filteredByCategory
        .filter((item) => item.subCategoryId === activeSub && item.childCategory)
        .map((item) => item.childCategory)
    );
    return Array.from(set);
  }, [activeSub, filteredByCategory]);

  const places = useMemo(() => {
    let list = filteredByCategory;
    if (activeSub) {
      list = list.filter((item) => item.subCategoryId === activeSub);
    }
    if (activeChild) {
      list = list.filter((item) => item.childCategory === activeChild);
    }
    return list;
  }, [filteredByCategory, activeSub, activeChild]);

  const resetFilters = (cat) => {
    setActiveCategory(cat);
    setActiveSub(null);
    setActiveChild(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-4 sm:p-8 text-slate-900 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-6 sm:mb-8">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">Kyoto Food & Spot Guide</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">城市美食與景點精選</h1>
          <p className="text-sm text-slate-600 mt-2">
            透過分級篩選快速找到咖哩、甜點、寺廟、溫泉與同志友善場所。
          </p>
        </header>

        <nav className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => resetFilters(cat.id)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        <div className="flex flex-wrap gap-2 mb-3">
          {subCategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => {
                setActiveSub(sub.id);
                setActiveChild(null);
              }}
              className={`px-3 py-2 rounded-full text-sm border transition ${
                activeSub === sub.id
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>

        {childCategories.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
            <span className="text-slate-500">子分類：</span>
            {childCategories.map((child) => (
              <button
                key={child}
                onClick={() => setActiveChild(child)}
                className={`underline-offset-4 transition ${
                  activeChild === child
                    ? "text-emerald-700 underline"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {child}
              </button>
            ))}
            <button
              onClick={() => setActiveChild(null)}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              清除
            </button>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          {places.map((place, index) => (
            <PlaceCard key={place.id} place={place} rank={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KyotoGuide;
