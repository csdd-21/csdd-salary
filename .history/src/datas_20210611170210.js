const axios = require('axios')
function init() {
    axios
        .get("/2019.json")
        .then((res) => {
            localStorage.setItem("2019", JSON.stringify(res.data["2019"]));
            console.log('22222-----1');   
        })
        .catch(function (err) { })
    axios
        .get("/2020.json")
        .then((res) => {
            localStorage.setItem("2020", JSON.stringify(res.data["2020"]));
            console.log('22222-----2');   
        })
        .catch(function (err) { })
    axios
        .get("/2021.json")
        .then((res) => {
            localStorage.setItem("2021", JSON.stringify(res.data["2021"]));
            console.log('22222-----3');   
        })
        .catch(function (err) { })
}
export {init }