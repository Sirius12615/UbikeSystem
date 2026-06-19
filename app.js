

let currentLang = "zh";   


const LANG_TEXT = {
  // Header / Nav
  navHome:        { zh: "首頁",           en: "Home" },
  navStations:    { zh: "站點查詢",       en: "Station Search" },
  navUsers:       { zh: "會員資料",       en: "Members" },
  navBikes:       { zh: "自行車狀態",     en: "Bike Status" },
  navRecords:     { zh: "租借紀錄",       en: "Rental Records" },
  navService:     { zh: "客服回報",       en: "Service Report" },
  navDashboard:   { zh: "數據分析",       en: "Dashboard" },
  navAdmin:       { zh: "管理員後台",     en: "Admin" },

  // Header buttons
  btnLogin:       { zh: "會員登入",       en: "Login" },
  btnRegister:    { zh: "加入會員",       en: "Join" },
  btnCancel:      { zh: "取消",           en: "Cancel" },
  btnSave:        { zh: "儲存",           en: "Save" },
  roleGuest:      { zh: "訪客",           en: "Guest" },
  roleMember:     { zh: "會員",           en: "Member" },
  roleAdmin:      { zh: "管理員",         en: "Admin" },


  heroTitle:          { zh: "智慧共享自行車<br />資料庫查詢與管理系統",
                        en: "Smart Shared Bike<br />Database Query &amp; Management System" },
  heroSlogan:         { zh: "即時查詢站點車輛數量與可用空位",
                        en: "Real-time station bike and empty slot query" },
  heroDesc:           { zh: "整合站點、車輛、租借紀錄與客服回報，提供友善、迅速、透明的公共自行車查詢體驗。",
                        en: "Integrate stations, bikes, rental records and customer service reports — a friendly, fast, and transparent public bike experience." },
  heroBtnStations:    { zh: "立即查詢站點", en: "Search Stations" },
  heroBtnDashboard:   { zh: "查看數據分析", en: "View Dashboard" },
  statStations:       { zh: "總站點數",     en: "Total Stations" },
  statAvailable:      { zh: "可租車輛",     en: "Available Bikes" },
  statEmptySlots:     { zh: "可還空位",     en: "Empty Slots" },
  statRepair:         { zh: "維修車輛",     en: "Bikes Under Repair" },
  quickSearchTitle:   { zh: "快速查詢",     en: "Quick Search" },
  quickSearchBtn:     { zh: "搜尋",         en: "Search" },

  // Page titles
  pageStationsTitle:  { zh: "站點查詢",         en: "Station Search" },
  pageStationsSub:    { zh: "查看所有站點的可租車輛與可還空位資訊",   en: "View available bikes and empty slots at every station." },
  pageUsersTitle:     { zh: "會員資料",         en: "Member Information" },
  pageUsersSub:       { zh: "查看所有會員的基本資料與租借紀錄統計",   en: "View all members' information and rental statistics." },
  pageBikesTitle:     { zh: "自行車狀態",       en: "Bike Status" },
  pageBikesSub:       { zh: "查看所有車輛的型號、狀態與所在站點",     en: "View the model, status and station of every bike." },
  pageRecordsTitle:   { zh: "租借紀錄",         en: "Rental Records" },
  pageRecordsSub:     { zh: "查看會員的租借與歸還歷史紀錄",           en: "View rental and return history of members." },
  pageServiceTitle:   { zh: "客服回報",         en: "Customer Service Report" },
  pageServiceSub:     { zh: "遇到問題嗎？請填寫表單，我們將盡快為您處理", en: "Having an issue? Fill out the form and we'll handle it." },
  pageDashboardTitle: { zh: "數據分析",         en: "Data Dashboard" },
  pageDashboardSub:   { zh: "一目了然的全站數據統計",                 en: "A clear overview of system-wide statistics." },
  pageAdminTitle:     { zh: "管理員後台",       en: "Admin Dashboard" },
  pageAdminSub:       { zh: "管理站點資料、客服回報與系統維護",       en: "Manage stations, customer service and system maintenance." },
  unitBikes:          { zh: "輛",               en: "bikes" },

  // Table headers
  thStationId:    { zh: "站號",       en: "Station ID" },
  thStationName:  { zh: "站點名稱",   en: "Station Name" },
  thBikes:        { zh: "可租車數量", en: "Bikes" },
  thEmptySlots:   { zh: "可還空位",   en: "Empty Slots" },
  thStatus:       { zh: "狀態",       en: "Status" },
  thAction:       { zh: "操作",       en: "Action" },
  thUserId:       { zh: "會員編號",   en: "User ID" },
  thName:         { zh: "姓名",       en: "Name" },
  thGender:       { zh: "性別",       en: "Gender" },
  thRentCount:    { zh: "租借次數",   en: "Rent Count" },
  thReturnCount:  { zh: "歸還次數",   en: "Return Count" },
  thBikeId:       { zh: "車輛編號",   en: "Bike ID" },
  thModel:        { zh: "車型",       en: "Model" },
  thStation:      { zh: "所在站點",   en: "Station" },
  thRentTime:     { zh: "租借時間",   en: "Rent Time" },
  thReturnTime:   { zh: "歸還時間",   en: "Return Time" },
  thFormId:       { zh: "表單編號",   en: "Form ID" },
  thCaseNo:       { zh: "案件編號",   en: "Case No." },
  thDescription:  { zh: "問題描述",   en: "Description" },

  // Filter buttons
  filterAll:      { zh: "全部",       en: "All" },
  statusNormal:   { zh: "正常",       en: "Normal" },
  statusFull:     { zh: "無空位",     en: "Full" },
  statusEmpty:    { zh: "無車可借",   en: "Empty" },
  statusLow:      { zh: "車輛不足",   en: "Low" },
  statusAvailable:{ zh: "可租借",     en: "Available" },
  statusRented:   { zh: "已租借",     en: "Rented" },
  statusRepair:   { zh: "維修中",     en: "Repair" },
  statusPending:  { zh: "尚有未歸還", en: "Pending" },

  // Form / Buttons
  formTitle:          { zh: "問題回報",         en: "Report an Issue" },
  formStationLabel:   { zh: "站點",             en: "Station" },
  formTypeLabel:      { zh: "問題類型",         en: "Issue Type" },
  formSelectStation:  { zh: "請選擇站點",       en: "Select a station" },
  formSelectCase:     { zh: "請選擇案件編號",   en: "Select a case no." },
  formSelectType:     { zh: "請選擇問題類型",   en: "Select an issue type" },
  formSubmit:         { zh: "送出回報",         en: "Submit Report" },
  reportHistoryTitle: { zh: "回報紀錄",         en: "Report History" },

  // Admin
  adminTabStations:   { zh: "站點管理",         en: "Stations" },
  adminTabUsers:      { zh: "會員資料管理",     en: "Members" },
  adminTabServices:   { zh: "客服回報管理",     en: "Customer Service" },
  adminStationsListTitle: { zh: "站點列表",      en: "Station List" },
  adminUsersListTitle:    { zh: "會員列表",      en: "Member List" },
  adminServicesTitle:     { zh: "客服回報總覽",  en: "Service Overview" },
  adminAddStation:    { zh: "+ 新增站點",       en: "+ Add Station" },
  adminAddUser:       { zh: "+ 新增會員",       en: "+ Add Member" },

  // Modal
  modalCurrentBikes:  { zh: "目前可租車輛",     en: "Current Available Bikes" },
  modalCurrentSlots:  { zh: "目前可還空位",     en: "Current Empty Slots" },
  modalStationStatus: { zh: "站點狀態",         en: "Station Status" },

  // Placeholders
  quickSearchPlaceholder:  { zh: "請輸入站點名稱或站號",         en: "Enter station name or station ID" },
  stationSearchPlaceholder:{ zh: "搜尋站點名稱或站號",           en: "Search station name or ID" },
  userSearchPlaceholder:   { zh: "搜尋會員編號或姓名",           en: "Search user ID or name" },
  bikeSearchPlaceholder:   { zh: "搜尋車輛編號或車型",           en: "Search bike ID or model" },
  recordSearchPlaceholder: { zh: "搜尋會員編號或車輛編號",       en: "Search user ID or bike ID" },
  formDescPlaceholder:     { zh: "請詳細描述您遇到的問題...",     en: "Please describe the issue in detail..." },

  // Dashboard
  dashBikesChartTitle: { zh: "各站點自行車數量比較",  en: "Bikes per Station" },
  dashSlotsChartTitle: { zh: "各站點空位數量比較",    en: "Empty Slots per Station" },
  dashRepairTitle:     { zh: "維修中車輛數",          en: "Bikes Under Repair" },
  dashRepairHint:      { zh: "目前正在維修的自行車總數", en: "Total number of bikes currently under repair." },
  dashPopularTitle:    { zh: "熱門站點排行",          en: "Popular Stations" },

  // Page title & Logo
  pageTitle:      { zh: "智慧共享自行車資料庫查詢與管理系統",
                    en: "Smart Shared Bike Database Query &amp; Management System" },
  logoText:       { zh: "智慧共享自行車",           en: "Smart Shared Bike" },

  // Home guide (4 steps)
  guideTitle:     { zh: "使用步驟",                 en: "How It Works" },
  guideStep1Title:{ zh: "註冊 / 登入",              en: "Sign Up / Log In" },
  guideStep1Desc: { zh: "加入會員即可開始租借",     en: "Join as a member to start renting" },
  guideStep2Title:{ zh: "查詢站點",                 en: "Find a Station" },
  guideStep2Desc: { zh: "查詢附近的站點與車輛數量", en: "Browse nearby stations and bike counts" },
  guideStep3Title:{ zh: "租借自行車",               en: "Rent a Bike" },
  guideStep3Desc: { zh: "挑選車輛並完成租借",       en: "Pick a bike and complete the rental" },
  guideStep4Title:{ zh: "歸還自行車",               en: "Return the Bike" },
  guideStep4Desc: { zh: "於任一站點空位歸還",       en: "Return it to any station with an empty slot" },

  // Service form: issue type options
  issueBikeBroken:    { zh: "自行車故障",  en: "Bike Malfunction" },
  issueCannotRent:    { zh: "無法租借",    en: "Cannot Rent" },
  issueCannotReturn:  { zh: "無法歸還",    en: "Cannot Return" },
  issueAppProblem:    { zh: "App 問題",    en: "App Issue" },
  issueOther:         { zh: "其他",        en: "Other" },
  formSelectGender:   { zh: "請選擇",      en: "Select" },
  genderMale:         { zh: "男 (M)",      en: "Male (M)" },
  genderFemale:       { zh: "女 (F)",      en: "Female (F)" },
  uidPlaceholder:     { zh: "例：U0001",  en: "e.g. U0001" },

  // Footer
  footerAboutTitle:    { zh: "關於我們",         en: "About Us" },
  footerAboutDesc:     { zh: "智慧共享自行車資料庫查詢與管理系統，提供即時、透明的公共自行車資訊。",
                         en: "Smart Shared Bike Database — providing real-time, transparent public bike info." },
  footerHelpTitle:     { zh: "使用說明",         en: "Help" },
  footerHelp1:         { zh: "如何註冊會員",     en: "How to register" },
  footerHelp2:         { zh: "如何租借車輛",     en: "How to rent a bike" },
  footerHelp3:         { zh: "如何歸還車輛",     en: "How to return a bike" },
  footerHelp4:         { zh: "費率說明",         en: "Pricing" },
  footerFaqTitle:      { zh: "常見問題",         en: "FAQ" },
  footerFaq1:          { zh: "如何查詢附近站點？", en: "How to find nearby stations?" },
  footerFaq2:          { zh: "租借時間限制？",   en: "Any rental time limit?" },
  footerFaq3:          { zh: "忘記密碼怎麼辦？", en: "Forgot password?" },
  footerFaq4:          { zh: "如何反映問題？",   en: "How to report an issue?" },
  footerContactTitle:  { zh: "聯絡客服",         en: "Contact" },
  footerContact1:      { zh: "客服專線：0800-123-456", en: "Hotline: 0800-123-456" },
  footerContact2:      { zh: "客服信箱：service@example.com", en: "Email: service@example.com" },
  footerContact3:      { zh: "服務時間：24 小時", en: "Hours: 24 / 7" },
  footerCopyright:     { zh: "Copyright © 2026 智慧共享自行車資料庫系統",
                         en: "Copyright © 2026 Smart Shared Bike Database System" }
};

