const STORAGE_KEY = "family-command-center-v4-3";
const CLOUD_FAMILY_ID_KEY = "family-command-center-cloud-family-id-v4-3";
const LEGACY_CLOUD_FAMILY_ID_KEYS = [
  "family-command-center-cloud-family-id-v4-2",
  "family-command-center-cloud-family-id-v4-1",
  "family-command-center-cloud-family-id-v4",
  "family-command-center-cloud-family-id"
];
const FIREBASE_SDK_VERSION = "12.13.0";

function uid() {
  return crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random());
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function dateFromIso(iso) {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function isoFromDate(date) {
  return date.toISOString().slice(0, 10);
}

function addDays(value, days) {
  const d = value instanceof Date ? new Date(value) : dateFromIso(value) || new Date();
  d.setDate(d.getDate() + days);
  return isoFromDate(d);
}

function daysBetween(fromIso, toIso) {
  const from = dateFromIso(fromIso);
  const to = dateFromIso(toIso);
  if (!from || !to) return 9999;
  return Math.round((to - from) / 86400000);
}

function firstDayOfMonth() {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1).toISOString().slice(0, 10);
}

function lastDayOfMonth() {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).toISOString().slice(0, 10);
}

function firstDayOfYear() {
  const d = new Date();
  return new Date(d.getFullYear(), 0, 1).toISOString().slice(0, 10);
}

function lastDayOfYear() {
  const d = new Date();
  return new Date(d.getFullYear(), 11, 31).toISOString().slice(0, 10);
}

function formatDate(iso) {
  if (!iso) return "No date";
  const date = dateFromIso(iso);
  return date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

function formatTime(time) {
  if (!time) return "";
  const [hour, minute] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hour, minute || 0, 0);
  return date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

function money(value) {
  const amount = Number(value || 0);
  return amount.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[ch]));
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function demoData() {
  return {
    settings: {
      familyName: "Fadlon Family",
      parents: ["Elad", "Wife"],
      children: ["Kid 1", "Kid 2", "Kid 3"]
    },
    tasks: [
      { id: uid(), title: "Review school forms", owner: "Elad", due: todayIso(), category: "School", priority: "High", done: false, createdAt: Date.now() },
      { id: uid(), title: "Prepare activity bags for tomorrow", owner: "Both", due: addDays(todayIso(), 1), category: "Kids Activity", priority: "Normal", done: false, createdAt: Date.now() }
    ],
    events: [
      { id: uid(), title: "Basketball practice", person: "Kid 1", date: todayIso(), time: "17:30", location: "Local gym", notes: "", createdAt: Date.now() },
      { id: uid(), title: "School drop-off", person: "All family", date: todayIso(), time: "07:45", location: "School", notes: "", createdAt: Date.now() }
    ],
    payments: [
      { id: uid(), name: "Soccer fee", amount: 120, due: addDays(todayIso(), 2), category: "Kids Activities", owner: "Both", frequency: "Monthly", method: "Credit card", status: "Upcoming", paidDate: "", notes: "", createdAt: Date.now() },
      { id: uid(), name: "School lunch balance", amount: 40, due: todayIso(), category: "School", owner: "Elad", frequency: "One-time", method: "Credit card", status: "Upcoming", paidDate: "", notes: "", createdAt: Date.now() },
      { id: uid(), name: "Groceries", amount: 165, due: todayIso(), category: "Groceries", owner: "Both", frequency: "Weekly", method: "Credit card", status: "Paid", paidDate: todayIso(), notes: "", createdAt: Date.now() }
    ],
    shopping: [
      { id: uid(), name: "Milk", store: "Grocery", done: false, createdAt: Date.now() },
      { id: uid(), name: "Fruit for lunch boxes", store: "Grocery", done: false, createdAt: Date.now() }
    ],
    inbox: [
      { id: uid(), text: "Check if basketball payment was made", type: "Money", createdAt: Date.now() },
      { id: uid(), text: "Ask teacher about field trip details", type: "School", createdAt: Date.now() }
    ],
    prepItems: [
      { id: uid(), text: "Pack water bottles", owner: "Both", date: addDays(todayIso(), 1), done: false, createdAt: Date.now() },
      { id: uid(), text: "Prepare sports shoes", owner: "Elad", date: addDays(todayIso(), 1), done: false, createdAt: Date.now() }
    ],
    decisions: [
      { id: uid(), title: "Choose summer camp", owner: "Both", due: addDays(todayIso(), 5), options: "Camp A / Camp B", status: "Open", createdAt: Date.now() }
    ],
    adminItems: [
      { id: uid(), title: "Submit field trip permission slip", category: "School form", owner: "Wife", due: addDays(todayIso(), 3), notes: "Check school email", status: "Open", createdAt: Date.now() }
    ],
    schoolItems: [
      { id: uid(), title: "Math homework - chapter practice", child: "Kid 1", type: "Homework", subject: "Math", due: addDays(todayIso(), 2), priority: "Normal", status: "Open", notes: "Check workbook", createdAt: Date.now() },
      { id: uid(), title: "Science exam", child: "Kid 2", type: "Exam", subject: "Science", due: addDays(todayIso(), 6), priority: "High", status: "Open", notes: "Review study guide", createdAt: Date.now() }
    ],
    routines: {
      morning: [
        { id: uid(), text: "Lunch boxes ready", doneDate: "" },
        { id: uid(), text: "Water bottles packed", doneDate: "" },
        { id: uid(), text: "Check today pickups/activities", doneDate: "" }
      ],
      evening: [
        { id: uid(), text: "Prepare clothes and bags", doneDate: "" },
        { id: uid(), text: "Review tomorrow calendar", doneDate: "" },
        { id: uid(), text: "Charge devices", doneDate: "" }
      ],
      weekly: [
        { id: uid(), text: "Review school emails and forms", doneDate: "" },
        { id: uid(), text: "Plan kids activities and rides", doneDate: "" },
        { id: uid(), text: "Review grocery needs and weekly payments", doneDate: "" }
      ]
    }
  };
}

