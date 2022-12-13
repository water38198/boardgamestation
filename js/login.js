// 驗證的條件
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
    Email: {
        presence: {
            message: "不可以空白",
        },
        email: {
            message: "請輸入正確的Email格式",
        },
    },
};
// 避免從登入→ 註冊 → 登入
if (token !== "") {
    history.go(-1);
}
// 預防表單按Enter鍵時會將資料submit
const form = document.querySelector(".userInfo-form");
form.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        sentData(e);
    }
});

// 按鈕事件監聽
const formBtn = document.querySelector(".login-btn");
formBtn.addEventListener("click", function (e) {
    e.preventDefault();
    sentData(e);
});

// 送出資料的函式
function sentData(e) {
    e.preventDefault();
    const userPassword = document.querySelector("#userPassword").value;
    const userEmail = document.querySelector("#userEmail").value;
    const userInfoForm = document.querySelector(".userInfo-form");
    const err = validate(userInfoForm, constraints);
    // 驗證
    if (err) {
        // 先清空所有紅字提示
        document.querySelectorAll(".input-message").forEach((p) => {
            p.textContent = "";
        });
        const errArr = Object.entries(err);
        errArr.forEach((err) => {
            const message = document.querySelector(
                `.input-message[data-message=${err[0]}]`
            );
            message.textContent = err[1];
        });
    } else {
        const obj = {};
        obj.email = userEmail;
        obj.password = userPassword;
        axios
            .post(`${api_path}/login`, obj)
            .then((res) => {
                console.log(res);
                // 登入成功後將會員資料存放在localStorage
                localStorage.setItem("token", res.data.accessToken);
                localStorage.setItem("userId", res.data.user.id);
                localStorage.setItem("userEmail", res.data.user.email);
                localStorage.setItem("userNickname", res.data.user.nickname);
                // 成功結果提示
                Swal.fire({
                    title: "登入成功!",
                    icon: "success",
                    text: "即將返回上一頁，如果沒有自動跳轉請按確定",
                    confirmButtonColor: "#4e4e4e",
                    timer: 1500,
                }).then((result) => {
                    //點擊確認按鈕後，重置表單，返回上一頁
                    if (result.isConfirmed) {
                        gobackPage();
                        userInfoForm.reset();
                        // 如果是從註冊來的，返回上上一頁
                    }
                    // 不點擊也會1500毫秒後自動轉
                    gobackPage();
                    userInfoForm.reset();
                });
            })
            .catch((err) => {
                // 錯誤失敗提示
                const errStr = err.response.data;
                console.log(errStr);
                Swal.fire({
                    icon: "error",
                    title: "糟了....",
                    text: "帳號或密碼錯誤",
                    confirmButtonColor: "#4e4e4e",
                });
            });
    }
}
// 返回上一頁函式
function gobackPage() {
    const referer = document.referrer;
    if (referer.includes("register.html")) {
        history.go(-2);
    } else {
        history.back();
    }
}