// Status mapping – return text per language + badge class
const STATUS_LABEL = {
  normal:     { zh: "正常",         en: "Normal",         badge: "badge-normal" },
  full:       { zh: "無空位",       en: "No Empty Slots", badge: "badge-full" },
  empty:      { zh: "無車可借",     en: "No Bikes",       badge: "badge-empty" },
  low:        { zh: "車輛不足",     en: "Low Bikes",      badge: "badge-low" },
  Available:  { zh: "可租借",       en: "Available",      badge: "badge-available" },
  Rented:     { zh: "已租借",       en: "Rented",         badge: "badge-rented" },
  Repair:     { zh: "維修中",       en: "Repair",         badge: "badge-repair" },
  "處理中":   { zh: "處理中",       en: "Processing",     badge: "badge-pending" },
  "已完成":   { zh: "已完成",       en: "Completed",      badge: "badge-done" }
};

// User status (only used for user status)
const USER_STATUS_LABEL = {
  normal:  { zh: "正常",                  en: "Normal",                  badge: "badge-normal" },
  pending: { zh: "尚有未歸還車輛",        en: "Pending Return",          badge: "badge-empty" }
};

// Record status
const RECORD_STATUS = {
  rented:   { zh: "租借中",  en: "Renting",   badge: "badge-rented" },
  returned: { zh: "已歸還",  en: "Returned",  badge: "badge-done" }
};

