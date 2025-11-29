//Listeners
document.querySelector("#likeBtn").addEventListener("click", addLike);
document.querySelector("#dislikeBtn").addEventListener("click", removeLike);
document.querySelector("#commentBtn").addEventListener("click", displayComments);

//Startup
initializeLikes();

//Functions
async function initializeLikes(){
    document.querySelector("#dislikeBtn").hidden = true;

    let response = await fetch("https://csumb.space/api/videoLikes.php?videoId=Sagg08DrO5U");
    let data = await response.json();
    let likes = data.likes;
    document.querySelector("#likesValue").textContent=`${likes}`;
}

async function addLike() {
    document.querySelector("#likeBtn").hidden = true;
    document.querySelector("#dislikeBtn").hidden = false;

    let response = await fetch("https://csumb.space/api/videoLikes.php?videoId=Sagg08DrO5U&action=like");
    let data = await response.json();
    let likes = data.likes;
    document.querySelector("#likesValue").textContent=`${likes}`;
}

async function removeLike() {
    document.querySelector("#dislikeBtn").hidden = true;
    document.querySelector("#likeBtn").hidden = false;
    
    let response = await fetch("https://csumb.space/api/videoLikes.php?videoId=Sagg08DrO5U&action=cancelLike");
    let data = await response.json();
    let likes = data.likes;
    document.querySelector("#likesValue").textContent=`${likes}`;
}

async function displayComments(){
    document.querySelector("#resultsArea").innerHTML="";

    let response = await fetch("https://csumb.space/api/videoLikes.php?videoId=?videoId=Sagg08DrO5U&action=comments");
    let data = await response.json();
    
    for(i in data) {
        let stars = "";
        for(let j=0; j < data[i].rating; j++) {
            stars += "<span><img src='img/star.jpg' width='20px' height='20px'></span>";
        }
        document.querySelector("#resultsArea").innerHTML += 
            `<div class=commentBox>
                <span style="color: coral;"><b>${data[i].author}</b></span> <i>(${data[i].date})</i>
                <br><br>
                ${data[i].comment}
                <br>
                ${stars}
            </div>`
    }
}
