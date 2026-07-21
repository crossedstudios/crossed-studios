document.addEventListener("DOMContentLoaded", () => {
    // ==================================================
    // 1. REGISTER GSAP
    // ==================================================
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
  
    // ==================================================
    // 2. PRELOADER FONT CYCLING
    // ==================================================
    const fontList = [
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      "Courier New, Courier, monospace",
      "Georgia, 'Times New Roman', serif",
      "Impact, Haettenschweiler, sans-serif",
      "Trebuchet MS, sans-serif"
    ];
  
    const cyclingTitle = document.getElementById("cycling-title");
    let fontIndex = 0;
  
    const fontInterval = setInterval(() => {
      fontIndex = (fontIndex + 1) % fontList.length;
      if (cyclingTitle) {
        cyclingTitle.style.fontFamily = fontList[fontIndex];
      }
    }, 1000);
  
    // ==================================================
    // 3. PRELOADER & ENTER BUTTON LOGIC
    // ==================================================
    const progressBar = document.getElementById("progress-bar");
    const loadCounter = document.getElementById("load-counter");
    const enterBtn = document.getElementById("enter-btn");
    const preloader = document.getElementById("preloader");
    const loaderDots = document.getElementById("loader-dots");
  
    let progress = 0;
    const loadingInterval = setInterval(() => {
      progress += Math.floor(Math.random() * 12) + 8;
  
      if (progress >= 100) {
        progress = 100;
        clearInterval(loadingInterval);
        if (enterBtn) enterBtn.classList.add("show");
      }
  
      if (progressBar) progressBar.style.width = `${progress}%`;
      if (loadCounter) loadCounter.textContent = `${progress}%`;
    }, 80);
  
    let dotCount = 0;
    setInterval(() => {
      dotCount = (dotCount + 1) % 4;
      if (loaderDots) loaderDots.textContent = ".".repeat(dotCount);
    }, 400);
  
    if (enterBtn) {
      enterBtn.addEventListener("click", () => {
        clearInterval(fontInterval);
        if (preloader) preloader.classList.add("hide");
        document.body.classList.remove("no-scroll");
  
        // Initialize all scroll animations
        initAnimations();
  
        // Trigger carousel playback
        updateCarousel();
      });
    }
  
    // ==================================================
    // 4. PORTFOLIO DATA & 3D CAROUSEL LOGIC
    // ==================================================
    const portfolioData = {
      food: [
        { type: "image", src: "beefburger.jpg", title: "Shea Lakeside Kitchen", aspect: "medium" },
        { type: "image", src: "beefstirfry .jpg", title: "Shea Lakeside Kitchen", aspect: "short" },
        { type: "image", src: "chickenburger.jpg", title: "Shea Lakeside Kitchen", aspect: "tall" },
        { type: "image", src: "chicken.jpg", title: "Shea Lakeside Kitchen", aspect: "medium" },
        { type: "image", src: "fries.jpg", title: "Shea Lakeside Kitchen", aspect: "short" },
        { type: "image", src: "fryplatter.jpg", title: "Shea Lakeside Kitchen", aspect: "tall" },
        { type: "image", src: "jalapenobites.jpg", title: "Shea Lakeside Kitchen", aspect: "medium" },
        { type: "image", src: "macbites.jpg", title: "Shea Lakeside Kitchen", aspect: "short" },
        { type: "image", src: "stirfryrice.jpg", title: "Shea Lakeside Kitchen", aspect: "tall" },
        { type: "image", src: "groupfood.jpg", title: "Shea Lakeside Kitchen", aspect: "medium" }
      ],
      events: [
        { type: "image", src: "K90A8317.jpg", title: "Event Coverage", aspect: "tall" },
        { type: "image", src: "K90A8439.jpg", title: "Event Coverage", aspect: "medium" },
        { type: "image", src: "K90A8442.jpg", title: "Event Coverage", aspect: "short" },
        { type: "image", src: "K90A8445.jpg", title: "Event Coverage", aspect: "tall" },
        { type: "image", src: "K90A8464.jpg", title: "Event Coverage", aspect: "medium" },
        { type: "image", src: "K90A8470.jpg", title: "Event Coverage", aspect: "short" },
        { type: "image", src: "K90A8475.jpg", title: "Event Coverage", aspect: "tall" },
        { type: "image", src: "K90A8518.jpg", title: "Event Coverage", aspect: "medium" },
        { type: "image", src: "K90A8597.jpg", title: "Event Coverage", aspect: "short" },
        { type: "image", src: "K90A9336.jpg", title: "Event Coverage", aspect: "tall" },
        { type: "image", src: "K90A9345.jpg", title: "Event Coverage", aspect: "medium" },
        { type: "image", src: "K90A9365.jpg", title: "Event Coverage", aspect: "short" },
        { type: "image", src: "K90A9384.jpg", title: "Event Coverage", aspect: "tall" },
        { type: "image", src: "K90A9394.jpg", title: "Event Coverage", aspect: "medium" },
        { type: "image", src: "K90A9488.jpg", title: "Event Coverage", aspect: "short" },
        { type: "image", src: "K90A9511.jpg", title: "Event Coverage", aspect: "tall" },
        { type: "image", src: "K90A9513.jpg", title: "Event Coverage", aspect: "medium" },
        { type: "image", src: "K90A9542.jpg", title: "Event Coverage", aspect: "short" },
        { type: "image", src: "K90A9551.jpg", title: "Event Coverage", aspect: "tall" }
      ],
      techup: [
        { type: "video", src: "TechUp Final For Website and Youtube.mp4", title: "Techup Showcase", aspect: "tall" },
        { type: "video", src: "TECHUP FINAL.mp4", title: "Techup Promo", aspect: "medium" },
        { type: "video", src: "Techup Short Vers.mp4", title: "Techup Short Cut", aspect: "short" }
      ],
      cssa: [
        { type: "video", src: "CSSA X HKSS Mahjong Night .mp4", title: "Mahjong Night", aspect: "tall" },
        { type: "video", src: "cssa reel .MP4", title: "CSSA Reel", aspect: "medium" },
        { type: "video", src: "CSSA ClUB EXPO.MP4", title: "Club Expo", aspect: "short" },
        { type: "video", src: "Timeline 1.mp4", title: "Timeline Video", aspect: "medium" }
      ],
      personal: [
        { type: "video", src: "China char post.mp4", title: "China Travel Reel", aspect: "tall" },
        { type: "video", src: "zeroz bts shoot.MP4", title: "Zeroz BTS", aspect: "medium" },
        { type: "video", src: "0210 necklace.MP4", title: "Product Shoot", aspect: "short" },
        { type: "image", src: "DSC00310.jpg", title: "Personal Photography", aspect: "tall" },
        { type: "image", src: "DSC00364.jpg", title: "Personal Photography", aspect: "medium" },
        { type: "image", src: "DSC00365.jpg", title: "Personal Photography", aspect: "short" },
        { type: "image", src: "DSC09534.jpg", title: "Personal Photography", aspect: "tall" },
        { type: "image", src: "IMG_6792.jpg", title: "Personal Photography", aspect: "medium" },
        { type: "image", src: "IMG_6794.jpg", title: "Personal Photography", aspect: "short" },
        { type: "image", src: "IMG_7055.jpg", title: "Personal Photography", aspect: "tall" },
        { type: "image", src: "IMG_7893.jpg", title: "Personal Photography", aspect: "medium" }
      ]
    };
  
    let currentCategory = "food";
    let currentIndex = 0;
    let modalMediaType = "all";
  
    // Elements
    const cardPrev = document.getElementById("card-prev");
    const cardActive = document.getElementById("card-active");
    const cardNext = document.getElementById("card-next");
    const counter = document.getElementById("carousel-counter");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const filterBtns = document.querySelectorAll(".filter-btn");
  
    const modal = document.getElementById("gallery-modal");
    const viewAllBtn = document.getElementById("view-all-btn");
    const closeModalBtn = document.getElementById("close-modal-btn");
    const modalGrid = document.getElementById("modal-grid");
  
    function renderCardContent(cardElement, item, isActive) {
      if (!cardElement) return;
      if (!item) {
        cardElement.innerHTML = "";
        return;
      }
  
      if (item.type === "video") {
        cardElement.innerHTML = `<video src="${item.src}" playsinline ${isActive ? 'controls autoplay' : 'muted'}></video>`;
        const video = cardElement.querySelector("video");
        if (isActive && video) {
          video.currentTime = 0;
          video.play().catch(() => {
            video.muted = true;
            video.play();
          });
        }
      } else {
        cardElement.innerHTML = `<img src="${item.src}" alt="${item.title || 'Portfolio Media'}">`;
      }
    }
  
    function updateCarousel() {
      const items = portfolioData[currentCategory] || [];
      if (items.length === 0) {
        if (cardPrev) cardPrev.innerHTML = "";
        if (cardActive) cardActive.innerHTML = "";
        if (cardNext) cardNext.innerHTML = "";
        if (counter) counter.textContent = "00 / 00";
        return;
      }
  
      // Wrap-around calculations
      const total = items.length;
      if (currentIndex >= total) currentIndex = 0;
      if (currentIndex < 0) currentIndex = total - 1;
  
      const prevIdx = (currentIndex - 1 + total) % total;
      const nextIdx = (currentIndex + 1) % total;
  
      renderCardContent(cardPrev, items[prevIdx], false);
      renderCardContent(cardActive, items[currentIndex], true);
      renderCardContent(cardNext, items[nextIdx], false);
  
      if (counter) {
        counter.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
      }
    }
  
    // Carousel Navigation Controls
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        currentIndex--;
        updateCarousel();
      });
    }
  
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentIndex++;
        updateCarousel();
      });
    }
  
    if (cardPrev) {
      cardPrev.addEventListener("click", () => {
        currentIndex--;
        updateCarousel();
      });
    }
  
    if (cardNext) {
      cardNext.addEventListener("click", () => {
        currentIndex++;
        updateCarousel();
      });
    }
  
    // Category Tab Filters
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
  
        currentCategory = btn.getAttribute("data-category");
        currentIndex = 0;
        updateCarousel();
      });
    });
  
    // ==================================================
    // 5. PINTEREST BOARD GALLERY & MODAL
    // ==================================================
    function renderPinterestGrid() {
      if (!modalGrid) return;
      modalGrid.innerHTML = "";
  
      // Aggregate all categories
      let allItems = [];
      Object.keys(portfolioData).forEach(cat => {
        allItems = allItems.concat(portfolioData[cat]);
      });
  
      // Filter by type (ALL, VIDEO, PHOTO)
      const filteredItems = allItems.filter(item => {
        if (modalMediaType === "all") return true;
        if (modalMediaType === "video") return item.type === "video";
        if (modalMediaType === "photo") return item.type === "image";
        return true;
      });
  
      filteredItems.forEach(item => {
        const pin = document.createElement("div");
        pin.className = `pin-item ${item.aspect || "medium"}`;
  
        if (item.type === "video") {
          pin.innerHTML = `<video src="${item.src}" loop muted playsinline onmouseover="this.play()" onmouseout="this.pause()"></video>`;
        } else {
          pin.innerHTML = `<img src="${item.src}" alt="${item.title || 'Gallery Image'}" loading="lazy">`;
        }
        modalGrid.appendChild(pin);
      });
    }
  
    // Modal Filter Controls (ALL / VIDEOS / PHOTOS)
    document.querySelectorAll(".modal-type-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        document.querySelectorAll(".modal-type-btn").forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        modalMediaType = e.target.dataset.type;
        renderPinterestGrid();
      });
    });
  
    // Open/Close Modal Events
    if (viewAllBtn && modal) {
      viewAllBtn.addEventListener("click", () => {
        // Pause active stage video
        if (cardActive) {
          const stageVideo = cardActive.querySelector("video");
          if (stageVideo) stageVideo.pause();
        }
  
        renderPinterestGrid();
        modal.classList.add("open");
        document.body.classList.add("no-scroll");
      });
    }
  
    if (closeModalBtn && modal) {
      closeModalBtn.addEventListener("click", () => {
        // Pause modal videos
        if (modalGrid) {
          const modalVideos = modalGrid.querySelectorAll("video");
          modalVideos.forEach(v => v.pause());
        }
  
        modal.classList.remove("open");
        document.body.classList.remove("no-scroll");
  
        // Resume main stage playback
        updateCarousel();
      });
    }
  
    // Render initial carousel view
    updateCarousel();
  
    // ==================================================
    // 6. RATES CARD INTERACTIVITY (3D TILT & INQUIRE SCROLL)
    // ==================================================
    document.querySelectorAll('.rate-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
  
        // Smooth 3D tilt towards mouse position
        card.style.transform = `rotateY(${x / 12}deg) rotateX(${-y / 12}deg) translateY(-5px)`;
      });
  
      card.addEventListener('mouseleave', () => {
        card.style.transform = `rotateY(0deg) rotateX(0deg) translateY(0px)`;
      });
    });
  
    document.querySelectorAll('.rate-card .inquire-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  
    // ==================================================
    // 7. EMAILJS CONTACT FORM SUBMISSION
    // ==================================================
    if (typeof emailjs !== "undefined") {
      emailjs.init("MVjgEmVeH-6giR60E");
    }
  
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");
    const submitBtn = document.getElementById("submit-btn");
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
  
        if (submitBtn) submitBtn.textContent = "SENDING...";
        if (formStatus) formStatus.textContent = "";
  
        emailjs.sendForm("service_tcfw1wj", "template_dzkd3kb", contactForm)
          .then(() => {
            if (formStatus) {
              formStatus.style.color = "#00ff88";
              formStatus.textContent = "MESSAGE SENT SUCCESSFULLY!";
            }
            contactForm.reset();
            if (submitBtn) submitBtn.textContent = "SEND MESSAGE";
          })
          .catch((error) => {
            console.error("EmailJS Error:", error);
            if (formStatus) {
              formStatus.style.color = "#ff4444";
              formStatus.textContent = "FAILED TO SEND. PLEASE TRY AGAIN.";
            }
            if (submitBtn) submitBtn.textContent = "SEND MESSAGE";
          });
      });
    }
  
    // ==================================================
    // 8. GSAP SCROLL ANIMATIONS
    // ==================================================
    function initAnimations() {
      if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
  
      ScrollTrigger.refresh();
  
      /* HERO ANIMATION */
      gsap.to(".hero-content", {
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 1
        },
        y: -120,
        scale: 1.2,
        opacity: 0,
        filter: "blur(12px)",
        ease: "none"
      });
  
      /* ABOUT SECTION */
      gsap.from(".about-title", {
        scrollTrigger: {
          trigger: "#about",
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out"
      });
  
      gsap.from(".about-tag", {
        scrollTrigger: {
          trigger: ".about-tags",
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(1.4)"
      });
  
      gsap.from(".about-image-wrapper", {
        scrollTrigger: {
          trigger: ".about-container",
          start: "top 75%",
          toggleActions: "play none none reverse"
        },
        y: 60,
        scale: 0.85,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });
  
      gsap.from(".about-text", {
        scrollTrigger: {
          trigger: ".about-content",
          start: "top 75%",
          toggleActions: "play none none reverse"
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out"
      });
  
      gsap.to("#about", {
        scrollTrigger: {
          trigger: "#about",
          start: "bottom 60%",
          end: "bottom 10%",
          scrub: 1
        },
        opacity: 0,
        y: -50,
        ease: "none"
      });
  
      /* WORK SECTION */
      gsap.from(".work-title", {
        scrollTrigger: {
          trigger: "#work",
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out"
      });
  
      gsap.from(".filter-buttons", {
        scrollTrigger: {
          trigger: ".filter-buttons",
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      });
  
      gsap.to("#work", {
        scrollTrigger: {
          trigger: "#work",
          start: "bottom 60%",
          end: "bottom 10%",
          scrub: 1
        },
        opacity: 0,
        y: -50,
        ease: "none"
      });
  
      /* RATES SECTION */
      gsap.from(".rates-title", {
        scrollTrigger: {
          trigger: "#rates",
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out"
      });
  
      gsap.from(".rate-card", {
        scrollTrigger: {
          trigger: ".rates-grid",
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out"
      });
    }
  });
