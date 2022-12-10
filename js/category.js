const categoryTitle = document.querySelector(".category-title");
console.log(categoryTitle)



//初始化
function init() {
    getCategory();
}
init();

//取得分類名稱
function getCategory() {
    let articlesData =[]
    const category = location.href.split("?")[1].split("&name=")[0];
    const name =decodeURI(location.href.split("?")[1].split("&name=")[1])
    categoryTitle.innerHTML = `<img src="img/icon-title mark.png" alt="">${name}`;
    console.log(category);
    console.log(name)
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

function renderCategory(data){
    let str = "";
    const articleList = document.querySelector(".category-articles-list");
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
