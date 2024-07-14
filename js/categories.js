"use strict";
export let index;
export let selectedTag;
export let strCategory;
export class Categories {
    constructor(category = false, area = false, ingredient = false) {
        this.category = category;
        this.area = area;
        this.ingredient = ingredient;
    }
    async displayCategories() {
        try {
            let url;
            let mealData;
            let response;
            let data;
            if (this.category) {
                url = `https://www.themealdb.com/api/json/v1/1/categories.php`;
                selectedTag = document.querySelector('#rowData3');
            } else if (this.area) {
                url = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`;
                selectedTag = document.querySelector('#rowData4');
            } else if (this.ingredient) {
                url = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`;
                selectedTag = document.querySelector('#rowData5');
            }
    
            if (url) {
                response = await fetch(url);
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                mealData = await response.json();
                data = mealData.categories || mealData.meals;
            }
    
            if (data && data.length>0) {
                console.log(data);
                if (this.category) {
                    this.renderCategoryData(data, selectedTag);
                } else if (this.area) {
                    this.renderAreaData(data, selectedTag);
                } else if (this.ingredient) {
                    this.renderIngredientData(data.slice(0, 20), selectedTag);
                }
            } else {
                console.error('No data found.');
            }
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }

    renderCategoryData(meals,selectedTag) {
        let mealContainer = ``;
        let description =document.querySelector('#description');
        if (meals) {
            for (let i = 0; i < meals.length; i++) {
                index = meals[i].idMeal;
                strCategory = meals[i].strCategory;
                mealContainer += `
                    <div  class="col-md-3 col-sm-4 text-center ">
                        <div class="meal" id="${index}" >
                            <img class="w-100 " src="${meals[i].strCategoryThumb}" alt="${meals[i].strCategoryThumb}" />
                            <div class="meal-layer position-absolute text-black p-2">
                            <h3>${meals[i].strCategory}</h3>
                            <p>${meals[i].strCategoryDescription}</p>
                    </div>
                        </div>  
                    </div>`;
                    selectedTag.innerHTML = mealContainer;
            }


        }
    }
    renderAreaData(meals,selectedTag) {
        let mealContainer = ``;
        let description =document.querySelector('#description');
        if (meals) {
            for (let i = 0; i < meals.length; i++) {
                index = meals[i].idMeal;
                strCategory = meals[i].strCategory;
                mealContainer += `
                    <div  class="col-md-3 col-sm-4 text-center">
                        <div class="meal" id="${index}" >
                            <i class="fa-solid fa-house-laptop fa-4x"></i>
                            <h3>${meals[i].strArea}</h3>
                    </div>
                        </div>
                    </div>`;
                    selectedTag.innerHTML = mealContainer;
            }


        }
    }
    renderIngredientData(meals,selectedTag) {
        let mealContainer = ``;
        let description =document.querySelector('#description');
        if (meals) {
            for (let i = 0; i < meals.length; i++) {
                index = meals[i].idMeal;
                strCategory = meals[i].strCategory;
                mealContainer += `
                    <div  class="col-md-3 col-sm-4 text-center">
                        <div class="meal" id="${index}" >
                            <i class="fa-solid fa-drumstick-bite fa-4x"></i>    
                            <h3>${meals[i].strIngredient}</h3>
                            <p>${meals[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                    
                        </div>
                    </div>`;
                    selectedTag.innerHTML = mealContainer;
            }


        }
    }

}