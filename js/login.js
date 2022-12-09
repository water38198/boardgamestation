const formBtn = document.querySelector(".login-btn");
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

formBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const userPassword = document.querySelector("#userPassword").value;
    const userEmail = document.querySelector("#userEmail").value;
    const userInfoForm = document.querySelector(".userInfo-form");
    const err = validate(userInfoForm, constraints);
    if (err) {
        const errArr = Object.entries(err);
        console.log(errArr);
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
        axios.post(`${api_path}/users`, obj).then((res) => {
            console.log(res);
            Swal.fire({ title: "登入成功", confirmButtonColor: "#4e4e4e" });
        });
    }
});
