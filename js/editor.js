const articleId = location.href.split("?id=")[1] || "";
let articleData = {};
const headers = {
    headers: {
        authorization: `Bearer ${token}`,
    },
};

const articleUrl = `${api_path}/600/articles/${articleId}`;
// 發新文章或是修改舊文章
const editorHead = document.querySelector(".editor-head");
if (articleId === "") {
    editorHead.textContent = "發布新文章";
} else if (!isNaN(articleId)) {
    editorHead.textContent = "修改文章";
    axios
        .get(articleUrl, headers)
        .then((res) => {
            articleData = res.data;
            console.log(articleData);
            renderEditor();
        })
        .catch((err) => {
            console.log(err);
        });
    console.log(articleId);
} else {
    console.log("錯誤");
}

ClassicEditor.create(document.querySelector("#editor"), {
    language: "zh",
    toolbar: [
        "heading",
        "|",
        "bold",
        "italic",
        "link",
        "bulletedList",
        "numberedList",
        "|",
        "indent",
        "outdent",
        "|",
        "blockQuote",
        "insertTable",
        "undo",
        "redo",
    ],
})
    .then((editor) => {
        window.editor = editor;
    })
    .catch((error) => {
        console.error(error);
    });

function renderEditor() {
    document.querySelector("#title").value = articleData.title;
    document.querySelector("#tab").value = articleData.tab;
    document.querySelectorAll(".editor-tag input").forEach((input, index) => {
        if (articleData.tag[index] === undefined) {
            input.value = "";
        } else {
            input.value = articleData.tag[index];
        }
    });
    editor.setData(articleData.content);
}

const sendBtn = document.querySelector(".send-btn");
console.log(sendBtn);
sendBtn.addEventListener("click", (e) => {
    Swal.fire({
        icon: "question",
        title: "確定要送出?",
        text: "請確認好文章內容",
        confirmButtonColor: "#4e4e4e",
        cancelButtonColor: "#d7443e",
        confirmButtonText: "確定",
        showCancelButton: true,
        cancelButtonText: "取消",
    }).then((resault) => {
        if (resault.isConfirmed) {
            console.log("送出嚕");
            sendArticle();
        }
    });
});

function sendArticle() {
    let tags = [];
    document.querySelectorAll(".editor-tag input").forEach((input) => {
        tags.push(input.value);
    });
    const newArticl = {
        title: document.querySelector("#title").value,
        category: document.querySelector("#tab").value,
        tag: tags,
        timestap: Date.now(),
        userId: localStorage.getItem("userId"),
        content: editor.getData(),
        imgUrl: "",
    };

    // 標題或內容為空時跳出警告
    if (
        document.querySelector("#title").value === "" ||
        editor.getData() === ""
    ) {
        Swal.fire({
            icon: "error",
            title: "錯誤",
            text: "標題跟內容都不能是空白",
            confirmButtonColor: "#4e4e4e",
            confirmButtonText: "確定",
        });
        return;
    }

    // 新文章
    if (articleId === "") {
        axios
            .post(articleUrl, newArticl, headers)
            .then((res) => {
                console.log(res);
                Swal.fire({
                    icon: "success",
                    title: "成功送出",
                    confirmButtonColor: "#4e4e4e",
                }).then(() => {
                    location.href = "user.html?manage-myArticles";
                });
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        // 有ID = 舊文章
        axios
            .patch(articleUrl, newArticl, headers)
            .then((res) => {
                console.log(res);
                Swal.fire({
                    icon: "success",
                    title: "成功送出",
                    confirmButtonColor: "#4e4e4e",
                }).then(() => {
                    location.href = "user.html?manage-myArticles";
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