function normalizeState(saved) {
  const fresh = demoData();
  const merged = {
    ...fresh,
    ...saved,
    settings: { ...fresh.settings, ...(saved?.settings || {}) },
    routines: { ...fresh.routines, ...(saved?.routines || {}) }
  };
  ["tasks", "events", "payments", "shopping", "inbox", "prepItems", "decisions", "adminItems", "schoolItems"].forEach(key => {
    if (!Array.isArray(merged[key])) merged[key] = [];
  });
  return merged;
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return demoData();
  try {
    return normalizeState(JSON.parse(saved));
  } catch {
    return demoData();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (typeof scheduleCloudSave === "function") scheduleCloudSave();
}

function getStoredFamilyId() {
  const current = localStorage.getItem(CLOUD_FAMILY_ID_KEY);
  if (current) return current;
  for (const key of LEGACY_CLOUD_FAMILY_ID_KEYS) {
    const value = localStorage.getItem(key);
    if (value) {
      localStorage.setItem(CLOUD_FAMILY_ID_KEY, value);
      return value;
    }
  }
  return "";
}

let state = loadState();
let taskFilter = "open";
let paymentFilter = "open";
let deferredInstallPrompt = null;

let cloud = {
  configured: false,
  initialized: false,
  ready: false,
  user: null,
  familyId: getStoredFamilyId(),
  familyDoc: null,
  app: null,
  auth: null,
  db: null,
  stateRef: null,
  memberRef: null,
  unsubscribeState: null,
  unsubscribeMembers: null,
  members: [],
  heartbeatTimer: null,
  saveTimer: null,
  applyingRemote: false,
  lastError: "",
  fb: null
};

function people() {
  return [...state.settings.parents, "Both", "All family", ...state.settings.children];
}

function setOptions(select, values, selected) {
  select.innerHTML = values.map(v => `<option value="${escapeHtml(v)}" ${v === selected ? "selected" : ""}>${escapeHtml(v)}</option>`).join("");
}

function extractDate(text) {
  const lower = text.toLowerCase();
  if (lower.includes("tomorrow")) return addDays(todayIso(), 1);
  if (lower.includes("today")) return todayIso();

  const weekdays = [
    ["sunday", 0], ["monday", 1], ["tuesday", 2], ["wednesday", 3],
    ["thursday", 4], ["friday", 5], ["saturday", 6]
  ];
  for (const [name, day] of weekdays) {
    if (lower.includes(name)) return nextWeekday(day);
  }

  const mmdd = lower.match(/\b(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?\b/);
  if (mmdd) {
    const now = new Date();
    const year = mmdd[3] ? Number(mmdd[3].length === 2 ? "20" + mmdd[3] : mmdd[3]) : now.getFullYear();
    const d = new Date(year, Number(mmdd[1]) - 1, Number(mmdd[2]));
    return isoFromDate(d);
  }

  return "";
}

function nextWeekday(targetDay) {
  const d = new Date();
  const current = d.getDay();
  let diff = (targetDay + 7 - current) % 7;
  if (diff === 0) diff = 7;
  d.setDate(d.getDate() + diff);
  return isoFromDate(d);
}

function extractTime(text) {
  const match = text.match(/\b(\d{1,2})(?::(\d{2}))?\s?(am|pm)?\b/i);
  if (!match) return "";
  let hour = Number(match[1]);
  const minute = Number(match[2] || "00");
  const ampm = match[3]?.toLowerCase();
  if (ampm === "pm" && hour < 12) hour += 12;
  if (ampm === "am" && hour === 12) hour = 0;
  if (hour > 23 || minute > 59) return "";
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function extractAmount(text) {
  const match = text.match(/\$?\s?(\d+(?:\.\d{1,2})?)/);
  return match ? Number(match[1]) : 0;
}

function inferQuickType(text, requestedType) {
  if (requestedType !== "auto") return requestedType;
  const lower = text.toLowerCase();
  if (lower.startsWith("buy ") || lower.startsWith("shopping ") || lower.includes("grocery")) return "shopping";
  if (lower.startsWith("decision") || lower.includes("decide ") || lower.includes("choose ")) return "decision";
  if (lower.includes("homework") || lower.includes("exam") || lower.includes("test") || lower.includes("quiz") || lower.includes("assignment") || lower.includes("project due")) return "schoolwork";
  if (lower.includes("tomorrow prep") || lower.startsWith("prep ") || lower.startsWith("pack ")) return "prep";
  if (lower.includes("school form") || lower.includes("permission slip") || lower.includes("passport") || lower.includes("document")) return "admin";
  if (lower.startsWith("paid ") || lower.startsWith("pay ") || lower.includes("$") || lower.includes("bill") || lower.includes("fee")) return "payment";
  if (lower.includes(" at ") || lower.includes("tomorrow") || lower.includes("today") || /\b\d{1,2}(:\d{2})?\s?(am|pm)\b/i.test(lower)) return "event";
  if (lower.startsWith("note ") || lower.startsWith("inbox ")) return "inbox";
  return "task";
}

function render() {
  document.getElementById("familyTitle").textContent = `${state.settings.familyName} Hub`;
  document.getElementById("todayLabel").textContent = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  ["taskOwner", "eventPerson", "paymentOwner", "prepOwner", "decisionOwner", "adminOwner", "schoolChild"].forEach(id => {
    const el = document.getElementById(id);
    if (el) setOptions(el, people(), id === "paymentOwner" ? "Both" : "Both");
  });

  document.getElementById("familyName").value = state.settings.familyName;
  document.getElementById("parent1").value = state.settings.parents[0] || "";
  document.getElementById("parent2").value = state.settings.parents[1] || "";
  document.getElementById("childrenNames").value = state.settings.children.join(", ");

  if (!document.getElementById("prepDate").value) {
    document.getElementById("prepDate").value = addDays(todayIso(), 1);
  }

  renderSummaryStrip();
  renderToday();
  renderTasks();
  renderEvents();
  renderLearning();
  renderPayments();
  renderPlanning();
  renderShopping();
  renderKids();
  renderRoutines();
  renderCloudPanel();
}

function renderSummaryStrip() {
  const today = todayIso();
  const weekEnd = addDays(today, 7);
  const openTasks = state.tasks.filter(t => !t.done).length;
  const duePayments = state.payments.filter(p => p.status !== "Paid" && p.due && p.due <= weekEnd).reduce((sum, p) => sum + Number(p.amount || 0), 0);
  const openAdmin = state.adminItems.filter(a => a.status !== "Done").length;
  const inbox = state.inbox.length;
  const schoolDue = state.schoolItems.filter(s => s.status !== "Done" && s.due && s.due <= weekEnd).length;

  document.getElementById("summaryStrip").innerHTML = `
    <div class="summary-box"><div class="number">${openTasks}</div><div class="label">Open tasks</div></div>
    <div class="summary-box"><div class="number">${money(duePayments)}</div><div class="label">Payments due next 7 days</div></div>
    <div class="summary-box"><div class="number">${schoolDue}</div><div class="label">Homework/exams due</div></div>
    <div class="summary-box"><div class="number">${openAdmin}</div><div class="label">School/admin open</div></div>
    <div class="summary-box"><div class="number">${inbox}</div><div class="label">Inbox items</div></div>
  `;
}

function renderToday() {
  const today = todayIso();
  const tomorrow = addDays(today, 1);
  const weekEnd = addDays(today, 7);

  const todaysEvents = state.events.filter(e => e.date === today).sort(sortEvents);
  const attentionTasks = state.tasks.filter(t => !t.done && (!t.due || t.due <= today)).sort(sortTasks);
  const paymentAttention = state.payments.filter(p => p.status !== "Paid" && p.due && p.due <= weekEnd).sort(sortPayments);
  const prep = state.prepItems.filter(p => !p.done && (!p.date || p.date <= tomorrow)).sort(sortPrep);
  const decisions = state.decisions.filter(d => d.status !== "Done").sort(sortDecisions).slice(0, 5);
  const admin = state.adminItems.filter(a => a.status !== "Done").sort(sortAdmin).slice(0, 5);
  const schoolwork = state.schoolItems.filter(s => s.status !== "Done" && (!s.due || s.due <= weekEnd)).sort(sortSchool).slice(0, 5);

  renderList("todayEvents", todaysEvents, renderEventItem, "No events for today.");
  renderList("todayPayments", paymentAttention, renderPaymentItem, "No payments due in the next 7 days.");
  renderList("todayTasks", attentionTasks, renderTaskItem, "No urgent or overdue tasks.");
  renderList("tomorrowPrepDashboard", prep, renderPrepItem, "No tomorrow prep items yet.");
  renderList("todaySchoolwork", schoolwork, renderSchoolItem, "No homework or exams due soon.");
  renderList("todayDecisions", decisions, renderDecisionItem, "No open decisions.");
  renderList("todayAdmin", admin, renderAdminItem, "No open school/admin items.");
  renderList("todayInbox", state.inbox.slice(0, 5), renderInboxItem, "Inbox is clear.");
  renderList("todayShopping", state.shopping.filter(i => !i.done).slice(0, 6), renderShoppingItem, "Shopping list is clear.");
}

function renderTasks() {
  let tasks = [...state.tasks];
  if (taskFilter === "open") tasks = tasks.filter(t => !t.done);
  if (taskFilter === "done") tasks = tasks.filter(t => t.done);
  tasks.sort(sortTasks);
  renderList("taskList", tasks, renderTaskItem, "No tasks in this view.");
}

function renderEvents() {
  const events = [...state.events].sort(sortEvents);
  renderList("eventList", events, renderEventItem, "No calendar items yet.");
}


function renderLearning() {
  const today = todayIso();
  const weekEnd = addDays(today, 7);
  const monthStart = firstDayOfMonth();
  const monthEnd = lastDayOfMonth();

  const dueWeek = state.schoolItems
    .filter(s => s.status !== "Done" && s.due && s.due <= weekEnd)
    .sort(sortSchool);

  const dueMonth = state.schoolItems
    .filter(s => s.status !== "Done" && s.due >= monthStart && s.due <= monthEnd)
    .sort(sortSchool);

  renderList("schoolDueWeek", dueWeek, renderSchoolItem, "No homework or exams due in the next 7 days.");
  renderList("schoolDueMonth", dueMonth, renderSchoolItem, "No homework or exams due this month.");
  renderList("schoolItemList", [...state.schoolItems].sort(sortSchool), renderSchoolItem, "No homework or exams added yet.");
}

function renderPayments() {
  const today = todayIso();
  const weekEnd = addDays(today, 7);
  const monthStart = firstDayOfMonth();
  const monthEnd = lastDayOfMonth();
  const yearStart = firstDayOfYear();
  const yearEnd = lastDayOfYear();

  const paidWeek = sumPayments(state.payments.filter(p => p.status === "Paid" && p.paidDate >= today && p.paidDate <= weekEnd));
  const paidMonth = sumPayments(state.payments.filter(p => p.status === "Paid" && p.paidDate >= monthStart && p.paidDate <= monthEnd));
  const paidYear = sumPayments(state.payments.filter(p => p.status === "Paid" && p.paidDate >= yearStart && p.paidDate <= yearEnd));
  const dueMonth = sumPayments(state.payments.filter(p => p.status !== "Paid" && p.due >= monthStart && p.due <= monthEnd));
  const expectedMonth = paidMonth + dueMonth;

  const categoryMap = {};
  state.payments
    .filter(p => ((p.status === "Paid" && p.paidDate >= monthStart && p.paidDate <= monthEnd) || (p.status !== "Paid" && p.due >= monthStart && p.due <= monthEnd)))
    .forEach(p => categoryMap[p.category] = (categoryMap[p.category] || 0) + Number(p.amount || 0));
  const categories = Object.entries(categoryMap).sort((a, b) => b[1] - a[1]).slice(0, 4);

  document.getElementById("moneySummary").innerHTML = `
    <div class="money-tile"><strong>${money(paidWeek)}</strong><span>Paid this week</span></div>
    <div class="money-tile"><strong>${money(paidMonth)}</strong><span>Paid this month</span></div>
    <div class="money-tile"><strong>${money(dueMonth)}</strong><span>Still due this month</span></div>
    <div class="money-tile"><strong>${money(expectedMonth)}</strong><span>Expected month total</span></div>
    <div class="money-tile"><strong>${money(paidYear)}</strong><span>Paid this year</span></div>
    ${categories.map(([cat, value]) => `<div class="money-tile"><strong>${money(value)}</strong><span>${escapeHtml(cat)}</span></div>`).join("")}
  `;

  renderList("paymentsDueWeek", state.payments.filter(p => p.status !== "Paid" && p.due && p.due <= weekEnd).sort(sortPayments), renderPaymentItem, "No payments due this week.");
  renderList("paymentsDueMonth", state.payments.filter(p => p.status !== "Paid" && p.due >= monthStart && p.due <= monthEnd).sort(sortPayments), renderPaymentItem, "No payments due this month.");
  renderList("paymentsPaidMonth", state.payments.filter(p => p.status === "Paid" && p.paidDate >= monthStart && p.paidDate <= monthEnd).sort(sortPayments), renderPaymentItem, "No paid expenses logged this month.");
  renderList("paymentsRecurring", state.payments.filter(p => p.frequency !== "One-time").sort(sortPayments), renderPaymentItem, "No recurring payments yet.");

  let payments = [...state.payments];
  if (paymentFilter === "open") payments = payments.filter(p => p.status !== "Paid");
  if (paymentFilter === "paid") payments = payments.filter(p => p.status === "Paid");
  payments.sort(sortPayments);
  renderList("paymentList", payments, renderPaymentItem, "No payments in this view.");
}

function renderPlanning() {
  renderList("inboxList", state.inbox, renderInboxItem, "Inbox is clear.");
  renderList("prepList", [...state.prepItems].sort(sortPrep), renderPrepItem, "No prep items yet.");
  renderList("decisionList", [...state.decisions].sort(sortDecisions), renderDecisionItem, "No decisions yet.");
  renderList("adminList", [...state.adminItems].sort(sortAdmin), renderAdminItem, "No school/admin items yet.");
}

function renderShopping() {
  const items = [...state.shopping].sort((a, b) => Number(a.done) - Number(b.done) || a.name.localeCompare(b.name));
  renderList("shoppingList", items, renderShoppingItem, "No shopping items yet.");
}

function renderKids() {
  const grid = document.getElementById("kidsGrid");
  grid.innerHTML = "";
  state.settings.children.forEach(child => {
    const childEvents = state.events.filter(e => e.person === child).sort(sortEvents).slice(0, 5);
    const childTasks = state.tasks.filter(t => t.owner === child && !t.done).sort(sortTasks).slice(0, 5);
    const childPayments = state.payments.filter(p => p.owner === child && p.status !== "Paid").sort(sortPayments).slice(0, 3);
    const childAdmin = state.adminItems.filter(a => a.owner === child && a.status !== "Done").sort(sortAdmin).slice(0, 3);
    const childSchool = state.schoolItems.filter(s => s.child === child && s.status !== "Done").sort(sortSchool).slice(0, 4);

    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h2>${escapeHtml(child)}</h2>
      <p class="muted">Activities, tasks, payments, and admin items for this child.</p>
      <div class="list">
        <h3>Activities</h3>
        ${childEvents.length ? childEvents.map(e => smallLine(e.title, `${formatDate(e.date)} ${formatTime(e.time)}${e.location ? " · " + e.location : ""}`)).join("") : `<div class="empty">No activities yet.</div>`}
        <h3>Tasks</h3>
        ${childTasks.length ? childTasks.map(t => smallLine(t.title, `${t.due ? formatDate(t.due) : "No due date"} · ${t.category}`)).join("") : `<div class="empty">No open tasks.</div>`}
        <h3>Homework & exams</h3>
        ${childSchool.length ? childSchool.map(s => smallLine(`${s.type}: ${s.title}`, `${s.due ? formatDate(s.due) : "No due date"} · ${s.subject || "No subject"} · ${s.priority}`)).join("") : `<div class="empty">No homework or exams.</div>`}
        <h3>Payments</h3>
        ${childPayments.length ? childPayments.map(p => smallLine(`${p.name} — ${money(p.amount)}`, `${p.due ? formatDate(p.due) : "No due date"} · ${p.category}`)).join("") : `<div class="empty">No open payments.</div>`}
        <h3>School/Admin</h3>
        ${childAdmin.length ? childAdmin.map(a => smallLine(a.title, `${a.due ? formatDate(a.due) : "No due date"} · ${a.category}`)).join("") : `<div class="empty">No admin items.</div>`}
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderRoutines() {
  renderRoutine("morningRoutine", "morning");
  renderRoutine("eveningRoutine", "evening");
  renderRoutine("weeklyRoutine", "weekly");
}

function renderRoutine(containerId, routineName) {
  const container = document.getElementById(containerId);
  const items = state.routines[routineName] || [];
  if (!items.length) {
    container.innerHTML = `<div class="empty">No checklist items yet.</div>`;
    return;
  }
  const today = todayIso();
  container.innerHTML = items.map(item => {
    const done = item.doneDate === today;
    return `
      <div class="item">
        <div class="item-main">
          <div class="item-title ${done ? "done-text" : ""}">${escapeHtml(item.text)}</div>
          <div class="item-meta">${done ? "Done today" : "Not done today"}</div>
        </div>
        <div class="item-actions">
          <button class="icon-btn" data-action="toggleRoutine" data-routine="${routineName}" data-id="${item.id}">${done ? "Undo" : "Done"}</button>
          <button class="icon-btn" data-action="deleteRoutine" data-routine="${routineName}" data-id="${item.id}">Delete</button>
        </div>
      </div>
    `;
  }).join("");
}

function renderList(containerId, items, renderer, emptyText) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (!items.length) {
    container.innerHTML = `<div class="empty">${escapeHtml(emptyText)}</div>`;
    return;
  }
  container.innerHTML = items.map(renderer).join("");
}

function smallLine(title, meta) {
  return `
    <div class="item">
      <div class="item-main">
        <div class="item-title">${escapeHtml(title)}</div>
        <div class="item-meta">${escapeHtml(meta || "")}</div>
      </div>
    </div>
  `;
}

function dueBadgeClass(iso, statusDone) {
  if (!iso || statusDone) return "";
  const diff = daysBetween(todayIso(), iso);
  if (diff < 0) return "overdue";
  if (diff <= 1) return "due";
  return "";
}

function renderTaskItem(task) {
  return `
    <div class="item">
      <div class="item-main">
        <div class="item-title ${task.done ? "done-text" : ""}">${escapeHtml(task.title)}</div>
        <div class="item-meta">
          <span class="badge">${escapeHtml(task.owner || "Unassigned")}</span>
          <span class="badge ${dueBadgeClass(task.due, task.done)}">${task.due ? formatDate(task.due) : "No due date"}</span>
          <span class="badge">${escapeHtml(task.category)}</span>
          <span class="badge ${task.priority === "High" ? "high" : ""}">${escapeHtml(task.priority)}</span>
          ${task.done ? `<span class="badge done">Done</span>` : ""}
        </div>
      </div>
      <div class="item-actions">
        <button class="icon-btn" data-action="toggleTask" data-id="${task.id}">${task.done ? "Reopen" : "Done"}</button>
        <button class="icon-btn" data-action="deleteTask" data-id="${task.id}">Delete</button>
      </div>
    </div>
  `;
}

function renderEventItem(event) {
  return `
    <div class="item">
      <div class="item-main">
        <div class="item-title">${escapeHtml(event.title)}</div>
        <div class="item-meta">
          <span class="badge">${formatDate(event.date)}</span>
          ${event.time ? `<span class="badge">${formatTime(event.time)}</span>` : ""}
          <span class="badge">${escapeHtml(event.person)}</span>
          ${event.location ? `<span class="badge">${escapeHtml(event.location)}</span>` : ""}
        </div>
      </div>
      <div class="item-actions">
        <button class="icon-btn" data-action="taskFromEvent" data-id="${event.id}">Prep task</button>
        <button class="icon-btn" data-action="deleteEvent" data-id="${event.id}">Delete</button>
      </div>
    </div>
  `;
}


function renderSchoolItem(item) {
  const done = item.status === "Done";
  const isExam = ["Exam", "Test", "Quiz"].includes(item.type);
  return `
    <div class="item">
      <div class="item-main">
        <div class="item-title ${done ? "done-text" : ""}">${escapeHtml(item.title)}</div>
        <div class="item-meta">
          <span class="badge ${isExam ? "exam" : "school"}">${escapeHtml(item.type || "School")}</span>
          <span class="badge">${escapeHtml(item.child || "Child")}</span>
          <span class="badge">${escapeHtml(item.subject || "No subject")}</span>
          <span class="badge ${dueBadgeClass(item.due, done)}">${item.due ? formatDate(item.due) : "No due date"}</span>
          <span class="badge ${item.priority === "High" ? "high" : ""}">${escapeHtml(item.priority || "Normal")}</span>
          ${item.notes ? `<span class="badge">${escapeHtml(item.notes)}</span>` : ""}
          ${done ? `<span class="badge done">Done</span>` : ""}
        </div>
      </div>
      <div class="item-actions">
        <button class="icon-btn" data-action="toggleSchool" data-id="${item.id}">${done ? "Reopen" : "Done"}</button>
        <button class="icon-btn" data-action="schoolToPrep" data-id="${item.id}">Prep</button>
        <button class="icon-btn" data-action="deleteSchool" data-id="${item.id}">Delete</button>
      </div>
    </div>
  `;
}

function renderPaymentItem(payment) {
  const paid = payment.status === "Paid";
  return `
    <div class="item">
      <div class="item-main">
        <div class="item-title ${paid ? "done-text" : ""}">${escapeHtml(payment.name)} — ${money(payment.amount)}</div>
        <div class="item-meta">
          <span class="badge money">${escapeHtml(payment.category)}</span>
          <span class="badge ${dueBadgeClass(payment.due, paid)}">${payment.due ? formatDate(payment.due) : "No due date"}</span>
          <span class="badge">${escapeHtml(payment.owner || "Both")}</span>
          <span class="badge">${escapeHtml(payment.frequency)}</span>
          <span class="badge">${escapeHtml(payment.method)}</span>
          ${paid ? `<span class="badge paid">Paid ${payment.paidDate ? formatDate(payment.paidDate) : ""}</span>` : ""}
        </div>
      </div>
      <div class="item-actions">
        <button class="icon-btn" data-action="togglePayment" data-id="${payment.id}">${paid ? "Reopen" : "Paid"}</button>
        <button class="icon-btn" data-action="deletePayment" data-id="${payment.id}">Delete</button>
      </div>
    </div>
  `;
}

function renderShoppingItem(item) {
  return `
    <div class="item">
      <div class="item-main">
        <div class="item-title ${item.done ? "done-text" : ""}">${escapeHtml(item.name)}</div>
        <div class="item-meta">
          <span class="badge">${escapeHtml(item.store)}</span>
          ${item.done ? `<span class="badge done">Bought</span>` : ""}
        </div>
      </div>
      <div class="item-actions">
        <button class="icon-btn" data-action="toggleShopping" data-id="${item.id}">${item.done ? "Reopen" : "Bought"}</button>
        <button class="icon-btn" data-action="deleteShopping" data-id="${item.id}">Delete</button>
      </div>
    </div>
  `;
}

function renderInboxItem(item) {
  return `
    <div class="item">
      <div class="item-main">
        <div class="item-title">${escapeHtml(item.text)}</div>
        <div class="item-meta">
          <span class="badge">${escapeHtml(item.type || "Unsorted")}</span>
        </div>
      </div>
      <div class="item-actions">
        <button class="icon-btn" data-action="inboxToTask" data-id="${item.id}">Task</button>
        <button class="icon-btn" data-action="inboxToDecision" data-id="${item.id}">Decision</button>
        <button class="icon-btn" data-action="inboxToPrep" data-id="${item.id}">Prep</button>
        <button class="icon-btn" data-action="deleteInbox" data-id="${item.id}">Delete</button>
      </div>
    </div>
  `;
}

function renderPrepItem(item) {
  return `
    <div class="item">
      <div class="item-main">
        <div class="item-title ${item.done ? "done-text" : ""}">${escapeHtml(item.text)}</div>
        <div class="item-meta">
          <span class="badge">${escapeHtml(item.owner || "Both")}</span>
          <span class="badge ${dueBadgeClass(item.date, item.done)}">${item.date ? formatDate(item.date) : "No date"}</span>
          ${item.done ? `<span class="badge done">Done</span>` : ""}
        </div>
      </div>
      <div class="item-actions">
        <button class="icon-btn" data-action="togglePrep" data-id="${item.id}">${item.done ? "Reopen" : "Done"}</button>
        <button class="icon-btn" data-action="deletePrep" data-id="${item.id}">Delete</button>
      </div>
    </div>
  `;
}

function renderDecisionItem(item) {
  const done = item.status === "Done";
  return `
    <div class="item">
      <div class="item-main">
        <div class="item-title ${done ? "done-text" : ""}">${escapeHtml(item.title)}</div>
        <div class="item-meta">
          <span class="badge decision">Decision</span>
          <span class="badge">${escapeHtml(item.owner || "Both")}</span>
          <span class="badge ${dueBadgeClass(item.due, done)}">${item.due ? formatDate(item.due) : "No due date"}</span>
          ${item.options ? `<span class="badge">${escapeHtml(item.options)}</span>` : ""}
          ${done ? `<span class="badge done">Done</span>` : ""}
        </div>
      </div>
      <div class="item-actions">
        <button class="icon-btn" data-action="toggleDecision" data-id="${item.id}">${done ? "Reopen" : "Done"}</button>
        <button class="icon-btn" data-action="deleteDecision" data-id="${item.id}">Delete</button>
      </div>
    </div>
  `;
}

function renderAdminItem(item) {
  const done = item.status === "Done";
  return `
    <div class="item">
      <div class="item-main">
        <div class="item-title ${done ? "done-text" : ""}">${escapeHtml(item.title)}</div>
        <div class="item-meta">
          <span class="badge">${escapeHtml(item.category)}</span>
          <span class="badge">${escapeHtml(item.owner || "Both")}</span>
          <span class="badge ${dueBadgeClass(item.due, done)}">${item.due ? formatDate(item.due) : "No due date"}</span>
          ${item.notes ? `<span class="badge">${escapeHtml(item.notes)}</span>` : ""}
          ${done ? `<span class="badge done">Done</span>` : ""}
        </div>
      </div>
      <div class="item-actions">
        <button class="icon-btn" data-action="toggleAdmin" data-id="${item.id}">${done ? "Reopen" : "Done"}</button>
        <button class="icon-btn" data-action="deleteAdmin" data-id="${item.id}">Delete</button>
      </div>
    </div>
  `;
}

function sortTasks(a, b) {
  return Number(a.done) - Number(b.done)
    || (a.due || "9999-99-99").localeCompare(b.due || "9999-99-99")
    || (b.priority === "High") - (a.priority === "High")
    || a.title.localeCompare(b.title);
}

function sortEvents(a, b) {
  return (a.date || "").localeCompare(b.date || "") || (a.time || "").localeCompare(b.time || "") || a.title.localeCompare(b.title);
}


function sortSchool(a, b) {
  return Number(a.status === "Done") - Number(b.status === "Done")
    || (a.due || "9999-99-99").localeCompare(b.due || "9999-99-99")
    || (b.priority === "High") - (a.priority === "High")
    || (a.child || "").localeCompare(b.child || "")
    || a.title.localeCompare(b.title);
}

function sortPayments(a, b) {
  return Number(a.status === "Paid") - Number(b.status === "Paid")
    || (a.due || "9999-99-99").localeCompare(b.due || "9999-99-99")
    || a.name.localeCompare(b.name);
}

function sortPrep(a, b) {
  return Number(a.done) - Number(b.done)
    || (a.date || "9999-99-99").localeCompare(b.date || "9999-99-99")
    || a.text.localeCompare(b.text);
}

function sortDecisions(a, b) {
  return Number(a.status === "Done") - Number(b.status === "Done")
    || (a.due || "9999-99-99").localeCompare(b.due || "9999-99-99")
    || a.title.localeCompare(b.title);
}

function sortAdmin(a, b) {
  return Number(a.status === "Done") - Number(b.status === "Done")
    || (a.due || "9999-99-99").localeCompare(b.due || "9999-99-99")
    || a.title.localeCompare(b.title);
}

function sumPayments(payments) {
  return payments.reduce((sum, p) => sum + Number(p.amount || 0), 0);
}

document.addEventListener("click", event => {
  const tab = event.target.closest(".tab");
  if (tab) {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.screen).classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const taskFilterButton = event.target.closest("[data-task-filter]");
  if (taskFilterButton) {
    taskFilter = taskFilterButton.dataset.taskFilter;
    document.querySelectorAll("[data-task-filter]").forEach(f => f.classList.remove("active"));
    taskFilterButton.classList.add("active");
    renderTasks();
    return;
  }

  const paymentFilterButton = event.target.closest("[data-payment-filter]");
  if (paymentFilterButton) {
    paymentFilter = paymentFilterButton.dataset.paymentFilter;
    document.querySelectorAll("[data-payment-filter]").forEach(f => f.classList.remove("active"));
    paymentFilterButton.classList.add("active");
    renderPayments();
    return;
  }

  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;
  handleAction(actionButton.dataset);
});

function handleAction(dataset) {
  const { action, id, routine } = dataset;

  if (action === "toggleTask") {
    const task = state.tasks.find(t => t.id === id);
    if (task) task.done = !task.done;
  }
  if (action === "deleteTask") state.tasks = state.tasks.filter(t => t.id !== id);

  if (action === "deleteEvent") state.events = state.events.filter(e => e.id !== id);
  if (action === "taskFromEvent") {
    const event = state.events.find(e => e.id === id);
    if (event) {
      state.prepItems.push({
        id: uid(),
        text: `Prepare for ${event.title}`,
        owner: "Both",
        date: event.date ? addDays(event.date, -1) : addDays(todayIso(), 1),
        done: false,
        createdAt: Date.now()
      });
    }
  }

  if (action === "togglePayment") {
    const payment = state.payments.find(p => p.id === id);
    if (payment) {
      const isPaid = payment.status === "Paid";
      payment.status = isPaid ? "Upcoming" : "Paid";
      payment.paidDate = isPaid ? "" : todayIso();
    }
  }
  if (action === "deletePayment") state.payments = state.payments.filter(p => p.id !== id);

  if (action === "toggleSchool") {
    const item = state.schoolItems.find(s => s.id === id);
    if (item) item.status = item.status === "Done" ? "Open" : "Done";
  }
  if (action === "deleteSchool") state.schoolItems = state.schoolItems.filter(s => s.id !== id);
  if (action === "schoolToPrep") {
    const item = state.schoolItems.find(s => s.id === id);
    if (item) {
      state.prepItems.push({
        id: uid(),
        text: `Prepare for ${item.child || "child"}: ${item.title}`,
        owner: "Both",
        date: item.due ? addDays(item.due, -1) : addDays(todayIso(), 1),
        done: false,
        createdAt: Date.now()
      });
    }
  }

  if (action === "toggleShopping") {
    const item = state.shopping.find(i => i.id === id);
    if (item) item.done = !item.done;
  }
  if (action === "deleteShopping") state.shopping = state.shopping.filter(i => i.id !== id);

  if (action === "deleteInbox") state.inbox = state.inbox.filter(i => i.id !== id);
  if (action === "inboxToTask") convertInbox(id, "task");
  if (action === "inboxToDecision") convertInbox(id, "decision");
  if (action === "inboxToPrep") convertInbox(id, "prep");

  if (action === "togglePrep") {
    const item = state.prepItems.find(p => p.id === id);
    if (item) item.done = !item.done;
  }
  if (action === "deletePrep") state.prepItems = state.prepItems.filter(p => p.id !== id);

  if (action === "toggleDecision") {
    const item = state.decisions.find(d => d.id === id);
    if (item) item.status = item.status === "Done" ? "Open" : "Done";
  }
  if (action === "deleteDecision") state.decisions = state.decisions.filter(d => d.id !== id);

  if (action === "toggleAdmin") {
    const item = state.adminItems.find(a => a.id === id);
    if (item) item.status = item.status === "Done" ? "Open" : "Done";
  }
  if (action === "deleteAdmin") state.adminItems = state.adminItems.filter(a => a.id !== id);

  if (action === "toggleRoutine") {
    const item = state.routines[routine]?.find(r => r.id === id);
    if (item) item.doneDate = item.doneDate === todayIso() ? "" : todayIso();
  }
  if (action === "deleteRoutine") {
    state.routines[routine] = state.routines[routine].filter(r => r.id !== id);
  }

  saveState();
  render();
}

function convertInbox(id, target) {
  const item = state.inbox.find(i => i.id === id);
  if (!item) return;

  if (target === "task") {
    state.tasks.push({ id: uid(), title: item.text, owner: "Both", due: "", category: item.type || "Other", priority: "Normal", done: false, createdAt: Date.now() });
  }
  if (target === "decision") {
    state.decisions.push({ id: uid(), title: item.text, owner: "Both", due: "", options: "", status: "Open", createdAt: Date.now() });
  }
  if (target === "prep") {
    state.prepItems.push({ id: uid(), text: item.text, owner: "Both", date: addDays(todayIso(), 1), done: false, createdAt: Date.now() });
  }

  state.inbox = state.inbox.filter(i => i.id !== id);
}

document.getElementById("quickForm").addEventListener("submit", event => {
  event.preventDefault();
  const text = document.getElementById("quickText").value.trim();
  const requested = document.getElementById("quickType").value;
  if (!text) return;

  const type = inferQuickType(text, requested);
  const date = extractDate(text);

  if (type === "shopping") {
    const cleaned = text.replace(/^(buy|shopping)\s*:?/i, "").trim();
    cleaned.split(",").map(x => x.trim()).filter(Boolean).forEach(name => {
      state.shopping.push({ id: uid(), name, store: "Grocery", done: false, createdAt: Date.now() });
    });
  } else if (type === "schoolwork") {
    const lower = text.toLowerCase();
    const child = state.settings.children.find(name => lower.includes(name.toLowerCase())) || "All family";
    const itemType = lower.includes("exam") ? "Exam" : lower.includes("test") ? "Test" : lower.includes("quiz") ? "Quiz" : lower.includes("project") ? "Project" : lower.includes("reading") ? "Reading" : "Homework";
    state.schoolItems.push({
      id: uid(),
      title: text,
      child,
      type: itemType,
      subject: "",
      due: date || todayIso(),
      priority: ["Exam", "Test", "Quiz"].includes(itemType) ? "High" : "Normal",
      status: "Open",
      notes: "Added from quick capture",
      createdAt: Date.now()
    });
  } else if (type === "payment") {
    const paid = text.toLowerCase().startsWith("paid ");
    state.payments.push({
      id: uid(),
      name: text.replace(/^(pay|paid)\s+/i, "").replace(/\$?\s?\d+(?:\.\d{1,2})?/, "").trim() || text,
      amount: extractAmount(text),
      due: paid ? date || todayIso() : date || todayIso(),
      category: "Other",
      owner: "Both",
      frequency: "One-time",
      method: "Credit card",
      status: paid ? "Paid" : "Upcoming",
      paidDate: paid ? todayIso() : "",
      notes: "Added from quick capture",
      createdAt: Date.now()
    });
  } else if (type === "prep") {
    state.prepItems.push({ id: uid(), text, owner: "Both", date: date || addDays(todayIso(), 1), done: false, createdAt: Date.now() });
  } else if (type === "decision") {
    state.decisions.push({ id: uid(), title: text.replace(/^decision\s*:?/i, "").trim(), owner: "Both", due: date, options: "", status: "Open", createdAt: Date.now() });
  } else if (type === "admin") {
    state.adminItems.push({ id: uid(), title: text, category: "Other", owner: "Both", due: date, notes: "Added from quick capture", status: "Open", createdAt: Date.now() });
  } else if (type === "event") {
    state.events.push({ id: uid(), title: text, person: "All family", date: date || todayIso(), time: extractTime(text), location: "", notes: "Added from quick capture", createdAt: Date.now() });
  } else if (type === "inbox") {
    state.inbox.push({ id: uid(), text, type: "Unsorted", createdAt: Date.now() });
  } else {
    state.tasks.push({ id: uid(), title: text, owner: "Both", due: date, category: "Other", priority: "Normal", done: false, createdAt: Date.now() });
  }

  document.getElementById("quickText").value = "";
  saveState();
  render();
});

document.getElementById("taskForm").addEventListener("submit", event => {
  event.preventDefault();
  state.tasks.push({
    id: uid(),
    title: document.getElementById("taskTitle").value.trim(),
    owner: document.getElementById("taskOwner").value,
    due: document.getElementById("taskDue").value,
    category: document.getElementById("taskCategory").value,
    priority: document.getElementById("taskPriority").value,
    done: false,
    createdAt: Date.now()
  });
  event.target.reset();
  saveState();
  render();
});

document.getElementById("eventForm").addEventListener("submit", event => {
  event.preventDefault();
  state.events.push({
    id: uid(),
    title: document.getElementById("eventTitle").value.trim(),
    person: document.getElementById("eventPerson").value,
    date: document.getElementById("eventDate").value,
    time: document.getElementById("eventTime").value,
    location: document.getElementById("eventLocation").value.trim(),
    notes: "",
    createdAt: Date.now()
  });
  event.target.reset();
  saveState();
  render();
});


document.getElementById("schoolForm").addEventListener("submit", event => {
  event.preventDefault();
  state.schoolItems.push({
    id: uid(),
    title: document.getElementById("schoolTitle").value.trim(),
    child: document.getElementById("schoolChild").value,
    type: document.getElementById("schoolType").value,
    subject: document.getElementById("schoolSubject").value.trim(),
    due: document.getElementById("schoolDue").value,
    priority: document.getElementById("schoolPriority").value,
    status: "Open",
    notes: document.getElementById("schoolNotes").value.trim(),
    createdAt: Date.now()
  });
  event.target.reset();
  saveState();
  render();
});

document.getElementById("paymentForm").addEventListener("submit", event => {
  event.preventDefault();
  const status = document.getElementById("paymentStatus").value;
  state.payments.push({
    id: uid(),
    name: document.getElementById("paymentName").value.trim(),
    amount: Number(document.getElementById("paymentAmount").value || 0),
    due: document.getElementById("paymentDue").value,
    category: document.getElementById("paymentCategory").value,
    owner: document.getElementById("paymentOwner").value,
    frequency: document.getElementById("paymentFrequency").value,
    method: document.getElementById("paymentMethod").value,
    status,
    paidDate: status === "Paid" ? todayIso() : "",
    notes: "",
    createdAt: Date.now()
  });
  event.target.reset();
  saveState();
  render();
});

document.getElementById("shoppingForm").addEventListener("submit", event => {
  event.preventDefault();
  state.shopping.push({
    id: uid(),
    name: document.getElementById("shoppingName").value.trim(),
    store: document.getElementById("shoppingStore").value,
    done: false,
    createdAt: Date.now()
  });
  event.target.reset();
  saveState();
  render();
});

document.getElementById("inboxForm").addEventListener("submit", event => {
  event.preventDefault();
  state.inbox.push({
    id: uid(),
    text: document.getElementById("inboxText").value.trim(),
    type: document.getElementById("inboxType").value,
    createdAt: Date.now()
  });
  event.target.reset();
  saveState();
  render();
});

document.getElementById("prepForm").addEventListener("submit", event => {
  event.preventDefault();
  state.prepItems.push({
    id: uid(),
    text: document.getElementById("prepText").value.trim(),
    owner: document.getElementById("prepOwner").value,
    date: document.getElementById("prepDate").value || addDays(todayIso(), 1),
    done: false,
    createdAt: Date.now()
  });
  document.getElementById("prepText").value = "";
  saveState();
  render();
});

document.getElementById("decisionForm").addEventListener("submit", event => {
  event.preventDefault();
  state.decisions.push({
    id: uid(),
    title: document.getElementById("decisionTitle").value.trim(),
    owner: document.getElementById("decisionOwner").value,
    due: document.getElementById("decisionDue").value,
    options: document.getElementById("decisionOptions").value.trim(),
    status: "Open",
    createdAt: Date.now()
  });
  event.target.reset();
  saveState();
  render();
});

document.getElementById("adminForm").addEventListener("submit", event => {
  event.preventDefault();
  state.adminItems.push({
    id: uid(),
    title: document.getElementById("adminTitle").value.trim(),
    category: document.getElementById("adminCategory").value,
    owner: document.getElementById("adminOwner").value,
    due: document.getElementById("adminDue").value,
    notes: document.getElementById("adminNotes").value.trim(),
    status: "Open",
    createdAt: Date.now()
  });
  event.target.reset();
  saveState();
  render();
});

document.querySelectorAll(".routine-form").forEach(form => {
  form.addEventListener("submit", event => {
    event.preventDefault();
    const routine = form.dataset.routine;
    const input = form.querySelector("input");
    state.routines[routine].push({ id: uid(), text: input.value.trim(), doneDate: "" });
    input.value = "";
    saveState();
    render();
  });
});

document.getElementById("settingsForm").addEventListener("submit", event => {
  event.preventDefault();
  state.settings.familyName = document.getElementById("familyName").value.trim() || "Family";
  state.settings.parents = [
    document.getElementById("parent1").value.trim() || "Parent 1",
    document.getElementById("parent2").value.trim() || "Parent 2"
  ];
  state.settings.children = document.getElementById("childrenNames").value.split(",").map(x => x.trim()).filter(Boolean);
  saveState();
  render();
});

document.getElementById("exportBtn").addEventListener("click", () => {
  const data = JSON.stringify(state, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `family-command-center-v2-backup-${todayIso()}.json`;
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById("importFile").addEventListener("change", event => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      state = normalizeState(JSON.parse(reader.result));
      saveState();
      render();
      alert("Backup imported.");
    } catch {
      alert("Could not import this file. Please choose a valid backup JSON.");
    }
  };
  reader.readAsText(file);
});

document.getElementById("resetBtn").addEventListener("click", () => {
  if (!confirm("Reset all data and return to demo data?")) return;
  state = demoData();
  saveState();
  render();
});

window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  deferredInstallPrompt = event;
  document.getElementById("installBtn").classList.remove("hidden");
});

document.getElementById("installBtn").addEventListener("click", async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  document.getElementById("installBtn").classList.add("hidden");
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}


function isFirebaseConfigured() {
  const cfg = window.FAMILY_FIREBASE_CONFIG || {};
  const required = ["apiKey", "authDomain", "projectId", "appId"];
  return required.every(key => cfg[key] && !String(cfg[key]).includes("PASTE_"));
}

function setCloudStatus(message, level = "warn") {
  const el = document.getElementById("cloudStatus");
  if (!el) return;
  el.textContent = message;
  el.className = `cloud-status ${level}`;
}

function renderCloudPanel() {
  const statusEl = document.getElementById("cloudStatus");
  if (!statusEl) return;

  const configured = isFirebaseConfigured();
  const logoutBtn = document.getElementById("logoutBtn");
  const shareBox = document.getElementById("familyShareBox");

  if (!configured) {
    setCloudStatus("Cloud sync is not configured yet. Add your Firebase project details to firebase-config.js, then upload the updated files.", "warn");
    if (logoutBtn) logoutBtn.classList.add("hidden");
    if (shareBox) shareBox.classList.add("hidden");
    return;
  }

  if (!cloud.initialized) {
    setCloudStatus("Firebase config found. Sign in with Google or email/password to start cloud sync.", "warn");
  } else if (!cloud.user) {
    setCloudStatus("Firebase is ready. Please sign in with Google or create/sign into an account.", "warn");
  } else if (cloud.ready && cloud.familyId) {
    setCloudStatus(`Cloud sync active for ${cloud.user.email || "signed-in user"}. Family ID: ${cloud.familyId}`, "good");
  } else {
    setCloudStatus(`Signed in as ${cloud.user.email || "user"}. Looking for your family space, or create/join one to start syncing.`, "warn");
  }

  if (logoutBtn) logoutBtn.classList.toggle("hidden", !cloud.user);

  renderFamilyMembers();

  if (shareBox) {
    if (cloud.familyDoc && cloud.familyId) {
      const invite = cloud.familyDoc.inviteCode || "";
      shareBox.classList.remove("hidden");
      shareBox.innerHTML = `
        <strong>Share this with your wife/kids:</strong><br>
        Family ID: <code>${escapeHtml(cloud.familyId)}</code><br>
        Invite Code: <code>${escapeHtml(invite)}</code><br>
        <p class="muted small-note">They should open the app, create/sign into their account, then use Join existing family space.</p>
      `;
    } else {
      shareBox.classList.add("hidden");
    }
  }
}


function initialsFromMember(member) {
  const source = member.displayName || member.email || "User";
  const parts = source.split(/[ .@_-]+/).filter(Boolean);
  return parts.slice(0, 2).map(p => p[0]?.toUpperCase() || "").join("") || "U";
}

function timestampToDate(value) {
  if (!value) return null;
  if (typeof value.toDate === "function") return value.toDate();
  if (value.seconds) return new Date(value.seconds * 1000);
  if (typeof value === "string") return new Date(value);
  return null;
}

function isActiveMember(member) {
  const lastSeen = timestampToDate(member.lastSeen);
  if (!lastSeen) return false;
  return Date.now() - lastSeen.getTime() < 3 * 60 * 1000;
}

function formatLastSeen(value) {
  const lastSeen = timestampToDate(value);
  if (!lastSeen) return "No activity yet";
  const diffMs = Date.now() - lastSeen.getTime();
  const diffMin = Math.max(0, Math.round(diffMs / 60000));
  if (diffMin < 3) return "Active now";
  if (diffMin < 60) return `Last seen ${diffMin} min ago`;
  const diffHours = Math.round(diffMin / 60);
  if (diffHours < 24) return `Last seen ${diffHours} hr ago`;
  return `Last seen ${lastSeen.toLocaleDateString(undefined, { month: "short", day: "numeric" })}`;
}

function renderFamilyMembers() {
  const container = document.getElementById("familyMembersList");
  if (!container) return;

  if (!cloud.user || !cloud.familyId) {
    container.innerHTML = `<div class="empty">Sign in and join a family space to see members.</div>`;
    return;
  }

  if (!cloud.members.length) {
    container.innerHTML = `<div class="empty">No family members loaded yet.</div>`;
    return;
  }

  const members = [...cloud.members].sort((a, b) => {
    const activeDiff = Number(isActiveMember(b)) - Number(isActiveMember(a));
    if (activeDiff) return activeDiff;
    return (a.email || "").localeCompare(b.email || "");
  });

  container.innerHTML = members.map(member => {
    const active = isActiveMember(member);
    const name = member.displayName || member.email || "Family member";
    const sub = [
      member.email || "",
      member.role ? `Role: ${member.role}` : "",
      member.uid === cloud.user?.uid ? "You" : ""
    ].filter(Boolean).join(" · ");

    return `
      <div class="member-row">
        <div class="member-left">
          <div class="member-avatar">
            ${member.photoURL ? `<img src="${escapeHtml(member.photoURL)}" alt="">` : escapeHtml(initialsFromMember(member))}
          </div>
          <div>
            <div class="member-name">${escapeHtml(name)}</div>
            <div class="member-sub">${escapeHtml(sub)}</div>
          </div>
        </div>
        <span class="member-status ${active ? "active" : "away"}">${escapeHtml(formatLastSeen(member.lastSeen))}</span>
      </div>
    `;
  }).join("");
}

async function updatePresence() {
  if (!cloud.user || !cloud.familyId || !cloud.db || !cloud.fb) return;

  try {
    cloud.memberRef = cloud.fb.doc(cloud.db, "families", cloud.familyId, "members", cloud.user.uid);
    await cloud.fb.setDoc(cloud.memberRef, {
      email: cloud.user.email || "",
      displayName: cloud.user.displayName || "",
      photoURL: cloud.user.photoURL || "",
      role: cloud.user.uid === cloud.familyDoc?.createdBy ? "owner" : "member",
      online: true,
      lastSeen: cloud.fb.serverTimestamp()
    }, { merge: true });
  } catch (error) {
    cloud.lastError = error.message;
  }
}

function startPresenceHeartbeat() {
  stopPresenceHeartbeat();
  updatePresence();
  cloud.heartbeatTimer = setInterval(updatePresence, 60 * 1000);
}

function stopPresenceHeartbeat() {
  if (cloud.heartbeatTimer) clearInterval(cloud.heartbeatTimer);
  cloud.heartbeatTimer = null;
}

async function markOffline() {
  if (!cloud.memberRef || !cloud.fb) return;
  try {
    await cloud.fb.setDoc(cloud.memberRef, {
      online: false,
      lastSeen: cloud.fb.serverTimestamp()
    }, { merge: true });
  } catch {
    // Best-effort sign-out presence update.
  }
}

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") updatePresence();
});

async function ensureFirebase() {
  if (!isFirebaseConfigured()) {
    renderCloudPanel();
    throw new Error("Firebase config missing. Update firebase-config.js first.");
  }

  if (cloud.initialized) return cloud;

  const [
    appMod,
    authMod,
    fsMod
  ] = await Promise.all([
    import(`https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}/firebase-app.js`),
    import(`https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}/firebase-auth.js`),
    import(`https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}/firebase-firestore.js`)
  ]);

  cloud.fb = {
    initializeApp: appMod.initializeApp,
    getAuth: authMod.getAuth,
    onAuthStateChanged: authMod.onAuthStateChanged,
    createUserWithEmailAndPassword: authMod.createUserWithEmailAndPassword,
    signInWithEmailAndPassword: authMod.signInWithEmailAndPassword,
    GoogleAuthProvider: authMod.GoogleAuthProvider,
    signInWithPopup: authMod.signInWithPopup,
    signOut: authMod.signOut,
    getFirestore: fsMod.getFirestore,
    doc: fsMod.doc,
    setDoc: fsMod.setDoc,
    getDoc: fsMod.getDoc,
    collection: fsMod.collection,
    onSnapshot: fsMod.onSnapshot,
    serverTimestamp: fsMod.serverTimestamp
  };

  cloud.app = cloud.fb.initializeApp(window.FAMILY_FIREBASE_CONFIG);
  cloud.auth = cloud.fb.getAuth(cloud.app);
  cloud.db = cloud.fb.getFirestore(cloud.app);
  cloud.initialized = true;

  cloud.fb.onAuthStateChanged(cloud.auth, async user => {
    cloud.user = user;
    cloud.ready = false;
    if (!user) {
      stopPresenceHeartbeat();
      if (cloud.unsubscribeState) cloud.unsubscribeState();
      if (cloud.unsubscribeMembers) cloud.unsubscribeMembers();
      cloud.unsubscribeState = null;
      cloud.unsubscribeMembers = null;
      cloud.stateRef = null;
      cloud.memberRef = null;
      cloud.members = [];
      cloud.familyDoc = null;
      renderCloudPanel();
      return;
    }

    renderCloudPanel();

    try {
      const savedFamilyId = getStoredFamilyId();
      if (savedFamilyId) {
        await connectFamily(savedFamilyId);
        return;
      }

      const profileFamilyId = await getUserCurrentFamilyId();
      if (profileFamilyId) {
        localStorage.setItem(CLOUD_FAMILY_ID_KEY, profileFamilyId);
        await connectFamily(profileFamilyId);
        return;
      }

      setCloudStatus(`Signed in as ${user.email || "user"}. No family space found yet. Create one or join with Family ID + Invite Code.`, "warn");
    } catch (error) {
      cloud.lastError = error.message;
      setCloudStatus(`Signed in, but could not auto-detect your family space: ${error.message}`, "bad");
    }
  });

  renderCloudPanel();
  return cloud;
}

function randomCode(prefix = "", length = 6) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = prefix;
  for (let i = 0; i < length; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}



async function getUserCurrentFamilyId() {
  if (!cloud.user || !cloud.db || !cloud.fb) return "";
  const profileRef = cloud.fb.doc(cloud.db, "users", cloud.user.uid);
  const profileSnap = await cloud.fb.getDoc(profileRef);
  if (!profileSnap.exists()) return "";
  const profile = profileSnap.data() || {};
  return profile.currentFamilyId || "";
}

async function saveUserCurrentFamily(familyId, role = "member") {
  if (!cloud.user || !familyId || !cloud.db || !cloud.fb) return;

  const profileRef = cloud.fb.doc(cloud.db, "users", cloud.user.uid);
  await cloud.fb.setDoc(profileRef, {
    email: cloud.user.email || "",
    displayName: cloud.user.displayName || "",
    photoURL: cloud.user.photoURL || "",
    currentFamilyId: familyId,
    lastFamilyId: familyId,
    role,
    updatedAt: cloud.fb.serverTimestamp()
  }, { merge: true });
}

async function signInWithGoogle() {
  await ensureFirebase();
  const provider = new cloud.fb.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  await cloud.fb.signInWithPopup(cloud.auth, provider);
}

async function signUpWithEmail(email, password) {
  await ensureFirebase();
  if (!email || !password) throw new Error("Enter email and password.");
  await cloud.fb.createUserWithEmailAndPassword(cloud.auth, email, password);
}

async function signInWithEmail(email, password) {
  await ensureFirebase();
  if (!email || !password) throw new Error("Enter email and password.");
  await cloud.fb.signInWithEmailAndPassword(cloud.auth, email, password);
}

async function signOutCloud() {
  await ensureFirebase();
  await markOffline();
  stopPresenceHeartbeat();
  if (cloud.unsubscribeState) cloud.unsubscribeState();
  if (cloud.unsubscribeMembers) cloud.unsubscribeMembers();
  cloud.unsubscribeState = null;
  cloud.unsubscribeMembers = null;
  cloud.members = [];
  cloud.ready = false;
  cloud.familyDoc = null;
  await cloud.fb.signOut(cloud.auth);
  renderCloudPanel();
}

async function createFamilySpace() {
  await ensureFirebase();
  if (!cloud.user) throw new Error("Sign in first.");

  const familyId = randomCode("FAM-", 8);
  const inviteCode = randomCode("", 6);
  const familyRef = cloud.fb.doc(cloud.db, "families", familyId);
  const memberRef = cloud.fb.doc(cloud.db, "families", familyId, "members", cloud.user.uid);
  const stateRef = cloud.fb.doc(cloud.db, "families", familyId, "state", "main");

  await cloud.fb.setDoc(familyRef, {
    familyName: state.settings.familyName || "Family",
    createdBy: cloud.user.uid,
    createdAt: cloud.fb.serverTimestamp(),
    inviteCode
  });

  await cloud.fb.setDoc(memberRef, {
    email: cloud.user.email || "",
    displayName: cloud.user.displayName || "",
    photoURL: cloud.user.photoURL || "",
    role: "owner",
    joinedAt: cloud.fb.serverTimestamp(),
    inviteCode,
    online: true,
    lastSeen: cloud.fb.serverTimestamp()
  });

  await cloud.fb.setDoc(stateRef, {
    data: state,
    updatedAt: cloud.fb.serverTimestamp(),
    updatedBy: cloud.user.uid
  });

  localStorage.setItem(CLOUD_FAMILY_ID_KEY, familyId);
  await saveUserCurrentFamily(familyId, "owner");
  await connectFamily(familyId);
}

async function joinFamilySpace(familyId, inviteCode) {
  await ensureFirebase();
  if (!cloud.user) throw new Error("Sign in first.");
  if (!familyId || !inviteCode) throw new Error("Enter Family ID and Invite Code.");

  familyId = familyId.trim().toUpperCase();
  inviteCode = inviteCode.trim().toUpperCase();

  const memberRef = cloud.fb.doc(cloud.db, "families", familyId, "members", cloud.user.uid);
  await cloud.fb.setDoc(memberRef, {
    email: cloud.user.email || "",
    displayName: cloud.user.displayName || "",
    photoURL: cloud.user.photoURL || "",
    role: "member",
    joinedAt: cloud.fb.serverTimestamp(),
    inviteCode,
    online: true,
    lastSeen: cloud.fb.serverTimestamp()
  });

  localStorage.setItem(CLOUD_FAMILY_ID_KEY, familyId);
  await saveUserCurrentFamily(familyId, "member");
  await connectFamily(familyId);
}

async function connectFamily(familyId) {
  await ensureFirebase();
  if (!cloud.user) throw new Error("Sign in first.");

  familyId = familyId.trim().toUpperCase();
  cloud.familyId = familyId;
  localStorage.setItem(CLOUD_FAMILY_ID_KEY, familyId);

  if (cloud.unsubscribeState) cloud.unsubscribeState();

  const familyRef = cloud.fb.doc(cloud.db, "families", familyId);
  const familySnap = await cloud.fb.getDoc(familyRef);
  if (familySnap.exists()) {
    cloud.familyDoc = familySnap.data();
    await saveUserCurrentFamily(familyId, cloud.user.uid === cloud.familyDoc.createdBy ? "owner" : "member");
  }

  cloud.stateRef = cloud.fb.doc(cloud.db, "families", familyId, "state", "main");

  const membersRef = cloud.fb.collection(cloud.db, "families", familyId, "members");
  cloud.unsubscribeMembers = cloud.fb.onSnapshot(membersRef, snapshot => {
    cloud.members = snapshot.docs.map(docSnap => ({ uid: docSnap.id, ...docSnap.data() }));
    renderFamilyMembers();
  }, error => {
    cloud.lastError = error.message;
    setCloudStatus(`Could not load family members: ${error.message}`, "bad");
  });

  startPresenceHeartbeat();

  cloud.unsubscribeState = cloud.fb.onSnapshot(cloud.stateRef, snap => {
    if (!snap.exists()) return;
    const incoming = snap.data();
    if (!incoming || !incoming.data) return;

    cloud.applyingRemote = true;
    state = normalizeState(incoming.data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    cloud.ready = true;
    cloud.applyingRemote = false;
    render();
  }, error => {
    cloud.ready = false;
    cloud.lastError = error.message;
    setCloudStatus(`Cloud sync error: ${error.message}`, "bad");
  });

  cloud.ready = true;
  renderCloudPanel();
}

function scheduleCloudSave() {
  if (!cloud || !cloud.ready || !cloud.stateRef || !cloud.user || cloud.applyingRemote) return;
  clearTimeout(cloud.saveTimer);
  cloud.saveTimer = setTimeout(saveCloudNow, 700);
}

async function saveCloudNow() {
  if (!cloud.ready || !cloud.stateRef || !cloud.user || cloud.applyingRemote) return;

  try {
    await cloud.fb.setDoc(cloud.stateRef, {
      data: state,
      updatedAt: cloud.fb.serverTimestamp(),
      updatedBy: cloud.user.uid
    }, { merge: true });
  } catch (error) {
    cloud.lastError = error.message;
    setCloudStatus(`Could not save to cloud: ${error.message}`, "bad");
  }
}

function wireCloudControls() {
  const googleSignInBtn = document.getElementById("googleSignInBtn");
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const createFamilyBtn = document.getElementById("createFamilyBtn");
  const joinForm = document.getElementById("joinFamilyForm");

  googleSignInBtn?.addEventListener("click", async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      setCloudStatus(`Google sign-in failed: ${error.message}`, "bad");
    }
  });

  loginBtn?.addEventListener("click", async () => {
    try {
      await signInWithEmail(
        document.getElementById("authEmail").value.trim(),
        document.getElementById("authPassword").value
      );
    } catch (error) {
      setCloudStatus(`Sign-in failed: ${error.message}`, "bad");
    }
  });

  signupBtn?.addEventListener("click", async () => {
    try {
      await signUpWithEmail(
        document.getElementById("authEmail").value.trim(),
        document.getElementById("authPassword").value
      );
    } catch (error) {
      setCloudStatus(`Account creation failed: ${error.message}`, "bad");
    }
  });

  logoutBtn?.addEventListener("click", async () => {
    try {
      await signOutCloud();
    } catch (error) {
      setCloudStatus(`Sign-out failed: ${error.message}`, "bad");
    }
  });

  createFamilyBtn?.addEventListener("click", async () => {
    try {
      await createFamilySpace();
    } catch (error) {
      setCloudStatus(`Could not create family space: ${error.message}`, "bad");
    }
  });

  joinForm?.addEventListener("submit", async event => {
    event.preventDefault();
    try {
      await joinFamilySpace(
        document.getElementById("joinFamilyId").value,
        document.getElementById("joinInviteCode").value
      );
    } catch (error) {
      setCloudStatus(`Could not join family space: ${error.message}`, "bad");
    }
  });
}

window.addEventListener("load", async () => {
  wireCloudControls();
  renderCloudPanel();
  if (isFirebaseConfigured()) {
    try {
      await ensureFirebase();
    } catch (error) {
      setCloudStatus(`Firebase setup problem: ${error.message}`, "bad");
    }
  }
});


render();
