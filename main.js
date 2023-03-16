const searchForm = document.querySelector('form');
//now searchResultDiv references to element of class 'search-result'
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');

let searchQuery = '';
const APP_ID = '600cc38e';
const APP_key = '565bd40ac81a80bf773c7fe65a5fe09a';

searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value; 
    fetchAPI();
})

async function fetchAPI(){
    // const baseURL = `https://api.edamam.com/search?q=pizza&app_id=${APP_ID}&app_key=${APP_key}&to=20`;
    const baseURL=`https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&to=22`;
    const response = await fetch(baseURL);
    const data = await response.json();
    // console.log(data);
    generateHTML(data.hits);
}

function generateHTML(results){
    container.classList.remove('initial');
    let generatedHTML ='';
    results.map(result =>{
        generatedHTML +=`<div class="item">
            <img src="${result.recipe.image}" alt="This is placeholder image.">
            <div class="flex-container">
                <h1 class="title">${result.recipe.label}</h1>
                <a class="view-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
            </div>
            <p class="item-data">${result.recipe.calories.toFixed(2)}</p>
            <p class="item-data" >Diet label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels: 'No Date Found'}</p>
            <p class="item-data" >Health Label: ${result.recipe.healthLabels.length > 7?result.recipe.healthLabels.splice(0, 5):result.recipe.healthLabels}</p>
            </div>`
    })
    searchResultDiv.innerHTML = generatedHTML;
}