document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.getElementById("progress-bar");
    const enterBtn = document.getElementById("enter-btn");
    const preloader = document.getElementById("preloader");
    const loaderDots = document.getElementById("loader-dots");
  
    let progress = 0;
  
    // 1. Simulate loading bar progress
    const loadingInterval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
  
      if (progress >= 100) {
        progress = 100;
        clearInterval(loadingInterval);
  
        // Show the ENTER button when loaded
        if (enterBtn) {
          enterBtn.classList.add("show");
        }
      }
  
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }
    }, 100);
  
    // 2. Animate header dots (...)
    let dotCount = 0;
    setInterval(() => {
      dotCount = (dotCount + 1) % 4;
      if (loaderDots) {
        loaderDots.textContent = ".".repeat(dotCount);
      }
    }, 400);
  
    // 3. Unlock screen when ENTER is clicked
    if (enterBtn) {
      enterBtn.addEventListener("click", () => {
        // Fade out preloader
        preloader.style.opacity = "0";
        preloader.style.pointerEvents = "none";
  
        // Completely remove preloader from page structure after fade
        setTimeout(() => {
          preloader.style.display = "none";
        }, 500);
  
        // Remove scrolling block on <body>
        document.body.classList.remove("no-scroll");
  
        // Recalculate GSAP ScrollTrigger after preloader vanishes
        if (typeof ScrollTrigger !== "undefined") {
          ScrollTrigger.refresh();
        }
      });
    }
  });