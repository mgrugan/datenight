/* ============================================================
   Noor Date Nights — app logic
   ============================================================ */

const STORE_KEY = "noorDateNights.scheduled.v2";
const ALL_ITEMS = [...IDEAS, ...RESTAURANTS, ...EVENTS];
const byId = (id) => ALL_ITEMS.find((x) => x.id === id);

/* ---- small inline icons (Lucide-style, 16px) ---- */
const I = {
  pin: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10z"/><circle cx="12" cy="11" r="2"/></svg>',
  bus: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="16" height="11" rx="2"/><path d="M4 11h16M8 16v2M16 16v2"/></svg>',
  arrow:
    '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>',
  plus: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
};
const esc = (s) => String(s).replace(/"/g, "&quot;");

/* ---- storage ---- */
function load() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || [];
  } catch (e) {
    return [];
  }
}
function save() {
  localStorage.setItem(STORE_KEY, JSON.stringify(scheduled));
}
let scheduled = load();

/* ---- date helpers ---- */
function fmtLong(ds) {
  const [y, m, d] = ds.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
function fmtShort(ds) {
  const [y, m, d] = ds.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
function todayStr() {
  const n = new Date();
  return [
    n.getFullYear(),
    String(n.getMonth() + 1).padStart(2, "0"),
    String(n.getDate()).padStart(2, "0"),
  ].join("-");
}

/* ---- tabs ---- */
const views = {
  ideas: document.getElementById("view-ideas"),
  events: document.getElementById("view-events"),
  calendar: document.getElementById("view-calendar"),
};
function switchTab(name) {
  Object.keys(views).forEach((k) => (views[k].hidden = k !== name));
  document.querySelectorAll(".tab").forEach((t) => {
    const on = t.dataset.tab === name;
    t.classList.toggle("active", on);
    t.setAttribute("aria-selected", on ? "true" : "false");
  });
  if (name === "calendar") renderCalendar();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-tab],[data-goto]");
  if (el) switchTab(el.dataset.tab || el.dataset.goto);
});

/* ---- category tag ---- */
function catTag(catKey) {
  const c = CATEGORIES[catKey];
  return (
    '<span class="cat-tag"><span class="cat-dot" style="background:' +
    c.accent +
    '"></span>' +
    c.label +
    "</span>"
  );
}

/* ---- idea / restaurant card ---- */
function card(item) {
  const isResto = item.category === "dinner";
  const transit = item.transit
    ? '<div class="meta">' + I.bus + "<span>" + item.transit + "</span></div>"
    : "";
  const budget = item.budget
    ? '<div class="budget"><b>~$80 plan:</b> ' + item.budget + "</div>"
    : "";
  return (
    '<article class="card">' +
    catTag(item.category) +
    "<h3>" +
    item.title +
    "</h3>" +
    '<p class="blurb">' +
    item.blurb +
    "</p>" +
    '<div class="meta">' +
    I.pin +
    "<span>" +
    item.where +
    "</span></div>" +
    transit +
    budget +
    '<div class="card-foot">' +
    '<button class="btn btn-primary btn-sm add-btn" data-id="' +
    item.id +
    '" style="flex:1">' +
    I.plus +
    (isResto ? "Plan this dinner" : "Add to calendar") +
    "</button>" +
    '<a class="text-link" href="' +
    item.link +
    '" target="_blank" rel="noopener">' +
    (item.linkLabel || "Details") +
    I.arrow +
    "</a>" +
    "</div>" +
    "</article>"
  );
}

function renderIdeas(filter) {
  const grid = document.getElementById("ideas-grid");
  const items = [...IDEAS, ...RESTAURANTS].filter(
    (i) => filter === "all" || i.category === filter
  );
  grid.innerHTML = items.map(card).join("");
}

/* ---- events list ---- */
function eventRow(ev) {
  return (
    '<div class="event-row">' +
    '<div class="event-date"><div class="d-label">' +
    ev.dateLabel +
    "</div>" +
    (ev.time ? '<div class="d-time">' + ev.time + "</div>" : "") +
    "</div>" +
    '<div class="event-main">' +
    catTag(ev.category) +
    "<h3>" +
    ev.title +
    "</h3>" +
    '<p class="blurb">' +
    ev.blurb +
    "</p>" +
    '<div class="meta">' +
    I.pin +
    "<span>" +
    ev.where +
    "</span></div></div>" +
    '<div class="event-actions">' +
    '<button class="btn btn-primary btn-sm add-btn" data-id="' +
    ev.id +
    '">' +
    I.plus +
    "Add</button>" +
    '<a class="text-link" href="' +
    ev.link +
    '" target="_blank" rel="noopener">' +
    (ev.linkLabel || "Details") +
    I.arrow +
    "</a></div>" +
    "</div>"
  );
}
function renderEvents() {
  document.getElementById("events-list").innerHTML = EVENTS.map(eventRow).join("");
}

/* ---- filters ---- */
document.querySelectorAll("#filter-bar .pill").forEach((p) => {
  p.addEventListener("click", () => {
    document
      .querySelectorAll("#filter-bar .pill")
      .forEach((x) => x.classList.remove("active"));
    p.classList.add("active");
    renderIdeas(p.dataset.filter);
  });
});

/* ---- add-to-calendar modal ---- */
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const dateInput = document.getElementById("date-input");
const noteInput = document.getElementById("note-input");
let pendingId = null;

