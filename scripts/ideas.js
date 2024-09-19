import { ideas } from "./data.js";

document.querySelector(".ideas-container").innerHTML = ideas
  .map(
    (idea) =>
      `<article>
        <div class="text">
          <h2>${idea.title}</h2>
          <p>
            ${idea.description}
          </p>
        </div>
        <div class="design">
          <img src="${idea.image}" alt="" />
        </div>
      </article>`
  )
  .join("");
