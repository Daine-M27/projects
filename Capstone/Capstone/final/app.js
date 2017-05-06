$(document).ready(function () {

    console.log(window.innerHeight);

    var setHeights = function () {
        var windowHeight = window.innerHeight;
        $("#sidebar").height(windowHeight);
        $("#map").height(windowHeight);

    };

    setHeights();



});

