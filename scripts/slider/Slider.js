const ACTIVE_SLIDE = "slide--active";
const BUTTON_DISABLED = "button--disabled";
const START_ARRAY_OF_1 = [0];
const START_ARRAY_OF_3 = [0, 1, 2];
const END_OF_ARRAY_OF_3 = [3, 4, 5];

export function initSlider(
  sliderID,
  breakPoint = null,
  autoSwap = false,
  infinite = true
) {
  const slider = document.querySelector(`#${sliderID}`);
  const [slidesWrapper, controls] = slider.children;
  const slidesCount = slidesWrapper.childElementCount;
  const slides = [...slidesWrapper.children];
  const [prevButton, sliderCounter, nextButton] = controls.children;
  const [counterCurrent, t, counterSum] = sliderCounter.children;
  let visibleSlidesArray = [],
    SLIDES_VISIBLE = 1,
    CURRENT_VISIBLE_SLICE = [],
    START_ARRAY = START_ARRAY_OF_1,
    END_ARRAY = [slides.length - 1];

  function init() {
    counterSum.innerHTML = `${slidesCount}`;
    visibleSlidesArray = START_ARRAY;
    prevButton.addEventListener("click", () => {
      if (visibleSlidesArray[0] - SLIDES_VISIBLE < 0) {
        visibleSlidesArray = END_ARRAY;
      } else {
        visibleSlidesArray = visibleSlidesArray.map(
          (slideC) => slideC - SLIDES_VISIBLE
        );
      }
      updateSliderHandler();
    });

    nextButton.addEventListener("click", () => {
      nextSlideHandler();
    });

    if (autoSwap) {
      setInterval(nextSlideHandler, 4000);
    }
    updateSliderHandler();
    if (breakPoint) {
      const bp = Object.keys(breakPoint)[0];
      const bpMq = window.matchMedia(`(min-width: ${bp})`);
      mqHandler(bpMq);
      bpMq.addEventListener("change", (event) => mqHandler(event));
    }
  }

  function mqHandler(mq) {
    if (mq.matches) {
      SLIDES_VISIBLE = 3;
      START_ARRAY = START_ARRAY_OF_3;
      END_ARRAY = END_OF_ARRAY_OF_3;
    } else {
      SLIDES_VISIBLE = 1;
      START_ARRAY = START_ARRAY_OF_1;
      END_ARRAY = [slides.length - 1];
    }
    visibleSlidesArray = START_ARRAY;
    updateSliderHandler();
  }

  function updateSliderHandler() {
    CURRENT_VISIBLE_SLICE.forEach((slide) =>
      slide.classList.remove(ACTIVE_SLIDE)
    );
    const newVisibleSlice = slides.slice(
      visibleSlidesArray[0],
      visibleSlidesArray[visibleSlidesArray.length - 1] + 1
    );
    newVisibleSlice.forEach((slide) => {
      slide.classList.add(ACTIVE_SLIDE);
    });
    CURRENT_VISIBLE_SLICE = newVisibleSlice;
    counterCurrent.innerHTML = visibleSlidesArray[0] + SLIDES_VISIBLE;

    if (!infinite) {
      if (
        visibleSlidesArray[visibleSlidesArray.length - 1] + SLIDES_VISIBLE ===
        slidesCount
      ) {
        nextButton.disabled = true;
      } else {
        nextButton.disabled = false;
      }

      if (visibleSlidesArray[0] === 0) {
        prevButton.disabled = true;
      } else {
        prevButton.disabled = false;
      }
    }
  }
  function nextSlideHandler() {
    if (visibleSlidesArray[0] + SLIDES_VISIBLE === slidesCount) {
      visibleSlidesArray = START_ARRAY;
    } else {
      visibleSlidesArray = visibleSlidesArray.map(
        (slideC) => slideC + SLIDES_VISIBLE
      );
    }
    updateSliderHandler();
  }

  init();
}
