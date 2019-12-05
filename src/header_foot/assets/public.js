if (window.location.protocol.indexOf("https") > -1) window.location = window.location
	.href.replace("https", "http")
if (window.location.host.indexOf("c.huawei.com") > -1) window.location = window
	.location.href.replace("c.huawei.com", "consumer.huawei.com")
var wlp = window.location.pathname
var pn = wlp.replace('re', ':')
window.digitalData = {
	"page": {
		"pageInfo": {
			"pageName": "cbg" + pn,
			"countryCode": "minisite",
			"siteCode": "minisite",
			"language": "en_us",
			"site": "cbg",
			"uri": wlp
		},
		"category": {
			"pageType": "demo",
			"primaryCategory": "demo",
			"subCategory1": "minisite"
		}
	},
	"event": []
}


$(document).on('click', '.head_module .menu .menu_wrap', function() {
	var wrap = '.' + $(this).attr('wrap')
	var $awrap = $('.slide_wrap')
	var smallview = $('#normal_nav .icon_menu').is(":visible")
	if (!smallview) {
		if ($(this).hasClass('current')) {
			$(wrap).slideToggle('600')
		} else {
			if ($awrap.is(":visible")) {
				$(".slide_wrap").has(":visible").slideUp(600, function() {
					$(wrap).slideDown('600')
				})
			} else {
				$(wrap).slideDown('600')
			}
		}
	} else {
		$('.head_module .menu').slideUp('600', function() {
			$(wrap).slideDown('600')
		})
	}
	$(this).addClass('current').siblings().removeClass('current')
}).on('click', '.see_close .icon_public', function() {
	$(".slide_wrap").has(":visible").slideUp(600)
}).on('click', '.icon_menu', function() {
	if ($(".slide_wrap").has(":visible").length > 0) $('.head_module .menu').hide()
	$('.head_module .menu').slideToggle('600')
}).on('click', '.foot_module .conv3_footer .listcon .column .item', function(e) {
	if (parseInt(window.innerWidth) >= 768) return;
	var that = this;
	$(".foot_module .conv3_footer .listcon .column .item ul").not($(that).children(
		"ul")).each(function() {
		if ($(this).css("display") == "block") $(this).slideUp();
	});
	$(that).children("ul").slideToggle();

})

$(window).on('resize', function() {
	if (!$('#normal_nav .icon_menu').is(":visible")) {
		$('.head_module .menu').show()
	} else {
		$('.head_module .menu').hide()
	}
});