// Apply language: update text + placeholder + active class
function applyI18n() {
  // Update text for every element with data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    const entry = LANG_TEXT[key];
    if (entry) {
      // Use innerHTML to support <br /> in heroTitle
      el.innerHTML = entry[currentLang];
    }
  });
  // Update placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    const entry = LANG_TEXT[key];
    if (entry) {
      el.setAttribute("placeholder", entry[currentLang]);
    }
  });
  // Update active class on language buttons
  document.querySelectorAll("#langSwitch [data-lang]").forEach(btn => {
    if (btn.dataset.lang === currentLang) btn.classList.add("active");
    else btn.classList.remove("active");
  });
}

// Switch language: re-render all tables to update badges, status, etc.
function setLanguage(lang) {
  if (lang !== "zh" && lang !== "en") return;
  currentLang = lang;
  applyI18n();

  // Re-render all tables / dashboard to update badge status
  renderStationTable();
  renderUserTable();
  renderBikeTable();
  renderRecordTable();
  renderServiceTable();
  renderAdminStationTable();
  renderAdminUserTable();
  renderAdminServiceTable();
  renderDashboard();
}

function setupLanguageSwitch() {
  document.querySelectorAll("#langSwitch [data-lang]").forEach(btn => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });
}

/* ============================================
   1. MOCK DATA
   ============================================ */

// Station list: sId format CHAR(5) per PDF (S0001..S0004)
const STATIONS = [
  { sId: "S0001", name: "FCU Main Gate",          bikeCount: 20, emptySlots: 10 },
  { sId: "S0002", name: "Taichung Station",       bikeCount: 35, emptySlots:  5 },
  { sId: "S0003", name: "Feng Chia Night Market", bikeCount: 15, emptySlots:  0 },
  { sId: "S0004", name: "City Hall",              bikeCount:  8, emptySlots: 12 }
];

// User list: uId, name, gender, rentCount, returnCount per PDF
const USERS = [
  { uId: "U0001", name: "Tony Lin",    gender: "M", rentCount: 10, returnCount: 10 },
  { uId: "U0002", name: "Mary Jane",   gender: "F", rentCount:  5, returnCount:  4 },
  { uId: "U0003", name: "John Doe",    gender: "M", rentCount:  2, returnCount:  2 },
  { uId: "U0004", name: "Emily Chen",  gender: "F", rentCount:  0, returnCount:  0 },
  { uId: "U0005", name: "Bruce Wang",  gender: "M", rentCount: 15, returnCount: 15 }
];

// Bike list: bId (vehicle id), model, status, sId (current station)
const BIKES = [
  { bId: "B0001", model: "Giant Escape 3",   status: "Available", sId: "S0001" },
  { bId: "B0002", model: "Giant Escape 3",   status: "Rented",    sId: null   },
  { bId: "B0003", model: "Merida Crossway",  status: "Repair",    sId: "S0003" },
  { bId: "B0004", model: "Merida Crossway",  status: "Available", sId: "S0002" }
];

// Rental records: uid, bid, rent_time, return_time per PDF
const RECORDS = [
  { uId: "U0001", bId: "B0001", rentTime: "2026-05-28 08:00:00", returnTime: "2026-05-28 08:30:00" },
  { uId: "U0002", bId: "B0002", rentTime: "2026-05-29 09:00:00", returnTime: "" },
  { uId: "U0003", bId: "B0004", rentTime: "2026-05-29 10:00:00", returnTime: "2026-05-29 11:20:00" },
  { uId: "U0005", bId: "B0003", rentTime: "2026-05-30 13:00:00", returnTime: "" }
];

// Customer service feedback: form_id, no, sid, description, uid per PDF
let SERVICES = [
  { formId: "F0001", no: "N001", sId: "S0001", desc: "App crash on login",                    uId: "U0001", status: "處理中" },
  { formId: "F0002", no: "N001", sId: "S0004", desc: "Overcharged on last ride",               uId: "U0002", status: "已完成" },
  { formId: "F0003", no: "N002", sId: "S0003", desc: "Station full cannot return bike",        uId: "U0003", status: "處理中" },
  { formId: "F0004", no: "N003", sId: "S0002", desc: "Broken bike lock",                      uId: "U0005", status: "處理中" }
];

// Generate formId like F0005, F0006... (CHAR(5))
let nextFormIdNum = SERVICES.length + 1;   // start at 5 -> F0005

/* ============================================
   2. UTILITIES
   ============================================ */

// Shortcut: get element by id
const $ = (id) => document.getElementById(id);

// Show toast notification (success/error)
function showToast(message, type = "success") {
  const toast = $("toast");
  toast.textContent = message;
  toast.className = "toast show " + type;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2400);
}

// Return station status code: normal/full/empty/low
function getStationStatus(station) {
  if (station.bikeCount === 0 && station.emptySlots === 0) return "empty";
  if (station.bikeCount === 0) return "empty";   // 無車可借
  if (station.emptySlots === 0) return "full";    // 無空位
  if (station.bikeCount <= 5)  return "low";      // 車輛不足
  return "normal";
}

