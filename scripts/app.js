import { initSlider } from "./slider/Slider.js";

document.addEventListener("DOMContentLoaded", function () {
  initSlider("slider--stages", null, false, false);
  initSlider(
    "slider--participants",
    {
      "65em": {
        slidesVisible: 3,
      },
    },
    true
  );
});
