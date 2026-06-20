/**
 * 🚲 智慧共享自行車系統 - 後端伺服器 (server.js)
 * 
 * 本檔案依據 `todo.md` 中的規格書開發，採雙階段設計：
 *   - 第一階段：使用記憶體全域陣列進行資料暫存 (預設啟動)
 *   - 第二階段：連線至真實 SQL Server / SSMS 資料庫 (將 USE_DATABASE 設為 true 並填寫設定即可切換)
 */

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// 1. 中間件配置
// ============================================
app.use(cors()); // 允許跨網域存取 (CORS)
app.use(express.json()); // 解析 JSON 格式的 Request Body

// 提供前端靜態檔案服務 (方便本機直接訪問 http://localhost:3000 運行完整專案)
app.use(express.static(__dirname));

// ============================================
// 2. 第一階段：記憶體暫存資料 (Initial Mock Data)
// ============================================
let STATIONS = [
  { sId: "S0001", name: "FCU Main Gate",          bikeCount: 20, emptySlots: 10 },
  { sId: "S0002", name: "Taichung Station",       bikeCount: 35, emptySlots:  5 },
  { sId: "S0003", name: "Feng Chia Night Market", bikeCount: 15, emptySlots:  0 },
  { sId: "S0004", name: "City Hall",              bikeCount:  8, emptySlots: 12 }
];

let USERS = [
  { uId: "U0001", name: "Tony Lin",    gender: "M", rentCount: 10, returnCount: 10 },
  { uId: "U0002", name: "Mary Jane",   gender: "F", rentCount:  5, returnCount:  4 },
  { uId: "U0003", name: "John Doe",    gender: "M", rentCount:  2, returnCount:  2 },
  { uId: "U0004", name: "Emily Chen",  gender: "F", rentCount:  0, returnCount:  0 },
  { uId: "U0005", name: "Bruce Wang",  gender: "M", rentCount: 15, returnCount: 15 }
];

let BIKES = [
  { bId: "B0001", model: "Giant Escape 3",   status: "Available", sId: "S0001" },
  { bId: "B0002", model: "Giant Escape 3",   status: "Rented",    sId: null   },
  { bId: "B0003", model: "Merida Crossway",  status: "Repair",    sId: "S0003" },
  { bId: "B0004", model: "Merida Crossway",  status: "Available", sId: "S0002" }
];

let RECORDS = [
  { uId: "U0001", bId: "B0001", rentTime: "2026-05-28 08:00:00", returnTime: "2026-05-28 08:30:00" },
  { uId: "U0002", bId: "B0002", rentTime: "2026-05-29 09:00:00", returnTime: "" },
  { uId: "U0003", bId: "B0004", rentTime: "2026-05-29 10:00:00", returnTime: "2026-05-29 11:20:00" },
  { uId: "U0005", bId: "B0003", rentTime: "2026-05-30 13:00:00", returnTime: "" }
];

let SERVICES = [
  { formId: "F0001", no: "N001", sId: "S0001", desc: "App crash on login",                    uId: "U0001", status: "處理中" },
  { formId: "F0002", no: "N001", sId: "S0004", desc: "Overcharged on last ride",               uId: "U0002", status: "已完成" },
  { formId: "F0003", no: "N002", sId: "S0003", desc: "Station full cannot return bike",        uId: "U0003", status: "處理中" },
  { formId: "F0004", no: "N003", sId: "S0002", desc: "Broken bike lock",                      uId: "U0005", status: "處理中" }
];

let nextFormIdNumber = 5;

// ============================================
// 3. 第二階段：SQL Server / SSMS 連線設定
// ============================================
const USE_DATABASE = false; // 切換至 true 以連接實體資料庫 (需先 npm install mssql)
let sql = null;

const dbConfig = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || 'YourStrongPassword123',
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_NAME || 'UbikeSystem',
  options: {
    encrypt: false, // 本機 SQL Server 開發一般設為 false
    trustServerCertificate: true // 信任本機憑證
  }
};