// Find station name by sId; return "-" if sId is null/empty or not found
function getStationName(sId) {
  if (!sId) return "-";
  const s = STATIONS.find(x => x.sId === sId);
  return s ? s.name : "-";
}

/* ============================================
   3. NAVIGATION & ROLE SWITCH
   ============================================ */

// Navigate to page by data-nav (header / hero / footer...)
function navigateTo(pageName) {
  // Check access permission
  const allow = ROLE_ACCESS[currentRole] || [];
  if (!allow.includes(pageName)) {
    showToast(currentLang === "en"
      ? "Your current role cannot access this page"
      : "您目前的身份無法進入此頁面", "error");
    return;
  }

  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".main-nav a").forEach(a => a.classList.remove("active"));

  const page = $(`page-${pageName}`);
  if (page) page.classList.add("active");

  const navLink = document.querySelector(`.main-nav a[data-nav="${pageName}"]`);
  if (navLink) navLink.classList.add("active");

  // Close mobile menu if open
  $("mainNav").classList.remove("open");

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Listen for click on all data-nav elements
function setupNavigation() {
  document.querySelectorAll("[data-nav]").forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      navigateTo(el.dataset.nav);
    });
  });
}

// Role switch (Guest / Member / Admin) – controls visible menu items
let currentRole = "guest";   // guest | member | admin

// Access rights per role: each nav item has data-nav attribute
const ROLE_ACCESS = {
  guest:  ["home", "stations", "bikes"],
  member: ["home", "stations", "users", "bikes", "records", "service", "dashboard"],
  admin:  ["home", "stations", "users", "bikes", "records", "service", "dashboard", "admin"]
};

function applyRoleAccess() {
  const allow = ROLE_ACCESS[currentRole] || [];
  document.querySelectorAll(".main-nav a[data-nav]").forEach(a => {
    if (allow.includes(a.dataset.nav)) {
      a.style.display = "";
    } else {
      a.style.display = "none";
    }
  });
}

function setupRoleSwitch() {
  document.querySelectorAll("#roleSwitch .role-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#roleSwitch .role-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentRole = btn.dataset.role;
      const roleLabel = btn.dataset.role === "guest"
        ? (currentLang === "en" ? "Guest" : "訪客")
        : btn.dataset.role === "member"
          ? (currentLang === "en" ? "Member" : "會員")
          : (currentLang === "en" ? "Admin" : "管理員");
      showToast(currentLang === "en"
        ? `Switched to "${roleLabel}" mode`
        : `已切換為「${roleLabel}」模式`, "success");

      // Apply access rights
      applyRoleAccess();

      // Auto-navigate to a sensible page
      if (currentRole === "admin") navigateTo("admin");
      else if (currentRole === "guest") navigateTo("home");
      else navigateTo("users");
    });
  });
}

// Mobile menu toggle (open/close nav)
function setupMobileMenu() {
  $("menuToggle").addEventListener("click", () => {
    $("mainNav").classList.toggle("open");
  });
}

// Login / Register buttons (demo only)
function setupAuthButtons() {
  $("loginBtn").addEventListener("click", () => showToast(
    currentLang === "en" ? "Login is a demo — try U0001" : "登入功能為示意，請輸入 U0001 體驗"
  ));
  $("registerBtn").addEventListener("click", () => showToast(
    currentLang === "en" ? "Registration is a demo" : "註冊功能為示意", "success"
  ));
}

/* ============================================
   4. HOME PAGE – statistics + quick search
   ============================================ */

function renderHomeStats() {
  const totalStations  = STATIONS.length;
  const totalBikes     = STATIONS.reduce((sum, s) => sum + s.bikeCount, 0);
  const totalSlots     = STATIONS.reduce((sum, s) => sum + s.emptySlots, 0);
  const repairBikes    = BIKES.filter(b => b.status === "Repair").length;

  $("statStations").textContent  = totalStations;
  $("statAvailable").textContent = totalBikes;
  $("statEmptySlots").textContent = totalSlots;
  $("statRepair").textContent    = repairBikes;
}

function setupQuickSearch() {
  const input = $("quickSearchInput");
  const btn   = $("quickSearchBtn");

  function doSearch() {
    const kw = input.value.trim().toLowerCase();
    if (!kw) {
      showToast(currentLang === "en"
        ? "Please enter a station name or ID"
        : "請輸入站點名稱或站號", "error");
      return;
    }
    const found = STATIONS.find(s =>
      s.name.toLowerCase().includes(kw) || s.sId.toLowerCase().includes(kw)
    );
    if (found) {
      openStationModal(found);
    } else {
      showToast(currentLang === "en" ? "Station not found" : "查無此站點", "error");
    }
  }

  btn.addEventListener("click", doSearch);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") doSearch(); });
}

/* ============================================
   5. STATIONS PAGE – table + filter + modal
   ============================================ */

let currentStationStatusFilter = "all";
let currentStationKeyword = "";

function renderStationTable() {
  const tbody = $("stationTableBody");
  tbody.innerHTML = "";

  // Filter by keyword and status
  const list = STATIONS.filter(s => {
    const matchKw =
      !currentStationKeyword ||
      s.name.toLowerCase().includes(currentStationKeyword.toLowerCase()) ||
      s.sId.toLowerCase().includes(currentStationKeyword.toLowerCase());

    const st = getStationStatus(s);
    const matchStatus = currentStationStatusFilter === "all" || st === currentStationStatusFilter;

    return matchKw && matchStatus;
  });

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6">
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        ${currentLang === "en" ? "No matching stations" : "沒有符合條件的站點"}
      </div></td></tr>`;
    return;
  }

  list.forEach(s => {
    const status = getStationStatus(s);
    const info = STATUS_LABEL[status];

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${s.sId}</td>
      <td>${s.name}</td>
      <td><span class="num">${s.bikeCount}</span></td>
      <td><span class="num">${s.emptySlots}</span></td>
      <td><span class="badge ${info.badge}">${info[currentLang] || info.text || ""}</span></td>
      <td>
        <button class="btn btn-sm btn-outline" data-detail="${s.sId}">${currentLang === "en" ? "Details" : "查看詳情"}</button>
      </td>`;
    tbody.appendChild(tr);
  });

  // Wire up modal-open events for each button
  tbody.querySelectorAll("[data-detail]").forEach(btn => {
    btn.addEventListener("click", () => {
      const s = STATIONS.find(x => x.sId === btn.dataset.detail);
      if (s) openStationModal(s);
    });
  });
}

