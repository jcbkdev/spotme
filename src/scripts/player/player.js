//text width check
const songInfo = document.getElementById("song-info")
const songTitle = document.getElementById("title")
const songAuthor = document.getElementById("author")

const songInfoObserver = new MutationObserver((mutations) => {
  for (mutation of mutations){
    function checkWidth(element, width, className){
      const elementWidth = element.clientWidth;
      console.log(elementWidth > width)
      if(elementWidth > width){
        element.classList.add(className)
      }else{
        element.classList.remove(className)
      }
    }
    const element = mutation.target.parentElement;
    const titleMaxWidth = 270;
    const authorMaxWidth = 215;
    switch (element.id) {
      case "title":
        checkWidth(element, titleMaxWidth, "too-long")
        break;
      case "author":
        checkWidth(element, authorMaxWidth, "too-long")
        break;
      default:
        break;
    }
  }
})

// const config = {

// }

songInfoObserver.observe(songTitle, {childList: true, subtree: true, characterData: true})
// songInfoObserver.observe(songAuthor, config)


//button functionality
const playBtn = document.getElementById("play-btn")
const playBtnIcon = document.getElementById("play-btn-icon")

playBtn.addEventListener("click", (e) => {
  if (playBtn.classList.contains("playing")) {
    playBtnIcon.src = "../assets/play.svg"
  }else{
    playBtnIcon.src = "../assets/pause.svg"
  }
  playBtn.classList.toggle("playing")
})