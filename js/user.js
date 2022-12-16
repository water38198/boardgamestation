let userProfileData = [];
let userBookmarkData = [];
let profileUrl = `${api_path}/600/users/${userId}`;
let bookmarkUrl = `${api_path}/660/bookmarks?userId=${userId}&_expand=article`;
let type = "";
const headers = {
    headers: {
        authorization: `Bearer ${token}`,
    },
};
// 如果localStorage資料有缺失，先連結到登入頁面
if (userId === "" || userNickname === "" || token === "") {
    errHappened();
} else {
    // 初始化
    initUser();
}

// 錯誤發生的提示函示
function errHappened(err = "抱歉，某些錯誤發生了，請重新登入") {
    Swal.fire({
        title: "請重新登入",
        text: err,
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

// 初始化本頁
function initUser() {
    //取得會員資料與書籤資料
    Promise.all([
        axios.get(profileUrl, headers),
        axios.get(bookmarkUrl, headers),
    ])
        .then((res) => {
            userProfileData = res[0].data;
            userBookmarkData = res[1].data || [];
            //SideBar的渲染
            renderSidebar();

            //是否為管理者
            const isAdmin = userProfileData.isAdmin;
            if (isAdmin) {
                //顯示後台管理頁面
                const manageList = document.querySelector(".manage-list");
                manageList.classList.add("toshow");
            }
            //判斷頁面
            type = location.href.split("?")[1] || "";
            filterType(type);
        })
        .catch((err) => {
            console.log(err);
            console.log(err.response.data);
            if (err.response.data === "jwt expired") {
                errHappened("閒置過久麻煩重新登入");
            } else {
                errHappened();
            }
        });
}

//渲染邊欄
function renderSidebar() {
    // ex:機器人一號
    const sidebarName = document.querySelector(".user-sidebar h3");
    sidebarName.innerHTML = `<img src="img/user-avatar.png" alt="">${userProfileData.nickname}`;
    // ex:test123@gmail.com
    const sidebarEmail = document.querySelector(".sidebar-email");
    sidebarEmail.textContent = `${userProfileData.email}`;
}

// 判別目前頁面
function filterType(type) {
    if (type === "bookmark") {
        renderUserBookmark();
    } else if (
        type === "manage-myArticles" &&
        localStorage.getItem("isAdmin") === "true"
    ) {
        renderMyArticles();
    } else if (type === "profile") {
        renderUserProfile();
    } else if (
        type === "manage-allArticles" &&
        localStorage.getItem("isAdmin") === "true"
    ) {
        renderAllArticles();
    } else if (
        type === "manage-allUsers" &&
        localStorage.getItem("isAdmin") === "true"
    ) {
        renderAllUsers();
    } else {
        errHappened();
        location.href = "index.html";
    }
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
                        <a href="" data-type="userPassword">變更</a>
                    </div>
                    <div class="user-input-container">
                        <div class="user-input-label">
                            <label for="userNickname">暱稱：</label>
                        </div>
                        <input type="text" value=${userProfileData.nickname} id ="userNickname" disabled>
                        <a href="" data-type="userNickname">變更</a>
                    </div>
                    <div class="user-input-container user-profile-btn">
                        <input type="button" value="確定" class="confirm-btn">
                        <input type="button" value="取消" class="cancel-btn">
                    </div>
                </form>
    `;
}

// 個人檔案頁面點擊事件;
userMain.addEventListener("click", (e) => {
    if (
        e.target.nodeName === "A" &&
        e.target.textContent === "變更" &&
        type === "profile"
    ) {
        e.preventDefault();
        editProfile(e);
    } else if (
        //點擊確定
        e.target.nodeName === "INPUT" &&
        e.target.getAttribute("class") === "confirm-btn" &&
        type === "profile"
    ) {
        confirmProfile();
    } else if (
        //點擊取消
        e.target.nodeName === "INPUT" &&
        e.target.getAttribute("class") === "cancel-btn" &&
        type === "profile"
    ) {
        cancelProfile();
    }
});

// 渲染收藏文章(書籤)頁面
function renderUserBookmark() {
    let str = "";
    userBookmarkData.forEach((item) => {
        str += `
                        <tr>
                            <td  class="table-title"> <a href="article.html?articleId=${
                                item.article.id
                            }"><img src=${
            item.article.imgUrl === undefined
                ? "img/icon-imageError.png"
                : item.article.imgUrl
        } alt="">${item.article.title}</a></td>
                            <td class="table-time">${timeTrans(
                                item.timestap
                            )}</td>
                            <td><a href="" class="table-del" data-id=${
                                item.id
                            }>刪除</a></td>
                        </tr>
        `;
    });
    userMain.innerHTML = `
                    <h2>收藏文章</h2>
                    <p>你可以在這裡查看、刪除已收藏的文章</p>
                    <div>
                        <table class="user-table">
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
                                    <td>
                                        <a href="" class="table-delAll">刪除全部</a>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
    `;
}
// 收藏文章點擊事件
userMain.addEventListener("click", (e) => {
    if (
        // 點擊單一刪除
        e.target.nodeName === "A" &&
        e.target.textContent === "刪除" &&
        type === "bookmark"
    ) {
        e.preventDefault();
        const id = e.target.getAttribute("data-id");
        deleteBookmark(id);
    } else if (
        // 點擊刪除全部
        e.target.nodeName === "A" &&
        e.target.textContent === "刪除全部" &&
        userBookmarkData.length !== 0
    ) {
        e.preventDefault();
        deltelAllBookmark();
    }
});

// 渲染 我的文章
function renderMyArticles() {
    let myArticlesData = [];
    axios.get(`${api_path}/users/${userId}/articles`).then((res) => {
        myArticlesData = res.data;
        console.log(myArticlesData);
        let str = "";
        myArticlesData.forEach((article) => {
            str += `
                        <tr>
                            <td  class="table-title"> <a href="article.html?articleId=${
                                article.id
                            }"><img src=${
                article.imgUrl === undefined
                    ? "img/icon-imageError.png"
                    : article.imgUrl
            } alt="">${article.title}</a></td>
                            <td class="table-time">${timeTrans(
                                article.timestap
                            )}</td>
                            <td>
                            <a href="editor.html?id=${
                                article.id
                            }" class="table-edit" >修改</a>
                            <a href="" class="table-del" data-id=${
                                article.id
                            }>刪除</a>
                            </td>
                        </tr>
        `;
        });
        userMain.innerHTML = `
                        <h2><img src="img/icon-myprofile.png" alt="">我的文章</h2>
                    <p>您可以在這裡查看、修改、刪除自己的文章</p>
                    <div>
                        <table class="user-table">
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
                                    <th>總共有${myArticlesData.length} 篇文章</th>
                                    <td></td>
                                    <td>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div class="create-btn-container">
                    <input type="button" value="新增文章" class="create-btn">
                    </div>
                            

    `;
    });
}
//我的文章 點擊監聽
userMain.addEventListener("click", (e) => {
    if (
        // 點擊單一刪除
        e.target.nodeName === "A" &&
        e.target.textContent === "刪除" &&
        type === "manage-myArticles"
    ) {
        e.preventDefault();
        const id = e.target.getAttribute("data-id");
        deleteMyArticle(id);
    }
});

//渲染 所有文章
function renderAllArticles() {
    let allArticlesData = [];
    axios.get(`${api_path}/articles`).then((res) => {
        allArticlesData = res.data;
        console.log(allArticlesData);
        let str = "";
        allArticlesData.forEach((article) => {
            str += `
                        <tr>
                            <td  class="table-title"> <a href="article.html?articleId=${
                                article.id
                            }"><img src=${
                article.imgUrl === undefined
                    ? "img/icon-imageError.png"
                    : article.imgUrl
            } alt="">${article.title}</a></td>
                            <td class="table-time">${timeTrans(
                                article.timestap
                            )}</td>
                            <td>
                            <a href="" class="table-del" data-id=${
                                article.id
                            }>刪除</a>
                            </td>
                        </tr>
        `;
        });
        userMain.innerHTML = `
                        <h2><img src="img/icon-myprofile.png" alt="">所有文章</h2>
                    <p>您可以在這裡查看、修改、刪除全部文章</p>
                    <div>
                        <table class="user-table">
                            <thead>
                                <tr>
                                    <th>文章標題</th>
                                    <th>建立時間</th>
                                    <th>編輯</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${str}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>總共有${allArticlesData.length} 篇文章</th>
                                    <td></td>
                                    <td>
                                        
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
    `;
    });
}
//所有文章 點擊事件
userMain.addEventListener("click", (e) => {
    if (
        // 點擊單一刪除
        e.target.nodeName === "A" &&
        e.target.textContent === "刪除" &&
        type === "manage-allArticles"
    ) {
        e.preventDefault();
        const id = e.target.getAttribute("data-id");
        deleteArticle(id);
    }
});

//渲染 會員管理
function renderAllUsers() {
    let allUsersData = [];
    axios.get(`${api_path}/660/users`, headers).then((res) => {
        allUsersData = res.data;
        console.log(allUsersData);
        let str = "";
        allUsersData.forEach((user) => {
            str += `
                        <tr>
                            <td  class="table-title">${user.email}</td>
                            <td  class="">${user.nickname}</td>
                            <td class="table-time">${timeTrans(
                                user.loggedTimestap
                            )}</td>
                            <td class="table-time">${timeTrans(
                                user.createdTimestap
                            )}</td>
                            <td>
                            <a href="" class="table-del" data-id=${
                                user.id
                            }>刪除</a>
                            </td>
                        </tr>
        `;
        });
        userMain.innerHTML = `
                        <h2><img src="img/icon-myprofile.png" alt="">會員管理</h2>
                    <p>您可以在這裡查看、移除所有會員</p>
                    <div>
                        <table class="user-table">
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>暱稱</th>
                                    <th>上次登入時間</th>              
                                    <th>建立時間</th>
                                    <th>編輯</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${str}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>總共有${allUsersData.length} 位會員</th>
                                    <td></td>
                                    <td>
                                        
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
    `;
    });
}

//會員管理 點擊事件
userMain.addEventListener("click", (e) => {
    if (
        // 點擊單一刪除
        e.target.nodeName === "A" &&
        e.target.textContent === "刪除" &&
        type === "manage-allUsers"
    ) {
        e.preventDefault();
        const id = e.target.getAttribute("data-id");
        deleteUser(id);
    }
});
//修改會員資料
function editProfile(e) {
    // 選取到該input(password、nickname)
    const targetEl = document.querySelector(
        `#${e.target.getAttribute("data-type")}`
    );
    // 讓input可以被修改
    targetEl.removeAttribute("disabled");
    //游標跳到input內
    targetEl.focus();
    // 會跑到最前方，所以需要調整到最後面
    targetEl.setSelectionRange(targetEl.value.length, targetEl.value.length);
    targetEl.classList.add("input-active");
    e.target.setAttribute("style", "display:none;");
    //如果是密碼欄，清空密碼，因為加密的問題所以無法顯示原密碼
    if (e.target.getAttribute("data-type") === "userPassword") {
        targetEl.value = "";
    }
}

