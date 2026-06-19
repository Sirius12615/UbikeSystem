# 智慧共享自行車資料庫查詢與管理系統

> Smart Shared Bike Database Query & Management System
> A bilingual (繁體中文 / English) front-end demo of a YouBike-style shared-bike information system.

## Project Overview

This is a pure front-end web application built with **HTML + CSS + vanilla JavaScript** (no framework, no backend, no external library). It simulates a shared-bike system where users can search stations, view bike availability, browse member records, look at rental history, submit customer service reports, and analyze data on a dashboard. An admin role can manage stations, members, and resolve customer service tickets.

The UI follows a **YouBike-inspired green/white theme** and is fully **bilingual** — every label, button, toast, badge, modal message, and footer text can be switched instantly between 繁體中文 and English via the language switch in the header.

## File List

| File | Purpose |
|------|---------|
| `index.html` | Single-page app skeleton: header, 8 page sections, modals, footer. Holds all `data-i18n` attributes that drive translations. |
| `style.css` | YouBike-style green/white theme, responsive layout, badge styles, modal/toast/dashboard visuals. |
| `app.js` | Mock data (5 tables), render functions, role-based access, language switching, all CRUD logic. |
| `README.md` | This document. |

## How to Run

1. Open the project folder `D:\nam2\database` in any modern browser **or** serve it with a local web server (e.g. VS Code *Live Server* extension).
2. Open `index.html` directly — no build step, no dependencies, no installation required.

> Tip: opening `index.html` directly via `file://` works because the project uses no modules, no fetch calls, and no CORS-restricted APIs.

## Data Tables

The mock data models the five tables defined in the project specification (Project 05 PDF). All identifiers use **CHAR(5)** (e.g. `S0001`, `U0001`, `B0001`, `F0001`).

### 1. STATIONS (4 records)
```
{ sId: "S0001", name: "FCU Main Gate",          bikeCount: 20, emptySlots: 10 }
{ sId: "S0002", name: "Taichung Station",       bikeCount: 35, emptySlots:  5 }
{ sId: "S0003", name: "Feng Chia Night Market", bikeCount: 15, emptySlots:  0 }
{ sId: "S0004", name: "City Hall",              bikeCount:  8, emptySlots: 12 }
```

### 2. USERS (5 records)
```
{ uId, name, gender: "M"|"F", rentCount, returnCount }
```
A user is flagged as **pending** (尚有未歸還) when `rentCount > returnCount`.

