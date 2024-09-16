import { getRandomColor, getColor } from "./utility.js";
import { scrollerItem, ideas, slideData } from "./data.js";

/********************* HOME ********************/
const toggleNav = () =>
  document.querySelector("#nav").classList.toggle("active");

// open menu
document
  .querySelector(".menu-open")
  .addEventListener("click", () => toggleNav());

// close menu
document
  .querySelector(".menu-close")
  .addEventListener("click", () => toggleNav());

// close menu when click on navlink
document.querySelector(".nav-link").addEventListener("click", (e) => {
  if (e.target.tagName === "A") toggleNav();
});

// add scroll items
document.querySelector(".scroll-container").innerHTML = scrollerItem
  .map((item, index) => `<li style="color: ${getColor(index)}">${item}</li>`)
  .join("");

/********************* CAMPAIGN IDEAS ********************/

// create campaign idea
function createCampaign(currentIndex) {
  const color = getRandomColor();
  document.querySelector(".rhombus").style.background = color;
  document.querySelector(".campaign-img").src = ideas[currentIndex].img;
  document.querySelector(".campaign-title").style.color = color;
  document.querySelector(".campaign-title").textContent =
    ideas[currentIndex].title;
}

// call createCampaign function with different data every 2sec
function renderCampaign() {
  let currentIndex = 0;
  setInterval(() => {
    currentIndex = (currentIndex + 1) % ideas.length;
    createCampaign(currentIndex);
  }, 2000);
}

renderCampaign();

/********************* METRIC MEASURES ********************/

/********************* METRIC MEASURES ********************/
const sliderWrapper = document.querySelector(".slider-wrapper");
let curSlide = 0;

sliderWrapper.innerHTML = slideData
  .map(
    (slide) => `<article class="slide">
  <img src="${slide.imgSrc}" />
  <h2>${slide.title}</h2>
  <p>${slide.description}</p>
  </article>`
  )
  .join("");

const slides = document.querySelectorAll(".slide");

const slideWidth = slides[0]?.offsetWidth / 2;

function translateSlider() {
  const translateValue = -curSlide * slideWidth;
  sliderWrapper.style.transform = `translateX(${translateValue}px)`;
}

function updateActiveClass(index, isActive) {
  slides[index].classList.toggle("active", isActive);
}

document.querySelector(".next-btn").addEventListener("click", () => {
  updateActiveClass(curSlide, false);
  curSlide = (curSlide + 1) % slides.length;
  translateSlider();
  updateActiveClass(curSlide, true);
});

updateActiveClass(curSlide, true);
