const categoryTitle = document.querySelector(".category-title");
const articleList = document.querySelector(".category-articles-list");


//初始化
function init() {
    getCategory();
}
init();

//取得分類名稱
function getCategory() {
    //搜尋
    if(location.href.includes("?q=")){
        //q="搜尋內容
        const searchName = location.href.split("?")[1];
        //抓取相關文章並排序(日期最近)
        axios.get(`${api_path}/articles?${searchName}&_sort=timestap&_order=desc`).then(res=>{
            renderCategory(res.data);
            if(res.data.length === 0){
                articleList.innerHTML = `<div class="cantFind">
                                            <h3>
                                            很抱歉找不到您要的資料
                                            </h3>
                                            <div>
                                                <img src="img/cantFind.jpg" alt="">
                                            </div>
                                        </div>`
            }
            categoryTitle.textContent = `搜尋 ${decodeURI(location.href.split("?q=")[1])} 的結果如下`;
        })
    }else{
        //分類文章
        let articlesData =[]
        const category = location.href.split("?")[1].split("&name=")[0];
        const name =decodeURI(location.href.split("?")[1].split("&name=")[1])
        categoryTitle.innerHTML = `<img src="img/icon-title mark.png" alt="">${name}`;
        //如果是最新消息，直接將所有文章排序
        if(category === "category=latest"){
            axios.get(`${api_path}/articles?_sort=timestap&_order=desc`).then(res=>{
                articlesData = res.data
                renderCategory(articlesData)
            })
        }else{
        axios.get(`${api_path}/articles?${category}&_sort=timestap&_order=desc`).then(res=>{
            articlesData = res.data
            renderCategory(articlesData)
        })
        }
    }







}

function renderCategory(data){
    let str = "";
    data.forEach(article=>{
        str+=`                    <li>
        <a href="#">
        <div class="article-img"><img src=${article.imgUrl} alt=""></div>
        <div class="article-info">
            <h3 class="article-title">${article.title}</h3>
            <p class="article-content">${article.content}</p>
            <div class="article-tab">
                <span>${article.tab}</span>
            </div>
        </div>
        </a>
    </li>`;
    articleList.innerHTML =str;
    })
}
