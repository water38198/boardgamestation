// RWD nav列
const hamMenu = document.querySelector(".ham-menu-button");
hamMenu.addEventListener("click", function (e) {
    e.preventDefault();
    const navList = document.querySelector(".nav-list");
    navList.classList.toggle("menu-show");
});
const hamMenuSearch = document.querySelector(".ham-menu-serach");
hamMenuSearch.addEventListener("click", function (e) {
    e.preventDefault();
    e.target.setAttribute("style", "display:none;");
    const navSearch = document.querySelector(".nav-search");
    navSearch.classList.toggle("search-show");
});

const searchBtn = document.querySelector(".nav-search a");
//點擊放大鏡按鈕執行搜尋
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const value = searchInput.value;
    location.href = `category.html?q=${value}`;
});

const searchInput = document.querySelector(".nav-search input");
//按下Enter鍵搜尋
searchInput.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        const value = searchInput.value;
        location.href = `category.html?q=${value}`;
    }
});

const dropList = document.querySelector(".nav-user-dropList ul");

// 載入localStorage參數
token = localStorage.getItem("token") || "";
const userId = localStorage.getItem("userId") || "";
const userNickname = localStorage.getItem("userNickname") || "";
const userEmail = localStorage.getItem("userEmail") || "";
const userSection = document.querySelector(".nav-user");
const loginSection = document.querySelector(".nav-login");

//登入狀態函式
function loginStatus() {
    //從localStorage抓會員資料，如果沒有設為空字串
    //如果資料不完整或是未登入狀態
    if (
        userId === "" ||
        userNickname === "" ||
        userEmail === "" ||
        token === ""
    ) {
        //將 登入&註冊 顯示
        loginSection.classList.toggle("toshow");
    } else {
        //顯示用戶名稱
        document.querySelector(".user-name span").textContent = userNickname;
        userSection.classList.toggle("toshow");
        //id埋入下拉選單a連結裡面
        dropList.innerHTML = `
        <li><a href="user.html?profile">會員資料</a></li>
        <li><a href="user.html?bookmark">收藏列表</a></li>
        <li><a href="" class="user-logOut">登出</a></li>
        `;
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

// [    {
//   "id": 1,
//   "email": "water38198@gmail.com",
//   "password": "123456789",
//   "name": "PayRoom"
// },
// {
//   "id": 2,
//   "email": "abc123@gmail.com",
//   "password": "555666",
//   "name": "Apple"
// },
// {
//   "id": 3,
//   "email": "happy789@gmail.com",
//   "password": "iamhappy",
//   "name": "Happy"
// },
// {
//   "id": 4,
//   "email": "banana41335@gmail.com",
//   "password": "iambanana",
//   "name": "Banana"
// },
// {
//   "id": 5,
//   "email": "peach656@gmail.com",
//   "password": "iampeach",
//   "name": "Peach"
// },
// {
//   "id": 6,
//   "email": "melon7@gmail.com",
//   "password": "iammelon",
//   "name": "甜瓜"
// },
// {
//   "id": 7,
//   "email": "orange777@gmail.com",
//   "password": "iamorange",
//   "name": "橘子哥"
// },
// {
//   "id": 8,
//   "email": "strawberry3366@gmail.com",
//   "password": "iamstrawberry",
//   "name": "草莓王"
// },
// {
//   "id": 9,
//   "email": "blackberry3366@gmail.com",
//   "password": "iamblackberry",
//   "name": "黑莓大大"
// },
// {
//   "id": 10,
//   "email": "blueberry31123@gmail.com",
//   "password": "iamblueberry",
//   "name": "藍莓口味"
// },
// {
//   "id": 11,
//   "email": "red8642@gmail.com",
//   "password": "redisbest",
//   "name": "紅色最高"
// },
// {
//   "id": 12,
//   "email": "blue779@gmail.com",
//   "password": "blueisbest",
//   "name": "藍色最深"
// },
// {
//   "id": 13,
//   "email": "yellow652143@gmail.com",
//   "password": "yellowisbest",
//   "name": "黃色狂想"
// },
// {
//   "id": 14,
//   "email": "white999@gmail.com",
//   "password": "whiteisbest",
//   "name": "白色幻想"
// },
// {
//   "id": 15,
//   "email": "black666@gmail.com",
//   "password": "blackisbest",
//   "name": "黑色毀滅"
// }]
