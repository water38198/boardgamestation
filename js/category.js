//初始化

function init() {
    getCategory();
}
init();

//取得分類名稱
function getCategory() {
    const category = location.href.split("?");
    console.log(category);
}
