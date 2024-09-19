import { getRandomColor, getColor } from "./utility.js";
import {
  scrollerItem,
  ideas,
  slideData,
  stepsCheckboxData,
  campaignTypeData,
} from "./data.js";

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
  document.querySelector(".campaign-img").src = ideas[currentIndex].image;
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
const sliderWrapper = document.querySelector(".slider-wrapper");
let curSlide = 0;

sliderWrapper.innerHTML = slideData
  .map(
    (slide) =>
      `<article class="slide">
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

/********************* CREATE CAMPAIGN ********************/ // Select DOM elements
let currentStepIndex = 0;

document.querySelector(".create-camp-left").innerHTML = `
  <img src="./assets/createCamp/ccL_0.svg" alt="" />
  ${stepsCheckboxData
    .map(
      (checkbox) => `
      <li>
        <label for="${checkbox.id}">
          <img src="${checkbox.image}" alt="" />
          <span>${checkbox.label}</span>
        </label>
        <input type="checkbox" id="${checkbox.id}"
      } disabled />
      </li>`
    )
    .join("")}
`;

// Object to map step ids to content rendering functions
const contentRenderers = {
  campaignType: () => {
    return `
    <h2>Select Campaign Type</h2>
    <div class="right-content">
    ${campaignTypeData
      .map(
        (c) => `
          <label class="option-card" for="${c.id}">
          <img src="${c.imgSrc}"/>
          <h2>${c.title}</h2>
          <input type="checkbox" id="${c.id}" />
          </label>
        `
      )
      .join("")}
      <button class="btn" next-btn>Next</button>
    </div>
    `;
  },

  campaignDuration: () => {
    return `
      <h2>Select Campaign Duration</h2>
      <p>Pick a time</p>
      <label for="clock" class="clock">
        <span>12:00</span>
        <div class="caret-down"></div>
        <input type="time" id="clock" />
      </label>
      <label for="calendar" class="calendar">
        <img src="./assets/createCamp/calendar.svg" />
        <input type="date" id="calendar" />
      </label>
      <div class="btn-container">
        <button class="btn" prev-btn>Previous</button>
        <button class="btn" next-btn>Next</button>
      </div>
    `;
  },
};

// Function to render content on the right side based on the current step
function renderContent(stepIndex) {
  document.querySelector(".create-camp-right").innerHTML =
    contentRenderers[stepsCheckboxData[stepIndex].id]();

  document
    .querySelector("[next-btn]")
    ?.addEventListener("click", () => goToNextStep());

  document
    .querySelector("[prev-btn]")
    ?.addEventListener("click", () => goToPreviousStep());

  document
    .querySelector("[overlay]")
    .classList.toggle("overlay", stepIndex > 0);
}

// Go to the next step
function goToNextStep() {
  if (currentStepIndex < stepsCheckboxData.length - 1) {
    document.getElementById(
      stepsCheckboxData[currentStepIndex].id
    ).checked = true;
    currentStepIndex += 1;
    renderContent(currentStepIndex);
  }
}

// Go to the previous step
function goToPreviousStep() {
  if (currentStepIndex > 0) {
    currentStepIndex -= 1;
    renderContent(currentStepIndex);
  }
}

renderContent(currentStepIndex);