function setupStationFilters() {
  // Search input
  $("stationSearch").addEventListener("input", (e) => {
    currentStationKeyword = e.target.value.trim();
    renderStationTable();
  });

  // Status filter buttons
  document.querySelectorAll("#statusFilter .filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#statusFilter .filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentStationStatusFilter = btn.dataset.status;
      renderStationTable();
    });
  });
}

// Station detail modal
function openStationModal(station) {
  $("modalStationName").textContent = station.name;
  $("modalStationId").textContent   = station.sId;
  const unitBikes = currentLang === "en" ? " bikes" : " 輛";
  const unitSlots = currentLang === "en" ? " slots" : " 個";
  $("modalBikeCount").textContent   = station.bikeCount + unitBikes;
  $("modalEmptySlots").textContent  = station.emptySlots + unitSlots;

  const status = getStationStatus(station);
  const info = STATUS_LABEL[status];
  $("modalStatus").innerHTML = `<span class="badge ${info.badge}">${info[currentLang] || info.text || ""}</span>`;

  // Suggestion based on status (bilingual)
  const sug = $("modalSuggestion");
  sug.classList.remove("warning", "danger");
  let msg = "";
  if (status === "empty") {
    sug.classList.add("danger");
    msg = currentLang === "en"
      ? "No bikes available. Try a nearby station or wait a moment."
      : "目前無車可借，建議前往鄰近站點或稍候再試。";
  } else if (status === "full") {
    sug.classList.add("warning");
    msg = currentLang === "en"
      ? "No empty slots. Please return your bike at a nearby station."
      : "目前無空位可還，建議前往鄰近站點歸還。";
  } else if (status === "low") {
    sug.classList.add("warning");
    msg = currentLang === "en"
      ? "Bikes are running low — we recommend heading over soon."
      : "車輛數量較少，建議盡早前往。";
  } else {
    msg = currentLang === "en"
      ? "Station is in good condition. Rentals and returns work normally."
      : "站點狀態良好，可正常租借與歸還。";
  }
  sug.textContent = "💡 " + msg;

  $("stationModal").classList.add("active");
}

function setupStationModal() {
  $("modalClose").addEventListener("click", () => $("stationModal").classList.remove("active"));
  $("stationModal").addEventListener("click", (e) => {
    if (e.target.id === "stationModal") $("stationModal").classList.remove("active");
  });
}

/* ============================================
   6. BIKES PAGE – table + filter
   ============================================ */

let currentBikeStatusFilter = "all";
let currentBikeKeyword = "";

function renderBikeTable() {
  const tbody = $("bikeTableBody");
  tbody.innerHTML = "";

  const list = BIKES.filter(b => {
    const matchKw =
      !currentBikeKeyword ||
      b.bId.toLowerCase().includes(currentBikeKeyword.toLowerCase()) ||
      b.model.toLowerCase().includes(currentBikeKeyword.toLowerCase());

    const matchStatus =
      currentBikeStatusFilter === "all" || b.status === currentBikeStatusFilter;

    return matchKw && matchStatus;
  });

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4">
      <div class="empty-state"><div class="empty-state-icon">🔍</div>${currentLang === "en" ? "No matching bikes" : "沒有符合條件的車輛"}</div>
    </td></tr>`;
    return;
  }

  list.forEach(b => {
    const info = STATUS_LABEL[b.status];
    const stationDisplay = b.sId ? `${getStationName(b.sId)} (${b.sId})` : "-";
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${b.bId}</td>
      <td>${b.model}</td>
      <td><span class="badge ${info.badge}">${info[currentLang] || info.text || ""}</span></td>
      <td>${stationDisplay}</td>`;
    tbody.appendChild(tr);
  });
}

function setupBikeFilters() {
  $("bikeSearch").addEventListener("input", (e) => {
    currentBikeKeyword = e.target.value.trim();
    renderBikeTable();
  });

  document.querySelectorAll("#bikeStatusFilter .filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#bikeStatusFilter .filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentBikeStatusFilter = btn.dataset.status;
      renderBikeTable();
    });
  });
}

/* ============================================
   6B. USERS PAGE – member table
   ============================================ */

let currentUserKeyword = "";
let currentUserStatusFilter = "all";

function getUserStatus(u) {
  if (u.rentCount > u.returnCount) return "pending";   // has unreturned bike
  return "normal";                                     // normal
}

function renderUserTable() {
  const tbody = $("userTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  const list = USERS.filter(u => {
    const matchKw =
      !currentUserKeyword ||
      u.uId.toLowerCase().includes(currentUserKeyword.toLowerCase()) ||
      u.name.toLowerCase().includes(currentUserKeyword.toLowerCase());

    const st = getUserStatus(u);
    const matchStatus = currentUserStatusFilter === "all" || st === currentUserStatusFilter;

    return matchKw && matchStatus;
  });

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6">
      <div class="empty-state"><div class="empty-state-icon">🔍</div>${currentLang === "en" ? "No matching members" : "沒有符合條件的會員"}</div>
    </td></tr>`;
    return;
  }

  list.forEach(u => {
    const st = getUserStatus(u);
    const info = USER_STATUS_LABEL[st];
    const genderText = u.gender === "M"
      ? (currentLang === "en" ? "Male" : "男")
      : (u.gender === "F" ? (currentLang === "en" ? "Female" : "女") : u.gender);
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${u.uId}</td>
      <td>${u.name}</td>
      <td>${genderText}</td>
      <td><span class="num">${u.rentCount}</span></td>
      <td><span class="num">${u.returnCount}</span></td>
      <td><span class="badge ${info.badge}">${info[currentLang] || info.text || ""}</span></td>`;
    tbody.appendChild(tr);
  });
}

function setupUserFilters() {
  const searchInput = $("userSearch");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentUserKeyword = e.target.value.trim();
      renderUserTable();
    });
  }

  document.querySelectorAll("#userStatusFilter .filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#userStatusFilter .filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentUserStatusFilter = btn.dataset.ustatus;
      renderUserTable();
    });
  });
}

/* ============================================
   7. RENTAL RECORDS PAGE
   ============================================ */

let currentRecordKeyword = "";

