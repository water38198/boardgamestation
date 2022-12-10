const formBtn = document.querySelector(".register-btn");
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
        }
    },
    暱稱: {
        presence: {
            message: "不可以空白",
        }
    }
};

formBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const userPassword = document.querySelector("#userPassword").value;
    const userEmail = document.querySelector("#userEmail").value;
    const userNickname = document.querySelector("#userNickname").value;
    const userInfoForm = document.querySelector(".userInfo-form");

    const err = validate(userInfoForm, constraints);
    if (err) {
        const errArr = Object.entries(err);
        console.log(errArr);
        const allMessage = document.querySelectorAll(".input-message");
        allMessage.forEach(item=> item.textContent="")
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
    axios.post("http://localhost:3000/users", obj).then((res) => {
        console.log(res);
        Swal.fire({
            title: "註冊成功!",
            confirmButtonColor: "#4e4e4e",
        });
    });
    }
});
