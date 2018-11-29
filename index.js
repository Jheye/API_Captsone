const MEALDB_SEARCH_URL = 'https://www.themealdb.com/api/json/v1/1/search.php';
const COCKTAILDB_RANDOM_SEARCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: MEALDB_SEARCH_URL,
    data: {
      s: searchTerm,
     },
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}

function getDrinkDataFromApi(drinkCallback) {
  const drinkSettings = {
    url: COCKTAILDB_RANDOM_SEARCH_URL,
    dataType: 'json',
    type: 'GET',
    success: drinkCallback
  };

  $.ajax(drinkSettings);
}

function renderResult(meal) {
  return `
    <div class="meal-wrapper">
      <p class="meal-name">${meal.strMeal}</p>
      <a href="#ingredients-modal" rel="modal:open">
        <p class="meal-video">Click to see ingredients & instructions!</p>  
      </a> 
      <a data-fancybox="gallery" href="${meal.strYoutube}">    
        <img src="${meal.strMealThumb}" class="meal-thumbnail-image">
      </a>    
        <div id="ingredients-modal" class="modal">
          <p>Ingredients you need are:</p>
          ${renderIngredients(meal)}         
          <p class="meal-instructions">${meal.strInstructions}</p>
          <h3 class="drink-question">Don't think just drink!?</h3>
          <div class="js-drink-form">
            <a href="#drink-modal" rel="modal:open" class="js-random-drink">Get drink!</a>
          </div>
        </div>
    </div>
  `
}



function renderDrinkResults(drink) {
  return `
    <div class="modal" id="drink-modal">
      <p class="drink-name">${drink.strDrink}</p> 
      <img src="${drink.strDrinkThumb}" class="drink-thumbnail-image">
      ${renderDrinkIngredients(drink)}
      <p class="drink-instructions">${drink.strInstructions}</p>
    </div>
  `
}

function renderIngredients(meal) {
  let html = '<ul>';
  if (meal.strIngredient1 !== '') {
    html += `<li>${meal.strMeasure1}: ${meal.strIngredient1}</li>`;
  }
  if (meal.strIngredient2 !== '') {
    html += `<li>${meal.strMeasure2}: ${meal.strIngredient2}</li>`;
  }
  if (meal.strIngredient3 !== '') {
    html += `<li>${meal.strMeasure3}: ${meal.strIngredient3}</li>`;
  }
  if (meal.strIngredient4 !== '') {
    html += `<li>${meal.strMeasure4}: ${meal.strIngredient4}</li>`;
  }
  if (meal.strIngredient5 !== '') {
    html += `<li>${meal.strMeasure5}: ${meal.strIngredient5}</li>`;
  }
  if (meal.strIngredient6 !== '') {
    html += `<li>${meal.strMeasure6}: ${meal.strIngredient6}</li>`;
  }
  if (meal.strIngredient7 !== '') {
    html += `<li>${meal.strMeasure7}: ${meal.strIngredient7}</li>`;
  }
  if (meal.strIngredient8 !== '') {
    html += `<li>${meal.strMeasure8}: ${meal.strIngredient8}</li>`;
  }
  if (meal.strIngredient9 !== '') {
    html += `<li>${meal.strMeasure9}: ${meal.strIngredient9}</li>`;
  }
  if (meal.strIngredient10 !== '') {
    html += `<li>${meal.strMeasure10}: ${meal.strIngredient10}</li>`;
  }
  if (meal.strIngredient11 !== '') {
    html += `<li>${meal.strMeasure11}: ${meal.strIngredient11}</li>`;
  }
  if (meal.strIngredient12 !== '') {
    html += `<li>${meal.strMeasure12}: ${meal.strIngredient12}</li>`;
  }
  if (meal.strIngredient13 !== '') {
    html += `<li>${meal.strMeasure13}: ${meal.strIngredient13}</li>`;
  }
  if (meal.strIngredient14 !== '') {
    html += `<li>${meal.strMeasure14}: ${meal.strIngredient14}</li>`;
  }
  if (meal.strIngredient15 !== '') {
    html += `<li>${meal.strMeasure15}: ${meal.strIngredient15}</li>`;
  }
  if (meal.strIngredient16 !== '') {
    html += `<li>${meal.strMeasure16}: ${meal.strIngredient16}</li>`;
  }
  if (meal.strIngredient17 !== '') {
    html += `<li>${meal.strMeasure17}: ${meal.strIngredient17}</li>`;
  }
  if (meal.strIngredient18 !== '') {
    html += `<li>${meal.strMeasure18}: ${meal.strIngredient18}</li>`;
  }
  if (meal.strIngredient19 !== '') {
    html += `<li>${meal.strMeasure19}: ${meal.strIngredient19}</li>`;
  }
  if (meal.strIngredient20 !== '') {
    html += `<li>${meal.strMeasure20}: ${meal.strIngredient20}</li>`;
  }
  html += '</ul>';
  return html;
}

function renderDrinkIngredients(drink) {
  const list = Array(20).fill().map((_, i) => {
				const ingredientName = drink[`strIngredient${i + 1}`];
    if (ingredientName != null && ingredientName.trim()) {
      return `<li>${drink['strMeasure' + (i + 1)]}: ${drink['strIngredient' + (i + 1)]}</li>`;
    }
  }).filter(x => x !== undefined).join('');
  return `<ul>${list}</ul>`;
}

function displayMealSearchData(results) {
  const html = results.meals.map(renderResult)
  $('.js-meal-search-results').html(html);
}

function displayDrinkData(drinkCallback) {
  const drinkHtml = drinkCallback.drinks.map(renderDrinkResults)
  $('.js-drink-search-results').html(drinkHtml);
}

function addEventListeners() {
  watchMealSubmit();
  watchDrinkSubmit();
}

function watchMealSubmit() {
  //edit doc.body
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val(); //value is text typed in input box
    queryTarget.val("");
    $("main").prop('hidden', false)
    getDataFromApi(query, displayMealSearchData); 
  });
}

function watchDrinkSubmit() {
  $(document.body).on('click','.js-drink-form',(event) => {
    event.preventDefault();
    const drinkQueryTarget = $(event.currentTarget).find('.js-random-drink');
    const drinkQuery = drinkQueryTarget.val();
    drinkQueryTarget.val("");
    getDrinkDataFromApi(displayDrinkData); 
  });
}

$(addEventListeners);