### 3. BIKES (4 records)
```
{ bId, model, status: "Available"|"Rented"|"Repair", sId }
```
Bikes under repair or rented out can have `sId = null` (the bike's current location is "in use").

### 4. RENTAL RECORDS (4 records)
```
{ uId, bId, rentTime, returnTime }
```
`returnTime` is empty when the bike has not been returned yet — the table computes the **record status** dynamically from this field (rented vs returned).

### 5. CUSTOMER SERVICE / SERVICES (4 records + dynamic additions)
```
{ formId, no, sId, desc, uId, status: "處理中"|"已完成" }
```
New form IDs are generated automatically starting from `F0005` and incrementing (CHAR(5) format).

## Features

### 8 Pages
1. **首頁 / Home** — hero banner, 4 statistic cards, quick search, 4-step guide.
2. **站點查詢 / Station Search** — filterable station table, status badges, detail modal with bilingual suggestions.
3. **會員資料 / Members** — member table with status badge (normal / pending), search & filter.
4. **自行車狀態 / Bike Status** — bike inventory, model, status badge, current station.
5. **租借紀錄 / Rental Records** — rental history with computed returned/renting status.
6. **客服回報 / Customer Service Report** — submit form + report history table.
7. **數據分析 / Dashboard** — bike bar chart, empty-slot bar chart, repair count, top popular stations.
8. **管理員後台 / Admin** — three tabs:
   - **站點管理 / Station Management** — add/edit/delete stations (validates `sId` length = 5, non-negative counts).
   - **會員管理 / Member Management** — add/edit/delete members.
   - **客服案件 / Service Tickets** — resolve pending tickets.

### Role-Based Access (3 roles)
- **訪客 / Guest** — Home, Stations, Bikes.
- **會員 / Member** — adds Members, Records, Service, Dashboard.
- **管理員 / Admin** — adds Admin page.

Switch role with the header buttons; the menu updates immediately and an unauthorized page navigation triggers an error toast.

### Language Switch
The header has `中文 / EN` buttons. `setLanguage(lang)` updates every `data-i18n` text, every `data-i18n-placeholder`, and re-renders every table so that status badges, gender labels, modals, and toasts all flip language in one click.

## Tech Stack

- **HTML5** — single page, semantic tags.
- **CSS3** — flex/grid layout, CSS variables for the theme palette, media queries for responsive header.
- **Vanilla JavaScript (ES6+)** — no jQuery, no React, no Vue.
- **No backend** — all data lives in `app.js` and changes only persist for the current session.

## Key Functions in `app.js`

| Function | Section | Responsibility |
|----------|---------|---------------|
| `applyI18n()` | i18n | Walks every `[data-i18n]` and `[data-i18n-placeholder]` element and swaps the text via `LANG_TEXT`. |
| `setLanguage(lang)` | i18n | Sets `currentLang`, runs `applyI18n()`, and re-renders all tables + dashboard. |
| `setupLanguageSwitch()` | i18n | Wires the language buttons in `#langSwitch`. |
| `navigateTo(pageName)` | Nav | Switches the visible page section, validates the role, scrolls to top. |
| `applyRoleAccess()` / `setupRoleSwitch()` | Role | Toggles which nav links each role can see; auto-routes on role change. |
| `getStationStatus(s)` | Stations | Returns `normal / full / empty / low` based on bikeCount + emptySlots. |
| `getStationName(sId)` | Stations | Returns `"-"` when `sId` is null/empty/missing. |
| `renderStationTable()` | Stations | Renders the station table with search + status filter. |
| `openStationModal(s)` | Stations | Opens the detail modal with bilingual suggestion message. |
| `renderUserTable()` / `setupUserFilters()` | Users | Renders the member table with keyword + status filter. |
| `renderBikeTable()` / `setupBikeFilters()` | Bikes | Renders the bike inventory table. |
| `renderRecordTable()` | Records | Computes record status from `returnTime` on the fly. |
| `setupServiceForm()` / `populateStationSelect()` | Service | Validates and submits a new service ticket; auto-generates `formId`. |
| `renderDashboard()` | Dashboard | Builds two bar charts, repair count, and top-5 popular stations ranking. |
| `renderAdminStationTable()` / `setupStationEdit()` | Admin | CRUD for stations with `sId.length === 5` and non-negative validation. |
| `renderAdminUserTable()` / `setupUserEdit()` | Admin | CRUD for members. |
| `renderAdminServiceTable()` / `resolveService()` | Admin | List tickets and mark them as resolved. |
| `showToast(msg, type)` | UI | Briefly shows a success/error notification. |

## Validation Rules

- **Station ID** (`sId`): exactly **5 characters**, unique.
- **User ID** (`uId`): exactly **5 characters**, unique.
- **Form ID** (`formId`): generated as `"F" + padStart(4, "0")` starting from `F0005`.
- **Bike / slot counts**: must be non-negative integers.
- **Record status**: derived from `returnTime` — empty string ⇒ renting, non-empty ⇒ returned.
- **Service status**: starts as `"處理中"`, becomes `"已完成"` after admin resolves the ticket.

## Notes

- All explanatory comments in `index.html`, `style.css`, and `app.js` are written in **English**.
- All user-visible text in the default UI is **繁體中文**; switching to **EN** swaps every label, placeholder, badge, and toast message.
- Footer with About / Help / FAQ / Contact columns appears on every page.
- Console prints a startup banner: `🚲 智慧共享自行車系統已啟動…`

— Project 05 · Smart Shared Bike Database · 2026
