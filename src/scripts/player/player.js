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