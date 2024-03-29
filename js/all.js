const api_path = "https://json-server-vercel-iota.vercel.app";
// const api_path = "http://localhost:3000";

//時間轉換
function timeTrans(num) {
    const date = new Date(num);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}
//點擊後展開nav
const hamMenu = document.querySelector(".ham-menu-button");
hamMenu.addEventListener("click", function (e) {
    e.preventDefault();
    const navList = document.querySelector(".nav-list");
    navList.classList.toggle("menu-show");
});
//點擊後展開搜尋列
const hamMenuSearch = document.querySelector(".ham-menu-serach");
hamMenuSearch.addEventListener("click", function (e) {
    e.preventDefault();
    e.target.setAttribute("style", "display:none;");
    const navSearch = document.querySelector(".nav-search");
    navSearch.classList.toggle("search-show");
});

//點擊放大鏡按鈕執行搜尋
const searchBtn = document.querySelector(".nav-search a");
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const value = searchInput.value;
    if (value !== "") {
        location.href = `category.html?q=${value}`;
    }
});

//按下Enter鍵搜尋
const searchInput = document.querySelector(".nav-search input");
searchInput.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        const value = searchInput.value;
        if (value !== "") {
            location.href = `category.html?q=${value}`;
        }
    }
});

const dropList = document.querySelector(".nav-user-dropList ul");

// 載入localStorage參數，如果沒有設為空字串
let token = localStorage.getItem("token") || "";
const userId = localStorage.getItem("userId") || "";
const userNickname = localStorage.getItem("userNickname") || "";
const userEmail = localStorage.getItem("userEmail") || "";

//登入狀態函式
function loginStatus() {
    //如果資料不完整或是未登入狀態
    const userSection = document.querySelector(".nav-user");
    const loginSection = document.querySelector(".nav-login");
    const userSectionham = document.querySelector(".ham-menu-userName");
    const loginSectionham = document.querySelector(".ham-menu-login");
    const registerSectionham = document.querySelector(".ham-menu-register");
    const logoutSectionham = document.querySelector(".ham-menu-logout");

    if (userId === "" || userNickname === "" || token === "") {
        //將 登入&註冊 顯示
        loginSection.classList.toggle("toshow");
        loginSectionham.classList.toggle("toshow");
        registerSectionham.classList.toggle("toshow");
    } else {
        //顯示用戶名稱
        document.querySelector(".user-name span").textContent = userNickname;
        userSectionham.innerHTML = `<img src="img/icon-avatar.png" alt="" />${userNickname}`;
        userSection.classList.toggle("toshow");
        userSectionham.classList.toggle("toshow");
        logoutSectionham.classList.toggle("toshow");
    }
}
//執行函式
loginStatus();

// 會員選單點擊後固定
document.querySelector(".user-name").addEventListener("click", (e) => {
    console.log(dropList.classList);
    document.querySelector(".nav-user-dropList").classList.toggle("toshow");
});
// 點擊下拉選單的選項執行
dropList.addEventListener("click", (e) => {
    const target = e.target.getAttribute("class");
    // 登出-清空localStorage、重新整理
    if (target === "user-logOut") {
        e.preventDefault();
        localStorage.clear();
        location.reload();
        if (location.href.includes("user.html")) {
            location.href = "login.html";
        }
    }
});

document.querySelector(".ham-menu-logout").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear();
    location.reload();
    if (location.href.includes("user.html")) {
        location.href = "login.html";
    }
});

