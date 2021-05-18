$(document).ready(function() {
  $("#tweet-text").keyup(function() {
    let maxCount = 140;
    let lengthOfTweet = $(this).val().length;
    let textRemaining = maxCount - lengthOfTweet;
    
    if (textRemaining <= 0) {
      $(".counter").css("color", "red");
    } else if (textRemaining > 0) {
      $(".counter").css("color", "#545149");
    }
    $(".counter").text(textRemaining);
  });
});