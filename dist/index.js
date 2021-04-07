//https://dev.to/sunilaleti/how-to-build-a-chrome-extension-3lpj

let countryName = document.querySelector(".enter");
let formData = document.querySelector(".form-data");
let search = document.querySelector(".btn");

let imageHolder = document.querySelector(".image-holder");
let mainContent = document.querySelector(".content");
let globalSection = document.querySelector(".global");
let loading = document.querySelector(".loading");
let errorText = document.querySelector(".error");

let ctx = document.getElementById('myChart').getContext('2d');

mainContent.style.display = "None"

let getData = async function(country) {
    loading.textContent = "loading...";
    
    try {
        let response = await axios.get(`https://coronavirus-19-api.herokuapp.com/countries/${country}`);
        if(response.message == "Not Found" || response == null || response == undefined) {
            error.textContent = "Error!";
            throw err;
        }
        loading.textContent = "";
        imageHolder.style.display = "None";
        formData.style.display = "None";
        mainContent.style.display = "Block";
        // console.log(response.data);
        // totalCasesGlobal.textContent = response.data.Global.TotalConfirmed;
        let data = {
            datasets: [{
                data: [response.data.todayCases,response.data.todayDeaths,response.data.critical],
                backgroundColor: ['red','yellow','blue']
            }],
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                'Active Cases Today',
                'Total Deaths Today',
                'Critical'
            ]
        };
        let myDoughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: data
        });        
    }
    catch (err) {
        errorText.textContent = err;
    }
}

function handleEvent(e) {
    e.preventDefault();
    getData(countryName.value);
}

search.addEventListener('click', function(e){
    handleEvent(e);
});




