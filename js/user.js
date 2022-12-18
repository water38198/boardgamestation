let userProfileData = [];
let userBookmarkData = [];
let profileUrl = `${api_path}/600/users/${userId}`;
let bookmarkUrl = `${api_path}/660/bookmarks?userId=${userId}&_expand=article`;
let type = "";
let currentUseData = [];
const headers = {
    headers: {
        authorization: `Bearer ${token}`,
    },
};
const userMainFooter = document.querySelector(".user-main-footer");

// 如果localStorage資料有缺失，先連結到登入頁面
if (userId === "" || userNickname === "" || token === "") {
    // errHappened();
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
            const auth = userProfileData.auth;
            if (auth === "admin") {
                //顯示後台管理頁面
                const manageList = document.querySelector(".manage-list");
                manageList.classList.add("toshow");
                document.querySelectorAll(".manage-list li").forEach((li) => {
                    li.classList.add("toshow");
                });
            } else if (auth === "writer") {
                document.querySelector(".manage-list").classList.add("toshow");
                document
                    .querySelector(".manage-list li")
                    .classList.add("toshow");
            }
            //判斷頁面
            type = location.href.split("?")[1] || "";
            filterInitType(type);
        })
        .catch((err) => {
            console.log(err);
            console.log(err.response.data);
            if (err.response.data === "jwt expired") {
                // errHappened("閒置過久麻煩重新登入");
            } else {
                // errHappened();
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

// 判別目前頁面進行初始化
function filterInitType(type) {
    if (type === "bookmark") {
        axios
            .get(`${api_path}/660/bookmarks?userId=${userId}`, headers)
            .then((res) => {
                currentUseData = res.data;
                renderUserBookmark(userBookmarkData);
            });
    } else if (
        type === "manage-myArticles" &&
        localStorage.getItem("auth") === "admin"
    ) {
        axios.get(`${api_path}/users/${userId}/articles`).then((res) => {
            currentUseData = res.data;
            renderMyArticles(currentUseData);
        });
    } else if (type === "profile") {
        renderUserProfile();
    } else if (
        type === "manage-allArticles" &&
        localStorage.getItem("auth") === "admin"
    ) {
        axios.get(`${api_path}/articles`).then((res) => {
            currentUseData = res.data;
            renderAllArticles(currentUseData);
        });
    } else if (
        type === "manage-allUsers" &&
        localStorage.getItem("auth") === "admin"
    ) {
        axios.get(`${api_path}/660/users`, headers).then((res) => {
            currentUseData = res.data;
            renderAllUsers(currentUseData);
        });
    } else {
        // errHappened();
        location.href = "index.html";
    }

    // 頁數產生
}
function pageRederType(type, page) {
    if (type === "bookmark") {
        currentUseData = userBookmarkData;
        renderUserBookmark(userBookmarkData);
    } else if (
        (type === "manage-myArticles" &&
            localStorage.getItem("auth") === "admin") ||
        localStorage.getItem("auth") === "writer"
    ) {
        axios.get(`${api_path}/users/${userId}/articles`).then((res) => {
            currentUseData = res.data;
            renderMyArticles(currentUseData);
        });
    } else if (type === "profile") {
        renderUserProfile();
    } else if (
        type === "manage-allArticles" &&
        localStorage.getItem("auth") === "admin"
    ) {
        axios.get(`${api_path}/articles`).then((res) => {
            currentUseData = res.data;
            renderAllArticles(currentUseData);
        });
    } else if (
        type === "manage-allUsers" &&
        localStorage.getItem("auth") === "admin"
    ) {
        axios.get(`${api_path}/660/users`, headers).then((res) => {
            currentUseData = res.data;
            renderAllUsers(currentUseData);
        });
    } else {
        // errHappened();
        location.href = "index.html";
    }
}

//點擊頁數???
userMainFooter.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.nodeName === "A") {
        const target = e.target;
        // 點到同一個
        if (target.classList.contains("active")) {
            return;
        }
        //找出上一個
        const activeTarget = [...document.querySelectorAll(".pagination a")]
            .find((x) => x.classList.contains("active"))
            .getAttribute("data-page");
        console.log("之前是", activeTarget);

        //目前點到
        const value = target.getAttribute("data-page");
        console.log("點到", value);

        // 點到往前但已經是1，點到往後但已經是最後
        if (
            (value === "pre" && activeTarget === "1") ||
            (value === "nxt" &&
                activeTarget ===
                    `${
                        [...document.querySelectorAll(".pagination a")].length -
                        2
                    }`)
        ) {
            return;
        } else if (value === "pre") {
            document.querySelectorAll(".pagination a").forEach((a) => {
                a.classList.remove("active");
            });
            document
                .querySelector(`a[data-page='${activeTarget - 1}']`)
                .classList.add("active");
        } else if (value === "nxt") {
            document.querySelectorAll(".pagination a").forEach((a) => {
                a.classList.remove("active");
            });
            document
                .querySelector(
                    `.pagination a[data-page='${parseInt(activeTarget) + 1}']`
                )
                .classList.add("active");
        } else {
            document.querySelectorAll(".pagination a").forEach((a) => {
                a.classList.remove("active");
            });
            target.classList.add("active");
        }
    }

    //加上ACTIVE
});

