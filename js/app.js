/* ============================================================
   Noor Date Nights — app logic
   Tabs, idea rendering, calendar, and localStorage scheduling.
   ============================================================ */

const STORE_KEY = "noorDateNights.scheduled.v1";

const HEART =
  '<svg class="heart-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-10-9.2C.4 8.4 2 5 5.3 5c2 0 3.4 1.2 4.2 2.4l.5.8.5-.8C11.3 6.2 12.7 5 14.7 5 18 5 19.6 8.4 22 11.8 19.5 16.4 12 21 12 21z"/></svg>';

function icon(paths, color) {
  return (
    '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="' +
    color +
    '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    paths +
    "</svg>"
  );
}

/* ---------- storage ---------- */
function loadScheduled() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || [];
  } catch (e) {
    return [];
  }
}
function saveScheduled(list) {
  localStorage.setItem(STORE_KEY, JSON.stringify(list));
}
let scheduled = loadScheduled();

/* ---------- date helpers ---------- */
function fmtLong(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
function fmtShort(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
function todayStr() {
  const n = new Date();
  return (
    n.getFullYear() +
    "-" +
    String(n.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(n.getDate()).padStart(2, "0")
  );
}

/* ---------- tabs ---------- */
const views = {
  ideas: document.getElementById("view-ideas"),
  summer: document.getElementById("view-summer"),
  calendar: document.getElementById("view-calendar"),
};
function switchTab(name) {
  Object.keys(views).forEach((k) => {
    views[k].hidden = k !== name;
  });
  document.querySelectorAll(".tab").forEach((t) => {
    const active = t.dataset.tab === name;
    t.classList.toggle("active", active);
    t.setAttribute("aria-selected", active ? "true" : "false");
  });
  if (name === "calendar") renderCalendar();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
document.querySelectorAll(".tab, [data-goto]").forEach((el) => {
  el.addEventListener("click", () =>
    switchTab(el.dataset.tab || el.dataset.goto)
  );
});

/* ---------- idea cards ---------- */
function ideaCard(idea) {
  const cat = CATEGORIES[idea.category];
  const dated = idea.eventDate
    ? '<div class="meta-row" style="color:var(--cta)">' +
      icon(CATEGORIES.events.icon, "var(--cta)") +
      "<span>" +
      fmtLong(idea.eventDate) +
      "</span></div>"
    : "";
  return (
    '<article class="clay idea-card">' +
    '<div class="flex items-center justify-between mb-2">' +
    '<span class="badge" style="background:' +
    cat.soft +
    ";color:" +
    cat.accent +
    '">' +
    icon(cat.icon, cat.accent) +
    cat.label +
    "</span>" +
    "</div>" +
    '<h3 class="font-ui" style="font-weight:700;font-size:1.18rem;color:var(--text);margin:.2rem 0 .5rem">' +
    idea.title +
    "</h3>" +
    '<p style="margin:0 0 .9rem;color:var(--text);font-size:1.02rem">' +
    idea.blurb +
    "</p>" +
    '<div class="mt-auto space-y-1">' +
    '<div class="meta-row">' +
    icon(
      '<path d="M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10z"/><circle cx="12" cy="11" r="2"/>',
      "var(--text-soft)"
    ) +
    "<span>" +
    idea.where +
    "</span></div>" +
    '<div class="meta-row">' +
    icon(
      '<rect x="3" y="6" width="18" height="11" rx="2"/><path d="M3 11h18M7 17v2M17 17v2"/>',
      "var(--text-soft)"
    ) +
    "<span>" +
    idea.transit +
    "</span></div>" +
    dated +
    "</div>" +
    '<div class="flex items-center gap-2 mt-4">' +
    '<button class="btn btn-primary add-btn" data-id="' +
    idea.id +
    '" style="flex:1;justify-content:center">' +
    HEART +
    "Add to calendar</button>" +
    '<a class="btn btn-ghost" href="' +
    idea.source +
    '" target="_blank" rel="noopener" aria-label="Learn more about ' +
    idea.title.replace(/"/g, "") +
    '">Info</a>' +
    "</div>" +
    "</article>"
  );
}

function renderIdeas(filter) {
  const grid = document.getElementById("ideas-grid");
  const list = IDEAS.filter(
    (i) => filter === "all" || i.category === filter
  );
  grid.innerHTML = list.map(ideaCard).join("");
  bindAddButtons(grid);
}

function renderSummer() {
  const grid = document.getElementById("summer-grid");
  const list = IDEAS.filter((i) => i.season === "summer");
  grid.innerHTML = list.map(ideaCard).join("");
  bindAddButtons(grid);
}

/* ---------- filters ---------- */
document.querySelectorAll("#filter-bar .pill").forEach((p) => {
  p.addEventListener("click", () => {
    document
      .querySelectorAll("#filter-bar .pill")
      .forEach((x) => x.classList.remove("active"));
    p.classList.add("active");
    renderIdeas(p.dataset.filter);
  });
});

/* ---------- add-to-calendar modal ---------- */
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const dateInput = document.getElementById("date-input");
const noteInput = document.getElementById("note-input");
let pendingIdeaId = null;

function bindAddButtons(scope) {
  scope.querySelectorAll(".add-btn").forEach((b) => {
    b.addEventListener("click", () => openModal(b.dataset.id));
  });
}

function openModal(ideaId) {
  const idea = IDEAS.find((i) => i.id === ideaId);
  pendingIdeaId = ideaId;
  modalTitle.textContent = idea.title;
  dateInput.value = idea.eventDate || SEASON_START;
  noteInput.value = "";
  modal.hidden = false;
  setTimeout(() => dateInput.focus(), 50);
}
function closeModal() {
  modal.hidden = true;
  pendingIdeaId = null;
}
document.getElementById("modal-cancel").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.hidden) closeModal();
});

document.getElementById("modal-save").addEventListener("click", () => {
  if (!pendingIdeaId || !dateInput.value) return;
  const idea = IDEAS.find((i) => i.id === pendingIdeaId);
  scheduled.push({
    uid: Date.now() + "-" + Math.random().toString(36).slice(2, 7),
    ideaId: idea.id,
    title: idea.title,
    category: idea.category,
    date: dateInput.value,
    note: noteInput.value.trim(),
  });
  saveScheduled(scheduled);
  closeModal();
  toast("Added " + idea.title + " to " + fmtShort(dateInput.value));
  updateBadge();
});

/* ---------- toast ---------- */
let toastTimer;
function toast(msg) {
  const t = document.getElementById("toast");
  t.querySelector("span").textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}

/* ---------- calendar ---------- */
let calYear = 2026;
let calMonth = 6; // 0-indexed → July 2026 (the heart of the window)

function eventsOn(dateStr) {
  return scheduled.filter((s) => s.date === dateStr);
}

function renderCalendar() {
  const monthLabel = document.getElementById("cal-month-label");
  const grid = document.getElementById("cal-grid");
  const first = new Date(calYear, calMonth, 1);
  const startDow = first.getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();

  monthLabel.textContent = first.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const dows = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let html = dows.map((d) => '<div class="cal-dow">' + d + "</div>").join("");

  for (let i = 0; i < startDow; i++) {
    html += '<div class="cal-cell empty"></div>';
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const ds =
      calYear +
      "-" +
      String(calMonth + 1).padStart(2, "0") +
      "-" +
      String(day).padStart(2, "0");
    const evs = eventsOn(ds);
    const cls =
      "cal-cell" +
      (evs.length ? " has-events" : "") +
      (ds === todayStr() ? " today" : "");
    const dots = evs.length
      ? '<div class="cal-dot-row">' +
        evs
          .slice(0, 4)
          .map(
            (e) =>
              '<span class="cal-dot" style="background:' +
              CATEGORIES[e.category].accent +
              '"></span>'
          )
          .join("") +
        "</div>"
      : "";
    html +=
      '<button class="' +
      cls +
      '" data-date="' +
      ds +
      '" aria-label="' +
      day +
      (evs.length ? ", " + evs.length + " planned" : "") +
      '"><span class="day-num">' +
      day +
      "</span>" +
      dots +
      "</button>";
  }
  grid.innerHTML = html;
  grid.querySelectorAll(".cal-cell:not(.empty)").forEach((c) => {
    c.addEventListener("click", () => showDay(c.dataset.date));
  });

  renderUpcoming();
}

function showDay(dateStr) {
  const panel = document.getElementById("day-panel");
  const evs = eventsOn(dateStr).sort((a, b) => a.title.localeCompare(b.title));
  let html =
    '<h3 class="font-ui" style="font-weight:700;font-size:1.1rem;color:var(--primary);margin:0 0 .8rem">' +
    fmtLong(dateStr) +
    "</h3>";
  if (!evs.length) {
    html +=
      '<p style="color:var(--text-soft);margin:0">Nothing planned yet — pick a date idea to fill this day. 💗</p>';
  } else {
    html += evs.map(plannedRow).join("");
  }
  panel.innerHTML = html;
  bindRemoveButtons(panel);
}

function plannedRow(ev) {
  const cat = CATEGORIES[ev.category];
  return (
    '<div class="clay-soft" style="padding:.8rem 1rem;margin-bottom:.7rem;display:flex;align-items:flex-start;gap:.7rem">' +
    '<span class="badge" style="background:#fff;color:' +
    cat.accent +
    ';flex-shrink:0">' +
    icon(cat.icon, cat.accent) +
    cat.label +
    "</span>" +
    '<div style="flex:1">' +
    '<div class="font-ui" style="font-weight:700;color:var(--text)">' +
    ev.title +
    "</div>" +
    (ev.note
      ? '<div style="font-size:.95rem;color:var(--text-soft)">' +
        ev.note +
        "</div>"
      : "") +
    "</div>" +
    '<button class="remove-btn" data-uid="' +
    ev.uid +
    '" aria-label="Remove ' +
    ev.title.replace(/"/g, "") +
    '" style="border:none;background:transparent;cursor:pointer;color:var(--text-soft);font-family:Quicksand;font-weight:700">✕</button>' +
    "</div>"
  );
}

function renderUpcoming() {
  const wrap = document.getElementById("upcoming-list");
  const sorted = [...scheduled].sort((a, b) => a.date.localeCompare(b.date));
  if (!sorted.length) {
    wrap.innerHTML =
      '<div class="empty-state"><p style="font-size:1.1rem">No dates planned yet.</p>' +
      '<p>Head to <button class="link-btn" data-goto="ideas">Date Ideas</button> and start filling the calendar. 💕</p></div>';
    wrap.querySelectorAll("[data-goto]").forEach((b) =>
      b.addEventListener("click", () => switchTab(b.dataset.goto))
    );
    return;
  }
  wrap.innerHTML = sorted
    .map((ev) => {
      const cat = CATEGORIES[ev.category];
      return (
        '<div class="clay" style="padding:.9rem 1.1rem;display:flex;align-items:center;gap:1rem;margin-bottom:.7rem">' +
        '<div style="text-align:center;flex-shrink:0;width:54px">' +
        '<div class="font-ui" style="font-weight:700;color:var(--primary);font-size:1.4rem;line-height:1">' +
        new Date(ev.date + "T00:00").getDate() +
        "</div>" +
        '<div class="font-ui" style="font-size:.75rem;color:var(--text-soft);text-transform:uppercase">' +
        new Date(ev.date + "T00:00").toLocaleDateString("en-US", {
          month: "short",
        }) +
        "</div></div>" +
        '<div style="flex:1">' +
        '<div class="font-ui" style="font-weight:700;color:var(--text)">' +
        ev.title +
        "</div>" +
        '<div class="meta-row">' +
        icon(cat.icon, cat.accent) +
        cat.label +
        (ev.note ? " · " + ev.note : "") +
        "</div></div>" +
        '<button class="remove-btn" data-uid="' +
        ev.uid +
        '" aria-label="Remove ' +
        ev.title.replace(/"/g, "") +
        '" style="border:none;background:transparent;cursor:pointer;color:var(--text-soft);font-family:Quicksand;font-weight:700;font-size:1.1rem">✕</button>' +
        "</div>"
      );
    })
    .join("");
  bindRemoveButtons(wrap);
}

function bindRemoveButtons(scope) {
  scope.querySelectorAll(".remove-btn").forEach((b) => {
    b.addEventListener("click", () => {
      scheduled = scheduled.filter((s) => s.uid !== b.dataset.uid);
      saveScheduled(scheduled);
      renderCalendar();
      updateBadge();
      toast("Removed from your calendar");
    });
  });
}

document.getElementById("cal-prev").addEventListener("click", () => {
  calMonth--;
  if (calMonth < 0) {
    calMonth = 11;
    calYear--;
  }
  renderCalendar();
});
document.getElementById("cal-next").addEventListener("click", () => {
  calMonth++;
  if (calMonth > 11) {
    calMonth = 0;
    calYear++;
  }
  renderCalendar();
});

/* ---------- planned count badge ---------- */
function updateBadge() {
  const b = document.getElementById("plan-count");
  const n = scheduled.length;
  b.textContent = n;
  b.style.display = n ? "inline-flex" : "none";
}

/* ---------- surprise me ---------- */
document.getElementById("surprise-btn").addEventListener("click", () => {
  const pick = IDEAS[Math.floor(Math.random() * IDEAS.length)];
  switchTab("ideas");
  openModal(pick.id);
});

/* ---------- init ---------- */
renderIdeas("all");
renderSummer();
updateBadge();
switchTab("ideas");
