const STORAGE_KEY = "family-command-center-v1";

const todayIso = () => new Date().toISOString().slice(0, 10);

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function formatDate(iso) {
  if (!iso) return "No date";
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

function formatTime(time) {
  if (!time) return "";
  const [hour, minute] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hour, minute || 0, 0);
  return date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

function uid() {
  return crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random());
}

const demoData = {
  settings: {
    familyName: "Fadlon Family",
    parents: ["Elad", "Wife"],
    children: ["Kid 1", "Kid 2", "Kid 3"]
  },
  tasks: [
    { id: uid(), title: "Review school forms", owner: "Elad", due: todayIso(), category: "School", priority: "High", done: false, createdAt: Date.now() },
    { id: uid(), title: "Prepare activity bags for tomorrow", owner: "Both", due: addDays(new Date(), 1), category: "Kids Activity", priority: "Normal", done: false, createdAt: Date.now() }
  ],
  events: [
    { id: uid(), title: "Basketball practice", person: "Kid 1", date: todayIso(), time: "17:30", location: "Local gym", notes: "", createdAt: Date.now() },
    { id: uid(), title: "School drop-off", person: "All family", date: todayIso(), time: "07:45", location: "School", notes: "", createdAt: Date.now() }
  ],
  shopping: [
    { id: uid(), name: "Milk", store: "Grocery", done: false, createdAt: Date.now() },
    { id: uid(), name: "Fruit for lunch boxes", store: "Grocery", done: false, createdAt: Date.now() }
  ],
  notes: [],
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
      { id: uid(), text: "Review grocery needs", doneDate: "" }
    ]
  }
};

let state = loadState();
let taskFilter = "open";
let deferredInstallPrompt = null;

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(demoData);
  try {
    const parsed = JSON.parse(saved);
    return {
      ...structuredClone(demoData),
      ...parsed,
      settings: { ...demoData.settings, ...(parsed.settings || {}) },
      routines: { ...demoData.routines, ...(parsed.routines || {}) }
    };
  } catch {
    return structuredClone(demoData);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function people() {
  return [...state.settings.parents, "Both", "All family", ...state.settings.children];
}

function setOptions(select, values, selected) {
  select.innerHTML = values.map(v => `<option value="${escapeHtml(v)}" ${v === selected ? "selected" : ""}>${escapeHtml(v)}</option>`).join("");
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[ch]));
}

function inferQuickType(text, requestedType) {
  if (requestedType !== "auto") return requestedType;
  const lower = text.toLowerCase();
  if (lower.startsWith("buy ") || lower.startsWith("shopping ") || lower.includes("grocery")) return "shopping";
  if (lower.includes(" at ") || lower.includes("tomorrow") || lower.includes("today") || /\b\d{1,2}(:\d{2})?\s?(am|pm)\b/i.test(lower)) return "event";
  if (lower.startsWith("note ")) return "note";
  return "task";
}

function extractDate(text) {
  const lower = text.toLowerCase();
  if (lower.includes("tomorrow")) return addDays(new Date(), 1);
  if (lower.includes("today")) return todayIso();
  if (lower.includes("friday")) return nextWeekday(5);
  if (lower.includes("saturday")) return nextWeekday(6);
  if (lower.includes("sunday")) return nextWeekday(0);
  if (lower.includes("monday")) return nextWeekday(1);
  if (lower.includes("tuesday")) return nextWeekday(2);
  if (lower.includes("wednesday")) return nextWeekday(3);
  if (lower.includes("thursday")) return nextWeekday(4);
  return "";
}

