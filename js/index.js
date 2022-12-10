//所有文章資料
let articlesData = [];

function init() {
    axios.get(`${api_path}/articles`).then((res) => {
        articlesData = res.data;
        renderHeadline();
        renderlatestArticleList();
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
    latestHeadline.setAttribute(
        "style",
        `background-image:url(${headlineData.imgUrl})`
    );
    latestHeadline.innerHTML = `        <a
    href="#"
    style="background: linear-gradient(
        180.18deg,rgba(0, 0, 0, 0) 55.26%, #000000 97.99%); ";
    >
    <div class="tab">
    <span href="#" class=tab-${headlineData.category}>${headlineData.tab}</span>
    </div>
    <h2>${headlineData.title}</h2>

        </a>`;
}
function renderlatestArticleList() {
    const latestArticleList = document.querySelector(".latest .articles-list");
    let str = "";
    const latestData = articlesData.slice(1, 4);
    latestData.forEach((article) => {
        str += `<li>
                <a href="#">
                    <div class="articles-list-img">
                        <img src="${article.imgUrl}" alt="" />
                    </div>
                    <div class="articles-info">
                        <h3>${article.title}</h3>
                        <div class="tab">
                            <span href="#" class="">${article.tab}</span>
                        </div>                       
                    </div>

                </a>
            </li>`;
    });
    latestArticleList.innerHTML = str;
}

function renderNewsList() {
    const newsList = document.querySelector(".news .articles-list");
    let str = "";
    const newsListData = articlesData.filter(
        (article) => article.category === "news"
    );
    newsListData.forEach((article) => {
        str += `<li>
                <a href="#">
                    <div class="articles-list-img">
                        <img src="${article.imgUrl}" alt="" />
                    </div>
                    <div class="articles-info">
                        <h3>${article.title}</h3>
                        <div class="tab">
                            <span href="#" class="">${article.tab}</span>
                        </div>                       
                    </div>

                </a>
            </li>`;
    });
    newsList.innerHTML = str;
}

function renderColumnsList() {
    const columnsList = document.querySelector(".columns .articles-list");
    let str = "";
    const newsListData = articlesData.filter(
        (article) => article.category === "columns"
    );
    newsListData.forEach((article) => {
        str += `<li>
                <a href="#">
                    <div class="articles-list-img">
                        <img src="${article.imgUrl}" alt="" />
                    </div>
                    <div class="articles-info">
                        <h3>${article.title}</h3>
                        <div class="tab">
                            <span href="#" class="">${article.tab}</span>
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
        str += `            <li>
    <a href="#">
      <img src="${article.imgUrl}" alt="" />
      <div class="articles-info">
        <h3>${article.title}</h3>
      </div>
      <div class="tab">
        <span href="#" class="tab-news">${article.tab}</span>
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
    const top5 = preorderListData.slice(-5).reverse();
    top5.forEach((article) => {
        str += `            <li>
      <a href="#">
        <img src="${article.imgUrl}" alt="" />
        <div class="articles-info">
          <h3>${article.title}</h3>
        </div>
        <div class="tab">
          <span href="#" class="tab-news">${article.tab}</span>
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
    console.log(rookieListData);

    let str = "";
    const top3 = rookieListData.slice(-5).reverse();
    top3.forEach((article) => {
        str += `            <li>
      <a href="#">
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

//日期轉換
function dateTrans(num) {
    const date = new Date(num);
    const str = `${date.getFullYear()}/${
        date.getMonth() + 1
    }/${date.getDate()}`;
    return str;
}
dateTrans(1670310075213);
