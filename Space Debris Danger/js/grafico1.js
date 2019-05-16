$(function () {


$( "#pulsanteViola").on("click", function() {

  $( "#UTILIZZO" ).fadeOut("fast");
  $( "#PROPRIETA" ).fadeOut("fast");
  $( "#PAESE" ).fadeIn("fast");
});

$( "#pulsanteVerde").on("click", function() {

  $( "#UTILIZZO" ).fadeIn("fast");
  $( "#PROPRIETA" ).fadeOut("fast");
  $( "#PAESE" ).fadeOut("fast");
});

$( "#pulsanteGiallo").on("click", function() {

  $( "#UTILIZZO" ).fadeOut("fast");
  $( "#PROPRIETA" ).fadeIn("fast");
  $( "#PAESE" ).fadeOut("fast");
});


    });