function renderRecordTable() {
  const tbody = $("recordTableBody");
  tbody.innerHTML = "";

  const list = RECORDS.filter(r => {
    if (!currentRecordKeyword) return true;
    const kw = currentRecordKeyword.toLowerCase();
    return r.uId.toLowerCase().includes(kw) || r.bId.toLowerCase().includes(kw);
  });

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5">
      <div class="empty-state"><div class="empty-state-icon">📋</div>${currentLang === "en" ? "No matching records" : "沒有符合條件的紀錄"}</div>
    </td></tr>`;
    return;
  }

  list.forEach(r => {
    // Compute status from returnTime: empty -> renting, filled -> returned
    const isReturned = r.returnTime && r.returnTime.trim() !== "";
    const recStatus = isReturned ? RECORD_STATUS.returned : RECORD_STATUS.rented;
    const badge = `<span class="badge ${recStatus.badge}">${recStatus[currentLang]}</span>`;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${r.uId}</td>
      <td>${r.bId}</td>
      <td>${r.rentTime}</td>
      <td>${r.returnTime || "-"}</td>
      <td>${badge}</td>`;
    tbody.appendChild(tr);
  });
}

function setupRecordFilters() {
  $("recordSearch").addEventListener("input", (e) => {
    currentRecordKeyword = e.target.value.trim();
    renderRecordTable();
  });
}

/* ============================================
   8. CUSTOMER SERVICE PAGE – form + history table
   ============================================ */

function populateStationSelect() {
  const sel = $("formSid");
  // Remove old options except the first
  while (sel.options.length > 1) sel.remove(1);
  STATIONS.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s.sId;
    opt.textContent = `${s.sId} - ${s.name}`;
    sel.appendChild(opt);
  });
}

function renderServiceTable() {
  const tbody = $("serviceTableBody");
  tbody.innerHTML = "";

  if (SERVICES.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6">
      <div class="empty-state"><div class="empty-state-icon">📭</div>${currentLang === "en" ? "No reports yet" : "目前沒有回報紀錄"}</div>
    </td></tr>`;
    return;
  }

  SERVICES.forEach(sv => {
    const info = STATUS_LABEL[sv.status];
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${sv.formId}</td>
      <td>${sv.no || "-"}</td>
      <td>${sv.uId}</td>
      <td>${getStationName(sv.sId)}</td>
      <td>${sv.desc}</td>
      <td><span class="badge ${info.badge}">${info[currentLang] || info.text || ""}</span></td>`;
    tbody.appendChild(tr);
  });
}

function setupServiceForm() {
  $("serviceForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const uId  = $("formUid").value.trim();
    const sId  = $("formSid").value;
    const no   = $("formNo").value;
    const type = $("formType").value;
    const desc = $("formDesc").value.trim();

    if (!uId || !sId || !no || !type || !desc) {
      showToast(currentLang === "en" ? "Please fill in all required fields" : "請填寫所有必填欄位", "error");
      return;
    }

    // Generate formId like F0005, F0006... (CHAR(5))
    const formId = "F" + String(nextFormIdNum++).padStart(4, "0");

    const newSv = {
      formId,
      no,
      uId,
      sId,
      desc: `[${type}] ${desc}`,
      status: "處理中"
    };
    SERVICES.unshift(newSv);

    showToast(currentLang === "en" ? "Report submitted — we'll handle it ASAP" : "回報已送出，我們將盡快處理", "success");
    e.target.reset();
    renderServiceTable();
    renderAdminServiceTable();   // sync admin table
  });
}

/* ============================================
   9. DASHBOARD PAGE – charts + statistics
   ============================================ */

function renderDashboard() {
  // Bar chart of bikes per station
  const maxBikes = Math.max(...STATIONS.map(s => s.bikeCount), 1);
  const bikeChart = $("bikeBarChart");
  bikeChart.innerHTML = "";
  STATIONS.forEach(s => {
    const pct = Math.round((s.bikeCount / maxBikes) * 100);
    const row = document.createElement("div");
    row.className = "bar-row";
    row.innerHTML = `
      <div class="bar-label" title="${s.name}">${s.name}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
      <div class="bar-value">${s.bikeCount}</div>`;
    bikeChart.appendChild(row);
  });

  // Bar chart of empty slots
  const maxSlots = Math.max(...STATIONS.map(s => s.emptySlots), 1);
  const slotChart = $("slotBarChart");
  slotChart.innerHTML = "";
  STATIONS.forEach(s => {
    const pct = Math.round((s.emptySlots / maxSlots) * 100);
    const row = document.createElement("div");
    row.className = "bar-row";
    row.innerHTML = `
      <div class="bar-label" title="${s.name}">${s.name}</div>
      <div class="bar-track"><div class="bar-fill slot" style="width:${pct}%"></div></div>
      <div class="bar-value">${s.emptySlots}</div>`;
    slotChart.appendChild(row);
  });

  // Bikes currently under repair
  const repair = BIKES.filter(b => b.status === "Repair").length;
  $("repairCount").textContent = repair;

  // Top popular stations – use rentCount totals from USERS (mock rental count per station)
  // This is a "demo ranking" based on sample data
  const rentedByStation = {};
  RECORDS.forEach(r => {
    const bike = BIKES.find(b => b.bId === r.bId);
    if (bike && bike.sId) {
      rentedByStation[bike.sId] = (rentedByStation[bike.sId] || 0) + 1;
    }
  });
  // Add influence from USERS' rentCount for richer mock data
  const userInfluence = USERS.reduce((sum, u) => sum + u.rentCount, 0);

  const popular = STATIONS.map(s => {
    const score = (rentedByStation[s.sId] || 0) * 3 + s.bikeCount + Math.round(userInfluence / STATIONS.length);
    return { ...s, score };
  }).sort((a, b) => b.score - a.score).slice(0, 5);

  const popularList = $("popularList");
  popularList.innerHTML = "";
  popular.forEach((s, idx) => {
    const rank = idx + 1;
    const item = document.createElement("div");
    item.className = "popular-item";
    item.innerHTML = `
      <div class="popular-rank rank-${rank}">${rank}</div>
      <div class="popular-name">${s.name}</div>
      <div class="popular-count">${s.score} ${currentLang === "en" ? "pts" : "分"}</div>`;
    popularList.appendChild(item);
  });

  // Note: demo ranking
  const note = document.createElement("p");
  note.className = "hint";
  note.style.marginTop = "8px";
  note.textContent = currentLang === "en"
    ? "※ Demo ranking — for display only."
    : "※ 此為「示意排行」，僅供展示用途。";
  popularList.appendChild(note);
}

