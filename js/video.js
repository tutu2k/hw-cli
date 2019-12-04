function getVideoActionStatus(b) {
  if (b < 25) {
    return "Video Start"
  }
  if (b < 50) {
    return "Video 25%"
  }
  if (b < 75) {
    return "Video 50%"
  }
  if (b < 99) {
    return "Video 75%"
  }
  return "Video Complete"
}
$(function() {
  var b = $(document).attr("title");
  var a = "";
  $(".v27_minisite_content *[data-t-label]").each(function() {
    a = "HUAWEI WATCH GT 2, Long Battery Life, Built in GPS - " + $(this).attr(
      "data-video-name") + " - " + b;
    $(this).attr("data-t-label", a)
  });
  $(".cbg-jwplayer-video").click(function(h) {
    h.preventDefault();
    var g = 0,
      c = 0,
      k = 0,
      j = $(this).data("video-id");
    var m = {
      videoPlayer: $(this).data("video-image")
    };
    h.preventDefault();
    var d = {
      id: j,
      image: m[j],
      link: $(this).data("video-link"),
      aspectratio: $(this).data("video-ratio"),
      file: $(this).attr("href"),
      width: "100%",
      label: $(this).data("t-label"),
      thisVideo: $(this),
      autostart: true,
      flashplayer: "//consumer-img.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/store/flash/jwplayer_cej_flash.swf",
      events: {
        onReady: function() {
          if (d.link != null && "" != d.link) {}
        },
        onPlay: function() {
          $(".jwdisplay").removeClass("x-mask");
          $(".jwpreview").removeClass("x-opacity");
          if (k == 0) {
            try {
              trackEvent("Video Milestone", "Video Start", d.label,
                "")
            } catch (e) {
              console.log("track error")
            }
            k = 1
          }
        },
        onTime: function(n) {
          var q = n.position;
          var p = n.duration;
          var e = jwplayer().getDuration();
          var o = jwplayer().getPosition();
          g = q / p * 100;
          g = (o / e) * 100;
          if (g <= 25) {
            g = 25
          } else {
            if (g <= 50) {
              g = 50
            } else {
              if (g <= 75) {
                g = 75
              } else {
                if (g < 100) {
                  g = 100
                }
              }
            }
          }
          if (g != c) {}
          c = g
        },
        onPause: function() {
          $(".jwdisplay").addClass("x-mask")
        },
        onComplete: function() {
          $(".jwdisplay").addClass("x-mask");
          $(".jwpreview").addClass("x-opacity");
          try {
            trackEvent("Video Milestone", "Video Complete", d.label,
              "")
          } catch (e) {
            console.log("track error")
          }
        }
      }
    };
    if ($("html").hasClass("ie9")) {
      d.primary = "flash"
    }
    var f = 1600,
      l = 900;
    if (typeof(d.aspectratio) == "string" && /^[0-9]{1,2}:[0-9]{1,2}$/.test(
        d.aspectratio)) {
      var i = d.aspectratio.split(":");
      l = f * parseInt(i[1]) / parseInt(i[0])
    }
    $("head").append(
      '<link href="/etc/designs/huawei-cbg-site/clientlib-p10/css/fancybox.css" rel="stylesheet" type="text/css" />'
    );
    $.getScript("/etc/designs/huawei-cbg-site/statics/lib-bundle.js",
      function() {
        $.fancybox('<div id="' + d.id +
          '" class="cbg-jwplayer"></div><div class="cbg-video-mask"></div>', {
            width: f,
            height: l,
            padding: 0,
            margin: 20,
            autoSize: false,
            aspectRatio: true,
            scrolling: "no",
            beforeShow: function() {
              try {
                jwplayer(d.id).setup(d);
                jwplayer(d.id).onFullscreen(function(e) {
                  e.fullscreen ? $(".fancybox-close").hide() :
                    $(".fancybox-close").show()
                });
                jwplayer(d.id).onReady(function(e) {
                  $(".cbg-video-mask").fadeOut()
                });
                $("#cbg-banner").flexslider("pause")
              } catch (n) {}
            },
            afterClose: function() {
              if (g < 100) {
                try {
                  trackEvent("Video Milestone", "Video " + g +
                    "%", d.label, "")
                } catch (e) {
                  console.log("track error")
                }
              }
            },
            beforeClose: function() {
              var n = d.label;
              if (d.thisVideo.data("iframe-url")) {
                analyticsSubmit("Video Milestone", "Video", n,
                  EVENT_TYPE_VIDEO_CLOSED)
              } else {
                var e = Math.floor(jwplayer(d.id).getPosition() *
                  100 / jwplayer(d.id).getDuration());
                analyticsSubmit("Video Milestone",
                  getVideoActionStatus(e), n,
                  EVENT_TYPE_VIDEO_CLOSED)
              }
            }
          })
      });
    $(".fancybox-close").click(function() {
      $(".play_video").stop();
    })
  })
});
