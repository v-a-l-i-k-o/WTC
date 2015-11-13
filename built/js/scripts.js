$(document).ready(function() {
// ------------------------------------------------------------------------------------
  
/* ===== INITIALIZATION OF THE PLUGINS: ===== */

/* ----- name of the plugin ----- */


/* ===== CUSTOM CODE: ===== */
  
/* ----- jquery .scrolltop() ----- */

$(".nav-menu").on("click","a", function (event) {
	event.preventDefault();
	var id  = $(this).attr("href"),
		top = $(id).offset().top;
	$("body,html").animate({scrollTop: top}, 1000);
});

/* ----- toTop ----- */

$("#toTop").toTop({
    autohide: true,
    offset: 700,
    speed: 500,
    position: true,
    right: 30,
    bottom: 30
});

/* ----- show blocks ----- */

$("#showMore").click(function(event) {
	$(".programms-item").removeClass("hidden");
});

// -------------------------------------------------------------------------------------
});