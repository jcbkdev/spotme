const slider =  document.getElementById("volume-slider")
const sliderBg = document.getElementById("volume-slider-bg")

sliderBg.style.width = slider.value + "%"

slider.addEventListener("input", (e) => {
  console.log(e.target.value)
  sliderBg.style.width = e.target.value + "%"
})
