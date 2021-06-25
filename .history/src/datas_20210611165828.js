const axios = require('axios')
function a() {
    axios
        .get("/2019.json")
        .then((res) => {
            localStorage.setItem("2019", JSON.stringify(res.data["2019"]));
            console.log('chengong ');

        })
        .catch(function (err) { })
        .then(function () { });
    axios
        .get("/2020.json")
        .then((res) => {
            localStorage.setItem("2019", JSON.stringify(res.data["2019"]));
            console.log('chengong ');

        })
        .catch(function (err) { })
        .then(function () { });
    axios
        .get("/2021.json")
        .then((res) => {
            localStorage.setItem("2019", JSON.stringify(res.data["2019"]));
            console.log('chengong ');

        })
        .catch(function (err) { })
        .then(function () { });
}
export { a }