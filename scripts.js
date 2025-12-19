/* Crossed Studios — "effect on effect" pack
   Safe defaults, no dependencies, respects reduced-motion.
*/
(() => {
    const $ = (s, el = document) => el.querySelector(s);
    const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  
    // Respect reduced motion
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const isTouch = matchMedia?.("(hover: none)")?.matches || "ontouchstart" in window;
  
    // ----------------------------
    // 0) Inject CSS so you DON'T have to touch your styles.css
    // ----------------------------
    const style = document.createElement("style");
    style.textContent = `
      /* --- FX Layer --- */
      :root { --fx-accent-a: rgba(0,255,255,.9); --fx-accent-b: rgba(255,0,200,.65); }
      body.fx-ready { overflow-x: hidden; }
  
      /* Scanlines + subtle noise */
      body.fx-ready::before{
        content:"";
        position:fixed; inset:0;
        pointer-events:none;
        z-index: 9997;
        opacity:.35;
        background:
          repeating-linear-gradient(
            to bottom,
            rgba(255,255,255,.04) 0px,
            rgba(255,255,255,.04) 1px,
            rgba(0,0,0,0) 3px
          );
        mix-blend-mode: overlay;
      }
      body.fx-ready::after{
        content:"";
        position:fixed; inset:0;
        pointer-events:none;
        z-index: 9996;
        opacity:.08;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.6'/%3E%3C/svg%3E");
        mix-blend-mode: soft-light;
      }
  
      /* Cursor blob */
      #fx-blob{
        position:fixed;
        width:260px; height:260px;
        border-radius:999px;
        pointer-events:none;
        z-index: 9999;
        opacity:.35;
        filter: blur(30px);
        transform: translate(-50%,-50%);
        background: radial-gradient(circle, var(--fx-accent-a), var(--fx-accent-b), rgba(0,0,0,0));
        mix-blend-mode: screen;
        will-change: left, top;
      }
  
      /* Click ripple */
      .fx-ripple{
        position:fixed;
        width:14px; height:14px;
        border-radius:999px;
        pointer-events:none;
        z-index: 9999;
        border: 1px solid rgba(255,255,255,.4);
        transform: translate(-50%,-50%) scale(1);
        opacity: .9;
        animation: fxRipple .75s ease-out forwards;
      }
      @keyframes fxRipple{
        to { transform: translate(-50%,-50%) scale(18); opacity:0; }
      }
  
      /* Scramble target */
      .fx-scramble{ display:inline-block; }
  
      /* Smooth reveal */
      .fx-reveal{
        opacity: 0;
        transform: translateY(14px);
        transition: opacity .6s ease, transform .6s ease;
      }
      .fx-reveal.is-in{
        opacity: 1;
        transform: translateY(0);
      }
  
      /* Tilt cards */
      .fx-tilt{
        transform-style: preserve-3d;
        will-change: transform;
        transition: transform .12s ease;
      }
  
      /* Lightbox */
      #fx-lightbox{
        position:fixed; inset:0;
        display:none;
        align-items:center; justify-content:center;
        padding: 24px;
        background: rgba(0,0,0,.82);
        z-index: 10000;
        backdrop-filter: blur(8px);
      }
      #fx-lightbox.is-on{ display:flex; }
      #fx-lightbox img{
        max-width: min(96vw, 1200px);
        max-height: 86vh;
        border: 1px solid rgba(255,255,255,.18);
        box-shadow: 0 20px 80px rgba(0,0,0,.7);
      }
      #fx-lightbox .fx-close{
        position:fixed;
        top: 16px; right: 16px;
        border: 1px solid rgba(255,255,255,.2);
        background: rgba(0,0,0,.35);
        color: rgba(255,255,255,.9);
        padding: 10px 12px;
        border-radius: 999px;
        cursor:pointer;
        font: inherit;
        letter-spacing: .08em;
      }
  
      /* Magnetic */
      .fx-magnetic{ display:inline-flex; will-change: transform; }
  
      /* Neon edge hover on masonry */
      .masonry img{
        position: relative;
        box-shadow: 0 0 0 rgba(0,0,0,0);
      }
      .masonry img:hover{
        box-shadow:
          0 0 0 1px rgba(255,255,255,.10),
          0 0 22px rgba(0,255,255,.12),
          0 0 28px rgba(255,0,200,.10);
      }
  
      /* Subtle CRT wobble on hero */
      .hero.fx-crt{
        animation: fxCRT 3.8s ease-in-out infinite;
      }
      @keyframes fxCRT{
        0%   { transform: translate(0,0) skewX(0deg); }
        50%  { transform: translate(.6px,-.3px) skewX(.08deg); }
        100% { transform: translate(0,0) skewX(0deg); }
      }
    `;
    document.head.appendChild(style);
  
    // ----------------------------
    // 1) Mark body ready
    // ----------------------------
    document.body.classList.add("fx-ready");
    const hero = $(".hero");
    if (hero && !reduceMotion) hero.classList.add("fx-crt");
  
    // ----------------------------
    // 2) Cursor blob + click ripple (desktop only)
    // ----------------------------
    if (!reduceMotion && !isTouch) {
      const blob = document.createElement("div");
      blob.id = "fx-blob";
      document.body.appendChild(blob);
  
      let tx = innerWidth / 2, ty = innerHeight / 2, cx = tx, cy = ty;
      addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; }, { passive: true });
  
      (function anim() {
        cx += (tx - cx) * 0.14;
        cy += (ty - cy) * 0.14;
        blob.style.left = cx + "px";
        blob.style.top  = cy + "px";
        requestAnimationFrame(anim);
      })();
  
      addEventListener("pointerdown", (e) => {
        const r = document.createElement("div");
        r.className = "fx-ripple";
        r.style.left = e.clientX + "px";
        r.style.top  = e.clientY + "px";
        document.body.appendChild(r);
        r.addEventListener("animationend", () => r.remove());
      }, { passive: true });
    }
  
    // ----------------------------
    // 3) Scramble text on brand + headings
    // ----------------------------
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    function scramble(el, finalText) {
      if (!el) return;
      const text = finalText ?? el.textContent ?? "";
      let i = 0;
      const tick = () => {
        el.textContent = text
          .split("")
          .map((ch, idx) => (idx < i ? ch : letters[Math.floor(Math.random() * letters.length)]))
          .join("");
        i += 0.5;
        if (i < text.length) requestAnimationFrame(tick);
        else el.textContent = text;
      };
      tick();
    }
  
    const brand = $(".brand");
    if (brand && !reduceMotion) {
      brand.classList.add("fx-scramble");
      const fixed = brand.textContent.trim();
      scramble(brand, fixed);
      brand.addEventListener("mouseenter", () => scramble(brand, fixed));
    }
  
    $$(".section-heading, .section-title").forEach((h) => {
      if (!reduceMotion) {
        const fixed = h.textContent.trim();
        h.addEventListener("mouseenter", () => scramble(h, fixed));
      }
    });
  
    // ----------------------------
    // 4) Reveal on scroll (sections, cards, images, footer)
    // ----------------------------
    const revealTargets = [
      ...$$("section"),
      ...$$(".about__left > *"),
      ...$$(".video-card"),
      ...$$(".masonry img"),
      ...$$(".footer-inner > *"),
      ...$$(".footer-bottom")
    ];
  
    revealTargets.forEach(el => el.classList.add("fx-reveal"));
  
    if (!reduceMotion && "IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  
      revealTargets.forEach(el => io.observe(el));
    } else {
      revealTargets.forEach(el => el.classList.add("is-in"));
    }
  
    // ----------------------------
    // 5) Parallax hero image (subtle)
    // ----------------------------
    const heroImg = $(".hero__img");
    if (heroImg && !reduceMotion) {
      let raf = 0;
      const onScroll = () => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          const y = window.scrollY || 0;
          heroImg.style.transform = `translateY(${Math.min(y * 0.12, 60)}px) scale(1.03)`;
        });
      };
      addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
  
    // ----------------------------
    // 6) Magnetic links (social + footer)
    // ----------------------------
    function magnetic(el, strength = 16) {
      if (!el || reduceMotion || isTouch) return;
      el.classList.add("fx-magnetic");
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${(x / r.width) * strength}px, ${(y / r.height) * strength}px)`;
      });
      el.addEventListener("mouseleave", () => (el.style.transform = "translate(0,0)"));
    }
  
    $$(".about__links a, .footer-right a").forEach(a => magnetic(a, 18));
  
    // ----------------------------
    // 7) Tilt on gallery images + video cards (desktop hover)
    // ----------------------------
    function tilt(el, max = 10) {
      if (!el || reduceMotion || isTouch) return;
      el.classList.add("fx-tilt");
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const rx = (py - 0.5) * -2 * max;
        const ry = (px - 0.5) *  2 * max;
        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
      });
      el.addEventListener("mouseleave", () => el.style.transform = "perspective(900px) rotateX(0) rotateY(0)");
    }
  
    $$(".masonry img").forEach(img => tilt(img, 8));
    $$(".video-card").forEach(card => tilt(card, 6));
  
    // ----------------------------
    // 8) Lightbox for masonry images (click to zoom)
    // ----------------------------
    const lightbox = document.createElement("div");
    lightbox.id = "fx-lightbox";
    lightbox.innerHTML = `<button class="fx-close" type="button">CLOSE ✕</button><img alt="Expanded image"/>`;
    document.body.appendChild(lightbox);
  
    const lbImg = $("img", lightbox);
    const lbClose = $(".fx-close", lightbox);
  
    function openLightbox(src, alt) {
      lbImg.src = src;
      lbImg.alt = alt || "Expanded image";
      lightbox.classList.add("is-on");
      document.documentElement.style.overflow = "hidden";
    }
    function closeLightbox() {
      lightbox.classList.remove("is-on");
      lbImg.src = "";
      document.documentElement.style.overflow = "";
    }
  
    $$(".masonry img").forEach(img => {
      img.addEventListener("click", () => openLightbox(img.getAttribute("src"), img.getAttribute("alt")));
    });
  
    lbClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
    addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });
  
    // ----------------------------
    // 9) Smooth scroll for same-page anchors (if you add them later)
    // ----------------------------
    document.addEventListener("click", (e) => {
      const a = e.target.closest?.("a[href^='#']");
      if (!a) return;
      const id = a.getAttribute("href");
      const target = id && id !== "#" ? document.querySelector(id) : null;
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  
    // ----------------------------
    // 10) Micro "glitch pulse" on hero quote when empty -> auto fill
    // ----------------------------
    const quote = $(".hero__quote");
    if (quote && quote.textContent.trim().length === 0) {
      quote.textContent = "DRIVEN TO CHANGE";
      if (!reduceMotion) {
        let t = 0;
        const base = quote.textContent;
        const pulse = () => {
          t++;
          if (t % 180 === 0) scramble(quote, base);
          requestAnimationFrame(pulse);
        };
        requestAnimationFrame(pulse);
      }
    }
  
    // ----------------------------
    // 11) Fancy hover soundless "blink" on images (safe)
    // ----------------------------
    if (!reduceMotion) {
      $$(".masonry img, .about__right img, .hero__img").forEach((img) => {
        img.addEventListener("mouseenter", () => {
          img.animate(
            [{ filter: "contrast(1.05) saturate(1)" }, { filter: "contrast(1.15) saturate(1.12)" }, { filter: "contrast(1.05) saturate(1)" }],
            { duration: 260, easing: "ease-out" }
          );
        });
      });
    }
  
    // ----------------------------
    // 12) Tiny easter egg: press G to jump to gallery
    // ----------------------------
    addEventListener("keydown", (e) => {
      if (e.target && ["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
      if (e.key.toLowerCase() === "g") {
        const gallery = $("#gallery");
        if (gallery) gallery.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      }
    });
  
  })();
  