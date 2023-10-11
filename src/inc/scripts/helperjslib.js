(function (global)
{
	"use strict";

	var itemsPerPage = 8;

	var helperJSLib = function()
	{
		this.crankBannerUp = CrankBannerUp;
		this.toggleBanner = ToggleBanner;
		this.adjustContentMargin = adjustContentMargin;
		this.toggleSearchSection = toggleSearchSection;
		this.initiateBannerAnimations = InitiateBannerAnimations;
		this.topResize = topResize;
		this.logOperation = LogOperation;
		this.increaseValueBy = increaseValueBy;
		this.manageItemsPerPage = ManageItemsPerPage;
		this.getItemsPerPage = GetItemsPerPage;
		this.setLocalStorage = SetLocalStorage;
		this.swapUrlZnakForth = swapUrlZnakForth;
		this.swapUrlZnakBack = swapUrlZnakBack;
		this.defaultSearchValues = defaultSearchValues;
		this.defaultUrlQuery = defaultUrlQuery;
		this.sortValues = sortValues;
		this.findAndTransformLinks = findAndTransformLinks;
		this.openSideMenu = openSideMenu;
		this.closeSideMenu = closeSideMenu;
		this.scrollTop = scrollTop;
		this.fadeIn = fadeIn;
	};

	function fadeIn(nodeAnchor) {
		$(nodeAnchor).fadeIn(600);
	}

	function LogOperation(message) {
		//console.log(message);
	}

	function scrollTop() {
		$('body,html').animate({
			scrollTop : 0                       // Scroll to top of body
		}, 500);
	}

	function openSideMenu() {
 	   document.getElementById("mySideMenu").style.width = "250px";
	}

	function closeSideMenu() {
	    document.getElementById("mySideMenu").style.width = "0";
	}

	var defaultSearchValues = {
		brandName: 'All',
		searchPhraze: ''
	}

	var defaultUrlQuery = {
		pageSort: 0,
		pageStart: 0,
		pageLimit: itemsPerPage,
		brandName: 'All',
		searchPhraze: 'All'
	}

	var sortValues = [
		{
			name: 'Sort by Vote',
			id: 0
		},
		{
			name: 'Sort by Acceleration',
			id: 1
		},
		{
			name: 'Sort by Brand',
			id: 2
		},
		{
			name: 'Sort by Power',
			id: 3
		},
		{
			name: 'Sort by Torque',
			id: 4
		},
		{
			name: 'Sort by Displacement',
			id: 5
		},
		{
			name: 'Sort by Weight',
			id: 6
		},
	];

	function swapUrlZnakForth(value)
	{
		if(value === undefined)
			return value;

		value = value.split('-').join('%2D');
		value = value.split('.').join('%2E');
		value = value.split(' ').join('%20');
		value = value.split('/').join('%2F');
		value = value.split('$').join('%24');
		value = value.split('&').join('%26');
		value = value.split('+').join('%2B');
		value = value.split(',').join('%2C');
		value = value.split(':').join('%3A');
		value = value.split(';').join('%3B');
		value = value.split('=').join('%3D');
		value = value.split('?').join('%3F');
		value = value.split('@').join('%40');
	 
		return value;
	}

	function swapUrlZnakBack(value)
	{
		if(value === undefined)
			return value;

		value = value.split('%2D').join('-');
		value = value.split('%2E').join('.');
		value = value.split('%20').join(' ');
		value = value.split('%24').join('$');
		value = value.split('%26').join('&');
		value = value.split('%2B').join('+');
		value = value.split('%2C').join(',');
		value = value.split('%3A').join(':');
		value = value.split('%3B').join(';');
		value = value.split('%3D').join('=');
		value = value.split('%3F').join('?');
		value = value.split('%40').join('@');
	 	
		return value;
	}

	function increaseValueBy(htmlContainer, value)
	{
		var number = parseInt($.trim($(htmlContainer).html()));
		number = number + value;
		$(htmlContainer).html(number);
	}

	function ManageItemsPerPage(value)
	{
		if(value !== undefined && value > 0 && value != GetItemsPerPage())
			SetLocalStorage("itemsPerPage", value);
	}

	function topResize() {
		$("#top").width($( window ).width());
		$("#topMobileMenu").width($( window ).width());
		$("#searchSection").width($( window ).width());
	}

	function InitiateBannerAnimations()
	{
		var image = $('#bannerSection .inner');
		image.css('background-image', "url(graphics/backgrounds/banner"+Math.floor((Math.random() * 26) + 1)+".jpg)");
		image.fadeIn(2000);
		
		setInterval(function(){  
			image.fadeOut(2000, function () {
				image.css('background-image', "url('graphics/backgrounds/banner"+Math.floor((Math.random() * 26) + 1)+".jpg')");
				image.fadeIn(2000);
			});
		}, 15000);
	}

	function toggleSearchSection() {
		if($("#searchSection").is(":visible"))
			$("#searchSection").slideUp("slow", function() {
				adjustContentMargin();
			});
		else
			$("#searchSection").slideDown("slow", function() {
				adjustContentMargin();
			});
	}

	function adjustContentMargin() {
		// check for visible which is not in mobile version
		var bannerVisible = $("#bannerSection .inner").height() != 0 && $("#bannerSection").is(":visible");
		var topMargin = !bannerVisible && $("#searchSection").is(":visible") ? $('#searchSection').height() : 0;

		$("#content").animate({
			marginTop: topMargin
		  }, {
			duration: 200,
			complete: function () {
				
			}
		  });
	}

	function GetLocalStorage(name)
	{
	    return localStorage[name];
	}

	function SetLocalStorage(name, value)
	{
		// for ipad and iphone not handling localStorage here is caching online option
		if(name == "itemsPerPage")
			itemsPerPage = value;

		try {
	    	localStorage[name] = value;
	    }
	    catch(err) {}
	}

	function GetItemsPerPage(value)
	{
		if(localStorage["itemsPerPage"] == undefined) 
			return itemsPerPage;
		else {
			itemsPerPage = localStorage["itemsPerPage"];
			return itemsPerPage;
		}
	}

	function CrankBannerUp()
	{
		var testClassName = "performedCheck";
		if(!$("#bannerSection").hasClass(testClassName))
		{
			$("#bannerSection").addClass(testClassName)
		}
		else
			return;

		if(GetLocalStorage('bannerWrapped') === "true")
			ToggleBanner(true, false);
		else
			ToggleBanner(false, false);
	}

	function ToggleBanner(shrink, animate)
	{
		var bannerHeight = 261;
		if(animate)
		{
			if(shrink)
			{
				$('#bannerSection .shrinkBanner').hide();
				$("#bannerSection .inner").animate({
						height: 0
					  }, {
						duration: 200,
						complete: function () {
							SetLocalStorage('bannerWrapped', 'true');
							$('#bannerExpandSection').show();
							adjustContentMargin();
						}
					  });
			}
			else
			{
				$('#bannerExpandSection').hide();
				$("#bannerSection .inner").animate({
						height: bannerHeight
					  }, {
						duration: 200,
						complete: function () {
							SetLocalStorage('bannerWrapped', 'false');
							$('#bannerSection .shrinkBanner').show("slow");
							adjustContentMargin();
						}
					  });
			}
		}
		else
		{
			if(shrink)
			{
				$('#bannerSection .shrinkBanner').hide();
				$("#bannerSection .inner").height(0);
				$('#bannerExpandSection').show();
			}
			else
			{
				$('#bannerSection .shrinkBanner').show();
				$("#bannerSection .inner").height(bannerHeight);
				$('#bannerExpandSection').hide();
			}
			adjustContentMargin();
		}
	}


	function findAndTransformLinks(searchPhraze)
	{
		$(searchPhraze).linkify();
		
		$(searchPhraze + ' A').each(function()
		{
			if($(this).hasClass("linkifyProcessed"))
				return;
		
			$(this).addClass("linkifyProcessed");

			$(this).attr("href",$(this).attr('href'));

			var value = $(this).attr("href");
			value = value.replace('feature=player_embedded&','');
			value = value.replace('&feature=player_embedded','');
			
			if((value.indexOf(".jpg") != -1 ||
			value.indexOf(".JPG") != -1 ||
			value.indexOf(".gif") != -1 ||
			value.indexOf(".GIF") != -1 ||
			value.indexOf(".png") != -1 ||
			value.indexOf(".PNG") != -1) && value.indexOf("dropbox.com") == -1)
			{
				if ($(this).find("img").length > 0) 
				{
					$(this).addClass("skipscripts");
				}

				// not all links to be transformed to images
				var className = $(this).attr("class");
				if(className != undefined && className.indexOf("skipscripts") != -1)
				{
					
				}
				else {
					$(this).after("<p><a class=\"fancybox\" href='"+value+"' data-fancybox-type=\"image\" data-fancybox-group=\"images\" ><img src=\""+value+"\" style=\"width: 100%\" /></a></p>");
				}
			}
			else if (value.match('(http(s)?://)?(www.)?youtube|youtu\.be')) 
			{
				try
				{
					if (value.match('embed')) { youtube_id = value.split(/embed\//)[1].split('"')[0]; }
					else { youtube_id = value.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0]; }
					value = "http://www.youtube.com/v/"+youtube_id;
					var htmlInput = "<object width=\"100%\"><param name=\"wmode\" value=\"transparent\" /><param name=\"movie\" value=\""+value+"\"></param><param name=\"allowScriptAccess\" value=\"always\"></param><param name=\"allowFullScreen\" value=\"true\"></param><embed src=\""+value+"\" type=\"application/x-shockwave-flash\" allowscriptaccess=\"always\" allowfullscreen=\"true\" width=\"100%\" ></embed></object>";
					$(this).after("<p>"+htmlInput+"</p>");
				}
				catch(err){}
			}
		});
		
		StartFancyBox();
	}


	function StartFancyBox()
	{
		try
		{
			/*
			$(".fancybox").fancybox({
			   type: "image"
			 });
			*/
			 $('.fancybox').fancybox({
				type: "image",
				 beforeShow: function () 
				 {
					if (this.title) 
					{
						this.title += '<div class="fancyBoxFB"><div class="fb-share-button" data-href="' + this.href + '" data-width="100"></div></div>';          
						this.title += '<div class="fancyBoxGP"><div class="g-plus" data-href="' + this.href + '" data-action="share" data-expandTo="top" ></div></div>';
					}
				},
				afterShow: function() {
					//FB.XFBML.parse(document.getElementById('containerX'));
					FB.XFBML.parse();
					gapi.plus.go();
				},
				helpers : {
					title : {
						type: 'inside'
					}
				}, 
				afterLoad : function() 
				{
					this.title = '<div class="fancyBoxTitle">Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '</div>');
				}
			});
		}
		catch(err) {}
	}




	if (("function" === typeof define) && (define["amd"])) /* AMD Support */
	{
		define(function()
		{
			return helperJSLib;
		});
	} else if ("undefined" !== typeof exports) /* Node Support */
	{
		if (("undefined" !== typeof module) && module["exports"])
		{
		  module["exports"] = helperLib;
		  exports = helperJSLib;
		}
		else {
			exports = helperJSLib;
		}
	} else { /* Browsers and Web Workers*/
		global["helperJSLib"] = helperJSLib;
	}
}(this));
