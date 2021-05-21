/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

// Cross-Site Scripting //
const escape = function(text) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
};

// Render Tweets //
const renderTweets = function (tweets) {

  $("#tweet-container").empty();
  for (const tweet of tweets) {
    $(".tweets-container").prepend(createTweetElement(tweet));
  };

};

// Create Tweet Element //
const createTweetElement = function (tweet) {
  const profileName = tweet.user.name;
  const profilePic = tweet.user.avatars;
  const profileHandle = tweet.user.handle;
  const tweetContent = tweet.content.text;
  const tweetTime = tweet.created_at;

  let $header = `
      <header>
        <div class="profile">
          <img src="${profilePic}">
          <span class="display-name">${profileName}</span>
        </div>
          <span class="user-name">${profileHandle}</span>
      </header>
        `

  let $tweeted = `
    <div class="text-tweet">
      <p>${escape(tweetContent)}</p>
      </div>`

  let $footer = `
    <footer class="tweet-footer">
      <span data-time="${tweetTime}" id="tweet-time" class="time-since-tweet"></span>
        <div class="tweet-icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
    </footer>`

  return `
    <article>
      ${$header}
      ${$tweeted}
      ${$footer}
    </article>
  `;

};

$("#tweet-post").submit(function(event) {
  const $form = $(this);
  const $input = $form.find("textarea");
  const textData = $input.serialize();
  const textRemaining = $("#tweet-text").val();
  event.preventDefault();



  if (textRemaining.length > 140) {
    $("#exceed-error").slideDown("slow");
    return;
  }

  if (!textRemaining) {
    $("#blank-error").slideDown("slow");
    return;
  }


  $.ajax({
    type: "POST",
    url: "/tweets",
    data: textData,
  })
    .then(() => {
      loadTweets();
      $input.val("");
    $(".error-msg").slideUp("");      
    })
    .catch(err => {
      console.log("AJAX error caught!");
      console.log(err);
    });

});

const loadTweets = function() {
  $.ajax({
    method: "GET",
    url: "/tweets",
    dataType: "json",
    success: function(data) {
      renderTweets(data);
    },
    error: function() {
      alert("Tweets not found!");
    }
  });
};

loadTweets();

});

// TIMEAGO base //
$(function () {
  console.log("ready!");
  const tweetTime = $("#tweet-time");
  const time = tweetTime.data("time");
  console.log(time);
  const timeAgoTime = timeago.format(time);
  tweetTime.append(timeAgoTime);
});

