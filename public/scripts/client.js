/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  // {
  //   "user": {
  //     "name": "Descartes",
  //     "avatars": "https://i.imgur.com/nlhLi3I.png",
  //     "handle": "@rd"
  //   },
  //   "content": {
  //     "text": "Je pense , donc je suis"
  //   },
  //   "created_at": 1461113959088
  // }
];

// Render Tweets //
const renderTweets = function (tweets) {

  for (let tweet of tweets) {
    $(".tweets-container").append(createTweetElement(tweet));
  }

};

// Create Tweet Element //
const createTweetElement = function (tweet) {

  let $header = `
      <header>
        <div class="profile">
          <img src="${tweet.user.avatars}">
          <span class="display-name">${tweet.user.name}</span>
        </div>
          <span class="user-name">${tweet.user.handle}</span>
      </header>
        `

  let $tweeted = `
    <div class="text-tweet">
      <p>${tweet.content.text}</p>
      </div>`

  let $footer = `
    <footer class="tweet-footer">
      <span data-time="${tweet.created_at}" id="tweet-time" class="time-since-tweet"></span>
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

  // let $tweeted = `
  //   <article class="tweets-container">
  //     <header>
  //       <div class="profile">
  //         <img src="${tweet.user.avatars}">
  //         <span class="display-name">${tweet.user.name}</span>
  //       </div>
  //         <span class="user-name">${tweet.user.handle}</span>
  //     </header>
  //     <div class="text-tweet">
  //       <p>${tweet.content.text}</p>
  //      </div>
  //        <footer class="tweet-footer">
  //          <span data-time="${tweet.created_at}" id="tweet-time" class="time-since-tweet"></span>
  //            <div class="tweet-icons">
  //              <i class="fas fa-flag"></i>
  //              <i class="fas fa-retweet"></i>
  //              <i class="fas fa-heart"></i>
  //            </div>
  //        </footer>
  // `

  // return $tweeted;

};

renderTweets(data);

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

