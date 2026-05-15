const STORAGE_KEY = "family-command-center-state";
const CLOUD_FAMILY_ID_KEY = "family-command-center-cloud-family-id";
const LEGACY_CLOUD_FAMILY_ID_KEYS = [
  "family-command-center-cloud-family-id-v4-8",
  "family-command-center-cloud-family-id-v4-7-2",
  "family-command-center-cloud-family-id-v4-7-1",
  "family-command-center-cloud-family-id-v4-7",
  "family-command-center-cloud-family-id-v4-6",
  "family-command-center-cloud-family-id-v4-5",
  "family-command-center-cloud-family-id-v4-4",
  "family-command-center-cloud-family-id-v4-3",
  "family-command-center-cloud-family-id-v4-2",
  "family-command-center-cloud-family-id-v4-1",
  "family-command-center-cloud-family-id-v4"
];
const FIREBASE_SDK_VERSION = "12.13.0";

const LEGACY_STATE_KEYS = [
  "family-command-center-v4-8",
  "family-command-center-v4-7-2",
  "family-command-center-v4-7-1",
  "family-command-center-v4-7",
  "family-command-center-v4-6",
  "family-command-center-v4-5",
  "family-command-center-v4-4",
  "family-command-center-v4-3",
  "family-command-center-v4-2",
  "family-command-center-v4-1",
  "family-command-center-v4",
  "family-command-center-v2"
];

const LEGACY_CALENDAR_SELECTED_ID_KEYS = [
  "family-command-center-calendar-selected-id-v4-8",
  "family-command-center-calendar-selected-id-v4-7-2",
  "family-command-center-calendar-selected-id-v4-7-1",
  "family-command-center-calendar-selected-id-v4-7",
  "family-command-center-calendar-selected-id-v4-5"
];

const LEGACY_CALENDAR_CACHE_KEYS = [
  "family-command-center-calendar-events-cache-v4-8",
  "family-command-center-calendar-events-cache-v4-7-2",
  "family-command-center-calendar-events-cache-v4-7-1",
  "family-command-center-calendar-events-cache-v4-7",
  "family-command-center-calendar-events-cache-v4-5"
];

const LEGACY_CALENDAR_TOKEN_KEYS = [
  "family-command-center-calendar-token-v4-8",
  "family-command-center-calendar-token-v4-7-2",
  "family-command-center-calendar-token-v4-7-1",
  "family-command-center-calendar-token-v4-7",
  "family-command-center-calendar-token-v4-5"
];

const CALENDAR_TOKEN_KEY = "family-command-center-calendar-token";
const CALENDAR_SELECTED_ID_KEY = "family-command-center-calendar-selected-id";
const CALENDAR_CACHE_KEY = "family-command-center-calendar-events-cache";
const GOOGLE_CALENDAR_READONLY_SCOPE = "https://www.googleapis.com/auth/calendar.readonly";

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
      { id: uid(), text: "Check if basketball payment was made", type: "Payments", createdAt: Date.now() },
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
      { id: uid(), title: "Math homework - chapter practice", child: "Kid 1", type: "School", subject: "Math", due: addDays(todayIso(), 2), priority: "Normal", status: "Open", notes: "Check workbook", createdAt: Date.now() },
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
  const saved = migrateLocalStorageValue(STORAGE_KEY, LEGACY_STATE_KEYS, localStorage);
  if (!saved) return demoData();
  try {
    const normalized = normalizeState(JSON.parse(saved));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  } catch {
    return demoData();
  }
}


/* ===== V4.8.27 Manual Save Mode / No Auto Write Loop ===== */
const MANUAL_SAVE_MODE = true;
const MANUAL_PENDING_KEY = "family-command-center-manual-pending-local-change";

function setManualSaveStatus(message, level = "warn") {
  const el = document.getElementById("manualSaveStatus");
  if (el) {
    el.textContent = message;
    el.className = `manual-save-status ${level === "good" ? "good" : level === "bad" ? "bad" : ""}`;
  }
  if (typeof setGlobalSaveBar === "function") {
    setGlobalSaveBar(message, level);
  }
  if (typeof setCloudStatus === "function") {
    setCloudStatus(message, level);
  }
}

function markManualPending(reason = "local change") {
  try {
    localStorage.setItem(MANUAL_PENDING_KEY, JSON.stringify({
      reason,
      at: new Date().toISOString(),
      version: typeof APP_VERSION !== "undefined" ? APP_VERSION : "4.8.27"
    }));
  } catch {}
  renderManualSaveStatus();
  if (typeof renderGlobalSaveBarStatus === "function") renderGlobalSaveBarStatus();
}

function clearManualPending() {
  try {
    localStorage.removeItem(MANUAL_PENDING_KEY);
  } catch {}
  renderManualSaveStatus();
  if (typeof renderGlobalSaveBarStatus === "function") renderGlobalSaveBarStatus();
}

function getManualPending() {
  try {
    const raw = localStorage.getItem(MANUAL_PENDING_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function renderManualSaveStatus() {
  const pending = getManualPending();
  if (pending?.at) {
    setManualSaveStatus(`Manual save mode active. Local changes are pending since ${new Date(pending.at).toLocaleTimeString([], { hour: "numeric", minute: "2-digit", second: "2-digit" })}. Click Save local changes to cloud when ready.`, "warn");
  } else {
    setManualSaveStatus("Manual save mode active. No pending local change flag. No automatic cloud writes will run.", "good");
  }
}

function getProjectIdForManualRestSave() {
  return window.FAMILY_FIREBASE_CONFIG?.projectId
    || window.firebaseConfig?.projectId
    || window.FIREBASE_CONFIG?.projectId
    || "";
}

function manualRestValue(value) {
  if (value === null || typeof value === "undefined") return { nullValue: null };
  if (typeof value === "string") return { stringValue: value };
  if (typeof value === "boolean") return { booleanValue: value };
  if (typeof value === "number") {
    if (Number.isInteger(value)) return { integerValue: String(value) };
    return { doubleValue: value };
  }
  if (Array.isArray(value)) {
    return { arrayValue: { values: value.map(item => manualRestValue(item)) } };
  }
  if (typeof value === "object") {
    const fields = {};
    Object.entries(value).forEach(([key, val]) => {
      if (typeof val !== "undefined") fields[key] = manualRestValue(val);
    });
    return { mapValue: { fields } };
  }
  return { stringValue: String(value) };
}

function manualRestFields(object) {
  const fields = {};
  Object.entries(object || {}).forEach(([key, value]) => {
    if (typeof value !== "undefined") fields[key] = manualRestValue(value);
  });
  return fields;
}

function manualEncodeDocPath(path) {
  return String(path || "")
    .split("/")
    .filter(Boolean)
    .map(part => encodeURIComponent(part))
    .join("/");
}

async function manualRestPatch(docPath, fieldsObject, timeoutMs = 30000) {
  if (!cloud.user) throw new Error("Not signed in.");

  const projectId = getProjectIdForManualRestSave();
  if (!projectId) throw new Error("Missing Firebase projectId.");

  const token = await cloud.user.getIdToken(true);
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${manualEncodeDocPath(docPath)}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ fields: manualRestFields(fieldsObject) }),
      signal: controller.signal
    });

    const text = await response.text();
    let payload = null;
    try { payload = text ? JSON.parse(text) : null; } catch { payload = text; }

    if (!response.ok) {
      const message = payload?.error?.message || response.statusText || text || "Unknown REST save error";
      throw new Error(`Manual cloud save failed ${response.status}: ${message}`);
    }

    return payload;
  } finally {
    clearTimeout(timer);
  }
}

function manualStateSummary() {
  try {
    return {
      tasks: state.tasks?.length || 0,
      events: state.events?.length || 0,
      payments: state.payments?.length || 0,
      shopping: state.shopping?.length || 0,
      schoolItems: state.schoolItems?.length || 0,
      chores: state.chores?.length || 0,
      bytes: new Blob([JSON.stringify(state)]).size
    };
  } catch {
    return { bytes: 0 };
  }
}

async function manualSaveLocalChangesToCloud() {
  try {
    await ensureFirebase();

    if (!cloud.user) {
      throw new Error("Sign in first.");
    }

    const familyId = String(cloud.familyId || getStoredFamilyId() || "").trim().toUpperCase();
    if (!familyId) {
      throw new Error("Missing Family ID.");
    }

    setManualSaveStatus("Saving local changes to cloud manually. Please wait...", "warn");

    await manualRestPatch(
      `families/${familyId}/state/main`,
      {
        data: state,
        updatedBy: cloud.user.uid,
        updatedByEmail: cloud.user.email || "",
        clientUpdatedAt: new Date().toISOString(),
        appVersion: typeof APP_VERSION !== "undefined" ? APP_VERSION : "4.8.27",
        writeMethod: "manual-save-mode",
        clientSummary: manualStateSummary()
      },
      30000
    );

    clearManualPending();
    setManualSaveStatus(`Manual cloud save completed for ${cloud.user.email || "signed-in user"}.`, "good");
    if (typeof addDiagnosticInfo === "function") {
      addDiagnosticInfo(
        "Manual cloud save",
        "Manual save succeeded",
        "Local state was saved to Firestore with manual-save-mode.",
        "Other devices should use Pull latest from cloud before editing.",
        "good",
        `familyId=${familyId}`
      );
    }
  } catch (error) {
    markManualPending("manual cloud save failed");
    setManualSaveStatus(`Manual cloud save failed: ${error.message}`, "bad");
    if (typeof addDiagnostic === "function") addDiagnostic("Manual cloud save", error, "bad");
  }
}

async function pullLatestManualFromCloud() {
  try {
    await ensureFirebase();

    const familyId = String(cloud.familyId || getStoredFamilyId() || "").trim().toUpperCase();
    if (!cloud.user || !familyId) throw new Error("Sign in and connect to family space first.");

    if (getManualPending()) {
      const ok = confirm("You have local pending changes. Pulling latest from cloud may overwrite them. Continue?");
      if (!ok) return;
    }

    const stateRef = cloud.fb.doc(cloud.db, "families", familyId, "state", "main");
    const snap = await cloud.fb.getDoc(stateRef);

    if (!snap.exists() || !snap.data()?.data) throw new Error("Cloud state/main is missing.");

    cloud.applyingRemote = true;
    state = normalizeState(snap.data().data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    cloud.applyingRemote = false;
    cloud.ready = true;

    clearManualPending();
    setManualSaveStatus("Pulled latest cloud data. Local pending flag cleared.", "good");
    render();
  } catch (error) {
    setManualSaveStatus(`Pull latest failed: ${error.message}`, "bad");
    if (typeof addDiagnostic === "function") addDiagnostic("Manual pull latest", error, "bad");
  }
}

function clearPendingManualFlag() {
  clearManualPending();
  setManualSaveStatus("Pending local flag cleared. This does not delete app data.", "good");
}


/* ===== V4.8.28 Global Manual Save Bar ===== */
function setGlobalSaveBar(message, level = "warn") {
  const bar = document.getElementById("globalManualSaveBar");
  const text = document.getElementById("globalManualSaveText");
  if (!bar || !text) return;

  bar.classList.remove("good", "bad", "warn");
  if (level === "good") bar.classList.add("good");
  else if (level === "bad") bar.classList.add("bad");
  else bar.classList.add("warn");

  text.textContent = message;
}

function renderGlobalSaveBarStatus() {
  const pending = typeof getManualPending === "function" ? getManualPending() : null;
  if (pending?.at) {
    setGlobalSaveBar(`Unsaved local changes · ${new Date(pending.at).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`, "warn");
  } else {
    setGlobalSaveBar("Manual save mode · no pending changes", "good");
  }
}

function wireGlobalManualSaveBar() {
  document.getElementById("globalSaveToCloudBtn")?.addEventListener("click", async () => {
    const btn = document.getElementById("globalSaveToCloudBtn");
    const original = btn?.textContent || "Save to cloud";
    try {
      if (btn) {
        btn.disabled = true;
        btn.textContent = "Saving...";
      }
      await manualSaveLocalChangesToCloud();
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = original;
      }
      renderGlobalSaveBarStatus();
    }
  });

  document.getElementById("globalPullLatestBtn")?.addEventListener("click", async () => {
    const btn = document.getElementById("globalPullLatestBtn");
    const original = btn?.textContent || "Pull latest";
    try {
      if (btn) {
        btn.disabled = true;
        btn.textContent = "Pulling...";
      }
      await pullLatestManualFromCloud();
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = original;
      }
      renderGlobalSaveBarStatus();
    }
  });

  renderGlobalSaveBarStatus();
}
/* ===== End V4.8.28 Global Manual Save Bar ===== */


function wireManualSaveControls() {
  document.getElementById("manualSaveToCloudBtn")?.addEventListener("click", manualSaveLocalChangesToCloud);
  document.getElementById("pullLatestManualBtn")?.addEventListener("click", pullLatestManualFromCloud);
  document.getElementById("clearPendingManualBtn")?.addEventListener("click", clearPendingManualFlag);
  renderManualSaveStatus();
}
/* ===== End V4.8.27 Manual Save Mode ===== */


