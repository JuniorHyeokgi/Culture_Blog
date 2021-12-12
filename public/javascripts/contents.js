var $grid = $(".masonryContainer").imagesLoaded(function () {
  var masonryWidth = $(".masonry-item").width();
  $grid.masonry({
    itemSelector: ".masonry-item",
    columnWidth: ".masonry-item",
    percentPosition: true,
    transitionDuration: "0.5s",
    horizontalOrder: true,
  });
});

var myModal = document.getElementById("myModal");
var myInput = document.getElementById("myInput");

myModal.addEventListener("shown.bs.modal", function () {
  myInput.focus();
});
