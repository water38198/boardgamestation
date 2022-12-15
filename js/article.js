const articleId = location.href.split("?articleId=")[1];
const articleUrl = `${api_path}/articles/${articleId}?_expand=user&_embed=bookmark`;
const bookmarkUrl = `${api_path}/articles/${articleId}/bookmarks`;
let bookmarkNum = 0;
let articleData = {};
let hasthisBookmark = [];
const headers = {
    headers: {
        authorization: `Bearer ${token}`,
    },
};
//取得文章資料
function getArticleData() {
    return axios.get(articleUrl);
}
// 取得本文被收藏次數
function getBookmarkNum() {
    return axios.get(bookmarkUrl);
}

function initArticle() {
    if (articleId === undefined) {
        Swal.fire({
            icon: "error",
            title: "哇...有東西出錯了",
            text: "3秒後將轉移到首頁",
            showConfirmButton: false,
            timer: 3000,
        }).then(() => {
            location.href = "index.html";
        });
    }
    Promise.all([getArticleData(), getBookmarkNum()])
        .then((res) => {
            articleData = res[0].data;
            bookmarkNum = res[1].data.length;
            renderArticle();
        })
        .catch((err) => {
            console.log(err);
        });
}
initArticle();

// 渲染文章
function renderArticle() {
    const articleMain = document.querySelector(".article-main");
    let tagStr = "";
    const tagData = articleData.tag;
    if (tagData.length > 0) {
        tagData.forEach((tag) => {
            tagStr += `<a href="category.html?q=${tag}"><img src="img/icon-tag.png" alt="">${tag}</a>`;
        });
    }
    let str = `
                        <ul class="article-breadcrumbs">
                        <li><a href="index.html">首頁</a></li>
                        <li><a href="category.html?category=${
                            articleData.category
                        }&name=${articleData.tab}">${articleData.tab}</a></li>
                        <li class="active">  ${articleData.title}</li>
                    </ul>
                    <h1 class="article-title">${articleData.title}</h1>
                    <ul class="article-info">
                        <li> <img src="img/icon-avatar-black.png" alt=""> ${
                            articleData.user.nickname
                        }</li>
                        <li> <img src="img/icon-clock.png" alt="">${timeTrans(
                            articleData.timestap
                        )}</li>
                        <li class="bookmarkNum">${bookmarkNum} 人收藏</li>
                        <li class="add-bookmark"><a href="" ><img src="img/heart-empty.png" alt="" >加入收藏</a></li>
                        <li class="remove-bookmark"><a href="" ><img src="img/heart-full.png" alt="" >已收藏</a></li>
                    </ul>
                    <div class="article-content">
                        <div class="article-img">
                        <img src="${articleData.imgUrl}" alt="">
                        </div>
                        <p>${articleData.content}</p>
                        <div class="article-tags">${tagStr}</div>
                    </div>
    `;
    articleMain.innerHTML = str;

    // 收藏狀態
    const addBookmark = document.querySelector(".add-bookmark");
    const removeBookmark = document.querySelector(".remove-bookmark");
    console.log(addBookmark);
    //如果沒登入
    if (token === "") {
        addBookmark.classList.add("toshow");
    } else {
        const thisBookmarkUrl = `${api_path}/660/articles/${articleId}/bookmarks?userId=${userId}`;
        // 戳一下API看書籤裡面有沒有這篇文章
        axios.get(thisBookmarkUrl, headers).then((res) => {
            hasthisBookmark = res.data;
            console.log(hasthisBookmark);
            // 有此書籤顯示紅愛心
            if (hasthisBookmark.length !== 0) {
                removeBookmark.classList.add("toshow");
            } else {
                //未登錄 或是 沒有此書籤 顯示空愛心
                addBookmark.classList.add("toshow");
            }
        });
    }
    //收藏與取消收藏的點擊事件
    addBookmark.addEventListener("click", (e) => {
        e.preventDefault();
        // 先檢查是否登入
        if (token === "") {
            location.href = "login.html";
        } else {
            const newBookmark = {
                userId: `${userId}`,
                timestap: Date.now(),
            };
            axios.post(bookmarkUrl, newBookmark, headers).then((res) => {
                Swal.fire({
                    icon: "success",
                    title: "成功加入收藏文章",
                    showConfirmButton: false,
                    timer: 1500,
                });
                console.log(res);
                addBookmark.classList.toggle("toshow");
                removeBookmark.classList.toggle("toshow");
                hasthisBookmark.push(res.data);
                changeBookmarkNum();
            });
        }
    });
    removeBookmark.addEventListener("click", (e) => {
        e.preventDefault();
        axios
            .delete(
                `${api_path}/600/bookmarks/${hasthisBookmark[0].id}`,
                headers
            )
            .then((res) => {
                Swal.fire({
                    icon: "success",
                    title: "成功移除收藏文章",
                    showConfirmButton: false,
                    timer: 1500,
                });
                addBookmark.classList.toggle("toshow");
                removeBookmark.classList.toggle("toshow");
                hasthisBookmark = [];
                changeBookmarkNum();
            });
    });
}

//時間轉換
function timeTrans(num) {
    const date = new Date(num);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

// 改變收藏人數
function changeBookmarkNum() {
    const num = document.querySelector(".bookmarkNum");
    getBookmarkNum().then((res) => {
        bookmarkNum = res.data.length;
        num.textContent = `${bookmarkNum}人收藏`;
    });
}
