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
    暱稱: {
        presence: {
            message: "不可以空白",
        },
    },
};

// 預防表單按Enter鍵時會將資料submit
const form = document.querySelector(".userInfo-form");
form.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        sentData(e);
    }
});

// 按鈕事件監聽
const formBtn = document.querySelector(".register-btn");
formBtn.addEventListener("click", function (e) {
    sentData(e);
});

// 送出資料的函式
function sentData(e) {
    e.preventDefault();
    const userPassword = document.querySelector("#userPassword").value;
    const userEmail = document.querySelector("#userEmail").value;
    const userNickname = document.querySelector("#userNickname").value;
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
        obj.nickname = userNickname;
        obj.auth = "user";
        obj.createdTimestap = Date.now();
        axios
            .post(`${api_path}/users`, obj)
            .then((res) => {
                console.log(res);
                Swal.fire({
                    title: "註冊成功!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setTimeout(() => {
                    location.href = "login.html";
                    userInfoForm.reset();
                }, 3000);
            })
            .catch((err) => {
                // 錯誤失敗提示
                const errStr = err.response.data;
                console.log(errStr);
                Swal.fire({
                    icon: "error",
                    title: "糟了....",
                    text: "帳號已經被註冊了",
                    confirmButtonColor: "#4e4e4e",
                });
            });
    }
}
