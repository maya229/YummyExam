/// < reference types="../@types/jquery" />
"use strict";
import { Meal, index, rowdata } from '../js/meal.js'
import { Description } from "./description.js";
import { Categories, selectedTag, strCategory } from './categories.js';
let searchPage = document.querySelector('#search-page');
let navLink = document.querySelectorAll('.nav-link');
let keyArray = [];
let inputt = document.querySelectorAll('#contact-us input');
let isRepassword = false;
let isValid = {
    name: false,
    email: false,
    phone: false,
    age: false,
    password: false,
    repassword: false
};
let submitBtn = document.querySelector("#submitBtn");
let meal = new Meal();
meal.displayMeals();

export let trial =document.querySelector('#rowData2') ;

console.log("rowdata");
console.log(rowdata);

function handleClick(element,e) {
    console.log(event.target);
    element.classList.replace('d-flex', 'd-none');
    description.classList.replace('d-none', 'd-block');
    $(".loading").fadeIn(300, function(){
        $("#description").innerHTML = '';
        const mealDesc = new Description($(e.target).parent().attr("id"));
        mealDesc.displayDesc();
        $(".loading").fadeOut(300);
    });
}

$(trial).on('click', function(e) {
    handleClick(trial, e);
});

$(rowdata).on('click', function(e) {
    handleClick(rowdata, e);
});


console.log(document.querySelector('#rowData2') )
$(document).ready(() => {
    meal.displayMeals().then(() => {
        $(".loading").fadeOut(500)
        $("body").css("overflow", "visible");
        $("#rowData").removeClass('d-none').addClass('d-flex');
        $("#rowData").siblings().removeClass('d-block').addClass('d-none');
        // console.log(window.location.href);
        // window.location.href = `${window.location.href} YummyExam`;

    })
})

$('.open-close-icon').on('click', function () {
    $('.inner-menu').animate({ width: 'toggle', paddingInline: 'toggle' }, 1000);
    if ($('.inner-menu').css('display') === 'none') {
        $('.nav').removeClass('animate__fadeInBottomLeft').addClass('animate__fadeOutBottomLeft')
        $('.open-close-icon').removeClass('fa-bars').addClass('fa-x');
    } else if($('.inner-menu').css('display') === 'block') {
        $('.nav').removeClass('animate__fadeOutBottomLeft').addClass('animate__fadeInBottomLeft')
        $('.open-close-icon').removeClass('fa-x').addClass('fa-bars');
    }
})


$("#rowData").siblings().removeClass('d-block').addClass('d-none');

$(".nav-link").on('click', function (e) {
    e.preventDefault();
    $('.inner-menu').animate({ width: 'toggle', paddingInline: 'toggle' }, 1000);
    $('.nav').removeClass('animate__fadeOutBottomLeft').addClass('animate__fadeInBottomLeft')
    $('.open-close-icon').removeClass('fa-x').addClass('fa-bars');
    $("#rowData").removeClass('d-flex');
    let result = $(e.target).attr('href');
    $(result).siblings('.d-block').removeClass('d-block').addClass('d-none');
    $(result).removeClass('d-none').addClass('d-block');
    let navItemsPage = result.replace('#', "");
    description.innerHTML="";
    rowdata.innerHTML="";
    if (navItemsPage === "categories") {
        $(".loading").fadeIn(300, function(){
            const categories = new Categories(true, false, false);
            categories.displayCategories();
            $(".loading").fadeOut(300);
        });

        
        $(document).on('click', selectedTag, function (e) {
            $(e.target).find('h3').each(function () {
                $(selectedTag).fadeIn(300, function(){
                    $("#description").siblings().addClass('d-none');
                    const meal1 = new Meal();
                    console.log($(e.target).find('h3').text());
                    rowdata.innerHTML = '';
                    meal1.filterByCategory("c", $(e.target).find('h3').text());
                    $(selectedTag).removeClass('d-block').addClass('d-none');
                    $("#rowData").removeClass('d-none').addClass('d-flex');
                    $(".loading").fadeOut(300);
                });
            });
        });   


    } else if (navItemsPage === "area") {

        $(".loading").fadeIn(300, function(){
            let categories = new Categories(false, true, false);
            categories.displayCategories();
            $(".loading").fadeOut(300);
        });
        $(document).on('click', selectedTag, function (e) {
            $(e.target).find('h3').each(function () {
                $(".loading").fadeIn(300, function(){
                    const meal = new Meal();
                    console.log($(e.target).find('h3').text());
                    rowdata.innerHTML = '';
                    meal.filterByCategory("a", $(e.target).find('h3').text());
                    $(selectedTag).removeClass('d-block').addClass('d-none');
                    $("#rowData").removeClass('d-none').addClass('d-flex');
                    $(".loading").fadeOut(300);
                });
            });
        });   

    } else if (navItemsPage === "ingredients") {


        $(".loading").fadeIn(300, function(){
            let categories = new Categories(false, false, true);
            categories.displayCategories();
            $(".loading").fadeOut(300);
        });

        $(document).on('click', selectedTag, function (e) {
            $(e.target).find('h3').each(function () {
                $(".loading").fadeIn(300, function(){
                    const meal = new Meal();
                    console.log($(e.target).find('h3').text());
                    rowdata.innerHTML = '';
                    meal.filterByCategory("i", $(e.target).find('h3').text());
                    $(selectedTag).removeClass('d-block').addClass('d-none');
                    $("#rowData").removeClass('d-none').addClass('d-flex');
                    $(".loading").fadeOut(300);
                });
            });
        }); 
    }else if (navItemsPage === "search"){
        document.querySelector('#search-by-name').value ="";
        document.querySelector('#filter-by-letter').value="";
        keyArray=[];
        document.querySelector('#search-by-name').addEventListener('keyup', function (e) {
            let x = e.key;
            if (e.key.length === 1) {
                keyArray.push(x);
            } else if (e.key === 'Backspace') {
                keyArray.pop();
            }
            if(keyArray.length>0){
                $(".loading").fadeIn(300, function(){
            var inputString = keyArray.join('');
            console.log(inputString);
            let meal = new Meal(inputString);
            meal.displayMeals();
            $(".loading").fadeOut(300);

                });
            }

        })
        
        document.querySelector('#filter-by-letter').addEventListener('keyup', function (e) {
            let letter = e.key;
            if(letter != ""){
                $(".loading").fadeIn(300, function(){
                let meal = new Meal(letter, true);
                meal.displayMeals();
                $(".loading").fadeOut(300);
                })
            }

        })
    }

    $(result).siblings().addClass('d-none')
    $(result).removeClass('d-none').addClass('d-block');
})





