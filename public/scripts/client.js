/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {


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
      <p>${tweetContent}</p>
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
  const textData = ($(this).serialize());
  const textRemaining = $("#tweet-text").val();
  event.preventDefault();


  // FORM VALIDATION //
  if (textRemaining.length > 140) {
    alert("You've exceeded the maximum of characters for a tweet!");
    return;
  }

  if (textRemaining === "" || textRemaining === null) {
    alert("Your tweet is empty!")
  }

  $.post("/tweets", textData)
  .then(loadTweets)
  $("#tweet-text").val("");
  
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

