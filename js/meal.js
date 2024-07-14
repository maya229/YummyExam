"use strict";
export let index;
export let rowdata;
import { trial } from "../js/index.js";
export class Meal {
    constructor(name, filterByFirstLetter = false) {
        this.name = name;
        this.filterByFirstLetter = filterByFirstLetter;
    }
    async displayMeals() {
        try {
            let url;
            console.log(this.name);
            if (this.filterByFirstLetter) {
                url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${this.name}`;
                rowdata = trial;
            } else if (!this.name) {
                url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
                rowdata =document.querySelector('#rowData');
            } else {
                url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${this.name}`;
                rowdata =trial;
                console.log(rowdata);
            }

            let response = await fetch(url);

            if (!response.ok) {  
                throw new Error('Network response was not ok');
            }
            let mealData = await response.json();
            let data = mealData.meals;
            this.renderMeals(data, rowdata);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }

    renderMeals(meals, rowdata) {
        console.log(rowdata);
        rowdata.innerHTML = '';
        console.log("before "+rowdata);
        let mealContainer = ``;
        let description =document.querySelector('#description');


        if (meals) {
            for (let i = 0; i < meals.length; i++) {
                index = meals[i].idMeal
                mealContainer += `
                    <div class="col-md-3 col-sm-4 text-center">
                        <div class="meal" id="${index}" >
                            <img class="w-100 " src="${meals[i].strMealThumb}" alt="${meals[i].strMeal}" />
                            <div class="meal-layer position-absolute d-flex align-items-center  text-black p-2">
                            <h3>${meals[i].strMeal}</h3>
                    </div>
                        </div>
                    </div>`;
                    rowdata.innerHTML = mealContainer;
            }
        }
    }

    async filterByCategory(character,category){
        try {
            let response = await fetch(`https://themealdb.com/api/json/v1/1/filter.php?${character}=${category}`);
            rowdata =document.querySelector('#rowData');
            rowdata.innerHTML =``;
            if (!response.ok) {  
                throw new Error('Network response was not ok');
            }
            let mealData = await response.json();
            let data = mealData.meals;

            console.log(data);
            
            this.renderMeals(data, rowdata);
            
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }
}