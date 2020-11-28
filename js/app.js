let ajax_state = document.getElementById("ajax-state");
ajax_state.innerText = "Loading...";

let image = document.getElementById("drink-img");
let title = document.getElementById("title");
let ingredients = document.getElementById("ingredients");
let instructions = document.getElementById("instructions");
let glass = document.getElementById("glass");

let drink;

// Get a new drink
function getDrink() {
    let ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {
        if (this.readyState >= 1 && this.readyState < 4) {
            ajax_state.style.display = "block";
        } else if (this.readyState == 4 && this.status == 200) {
            ajax_state.style.display = "none";
            refreshPage(JSON.parse(this.responseText).drinks[0]);
        } else {
            alert(this.readyState);
        }
    }

    ajax.open("GET", "https://www.thecocktaildb.com/api/json/v1/1/random.php", true);
    ajax.send();
}

function createIngredient(ingredient_name) {
    let result = document.createElement("li");
    result.classList.add("ingredient");
    result.innerText = ingredient_name;

    return result;
}

function refreshPage(drink) {
    console.log(drink);
    image.src = drink.strDrinkThumb;
    image.alt = drink.strDrink;
    title.innerText = drink.strDrink;

    while (ingredients.firstChild) {
        ingredients.removeChild(ingredients.firstChild);
    }

    for (let i = 1; i < 10; i++) {

        if (drink["strMeasure" + i] != null) {
            let measure = drink["strMeasure" + i];
            let ingredient_name = drink["strIngredient" + i];

            let ingredient = createIngredient(measure + " " + ingredient_name);

            ingredients.appendChild(ingredient);
        }
    }

    instructions.innerText = drink.strInstructions;
    glass.innerText = "Serve in a " + drink.strGlass;
}

let refresh_button = document.getElementById("refresh-button");
refresh_button.addEventListener("click", function() {
    getDrink();
});

getDrink();