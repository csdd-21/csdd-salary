const axios = require('axios')
function a(){
    console.log('aaaaaaaaaaaaaaaa111111',axios);
    axios
        .get("/2019.json")
        .then((res) => {
          localStorage.setItem("2019", JSON.stringify(res.data["2019"]));
          console.log('chengong ');
          
        })
        .catch(function (err) {})
        .then(function () {});

}
export  {a}