function nextWeekday(targetDay) {
  const d = new Date();
  const current = d.getDay();
  let diff = (targetDay + 7 - current) % 7;
  if (diff === 0) diff = 7;
  d.setDate(d.getDate() + diff);
  return d.toISOString().slice(0, 10);
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

function render() {
  document.getElementById("familyTitle").textContent = `${state.settings.familyName} Hub`;
  document.getElementById("todayLabel").textContent = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  setOptions(document.getElementById("taskOwner"), people(), "Both");
  setOptions(document.getElementById("eventPerson"), people(), "All family");

  document.getElementById("familyName").value = state.settings.familyName;
  document.getElementById("parent1").value = state.settings.parents[0] || "";
  document.getElementById("parent2").value = state.settings.parents[1] || "";
  document.getElementById("childrenNames").value = state.settings.children.join(", ");

  renderToday();
  renderTasks();
  renderEvents();
  renderShopping();
  renderKids();
  renderRoutines();
}

function renderToday() {
  const today = todayIso();
  const tomorrow = addDays(new Date(), 1);
  const todaysEvents = state.events.filter(e => e.date === today).sort(sortEvents);
  const attentionTasks = state.tasks
    .filter(t => !t.done && (!t.due || t.due <= today))
    .sort(sortTasks);
  const tomorrowItems = [
    ...state.events.filter(e => e.date === tomorrow).map(e => ({
      id: e.id,
      title: e.title,
      meta: `${formatDate(e.date)} ${formatTime(e.time)} · ${e.person}${e.location ? " · " + e.location : ""}`
    })),
    ...state.tasks.filter(t => !t.done && t.due === tomorrow).map(t => ({
      id: t.id,
      title: t.title,
      meta: `Task · ${t.owner} · ${t.category}`
    }))
  ];

  renderList("todayEvents", todaysEvents, renderEventItem, "No events for today.");
  renderList("todayTasks", attentionTasks, renderTaskItem, "No urgent or overdue tasks.");
  renderSimpleList("tomorrowPrep", tomorrowItems, "Nothing planned for tomorrow yet.");
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
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h2>${escapeHtml(child)}</h2>
      <p class="muted">Upcoming activities and open tasks.</p>
      <div class="list">
        <h3>Activities</h3>
        ${childEvents.length ? childEvents.map(e => smallLine(e.title, `${formatDate(e.date)} ${formatTime(e.time)}${e.location ? " · " + e.location : ""}`)).join("") : `<div class="empty">No activities yet.</div>`}
        <h3>Tasks</h3>
        ${childTasks.length ? childTasks.map(t => smallLine(t.title, `${t.due ? formatDate(t.due) : "No due date"} · ${t.category}`)).join("") : `<div class="empty">No open tasks.</div>`}
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
      <div class="item routine-row">
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
  if (!items.length) {
    container.innerHTML = `<div class="empty">${escapeHtml(emptyText)}</div>`;
    return;
  }
  container.innerHTML = items.map(renderer).join("");
}

function renderSimpleList(containerId, items, emptyText) {
  const container = document.getElementById(containerId);
  if (!items.length) {
    container.innerHTML = `<div class="empty">${escapeHtml(emptyText)}</div>`;
    return;
  }
  container.innerHTML = items.map(item => smallLine(item.title, item.meta)).join("");
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

function renderTaskItem(task) {
  const dueClass = task.due && task.due <= todayIso() && !task.done ? "due" : "";
  return `
    <div class="item">
      <div class="item-main">
        <div class="item-title ${task.done ? "done-text" : ""}">${escapeHtml(task.title)}</div>
        <div class="item-meta">
          <span class="badge">${escapeHtml(task.owner || "Unassigned")}</span>
          <span class="badge ${dueClass}">${task.due ? formatDate(task.due) : "No due date"}</span>
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

function sortTasks(a, b) {
  return Number(a.done) - Number(b.done)
    || (a.due || "9999-99-99").localeCompare(b.due || "9999-99-99")
    || (b.priority === "High") - (a.priority === "High")
    || a.title.localeCompare(b.title);
}

function sortEvents(a, b) {
  return (a.date || "").localeCompare(b.date || "") || (a.time || "").localeCompare(b.time || "") || a.title.localeCompare(b.title);
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

  const filter = event.target.closest("[data-task-filter]");
  if (filter) {
    taskFilter = filter.dataset.taskFilter;
    document.querySelectorAll("[data-task-filter]").forEach(f => f.classList.remove("active"));
    filter.classList.add("active");
    renderTasks();
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
  if (action === "toggleShopping") {
    const item = state.shopping.find(i => i.id === id);
    if (item) item.done = !item.done;
  }
  if (action === "deleteShopping") state.shopping = state.shopping.filter(i => i.id !== id);
  if (action === "taskFromEvent") {
    const event = state.events.find(e => e.id === id);
    if (event) {
      state.tasks.push({
        id: uid(),
        title: `Prepare for ${event.title}`,
        owner: "Both",
        due: event.date ? addDays(new Date(event.date), -1) : "",
        category: "Kids Activity",
        priority: "Normal",
        done: false,
        createdAt: Date.now()
      });
    }
  }
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

document.getElementById("quickForm").addEventListener("submit", event => {
  event.preventDefault();
  const text = document.getElementById("quickText").value.trim();
  const requested = document.getElementById("quickType").value;
  if (!text) return;
  const type = inferQuickType(text, requested);

  if (type === "shopping") {
    const cleaned = text.replace(/^(buy|shopping)\s*:?/i, "").trim();
    cleaned.split(",").map(x => x.trim()).filter(Boolean).forEach(name => {
      state.shopping.push({ id: uid(), name, store: "Grocery", done: false, createdAt: Date.now() });
    });
  } else if (type === "event") {
    state.events.push({
      id: uid(),
      title: text,
      person: "All family",
      date: extractDate(text) || todayIso(),
      time: extractTime(text),
      location: "",
      notes: "Added from quick capture",
      createdAt: Date.now()
    });
  } else if (type === "note") {
    state.notes.push({ id: uid(), text, createdAt: Date.now() });
    state.tasks.push({ id: uid(), title: `Review note: ${text}`, owner: "Both", due: "", category: "Other", priority: "Low", done: false, createdAt: Date.now() });
  } else {
    state.tasks.push({
      id: uid(),
      title: text,
      owner: "Both",
      due: extractDate(text),
      category: "Other",
      priority: "Normal",
      done: false,
      createdAt: Date.now()
    });
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
  state.settings.children = document.getElementById("childrenNames").value
    .split(",")
    .map(x => x.trim())
    .filter(Boolean);
  saveState();
  render();
});

document.getElementById("exportBtn").addEventListener("click", () => {
  const data = JSON.stringify(state, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `family-command-center-backup-${todayIso()}.json`;
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById("importFile").addEventListener("change", event => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      state = JSON.parse(reader.result);
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
  state = structuredClone(demoData);
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

render();
