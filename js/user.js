let userProfileData = [];
let userBookmarkData = [];
let profileUrl = `${api_path}/600/users/${userId}`;
let bookmarkUrl = `${api_path}/660/bookmarks?userId=${userId}&_expand=article`;
const headers = {
    headers: {
        authorization: `Bearer ${token}`,
    },
};
// 如果資料有缺失，先連結到登入頁面
if (userId === "" || userNickname === "" || token === "") {
    errHappened();
} else {
    // 初始化
    initUser();
}

function initUser() {
    Promise.all([
        axios.get(profileUrl, headers),
        axios.get(bookmarkUrl, headers),
    ])
        .then((res) => {
            userProfileData = res[0].data;
            userBookmarkData = res[1].data || [];
            const sidebarName = document.querySelector(".user-sidebar h3");
            sidebarName.innerHTML = `<img src="img/user-avatar.png" alt="">${userProfileData.nickname}`;
            const sidebarEmail = document.querySelector(".sidebar-email");
            sidebarEmail.textContent = `${userProfileData.email}`;
            const type = location.href.split("?")[1] || "";
            if (type.includes("bookmark")) {
                renderUserBookmark();
            } else {
                renderUserProfile();
            }
        })
        .catch((err) => {
            console.log(err.response.data);
            if (err.response.data === "jwt expired") {
                errHappened("閒置過久麻煩重新登入");
            } else {
                errHappened();
            }
        });
}

const userMain = document.querySelector(".user-main");
//渲染個人檔案頁面
function renderUserProfile() {
    userMain.innerHTML = `
                <h2>個人檔案</h2>
                <p>你可以在這裡編輯個人資訊</p>
                <form action="" class="user-form">
                    <div class="user-input-container">
                        <div class="user-input-label">
                        <label for="userEmail">Email：</label>
                        </div>
                        <span class="user-Email" id="userEmail">${userProfileData.email}</span>
                    </div>
                    <div class="user-input-container">
                        <div class="user-input-label">
                            <label for="userpassword">密碼：</label>
                        </div>
                        <input type="password" value=${userProfileData.password} id ="userPassword" disabled>
                        <a href="" data-type="userPassword">修改</a>
                    </div>
                    <div class="user-input-container">
                        <div class="user-input-label">
                            <label for="userNickname">暱稱：</label>
                        </div>
                        <input type="text" value=${userProfileData.nickname} id ="userNickname" disabled>
                        <a href="" data-type="userNickname">修改</a>
                    </div>
                    <div class="user-input-container user-profile-btn">
                        <input type="button" value="確定">
                    </div>
                </form>
    `;
}

// 渲染收藏文章(書籤)頁面
function renderUserBookmark() {
    let str = "";
    userBookmarkData.forEach((item) => {
        str += `
                        <tr>
                            <td  class="bookmark-title"> <a href="">${
                                item.article.title
                            }</a></td>
                            <td class="bookmark-time">${timeTrans(
                                item.timestap
                            )}</td>
                            <td><a href="" class="bookmark-del" data-id=${
                                item.id
                            }>刪除</a></td>
                        </tr>
        `;
    });
    userMain.innerHTML = `
                    <h2>收藏文章</h2>
                <p>你可以在這裡查看、刪除已收藏的文章</p>
                <div>
                <table class="user-bookmark-table">
                    <thead>
                        <tr>
                            <th>文章標題</th>
                            <th>加入時間</th>
                            <th>編輯</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${str}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>已收藏${userBookmarkData.length}篇文章</th>
                            <td></td>
                            <td><a href="" class="bookmark-delAll">刪除全部</a></td>
                        </tr>
                    </tfoot>
                </table>
                </div>
    `;
}

// 錯誤發生的提示函示
function errHappened(str = "抱歉，某些錯誤發生了，請重新登入") {
    Swal.fire({
        title: "請重新登入",
        text: str,
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#4e4e4e",
        confirmButtonText: "確定",
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear();
            location.href = "login.html";
        } else {
            localStorage.clear();
            location.href = "login.html";
        }
    });
}

// 點擊修改
userMain.addEventListener("click", (e) => {
    e.preventDefault();
    // 確認點擊到的是修改
    if (e.target.nodeName === "A" && e.target.textContent === "修改") {
        const target = e.target.getAttribute("data-type");
        const targetEl = document.querySelector(`#${target}`);
        // 讓前面的input可以被修改
        targetEl.removeAttribute("disabled");
        //游標跳到input內
        targetEl.focus();
        // 會跑到最前方，所以需要調整到最後面
        targetEl.setSelectionRange(
            targetEl.value.length,
            targetEl.value.length
        );
        targetEl.classList.add("input-active");
        e.target.setAttribute("style", "display:none;");
    } else if (
        //如果是點擊到確定按鈕
        e.target.nodeName === "INPUT" &&
        e.target.getAttribute("type") === "button"
    ) {
        const newData = {
            password: document.querySelector("#userPassword").value,
            nickname: document.querySelector("#userNickname").value,
        };
        axios.patch(profileUrl, newData, headers).then((res) => {
            console.log(res);
            Swal.fire({
                title: "請重新登入",
                text: "因為您修改了個人資料，麻煩請重新登入",
                icon: "success",
                showCancelButton: false,
                confirmButtonColor: "#4e4e4e",
                confirmButtonText: "確定",
                timer: 5000,
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.clear();
                    location.href = "login.html";
                } else {
                    localStorage.clear();
                    location.href = "login.html";
                }
            });
        });
    }
});

const logoutBtn = document.querySelector(".user-sidebar-logout a");

// sidebar的登出按鈕
logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    location.href = "login.html";
    localStorage.clear();
});

//時間轉換
function timeTrans(num) {
    const date = new Date(num);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

//刪除收藏文章
userMain.addEventListener("click", (e) => {
    //刪除特定單筆
    if (e.target.nodeName === "A" && e.target.textContent === "刪除") {
        const id = e.target.getAttribute("data-id");
        axios
            .delete(`${api_path}/600/bookmarks/${id}`, headers)
            .then(() => {
                Swal.fire({
                    title: "確定嗎?",
                    text: "這將會清除此收藏文章喔",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#737373",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "確定",
                    cancelButtonText: "取消",
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "刪除成功!",
                            icon: "success",
                            confirmButtonColor: "#737373",
                        });
                        axios.get(bookmarkUrl, headers).then((res) => {
                            userBookmarkData = res.data;
                            renderUserBookmark();
                        });
                    }
                });
            })
            .catch((err) => {
                console.log(err);
            });
    } else if (
        e.target.nodeName === "A" &&
        e.target.textContent === "刪除全部" &&
        userBookmarkData.length !== 0
    ) {
        Swal.fire({
            title: "確定嗎?",
            text: "這將會清除所有收藏文章喔",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#737373",
            cancelButtonColor: "#d33",
            confirmButtonText: "確定",
            cancelButtonText: "取消",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "刪除成功!",
                    text: "您的列表已經被清空",
                    icon: "success",
                    confirmButtonColor: "#737373",
                });
                const deleteArr = [];
                userBookmarkData.forEach((bookmark) => {
                    deleteArr.push(
                        axios.delete(
                            `${api_path}/600/bookmarks/${bookmark.id}`,
                            headers
                        )
                    );
                });
                Promise.all(deleteArr)
                    .then(() => {
                        axios.get(bookmarkUrl, headers).then((res) => {
                            userBookmarkData = res.data;
                            renderUserBookmark();
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        });
    }
});
