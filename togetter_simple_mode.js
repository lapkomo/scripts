// ==UserScript==
// @name      togetter 簡易モード
// @include   https://togetter.com/*
// @include   https://posfie.com/*
// @require   https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js
// @require   https://cdn.jsdelivr.net/npm/jquery-ui@1/dist/jquery-ui.min.js
// @resource  jquery_ui_css https://cdn.jsdelivr.net/npm/jquery-ui@1/themes/base/jquery-ui.min.css
// @grant     GM.getResourceText
// @grant     GM.addStyle
// ==/UserScript==

$("#subheader").append('<li><a id="simple_mode" class="light-btn" href="#">簡易モード</a></li>')

$("#simple_mode").on("click", function( event ) {
	simple_mode();
} );

document.addEventListener('keydown', event => {
  if (event.code === 'IntlRo') {
    simple_mode();
  } else if (event.code === 'ArrowLeft') {
    $('.pagenation a:contains("前へ")')[0].click();
  } else if (event.code === 'ArrowRight') {
    $('.pagenation a:contains("次へ")')[0].click();
  }
});

function simple_mode(){
  $("#fixed_header").remove();
	$("#social_floating_box").remove();
	$("#right_wrap_middle").remove();
  $("#author-recommend-matomes-portal").remove();
  $("#recent-popular-matomes-portal").remove();
  $("#hot-in-tag-matomes-portal").remove();
  $("#official-user-matomes-portal").remove();
	$(".ad_custom").remove();
	$(".ad_list_top").remove();
	$(".thumb_list_box").remove();
  $(".comment_box").remove();
	$("aside").remove();
  $("footer").remove();


	$("div").removeClass("left");

	$(".list_box .list_photo_box").css('flex-flow','row wrap');
	$(".list_photo").css('width','49.5%');
	$(".list_photo").css('margin-top','0');
}