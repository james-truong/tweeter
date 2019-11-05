// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {
    const tweetData = [{
            "user": {
                "name": "Newton",
                "avatars": "https://i.imgur.com/73hZDYK.png",
                "handle": "@SirIsaac"
            },
            "content": {
                "text": "If I have seen further it is by standing on the shoulders of giants"
            },
            "created_at": 1461116232227
        },
        {
            "user": {
                "name": "Descartes",
                "avatars": "https://i.imgur.com/nlhLi3I.png",
                "handle": "@rd"
            },
            "content": {
                "text": "Je pense , donc je suis"
            },
            "created_at": 1461113959088
        }
    ];
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

    function createTweetElement(data) {
        $dateCreated = new Date(data.created_at);
        $dateToday = new Date();

        $timeDiff = Math.abs($dateToday.getTime() - $dateCreated.getTime());
        $diffDays = Math.ceil($timeDiff / (1000 * 3600 * 24));
        $tweet = (`<article>` +
            `<header>` +
            `<img src="${data.user.avatars}">` +
            `<h2>${data.user.name}</h2>` +
            `<span>${data.user.handle}</span>` +
            `</header>` +
            `<div class="body">${data.content.text}</div>` +
            `<footer>` +
            `<span class="daysAgo">${$diffDays} days ago</span>` +
            `<div class="options">` +
            `<span><i class="fa fa-flag" aria-hidden="true"></i></span>` +
            `<span><i class="fa fa-retweet" aria-hidden="true"></i></span>` +
            `<span><i class="fa fa-heart" aria-hidden="true"></i></span>` +
            `</div>` +
            `</footer>` +
            `</article>`);
        $('#tweets-container').append($tweet);
    }

    renderTweets(tweetData);

    // Test / driver code (temporary)
});