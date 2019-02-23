import $ from 'jquery';

// POST commands to YouTube or Vimeo API
function postMessageToPlayer(player, command) {
  if (player == null || command == null) {
    console.warn('Cannot postMessageToPlayer', {player, command});
    return;
  }
  player.contentWindow.postMessage(JSON.stringify(command), "*");
}

// When the slide is changing
function playPauseVideo(slick, control) {
  var currentSlide, slideType, startTime, player, video;

  currentSlide = slick.find(".slick-current .slider__item");

  slideType = currentSlide.attr("class").split(" ")[1];
  player = currentSlide.find("iframe").get(0);
  startTime = currentSlide.data("video-start");

  if (slideType === "slider__vimeo") {
    switch (control) {
      case "play":
        currentSlide.addClass('started');
        if ((startTime != null && startTime > 0) && !currentSlide.hasClass('started')) {
          currentSlide.addClass('started');
          postMessageToPlayer(player, {
            "method": "setCurrentTime",
            "value": startTime
          });
        }
        postMessageToPlayer(player, {
          "method": "play",
          "value": 1
        });
        break;
      case "pause":
        postMessageToPlayer(player, {
          "method": "pause",
          "value": 1
        });
        break;
      default: break;
    }
  } else if (slideType === "slider__youtube") {
    switch (control) {
      case "play":
        currentSlide.addClass('started');
        // postMessageToPlayer(player, {
        //   "event": "command",
        //   "func": "mute"
        // });
        postMessageToPlayer(player, {
          "event": "command",
          "func": "playVideo"
        });
        break;
      case "pause":
        postMessageToPlayer(player, {
          "event": "command",
          "func": "pauseVideo"
        });
        break;
      default: break;
    }
  } else if (slideType === "slider__video") {
    video = currentSlide.children("video").get(0);
    if (video != null) {
      if (control === "play") {
        currentSlide.addClass('started');
        video.play();
      } else {
        video.pause();
        currentSlide.removeClass('started');
      }
    }
  }
}

export default function(slideWrapper) {
  slideWrapper.on("beforeChange", function (event, slick) {
    slick = $(slick.$slider);
    slick.find(".slider__item").removeClass("started");
    $(".play").fadeIn();
    playPauseVideo(slick, "pause");
  });
  $("body").on("click", ".play", function() {
    var slick = $(".slider");
    playPauseVideo(slick,"play");
    $(this).fadeOut();
  });
  $("body").on("click", ".stop", function() {
    var slick = $(".slider");
    slick.find(".slider__item").removeClass("started");
    $(".play").fadeIn();
    playPauseVideo(slick, "pause");
  });
}