for (var i = 0; i < inputt.length; i++) {
    inputt[i].addEventListener('keyup', function (e) {
        validateInputs(this);
        checkFormValidity();
    })
}
var validationInfo = {
    name: ' Special characters and numbers not allowed',
    email: ' Email not valid *exemple@yyy.zzz',
    phone: 'Enter valid Phone Number',
    age: 'Enter valid age',
    password: 'Enter valid password *Minimum eight characters, at least one letter and one number:*',
}
function validateInputs(element) {
    console.log(element);
    let fieldId = element.getAttribute('id');
    var regex = {
        name: /^[a-zA-Z ]+$/,
        email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        age: /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/,
        password: /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/,
        repassword: /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/,
    }
    console.log(element.getAttribute('id'));
    if (fieldId !== "repassword") {
        if (regex[element.id].test(element.value)) {
            element.classList.add('is-valid');
            element.classList.remove('is-invalid');
            if(element.value == ""){
                element.classList.remove('is-valid');
            }
            element.nextElementSibling.classList.replace('d-block', 'd-none');
            isValid[fieldId] = true;
            checkFormValidity();
        } else {
            element.classList.add('is-invalid');
            element.classList.remove('is-valid');
            element.nextElementSibling.classList.replace('d-none', 'd-block');
            element.nextElementSibling.classList.replace('text-warning', 'text-danger');
            element.nextElementSibling.innerHTML = validationInfo[element.id];
            isValid[fieldId] = false;
            checkFormValidity();
        }
    } else {
        document.querySelector("#repassword").addEventListener('keyup', function (e) {
            const passwordValue = document.querySelector("#password").value;
            const repasswordValue = document.querySelector("#repassword").value;
            if (passwordValue !== repasswordValue) {
                element.classList.add('is-invalid');
                element.classList.remove('is-valid');
                element.nextElementSibling.classList.replace('d-none', 'd-block');
                element.nextElementSibling.classList.replace('text-warning', 'text-danger');
                element.nextElementSibling.innerHTML = "Passwords do not match";
                isRepassword = false;
                isValid.repassword = false;
                checkFormValidity();
            } else {
                element.classList.add('is-valid');
                element.classList.remove('is-invalid');
                if(element.value == ""){
                    element.classList.remove('is-valid');
                }
                element.nextElementSibling.classList.replace('d-block', 'd-none');
                isRepassword = true;
                isValid.repassword = true;
                checkFormValidity();
            }
        });
    }
}


function checkFormValidity() {
    let formIsValid = Object.values(isValid).every(value => value === true);
    console.log(isValid );
    console.log(formIsValid);
    if (formIsValid) {
        submitBtn.classList.remove('disabled');
    } else {
        submitBtn.classList.add('disabled');
    }
}

checkFormValidity();










