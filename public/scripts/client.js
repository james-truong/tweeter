// Test / driver code (temporary). Eventually will get this from the server.

const renderTweets = (tweets) => {

    //clear the container before to read all tweets
    $("#tweets-container").empty();

    // loops through tweets from newer to older
    for (let i in tweets) {

        // calls createTweetElement for each tweet
        $tweet = createTweetElement(tweets[i]);

        // takes return value and appends it to the tweets container
        $('#tweets-container').prepend($tweet);
    }

}
const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

function createTweetElement(data) {
    $dateCreated = new Date(data.created_at);
    $dateToday = new Date();

    $timeDiff = Math.abs($dateToday.getTime() - $dateCreated.getTime());
    $diffDays = Math.ceil($timeDiff / (1000 * 3600 * 24));
    if ($diffDays <= 1) {
        $day = "day";
    } else {
        $day = "days"
    }
    $tweet = (`<article>` +
        `<header>` +
        `<img src="${data.user.avatars}">` +
        `<h2>${data.user.name}</h2>` +
        `<span>${data.user.handle}</span>` +
        `</header>` +
        `<div class="body">${escape(data.content.text)}</div>` +
        `<footer>` +
        `<span class="daysAgo">${$diffDays} ${$day} ago</span>` +
        `<div class="options">` +
        `<span><i class="fa fa-flag" aria-hidden="true"></i></span>` +
        `<span><i class="fa fa-retweet" aria-hidden="true"></i></span>` +
        `<span><i class="fa fa-heart" aria-hidden="true"></i></span>` +
        `</div>` +
        `</footer>` +
        `</article>`);
    $('#tweets-container').prepend($tweet);
}




$(document).ready(function() {
    function loadTweets() {
        $.ajax('/tweets', { method: 'GET' })
            .then(function(result) {
                renderTweets(result)
            });
    }
    $("#add").on("click", function(event) {

        //prevent to change the page
        event.preventDefault();

        //get data from the form
        $textarea = $(this).closest("form").find("textarea");
        $message = $(this).closest("form").find("#message");
        $counter = $(this).closest("form").find(".counter");

        $data = $textarea.serialize();

        console.log($textarea.val())
        $text = $textarea.val().trim();

        $textLength = $text.length;

        let showFlash = function(message) {
            jQuery('#message').html(message);
            jQuery('#message').toggleClass('highlight');
            jQuery('#message').slideDown('slow');
            jQuery('#message').click(function() {
                $('#message').toggle('highlight');
            });
        };

        if ($text === "" || $text === null) {
            showFlash("🚨Your message is empty!🚨");
            $textarea.focus();

        } else
        if ($textLength > 140) {
            showFlash("🚨 Your message is too long! 🚨")
            $textarea.focus();

        } else {
            // proceed as normally
            $.post("/tweets/", $data)
                .done(function() {
                    loadTweets();
                });

            //hidden the message if it is shown, clear the textarea, and reset the char-counter
            $message.text("").slideToggle(false);
            $textarea.val("").focus();
            $counter.text("140");
        }

    });

    loadTweets();

});