/* ============================================
   10. ADMIN PAGE – manage stations + service
   ============================================ */

// 10.1 Station management
let editingStationId = null;   // null = adding new, sId = editing

function renderAdminStationTable() {
  const tbody = $("adminStationTableBody");
  tbody.innerHTML = "";

  STATIONS.forEach(s => {
    const editText = currentLang === "en" ? "Edit" : "編輯";
    const delText  = currentLang === "en" ? "Delete" : "刪除";
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${s.sId}</td>
      <td>${s.name}</td>
      <td><span class="num">${s.bikeCount}</span></td>
      <td><span class="num">${s.emptySlots}</span></td>
      <td>
        <button class="btn btn-sm btn-outline" data-edit-station="${s.sId}">${editText}</button>
        <button class="btn btn-sm btn-danger"   data-del-station="${s.sId}">${delText}</button>
      </td>`;
    tbody.appendChild(tr);
  });

  // Edit events
  tbody.querySelectorAll("[data-edit-station]").forEach(btn => {
    btn.addEventListener("click", () => openEditStationModal(btn.dataset.editStation));
  });
  // Delete events
  tbody.querySelectorAll("[data-del-station]").forEach(btn => {
    btn.addEventListener("click", () => deleteStation(btn.dataset.delStation));
  });
}

function openEditStationModal(sId) {
  editingStationId = sId || null;
  const title = $("editModalTitle");
  if (sId) {
    const s = STATIONS.find(x => x.sId === sId);
    title.textContent = currentLang === "en" ? "Edit Station" : "編輯站點";
    $("editSid").value        = s.sId;
    $("editName").value       = s.name;
    $("editBikeCount").value  = s.bikeCount;
    $("editEmptySlots").value = s.emptySlots;
    $("editSid").disabled = true;   // sId is not editable
  } else {
    title.textContent = currentLang === "en" ? "Add Station" : "新增站點";
    $("stationEditForm").reset();
    $("editSid").disabled = false;
  }
  $("stationEditModal").classList.add("active");
}

function deleteStation(sId) {
  const confirmMsg = currentLang === "en"
    ? `Are you sure you want to delete station ${sId}?`
    : `確定要刪除站點 ${sId} 嗎？`;
  if (!confirm(confirmMsg)) return;
  const idx = STATIONS.findIndex(s => s.sId === sId);
  if (idx >= 0) STATIONS.splice(idx, 1);

  showToast(currentLang === "en" ? "Station deleted" : "已刪除站點", "success");
  renderAdminStationTable();
  renderStationTable();          // sync user-facing table
  renderHomeStats();
  renderDashboard();
}

function setupStationEdit() {
  $("addStationBtn").addEventListener("click", () => openEditStationModal(null));
  $("editModalClose").addEventListener("click", () => $("stationEditModal").classList.remove("active"));
  $("editCancel").addEventListener("click",   () => $("stationEditModal").classList.remove("active"));
  $("stationEditModal").addEventListener("click", (e) => {
    if (e.target.id === "stationEditModal") $("stationEditModal").classList.remove("active");
  });

  $("stationEditForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const sId        = $("editSid").value.trim();
    const name       = $("editName").value.trim();
    const bikeCount  = parseInt($("editBikeCount").value, 10);
    const emptySlots = parseInt($("editEmptySlots").value, 10);

    const T = currentLang === "en";
    if (!sId || !name || isNaN(bikeCount) || isNaN(emptySlots)) {
      showToast(T ? "Please fill in all fields" : "請填寫完整資料", "error");
      return;
    }

    // Validate: sId must be 5 chars (CHAR(5)), counts non-negative
    if (sId.length !== 5) {
      showToast(T ? "Station ID must be 5 characters" : "站號必須為 5 個字元", "error");
      return;
    }
    if (bikeCount < 0 || emptySlots < 0) {
      showToast(T ? "Counts cannot be negative" : "數量不得為負數", "error");
      return;
    }

    if (editingStationId) {
      // Update
      const s = STATIONS.find(x => x.sId === editingStationId);
      if (s) {
        s.name = name;
        s.bikeCount = bikeCount;
        s.emptySlots = emptySlots;
      }
      showToast(T ? "Station updated" : "站點已更新", "success");
    } else {
      // Add new
      if (STATIONS.some(x => x.sId === sId)) {
        showToast(T ? "Station ID already exists" : "站號已存在", "error");
        return;
      }
      STATIONS.push({ sId, name, bikeCount, emptySlots });
      showToast(T ? "Station added" : "已新增站點", "success");
    }

    $("stationEditModal").classList.remove("active");
    renderAdminStationTable();
    renderStationTable();
    populateStationSelect();
    renderHomeStats();
    renderDashboard();
  });
}

// 10.2 Service management
function renderAdminServiceTable() {
  const tbody = $("adminServiceTableBody");
  tbody.innerHTML = "";

  if (SERVICES.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7">
      <div class="empty-state"><div class="empty-state-icon">📭</div>${currentLang === "en" ? "No reports yet" : "目前沒有回報"}</div>
    </td></tr>`;
    return;
  }

  SERVICES.forEach(sv => {
    const info = STATUS_LABEL[sv.status];
    const resolveText = currentLang === "en" ? "Resolve" : "標記完成";
    const closedText  = currentLang === "en" ? "Closed"  : "已結案";
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${sv.formId}</td>
      <td>${sv.no || "-"}</td>
      <td>${sv.uId}</td>
      <td>${getStationName(sv.sId)}</td>
      <td>${sv.desc}</td>
      <td><span class="badge ${info.badge}">${info[currentLang] || info.text || ""}</span></td>
      <td>
        ${sv.status === "處理中"
          ? `<button class="btn btn-sm btn-primary" data-resolve="${sv.formId}">${resolveText}</button>`
          : `<span style="color:var(--text-light);font-size:.85rem">${closedText}</span>`}
      </td>`;
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll("[data-resolve]").forEach(btn => {
    btn.addEventListener("click", () => resolveService(btn.dataset.resolve));
  });
}

function resolveService(formId) {
  const sv = SERVICES.find(x => x.formId === formId);
  if (!sv) return;
  sv.status = "已完成";
  showToast(currentLang === "en"
    ? `Form ${formId} marked as resolved`
    : `表單 ${formId} 已標記為完成`, "success");
  renderAdminServiceTable();
  renderServiceTable();    // sync service page
}

// 10.3 Admin tabs
function setupAdminTabs() {
  document.querySelectorAll(".admin-tabs .tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".admin-tabs .tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      $("tab-" + btn.dataset.tab).classList.add("active");
    });
  });
}

// 10.4 User management (admin)
let editingUserId = null;   // null = adding new

function renderAdminUserTable() {
  const tbody = $("adminUserTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  USERS.forEach(u => {
    const st = getUserStatus(u);
    const info = USER_STATUS_LABEL[st];
    const genderText = u.gender === "M"
      ? (currentLang === "en" ? "Male" : "男")
      : (u.gender === "F" ? (currentLang === "en" ? "Female" : "女") : u.gender);
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${u.uId}</td>
      <td>${u.name}</td>
      <td>${genderText}</td>
      <td><span class="num">${u.rentCount}</span></td>
      <td><span class="num">${u.returnCount}</span></td>
      <td><span class="badge ${info.badge}">${info[currentLang] || info.text || ""}</span></td>
      <td>
        <button class="btn btn-sm btn-outline" data-edit-user="${u.uId}">${currentLang === "en" ? "Edit" : "編輯"}</button>
        <button class="btn btn-sm btn-danger" data-del-user="${u.uId}">${currentLang === "en" ? "Delete" : "刪除"}</button>
      </td>`;
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll("[data-edit-user]").forEach(btn => {
    btn.addEventListener("click", () => openEditUserModal(btn.dataset.editUser));
  });
  tbody.querySelectorAll("[data-del-user]").forEach(btn => {
    btn.addEventListener("click", () => deleteUser(btn.dataset.delUser));
  });
}

function openEditUserModal(uId) {
  editingUserId = uId || null;
  const title = $("userEditModalTitle");
  const uidInput = $("editUid");
  if (uId) {
    const u = USERS.find(x => x.uId === uId);
    if (!u) return;
    title.textContent = currentLang === "en" ? "Edit Member" : "編輯會員";
    uidInput.value = u.uId;
    uidInput.disabled = true;
    $("editUserName").value   = u.name;
    $("editGender").value     = u.gender;
    $("editRentCount").value  = u.rentCount;
    $("editReturnCount").value = u.returnCount;
  } else {
    title.textContent = currentLang === "en" ? "Add Member" : "新增會員";
    $("userEditForm").reset();
    uidInput.disabled = false;
  }
  $("userEditModal").classList.add("active");
}

function deleteUser(uId) {
  const confirmMsg = currentLang === "en"
    ? `Are you sure you want to delete member ${uId}?`
    : `確定要刪除會員 ${uId} 嗎？`;
  if (!confirm(confirmMsg)) return;
  const idx = USERS.findIndex(u => u.uId === uId);
  if (idx >= 0) USERS.splice(idx, 1);

  showToast(currentLang === "en" ? "Member deleted" : "已刪除會員", "success");
  renderAdminUserTable();
  renderUserTable();   // sync user-facing table
}

function setupUserEdit() {
  const addBtn = $("addUserBtn");
  if (!addBtn) return;

  addBtn.addEventListener("click", () => openEditUserModal(null));
  $("userEditModalClose").addEventListener("click", () => $("userEditModal").classList.remove("active"));
  $("userEditCancel").addEventListener("click",   () => $("userEditModal").classList.remove("active"));
  $("userEditModal").addEventListener("click", (e) => {
    if (e.target.id === "userEditModal") $("userEditModal").classList.remove("active");
  });

  $("userEditForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const uId        = $("editUid").value.trim();
    const name       = $("editUserName").value.trim();
    const gender     = $("editGender").value;
    const rentCount  = parseInt($("editRentCount").value, 10);
    const returnCount = parseInt($("editReturnCount").value, 10);

    const T = currentLang === "en";
    if (!uId || !name || !gender || isNaN(rentCount) || isNaN(returnCount)) {
      showToast(T ? "Please fill in all fields" : "請填寫完整資料", "error");
      return;
    }
    if (uId.length !== 5) {
      showToast(T ? "User ID must be 5 characters" : "會員編號必須為 5 個字元", "error");
      return;
    }
    if (rentCount < 0 || returnCount < 0) {
      showToast(T ? "Counts cannot be negative" : "次數不得為負數", "error");
      return;
    }

    if (editingUserId) {
      // Update
      const u = USERS.find(x => x.uId === editingUserId);
      if (u) {
        u.name = name;
        u.gender = gender;
        u.rentCount = rentCount;
        u.returnCount = returnCount;
      }
      showToast(T ? "Member updated" : "會員資料已更新", "success");
    } else {
      // Add new
      if (USERS.some(x => x.uId === uId)) {
        showToast(T ? "User ID already exists" : "會員編號已存在", "error");
        return;
      }
      USERS.push({ uId, name, gender, rentCount, returnCount });
      showToast(T ? "Member added" : "已新增會員", "success");
    }

    $("userEditModal").classList.remove("active");
    renderAdminUserTable();
    renderUserTable();
  });
}

/* ============================================
   11. INIT
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  setupRoleSwitch();
  setupMobileMenu();
  setupAuthButtons();
  setupLanguageSwitch();

  // Apply language (default: zh)
  applyI18n();

  // Apply default access rights (guest)
  applyRoleAccess();

  // Home
  renderHomeStats();
  setupQuickSearch();

  // Stations
  renderStationTable();
  setupStationFilters();
  setupStationModal();

  // Users
  renderUserTable();
  setupUserFilters();

  // Bikes
  renderBikeTable();
  setupBikeFilters();

  // Records
  renderRecordTable();
  setupRecordFilters();

  // Service
  populateStationSelect();
  renderServiceTable();
  setupServiceForm();

  // Dashboard
  renderDashboard();

  // Admin
  renderAdminStationTable();
  renderAdminServiceTable();
  setupStationEdit();
  setupAdminTabs();
  renderAdminUserTable();
  setupUserEdit();

  console.log("🚲 智慧共享自行車系統已啟動，共 " + STATIONS.length + " 個站點、"
              + BIKES.length + " 台車輛、" + USERS.length + " 位會員。");
});