function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  markManualPending("local change saved locally");
  // Manual save mode: never auto-write to Firestore from saveState().
}



function getFirstStoredValue(keys, storage = localStorage) {
  for (const key of keys) {
    const value = storage.getItem(key);
    if (value) return value;
  }
  return "";
}

function migrateLocalStorageValue(stableKey, legacyKeys, storage = localStorage) {
  const stableValue = storage.getItem(stableKey);
  if (stableValue) return stableValue;

  const legacyValue = getFirstStoredValue(legacyKeys, storage);
  if (legacyValue) {
    storage.setItem(stableKey, legacyValue);
    return legacyValue;
  }

  return "";
}

function loadCalendarCache() {
  try {
    const raw = migrateLocalStorageValue(CALENDAR_CACHE_KEY, LEGACY_CALENDAR_CACHE_KEYS, localStorage) || "[]";
    const cached = JSON.parse(raw);
    return Array.isArray(cached) ? cached : [];
  } catch {
    return [];
  }
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

let calendar = {
  accessToken: migrateLocalStorageValue(CALENDAR_TOKEN_KEY, LEGACY_CALENDAR_TOKEN_KEYS, sessionStorage) || "",
  selectedCalendarId: migrateLocalStorageValue(CALENDAR_SELECTED_ID_KEY, LEGACY_CALENDAR_SELECTED_ID_KEYS, localStorage) || "",
  calendars: [],
  events: loadCalendarCache(),
  connectedEmail: "",
  lastLoadedAt: "",
  loading: false,
  error: ""
};

let cloud = {
  configured: false,
  initialized: false,
  ready: false,
  user: null,
  familyId: getStoredFamilyId(),
  familyDoc: null,
  unsubscribeFamily: null,
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
  if (typeof renderManualSaveStatus === "function") setTimeout(renderManualSaveStatus, 0);
  if (typeof renderGlobalSaveBarStatus === "function") setTimeout(renderGlobalSaveBarStatus, 0);
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
  renderGoogleCalendar();
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




function getFamilyCalendarConfig() {
  return cloud.familyDoc?.calendarConfig || {};
}


// V4.8.3 safety helpers.
// These prevent calendar/admin code from failing if a role helper was missing after an update.
function getCurrentRole() {
  if (!cloud || !cloud.user) return "guest";

  const member = typeof getCurrentMemberRecord === "function" ? getCurrentMemberRecord() : null;
  const memberRole = String(member?.role || "").toLowerCase();

  if (["owner", "admin", "parent", "kid", "viewer"].includes(memberRole)) return memberRole;
  if (cloud.familyDoc?.createdBy && cloud.familyDoc.createdBy === cloud.user.uid) return "owner";
  if (typeof isFamilyAdminUser === "function" && isFamilyAdminUser()) return "admin";

  // Safe default for existing family members before roles are fully assigned.
  return "parent";
}

function isParentRole(role = getCurrentRole()) {
  return ["owner", "admin", "parent"].includes(String(role || "").toLowerCase());
}

function isKidRole(role = getCurrentRole()) {
  return String(role || "").toLowerCase() === "kid";
}

function getKidLinkedChildName() {
  const member = typeof getCurrentMemberRecord === "function" ? getCurrentMemberRecord() : null;
  if (member?.childName) return member.childName;
  return state?.settings?.children?.[0] || "Kid 1";
}

function applyRoleBasedView() {
  const role = getCurrentRole();
  const isKid = isKidRole(role) || role === "viewer";

  document.body.dataset.role = role;

  const banner = document.getElementById("roleBanner");
  const title = document.getElementById("roleBannerTitle");
  const text = document.getElementById("roleBannerText");

  if (banner && cloud?.user) {
    banner.classList.remove("hidden");
    if (title) title.textContent = isKid ? "Kid view" : "Parent view";
    if (text) text.textContent = isKid
      ? "You can focus on homework, exams, chores, activities, and requests."
      : "You can manage the full family dashboard.";
  }

  document.querySelectorAll("[data-roles='parent'], .parent-only").forEach(el => {
    el.classList.toggle("hidden", isKid);
  });

  const kidCard = document.getElementById("kidDashboardCard");
  if (kidCard) kidCard.classList.toggle("hidden", !isKid);

  const kidRequestCard = document.getElementById("kidRequestCard");
  if (kidRequestCard) kidRequestCard.classList.toggle("hidden", !isKid);
}


function canManageFamilyCalendar() {
  try {
    return isParentRole() || (typeof isFamilyAdminUser === "function" && isFamilyAdminUser());
  } catch {
    return Boolean(cloud?.user);
  }
}

function renderFamilyCalendarPanel() {
  const panel = document.getElementById("familyCalendarPanel");
  const status = document.getElementById("familyCalendarStatus");
  const saveBtn = document.getElementById("saveFamilyCalendarBtn");
  const clearBtn = document.getElementById("clearFamilyCalendarBtn");

  if (!panel) return;

  // Show the panel whenever the Calendar tab exists. It should explain what is missing
  // instead of disappearing silently.
  panel.classList.remove("hidden");

  const cfg = getFamilyCalendarConfig();
  const selected = calendar.calendars.find(c => c.id === calendar.selectedCalendarId);
  const canManage = canManageFamilyCalendar();
  const signedIn = Boolean(cloud.user);
  const inFamilySpace = Boolean(cloud.familyId);
  const connectedCalendar = Boolean(calendar.accessToken);
  const hasSelectedCalendar = Boolean(calendar.selectedCalendarId && selected);

  let message = "";

  if (!signedIn) {
    message = "Sign in with Google first. Then connect Google Calendar and save the selected calendar as the family calendar.";
  } else if (!inFamilySpace) {
    message = "You are signed in, but not connected to a family space yet. Create or join a family space in Settings first.";
  } else if (!canManage) {
    message = "You are connected to the family space, but only parents/admins can save the family calendar setting.";
  } else if (!connectedCalendar) {
    message = "Connect Google Calendar first, then select the shared family calendar.";
  } else if (!hasSelectedCalendar) {
    message = "Google Calendar is connected. Select a calendar from the dropdown, then save it as the family calendar.";
  } else if (cfg.selectedCalendarId) {
    message = `Current family calendar: ${cfg.selectedCalendarName || cfg.selectedCalendarId}. Selected now: ${selected.summary || selected.id}.`;
  } else {
    message = `Ready to save: ${selected.summary || selected.id} as the family calendar.`;
  }

  if (status) status.textContent = message;

  if (saveBtn) {
    saveBtn.classList.remove("hidden");
    saveBtn.disabled = !(signedIn && inFamilySpace && canManage && connectedCalendar && hasSelectedCalendar);
    saveBtn.textContent = saveBtn.disabled
      ? "Save selected calendar as family calendar"
      : `Save "${selected.summary || selected.id}" as family calendar`;
  }

  if (clearBtn) {
    clearBtn.classList.remove("hidden");
    clearBtn.disabled = !(signedIn && inFamilySpace && canManage && cfg.selectedCalendarId);
  }
}

async function saveSelectedCalendarAsFamilyCalendar() {
  if (!canManageFamilyCalendar()) {
    alert("Only parents/admins can change the family calendar setting.");
    return;
  }

  if (!cloud.familyId || !cloud.db || !cloud.fb || !cloud.user) {
    alert("Sign in and join/create a family space first.");
    return;
  }

  if (!calendar.selectedCalendarId) {
    alert("Connect Google Calendar and select a calendar first.");
    return;
  }

  const selected = calendar.calendars.find(c => c.id === calendar.selectedCalendarId);
  if (!selected) {
    alert("Selected calendar was not found. Try refreshing calendars.");
    return;
  }

  const familyRef = cloud.fb.doc(cloud.db, "families", cloud.familyId);
  await cloud.fb.setDoc(familyRef, {
    calendarConfig: {
      selectedCalendarId: selected.id,
      selectedCalendarName: selected.summary || selected.id,
      updatedBy: cloud.user.uid,
      updatedByEmail: cloud.user.email || "",
      updatedAt: cloud.fb.serverTimestamp()
    }
  }, { merge: true });

  cloud.familyDoc = {
    ...(cloud.familyDoc || {}),
    calendarConfig: {
      selectedCalendarId: selected.id,
      selectedCalendarName: selected.summary || selected.id,
      updatedBy: cloud.user.uid,
      updatedByEmail: cloud.user.email || ""
    }
  };

  renderGoogleCalendar();
  alert("Family calendar setting was saved.");
}

async function clearFamilyCalendarSetting() {
  if (!canManageFamilyCalendar()) {
    alert("Only parents/admins can change the family calendar setting.");
    return;
  }

  if (!confirm("Clear the family calendar setting for this family space?")) return;

  const familyRef = cloud.fb.doc(cloud.db, "families", cloud.familyId);
  await cloud.fb.setDoc(familyRef, {
    calendarConfig: {
      selectedCalendarId: "",
      selectedCalendarName: "",
      updatedBy: cloud.user.uid,
      updatedByEmail: cloud.user.email || "",
      updatedAt: cloud.fb.serverTimestamp()
    }
  }, { merge: true });

  cloud.familyDoc = {
    ...(cloud.familyDoc || {}),
    calendarConfig: {
      selectedCalendarId: "",
      selectedCalendarName: ""
    }
  };

  renderGoogleCalendar();
}

function applyFamilyCalendarPreference() {
  const cfg = getFamilyCalendarConfig();
  if (!cfg.selectedCalendarId || !calendar.calendars.length) return false;

  const found = calendar.calendars.find(c => c.id === cfg.selectedCalendarId);
  if (!found) return false;

  if (calendar.selectedCalendarId !== found.id) {
    calendar.selectedCalendarId = found.id;
    localStorage.setItem(CALENDAR_SELECTED_ID_KEY, calendar.selectedCalendarId);
    return true;
  }

  return false;
}


function setGoogleCalendarStatus(message, level = "warn") {
  const el = document.getElementById("googleCalendarStatus");
  if (!el) return;
  el.textContent = message;
  el.className = `cloud-status ${level}`;
}

function renderGoogleCalendar() {
  renderGoogleCalendarStatus();
  renderCalendarSelect();
  renderFamilyCalendarPanel();
  renderGoogleCalendarDashboard();
  renderGoogleCalendarList();
}

function renderGoogleCalendarStatus() {
  if (!document.getElementById("googleCalendarStatus")) return;

  if (!cloud.user) {
    setGoogleCalendarStatus("Sign in with Google first, then connect Google Calendar.", "warn");
    return;
  }

  if (!calendar.accessToken) {
    setGoogleCalendarStatus("Google Calendar is not connected yet. Click Connect Google Calendar. If a family calendar is configured, it will auto-select after connection.", "warn");
    return;
  }

  if (calendar.loading) {
    setGoogleCalendarStatus("Loading Google Calendar events...", "warn");
    return;
  }

  if (calendar.error) {
    setGoogleCalendarStatus(calendar.error, "bad");
    return;
  }

  const selected = calendar.calendars.find(c => c.id === calendar.selectedCalendarId);
  const label = selected ? selected.summary : "selected calendar";
  const loaded = calendar.lastLoadedAt ? ` Last refresh: ${new Date(calendar.lastLoadedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}.` : "";
  setGoogleCalendarStatus(`Connected to Google Calendar${selected ? `: ${label}` : ""}.${loaded}`, "good");
}

function renderCalendarSelect() {
  const select = document.getElementById("calendarSelect");
  if (!select) return;

  if (!calendar.calendars.length) {
    select.innerHTML = `<option value="">Connect first</option>`;
    return;
  }

  select.innerHTML = calendar.calendars.map(cal => {
    const selected = cal.id === calendar.selectedCalendarId ? "selected" : "";
    const primary = cal.primary ? " — primary" : "";
    return `<option value="${escapeHtml(cal.id)}" ${selected}>${escapeHtml(cal.summary || cal.id)}${primary}</option>`;
  }).join("");
}

function renderGoogleCalendarDashboard() {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const todayEvents = calendar.events
    .filter(event => isSameLocalDay(event.startDate, today))
    .slice(0, 6);

  renderList("todayGoogleCalendar", todayEvents, renderGoogleCalendarEventItem, calendar.accessToken ? "No Google Calendar events today." : "Connect Google Calendar from the Calendar tab.");
}

function renderGoogleCalendarList() {
  renderList("googleCalendarList", calendar.events, renderGoogleCalendarEventItem, calendar.accessToken ? "No upcoming Google Calendar events found." : "Connect Google Calendar to load upcoming events.");
}

function isSameLocalDay(isoValue, date) {
  if (!isoValue) return false;
  const d = new Date(isoValue);
  return d.getFullYear() === date.getFullYear()
    && d.getMonth() === date.getMonth()
    && d.getDate() === date.getDate();
}

function formatGoogleCalendarDateRange(event) {
  const start = new Date(event.startDate);
  const end = event.endDate ? new Date(event.endDate) : null;

  if (event.allDay) {
    return `${start.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })} · All day`;
  }

  const startLabel = start.toLocaleString(undefined, { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
  const endLabel = end ? end.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }) : "";
  return endLabel ? `${startLabel} – ${endLabel}` : startLabel;
}

function renderGoogleCalendarEventItem(event) {
  return `
    <div class="item">
      <div class="item-main">
        <div class="item-title">${escapeHtml(event.summary || "Untitled event")}</div>
        <div class="item-meta">
          <span class="badge calendar">Google Calendar</span>
          <span class="badge">${escapeHtml(formatGoogleCalendarDateRange(event))}</span>
          ${event.location ? `<span class="badge">${escapeHtml(event.location)}</span>` : ""}
          ${event.calendarSummary ? `<span class="badge">${escapeHtml(event.calendarSummary)}</span>` : ""}
        </div>
      </div>
      <div class="item-actions">
        ${event.htmlLink ? `<a class="icon-btn" href="${escapeHtml(event.htmlLink)}" target="_blank" rel="noopener">Open</a>` : ""}
      </div>
    </div>
  `;
}

async function connectGoogleCalendar() {
  const btn = document.getElementById("connectCalendarBtn");
  const originalText = btn?.textContent || "Connect Google Calendar";

  try {
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Opening Google permission window...";
    }

    calendar.loading = true;
    calendar.error = "";
    setGoogleCalendarStatus("Opening Google permission window. If nothing appears, check if the browser blocked a popup.", "warn");
    renderGoogleCalendar();

    await ensureFirebase();
    if (!cloud.user) throw new Error("Sign in with Google first in Settings, wait until Cloud sync is active, then connect Google Calendar.");

    const provider = new cloud.fb.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    provider.addScope(GOOGLE_CALENDAR_READONLY_SCOPE);
    provider.setCustomParameters({ prompt: "consent select_account" });

    const result = await cloud.fb.signInWithPopup(cloud.auth, provider);
    const credential = cloud.fb.GoogleAuthProvider.credentialFromResult(result);
    if (!credential || !credential.accessToken) {
      throw new Error("Google did not return a Calendar access token. Try connecting again and approve Calendar read-only access.");
    }

    calendar.accessToken = credential.accessToken;
    calendar.connectedEmail = result.user?.email || "";
    sessionStorage.setItem(CALENDAR_TOKEN_KEY, calendar.accessToken);

    setGoogleCalendarStatus("Google Calendar permission approved. Loading calendars...", "warn");
    renderGoogleCalendar();

    await loadGoogleCalendars();
    await loadGoogleCalendarEvents();

    setGoogleCalendarStatus("Google Calendar connected successfully.", "good");
  } catch (error) {
    let message = error.message || String(error);

    if (message.includes("popup") || message.includes("closed-by-user")) {
      message = "Google Calendar connection was cancelled or the popup was blocked. Allow popups for this site and try again.";
    }

    if (message.includes("requests-from-referer") || message.includes("API key")) {
      message = "Google blocked the request because the API key website restriction does not allow this GitHub Pages URL. Add https://fadlon1980.github.io/* and https://fadlon1980.github.io/Family-Command-Center/* to the API key website restrictions.";
    }

    calendar.error = `Google Calendar connection failed: ${message}`;
    setGoogleCalendarStatus(calendar.error, "bad");
  } finally {
    calendar.loading = false;
    if (btn) {
      btn.disabled = false;
      btn.textContent = originalText;
    }
    renderGoogleCalendar();
  }
}

async function refreshGoogleCalendar() {
  try {
    if (!calendar.accessToken) {
      throw new Error("Connect Google Calendar first.");
    }

    calendar.loading = true;
    calendar.error = "";
    renderGoogleCalendar();

    if (!calendar.calendars.length) await loadGoogleCalendars();
    await loadGoogleCalendarEvents();
  } catch (error) {
    calendar.error = `Could not refresh Google Calendar: ${error.message}`;
  } finally {
    calendar.loading = false;
    renderGoogleCalendar();
  }
}

async function calendarFetch(url) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${calendar.accessToken}`
    }
  });

  if (response.status === 401) {
    sessionStorage.removeItem(CALENDAR_TOKEN_KEY);
    calendar.accessToken = "";
    throw new Error("Calendar permission expired. Please connect Google Calendar again.");
  }

  if (response.status === 403) {
    throw new Error("Calendar access was blocked. Make sure Google Calendar API is enabled in Google Cloud.");
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Google Calendar request failed with status ${response.status}.`);
  }

  return response.json();
}

