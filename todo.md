這是一份完全使用 **Markdown 語法**編排的後端與串接規格表。你可以直接複製這段內容到你的專案筆記或全新的 `BACKEND_SPEC.md` 檔案中，方便開發時隨時對照。

---

# 🚲 智慧共享自行車系統：後端與串接規格表 (Backend & API Specification)

本文件定義了系統從「純前端 Demo」演進至「前後端分離架構」的開發規格。開發策略採用**兩階段實作**：

* **第一階段**：後端使用 JavaScript 全域陣列進行記憶體暫存（免除資料庫設定干擾）。
* **第二階段**：後端維持相同 API 路由，內部改為連接真實 SQL Server / SSMS 資料庫。

---

## 🛠️ 1. 基礎環境配置規格

| 項目 | 技術規格 / 描述 | 備註 |
| --- | --- | --- |
| **後端執行環境** | Node.js (建議 v18+) | 開發本機環境 |
| **後端核心框架** | Express.js (v4+) | 負責處理 HTTP 請求與路由 |
| **跨網域存取 (CORS)** | 安裝 `cors` 套件並全開 (`app.use(cors())`) | 允許前端 `index.html` 順利跨網域呼叫 API |
| **資料解析格式** | `express.json()` 內建中間件 | 用於解析前端 `POST` / `PUT` 傳來的 JSON 資料 |
| **資料暫存機制** | **第一階段**：全域 JavaScript 陣列<br>

<br>**第二階段**：連接真實 SQL Server / SSMS | 確保開發初期不受資料庫連線與權限問題干擾 |

---

## 🌐 2. API 路由規格表 (API Routes)

後端必須提供以下路由供前端 `app.js` 透過 `fetch()` 進行呼叫。所有識別碼（ID）欄位皆固定為 `CHAR(5)` 格式。

### 📍 站點管理 (Stations)

#### 1. 取得所有站點

* **HTTP 方法**：`GET`
* **API 路徑**：`/api/stations`
* **前端傳入參數**：無
* **後端回傳 JSON**：
```json
[
  { "sId": "S0001", "name": "FCU Main Gate", "bikeCount": 20, "emptySlots": 10 },
  { "sId": "S0002", "name": "Taichung Station", "bikeCount": 35, "emptySlots": 5 }
]

```



#### 2. 新增單一站點

* **HTTP 方法**：`POST`
* **API 路徑**：`/api/stations`
* **前端傳入參數 (Body)**：
```json
{ "sId": "S0005", "name": "FCU Library", "bikeCount": 10, "emptySlots": 15 }

```


* **後端回傳 JSON**：
* *成功*：`{ "success": true, "message": "站點新增成功" }`
* *失敗*：`{ "success": false, "message": "站號已存在或格式不符" }`



#### 3. 修改站點資料

* **HTTP 方法**：`PUT`
* **API 路徑**：`/api/stations/:sId` (動態路由，例如 `/api/stations/S0001`)
* **前端傳入參數 (Body)**：
```json
{ "name": "FCU Main Gate (Updated)", "bikeCount": 18, "emptySlots": 12 }

```


* **後端回傳 JSON**：`{ "success": true, "message": "站點資料更新成功" }`

#### 4. 刪除特定站點

* **HTTP 方法**：`DELETE`
* **API 路徑**：`/api/stations/:sId`
* **前端傳入參數**：無（直接由 URL 帶入 `sId`）
* **後端回傳 JSON**：`{ "success": true, "message": "站點已刪除" }`

---

### 👥 會員管理 (Users)

#### 1. 取得所有會員

* **HTTP 方法**：`GET`
* **API 路徑**：`/api/users`
* **後端回傳 JSON**：
```json
[
  { "uId": "U0001", "name": "Tony Lin", "gender": "M", "rentCount": 10, "returnCount": 10 }
]

```



#### 2. 新增單一會員

* **HTTP 方法**：`POST`
* **API 路徑**：`/api/users`
* **前端傳入參數 (Body)**：
```json
{ "uId": "U0006", "name": "Kevin Durant", "gender": "M", "rentCount": 0, "returnCount": 0 }

```


* **後端回傳 JSON**：`{ "success": true, "message": "會員註冊成功" }`

---

### 🚲 自行車與紀錄 (Bikes & Records)

#### 1. 取得所有車輛狀態

* **HTTP 方法**：`GET`
* **API 路徑**：`/api/bikes`
* **後端回傳 JSON**：
```json
[
  { "bId": "B0001", "model": "Giant Escape 3", "status": "Available", "sId": "S0001" }
]

```



#### 2. 取得所有租借紀錄

* **HTTP 方法**：`GET`
* **API 路徑**：`/api/records`
* **後端回傳 JSON**：
```json
[
  { "uId": "U0001", "bId": "B0001", "rentTime": "2026-05-28 08:00:00", "returnTime": "2026-05-28 08:30:00" }
]

```



---

### 🛠️ 客服回報 (Customer Service)

#### 1. 取得所有客服案件

* **HTTP 方法**：`GET`
* **API 路徑**：`/api/services`
* **後端回傳 JSON**：
```json
[
  { "formId": "F0001", "no": "N001", "sId": "S0001", "uId": "U0001", "desc": "App crash on login", "status": "處理中" }
]

```



#### 2. 提交新問題回報

* **HTTP 方法**：`POST`
* **API 路徑**：`/api/services`
* **前端傳入參數 (Body)**：
```json
{ "no": "N002", "sId": "S0003", "uId": "U0003", "desc": "[無法歸還] 站點已滿無法還車" }

```


* **後端回傳 JSON**：
```json
{ "success": true, "formId": "F0005", "message": "回報已送出" }

```


*(註：`formId` 必須由後端自動流水號生成，如 F0005, F0006...)*

#### 3. 管理員標記完成 (結案)

* **HTTP 方法**：`PUT`
* **API 路徑**：`/api/services/:formId/resolve`
* **後端回傳 JSON**：`{ "success": true, "status": "已完成", "message": "案件已結案" }`

---

## 🔄 3. 前端 `app.js` 修改規格

為了對接後端 API，前端需要進行以下結構性調整：

1. **資料型態轉變**：
* 移除或註解 `app.js` 最頂部的靜態陣列（如 `const STATIONS = [...]`）。
* 改為全域動態變數：`let STATIONS = [];`, `let USERS = [];`。


2. **非同步讀取 (Async/Await)**：
* 網頁初始化時，不再直接渲染畫面，而是先執行 `fetch()` 向後端撈取最新的 JSON 資料，成功後再呼叫前端渲染函式（例如：`renderStationTable()`）。


3. **CRUD 動作連動**：
* 當管理員在前端點擊「儲存」或「刪除」時，必須發送對應的 `fetch(..., { method: 'POST' })` 或 `DELETE` 請求給後端。
* 收到後端回傳 `success: true` 的確認後，前端重新向後端發送 `GET` 請求同步最新狀態，並重新渲染網頁畫面。