// 各種渲染
const userMainContent = document.querySelector(".user-main-content");
const userMainHeader = document.querySelector(".user-main-header");
//渲染個人檔案頁面
function renderUserProfile() {
    userMainHeader.innerHTML = `<h2><img src="img/folder.png">個人檔案</h2>
                                <p>你可以在這裡編輯個人資訊</p>`;
    userMainContent.innerHTML = `
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
                        <input type="password" value=${userProfileData.password} id ="userPassword" disabled name="密碼">
                        <a href="" data-type="userPassword">變更</a>
                        <p data-message="密碼"></p>
                    </div>
                    <div class="user-input-container">
                        <div class="user-input-label">
                            <label for="userNickname">暱稱：</label>
                        </div>
                        <input type="text" value=${userProfileData.nickname} id ="userNickname" disabled name="暱稱">
                        <a href="" data-type="userNickname">變更</a>
                        <p data-message="暱稱"></p>
                    </div>
                    <div class="user-input-container user-profile-btn">
                        <input type="button" value="確定" class="confirm-btn" disabled="disabled">
                        <input type="button" value="取消" class="cancel-btn">
                    </div>
                </form>
    `;
}

// 個人檔案頁面點擊事件;
userMainContent.addEventListener("click", (e) => {
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
function renderUserBookmark(data) {
    let str = "";
    data.forEach((item) => {
        str += `
                        <tr>
                            <td  class="table-title"> <a href="article.html?articleId=${
                                item.article.id
                            }"><img src=${
            item.article.imgUrl === undefined
                ? "img/icon-imageError.png"
                : item.article.imgUrl
        } alt=""><span>${item.article.title}</span></a></td>
                            <td class="table-time">${timeTrans(
                                item.timestap
                            )}</td>
                            <td><a href="" class="table-del" data-id=${
                                item.id
                            }>刪除</a></td>
                        </tr>
        `;
    });
    userMainHeader.innerHTML = `<h2><img src="img/bookmark.png">收藏文章</h2>
                                <p>你可以在這裡編輯個人書籤</p>`;
    userMainContent.innerHTML = `
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
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                        <div class="table-delAll-container">
                            <a href="" class="table-delAll">刪除全部</a>
                        </div>
                    </div>
    `;
    userMainFooter.innerHTML = `${renderPagination(currentUseData)}`;
}
// 收藏文章點擊事件
userMainContent.addEventListener("click", (e) => {
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
function renderMyArticles(data) {
    console.log(data);
    let str = "";
    data.forEach((article) => {
        str += `
                    <tr>
                        <td  class="table-title">
                            <a href="article.html?articleId=${
                                article.id
                            }"><img src=${
            article.imgUrl === undefined
                ? "img/icon-imageError.png"
                : article.imgUrl
        } alt=""><span>${article.title}<span></a></td>
                            <td class="table-time">${timeTrans(
                                article.timestap
                            )}</td>
                            <td class="table-edit">
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
    userMainHeader.innerHTML = `<h2><img src="img/icon-myprofile.png">我的文章</h2>
                                    <p>你可以在這裡編輯自己的文章</p>`;
    userMainContent.innerHTML = `
                    <div class="table-container">
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
                                    <th>總共有${data.length} 篇文章</th>
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
    userMainFooter.innerHTML = `${renderPagination(currentUseData)}`;
}
//我的文章 點擊監聽
userMainContent.addEventListener("click", (e) => {
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
function renderAllArticles(data) {
    let str = "";
    data.forEach((article) => {
        str += `
                        <tr>
                            <td  class="table-title"> <a href="article.html?articleId=${
                                article.id
                            }"><img src=${
            article.imgUrl === undefined
                ? "img/icon-imageError.png"
                : article.imgUrl
        } alt=""><span>${article.title}</span></a></td>
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
    userMainHeader.innerHTML = `<h2><img src="img/icon-article.png">所有文章</h2>
                                    <p>您可以在這裡查看、修改、刪除全部文章</p>`;
    userMainContent.innerHTML = `

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
                                    <th>總共有${data.length} 篇文章</th>
                                    <td></td>
                                    <td>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

    `;
    userMainFooter.innerHTML += `${renderPagination(currentUseData)}`;
}
//所有文章 點擊事件
userMainContent.addEventListener("click", (e) => {
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
function renderAllUsers(data) {
    let str = "";

    data.forEach((user) => {
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
    userMainHeader.innerHTML = `<h2><img src="img/icon-allUsers.png">會員管理</h2>
                                    <p>您可以在這裡查看、移除所有會員</p>`;
    userMainContent.innerHTML = `
                    <div>
                        <table class="user-table user-manage">
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>暱稱</th>
                                    <th>上次登入</th>              
                                    <th>建立時間</th>
                                    <th>編輯</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${str}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>總共有${data.length} 位會員</th>
                                    <td></td>
                                    <td>
                                        
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
    `;
    userMainFooter.innerHTML = `${renderPagination(currentUseData)}`;
}
//產生頁數
function renderPagination(data) {
    if (data.length <= 10) {
        return "";
    } else {
        const pageNum = Math.ceil(data.length / 10);
        console.log(pageNum);
        let pageStr = `<a href="#"class="active" data-page=1>1</a>`;
        for (let i = 2; i <= pageNum; i++) {
            pageStr += `<a href="#" data-page=${i} >${i}</a>`;
        }
        let str = `
                    <div class="pagination-container">
                        <div class="pagination">
                            <a href="#" data-page="pre">&laquo;</a>
                            ${pageStr}
                            <a href="#" data-page="nxt">&raquo;</a>
                        </div>
                        </div>`;
        return str;
    }
}

//會員管理 點擊事件
userMainContent.addEventListener("click", (e) => {
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
    //讓確定按鈕可以被點擊
    document.querySelector(".confirm-btn").removeAttribute("disabled");
}

// 確認修改
function confirmProfile() {
    const newPassword = document.querySelector("#userPassword").value;
    const newNickname = document.querySelector("#userNickname").value;
    const newData = {};
    const constraints = {
        密碼: {
            presence: {
                message: "不可以空白",
            },
            length: {
                minimum: 6,
                message: "至少為6個字以上",
            },
        },
        暱稱: {
            presence: {
                message: "不可以空白",
            },
        },
    };
    const userForm = document.querySelector(".user-form");
    const err = validate(userForm, constraints);
    //不得為空、密碼不得小於6字
    if (err) {
        console.log(validate(userForm, constraints));
        // 先清空所有紅字提示
        document.querySelectorAll(".user-input-container p").forEach((p) => {
            p.textContent = "";
        });
        const errArr = Object.entries(err);
        errArr.forEach((err) => {
            const message = document.querySelector(`p[data-message=${err[0]}]`);
            message.textContent = err[1];
        });
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
    document.querySelector(".confirm-btn").setAttribute("disabled", "disabled");
    document.querySelectorAll(".user-input-container p").forEach((p) => {
        p.textContent = "";
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
            renderMyArticles(currentUseData);
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
            renderAllArticles(currentUseData);
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
userMainContent.addEventListener("click", (e) => {
    if (e.target.nodeName === "INPUT" && e.target.value === "新增文章") {
        location.href = "editor.html";
    }
});