async function loadGoogleCalendars() {
  const data = await calendarFetch("https://www.googleapis.com/calendar/v3/users/me/calendarList?minAccessRole=reader");
  calendar.calendars = (data.items || []).map(item => ({
    id: item.id,
    summary: item.summary || item.id,
    primary: Boolean(item.primary),
    accessRole: item.accessRole
  }));

  const appliedFamilyPreference = applyFamilyCalendarPreference();

  if (!appliedFamilyPreference && (!calendar.selectedCalendarId || !calendar.calendars.some(c => c.id === calendar.selectedCalendarId))) {
    const cfg = getFamilyCalendarConfig();
    const configuredCalendar = cfg.selectedCalendarId ? calendar.calendars.find(c => c.id === cfg.selectedCalendarId) : null;
    const familyCalendar = calendar.calendars.find(c => /family/i.test(c.summary || ""));
    const primaryCalendar = calendar.calendars.find(c => c.primary);
    calendar.selectedCalendarId = (configuredCalendar || familyCalendar || primaryCalendar || calendar.calendars[0] || {}).id || "";
    if (calendar.selectedCalendarId) localStorage.setItem(CALENDAR_SELECTED_ID_KEY, calendar.selectedCalendarId);
  }
}

async function loadGoogleCalendarEvents() {
  if (!calendar.selectedCalendarId) {
    calendar.events = [];
    return;
  }

  const now = new Date();
  const future = new Date();
  future.setDate(now.getDate() + 7);

  const params = new URLSearchParams({
    timeMin: now.toISOString(),
    timeMax: future.toISOString(),
    singleEvents: "true",
    orderBy: "startTime",
    maxResults: "30"
  });

  const selected = calendar.calendars.find(c => c.id === calendar.selectedCalendarId);
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendar.selectedCalendarId)}/events?${params.toString()}`;
  const data = await calendarFetch(url);

  calendar.events = (data.items || []).map(item => {
    const allDay = Boolean(item.start?.date);
    const startValue = item.start?.dateTime || `${item.start?.date}T00:00:00`;
    const endValue = item.end?.dateTime || (item.end?.date ? `${item.end.date}T00:00:00` : "");
    return {
      id: item.id,
      summary: item.summary || "Untitled event",
      location: item.location || "",
      htmlLink: item.htmlLink || "",
      startDate: startValue,
      endDate: endValue,
      allDay,
      calendarSummary: selected?.summary || ""
    };
  });

  calendar.lastLoadedAt = new Date().toISOString();
  localStorage.setItem(CALENDAR_CACHE_KEY, JSON.stringify(calendar.events));
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
    const itemType = lower.includes("exam") ? "Exam" : lower.includes("test") ? "Test" : lower.includes("quiz") ? "Quiz" : lower.includes("project") ? "Project" : lower.includes("reading") ? "Reading" : "School";
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

document.getElementById("resetBtn")?.addEventListener("click", () => {
  if (!isFamilyAdminUser()) {
    alert("Only family admins can reset data.");
    return;
  }
  if (!confirm("Reset local data and return to demo data?")) return;
  state = demoData();
  saveState();
  render();
});

document.getElementById("adminResetSharedBtn")?.addEventListener("click", resetSharedFamilyData);

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



function normalizeEmailList(input) {
  if (Array.isArray(input)) {
    return input.map(email => String(email || "").trim().toLowerCase()).filter(Boolean);
  }
  return String(input || "")
    .split(/[\n,;]+/)
    .map(email => email.trim().toLowerCase())
    .filter(Boolean);
}

function parseKidMappings(input) {
  if (Array.isArray(input)) return input;

  return String(input || "")
    .split(/\n+/)
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      const parts = line.split(/\s*=\s*|\s*:\s*|\s*->\s*/);
      if (parts.length < 2) return null;
      const email = String(parts[0] || "").trim().toLowerCase();
      const childName = String(parts.slice(1).join(" ").trim());
      if (!email || !childName) return null;
      return { email, childName };
    })
    .filter(Boolean);
}

function getRoleConfig() {
  const cfg = cloud.familyDoc?.roleConfig || {};
  const adminEmails = getConfiguredAdminEmails ? getConfiguredAdminEmails() : [];
  return {
    parentEmails: normalizeEmailList(cfg.parentEmails || adminEmails),
    kidMappings: Array.isArray(cfg.kidMappings) ? cfg.kidMappings : [],
    defaultRole: cfg.defaultRole || "viewer"
  };
}

function roleForEmail(email, uid = "") {
  email = String(email || "").trim().toLowerCase();
  const cfg = getRoleConfig();

  if (cloud.familyDoc?.createdBy && uid && cloud.familyDoc.createdBy === uid) {
    return { role: "owner", childName: "" };
  }

  if (cfg.parentEmails.includes(email)) {
    return { role: "parent", childName: "" };
  }

  const kid = cfg.kidMappings.find(item => String(item.email || "").toLowerCase() === email);
  if (kid) {
    return { role: "kid", childName: kid.childName || "" };
  }

  return { role: cfg.defaultRole || "viewer", childName: "" };
}

async function autoAssignCurrentUserRole() {
  if (!cloud.user || !cloud.familyId || !cloud.db || !cloud.fb) return;

  const member = typeof getCurrentMemberRecord === "function" ? getCurrentMemberRecord() : null;
  const assignment = roleForEmail(cloud.user.email || "", cloud.user.uid);

  const existingRole = String(member?.role || "").toLowerCase();
  const existingChildName = String(member?.childName || "");
  const assignedChildName = String(assignment.childName || "");

  // Phase 1 quota-burn fix:
  // If the stored role and childName already match, do not write.
  // This prevents onSnapshot -> setDoc -> onSnapshot loops.
  if (existingRole === assignment.role && existingChildName === assignedChildName) {
    return;
  }

  // Do not downgrade owner/admin unless the assignment is owner.
  if (["owner", "admin"].includes(existingRole) && assignment.role !== "owner") return;

  const memberRef = cloud.fb.doc(cloud.db, "families", cloud.familyId, "members", cloud.user.uid);

  await cloud.fb.setDoc(memberRef, {
    role: assignment.role,
    childName: assignedChildName || existingChildName,
    roleAutoAssigned: true,
    roleAutoAssignedBy: cloud.user.uid
    // Intentionally no serverTimestamp here.
    // serverTimestamp changes every write and can retrigger member listeners.
  }, { merge: true });
}


async function applyRoleRulesToAllMembers() {
  if (!isRoleSetupManager()) {
    alert("Only family owner/admin can apply role rules.");
    return;
  }

  if (!cloud.familyId || !cloud.db || !cloud.fb || !cloud.members.length) {
    alert("Family members are not loaded yet.");
    return;
  }

  let updatedCount = 0;

  for (const member of cloud.members) {
    const assignment = roleForEmail(member.email || "", member.uid);
    const currentRole = String(member.role || "").toLowerCase();
    const currentChildName = String(member.childName || "");
    const assignedChildName = String(assignment.childName || "");

    // Phase 1 quota-burn fix:
    // Skip members that already match to avoid unnecessary writes.
    if (currentRole === assignment.role && currentChildName === assignedChildName) {
      continue;
    }

    // Keep owner/admin safe unless matching owner.
    if (["owner", "admin"].includes(currentRole) && assignment.role !== "owner") continue;

    const ref = cloud.fb.doc(cloud.db, "families", cloud.familyId, "members", member.uid);

    await cloud.fb.setDoc(ref, {
      role: assignment.role,
      childName: assignedChildName || currentChildName,
      roleAutoAssigned: true,
      roleAutoAssignedBy: cloud.user.uid
      // Intentionally no serverTimestamp here.
    }, { merge: true });

    updatedCount += 1;
  }

  alert(updatedCount
    ? `Role rules were applied to ${updatedCount} member(s).`
    : "Role rules already matched all current family members. No writes were needed."
  );
}



function isRoleSetupManager() {
  if (!cloud || !cloud.user) return false;

  const email = String(cloud.user.email || "").toLowerCase();
  const adminEmails = typeof getConfiguredAdminEmails === "function" ? getConfiguredAdminEmails() : [];
  if (adminEmails.includes(email)) return true;

  const member = typeof getCurrentMemberRecord === "function" ? getCurrentMemberRecord() : null;
  const role = String(member?.role || "").toLowerCase();

  if (["owner", "admin"].includes(role)) return true;
  if (cloud.familyDoc?.createdBy && cloud.familyDoc.createdBy === cloud.user.uid) return true;

  return false;
}


function renderRoleSetupPanel() {
  const panel = document.getElementById("roleSetupPanel");
  const parentInput = document.getElementById("parentEmailsInput");
  const kidInput = document.getElementById("kidMappingsInput");
  const defaultSelect = document.getElementById("defaultRoleSelect");
  const summary = document.getElementById("roleRulesSummary");
  const note = document.getElementById("roleSetupVisibilityNote");

  if (!panel) return;

  const signedIn = Boolean(cloud.user);
  const inFamily = Boolean(cloud.familyId);
  const canManage = isRoleSetupManager();

  const show = signedIn && inFamily && canManage;
  panel.classList.toggle("hidden", !show);

  if (!show) {
    if (signedIn && inFamily && note) {
      note.textContent = "Automatic role assignment is hidden because this account is not recognized as owner/admin.";
    }
    return;
  }

  const cfg = getRoleConfig();

  if (parentInput && !parentInput.dataset.loaded) {
    parentInput.value = cfg.parentEmails.join("\n");
    parentInput.dataset.loaded = "true";
  }

  if (kidInput && !kidInput.dataset.loaded) {
    kidInput.value = cfg.kidMappings.map(item => `${item.email} = ${item.childName}`).join("\n");
    kidInput.dataset.loaded = "true";
  }

  if (defaultSelect && !defaultSelect.dataset.loaded) {
    defaultSelect.value = cfg.defaultRole || "viewer";
    defaultSelect.dataset.loaded = "true";
  }

  if (summary) {
    summary.innerHTML = `
      <div><strong>Signed in as:</strong> ${escapeHtml(cloud.user.email || "unknown")}</div>
      <div><strong>Your role:</strong> ${escapeHtml(getCurrentRole ? getCurrentRole() : "owner/admin")}</div>
      <div><strong>Parents/admin emails:</strong> ${cfg.parentEmails.length ? escapeHtml(cfg.parentEmails.join(", ")) : "None configured"}</div>
      <div><strong>Kid mappings:</strong> ${cfg.kidMappings.length ? escapeHtml(cfg.kidMappings.map(k => `${k.email} → ${k.childName}`).join(", ")) : "None configured"}</div>
      <div><strong>Default unknown role:</strong> ${escapeHtml(cfg.defaultRole || "viewer")}</div>
    `;
  }

  if (note) {
    note.textContent = "Visible because you are recognized as family owner/admin.";
  }
}

async function saveRoleSetupFromForm() {
  if (!isRoleSetupManager()) {
    alert("Only family owner/admin can save role rules.");
    return;
  }

  const parentEmails = normalizeEmailList(document.getElementById("parentEmailsInput")?.value || "");
  const kidMappings = parseKidMappings(document.getElementById("kidMappingsInput")?.value || "");
  const defaultRole = document.getElementById("defaultRoleSelect")?.value || "viewer";

  const familyRef = cloud.fb.doc(cloud.db, "families", cloud.familyId);
  await cloud.fb.setDoc(familyRef, {
    roleConfig: {
      parentEmails,
      kidMappings,
      defaultRole,
      updatedBy: cloud.user.uid,
      updatedByEmail: cloud.user.email || "",
      updatedAt: cloud.fb.serverTimestamp()
    }
  }, { merge: true });

  cloud.familyDoc = {
    ...(cloud.familyDoc || {}),
    roleConfig: { parentEmails, kidMappings, defaultRole }
  };

  // Allow the form to reload from saved values if needed.
  ["parentEmailsInput", "kidMappingsInput", "defaultRoleSelect"].forEach(id => {
    const el = document.getElementById(id);
    if (el) delete el.dataset.loaded;
  });

  renderRoleSetupPanel();
  await applyRoleRulesToAllMembers();
}

function wireRoleSetupControls() {
  document.getElementById("roleSetupForm")?.addEventListener("submit", async event => {
    event.preventDefault();
    try {
      await saveRoleSetupFromForm();
    } catch (error) {
      alert(`Could not save role rules: ${error.message}`);
    }
  });

  document.getElementById("applyRoleRulesBtn")?.addEventListener("click", async event => {
    event.preventDefault();
    try {
      await applyRoleRulesToAllMembers();
    } catch (error) {
      alert(`Could not apply role rules: ${error.message}`);
    }
  });
}


function getConfiguredAdminEmails() {
  return (window.FAMILY_ADMIN_EMAILS || [])
    .map(email => String(email || "").trim().toLowerCase())
    .filter(Boolean)
    .filter(email => !email.includes("your-email") && !email.includes("maayan-email"));
}

function getCurrentMemberRecord() {
  if (!cloud.user || !Array.isArray(cloud.members)) return null;
  return cloud.members.find(member => member.uid === cloud.user.uid) || null;
}

function isFamilyAdminUser() {
  if (!cloud.user) return false;

  const userEmail = String(cloud.user.email || "").toLowerCase();
  const configuredAdmins = getConfiguredAdminEmails();

  if (configuredAdmins.includes(userEmail)) return true;
  if (cloud.familyDoc?.createdBy && cloud.familyDoc.createdBy === cloud.user.uid) return true;

  const member = getCurrentMemberRecord();
  return ["owner", "admin"].includes(String(member?.role || "").toLowerCase());
}

function renderAdminControls() {
  const panel = document.getElementById("adminControls");
  if (!panel) return;

  const show = Boolean(cloud.user && cloud.familyId && isFamilyAdminUser());
  panel.classList.toggle("hidden", !show);
}

function createEmptyFamilyState() {
  return normalizeState({
    settings: state.settings || demoData().settings,
    tasks: [],
    events: [],
    payments: [],
    shopping: [],
    inbox: [],
    prepItems: [],
    decisions: [],
    adminItems: [],
    schoolItems: [],
    routines: {
      morning: [],
      evening: [],
      weekly: []
    }
  });
}

async function resetSharedFamilyData() {
  if (!isFamilyAdminUser()) {
    alert("Only family admins can reset the shared family data.");
    return;
  }

  if (!cloud.ready || !cloud.stateRef || !cloud.user) {
    alert("Cloud sync must be active before resetting shared data.");
    return;
  }

  const backupFirst = confirm(
    "This will clear shared tasks, homework, payments, shopping, planning items, events, and routines for the whole family.\\n\\n" +
    "Before resetting, it is recommended to click Export backup.\\n\\n" +
    "Continue?"
  );

  if (!backupFirst) return;

  const typed = prompt('Type RESET to confirm clearing the shared family data.');
  if (typed !== "RESET") {
    alert("Reset cancelled.");
    return;
  }

  state = createEmptyFamilyState();
  saveState();
  await saveCloudNow();
  render();
  alert("Shared family data was reset. Family settings and member access were kept.");
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
  } else if (cloud.user && cloud.familyId && !cloud.ready) {
    setCloudStatus(`Signed in as ${cloud.user.email || "user"}. Connecting to family space ${cloud.familyId}...`, "warn");
  } else {
    setCloudStatus(`Signed in as ${cloud.user.email || "user"}. Looking for your family space, or create/join one to start syncing.`, "warn");
  }

  if (logoutBtn) logoutBtn.classList.toggle("hidden", !cloud.user);

  renderFamilyMembers();
  renderAdminControls();

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
  // V4.8.27 manual save mode: presence writes disabled to avoid background write loops.
  return false;
}

function startPresenceHeartbeat() {
  // V4.8.27 manual save mode: presence heartbeat disabled to avoid background write loops.
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
    setPersistence: authMod.setPersistence,
    browserLocalPersistence: authMod.browserLocalPersistence,
    signOut: authMod.signOut,
    getFirestore: fsMod.getFirestore,
    doc: fsMod.doc,
    setDoc: fsMod.setDoc,
    getDoc: fsMod.getDoc,
    getDocs: fsMod.getDocs,
    collection: fsMod.collection,
    onSnapshot: fsMod.onSnapshot,
    serverTimestamp: fsMod.serverTimestamp
  };

  cloud.app = cloud.fb.initializeApp(window.FAMILY_FIREBASE_CONFIG);
  cloud.auth = cloud.fb.getAuth(cloud.app);
  cloud.db = cloud.fb.getFirestore(cloud.app);
  if (cloud.fb.setPersistence && cloud.fb.browserLocalPersistence) {
    await cloud.fb.setPersistence(cloud.auth, cloud.fb.browserLocalPersistence);
  }
  cloud.initialized = true;

  cloud.fb.onAuthStateChanged(cloud.auth, async user => {
    cloud.user = user;
    cloud.ready = false;
    if (!user) {
      stopPresenceHeartbeat();
      if (cloud.unsubscribeState) cloud.unsubscribeState();
      if (cloud.unsubscribeMembers) cloud.unsubscribeMembers();
      if (cloud.unsubscribeFamily) cloud.unsubscribeFamily();
      cloud.unsubscribeState = null;
      cloud.unsubscribeMembers = null;
      cloud.unsubscribeFamily = null;
      cloud.stateRef = null;
      cloud.memberRef = null;
      cloud.members = [];
      cloud.familyDoc = null;
      renderCloudPanel();
      return;
    }

    renderCloudPanel();
    scheduleFamilySpaceStatusCheck();

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
  // V4.8.27 manual save mode: skip optional user profile family mapping write on login to avoid quota loops.
  return false;
}



async function ensureOwnerMemberRecord(familyId, familyDoc) {
  // V4.8.27 manual save mode: skip optional owner/member repair write on login to avoid quota loops.
  return false;
}

function withTimeout(promise, ms, message) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(message)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

async function tryTimedOptionalStep(label, promise, ms = 4000) {
  try {
    await withTimeout(promise, ms, `${label} timed out.`);
    addDiagnosticInfo(label, `${label} completed`, "Optional repair/update completed successfully.", "", "good");
    return true;
  } catch (error) {
    cloud.lastError = error.message;
    addDiagnostic(label, error, "warn", {
      title: `${label} skipped`,
      cause: "This optional write/update did not complete quickly, but the app can continue because the main family data is readable.",
      action: "Continue using the app. If roles or family members look wrong, verify Firestore rules and member records later."
    });
    return false;
  }
}




async function recoverFamilySpaceAfterLogin() {
  await ensureFirebase();

  if (!cloud.user) {
    setCloudStatus("Signed in state is not ready yet. Please wait a moment and refresh if needed.", "warn");
    return false;
  }

  const candidates = [];

  const stored = getStoredFamilyId();
  if (stored) candidates.push(stored);

  try {
    const profileFamilyId = await getUserCurrentFamilyId();
    if (profileFamilyId) candidates.push(profileFamilyId);
  } catch (error) {
    cloud.lastError = error.message;
    // Do not stop here. Local saved family id may still work.
  }

  const uniqueCandidates = [...new Set(candidates.map(id => String(id || "").trim().toUpperCase()).filter(Boolean))];

  for (const familyId of uniqueCandidates) {
    try {
      setCloudStatus(`Signed in as ${cloud.user.email || "user"}. Connecting to family space ${familyId}...`, "warn");
      await connectFamily(familyId);
      renderCloudPanel();
      return true;
    } catch (error) {
      cloud.lastError = error.message;
    }
  }

  const reason = cloud.lastError ? ` Last error: ${cloud.lastError}` : "";
  setCloudStatus(`Signed in as ${cloud.user.email || "user"}. No family space auto-loaded. Use Create shared family space or Join existing family space below.${reason}`, "warn");
  renderCloudPanel();
  return false;
}

function scheduleFamilySpaceStatusCheck() {
  setTimeout(async () => {
    if (cloud.ready && cloud.familyId) {
      renderCloudPanel();
      return;
    }

    if (cloud.user) {
      await recoverFamilySpaceAfterLogin().catch(error => {
        setCloudStatus(`Signed in, but family space loading failed: ${error.message}`, "bad");
      });

      if (!cloud.ready && (cloud.familyId || getStoredFamilyId())) {
        await activateCloudFromReadableData().catch(error => {
          addDiagnostic("Auto activation fallback", error, "warn");
        });
      }
    }
  }, 1200);
}


async function signInWithGoogle() {
  setCloudStatus("Opening Google sign-in window. If nothing appears, check if the browser blocked a popup.", "warn");
  await ensureFirebase();

  const provider = new cloud.fb.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  const result = await cloud.fb.signInWithPopup(cloud.auth, provider);
  cloud.user = result.user;

  setCloudStatus(`Signed in as ${result.user?.email || "Google user"}. Checking family space...`, "warn");

  const recovered = await recoverFamilySpaceAfterLogin();
  if (!recovered) {
    scheduleFamilySpaceStatusCheck();
  }
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
  if (cloud.unsubscribeFamily) cloud.unsubscribeFamily();
  cloud.unsubscribeState = null;
  cloud.unsubscribeMembers = null;
  cloud.unsubscribeFamily = null;
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



const APP_VERSION = "4.8.30";
const diagnostics = {
  entries: [],
  maxEntries: 30
};

function nowTimeLabel() {
  return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit", second: "2-digit" });
}

function friendlyErrorDetails(error, context = "App") {
  const raw = (error?.message || String(error || "") || "").trim();
  const code = error?.code || "";
  const text = `${code} ${raw}`.toLowerCase();

  let title = `${context} issue`;
  let cause = raw || "Unknown error";
  let action = "Try refreshing the app. If it repeats, copy the diagnostic report and share it.";

  if (/permission|insufficient|permission-denied/.test(text)) {
    title = "Firestore permission problem";
    cause = "The app is signed in, but Firestore rules are blocking this read/write.";
    action = "Publish the latest firestore.rules in Firebase Console → Firestore Database → Rules, wait 1 minute, then click Reconnect now.";
  } else if (/not found|was not found|not-found/.test(text)) {
    title = "Family space or document not found";
    cause = "The saved Family ID points to a document that does not exist, or the shared state document is missing.";
    action = "Check Firestore → families → your Family ID. If it does not exist, clear cached Family ID and create/join a family space again.";
  } else if (/timed out|timeout/.test(text)) {
    title = "Connection timeout";
    cause = "The app waited for Firebase but did not get an answer in time.";
    action = "Check internet connection, refresh the page, then click Reconnect now. If it keeps happening, Firebase rules or the family document may be blocking the request.";
  } else if (/network|unavailable|failed to fetch|offline/.test(text)) {
    title = "Network connection problem";
    cause = "The browser could not reach Firebase or Google services.";
    action = "Check Wi-Fi/mobile data, disable VPN if used, then refresh.";
  } else if (/popup|closed-by-user|blocked/.test(text)) {
    title = "Popup blocked or closed";
    cause = "The Google sign-in/Calendar popup did not open or was closed.";
    action = "Allow popups for fadlon1980.github.io and try again in Chrome/Edge.";
  } else if (/operation-not-allowed/.test(text)) {
    title = "Sign-in provider disabled";
    cause = "Firebase Authentication provider is not enabled.";
    action = "Go to Firebase Authentication → Sign-in method and enable Google and/or Email/Password.";
  } else if (/unauthorized-domain/.test(text)) {
    title = "Unauthorized domain";
    cause = "Firebase Auth does not allow this GitHub Pages domain.";
    action = "Go to Firebase Authentication → Settings → Authorized domains and add fadlon1980.github.io.";
  } else if (/requests-from-referer|api key|referer/.test(text)) {
    title = "Google API key website restriction";
    cause = "Google blocked the request because this GitHub Pages URL is not allowed for the API key.";
    action = "In Google Cloud API key restrictions, allow https://fadlon1980.github.io/* and https://fadlon1980.github.io/Family-Command-Center/*.";
  } else if (/calendar api|status 403|access was blocked/.test(text)) {
    title = "Google Calendar API access problem";
    cause = "Calendar API is disabled, blocked, or missing permission.";
    action = "Enable Google Calendar API in Google Cloud project fadlon-family-hub, then reconnect Google Calendar.";
  } else if (/firebase config|not configured|family_firebase_config/.test(text)) {
    title = "Firebase configuration missing";
    cause = "The app could not find firebase-config.js or FAMILY_FIREBASE_CONFIG.";
    action = "Confirm firebase-config.js is uploaded to GitHub and contains window.FAMILY_FIREBASE_CONFIG.";
  } else if (/owner\/member repair|user profile family mapping|member access/.test(text)) {
    title = "Optional member/profile update is slow or blocked";
    cause = "The app can read your family data, but an optional write to repair the member record or save your profile mapping did not finish quickly.";
    action = "Use V4.8.12 or later. The app should continue loading. Later, verify your member record role is owner and Firestore rules are current.";
  } else if (/loading family|connecting to family/.test(text)) {
    title = "Family space did not finish loading";
    cause = "The app started connecting but did not complete all Firestore reads/listeners.";
    action = "Run connection check. It will show whether family document, member record, or shared state is failing.";
  }

  return { title, cause, action, technical: raw || code || "No technical message" };
}

function addDiagnostic(context, errorOrMessage, level = "warn", override = {}) {
  const details = typeof errorOrMessage === "string"
    ? friendlyErrorDetails(new Error(errorOrMessage), context)
    : friendlyErrorDetails(errorOrMessage, context);

  const entry = {
    time: nowTimeLabel(),
    level,
    context,
    ...details,
    ...override
  };

  diagnostics.entries.unshift(entry);
  diagnostics.entries = diagnostics.entries.slice(0, diagnostics.maxEntries);
  renderDiagnostics();
}

function addDiagnosticInfo(context, title, cause, action = "", level = "good", technical = "") {
  diagnostics.entries.unshift({
    time: nowTimeLabel(),
    level,
    context,
    title,
    cause,
    action,
    technical
  });
  diagnostics.entries = diagnostics.entries.slice(0, diagnostics.maxEntries);
  renderDiagnostics();
}

function renderDiagnostics() {
  const list = document.getElementById("diagnosticsList");
  const summary = document.getElementById("diagnosticsSummary");
  if (!list || !summary) return;

  const badCount = diagnostics.entries.filter(e => e.level === "bad").length;
  const warnCount = diagnostics.entries.filter(e => e.level === "warn").length;
  const goodCount = diagnostics.entries.filter(e => e.level === "good").length;

  summary.textContent = diagnostics.entries.length
    ? `${diagnostics.entries.length} diagnostic message(s): ${badCount} error(s), ${warnCount} warning(s), ${goodCount} OK check(s).`
    : "No diagnostic messages yet.";

  list.innerHTML = diagnostics.entries.map(entry => `
    <div class="diagnostic-item ${escapeHtml(entry.level || "warn")}">
      <div class="diagnostic-title">[${escapeHtml(entry.time)}] ${escapeHtml(entry.title)}</div>
      <div class="diagnostic-cause"><strong>Likely cause:</strong> ${escapeHtml(entry.cause || "")}</div>
      ${entry.action ? `<div class="diagnostic-action"><strong>What to do:</strong> ${escapeHtml(entry.action)}</div>` : ""}
      ${entry.technical ? `<div class="diagnostic-tech">${escapeHtml(entry.technical)}</div>` : ""}
    </div>
  `).join("");
}

function getDiagnosticReportText() {
  const lines = [
    `Family Command Center diagnostic report`,
    `App version: ${APP_VERSION}`,
    `URL: ${location.href}`,
    `Time: ${new Date().toISOString()}`,
    `Signed in email: ${cloud?.user?.email || "not signed in"}`,
    `User UID: ${cloud?.user?.uid || "not signed in"}`,
    `Family ID: ${cloud?.familyId || getStoredFamilyId?.() || "none"}`,
    `Cloud ready: ${Boolean(cloud?.ready)}`,
    `Last error: ${cloud?.lastError || "none"}`,
    `Manual pending local change: ${JSON.stringify(getManualPending?.() || null)}`,
    `User agent: ${navigator.userAgent}`,
    ``,
    `Diagnostics:`
  ];

  diagnostics.entries.forEach((entry, index) => {
    lines.push(`${index + 1}. [${entry.time}] ${entry.level?.toUpperCase()} - ${entry.title}`);
    lines.push(`   Cause: ${entry.cause}`);
    if (entry.action) lines.push(`   Action: ${entry.action}`);
    if (entry.technical) lines.push(`   Technical: ${entry.technical}`);
  });

  return lines.join("\n");
}

async function copyDiagnosticReport() {
  const text = getDiagnosticReportText();
  try {
    await navigator.clipboard.writeText(text);
    addDiagnosticInfo("Diagnostics", "Diagnostic report copied", "The report was copied to your clipboard.", "Paste it into ChatGPT if you want help debugging.", "good");
  } catch {
    prompt("Copy this diagnostic report:", text);
  }
}


async function activateCloudFromReadableData(familyId = cloud.familyId || getStoredFamilyId()) {
  await ensureFirebase();

  if (!cloud.user) {
    throw new Error("Sign in first before activating cloud sync.");
  }

  familyId = String(familyId || "").trim().toUpperCase();
  if (!familyId) {
    throw new Error("No Family ID is available.");
  }

  const familyRef = cloud.fb.doc(cloud.db, "families", familyId);
  const stateRef = cloud.fb.doc(cloud.db, "families", familyId, "state", "main");
  const membersRef = cloud.fb.collection(cloud.db, "families", familyId, "members");

  const familySnap = await withTimeout(cloud.fb.getDoc(familyRef), 8000, "Reading family document timed out during activation.");
  if (!familySnap.exists()) throw new Error(`Family document ${familyId} was not found.`);

  const memberRef = cloud.fb.doc(cloud.db, "families", familyId, "members", cloud.user.uid);
  const memberSnap = await withTimeout(cloud.fb.getDoc(memberRef), 8000, "Reading member record timed out during activation.");
  if (!memberSnap.exists()) throw new Error("Your member record is missing. Join the family space again or repair the member record.");

  const stateSnap = await withTimeout(cloud.fb.getDoc(stateRef), 8000, "Reading shared state timed out during activation.");
  if (!stateSnap.exists() || !stateSnap.data()?.data) {
    throw new Error("Shared family state document is missing or empty.");
  }

  // Stop old listeners before activating fresh listeners.
  if (cloud.unsubscribeState) cloud.unsubscribeState();
  if (cloud.unsubscribeMembers) cloud.unsubscribeMembers();
  if (cloud.unsubscribeFamily) cloud.unsubscribeFamily();
  cloud.unsubscribeState = null;
  cloud.unsubscribeMembers = null;
  cloud.unsubscribeFamily = null;

  cloud.familyId = familyId;
  cloud.familyDoc = familySnap.data();
  cloud.stateRef = stateRef;
  cloud.members = [];

  state = normalizeState(stateSnap.data().data);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  localStorage.setItem(CLOUD_FAMILY_ID_KEY, familyId);

  cloud.ready = true;
  cloud.lastError = "";
  setCloudStatus(`Cloud sync active for ${cloud.user.email || "signed-in user"}. Family ID: ${familyId}`, "good");

  // Start live listeners, but do not make the UI inactive if a listener has a delayed response.
  cloud.unsubscribeFamily = cloud.fb.onSnapshot(familyRef, snap => {
    if (!snap.exists()) return;
    cloud.familyDoc = snap.data();
    if (typeof applyFamilyCalendarPreference === "function") applyFamilyCalendarPreference();
    renderCloudPanel();
    if (typeof renderGoogleCalendar === "function") renderGoogleCalendar();
    if (typeof applyRoleBasedView === "function") applyRoleBasedView();
  }, error => {
    cloud.lastError = error.message;
    addDiagnostic("Family settings listener", error, "warn");
  });

  cloud.unsubscribeMembers = cloud.fb.onSnapshot(membersRef, snapshot => {
    cloud.members = snapshot.docs.map(docSnap => ({ uid: docSnap.id, ...docSnap.data() }));
    if (typeof autoAssignCurrentUserRole === "function") {
      autoAssignCurrentUserRole().catch(error => { cloud.lastError = error.message; });
    }
    renderFamilyMembers();
    if (typeof renderRoleSetupPanel === "function") renderRoleSetupPanel();
    if (typeof applyRoleBasedView === "function") applyRoleBasedView();
    if (typeof renderKidDashboard === "function") renderKidDashboard();
    if (typeof renderKidRequests === "function") renderKidRequests();
  }, error => {
    cloud.lastError = error.message;
    addDiagnostic("Family members listener", error, "warn");
  });

  cloud.unsubscribeState = cloud.fb.onSnapshot(stateRef, snap => {
    if (!snap.exists() || !snap.data()?.data) return;
    cloud.applyingRemote = true;
    state = normalizeState(snap.data().data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    cloud.applyingRemote = false;
    cloud.ready = true;
    render();
  }, error => {
    cloud.lastError = error.message;
    addDiagnostic("Shared state listener", error, "warn");
  });

  if (typeof startPresenceHeartbeat === "function") startPresenceHeartbeat();
  render();

  addDiagnosticInfo(
    "Cloud activation",
    "Cloud sync activated from readable data",
    "Family document, member record, and shared state were all readable, so the app activated cloud sync directly.",
    "You can now use the app. If it disconnects later, run diagnostics again.",
    "good",
    `familyId=${familyId}`
  );

  return true;
}

async function activateCloudFromDiagnosticsButton() {
  try {
    await activateCloudFromReadableData();
  } catch (error) {
    addDiagnostic("Cloud activation", error, "bad");
    setCloudStatus(`Could not activate cloud sync: ${error.message}`, "bad");
  }
}


async function runConnectionDiagnostics() {
  diagnostics.entries = [];
  renderDiagnostics();

  addDiagnosticInfo("Diagnostics", "App loaded", `Version ${APP_VERSION} is running from ${location.hostname}.`, "If this version is not expected, clear browser/PWA cache.", "good", location.href);

  if (!window.FAMILY_FIREBASE_CONFIG) {
    addDiagnostic("Firebase config", "FAMILY_FIREBASE_CONFIG is missing. firebase-config.js may not be uploaded or loaded.", "bad");
    return;
  }
  addDiagnosticInfo("Firebase config", "Firebase config found", `Project ID: ${window.FAMILY_FIREBASE_CONFIG.projectId || "unknown"}`, "", "good");

  try {
    await ensureFirebase();
    addDiagnosticInfo("Firebase SDK", "Firebase initialized", "Firebase SDK, Auth, and Firestore initialized successfully.", "", "good");
  } catch (error) {
    addDiagnostic("Firebase SDK", error, "bad");
    return;
  }

  if (!cloud.user) {
    addDiagnostic("Authentication", "User is not signed in.", "warn", {
      title: "Not signed in",
      cause: "The app cannot check family data until you sign in.",
      action: "Click Sign in with Google in Settings."
    });
    return;
  }
  addDiagnosticInfo("Authentication", "User signed in", `Signed in as ${cloud.user.email}.`, "", "good", `uid=${cloud.user.uid}`);

  const familyId = cloud.familyId || getStoredFamilyId();
  if (!familyId) {
    addDiagnostic("Family ID", "No Family ID is saved.", "warn", {
      title: "No saved Family ID",
      cause: "The app does not know which family space to open.",
      action: "Create a shared family space or join using Family ID + Invite Code."
    });
    return;
  }
  addDiagnosticInfo("Family ID", "Saved Family ID found", `Family ID: ${familyId}`, "", "good");

  try {
    const familyRef = cloud.fb.doc(cloud.db, "families", familyId);
    const familySnap = await withTimeout(cloud.fb.getDoc(familyRef), 8000, "Reading family document timed out.");
    if (!familySnap.exists()) {
      addDiagnostic("Family document", `Family document ${familyId} was not found.`, "bad");
      return;
    }
    const data = familySnap.data();
    addDiagnosticInfo("Family document", "Family document readable", "The family document exists and Firestore allowed reading it.", "", "good", `createdBy=${data.createdBy || "missing"} inviteCode=${data.inviteCode ? "present" : "missing"}`);

    const memberRef = cloud.fb.doc(cloud.db, "families", familyId, "members", cloud.user.uid);
    try {
      const memberSnap = await withTimeout(cloud.fb.getDoc(memberRef), 8000, "Reading your member record timed out.");
      if (!memberSnap.exists()) {
        addDiagnostic("Member record", `Your member record is missing at families/${familyId}/members/${cloud.user.uid}.`, "bad", {
          title: "Missing member record",
          cause: "The family exists, but your user is not listed as a member.",
          action: "If you are the owner, V4.8.8+ rules should repair this. Otherwise join again with Family ID + Invite Code, or manually create the member record."
        });
      } else {
        const member = memberSnap.data();
        addDiagnosticInfo("Member record", "Your member record is readable", `Role: ${member.role || "missing"}; Email: ${member.email || "missing"}`, "", "good");
      }
    } catch (error) {
      addDiagnostic("Member record", error, "bad");
    }

    const stateRef = cloud.fb.doc(cloud.db, "families", familyId, "state", "main");
    try {
      const stateSnap = await withTimeout(cloud.fb.getDoc(stateRef), 8000, "Reading shared state timed out.");
      if (!stateSnap.exists()) {
        addDiagnostic("Shared state", "Shared family state document is missing.", "warn", {
          title: "Shared data document missing",
          cause: "The family exists, but state/main was not created yet.",
          action: "Click Reconnect now. The app should create it if rules allow."
        });
      } else {
        addDiagnosticInfo("Shared state", "Shared data is readable", "families/{familyId}/state/main exists and can be read.", "", "good");
      }
    } catch (error) {
      addDiagnostic("Shared state", error, "bad");
    }

    if (cloud.ready) {
      addDiagnosticInfo("Cloud sync", "Cloud sync active", "The app currently considers cloud sync active.", "", "good");
    } else {
      addDiagnosticInfo(
        "Cloud sync",
        "Readable data found, activating sync",
        "Family document, your member record, and shared data are all readable. The app will now activate sync directly.",
        "If activation does not complete, click Activate sync from readable data.",
        "warn"
      );

      try {
        await activateCloudFromReadableData(familyId);
      } catch (activationError) {
        addDiagnostic("Cloud activation", activationError, "bad");
      }
    }
  } catch (error) {
    addDiagnostic("Family document", error, "bad");
  }
}

function clearDiagnostics() {
  diagnostics.entries = [];
  renderDiagnostics();
}

function wireDiagnosticsControls() {
  document.getElementById("runDiagnosticsBtn")?.addEventListener("click", runConnectionDiagnostics);
  document.getElementById("copyDiagnosticsBtn")?.addEventListener("click", copyDiagnosticReport);
  document.getElementById("clearDiagnosticsBtn")?.addEventListener("click", clearDiagnostics);
  document.getElementById("activateCloudBtn")?.addEventListener("click", activateCloudFromDiagnosticsButton);
}


function setCloudStep(message, level = "warn") {
  setCloudStatus(message, level);
  const debug = document.getElementById("cloudDebugText");
  if (debug) debug.textContent = message;

  if (level === "bad") {
    addDiagnostic("Cloud connection", message, "bad");
  }
}

async function timedStep(label, promise, ms = 9000) {
  setCloudStep(label, "warn");
  return withTimeout(promise, ms, `${label} timed out after ${Math.round(ms / 1000)} seconds.`);
}


async function connectFamily(familyId) {
  await ensureFirebase();
  if (!cloud.user) throw new Error("Sign in first.");

  familyId = String(familyId || "").trim().toUpperCase();
  if (!familyId) throw new Error("Missing Family ID.");

  cloud.familyId = familyId;
  localStorage.setItem(CLOUD_FAMILY_ID_KEY, familyId);

  setCloudStep(`Step 1/5: Preparing connection to family space ${familyId}...`, "warn");

  if (cloud.unsubscribeState) cloud.unsubscribeState();
  if (cloud.unsubscribeMembers) cloud.unsubscribeMembers();
  if (cloud.unsubscribeFamily) cloud.unsubscribeFamily();
  cloud.unsubscribeState = null;
  cloud.unsubscribeMembers = null;
  cloud.unsubscribeFamily = null;
  stopPresenceHeartbeat();

  const familyRef = cloud.fb.doc(cloud.db, "families", familyId);
  const stateRef = cloud.fb.doc(cloud.db, "families", familyId, "state", "main");
  const membersRef = cloud.fb.collection(cloud.db, "families", familyId, "members");

  let familySnap;
  try {
    familySnap = await timedStep(
      `Step 2/5: Reading family document ${familyId}...`,
      cloud.fb.getDoc(familyRef),
      10000
    );
  } catch (error) {
    cloud.ready = false;
    cloud.lastError = error.message;
    const msg = error.message || String(error);
    if (/permission|insufficient/i.test(msg)) {
      setCloudStep(`Firestore permission error while reading ${familyId}. Publish V4.8.8/V4.8.9 firestore.rules, wait 1 minute, then try Reconnect now.`, "bad");
    } else {
      setCloudStep(`Could not read family space ${familyId}: ${msg}`, "bad");
    }
    throw error;
  }

  if (!familySnap.exists()) {
    cloud.ready = false;
    const msg = `Family space ${familyId} was not found in Firestore. Clear cached Family ID or create/join the correct family space.`;
    setCloudStep(msg, "bad");
    throw new Error(msg);
  }

  cloud.familyDoc = familySnap.data();
  setCloudStep(`Step 3/5: Family document found. Checking owner/member access...`, "warn");

  // These are useful repair/profile writes, but they must not block the app from loading.
  // If they are slow or blocked, the app continues because the direct diagnostics already proved reads work.
  setCloudStep(`Step 3/5: Checking owner/member access... optional repair update`, "warn");
  await tryTimedOptionalStep(
    "Owner/member repair",
    ensureOwnerMemberRecord(familyId, cloud.familyDoc),
    4000
  );

  setCloudStep(`Step 3/5: Saving user profile mapping...`, "warn");
  await tryTimedOptionalStep(
    "User profile family mapping",
    saveUserCurrentFamily(familyId, cloud.user.uid === cloud.familyDoc.createdBy ? "owner" : "member"),
    4000
  );

  try {
    const memberSnap = await timedStep(
      `Step 4/5: Loading family members...`,
      cloud.fb.getDocs(membersRef),
      10000
    );
    cloud.members = memberSnap.docs.map(docSnap => ({ uid: docSnap.id, ...docSnap.data() }));
  } catch (error) {
    cloud.lastError = error.message;
    setCloudStep(`Could not load family members: ${error.message}`, "bad");
    addDiagnostic("Family members", error, "bad");
    throw error;
  }

  cloud.stateRef = stateRef;

  try {
    const stateSnap = await timedStep(
      `Step 5/5: Loading shared family data...`,
      cloud.fb.getDoc(stateRef),
      10000
    );

    if (stateSnap.exists() && stateSnap.data()?.data) {
      state = normalizeState(stateSnap.data().data);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } else {
      await timedStep(
        `Creating missing shared family data document...`,
        cloud.fb.setDoc(stateRef, {
          data: state,
          updatedAt: cloud.fb.serverTimestamp(),
          updatedBy: cloud.user.uid
        }, { merge: true }),
        10000
      );
    }
  } catch (error) {
    cloud.lastError = error.message;
    setCloudStep(`Could not load shared family data: ${error.message}`, "bad");
    addDiagnostic("Shared family data", error, "bad");
    throw error;
  }

  cloud.ready = true;
  setCloudStep(`Cloud sync active for ${cloud.user.email || "signed-in user"}. Family ID: ${familyId}`, "good");
  render();

  // Start live listeners only after initial connection succeeds.
  cloud.unsubscribeFamily = cloud.fb.onSnapshot(familyRef, snap => {
    if (!snap.exists()) return;
    cloud.familyDoc = snap.data();
    if (typeof applyFamilyCalendarPreference === "function") applyFamilyCalendarPreference();
    renderCloudPanel();
    if (typeof renderGoogleCalendar === "function") renderGoogleCalendar();
    if (typeof applyRoleBasedView === "function") applyRoleBasedView();
  }, error => {
    cloud.lastError = error.message;
    setCloudStep(`Family settings listener error: ${error.message}`, "bad");
  });

  cloud.unsubscribeMembers = cloud.fb.onSnapshot(membersRef, snapshot => {
    cloud.members = snapshot.docs.map(docSnap => ({ uid: docSnap.id, ...docSnap.data() }));
    if (typeof autoAssignCurrentUserRole === "function") {
      autoAssignCurrentUserRole().catch(error => { cloud.lastError = error.message; });
    }
    renderFamilyMembers();
    if (typeof renderRoleSetupPanel === "function") renderRoleSetupPanel();
    if (typeof applyRoleBasedView === "function") applyRoleBasedView();
    if (typeof renderKidDashboard === "function") renderKidDashboard();
    if (typeof renderKidRequests === "function") renderKidRequests();
  }, error => {
    cloud.lastError = error.message;
    setCloudStep(`Family members listener error: ${error.message}`, "bad");
  });

  cloud.unsubscribeState = cloud.fb.onSnapshot(stateRef, snap => {
    if (!snap.exists() || !snap.data()?.data) return;

    cloud.applyingRemote = true;
    state = normalizeState(snap.data().data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    cloud.applyingRemote = false;
    cloud.ready = true;
    render();
  }, error => {
    cloud.ready = false;
    cloud.lastError = error.message;
    setCloudStep(`Cloud sync listener error for ${familyId}: ${error.message}`, "bad");
  });

  startPresenceHeartbeat();
}

function scheduleCloudSave() {
  // V4.8.27 manual save mode: automatic cloud saves are disabled to prevent write loops.
  markManualPending("auto-save suppressed by manual save mode");
  renderManualSaveStatus();
}

async function saveCloudNow() {
  // V4.8.27 manual save mode: no automatic Firestore writes.
  markManualPending("automatic save suppressed by manual save mode");
  renderManualSaveStatus();
}



function calendarButtonDebug(message, level = "warn") {
  try {
    setGoogleCalendarStatus(message, level);
  } catch {
    const el = document.getElementById("googleCalendarStatus");
    if (el) {
      el.textContent = message;
      el.className = `cloud-status ${level}`;
    } else {
      alert(message);
    }
  }
}

window.__fccCalendarConnectClick = async function(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  calendarButtonDebug("Connect Google Calendar button clicked. Opening Google permission window...", "warn");
  try {
    await connectGoogleCalendar();
  } catch (error) {
    calendarButtonDebug(`Calendar connect failed before popup opened: ${error.message || error}`, "bad");
  }
};

window.__fccCalendarRefreshClick = async function(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  calendarButtonDebug("Refreshing Google Calendar events...", "warn");
  try {
    await refreshGoogleCalendar();
  } catch (error) {
    calendarButtonDebug(`Calendar refresh failed: ${error.message || error}`, "bad");
  }
};

window.__fccCalendarSaveClick = async function(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  try {
    await saveSelectedCalendarAsFamilyCalendar();
  } catch (error) {
    calendarButtonDebug(`Could not save family calendar: ${error.message || error}`, "bad");
  }
};

function wireCalendarControlsBackupDelegation() {
  if (window.__fccCalendarDelegationWired) return;
  window.__fccCalendarDelegationWired = true;

  document.addEventListener("click", async event => {
    const connect = event.target.closest("#connectCalendarBtn");
    if (connect) {
      await window.__fccCalendarConnectClick(event);
      return;
    }

    const refresh = event.target.closest("#refreshCalendarBtn");
    if (refresh) {
      await window.__fccCalendarRefreshClick(event);
      return;
    }

    const save = event.target.closest("#saveFamilyCalendarBtn");
    if (save) {
      await window.__fccCalendarSaveClick(event);
      return;
    }
  }, true);
}

window.addEventListener("error", event => {
  const msg = event?.message || "";
  if (/calendar|google|firebase|popup|connectCalendar/i.test(msg)) {
    calendarButtonDebug(`Calendar script error: ${msg}`, "bad");
  }
});

window.addEventListener("unhandledrejection", event => {
  const msg = event?.reason?.message || String(event?.reason || "");
  if (/calendar|google|firebase|popup|connectCalendar|permission/i.test(msg)) {
    calendarButtonDebug(`Calendar error: ${msg}`, "bad");
  }
});


function wireGoogleCalendarControls() {
  wireCalendarControlsBackupDelegation();
  const connectBtn = document.getElementById("connectCalendarBtn");
  const refreshBtn = document.getElementById("refreshCalendarBtn");
  const calendarSelect = document.getElementById("calendarSelect");
  const saveBtn = document.getElementById("saveFamilyCalendarBtn");
  const clearBtn = document.getElementById("clearFamilyCalendarBtn");

  connectBtn?.addEventListener("click", async event => {
    event.preventDefault();
    await connectGoogleCalendar();
  });

  refreshBtn?.addEventListener("click", async event => {
    event.preventDefault();
    await refreshGoogleCalendar();
  });

  calendarSelect?.addEventListener("change", async event => {
    calendar.selectedCalendarId = event.target.value;
    localStorage.setItem(CALENDAR_SELECTED_ID_KEY, calendar.selectedCalendarId);
    if (calendar.accessToken) await refreshGoogleCalendar();
    renderGoogleCalendar();
  });

  saveBtn?.addEventListener("click", async event => {
    event.preventDefault();
    try {
      await saveSelectedCalendarAsFamilyCalendar();
    } catch (error) {
      alert(`Could not save family calendar: ${error.message}`);
    }
  });

  clearBtn?.addEventListener("click", async event => {
    event.preventDefault();
    try {
      await clearFamilyCalendarSetting();
    } catch (error) {
      alert(`Could not clear family calendar: ${error.message}`);
    }
  });
}


function authButtonDebug(message, level = "warn") {
  try {
    setCloudStatus(message, level);
  } catch {
    alert(message);
  }
}

window.__fccGoogleSignInClick = async function(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  authButtonDebug("Google sign-in button clicked. Opening Google sign-in window...", "warn");

  try {
    await signInWithGoogle();
  } catch (error) {
    let message = error.message || String(error);

    if (message.includes("popup") || message.includes("closed-by-user")) {
      message = "Google sign-in popup was blocked or closed. Allow popups for this site and try again.";
    }

    if (message.includes("requests-from-referer") || message.includes("API key")) {
      message = "Google blocked sign-in because the API key website restriction does not allow this GitHub Pages URL. Add https://fadlon1980.github.io/* and https://fadlon1980.github.io/Family-Command-Center/* to the API key website restrictions.";
    }

    authButtonDebug(`Google sign-in failed: ${message}`, "bad");
  }
};

window.__fccEmailSignInClick = async function(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  try {
    await signInWithEmail(
      document.getElementById("authEmail").value.trim(),
      document.getElementById("authPassword").value
    );
  } catch (error) {
    authButtonDebug(`Sign-in failed: ${error.message || error}`, "bad");
  }
};

window.__fccEmailSignupClick = async function(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  try {
    await signUpWithEmail(
      document.getElementById("authEmail").value.trim(),
      document.getElementById("authPassword").value
    );
  } catch (error) {
    authButtonDebug(`Account creation failed: ${error.message || error}`, "bad");
  }
};

function wireAuthControlsBackupDelegation() {
  if (window.__fccAuthDelegationWired) return;
  window.__fccAuthDelegationWired = true;

  document.addEventListener("click", async event => {
    const google = event.target.closest("#googleSignInBtn");
    if (google) {
      await window.__fccGoogleSignInClick(event);
      return;
    }

    const login = event.target.closest("#loginBtn");
    if (login) {
      await window.__fccEmailSignInClick(event);
      return;
    }

    const signup = event.target.closest("#signupBtn");
    if (signup) {
      await window.__fccEmailSignupClick(event);
      return;
    }
  }, true);
}


function wireCloudControls() {
  wireAuthControlsBackupDelegation();
  const googleSignInBtn = document.getElementById("googleSignInBtn");
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const createFamilyBtn = document.getElementById("createFamilyBtn");
  const joinForm = document.getElementById("joinFamilyForm");

  googleSignInBtn?.addEventListener("click", window.__fccGoogleSignInClick);

  loginBtn?.addEventListener("click", window.__fccEmailSignInClick);

  signupBtn?.addEventListener("click", window.__fccEmailSignupClick);

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
  wireCloudRecoveryControls();
  wireDiagnosticsControls();
wireManualSaveControls();
wireGlobalManualSaveBar();
  wireGoogleCalendarControls();
  wireRoleSetupControls();
  renderCloudPanel();
  if (isFirebaseConfigured()) {
    try {
      await ensureFirebase();
    } catch (error) {
      setCloudStatus(`Firebase setup problem: ${error.message}`, "bad");
    }
  }
});




wireAuthControlsBackupDelegation();
wireCalendarControlsBackupDelegation();

async function forceReconnectFamilySpace() {
  try {
    await ensureFirebase();
    const familyId = cloud.familyId || getStoredFamilyId();
    if (!familyId) {
      setCloudStep("No cached Family ID was found. Use Join existing family space.", "warn");
      return;
    }
    await connectFamily(familyId);
  } catch (error) {
    setCloudStep(`Reconnect failed: ${error.message || error}`, "bad");
  }
}

function clearCachedFamilyId() {
  localStorage.removeItem(CLOUD_FAMILY_ID_KEY);
  for (const key of LEGACY_CLOUD_FAMILY_ID_KEYS || []) {
    localStorage.removeItem(key);
  }
  cloud.familyId = "";
  cloud.ready = false;
  setCloudStep("Cached Family ID was cleared. Use Join existing family space or Create shared family space.", "warn");
  renderCloudPanel();
}

function wireCloudRecoveryControls() {
  document.getElementById("forceReconnectBtn")?.addEventListener("click", forceReconnectFamilySpace);
  document.getElementById("clearFamilyCacheBtn")?.addEventListener("click", clearCachedFamilyId);
}


wireCloudRecoveryControls();
wireDiagnosticsControls();
render();


/* ===== V4.8 Smart Family Tools Add-on ===== */
function v48EnsureArrays(){
  state.chores ||= [];
  state.equipmentChecklists ||= [];
  state.reminders ||= [];
  state.kidRequests ||= [];
}
function v48IsParent(){
  if (typeof isParentRole === "function") return isParentRole();
  if (!cloud?.user) return true;
  const member = (cloud.members||[]).find(m=>m.uid===cloud.user.uid);
  const role = String(member?.role || (cloud.familyDoc?.createdBy===cloud.user.uid ? "owner" : "parent")).toLowerCase();
  return ["owner","admin","parent"].includes(role);
}
function v48IsKid(){
  if (typeof isKidRole === "function") return isKidRole();
  const member = (cloud.members||[]).find(m=>m.uid===cloud?.user?.uid);
  return String(member?.role||"").toLowerCase()==="kid";
}
function v48KidName(){
  if (typeof getKidLinkedChildName === "function") return getKidLinkedChildName();
  const member = (cloud.members||[]).find(m=>m.uid===cloud?.user?.uid);
  return member?.childName || state.settings?.children?.[0] || "Kid 1";
}
function v48ShowFeedback(msg){const el=document.getElementById("assistantFeedback"); if(!el)return; el.textContent=msg; el.classList.remove("hidden"); clearTimeout(el._t); el._t=setTimeout(()=>el.classList.add("hidden"),5500)}
function v48Items(v){return Array.isArray(v)?v.map(x=>String(x).trim()).filter(Boolean):String(v||"").split(",").map(x=>x.trim()).filter(Boolean)}
function v48ChildFromText(text){const l=text.toLowerCase(); return (state.settings.children||[]).find(n=>l.includes(String(n).toLowerCase())) || (v48IsKid()?v48KidName():"All family")}
function v48Smart(text, requested){const lower=text.toLowerCase(); let type=requested==="auto"?(typeof inferQuickType==="function"?inferQuickType(text,requested):"task"):requested; if(requested==="auto"){ if(lower.includes("chore")||lower.includes("allowance")||lower.startsWith("clean ")||lower.startsWith("empty "))type="chore"; if(lower.includes("checklist")||lower.includes("equipment")||lower.includes("bring:")||lower.includes("pack list"))type="checklist"; if(lower.includes("remind ")||lower.startsWith("reminder"))type="reminder";} return {type,date:extractDate(text),amount:extractAmount(text),child:v48ChildFromText(text)}}
function v48DigestItem(item){const badge=item.type==="Conflict"?"conflict":item.type==="Chore"?"chore":item.type==="Prep"?"reminder":"";return `<div class="item"><div class="item-main"><div class="item-title">${escapeHtml(item.title)}</div><div class="item-meta"><span class="badge ${badge}">${escapeHtml(item.type)}</span><span class="badge">${escapeHtml(item.meta||"")}</span></div></div></div>`}
function v48RenderDailyDigest(){v48EnsureArrays(); const today=todayIso(),tomorrow=addDays(today,1),weekEnd=addDays(today,7),items=[]; (state.tasks||[]).filter(t=>!t.done&&t.due&&t.due<=today).slice(0,3).forEach(t=>items.push({title:`Task due: ${t.title}`,meta:`${t.owner||"Both"} · ${t.category||"Task"}`,type:"Task"})); (state.schoolItems||[]).filter(s=>s.status!=="Done"&&s.due&&s.due<=weekEnd).slice(0,4).forEach(s=>items.push({title:`${s.type}: ${s.title}`,meta:`${s.child||"Child"} · ${s.subject||"School"} · ${formatDate(s.due)}`,type:"School"})); if(v48IsParent())(state.payments||[]).filter(p=>p.status!=="Paid"&&p.due&&p.due<=weekEnd).slice(0,3).forEach(p=>items.push({title:`Payment due: ${p.name} — ${money(p.amount)}`,meta:`${formatDate(p.due)} · ${p.category}`,type:"Payments"})); (state.prepItems||[]).filter(p=>!p.done&&p.date&&p.date<=tomorrow).slice(0,3).forEach(p=>items.push({title:`Prep: ${p.text}`,meta:`${p.owner||"Both"} · ${formatDate(p.date)}`,type:"Prep"})); (state.chores||[]).filter(c=>c.status!=="Done"&&c.due&&c.due<=today).slice(0,3).forEach(c=>{if(v48IsParent()||c.child===v48KidName())items.push({title:`Chore: ${c.title}`,meta:`${c.child} · ${formatDate(c.due)}${Number(c.allowance)?` · ${money(c.allowance)}`:""}`,type:"Chore"})}); v48GetConflicts().slice(0,2).forEach(c=>items.push({title:`Conflict: ${c.title}`,meta:c.meta,type:"Conflict"})); renderList("dailyDigestList",items,v48DigestItem,"No urgent digest items right now.")}
function v48TimedEvents(){const manual=(state.events||[]).filter(e=>e.date&&e.time).map(e=>{const s=new Date(`${e.date}T${e.time}`);return{source:"App",title:e.title,person:e.person||"All family",start:s,end:new Date(s.getTime()+3600000)}}); const google=(calendar?.events||[]).filter(e=>e.startDate&&!e.allDay).map(e=>({source:"Google",title:e.summary,person:"All family",start:new Date(e.startDate),end:e.endDate?new Date(e.endDate):new Date(new Date(e.startDate).getTime()+3600000)})); return [...manual,...google].filter(e=>!isNaN(e.start)&&!isNaN(e.end)).sort((a,b)=>a.start-b.start)}
function v48OverlapPeople(a,b){return a.person==="All family"||b.person==="All family"||a.person==="Both"||b.person==="Both"||a.person===b.person}
function v48GetConflicts(){const e=v48TimedEvents(),out=[]; for(let i=0;i<e.length;i++){for(let j=i+1;j<e.length;j++){if(e[j].start>=e[i].end)break; if(e[i].start<e[j].end&&e[j].start<e[i].end&&v48OverlapPeople(e[i],e[j]))out.push({title:`${e[i].title} overlaps with ${e[j].title}`,meta:`${e[i].start.toLocaleString(undefined,{weekday:"short",hour:"numeric",minute:"2-digit"})} · ${e[i].person} · ${e[i].source}/${e[j].source}`})}} return out}
function v48ConflictItem(x){return `<div class="item"><div class="item-main"><div class="item-title">${escapeHtml(x.title)}</div><div class="item-meta"><span class="badge conflict">Conflict</span><span class="badge">${escapeHtml(x.meta)}</span></div></div></div>`}
function v48RenderConflicts(){const c=v48GetConflicts(); renderList("conflictList",c,v48ConflictItem,"No conflicts detected."); renderList("calendarConflictList",c,v48ConflictItem,"No calendar conflicts detected.")}
function v48EquipmentItem(x){const chips=v48Items(x.items).map(i=>`<span class="checklist-chip">${escapeHtml(i)}</span>`).join(""); return `<div class="item"><div class="item-main"><div class="item-title">${escapeHtml(x.activity)}</div><div class="item-meta"><span class="badge calendar">${escapeHtml(x.child||"All family")}</span></div><div class="checklist-items">${chips}</div></div><div class="item-actions"><button class="icon-btn" data-v48="equipmentToPrep" data-id="${x.id}">Add prep</button><button class="icon-btn parent-only" data-v48="deleteEquipment" data-id="${x.id}">Delete</button></div></div>`}
function v48ChecklistForEvent(t){const lower=String(t||"").toLowerCase(); return (state.equipmentChecklists||[]).find(x=>{const a=String(x.activity||"").toLowerCase(); return a&&(lower.includes(a)||a.includes(lower))})}
function v48EquipmentMatch(m){const chips=v48Items(m.checklist.items).map(i=>`<span class="checklist-chip">${escapeHtml(i)}</span>`).join(""); return `<div class="item"><div class="item-main"><div class="item-title">${escapeHtml(m.event.title)} — ${formatDate(m.event.date)}</div><div class="item-meta"><span class="badge calendar">Equipment</span><span class="badge">${escapeHtml(m.event.person||"All family")}</span></div><div class="checklist-items">${chips}</div></div><div class="item-actions"><button class="icon-btn" data-v48="equipmentToPrep" data-id="${m.checklist.id}">Add prep</button></div></div>`}
function v48RenderEquipment(){v48EnsureArrays(); renderList("equipmentList",state.equipmentChecklists,v48EquipmentItem,"No equipment checklists yet."); const today=todayIso(),tomorrow=addDays(today,1); const matched=(state.events||[]).filter(e=>e.date===today||e.date===tomorrow).map(e=>{const checklist=v48ChecklistForEvent(e.title); return checklist?{event:e,checklist}:null}).filter(Boolean); renderList("equipmentTodayList",matched,v48EquipmentMatch,"No equipment checklists matched to today/tomorrow events.")}
function v48ChoreItem(x){const done=x.status==="Done",canPay=v48IsParent()&&done&&!x.paid; return `<div class="item"><div class="item-main"><div class="item-title ${done?"done-text":""}">${escapeHtml(x.title)}</div><div class="item-meta"><span class="badge chore">${escapeHtml(x.child||"Kid")}</span><span class="badge ${dueBadgeClass(x.due,done)}">${x.due?formatDate(x.due):"No due date"}</span><span class="badge">${escapeHtml(x.frequency||"One-time")}</span>${Number(x.allowance)?`<span class="badge money">${money(x.allowance)}</span>`:""}${done?`<span class="badge done">Done</span>`:""}${x.paid?`<span class="badge paid">Paid</span>`:""}</div></div><div class="item-actions"><button class="icon-btn" data-v48="toggleChore" data-id="${x.id}">${done?"Reopen":"Done"}</button>${canPay?`<button class="icon-btn" data-v48="payChore" data-id="${x.id}">Mark paid</button>`:""}<button class="icon-btn parent-only" data-v48="deleteChore" data-id="${x.id}">Delete</button></div></div>`}
function v48SortChores(a,b){return Number(a.status==="Done")-Number(b.status==="Done")||(a.due||"9999-99-99").localeCompare(b.due||"9999-99-99")||(a.child||"").localeCompare(b.child||"")||a.title.localeCompare(b.title)}
function v48RenderChores(){v48EnsureArrays(); const visible=v48IsParent()?state.chores:state.chores.filter(c=>c.child===v48KidName()); const open=visible.filter(c=>c.status!=="Done").sort(v48SortChores), unpaid=visible.filter(c=>c.status==="Done"&&!c.paid).sort(v48SortChores); const earned=visible.filter(c=>c.status==="Done").reduce((s,c)=>s+Number(c.allowance||0),0),unp=unpaid.reduce((s,c)=>s+Number(c.allowance||0),0),paid=visible.filter(c=>c.paid).reduce((s,c)=>s+Number(c.allowance||0),0); const sum=document.getElementById("allowanceSummary"); if(sum)sum.innerHTML=`<div class="money-tile"><strong>${open.length}</strong><span>Open chores</span></div><div class="money-tile"><strong>${money(earned)}</strong><span>Earned</span></div><div class="money-tile"><strong>${money(unp)}</strong><span>Unpaid</span></div><div class="money-tile"><strong>${money(paid)}</strong><span>Paid</span></div>`; renderList("openChoresList",open,v48ChoreItem,"No open chores."); renderList("unpaidChoresList",unpaid,v48ChoreItem,"No completed unpaid chores."); renderList("allChoresList",[...visible].sort(v48SortChores),v48ChoreItem,"No chores yet.")}
async function v48Notify(){if(!("Notification" in window)){alert("This browser does not support notifications.");return} const p=await Notification.requestPermission(); if(p!=="granted"){alert("Notifications were not enabled.");return} const due=[]; const tomorrow=addDays(todayIso(),1); (state.schoolItems||[]).filter(s=>s.status!=="Done"&&s.due&&s.due<=tomorrow).slice(0,3).forEach(s=>due.push(`${s.child}: ${s.title}`)); (state.prepItems||[]).filter(x=>!x.done&&x.date&&x.date<=tomorrow).slice(0,3).forEach(x=>due.push(`Prep: ${x.text}`)); new Notification("Family Command Center",{body:due.length?due.join(" · "):"No urgent items right now.",tag:"family-command-center-digest"})}
function v48Render(){v48EnsureArrays(); ["choreChild","equipmentChild"].forEach(id=>{const el=document.getElementById(id); if(el) setOptions(el, people(), v48IsKid()?v48KidName():"All family")}); v48RenderDailyDigest(); v48RenderConflicts(); v48RenderEquipment(); v48RenderChores(); if(typeof applyRoleBasedView==="function") applyRoleBasedView()}
const __v48OriginalRender = render;
render = function(){ __v48OriginalRender(); v48Render(); };

document.getElementById("quickForm")?.addEventListener("submit", function(event){
  event.preventDefault(); event.stopImmediatePropagation();
  const text=document.getElementById("quickText").value.trim(), requested=document.getElementById("quickType").value; if(!text)return; const smart=v48Smart(text,requested); const type=smart.type, date=smart.date;
  if(type==="checklist"){const m=text.match(/(?:checklist|equipment|pack list)\s*(?:for)?\s*([^:,-]+)?[:,-]?\s*(.*)/i); const activity=(m?.[1]||"Activity").trim(); const raw=m?.[2]||text; state.equipmentChecklists.push({id:uid(),activity,child:smart.child,items:v48Items(raw.replace(/^(checklist|equipment|pack list)\s*/i,"")),createdAt:Date.now()}); v48ShowFeedback(`Smart capture: added equipment checklist for ${activity}.`)}
  else if(type==="chore"){state.chores.push({id:uid(),title:text.replace(/^chore\s*:?/i,"").replace(/\$?\s?\d+(?:\.\d{1,2})?/,"").trim()||text,child:smart.child||v48KidName(),due:date||todayIso(),allowance:smart.amount||0,frequency:"One-time",status:"Open",paid:false,createdAt:Date.now()}); v48ShowFeedback("Smart capture: added chore.")}
  else if(type==="reminder"){state.reminders.push({id:uid(),text,due:date||addDays(todayIso(),1),done:false,createdAt:Date.now()}); state.prepItems.push({id:uid(),text:text.replace(/^remind(?:er)?\s*:?/i,"").trim()||text,owner:"Both",date:date||addDays(todayIso(),1),done:false,createdAt:Date.now()}); v48ShowFeedback("Smart capture: added reminder as prep item.")}
  else { // Delegate old categories with improved feedback by mimicking current logic lightly
    const oldType = type;
    if(oldType==="shopping"){text.replace(/^(buy|shopping)\s*:?/i,"").split(",").map(x=>x.trim()).filter(Boolean).forEach(name=>state.shopping.push({id:uid(),name,store:"Grocery",done:false,createdAt:Date.now()}));}
    else if(oldType==="payment"){const paid=text.toLowerCase().startsWith("paid "); state.payments.push({id:uid(),name:text.replace(/^(pay|paid)\s+/i,"").replace(/\$?\s?\d+(?:\.\d{1,2})?/,"").trim()||text,amount:smart.amount,due:date||todayIso(),category:"Other",owner:"Both",frequency:"One-time",method:"Credit card",status:paid?"Paid":"Upcoming",paidDate:paid?todayIso():"",notes:"Added from smart capture",createdAt:Date.now()});}
    else if(oldType==="schoolwork"){const l=text.toLowerCase(); const itemType=l.includes("exam")?"Exam":l.includes("test")?"Test":l.includes("quiz")?"Quiz":l.includes("project")?"Project":l.includes("reading")?"Reading":"School"; state.schoolItems.push({id:uid(),title:text,child:smart.child,type:itemType,subject:"",due:date||todayIso(),priority:["Exam","Test","Quiz"].includes(itemType)?"High":"Normal",status:"Open",notes:"Added from smart capture",createdAt:Date.now()});}
    else if(oldType==="event"){state.events.push({id:uid(),title:text,person:"All family",date:date||todayIso(),time:extractTime(text),location:"",notes:"Added from smart capture",createdAt:Date.now()});}
    else if(oldType==="prep"){state.prepItems.push({id:uid(),text,owner:"Both",date:date||addDays(todayIso(),1),done:false,createdAt:Date.now()});}
    else if(oldType==="decision"){state.decisions.push({id:uid(),title:text.replace(/^decision\s*:?/i,"").trim(),owner:"Both",due:date,options:"",status:"Open",createdAt:Date.now()});}
    else if(oldType==="admin"){state.adminItems.push({id:uid(),title:text,category:"Other",owner:"Both",due:date,notes:"Added from smart capture",status:"Open",createdAt:Date.now()});}
    else {state.tasks.push({id:uid(),title:text,owner:"Both",due:date,category:"Other",priority:"Normal",done:false,createdAt:Date.now()});}
    v48ShowFeedback(`Smart capture: added ${oldType}.`)
  }
  document.getElementById("quickText").value=""; saveState(); render();
}, true);

document.addEventListener("click", e=>{const b=e.target.closest("[data-v48]"); if(!b)return; const action=b.dataset.v48,id=b.dataset.id; v48EnsureArrays(); if(action==="equipmentToPrep"){const x=state.equipmentChecklists.find(y=>y.id===id); if(x)state.prepItems.push({id:uid(),text:`${x.activity}: ${v48Items(x.items).join(", ")}`,owner:"Both",date:addDays(todayIso(),1),done:false,createdAt:Date.now()})} if(action==="deleteEquipment")state.equipmentChecklists=state.equipmentChecklists.filter(x=>x.id!==id); if(action==="toggleChore"){const c=state.chores.find(x=>x.id===id); if(c)c.status=c.status==="Done"?"Open":"Done"} if(action==="payChore"){const c=state.chores.find(x=>x.id===id); if(c)c.paid=true} if(action==="deleteChore")state.chores=state.chores.filter(x=>x.id!==id); saveState(); render()});
document.getElementById("equipmentForm")?.addEventListener("submit",e=>{e.preventDefault(); v48EnsureArrays(); state.equipmentChecklists.push({id:uid(),activity:document.getElementById("equipmentActivity").value.trim(),child:document.getElementById("equipmentChild").value,items:v48Items(document.getElementById("equipmentItems").value),createdAt:Date.now()}); e.target.reset(); saveState(); render()});
document.getElementById("choreForm")?.addEventListener("submit",e=>{e.preventDefault(); v48EnsureArrays(); state.chores.push({id:uid(),title:document.getElementById("choreTitle").value.trim(),child:document.getElementById("choreChild").value,due:document.getElementById("choreDue").value,allowance:Number(document.getElementById("choreAllowance").value||0),frequency:document.getElementById("choreFrequency").value,status:"Open",paid:false,createdAt:Date.now()}); e.target.reset(); saveState(); render()});
document.getElementById("notifyBtn")?.addEventListener("click",v48Notify);
v48EnsureArrays(); render();
/* ===== End V4.8 Add-on ===== */


window.addEventListener("unhandledrejection", event => {
  const msg = event?.reason?.message || String(event?.reason || "");
  if (/auth|firebase|popup|google|login|sign-in/i.test(msg)) {
    authButtonDebug(`Auth/login error: ${msg}`, "bad");
  }
});


window.addEventListener("error", event => {
  addDiagnostic("Browser JavaScript", event.message || "Unknown JavaScript error", "bad", {
    title: "Browser JavaScript error",
    cause: "The app hit a JavaScript error, which can make buttons stop working or screens freeze.",
    action: "Copy the diagnostic report and share it.",
    technical: `${event.message || ""} at ${event.filename || ""}:${event.lineno || ""}:${event.colno || ""}`
  });
});

window.addEventListener("unhandledrejection", event => {
  const msg = event?.reason?.message || String(event?.reason || "");
  addDiagnostic("Unhandled app promise", msg, "bad");
});
