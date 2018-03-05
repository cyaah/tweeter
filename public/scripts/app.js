/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 $(function(){ // jQuery document.ready shortcut
// Function to convert to days last posted
function daysAgo(time) {
   const currentDate = Date.now();
   const currentTime = currentDate - time;
   const millisecond = (24 * 60 * 60 * 1000)
   const daysAgo = Math.round(Math.abs(currentTime / millisecond));

   return daysAgo.toLocaleString();

 }

console.log(daysAgo(1461113796368));




// Rendering Tweets to display
  function renderTweets(tweets) {
    // loops through tweets
    tweets.forEach(function(tweet) {
	   // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      $('#tweetsContainer').prepend($($tweet));

    });
  }

  function createTweetElement(tweet) {

    let $tweet = $(`
      <section class="allTweets" >
        <article>
              <header>


                    <img src="${tweet.user.avatars.small}"></img>
                    <h4 class="userName">${tweet.user.handle}</h4>
                    <h2>${tweet.user.name}</h2>
                   
 

              </header>

                  <p> ${tweet.content.text}</p>
              <footer>
                    <div id="bottomRight">
                      <i class="fas fa-flag"></i>
                      <i class="fas fa-retweet"></i>
                      <i class="fas fa-heart"></i>
                    </div>  
                      <p> ${daysAgo(tweet.created_at)} Days Ago</p>
              </footer>
            </article>
          </section>

    `);
    return $tweet;
  }
 
// Conditional to check if tweet posted is not empty and less than 140 characters
$('#compose').on('click',function(ev){
  ev.preventDefault()
   console.log('Tweet ');
  let $compose = $('#composeForm').serialize();
  let text_remaining = $('#textarea').val().length;
  if($('#textarea').val() === ""){
     $('#textarea').attr("placeholder", "Cannot post empty tweet!");
  }
  else if(text_remaining > 140){
    $(".counter").html("Exeeced Limit");

  }
  else{
  $.ajax({
    url:'/tweets',
    method: 'POST',
    data: $compose,
    success: function(newtweet){
      console.log('Tweet created');
      window.location.reload(true);
      }
    })
  }
})


function loadTweets(){
  $.ajax({
    url:'/tweets',
    method:'GET',
    success: function(db){
                  let tweetsData = db;
                  renderTweets(tweetsData);
                }
  });
}
loadTweets();

$('.composeToggle').click(function(){
    console.log("clicked");
    if($('#composeBox').is(':hidden')){
      console.log('hidden');
    $('#composeBox').slideDown('slow');
    $('#textarea').focus();
  }
  else{
    $('#composeBox').slideUp('slow');
  }
 });



})

// function escape(str) {
//   var textarea = document.createElement('textarea');
//   textarea.appendChild(document.createTextNode(str));
//   return textarea.innerHTML;
// }

// const safeCompose = `<textarea>${escape($('#composeForm'))}</textarea>`;