document.addEventListener("click", (e) => {
  const b = e.target.closest(".add-btn");
  if (b) openModal(b.dataset.id);
});
function openModal(id) {
  const item = byId(id);
  if (!item) return;
  pendingId = id;
  modalTitle.textContent = item.title;
  dateInput.value = item.date || DEFAULT_DATE;
  noteInput.value = "";
  modal.hidden = false;
  setTimeout(() => dateInput.focus(), 40);
}
function closeModal() {
  modal.hidden = true;
  pendingId = null;
}
document.getElementById("modal-cancel").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.hidden) closeModal();
});
document.getElementById("modal-save").addEventListener("click", () => {
  if (!pendingId || !dateInput.value) return;
  const item = byId(pendingId);
  scheduled.push({
    uid: Date.now() + "-" + Math.random().toString(36).slice(2, 7),
    itemId: item.id,
    title: item.title,
    category: item.category,
    date: dateInput.value,
    note: noteInput.value.trim(),
  });
  save();
  closeModal();
  toast("Saved — " + item.title + " on " + fmtShort(dateInput.value));
  updateChip();
});

/* ---- toast ---- */
let toastTimer;
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}

/* ---- calendar ---- */
let calYear = 2026;
let calMonth = 6; // July 2026
const eventsOn = (ds) => scheduled.filter((s) => s.date === ds);

function renderCalendar() {
  const grid = document.getElementById("cal-grid");
  const first = new Date(calYear, calMonth, 1);
  const startDow = first.getDay();
  const days = new Date(calYear, calMonth + 1, 0).getDate();
  document.getElementById("cal-month-label").textContent =
    first.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  let html = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    .map((d) => '<div class="cal-dow">' + d + "</div>")
    .join("");
  for (let i = 0; i < startDow; i++) html += '<div class="cal-cell empty"></div>';
  for (let day = 1; day <= days; day++) {
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
    let chips = evs
      .slice(0, 2)
      .map((e) => '<span class="cal-evt">' + e.title + "</span>")
      .join("");
    if (evs.length > 2)
      chips += '<span class="cal-more">+' + (evs.length - 2) + " more</span>";
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
      chips +
      "</button>";
  }
  grid.innerHTML = html;
  grid.querySelectorAll(".cal-cell:not(.empty)").forEach((c) =>
    c.addEventListener("click", () => showDay(c.dataset.date))
  );
  renderUpcoming();
}

function showDay(ds) {
  const panel = document.getElementById("day-panel");
  const evs = eventsOn(ds).sort((a, b) => a.title.localeCompare(b.title));
  let html = "<h3>" + fmtLong(ds) + "</h3>";
  if (!evs.length) {
    html +=
      '<p style="color:var(--muted);margin:0">Nothing planned for this day yet.</p>';
  } else {
    html += evs.map(planRow).join("");
  }
  panel.innerHTML = html;
  bindRemoves(panel);
}

function planRow(ev) {
  return (
    '<div class="plan-item">' +
    '<div class="plan-body"><div class="t">' +
    catTag(ev.category) +
    "</div><div class=\"t\" style=\"margin-top:.3rem\">" +
    ev.title +
    "</div>" +
    (ev.note ? '<div class="n">' + ev.note + "</div>" : "") +
    "</div>" +
    '<button class="remove-x" data-uid="' +
    ev.uid +
    '" aria-label="Remove ' +
    esc(ev.title) +
    '">✕</button>' +
    "</div>"
  );
}

function renderUpcoming() {
  const wrap = document.getElementById("upcoming-list");
  const sorted = [...scheduled].sort((a, b) => a.date.localeCompare(b.date));
  if (!sorted.length) {
    wrap.innerHTML =
      '<div class="empty-state"><p>No dates planned yet.</p><p>Browse <button class="link-btn" data-goto="ideas">Date Ideas</button> or <button class="link-btn" data-goto="events">July Events</button> to start filling the calendar.</p></div>';
    return;
  }
  wrap.innerHTML = sorted
    .map((ev) => {
      const dt = new Date(ev.date + "T00:00");
      return (
        '<div class="plan-item">' +
        '<div class="plan-when"><div class="dd">' +
        dt.getDate() +
        '</div><div class="mm">' +
        dt.toLocaleDateString("en-US", { month: "short" }) +
        "</div></div>" +
        '<div class="plan-body"><div class="t">' +
        ev.title +
        "</div><div class=\"n\">" +
        CATEGORIES[ev.category].label +
        (ev.note ? " · " + ev.note : "") +
        "</div></div>" +
        '<button class="remove-x" data-uid="' +
        ev.uid +
        '" aria-label="Remove ' +
        esc(ev.title) +
        '">✕</button>' +
        "</div>"
      );
    })
    .join("");
  bindRemoves(wrap);
}

function bindRemoves(scope) {
  scope.querySelectorAll(".remove-x").forEach((b) =>
    b.addEventListener("click", () => {
      scheduled = scheduled.filter((s) => s.uid !== b.dataset.uid);
      save();
      renderCalendar();
      updateChip();
      toast("Removed from your calendar");
    })
  );
}

document.getElementById("cal-prev").addEventListener("click", () => {
  if (--calMonth < 0) {
    calMonth = 11;
    calYear--;
  }
  renderCalendar();
});
document.getElementById("cal-next").addEventListener("click", () => {
  if (++calMonth > 11) {
    calMonth = 0;
    calYear++;
  }
  renderCalendar();
});

/* ---- planned-count chip ---- */
function updateChip() {
  const c = document.getElementById("plan-count");
  c.textContent = scheduled.length;
  c.style.display = scheduled.length ? "inline-flex" : "none";
}

/* ---- surprise me ---- */
document.getElementById("surprise-btn").addEventListener("click", () => {
  const pool = [...IDEAS, ...RESTAURANTS, ...EVENTS];
  const pick = pool[Math.floor(Math.random() * pool.length)];
  switchTab(pick.kind === "event" ? "events" : "ideas");
  openModal(pick.id);
});

/* ---- init ---- */
renderIdeas("all");
renderEvents();
updateChip();
switchTab("ideas");
