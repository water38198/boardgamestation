// const api_path = "https://json-server-vercel-iota.vercel.app";
const api_path = "http://localhost:3000";

let token = "";

//時間轉換
function timeTrans(num) {
    const date = new Date(num);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}
