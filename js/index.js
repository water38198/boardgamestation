//所有文章資料
let articlesData = [];

function init() {
    //先獲得全部的文章資料並排序(日期最近)，再做渲染
    axios.get(`${api_path}/articles?_sort=timestap&_order=desc`).then((res) => {
        articlesData = res.data;
        renderHeadline();
        renderLatestList();
        renderNewsList();
        renderColumnsList();
        renderReviewList();
        renderRookieList();
        renderPreorderList();
    });
}

init();

function renderHeadline() {
    const latestHeadline = document.querySelector(".latest-headline");
    const headlineData = articlesData[0];
    // 設定背景大圖
    latestHeadline.setAttribute(
        "style",
        `background-image:url(${headlineData.imgUrl})`
    );
    latestHeadline.innerHTML = `        <a
    href="article.html?articleId=${headlineData.id}"
    style="background: linear-gradient(
        180.18deg,rgba(0, 0, 0, 0) 55.26%, #000000 97.99%); ";
    >
    <div class="tab">
    <span href="#" class=tab-headline>${headlineData.category}</span>
    </div>
    <h2>${headlineData.title}</h2>

        </a>`;
}
// 最新消息
function renderLatestList() {
    const latestList = document.querySelector(".latest .index-articles-list");
    let str = "";
    const latestData = articlesData.slice(1, 4);
    latestData.forEach((article) => {
        str += `<li>
                <a href="article.html?articleId=${article.id}">
                    <div class="index-articles-list-img">
                        <img src="${article.imgUrl}" alt="" />
                    </div>
                    <div class="index-articles-info">
                        <h3>${article.title}</h3>
                        <div class="tab">
                            <span href="#" class="">${article.category}</span>
                        </div>                       
                    </div>

                </a>
            </li>`;
    });
    latestList.innerHTML = str;
}
// 新聞列表
function renderNewsList() {
    const newsList = document.querySelector(".news .index-articles-list");
    let str = "";
    const newsListData = articlesData.filter(
        (article) => article.category === "news"
    );
    newsListData.forEach((article) => {
        str += `<li>
                <a href="article.html?articleId=${article.id}">
                    <div class="index-articles-list-img">
                        <img src="${article.imgUrl}" alt="" />
                    </div>
                    <div class="index-articles-info">
                        <h3>${article.title}</h3>
                        <div class="tab">
                            <span href="#" class="">${article.category}</span>
                        </div>                       
                    </div>

                </a>
            </li>`;
    });
    newsList.innerHTML = str;
}
// 專欄
function renderColumnsList() {
    const columnsList = document.querySelector(".columns .index-articles-list");
    let str = "";
    const newsListData = articlesData.filter(
        (article) => article.category === "columns"
    );
    newsListData.forEach((article) => {
        str += `<li>
                <a href="article.html?articleId=${article.id}">
                    <div class="index-articles-list-img">
                        <img src="${article.imgUrl}" alt="" />
                    </div>
                    <div class="index-articles-info">
                        <h3>${article.title}</h3>
                        <div class="tab">
                            <span href="#" class="">${article.category}</span>
                        </div>                       
                    </div>
                </a>
            </li>`;
    });
    columnsList.innerHTML = str;
}

// 開箱評測
function renderReviewList() {
    const reviewList = document.querySelector(".unboxings ul");
    const reviewListData = articlesData.filter(
        (article) => article.category === "review"
    );
    let str = "";
    const top5 = reviewListData.slice(-5).reverse();
    top5.forEach((article) => {
        str += `<li>
                    <a href="article.html?articleId=${article.id}">
                        <img src="${article.imgUrl}" alt="" />
                        <div class="index-articles-info">
                            <h3>${article.title}</h3>
                        </div>
                        <div class="tab">
                            <span href="#" class="tab-news">${article.category}</span>
                        </div>
                    </a>
                </li>`;
        reviewList.innerHTML = str;
    });
}
// 預購眾籌
function renderPreorderList() {
    const preorderList = document.querySelector(".preorders ul");
    const preorderListData = articlesData.filter(
        (article) => article.category === "preorder"
    );
    let str = "";
    const top5 = preorderListData.slice(0, 5);
    top5.forEach((article) => {
        str += `            <li>
      <a href="article.html?articleId=${article.id}">
        <img src="${article.imgUrl}" alt="" />
        <div class="index-articles-info">
          <h3>${article.title}</h3>
        </div>
        <div class="tab">
          <span href="#" class="tab-news">${article.category}</span>
        </div>
      </a>
    </li>`;
        preorderList.innerHTML = str;
    });
}

//新手入門
function renderRookieList() {
    const rookieList = document.querySelector(".rookie ul");
    const rookieListData = articlesData.filter(
        (article) => article.category === "rookie"
    );

    let str = "";
    const top3 = rookieListData.slice(-5).reverse();
    top3.forEach((article) => {
        str += `            <li>
      <a href="article.html?articleId=${article.id}">
        <div class="big-article-img">
          <img src="${article.imgUrl}" alt="" />
        </div>
        <div class="big-article-info">
          <h3>${article.title}</h3>
          <p>${article.content}</p>
        </div>
      </a>
    </li>`;
        rookieList.innerHTML = str;
    });
}
