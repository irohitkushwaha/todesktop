const MenuIcon = document.getElementById("mobileMenu");
function HandleMenu() {
  MenuIcon.classList.toggle("hidden");
  console.log("toogled");
}

const pricing = document.getElementById("pricing");
const essential = document.getElementById("essential");
const professional = document.getElementById("professional");

function HandlePrice() {
  pricing.classList.toggle("translate-x-full");
  essential.innerText = essential.innerText.trim() === "$125" ? "$100" : "$125";
  professional.innerText =
    professional.innerText.trim() === "$240" ? "$300" : "$240";

  console.log("price model changed");
}

function FAQ() {
  const AllFaqs = document.querySelectorAll(".faqs");

  AllFaqs.forEach((EachFaq) => {
    EachFaq.addEventListener("click", () => {
      const IsAriaExpanded = EachFaq.getAttribute("aria-expanded");
      EachFaq.setAttribute("aria-expanded", String(!IsAriaExpanded));
      const Id = EachFaq.getAttribute("aria-controls");
      const Description = document.getElementById(Id);
      Description.classList.toggle("hidden");
      const rotate = EachFaq.querySelector("i");
      rotate.classList.toggle("-rotate-180")
    });
  });
}

FAQ();

// // //Algorithm for animation in company logo
// // //1. observer if element is inside the viewport'
// // //2. if inside then use scroll event listen to listen
// // //3. when scroll then translate the elimnate
// // function IntersectionObserveElement(element, LTR, speed) {
// //   const observer = new IntersectionObserver((entries) => {
// //     entries.forEach((entry) => {
// //       if (entry.isIntersecting) {
// //          window.addEventListener("scroll", () => {
// //           if(LTR){
// //             element.classList.add("translate-x-[5px]")
// //           }
// //         });
// //       }
// //     });
// //   });

// //   observer.observe(element);
// // }

// // const Line1 = document.querySelector("#line-1");

// // IntersectionObserveElement(Line1, true);

// // Example function to toggle a menu icon (unrelated to the scroll animation)
// const MenuIcon = document.getElementById("mobileMenu");
// function HandleMenu() {
//   MenuIcon.classList.toggle("hidden");
//   console.log("toggled");
// }

// /**
//  * This function uses IntersectionObserver to add a scroll event listener
//  * that continuously translates the element horizontally based on the scroll direction.
//  *
//  * @param {HTMLElement} element - The DOM element to animate.
//  * @param {boolean} LTR - If true, scroll down moves the element right and scroll up moves it left.
//  *                          If false, the behavior is reversed.
//  * @param {number} speed - A multiplier for the scroll delta to control animation speed.
//  */
// function IntersectionObserveElement(element, LTR, speed) {
//   // Set a default speed if not provided
//   const translationFactor = speed;

//   // Variables to track the last scroll position and the current horizontal offset
//   let lastScrollY = window.scrollY;
//   let offsetX = 0;
//   let scrollListenerAdded = false; // to avoid adding multiple listeners

//   // Define the scroll handler that updates the horizontal translation
//   function handleScroll() {
//     const currentScrollY = window.scrollY;
//     const delta = currentScrollY - lastScrollY;

//     // Determine the multiplier based on the LTR flag.
//     // If LTR is true, delta is applied directly; if false, we reverse the movement.
//     const directionMultiplier = LTR ? 1 : -1;

//     // Accumulate the horizontal offset based on the scroll delta and speed
//     offsetX += delta * translationFactor * directionMultiplier;

//     // Apply the transform to the element. If you need to combine with other transforms,
//     // you might need to adjust this.
//     element.style.transform = `translateX(${offsetX}px)`;

//     // Update the last scroll position for the next event
//     lastScrollY = currentScrollY;
//   }

//   // Create the IntersectionObserver instance.
//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       // When the element is in the viewport...
//       if (entry.isIntersecting) {
//         if (!scrollListenerAdded) {
//           window.addEventListener("scroll", handleScroll);
//           scrollListenerAdded = true;
//           // Optionally, initialize lastScrollY when starting
//           lastScrollY = window.scrollY;
//         }
//       } else {
//         // Optionally remove the scroll event listener when the element is out of view
//         if (scrollListenerAdded) {
//           window.removeEventListener("scroll", handleScroll);
//           scrollListenerAdded = false;
//         }
//       }
//     });
//   });

//   // Start observing the element
//   observer.observe(element);
// }

// // Select the element to animate
// const Line1 = document.querySelector("#line-1");
// const Line2 = document.querySelector("#line-2");
// const Line3 = document.querySelector("#line-3");

// // Start the intersection observation and scroll-based translation.
// // Here, LTR is true and speed is 1 (you can adjust these values as needed).
// IntersectionObserveElement(Line1, true, 0.3);
// IntersectionObserveElement(Line2, false, 0.3);
// IntersectionObserveElement(Line3, true, 0.3);

/**
 * This function coordinates CSS and JavaScript-based translations for smooth scroll animations.
 *
 * @param {HTMLElement} element - The DOM element to animate.
 * @param {boolean} LTR - If true, scroll down moves element right, up moves left.
 * @param {number} speed - Multiplier for the scroll delta to control animation speed.
 */
function IntersectionObserveElement(element, LTR, speed) {
  const translationFactor = speed;
  let lastScrollY = window.scrollY;
  let offsetX = 0;
  let scrollListenerAdded = false;
  let animationInitialized = false;

  // Get initial CSS transform value
  const initialTransform = -200; // matching the Tailwind -translate-x-[200px]

  function initializeAnimation() {
    if (!animationInitialized) {
      // Remove the Tailwind class that causes initial translation
      element.classList.remove("-translate-x-[200px]");

      // Set initial position programmatically
      offsetX = initialTransform;
      element.style.transform = `translateX(${offsetX}px)`;

      animationInitialized = true;
    }
  }

  function handleScroll() {
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY;
    const directionMultiplier = LTR ? 1 : -1;

    // Update position with smooth easing
    const easedDelta = delta * translationFactor * directionMultiplier;
    offsetX += easedDelta;

    requestAnimationFrame(() => {
      element.style.transform = `translateX(${offsetX}px)`;
    });

    lastScrollY = currentScrollY;
  }

  // Throttle scroll handler for performance
  const throttledScrollHandler = throttle(handleScroll, 16);

  function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!scrollListenerAdded) {
          // Initialize animation when element comes into view
          initializeAnimation();
          window.addEventListener("scroll", throttledScrollHandler, {
            passive: true,
          });
          scrollListenerAdded = true;
          lastScrollY = window.scrollY;
        }
      } else {
        if (scrollListenerAdded) {
          window.removeEventListener("scroll", throttledScrollHandler);
          scrollListenerAdded = false;
        }
      }
    });
  });

  observer.observe(element);

  return () => {
    observer.disconnect();
    if (scrollListenerAdded) {
      window.removeEventListener("scroll", throttledScrollHandler);
    }
  };
}

// Initialize elements
const Line1 = document.querySelector("#line-1");
const Line2 = document.querySelector("#line-2");
const Line3 = document.querySelector("#line-3");
const Line4 = document.querySelector("#line-4");

// Modified HTML structure:
/*
<div
  id="line-1"
  class="flex gap-4 -translate-x-[200px] transition-all ease-out duration-300"
>
  <!-- Your content -->
</div>
*/

IntersectionObserveElement(Line1, true, 0.5);
IntersectionObserveElement(Line2, false, 0.3);
IntersectionObserveElement(Line3, true, 0.5);
IntersectionObserveElement(Line4, false, 0.6);