// ============================================
// 4. 資料存取層 (Data Access Layer - Repository Pattern)
// ============================================
const db = {
  async connect() {
    if (USE_DATABASE) {
      try {
        sql = require('mssql');
        await sql.connect(dbConfig);
        console.log('\x1b[32m%s\x1b[0m', '⚡ SQL Server Database connected successfully.');
      } catch (err) {
        console.error('\x1b[31m%s\x1b[0m', '❌ Database connection failed! Falling back to Phase 1 in-memory mode.', err.message);
      }
    } else {
      console.log('\x1b[36m%s\x1b[0m', 'ℹ️ Running in Phase 1: In-memory arrays (No database connected).');
    }
  },

  // --- 站點管理 (Stations) ---
  async getStations() {
    if (USE_DATABASE && sql) {
      const result = await sql.query('SELECT * FROM STATIONS');
      return result.recordset;
    }
    return STATIONS;
  },

  async addStation(station) {
    const { sId, name, bikeCount, emptySlots } = station;
    if (USE_DATABASE && sql) {
      const request = new sql.Request();
      request.input('sId', sql.Char(5), sId);
      request.input('name', sql.NVarChar(100), name);
      request.input('bikeCount', sql.Int, bikeCount);
      request.input('emptySlots', sql.Int, emptySlots);

      const check = await request.query('SELECT 1 FROM STATIONS WHERE sId = @sId');
      if (check.recordset.length > 0) {
        throw new Error('Station ID already exists');
      }

      await request.query('INSERT INTO STATIONS (sId, name, bikeCount, emptySlots) VALUES (@sId, @name, @bikeCount, @emptySlots)');
      return true;
    } else {
      if (STATIONS.some(s => s.sId === sId)) {
        throw new Error('Station ID already exists');
      }
      STATIONS.push({ sId, name, bikeCount, emptySlots });
      return true;
    }
  },

  async updateStation(sId, data) {
    const { name, bikeCount, emptySlots } = data;
    if (USE_DATABASE && sql) {
      const request = new sql.Request();
      request.input('sId', sql.Char(5), sId);
      request.input('name', sql.NVarChar(100), name);
      request.input('bikeCount', sql.Int, bikeCount);
      request.input('emptySlots', sql.Int, emptySlots);
      await request.query('UPDATE STATIONS SET name = @name, bikeCount = @bikeCount, emptySlots = @emptySlots WHERE sId = @sId');
      return true;
    } else {
      const station = STATIONS.find(s => s.sId === sId);
      if (!station) throw new Error('Station not found');
      station.name = name;
      station.bikeCount = bikeCount;
      station.emptySlots = emptySlots;
      return true;
    }
  },

  async deleteStation(sId) {
    if (USE_DATABASE && sql) {
      const request = new sql.Request();
      request.input('sId', sql.Char(5), sId);
      await request.query('DELETE FROM STATIONS WHERE sId = @sId');
      return true;
    } else {
      const idx = STATIONS.findIndex(s => s.sId === sId);
      if (idx === -1) throw new Error('Station not found');
      STATIONS.splice(idx, 1);
      return true;
    }
  },

  // --- 會員管理 (Users) ---
  async getUsers() {
    if (USE_DATABASE && sql) {
      const result = await sql.query('SELECT * FROM USERS');
      return result.recordset;
    }
    return USERS;
  },

  async addUser(user) {
    const { uId, name, gender, rentCount, returnCount } = user;
    if (USE_DATABASE && sql) {
      const request = new sql.Request();
      request.input('uId', sql.Char(5), uId);
      request.input('name', sql.NVarChar(100), name);
      request.input('gender', sql.Char(1), gender);
      request.input('rentCount', sql.Int, rentCount);
      request.input('returnCount', sql.Int, returnCount);

      const check = await request.query('SELECT 1 FROM USERS WHERE uId = @uId');
      if (check.recordset.length > 0) {
        throw new Error('User ID already exists');
      }

      await request.query('INSERT INTO USERS (uId, name, gender, rentCount, returnCount) VALUES (@uId, @name, @gender, @rentCount, @returnCount)');
      return true;
    } else {
      if (USERS.some(u => u.uId === uId)) {
        throw new Error('User ID already exists');
      }
      USERS.push({ uId, name, gender, rentCount, returnCount });
      return true;
    }
  },

  async updateUser(uId, data) {
    const { name, gender, rentCount, returnCount } = data;
    if (USE_DATABASE && sql) {
      const request = new sql.Request();
      request.input('uId', sql.Char(5), uId);
      request.input('name', sql.NVarChar(100), name);
      request.input('gender', sql.Char(1), gender);
      request.input('rentCount', sql.Int, rentCount);
      request.input('returnCount', sql.Int, returnCount);
      await request.query('UPDATE USERS SET name = @name, gender = @gender, rentCount = @rentCount, returnCount = @returnCount WHERE uId = @uId');
      return true;
    } else {
      const user = USERS.find(u => u.uId === uId);
      if (!user) throw new Error('User not found');
      user.name = name;
      user.gender = gender;
      user.rentCount = rentCount;
      user.returnCount = returnCount;
      return true;
    }
  },

  async deleteUser(uId) {
    if (USE_DATABASE && sql) {
      const request = new sql.Request();
      request.input('uId', sql.Char(5), uId);
      await request.query('DELETE FROM USERS WHERE uId = @uId');
      return true;
    } else {
      const idx = USERS.findIndex(u => u.uId === uId);
      if (idx === -1) throw new Error('User not found');
      USERS.splice(idx, 1);
      return true;
    }
  },

  // --- 自行車與紀錄 (Bikes & Records) ---
  async getBikes() {
    if (USE_DATABASE && sql) {
      const result = await sql.query('SELECT * FROM BIKES');
      return result.recordset;
    }
    return BIKES;
  },

  async getRecords() {
    if (USE_DATABASE && sql) {
      const result = await sql.query('SELECT * FROM RENTAL_RECORDS');
      return result.recordset;
    }
    return RECORDS;
  },

  // --- 客服回報 (Customer Service) ---
  async getServices() {
    if (USE_DATABASE && sql) {
      const result = await sql.query('SELECT formId, no, sId, uId, description AS [desc], status FROM SERVICES');
      return result.recordset;
    }
    return SERVICES;
  },

  async addService(service) {
    const { no, sId, uId, desc } = service;
    if (USE_DATABASE && sql) {
      // 獲取目前最大的編號來自動產生流水號 (例如 F0005, F0006)
      const maxResult = await sql.query("SELECT MAX(formId) as maxId FROM SERVICES");
      let nextId = 'F0005';
      if (maxResult.recordset[0] && maxResult.recordset[0].maxId) {
        const currentMax = parseInt(maxResult.recordset[0].maxId.substring(1), 10);
        nextId = 'F' + String(currentMax + 1).padStart(4, '0');
      }

      const request = new sql.Request();
      request.input('formId', sql.Char(5), nextId);
      request.input('no', sql.Char(4), no);
      request.input('sId', sql.Char(5), sId);
      request.input('uId', sql.Char(5), uId);
      request.input('desc', sql.NVarChar(500), desc);
      request.input('status', sql.NVarChar(10), '處理中');

      await request.query('INSERT INTO SERVICES (formId, no, sId, uId, description, status) VALUES (@formId, @no, @sId, @uId, @desc, @status)');
      return nextId;
    } else {
      const formId = 'F' + String(nextFormIdNumber++).padStart(4, '0');
      SERVICES.push({
        formId,
        no,
        sId,
        uId,
        desc,
        status: '處理中'
      });
      return formId;
    }
  },

  async resolveService(formId) {
    if (USE_DATABASE && sql) {
      const request = new sql.Request();
      request.input('formId', sql.Char(5), formId);
      await request.query("UPDATE SERVICES SET status = N'已完成' WHERE formId = @formId");
      return true;
    } else {
      const service = SERVICES.find(s => s.formId === formId);
      if (!service) throw new Error('Service ticket not found');
      service.status = '已完成';
      return true;
    }
  }
};

