// Function that update the character counter
$(document).ready(function() {

    $(".new-tweet").on("keydown keyup", "textarea", function(event) {
        $text = $(this).val();
        $charsLeft = 140 - $text.length;

        //go back up to the form and then back down to attain the counter
        // closest goes up, find goes down!
        $counter = $(this).closest("form").find(".counter")
        $counter.text($charsLeft);

        // Toggle the red font in case it's over 140 chars.
        if ($charsLeft < 0) {
            $counter.addClass("overLimit");
        } else {
            $counter.removeClass("overLimit");
        }

    });

    $(".fa-arrow-circle-down").click(function() {
        $(".new-tweet form").slideToggle(500, function() {
            $(".new-tweet form textarea").focus();
        });
    });

    let btn = $('.fa-angle-double-up');
    let nav = $("body>nav");
    let header = $(".main-header");
    $(window).scroll(function() {
        if ($(window).scrollTop() > nav.outerHeight() + header.height()) {
            btn.addClass('show');
            $("nav div").addClass('hide')
        } else {
            btn.removeClass('show');
            $("nav div").removeClass('hide')

        }
    });

    btn.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, '300');
        $(".new-tweet form").slideDown(500, function() {
            $(".new-tweet form textarea").focus();
        });
    });
});