$(function() {


  $("#pulsanteViola").on("click", function() {

    $("#UTILIZZO").fadeOut("fast");
    $("#PROPRIETA").fadeOut("fast");
    $("#PAESE").fadeIn("fast");

$(".tViola").css({"font-weight": "600", "text-decoration": "overline solid"});
$(".tVerde").css({"font-weight": "300", "text-decoration": "none"});
$(".tGiallo").css({"font-weight": "300", "text-decoration": "none"});

  });

  $("#pulsanteVerde").on("click", function() {

    $("#UTILIZZO").fadeIn("fast");
    $("#PROPRIETA").fadeOut("fast");
    $("#PAESE").fadeOut("fast");

    $(".tViola").css({"font-weight": "300", "text-decoration": "none"});
    $(".tVerde").css({"font-weight": "600", "text-decoration": "overline solid"});
    $(".tGiallo").css({"font-weight": "300", "text-decoration": "none"});

  });

  $("#pulsanteGiallo").on("click", function() {

    $("#UTILIZZO").fadeOut("fast");
    $("#PROPRIETA").fadeIn("fast");
    $("#PAESE").fadeOut("fast");

    $(".tViola").css({"font-weight": "300", "text-decoration": "none"});
    $(".tVerde").css({"font-weight": "300", "text-decoration": "none"});
    $(".tGiallo").css({"font-weight": "600", "text-decoration": "overline solid"});

  });


});
