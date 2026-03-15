(() => {
  "use strict";

  // --- State ---
  let currentSlide = 0;
  let sidebarOpen = false;
  let scriptVisible = false;
  let jumpBuffer = "";
  let jumpTimer = null;

  const P = PRESENTATION;
  const slides = P.slides;
  const agenda = P.agenda;

  // --- DOM refs ---
  const slideContainer = document.getElementById("slide-container");
  const statusAgenda = document.getElementById("status-agenda");
  const statusTime = document.getElementById("status-time");
  const statusNum = document.getElementById("status-num");
  const statusPercent = document.getElementById("status-percent");
  const statusProgress = document.getElementById("status-progress");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const sidebarList = document.getElementById("sidebar-list");
  const scriptPanel = document.getElementById("script-panel");
  const scriptText = document.getElementById("script-text");
  const hoverZone = document.getElementById("hover-zone");

  // --- Init ---
  function init() {
    applyColors();
    buildSidebar();
    bindEvents();
    const hash = parseInt(location.hash.replace("#", ""), 10);
    if (hash >= 1 && hash <= slides.length) {
      currentSlide = hash - 1;
    }
    render();
  }

  function applyColors() {
    const c = P.colors;
    const r = document.documentElement.style;
    r.setProperty("--color-base", c.base);
    r.setProperty("--color-main", c.main);
    r.setProperty("--color-accent", c.accent);
    r.setProperty("--color-cyan", c.cyan);
    r.setProperty("--color-yellow", c.yellow);
    r.setProperty("--color-white", c.white);
    r.setProperty("--color-grey", c.grey);
  }

  // --- Sidebar ---
  function buildSidebar() {
    sidebarList.innerHTML = "";
    const benefitLink = document.createElement("a");
    benefitLink.className = "sidebar-benefit-link";
    benefitLink.href = "tokuten/index.html";
    benefitLink.target = "_blank";
    benefitLink.rel = "noopener";
    benefitLink.textContent = "参加特典を開く";
    sidebarList.appendChild(benefitLink);

    agenda.forEach((a) => {
      const section = document.createElement("div");
      section.className = "sidebar-section";
      const header = document.createElement("div");
      header.className = "sidebar-section-header";
      header.innerHTML = `<span class="sidebar-label">${a.label}</span><span class="sidebar-time">${a.time}</span>`;
      section.appendChild(header);

      slides.forEach((s, i) => {
        if (s.agendaId !== a.id) return;
        const item = document.createElement("div");
        item.className = "sidebar-item";
        item.dataset.index = i;
        const title = (s.navLabel || s.headline || `Slide ${i + 1}`)
          .replace(/\n/g, " ")
          .substring(0, 30);
        item.textContent = `${i + 1}. ${title}`;
        item.addEventListener("click", () => {
          goTo(i);
          closeSidebar();
        });
        section.appendChild(item);
      });

      sidebarList.appendChild(section);
    });
  }

  function openSidebar() {
    sidebarOpen = true;
    sidebar.classList.add("open");
    overlay.classList.add("visible");
    updateSidebarHighlight();
  }

  function closeSidebar() {
    sidebarOpen = false;
    sidebar.classList.remove("open");
    overlay.classList.remove("visible");
  }

  function updateSidebarHighlight() {
    sidebarList.querySelectorAll(".sidebar-item").forEach((el) => {
      el.classList.toggle("active", parseInt(el.dataset.index) === currentSlide);
    });
  }

  // --- Navigation ---
  function next() { if (currentSlide < slides.length - 1) goTo(currentSlide + 1); }
  function prev() { if (currentSlide > 0) goTo(currentSlide - 1); }
  function goTo(i) {
    currentSlide = Math.max(0, Math.min(slides.length - 1, i));
    render();
  }

  function bindEvents() {
    document.getElementById("menu-btn").addEventListener("click", () => {
      sidebarOpen ? closeSidebar() : openSidebar();
    });

    overlay.addEventListener("click", (e) => {
      if (!e.target.closest(".sidebar")) closeSidebar();
    });

    document.addEventListener("keydown", (e) => {
      if (sidebarOpen && e.key === "Escape") { closeSidebar(); return; }
      switch (e.key) {
        case "ArrowRight": case " ": e.preventDefault(); next(); break;
        case "ArrowLeft": case "Backspace": e.preventDefault(); prev(); break;
        case "Home": e.preventDefault(); goTo(0); break;
        case "End": e.preventDefault(); goTo(slides.length - 1); break;
        case "Enter":
          if (jumpBuffer) {
            e.preventDefault();
            goTo(parseInt(jumpBuffer, 10) - 1);
            jumpBuffer = "";
            clearTimeout(jumpTimer);
          }
          break;
        default:
          if (/^\d$/.test(e.key)) {
            jumpBuffer += e.key;
            clearTimeout(jumpTimer);
            jumpTimer = setTimeout(() => { jumpBuffer = ""; }, 1500);
          }
      }
    });

    slideContainer.addEventListener("click", (e) => {
      if (sidebarOpen) return;
      const rect = slideContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      x > rect.width / 2 ? next() : prev();
    });

    hoverZone.addEventListener("mouseenter", showScript);
    scriptPanel.addEventListener("mouseenter", () => { scriptVisible = true; });
    scriptPanel.addEventListener("mouseleave", hideScript);
    hoverZone.addEventListener("mouseleave", (e) => {
      if (!scriptPanel.contains(e.relatedTarget)) hideScript();
    });
  }

  function showScript() {
    const s = slides[currentSlide];
    if (!s.notes) return;
    scriptText.textContent = s.notes;
    scriptPanel.classList.add("visible");
    scriptVisible = true;
  }

  function hideScript() {
    scriptPanel.classList.remove("visible");
    scriptVisible = false;
  }

  // --- Render ---
  function render() {
    location.hash = currentSlide + 1;
    const s = slides[currentSlide];
    const a = agenda.find((x) => x.id === s.agendaId);
    const progress = ((currentSlide + 1) / slides.length) * 100;

    statusAgenda.textContent = a ? a.label : "";
    statusTime.textContent = a ? a.time : "";
    statusNum.textContent = `${currentSlide + 1}/${slides.length}`;
    statusPercent.textContent = `${Math.round(progress)}%`;
    statusProgress.style.width = `${progress}%`;

    const oldEl = slideContainer.querySelector(".slide");
    const el = renderSlide(s);
    el.style.opacity = "0";
    slideContainer.appendChild(el);

    requestAnimationFrame(() => {
      el.style.opacity = "1";
      if (oldEl) {
        oldEl.style.opacity = "0";
        oldEl.addEventListener("transitionend", () => oldEl.remove(), { once: true });
        setTimeout(() => oldEl.remove(), 250);
      }
    });

    if (sidebarOpen) updateSidebarHighlight();
    if (scriptVisible) {
      if (s.notes) { scriptText.textContent = s.notes; }
      else { hideScript(); }
    }
  }

  function renderSlide(s) {
    const wrap = document.createElement("div");
    wrap.className = `slide layout-${s.layout}`;
    if (s.style) wrap.classList.add(`style-${s.style}`);
    wrap.dataset.section = s.agendaId;

    switch (s.layout) {
      case "center":    renderCenter(wrap, s); break;
      case "section":   renderSection(wrap, s); break;
      case "top-bottom": renderTopBottom(wrap, s); break;
      case "split-2":   renderSplit2(wrap, s); break;
      case "split-3":   renderSplit3(wrap, s); break;
      case "left-right": renderLeftRight(wrap, s); break;
      case "quote":     renderQuote(wrap, s); break;
      case "raw":       renderRaw(wrap, s); break;
      case "full-image": renderFullImage(wrap, s); break;
      default:          renderCenter(wrap, s); break;
    }
    return wrap;
  }

  // --- Layout renderers ---

  function renderCenter(el, s) {
    const inner = document.createElement("div");
    inner.className = "center-inner";
    if (s.headline) {
      const h = document.createElement("h1");
      h.className = "slide-h1";
      h.innerHTML = nl2br(s.headline);
      inner.appendChild(h);
    }
    if (s.body) {
      const p = document.createElement("p");
      p.className = "slide-body";
      p.innerHTML = nl2br(s.body);
      inner.appendChild(p);
    }
    el.appendChild(inner);
  }

  function renderSection(el, s) {
    const inner = document.createElement("div");
    inner.className = "section-inner";
    if (s.headline) {
      const h = document.createElement("h1");
      h.className = "slide-section-title";
      h.innerHTML = nl2br(s.headline);
      inner.appendChild(h);
    }
    if (s.body) {
      const p = document.createElement("p");
      p.className = "slide-section-sub";
      p.innerHTML = nl2br(s.body);
      inner.appendChild(p);
    }
    el.appendChild(inner);
  }

  function renderTopBottom(el, s) {
    const inner = document.createElement("div");
    inner.className = "top-bottom-inner";
    if (s.headline) {
      const h = document.createElement("h2");
      h.className = "slide-h2";
      h.innerHTML = nl2br(s.headline);
      inner.appendChild(h);
    }
    if (s.items) {
      const list = document.createElement("div");
      list.className = "item-list";
      s.items.forEach((item) => {
        const row = document.createElement("div");
        row.className = "item-row";
        const num = document.createElement("span");
        num.className = "item-num";
        num.style.color = colorVar(item.color);
        num.textContent = item.num;
        const text = document.createElement("span");
        text.className = "item-text";
        text.innerHTML = nl2br(item.text);
        row.appendChild(num);
        row.appendChild(text);
        list.appendChild(row);
      });
      inner.appendChild(list);
    }
    el.appendChild(inner);
  }

  function renderSplit2(el, s) {
    const inner = document.createElement("div");
    inner.className = "split2-inner";
    if (s.headline) {
      const h = document.createElement("h2");
      h.className = "slide-h2 split2-headline";
      h.innerHTML = nl2br(s.headline);
      inner.appendChild(h);
    }
    const cols = document.createElement("div");
    cols.className = "split2-cols";
    if (s.left) cols.appendChild(renderSplitCol(s.left));
    if (s.right) cols.appendChild(renderSplitCol(s.right));
    inner.appendChild(cols);
    el.appendChild(inner);
  }

  function renderSplitCol(data) {
    const col = document.createElement("div");
    col.className = "split-col";
    col.style.borderColor = colorVar(data.color);
    const title = document.createElement("div");
    title.className = "split-col-title";
    title.style.color = colorVar(data.color);
    title.textContent = data.title;
    col.appendChild(title);
    if (data.items) {
      const ul = document.createElement("ul");
      ul.className = "split-col-list";
      data.items.forEach((t) => {
        const li = document.createElement("li");
        li.textContent = t;
        ul.appendChild(li);
      });
      col.appendChild(ul);
    }
    return col;
  }

  function renderSplit3(el, s) {
    const inner = document.createElement("div");
    inner.className = "split3-inner";
    if (s.headline) {
      const h = document.createElement("h2");
      h.className = "slide-h2 split3-headline";
      h.innerHTML = nl2br(s.headline);
      inner.appendChild(h);
    }
    const cols = document.createElement("div");
    cols.className = "split3-cols";
    if (s.columns) {
      s.columns.forEach((c) => {
        const card = document.createElement("div");
        card.className = "split3-card";
        card.style.borderColor = colorVar(c.color);
        const label = document.createElement("div");
        label.className = "split3-label";
        label.style.backgroundColor = colorVar(c.color);
        label.textContent = c.label;
        const title = document.createElement("div");
        title.className = "split3-title";
        title.textContent = c.title;
        const desc = document.createElement("div");
        desc.className = "split3-desc";
        desc.innerHTML = nl2br(c.desc);
        card.appendChild(label);
        card.appendChild(title);
        card.appendChild(desc);
        cols.appendChild(card);
      });
    }
    inner.appendChild(cols);
    el.appendChild(inner);
  }

  function renderLeftRight(el, s) {
    const inner = document.createElement("div");
    inner.className = "leftright-inner";
    if (s.headline) {
      const h = document.createElement("h2");
      h.className = "slide-h2";
      h.innerHTML = nl2br(s.headline);
      inner.appendChild(h);
    }
    const cols = document.createElement("div");
    cols.className = "leftright-cols";
    const left = document.createElement("div");
    left.className = "leftright-text";
    left.innerHTML = nl2br(s.leftContent || "");
    const right = document.createElement("div");
    right.className = "leftright-accent";
    right.innerHTML = nl2br(s.rightContent || "");
    cols.appendChild(left);
    cols.appendChild(right);
    inner.appendChild(cols);
    el.appendChild(inner);
  }

  function renderQuote(el, s) {
    const inner = document.createElement("div");
    inner.className = "quote-inner";
    if (s.headline) {
      const q = document.createElement("blockquote");
      q.className = "slide-quote";
      q.innerHTML = nl2br(s.headline);
      inner.appendChild(q);
    }
    if (s.body) {
      const cite = document.createElement("p");
      cite.className = "slide-cite";
      cite.innerHTML = nl2br(s.body);
      inner.appendChild(cite);
    }
    el.appendChild(inner);
  }

  function renderRaw(el, s) {
    const inner = document.createElement("div");
    inner.className = "raw-slide";
    inner.innerHTML = s.html || "";
    el.appendChild(inner);
  }

  function renderFullImage(el, s) {
    el.style.padding = "0";
    el.style.backgroundColor = "#000";
    if (s.image) {
      el.style.backgroundImage = `url(${s.image})`;
      el.style.backgroundSize = "100% 100%";
      el.style.backgroundPosition = "center";
      el.style.backgroundRepeat = "no-repeat";
    }
    if (s.headline) {
      const h = document.createElement("h1");
      h.className = "slide-h1 fullimage-text";
      h.innerHTML = nl2br(s.headline);
      el.appendChild(h);
    }
  }

  // --- Helpers ---
  function nl2br(str) { return str ? str.replace(/\n/g, "<br>") : ""; }

  function colorVar(name) {
    const map = {
      accent: "var(--color-accent)",
      cyan:   "var(--color-cyan)",
      yellow: "var(--color-yellow)",
      grey:   "var(--color-grey)",
      main:   "var(--color-main)",
      white:  "var(--color-white)"
    };
    return map[name] || map.main;
  }

  // --- Start ---
  init();
})();
