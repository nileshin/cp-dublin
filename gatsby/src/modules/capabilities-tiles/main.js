import $ from 'jquery';

(function($) {
if (typeof window === 'undefined') return;


    
$.fn.instancitePopup  = function(){
    var popTarget, targetData;

    $(document).on('click', '.pop-up__btn', function (e) {
        e.preventDefault();
        if ($(this).is('[data-href]')) {
            popTarget = $(this).data("href");
        } else {
            popTarget = $(this).attr("href");
        }
        targetData = $(popTarget)[0].outerHTML;
        $(popTarget).wrap("<span class='pop-up__placeholder'></span>")
        $(popTarget).prependTo(".pop-up__content");
        $(".pop-up__content > *").addClass("popWrap");
        $(".pop-up").fadeIn();
        $("body").addClass("popOpen");
    });

    $(document).keydown(function (e) {
        if (e.keyCode === 27) {
            closePopup();
        }
    });

    $('body').on('click touchstart', function (e) {
        if ($(".pop-up").is(":visible")) {
            if ($(e.target).closest(".popWrap").length === 0) {
            closePopup();
            }
        }
    });

    $(".close").click(function() {
        closePopup();
    });
};

function closePopup() {
    if ($(".pop-up").is(":visible")) {
        $(".pop-up").fadeOut(function () {
            $("body").removeClass("popOpen");
            $(".pop-up__content > *").removeClass("popWrap");
            $(popTarget).appendTo(".pop-up__placeholder");
            $(popTarget).unwrap();
            $(".pop-up__content").html("");
        });
    }
}

$.fn.instancitePopup();
})($);