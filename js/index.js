/**
 * Created by tim on 7/21/2015.
 */

$(document).ready(function(){

    'use strict'



    var resultList = $("#resultList");
    resultList.text("this is from jqurey");

    var toggleButton = $('#toggleButton');
    toggleButton.on('click', function(){
        resultList.toggle(500);

        if (toggleButton.text() == 'Hide') toggleButton.text('Show');
        else toggleButton.text('Hide');
    });

    var listItems = $('header nav li');

    listItems.css('font-weight', 'bold');
    listItems.filter(':first').css('font-size', '18px');

    //var results = [{
    //    name: 'jquery',
    //    language: 'javascript',
    //    owner: {
    //        login: 'tim',
    //        id: 12345
    //    }
    //},
    //    {
    //        name: 'jquery ui',
    //        language: 'javascript',
    //        owner: {
    //            login: 'tim',
    //            id: 12345
    //        }
    //}];

    $("#githubSearchForm").on("submit", function () {

        var searchPhrase = $("#searchPhrase").val();
        var useStars = $("#useStars").val();
        var langChoice = $("#langChoice").val();

        if (searchPhrase){

            resultList.text("performing search...");

            var githubSearch =
                "http://api.github.com/search/repositories?q=" + encodeURIComponent(searchPhrase);

            if (langChoice != "all"){
                githubSearch += "+language:" + encodeURIComponent(langChoice);
            }

            if (useStars) {
                githubSearch += "&sort=stars";
            }

        //var githubSearch =
        //    "http://api.github.com/search/repositories?q=jquery+language:javascript&sort=stars";

        $.get(githubSearch)
            .success(function(r){
                // console.log(r.items.length)
                displayResults(r.items);
            })
            .fail(function (err) {
                console.log('failed to query github');
            })
            .done(function(){
                //
            });
        }
        return false;
    });

    function displayResults(results) {
        resultList.empty();
        $.each(results, function (i, item) {

            var newResult = $("<div class= 'result'>" +
                "<div class='title'>" + item.name + "</div>" +
                "<div>Language: " + item.language + "</div>" +
                "<div>Owner: " + item.owner.login + "</div>" +
                "</div>");

            newResult.hover(function () {
                $(this).css("background-color", "lightgray");
            }, function () {
                $(this).css("background-color", "transparent");
            });

            resultList.append(newResult);
        });
    };

});