// {
//   "articles": [
//     {
//       "id": 1,
//       "title": "《Century 水晶之路：三部曲 繁體中文版》現正火熱預購中!!",
//       "content": "這次的水晶之路三部曲有這三款《水晶之路：晶石傳記》☃️《水晶之路：東方礦山☃️《水晶之路：三千世界》還記得好一段時之前，每天在那邊打璀璨跟香料的時候！偶然間看到了這個版本，那時想說真的好漂亮阿，可惜只有英文版的，現在某方面算是圓夢了。這次到了卡瓦尼亞的奇幻世界當中，作為商隊領袖踏上水晶貿易之路，我們要使用各種魔像去收集和交易水晶來換取財富。玩法跟《香料之路》是相同的，但漂亮精緻的卡片卻是大大大大升級啦！一開始很注重個人發展，但加入新擴充後就會變成更需要顧及其他對手的路線啦。第一部主要是構築和元素收集，第二部就加入了模組化板圖要建立路線，第三部增加了工人擺放要注重卡位等等的重點喔。遊戲人數：2-4人 遊戲時間：30-45分鐘",
//       "link": "https://www.facebook.com/groups/223881365531974/posts/777853373468101/",
//       "imgUrl": "img/article1.jpg",
//       "tab": "預購",
//       "category": "preorder",
//       "tag": [
//         "中文化",
//         "輕策"
//       ],
//       "like": 0,
//       "collect": 0,
//       "author": "PayRoom",
//       "timestap": 1668090647499,
//       "userId": 1
//     },
//     {
//       "id": 2,
//       "title": "《兵馬俑（Terracotta Army）》中文版確定!!",
//       "content": "日前桌遊菜鳥宣布即將代理 Board&Dice 的強作《兵馬俑（Terracotta Army）》，喜歡中重策玩家可千萬不要錯過，不過發售日期目前尚未確定，小編將替各位緊盯接下來的消息",
//       "link": "",
//       "imgUrl": "img/article2.webp",
//       "tab": "新聞",
//       "category": "news",
//       "tag": [
//         "中文化",
//         "代理"
//       ],
//       "like": 0,
//       "collect": 0,
//       "author": "PayRoom",
//       "timestap": 1668090679203,
//       "userId": 2
//     },
//     {
//       "id": 3,
//       "title": " 《Pakrs坦帕妮主題樂園》繁中版預購",
//       "content": "Tenpenny Pakrs坦帕妮主題樂園繁中版預購，借英文版的圖，實體全繁體中文，遊樂園主題板塊拼放策略新作，Vincent Dutrait精緻美術，👉2022年全球最熱門家庭遊戲👉BGG7.6高分",
//       "link": "",
//       "imgUrl": "img/article3.jpg",
//       "tab": "預購",
//       "category": "preorder",
//       "tag": [
//         "中文化",
//         "預購"
//       ],
//       "like": 0,
//       "collect": 0,
//       "author": "Apple",
//       "timestap": 1668184093877,
//       "userId": 2
//     },
//     {
//       "id": 4,
//       "title": "【開箱】ArchRavels",
//       "content": "胡亂拍照，模糊潦草，隨意亂寫，純粹留念。ArchRavels 是 KS 上少數我選擇一般版本而非豪華版的遊戲，一般版與豪華版的差異在於牌墊、木質碗和真實的毛線球資源，雖說價格只差USD$25不算大，但這些額外的東西並沒有收納，也就是說它們不能放入遊戲盒內，必須另外收好，這是為何我不選豪華版。",
//       "link": "",
//       "imgUrl": "img/article4.webp",
//       "tab": "開箱",
//       "category": "review",
//       "tag": [
//         "輕策",
//         "KS"
//       ],
//       "like": 0,
//       "collect": 0,
//       "author": "Happy",
//       "timestap": 1668184700340,
//       "userId": 3
//     },
//     {
//       "id": 5,
//       "title": "桌遊斷捨離-聊聊我想賣掉的桌遊|2",
//       "content": "來聊聊為什麼我想把這些桌遊放到二手市場出售，歡送即將離開我身邊的桌遊，內容都是我主觀的想法，我隨便寫寫、你就隨便看看吧。",
//       "link": "",
//       "imgUrl": "img/article5.png",
//       "tab": "閒聊",
//       "category": "columns",
//       "tag": [
//         "茂林源記",
//         "西國聖騎士",
//         "東京高速公路"
//       ],
//       "like": 0,
//       "collect": 0,
//       "author": "PayRoom",
//       "timestap": 1668184713474,
//       "userId": 2
//     },
//     {
//       "id": 6,
//       "title": "【開箱】情書-六人版 ",
//       "content": "很簡單的包裝，跟一般3C產品一樣，好像有很多版本，雖然我對情書沒有特別研究，但是情書這麼有名！每個人一定要擁有一個版本的，絕對不是為了湊免運！",
//       "link": "",
//       "imgUrl": "img/article6.webp",
//       "tab": "開箱",
//       "category": "review",
//       "tag": [
//         "情書",
//         "聚會",
//         "新手"
//       ],
//       "like": 0,
//       "collect": 0,
//       "author": "Peach",
//       "timestap": 1668303054996,
//       "userId": 1
//     },
//     {
//       "id": 7,
//       "title": "【桌遊】Sagrada 聖家族大教堂",
//       "content": "聖家族大教堂 是一款骰子輪抽的遊戲，玩家扮演彩色玻璃繪製大師，正在與其他玩家一起繪製聖家族大教堂的彩繪玻璃，看誰能把自己負責的彩繪玻璃畫得最為出色。",
//       "link": "",
//       "imgUrl": "img/article7.webp",
//       "tab": "評測",
//       "category": "review",
//       "tag": [
//         "輕策",
//         "骰子",
//         "五彩繽紛",
//         "新手"
//       ],
//       "like": 0,
//       "collect": 0,
//       "author": "PayRoom",
//       "timestap": 1668303231403,
//       "userId": 1
//     },
//     {
//       "id": 8,
//       "title": "【開箱】Everdell 仙境幽谷",
//       "content": "游卡(這款的中文代理商，出三國殺的那個)對台灣這邊的玩家實在不友善，不是只出簡體版(德選、黑天使、牛頓)，就是沒送解鎖項(Root、Everdell)，這款仙境幽谷繁體版硬是比簡體版少了整整25張牌，擴展也只出簡體卡，才3張牌阿...，聽說額外加購的金屬幣也是有不少問題，東西也比對岸慢了一、兩個月才拿到，真是無言...。",
//       "link": "",
//       "imgUrl": "img/article8.webp",
//       "tab": "開箱",
//       "category": "review",
//       "tag": [
//         "中策"
//       ],
//       "like": 0,
//       "collect": 0,
//       "author": "Apple",
//       "timestap": 1668303462361,
//       "userId": 2
//     },
//     {
//       "id": 9,
//       "title": "《沙丘：厄拉科斯之戰》- 史詩聖戰對戰桌遊預購上線",
//       "content": "現在購買直接加碼送足量牌套王SLEEVEKINGS給大家!!預計繁體中文版本會再去做名詞校對喔!大家放心!",
//       "link": "https://wabay.tw/projects/dune-war-for-arrakis?locale=zh-TW",
//       "imgUrl": "img/article9.png",
//       "tab": "眾籌",
//       "category": "preorder",
//       "tag": [
//         "沙丘",
//         "史詩鉅作"
//       ],
//       "like": 0,
//       "collect": 0,
//       "author": "Banana",
//       "timestap": 1668303644574,
//       "userId": 4
//     },
//     {
//       "id": 10,
//       "title": "【桌遊微心得】-花見小路、神探緝凶",
//       "content": "《花見小路》是一款2人卡牌遊戲，藉由送藝妓喜歡的物品來贏的芳心而獲勝，只要贏得4位藝妓(總共7位)或贏得11點以上的魅力值就獲勝，同時達成時贏得11點以上者獲勝。《神探緝凶》是一款捉迷藏的遊戲，一方扮演刑警，另一方扮演逃犯，遊戲中有43張地點牌(0~42)，逃犯藉由打出地點牌模擬逃跑路線，只要連結到地點42而刑警無法全部猜出逃跑路線就獲得勝利了，還沒到42就被抓住，那就是刑警獲勝了。",
//       "link": "",
//       "imgUrl": "img/article10.png",
//       "tab": "評測",
//       "category": "review",
//       "tag": [
//         "輕策",
//         "雙人對戰"
//       ],
//       "like": 0,
//       "collect": 0,
//       "author": "Happy",
//       "timestap": 1668303873291,
//       "userId": 3
//     },
//     {
//       "id": 11,
//       "title": "【開箱】伊斯坦堡-骰子版",
//       "content": "哦～抓到了，有人在市集不顧攤位，在偷玩桌遊！",
//       "link": "",
//       "imgUrl": "img/article11.webp",
//       "tab": "開箱",
//       "category": "review",
//       "tag": [
//         "輕策",
//         "骰子"
//       ],
//       "like": 0,
//       "collect": 0,
//       "author": "PayRoom",
//       "timestap": 1668614347716,
//       "userId": 1
//     },
//     {
//       "id": 12,
//       "title": "【簡記02】漫步普羅旺斯",
//       "content": "繼漫步彩色島之後，來到普羅旺斯啦！在機制上是兩個不同的遊戲，某些方面是有點像啦！一樣在桌子上把卡片拼上去，但比起漫步彩色島，漫步普羅旺斯需要思考的點比較多，整個遊戲感覺就比前者重度重得多，要想辦法去拍照，不論是人拍還是用空拍機拍，常常就是拿個手上的卡片比來比去，然後再拿拍照的透明板再比來比去，別看小小的一盒，玩起來真的很燒腦。",
//       "link": "",
//       "imgUrl": "img/article12.webp",
//       "tab": "評測",
//       "category": "review",
//       "tag": [
//         "輕策",
//         "機制特別"
//       ],
//       "like": 0,
//       "collect": 0,
//       "author": "黃色狂想",
//       "timestap": 1668614522226,
//       "userId": 1
//     },
//     {
//       "id": 13,
//       "title": "【開箱+規則】腹黑菓子店",
//       "content": "在月光桌遊節的時候有看見攤位，當時以為只有宣傳，不過好像當時就有開賣了(不太清楚)，其實一開始看見它上嘖嘖時，一開始美術就打中我了，不過看到後面發現其實遊戲已經算是完成了，而且也在海外的展會上有販售，心中就有疑問：「這種情況幹嘛上眾籌？直接預售就可以了吧？」，眾籌應該是『我有個點子，先做出個原型或概念圖讓大家看，請大家投錢給我讓我做出來』，而不是『遊戲我已經做好了，先上眾籌賺一波』，雖然這樣並沒有違規，但總覺得跟眾籌的本意有些落差。",
//       "link": "",
//       "imgUrl": "img/article13.webp",
//       "tab": "開箱",
//       "category": "review",
//       "tag": [
//         "輕策",
//         "派對遊戲",
//         "可愛動物"
//       ],
//       "like": 0,
//       "collect": 0,
//       "timestap": 1668614698845,
//       "userId": 2
//     },
//     {
//       "id": 14,
//       "title": "【咖啡商人 預購活動】",
//       "content": "遊戲支持2-5人遊玩，每名玩家需要經營一家咖啡貿易公司！在上世紀70年代阿拉比卡咖啡的黃金浪潮中，選擇咖啡種植原，派遣工人，建造自己的工廠，進行貿易，與連鎖咖啡廳簽合約等！用你獨特的商業眼光，在眾多的兢爭者中脫穎而出，打造屬於自己的咖啡帝國！作為純正的德式重策桌遊，遊戲沒有骰子，需要注重每一步發展。充足的遊戲細節支撐整個遊戲體系！在2021年當時備受關注德的德式重策遊戲，一定不會讓各位資深玩家失望！此為簡體中文版本，附繁體中文說明書本次預購含募資全解鎖項，售完為止",
//       "link": "",
//       "imgUrl": "img/article14.webp",
//       "tab": "預購",
//       "category": "preorder",
//       "tag": [
//         "重測",
//         "手繪風"
//       ],
//       "like": 0,
//       "collect": 0,
//       "author": "PayRoom",
//       "timestap": 1668615006356,
//       "userId": 1
//     },
//     {
//       "id": 15,
//       "title": "《Familiar Tales 森靈傳記》預購",
//       "content": "遊戲進行方式也很像《忘海傳記》，玩家中的角色將都會獲得經驗，並且我們要用這些經驗去建構自己的技能卡組，然後用這套技能卡組去各種劇情戰役中進行活動，然後收集資源還有打造裝備！",
//       "link": "",
//       "imgUrl": "img/article15.jpg",
//       "tab": "預購",
//       "category": "preorder",
//       "tag": [
//         "輕策",
//         "機制特別",
//         "劇情"
//       ],
//       "like": 0,
//       "collect": 0,
//       "author": "藍色最深",
//       "timestap": 1668616145495,
//       "userId": 2
//     },
//     {
//       "id": 16,
//       "title": "十款新手入坑必備桌遊",
//       "content": "想要入坑卻不知道如何開始嗎?想要砌桌遊牆卻無從下手嗎?想要的話可以全部給你，去找吧！ 我把所有答案都放在文章裡面。",
//       "link": "",
//       "imgUrl": "img/article16.jpg",
//       "tab": "新手",
//       "category": "rookie",
//       "tag": [
//         "輕策",
//         "機制特別",
//         "劇情"
//       ],
//       "like": 0,
//       "collect": 0,
//       "timestap": 1670423652348,
//       "userId": 1
//     },
//     {
//       "id": 17,
//       "title": "超人氣笑瘋派對桌遊『瞎掰王』嘖嘖上線啦",
//       "content": "玩派對桌遊的最核心重點！講幹話!!，熱銷亞洲的派對桌遊!這是款專為講幹話設計的遊戲！到底誰在講真話，誰在瞎掰？ 2023年最該玩的桌遊！這次同步集資與印刷！會讓大家在聖誕節前拿到喔！就是要讓你從2022年一路講幹話到2023年",
//       "link": "https://dogbarktrain.pse.is/4mtgkq",
//       "imgUrl": "img/article17.jpg",
//       "tab": "集資",
//       "category": "preorder",
//       "tag": [],
//       "like": 0,
//       "collect": 0,
//       "timestap": 1670997531169,
//       "userId": 1
//     },
//     {
//       "id": 18,
//       "title": "《That Time You Killed Me 煞有其時 預購》",
//       "content": "2022 最別出心裁的雙人遊戲 That Time You Killed Me 煞有其時，是一款在 BGG 勇奪 7.7 分高分評價的兩人抽象期類遊戲，別讓未來的你殺了你自己！在遊戲中，玩家雙方是時空旅行的發明者，為了證明自己才是時空旅行的發明者，所以打算將對手滅口，從現在、未來甚至到過去，如何欲判你對手的行動並搶先一步在不同的時空之間穿梭壓制對方，就將成為你重要的人生目標！",
//       "link": "",
//       "imgUrl": "img/article18.jpg",
//       "tab": "預購",
//       "category": "preorder",
//       "tag": [],
//       "like": 0,
//       "collect": 0,
//       "timestap": 1670998072455,
//       "userId": 1
//     }
//   ],
//   "users": [
//     {
//       "email": "water38198@gmail.com",
//       "password": "$2a$10$Ylla4YI6QF2G326vm7T9.OabjlFlNivewY0PETUxSGkyD.ShVX7ry",
//       "nickname": "PayRoom",
//       "isAdmin": false,
//       "id": 1
//     }
//   ],
//   "bookmarks": []
// }
