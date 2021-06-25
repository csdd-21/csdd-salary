const axios = require('axios')

async function init() {
    let promise_1 = new Promise((resolve, reject) => {
        axios
            .get("/2019.json")
            .then((res) => {
                localStorage.setItem("2019", JSON.stringify(res.data["2019"]));
                resolve('init finished ----1')
            })
            .catch(function (err) {
                reject('init err ----1')
            })
    })
    let promise_2 = new Promise((resolve, reject) => {
        axios
            .get("/2020.json")
            .then((res) => {
                localStorage.setItem("2020", JSON.stringify(res.data["2020"]));
                resolve('init finished ----2')
            })
            .catch(function (err) {
                reject('init err ----2')
            })
    })
    let promise_3 = new Promise((resolve, reject) => {
        axios
            .get("/2021.json")
            .then((res) => {
                localStorage.setItem("2021", JSON.stringify(res.data["2021"]));
                resolve('init finished ----3')
            })
            .catch(function (err) {
                reject('init err ----3')
            })
    })
    const { result1, result2, result3 } = await Promise.all([promise_1, promise_2, promise_3]).then((values) => {
        console.log('init res ----', values);

    });
    console.log('00', { result1, result2, result3 });

    return { result1, result2, result3 }
}
export { init }