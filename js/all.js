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