// ============================================
// 5. API 路由實作 (API Routes)
// ============================================

// --- 📍 站點管理 (Stations) ---

// 1. 取得所有站點
app.get('/api/stations', async (req, res) => {
  try {
    const data = await db.getStations();
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 2. 新增單一站點
app.post('/api/stations', async (req, res) => {
  try {
    const { sId, name, bikeCount, emptySlots } = req.body;
    
    // 驗證輸入參數與長度 (sId 必須為 5 個字元)
    if (!sId || !name || bikeCount === undefined || emptySlots === undefined) {
      return res.status(400).json({ success: false, message: "所有欄位均為必填" });
    }
    if (sId.length !== 5) {
      return res.status(400).json({ success: false, message: "站號已存在或格式不符" }); // 符合規格書定義的回傳
    }
    if (parseInt(bikeCount, 10) < 0 || parseInt(emptySlots, 10) < 0) {
      return res.status(400).json({ success: false, message: "數量不得為負數" });
    }

    await db.addStation({
      sId,
      name,
      bikeCount: parseInt(bikeCount, 10),
      emptySlots: parseInt(emptySlots, 10)
    });

    res.json({ success: true, message: "站點新增成功" });
  } catch (err) {
    res.json({ success: false, message: "站號已存在或格式不符" }); // 符合規格書定義的回傳
  }
});

// 3. 修改站點資料
app.put('/api/stations/:sId', async (req, res) => {
  try {
    const { sId } = req.params;
    const { name, bikeCount, emptySlots } = req.body;

    if (!name || bikeCount === undefined || emptySlots === undefined) {
      return res.status(400).json({ success: false, message: "所有欄位均為必填" });
    }
    if (parseInt(bikeCount, 10) < 0 || parseInt(emptySlots, 10) < 0) {
      return res.status(400).json({ success: false, message: "數量不得為負數" });
    }

    await db.updateStation(sId, {
      name,
      bikeCount: parseInt(bikeCount, 10),
      emptySlots: parseInt(emptySlots, 10)
    });

    res.json({ success: true, message: "站點資料更新成功" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 4. 刪除特定站點
app.delete('/api/stations/:sId', async (req, res) => {
  try {
    const { sId } = req.params;
    await db.deleteStation(sId);
    res.json({ success: true, message: "站點已刪除" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// --- 👥 會員管理 (Users) ---

// 1. 取得所有會員
app.get('/api/users', async (req, res) => {
  try {
    const data = await db.getUsers();
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 2. 新增單一會員
app.post('/api/users', async (req, res) => {
  try {
    const { uId, name, gender, rentCount, returnCount } = req.body;

    if (!uId || !name || !gender || rentCount === undefined || returnCount === undefined) {
      return res.status(400).json({ success: false, message: "所有欄位均為必填" });
    }
    if (uId.length !== 5) {
      return res.status(400).json({ success: false, message: "會員編號必須為 5 個字元" });
    }

    await db.addUser({
      uId,
      name,
      gender,
      rentCount: parseInt(rentCount, 10),
      returnCount: parseInt(returnCount, 10)
    });

    res.json({ success: true, message: "會員註冊成功" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// [額外支援] 修改會員資料
app.put('/api/users/:uId', async (req, res) => {
  try {
    const { uId } = req.params;
    const { name, gender, rentCount, returnCount } = req.body;

    if (!name || !gender || rentCount === undefined || returnCount === undefined) {
      return res.status(400).json({ success: false, message: "所有欄位均為必填" });
    }

    await db.updateUser(uId, {
      name,
      gender,
      rentCount: parseInt(rentCount, 10),
      returnCount: parseInt(returnCount, 10)
    });

    res.json({ success: true, message: "會員資料更新成功" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// [額外支援] 刪除特定會員
app.delete('/api/users/:uId', async (req, res) => {
  try {
    const { uId } = req.params;
    await db.deleteUser(uId);
    res.json({ success: true, message: "會員已刪除" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// --- 🚲 自行車與紀錄 (Bikes & Records) ---

// 1. 取得所有車輛狀態
app.get('/api/bikes', async (req, res) => {
  try {
    const data = await db.getBikes();
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 2. 取得所有租借紀錄
app.get('/api/records', async (req, res) => {
  try {
    const data = await db.getRecords();
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// --- 🛠️ 客服回報 (Customer Service) ---

// 1. 取得所有客服案件
app.get('/api/services', async (req, res) => {
  try {
    const data = await db.getServices();
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 2. 提交新問題回報
app.post('/api/services', async (req, res) => {
  try {
    const { no, sId, uId, desc } = req.body;

    if (!no || !sId || !uId || !desc) {
      return res.status(400).json({ success: false, message: "案件編號、站點、會員與問題描述為必填欄位" });
    }

    const formId = await db.addService({ no, sId, uId, desc });
    res.json({ success: true, formId, message: "回報已送出" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 3. 管理員標記完成 (結案)
app.put('/api/services/:formId/resolve', async (req, res) => {
  try {
    const { formId } = req.params;
    await db.resolveService(formId);
    res.json({ success: true, status: "已完成", message: "案件已結案" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 備用路由中間件：如果未匹配 API 路由，且不是 API 請求，則返回 index.html (SPA)
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ success: false, message: "API 路由未找到" });
  }
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ============================================
// 6. 伺服器啟動
// ============================================
db.connect().then(() => {
  app.listen(PORT, () => {
    console.log('\x1b[32m%s\x1b[0m', '==================================================');
    console.log('\x1b[32m%s\x1b[0m', `🚲 智慧共享自行車系統後端已啟動...`);
    console.log('\x1b[32m%s\x1b[0m', `🌐 本機運行網址: http://localhost:${PORT}`);
    console.log('\x1b[32m%s\x1b[0m', '==================================================');
  });
});
