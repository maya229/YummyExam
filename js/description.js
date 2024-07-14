"use strict";
export class Description {
    constructor(id) {
        this.id = id;
    }

    async displayDesc() {
        try {
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.id}`);
            if (!response.ok) {  
                throw new Error('Network response was not ok');
            }
            let mealData = await response.json();
            if (mealData.meals && mealData.meals.length > 0) {
                let meal = mealData.meals[0];
                console.log('Meal Data:', meal.strMeal);
                $("#description").siblings().addClass('d-none');
                this.renderMeals(meal);
            } else {
                console.log('No meal data found.');
            }
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        } 
    }
    

    renderMeals(meal) {
        let mealContainer = ``;
        let rowdata =document.querySelector('#rowData');
        let description =document.querySelector('#description');
        let Ingredient =[];
        let Measure = [];
        let ingredientsHTML = '';
        let tagsHTML = '';


        for (let key in meal) {
            if (key.includes('Ingredient') && meal[key] && meal[key].trim() !== '') {
                Ingredient.push(meal[key]);
            } else if (key.includes('Measure') && meal[key] && meal[key].trim() !== '') {
                Measure.push(meal[key]);
            }
        }

        if(meal.strTags){
            let tags = meal.strTags.split(',');
            console.log(meal.strTags);
            tags.forEach(tag => {
                tagsHTML += `
                <p class="not-null alert alert-danger m-2 p-1 d-block ms-0">${tag.trim()}</p>
                `;
            });
        }else{
            tagsHTML += `<p class="not-null alert alert-danger m-2 p-1 d-none">${meal.strTags}</p>`
        }

        if (meal) {
            if(Ingredient.length == Measure.length){
                
                for (let i = 0; i < Ingredient.length; i++) {
                    ingredientsHTML += `<span class="alert alert-info p-1 mx-3">${Measure[i]} ${Ingredient[i]}</span> `;
                }
            }
                mealContainer += `
                <div class="row py-5 g-4">
                    <div class="col-md-4">
                    <img class="w-100" src="${meal.strMealThumb}"/>
                    <h2>${meal.strMeal}</h2>
                    </div>
                    <div class ="col-md-8">
                    <h2>Instructions</h2>
                    <p>${meal.strInstructions}</p>
                    <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                    <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                    <h3>Recipes :</h3>
                    <p class="d-flex g-3 flex-wrap">${ingredientsHTML}</p>
                    <h3>Tags :</h3>
                    <p >
                    <div class="d-flex flex-row g-3 flex-wrap">
                    <p>${tagsHTML}</p>
                    </div>
                    <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                    <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
                    </p>
                    
                    </div>
                    </div>
                    `;
                    description.innerHTML = mealContainer;

        }
    }
}
