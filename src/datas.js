const axios = require('axios')

function init() {
    let promise_1 = new Promise((resolve, reject) => {
        axios
            .get("/2019.json")
            .then((res) => {
                localStorage.setItem("2019年", JSON.stringify(res.data["2019"]));
                resolve('init finished ----1')
            })
            .catch(function (err) {
                reject("init err ----can't find the file of  2019.json")
            })
    })
    let promise_2 = new Promise((resolve, reject) => {
        axios
            .get("/2020.json")
            .then((res) => {
                localStorage.setItem("2020年", JSON.stringify(res.data["2020"]));
                resolve('init finished ----2')
            })
            .catch(function (err) {
                reject("init err ----can't find the file of  2020.json")
            })
    })
    let promise_3 = new Promise((resolve, reject) => {
        axios
            .get("/2021.json")
            .then((res) => {
                localStorage.setItem("2021年", JSON.stringify(res.data["2021"]));
                resolve('init finished ----3')
            })
            .catch(function (err) {
                reject("init err ----can't find the file of  2021.json")
            })
    })
    const res = Promise.all([promise_1, promise_2, promise_3]).then((res) => {
        console.log('init res ----', res);
        return res
    }).catch(err => {
        console.log(err);
        return false
    });
    return res
}
export { init }