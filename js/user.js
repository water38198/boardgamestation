const type = location.href.split("?")[1];
let userData = [];
let url = "";
const headers = {
    headers: {
        authorization: `Bearer ${token}`,
    },
};
// 如果資料有缺失，先連結到登入頁面
if (userId === "" || userNickname === "" || userEmail === "" || token === "") {
    errHappened();
} else {
    // 初始化
    initUser();
}

function initUser() {
    url = `${api_path}/600/users/${userId}`;
    axios
        .get(url, headers)
        .then((res) => {
            userData = res.data;
            const sidebarName = document.querySelector(".user-sidebar h3");
            sidebarName.innerHTML = `<img src="img/user-avatar.png" alt="">${userData.nickname}`;
            console.log(userData);
            //預設都是連結到個人網站
            renderUserProfile();
            if (type.includes("bookmark")) {
                console.log("我要去書籤");
            }
        })
        .catch((err) => {
            console.log(err);
            if (err) {
                // 發生錯誤(過期或其他)跳出通知
                errHappened();
            }
        });
}

const userMain = document.querySelector(".user-main");
function renderUserProfile() {
    userMain.innerHTML = `
                <h2>個人檔案</h2>
                <p>你可以在這裡編輯個人資訊</p>
                <form action="" class="user-form">
                    <div class="user-input-container">
                        <div class="user-input-label">
                        <label for="userEmail">Email：</label>
                        </div>
                        <span class="user-Email" id="userEmail">${userData.email}</span>
                    </div>
                    <div class="user-input-container">
                        <div class="user-input-label">
                            <label for="userpassword">密碼：</label>
                        </div>
                        <input type="password" value=${userData.password} id ="userPassword" disabled>
                        <a href="" data-type="userPassword">修改</a>
                    </div>
                    <div class="user-input-container">
                        <div class="user-input-label">
                            <label for="userNickname">暱稱：</label>
                        </div>
                        <input type="text" value=${userData.nickname} id ="userNickname" disabled>
                        <a href="" data-type="userNickname">修改</a>
                    </div>
                    <div class="user-input-container user-profile-btn">
                        <input type="button" value="確定">
                    </div>
                </form>
    `;
    // const userEmail = document.querySelector("#userEmail");
    // const userPassword = document.querySelector("#userPassword");
    // const userNickname = document.querySelector("#userNickname");
}

function errHappened() {
    Swal.fire({
        title: "請重新登入",
        text: "某些錯誤發生了，麻煩重新登入",
        icon: "warning",
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
        axios.patch(url, newData, headers).then((res) => {
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
logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    location.href = "login.html";
    localStorage.clear();
});