// 確認修改
function confirmProfile() {
    const newPassword = document.querySelector("#userPassword").value;
    const newNickname = document.querySelector("#userNickname").value;
    const newData = {};
    //不得為空、密碼不得小於6字
    if (newPassword === "" || newNickname === "" || newPassword.length < 6) {
        return alert("修改資訊有誤");
    } else {
        // 密碼有更改
        if (newPassword !== userProfileData.password) {
            newData.password = newPassword;
        }
        // 暱稱有改
        if (newNickname !== userProfileData.nickname) {
            newData.nickname = newNickname;
        }
        axios
            .patch(profileUrl, newData, headers)
            .then((res) => {
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
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

// 取消修改
function cancelProfile() {
    const passwordInput = document.querySelector("#userPassword");
    const nicknameInput = document.querySelector("#userNickname");
    passwordInput.setAttribute("disabled", "disabled");
    nicknameInput.setAttribute("disabled", "disabled");
    passwordInput.classList.remove("input-active");
    nicknameInput.classList.remove("input-active");
    passwordInput.value = userProfileData.password;
    nicknameInput.value = userProfileData.nickname;
    document.querySelectorAll(".user-input-container a").forEach((a) => {
        a.setAttribute("style", "display:inline;");
    });
}

// 刪除收藏文章
function deleteBookmark(id) {
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
            axios
                .delete(`${api_path}/600/bookmarks/${id}`, headers)
                .then(() => {})
                .catch((err) => {
                    console.log(err);
                });
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
}

// 刪除所有收藏文章
function deltelAllBookmark() {
    Swal.fire({
        title: "確定嗎?",
        text: "這將會清空收藏文章列表喔",
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

//刪除自己文章
function deleteMyArticle(id) {
    Swal.fire({
        title: "確定嗎?",
        text: "這將會刪除此文章喔",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#737373",
        cancelButtonColor: "#d33",
        confirmButtonText: "確定",
        cancelButtonText: "取消",
    }).then((result) => {
        if (result.isConfirmed) {
            axios
                .delete(`${api_path}/600/articles/${id}`, headers)
                .then(() => {})
                .catch((err) => {
                    console.log(err);
                });
            Swal.fire({
                title: "刪除成功!",
                icon: "success",
                confirmButtonColor: "#737373",
            });
            renderMyArticles();
        }
    });
}

//管理員刪除文章
function deleteArticle(id) {
    Swal.fire({
        title: "確定嗎?",
        text: "這將會刪除此文章喔",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#737373",
        cancelButtonColor: "#d33",
        confirmButtonText: "確定",
        cancelButtonText: "取消",
    }).then((result) => {
        if (result.isConfirmed) {
            axios
                .delete(`${api_path}/660/articles/${id}`, headers)
                .then(() => {})
                .catch((err) => {
                    console.log(err);
                });
            Swal.fire({
                title: "刪除成功!",
                icon: "success",
                confirmButtonColor: "#737373",
            });
            renderAllArticles();
        }
    });
}
//刪除會員
function deleteUser(id) {
    Swal.fire({
        title: "警告!!",
        text: "這將會刪除此會員",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#737373",
        cancelButtonColor: "#d33",
        confirmButtonText: "確定",
        cancelButtonText: "取消",
    }).then((result) => {
        if (result.isConfirmed) {
            axios
                .delete(`${api_path}/660/users/${id}`, headers)
                .then(() => {})
                .catch((err) => {
                    console.log(err);
                });
            Swal.fire({
                title: "刪除成功!",
                icon: "success",
                confirmButtonColor: "#737373",
            });
            renderAllUsers();
        }
    });
}

// sidebar的登出按鈕
const logoutBtn = document.querySelector(".user-sidebar-logout a");
logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    location.href = "login.html";
    localStorage.clear();
});

//新增文章 ※因為元素是後來才新增，直接抓DOM會抓不到
userMain.addEventListener("click", (e) => {
    if (e.target.nodeName === "INPUT" && e.target.value === "新增文章") {
        location.href = "editor.html";
    }
});
