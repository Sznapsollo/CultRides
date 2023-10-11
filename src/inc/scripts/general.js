
var jsHelper = null;

$(document).ready(function()
{
	jsHelper = new helperJSLib();
	
	$("#main").on("mouseenter", ".mainmenu li>a.mainMenuTitle", function(event)
	{
		if(!$(this).hasClass('active'))
			$(this).addClass('hover');
	});

	$("#main").on("mouseleave", ".mainmenu li>a.mainMenuTitle", function(event)
	{
		$(this).removeClass('hover');
	});

	$("#main").on("click", "#top .searchblock", function(event)
	{
		jsHelper.toggleSearchSection()
	});
	
	$("#main").on("click", "#bannerSection .shrinkBanner", function(event)
	{
		jsHelper.toggleBanner(true, true);
	});
	
	$("#main").on("click", "#bannerExpandSection", function(event)
	{
		jsHelper.toggleBanner(false, true);
	});

	$("#main").on("click", "#mySideMenu .mainMenuTitle", function(event)
	{
		jsHelper.closeSideMenu();
	});

	$(window).scroll(function() {
	
		if ($(this).scrollTop() >= 50) 
		{        
			$('#return-to-top').fadeIn(200);    // Fade in the arrow
		} 
		else 
		{
			$('#return-to-top').fadeOut(200);   // Else fade out the arrow
		}
	});

	$("#main").on("click", "#return-to-top", function(event) {
		jsHelper.scrollTop();
	});

	window.onresize = function() {
		jsHelper.topResize();
		jsHelper.adjustContentMargin();
	}
});


