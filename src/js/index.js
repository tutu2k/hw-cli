var userAgentInfo = navigator.userAgent.toLowerCase();
var isWeixin = userAgentInfo.indexOf("micromessenger") != -1;
if (isWeixin) {
  $.getScript("//res.wx.qq.com/open/js/jweixin-1.2.0.js", function (response, status) {
    if (status == 'success') {
      $.getScript("//res.wx.qq.com/open/js/jweixin-1.2.0.js", function (r, s) {
        if (s == 'success') {
          var wxShare = setInterval(function () {
            if (typeof (WechatShare) != "undefined") {
              WechatShare({
                url: window.location.href,
                img: 'https://consumer.huawei.com/content/dam/campaign-hq/br/waltz/img/share.jpg',
                title: $(document).attr('title'),
                descript: document.querySelector('meta[name=\"description\"]').getAttribute('content')
              }, function () {
                alert('谢谢分享。');
              });
              clearInterval(wxShare)
            }
          }, 150)
        }
      });
    }
  });
}

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

var pageTitle = $(document).attr("title");
var currWinHeight = $(window).height();
var currWinWidth = $(window).width();
var ieoffset = currWinWidth * 0.315;


$(function () {
  
}) //end



function isIE() {
  var ua = window.navigator.userAgent;

  // Test values; Uncomment to check result …
  // IE 10
  // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
  // IE 11
  // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
  // Edge 12 (Spartan)
  // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
  // Edge 13
  // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

  var msie = ua.indexOf('MSIE ');
  var ie11 = ua.indexOf('Gecko');
  if (msie > 0) {
    // IE 10 or older => return version number
    // return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    // if (ie11 == 0) {
    return true;
    //}
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    //return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    return true;
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    //return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    return false;
  }

  // other browser
  return false;
}

function isMobi() {
  if (currWinWidth <= 1024 && currWinWidth < currWinHeight) {
    return true;
  } else {
    return false
  }
}


var isMobile = {
  Android: function () {
    return userAgentInfo.match(/android/i) ? true : false;
  },
  BlackBerry: function () {
    return userAgentInfo.match(/blackberry/i) ? true : false;
  },
  iOS: function () {
    return userAgentInfo.match(/iphone|ipod/i) ? true : false;
  },
  ipad: function () {
    return userAgentInfo.match(/ipad|macintosh/i) ? true : false;
  },
  Windows: function () {
    return userAgentInfo.match(/ieMobile/i) ? true : false;
  },
  any: function () {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
  },
  ie11:function() {
    return userAgentInfo.match(/trident/i) ? true : false;
  }
};
