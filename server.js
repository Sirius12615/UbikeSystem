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
app.use(express.json({ limit: '50mb' })); // 解析 JSON 格式的 Request Body (加大上限以支援千筆 CSV 上傳)

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
  { uId: "U0001", name: "Tony Lin",    gender: "M", rentCount: 24, returnCount: 24 },
  { uId: "U0002", name: "Mary Jane",   gender: "F", rentCount: 15, returnCount: 14 },
  { uId: "U0003", name: "John Doe",    gender: "M", rentCount: 8,  returnCount: 8  },
  { uId: "U0004", name: "Emily Chen",  gender: "F", rentCount: 3,  returnCount: 3  },
  { uId: "U0005", name: "Bruce Wang",  gender: "M", rentCount: 42, returnCount: 42 },
  { uId: "U0006", name: "David Beckham", gender: "M", rentCount: 19, returnCount: 18 },
  { uId: "U0007", name: "Sarah Connor", gender: "F", rentCount: 11, returnCount: 11 },
  { uId: "U0008", name: "James Bond",  gender: "M", rentCount: 57, returnCount: 57 },
  { uId: "U0009", name: "Alice Wonderland", gender: "F", rentCount: 5, returnCount: 5 },
  { uId: "U0010", name: "Bob Builder", gender: "M", rentCount: 12, returnCount: 11 },
  { uId: "U0011", name: "Peter Parker", gender: "M", rentCount: 33, returnCount: 33 },
  { uId: "U0012", name: "Clark Kent",  gender: "M", rentCount: 8,  returnCount: 8  },
  { uId: "U0013", name: "Diana Prince", gender: "F", rentCount: 29, returnCount: 29 },
  { uId: "U0014", name: "Bruce Wayne", gender: "M", rentCount: 95, returnCount: 95 },
  { uId: "U0015", name: "Selina Kyle", gender: "F", rentCount: 17, returnCount: 17 }
];

let BIKES = [
  { bId: "B0001", model: "Giant Escape 3",   status: "Available", sId: "S0001" },
  { bId: "B0002", model: "Giant Escape 3",   status: "Rented",    sId: null   },
  { bId: "B0003", model: "Merida Crossway",  status: "Repair",    sId: "S0003" },
  { bId: "B0004", model: "Merida Crossway",  status: "Available", sId: "S0002" },
  { bId: "B0005", model: "Giant Escape 3",   status: "Available", sId: "S0001" },
  { bId: "B0006", model: "Giant Escape 3",   status: "Available", sId: "S0002" },
  { bId: "B0007", model: "YouBike 2.0",      status: "Available", sId: "S0001" },
  { bId: "B0008", model: "YouBike 2.0",      status: "Rented",    sId: null   },
  { bId: "B0009", model: "YouBike 2.0",      status: "Repair",    sId: null   },
  { bId: "B0010", model: "Giant Escape 3",   status: "Available", sId: "S0003" },
  { bId: "B0011", model: "Merida Crossway",  status: "Available", sId: "S0004" },
  { bId: "B0012", model: "Giant Escape 3",   status: "Available", sId: "S0002" },
  { bId: "B0013", model: "YouBike 2.0",      status: "Available", sId: "S0003" },
  { bId: "B0014", model: "YouBike 2.0",      status: "Available", sId: "S0004" },
  { bId: "B0015", model: "Merida Crossway",  status: "Available", sId: "S0001" },
  { bId: "B0016", model: "Giant Escape 3",   status: "Rented",    sId: null   },
  { bId: "B0017", model: "YouBike 2.0",      status: "Available", sId: "S0002" },
  { bId: "B0018", model: "Merida Crossway",  status: "Available", sId: "S0003" },
  { bId: "B0019", model: "Giant Escape 3",   status: "Available", sId: "S0004" },
  { bId: "B0020", model: "YouBike 2.0",      status: "Repair",    sId: "S0001" }
];

let RECORDS = [
  { uId: "U0001", bId: "B0001", rentTime: "2026-06-23 08:00:00", returnTime: "2026-06-23 08:30:00" },
  { uId: "U0002", bId: "B0002", rentTime: "2026-06-24 09:00:00", returnTime: "" },
  { uId: "U0003", bId: "B0004", rentTime: "2026-06-24 10:00:00", returnTime: "2026-06-24 11:20:00" },
  { uId: "U0005", bId: "B0003", rentTime: "2026-06-24 13:00:00", returnTime: "2026-06-24 14:15:00" },
  { uId: "U0006", bId: "B0008", rentTime: "2026-06-25 07:30:00", returnTime: "" },
  { uId: "U0008", bId: "B0011", rentTime: "2026-06-25 08:15:00", returnTime: "2026-06-25 09:05:00" },
  { uId: "U0010", bId: "B0016", rentTime: "2026-06-25 11:00:00", returnTime: "" },
  { uId: "U0011", bId: "B0005", rentTime: "2026-06-25 12:30:00", returnTime: "2026-06-25 13:10:00" },
  { uId: "U0013", bId: "B0012", rentTime: "2026-06-25 14:00:00", returnTime: "2026-06-25 15:45:00" },
  { uId: "U0014", bId: "B0014", rentTime: "2026-06-25 15:20:00", returnTime: "2026-06-25 15:50:00" },
  { uId: "U0015", bId: "B0015", rentTime: "2026-06-25 16:10:00", returnTime: "2026-06-25 17:00:00" },
  { uId: "U0008", bId: "B0007", rentTime: "2026-06-25 18:00:00", returnTime: "2026-06-25 18:40:00" }
];

let SERVICES = [
  { formId: "F0001", no: "N001", sId: "S0001", desc: "App crash on login",                    uId: "U0001", status: "處理中" },
  { formId: "F0002", no: "N001", sId: "S0004", desc: "Overcharged on last ride",               uId: "U0002", status: "已完成" },
  { formId: "F0003", no: "N002", sId: "S0003", desc: "Station full cannot return bike",        uId: "U0003", status: "處理中" },
  { formId: "F0004", no: "N003", sId: "S0002", desc: "Broken bike lock",                      uId: "U0005", status: "處理中" },
  { formId: "F0005", no: "N001", sId: "S0001", desc: "Brakes not responsive on B0001",        uId: "U0008", status: "已完成" },
  { formId: "F0006", no: "N002", sId: "S0003", desc: "Flat tire on B0010",                    uId: "U0011", status: "處理中" },
  { formId: "F0007", no: "N003", sId: "S0004", desc: "Bike dock QR code scratched off",        uId: "U0013", status: "已完成" },
  { formId: "F0008", no: "N001", sId: "S0002", desc: "Left personal belongings in basket",     uId: "U0015", status: "處理中" }
];

let nextFormIdNumber = 9;

// ============================================
// 3. 第二階段：SQL Server / SSMS 連線設定
// ============================================
const USE_DATABASE = true; // 切換至 true 以連接實體資料庫 (需先 npm install mssql)
let sql = null;

const dbConfig = {
  user: process.env.DB_USER || 'db2_26',
  password: process.env.DB_PASSWORD || 'db2_26',
  server: process.env.DB_SERVER || '163.17.9.18',
  database: process.env.DB_NAME || undefined, // 連線至該帳號的預設資料庫，或透過 DB_NAME 環境變數自訂
  options: {
    encrypt: true, // 使用選擇性加密
    trustServerCertificate: true, // 信任自我簽署憑證 (self-signed certificate)
    serverName: 'orcl1' // 憑證中的主機名稱
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
      const result = await sql.query('SELECT sno AS sId, sna AS name, sbi_quantity AS bikeCount, bemp AS emptySlots FROM STATIONS');
      return result.recordset;
    }
    return STATIONS;
  },

  async addStation(station) {
    const { sId, name, bikeCount, emptySlots } = station;
    if (USE_DATABASE && sql) {
      const request = new sql.Request();
      request.input('sno', sql.VarChar(20), sId);
      request.input('sna', sql.NVarChar(100), name);
      request.input('sbi_quantity', sql.Int, bikeCount);
      request.input('bemp', sql.Int, emptySlots);
      request.input('tot_quantity', sql.Int, parseInt(bikeCount, 10) + parseInt(emptySlots, 10));

      const check = await request.query('SELECT 1 FROM STATIONS WHERE sno = @sno');
      if (check.recordset.length > 0) {
        throw new Error('Station ID already exists');
      }

      await request.query('INSERT INTO STATIONS (sno, sna, sbi_quantity, bemp, tot_quantity, act) VALUES (@sno, @sna, @sbi_quantity, @bemp, @tot_quantity, 1)');
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
      request.input('sno', sql.VarChar(20), sId);
      request.input('sna', sql.NVarChar(100), name);
      request.input('sbi_quantity', sql.Int, bikeCount);
      request.input('bemp', sql.Int, emptySlots);
      request.input('tot_quantity', sql.Int, parseInt(bikeCount, 10) + parseInt(emptySlots, 10));
      await request.query('UPDATE STATIONS SET sna = @sna, sbi_quantity = @sbi_quantity, bemp = @bemp, tot_quantity = @tot_quantity WHERE sno = @sno');
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
      request.input('sno', sql.VarChar(20), sId);
      await request.query('DELETE FROM STATIONS WHERE sno = @sno');
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
    const upperUid = uId.toUpperCase();
    if (USE_DATABASE && sql) {
      const request = new sql.Request();
      request.input('uId', sql.Char(5), upperUid);
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
      if (USERS.some(u => u.uId === upperUid)) {
        throw new Error('User ID already exists');
      }
      USERS.push({ uId: upperUid, name, gender, rentCount, returnCount });
      return true;
    }
  },

  async updateUser(uId, data) {
    const { name, gender, rentCount, returnCount } = data;
    const upperUid = uId.toUpperCase();
    if (USE_DATABASE && sql) {
      const request = new sql.Request();
      request.input('uId', sql.Char(5), upperUid);
      request.input('name', sql.NVarChar(100), name);
      request.input('gender', sql.Char(1), gender);
      request.input('rentCount', sql.Int, rentCount);
      request.input('returnCount', sql.Int, returnCount);
      await request.query('UPDATE USERS SET name = @name, gender = @gender, rentCount = @rentCount, returnCount = @returnCount WHERE uId = @uId');
      return true;
    } else {
      const user = USERS.find(u => u.uId === upperUid);
      if (!user) throw new Error('User not found');
      user.name = name;
      user.gender = gender;
      user.rentCount = rentCount;
      user.returnCount = returnCount;
      return true;
    }
  },

  async deleteUser(uId) {
    const upperUid = uId.toUpperCase();
    if (USE_DATABASE && sql) {
      const request = new sql.Request();
      request.input('uId', sql.Char(5), upperUid);
      await request.query('DELETE FROM USERS WHERE uId = @uId');
      return true;
    } else {
      const idx = USERS.findIndex(u => u.uId === upperUid);
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

  async addBike(bike) {
    const { bId, model, status, sId } = bike;
    const upperBid = bId.toUpperCase();
    const formattedSid = sId ? sId.trim().toUpperCase() : null;
    
    if (USE_DATABASE && sql) {
      if (formattedSid) {
        const stationCheck = new sql.Request();
        stationCheck.input('sId', sql.VarChar(20), formattedSid);
        const stationResult = await stationCheck.query('SELECT 1 FROM STATIONS WHERE sno = @sId');
        if (stationResult.recordset.length === 0) {
          throw new Error('站點不存在 (Station ID does not exist)');
        }
      }

      const request = new sql.Request();
      request.input('bId', sql.Char(5), upperBid);
      const check = await request.query('SELECT 1 FROM BIKES WHERE bId = @bId');
      if (check.recordset.length > 0) {
        throw new Error('車輛編號已存在 (Bike ID already exists)');
      }

      request.input('model', sql.NVarChar(100), model);
      request.input('status', sql.NVarChar(20), status);
      request.input('sId', sql.VarChar(20), formattedSid || null);
      await request.query('INSERT INTO BIKES (bId, model, status, sId) VALUES (@bId, @model, @status, @sId)');
      return true;
    } else {
      if (formattedSid && !STATIONS.some(s => s.sId === formattedSid)) {
        throw new Error('站點不存在 (Station ID does not exist)');
      }
      if (BIKES.some(b => b.bId === upperBid)) {
        throw new Error('車輛編號已存在 (Bike ID already exists)');
      }
      BIKES.push({ bId: upperBid, model, status, sId: formattedSid || null });
      return true;
    }
  },

  async updateBike(bId, data) {
    const { model, status, sId } = data;
    const upperBid = bId.toUpperCase();
    const formattedSid = sId ? sId.trim().toUpperCase() : null;

    if (USE_DATABASE && sql) {
      if (formattedSid) {
        const stationCheck = new sql.Request();
        stationCheck.input('sId', sql.VarChar(20), formattedSid);
        const stationResult = await stationCheck.query('SELECT 1 FROM STATIONS WHERE sno = @sId');
        if (stationResult.recordset.length === 0) {
          throw new Error('站點不存在 (Station ID does not exist)');
        }
      }

      const request = new sql.Request();
      request.input('bId', sql.Char(5), upperBid);
      request.input('model', sql.NVarChar(100), model);
      request.input('status', sql.NVarChar(20), status);
      request.input('sId', sql.VarChar(20), formattedSid || null);
      await request.query('UPDATE BIKES SET model = @model, status = @status, sId = @sId WHERE bId = @bId');
      return true;
    } else {
      if (formattedSid && !STATIONS.some(s => s.sId === formattedSid)) {
        throw new Error('站點不存在 (Station ID does not exist)');
      }
      const bike = BIKES.find(b => b.bId === upperBid);
      if (!bike) throw new Error('車輛不存在 (Bike not found)');
      bike.model = model;
      bike.status = status;
      bike.sId = formattedSid || null;
      return true;
    }
  },

  async deleteBike(bId) {
    const upperBid = bId.toUpperCase();
    if (USE_DATABASE && sql) {
      const request = new sql.Request();
      request.input('bId', sql.Char(5), upperBid);
      await request.query('DELETE FROM BIKES WHERE bId = @bId');
      return true;
    } else {
      const idx = BIKES.findIndex(b => b.bId === upperBid);
      if (idx === -1) throw new Error('車輛不存在 (Bike not found)');
      BIKES.splice(idx, 1);
      return true;
    }
  },

  async batchAddBikes(bikes) {
    if (USE_DATABASE && sql) {
      const pool = await sql.connect(dbConfig);
      const transaction = new sql.Transaction(pool);
      await transaction.begin();
      try {
        for (const b of bikes) {
          const request = new sql.Request(transaction);
          const upperBid = b.bId.toUpperCase();
          const formattedSid = b.sId ? b.sId.trim().toUpperCase() : null;
          request.input('bId', sql.Char(5), upperBid);
          request.input('model', sql.NVarChar(100), b.model);
          request.input('status', sql.NVarChar(20), b.status);
          request.input('sId', sql.VarChar(20), formattedSid || null);

          await request.query(`
            IF EXISTS (SELECT 1 FROM BIKES WHERE bId = @bId)
            BEGIN
              UPDATE BIKES SET model = @model, status = @status, sId = @sId WHERE bId = @bId
            END
            ELSE
            BEGIN
              INSERT INTO BIKES (bId, model, status, sId) VALUES (@bId, @model, @status, @sId)
            END
          `);
        }
        await transaction.commit();
        return bikes.length;
      } catch (err) {
        await transaction.rollback();
        throw err;
      }
    } else {
      bikes.forEach(b => {
        const upperBid = b.bId.toUpperCase();
        const formattedSid = b.sId ? b.sId.trim().toUpperCase() : null;
        const idx = BIKES.findIndex(x => x.bId === upperBid);
        if (idx !== -1) {
          BIKES[idx] = { bId: upperBid, model: b.model, status: b.status, sId: formattedSid || null };
        } else {
          BIKES.push({ bId: upperBid, model: b.model, status: b.status, sId: formattedSid || null });
        }
      });
      return bikes.length;
    }
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
    const upperUid = uId.toUpperCase();
    if (USE_DATABASE && sql) {
      // 1. 驗證會員是否存在
      const userCheck = new sql.Request();
      userCheck.input('uId', sql.Char(5), upperUid);
      const userResult = await userCheck.query('SELECT 1 FROM USERS WHERE uId = @uId');
      if (userResult.recordset.length === 0) {
        throw new Error('會員編號不存在 (User ID does not exist)');
      }

      // 2. 驗證站點是否存在
      const stationCheck = new sql.Request();
      stationCheck.input('sId', sql.VarChar(20), sId);
      const stationResult = await stationCheck.query('SELECT 1 FROM STATIONS WHERE sno = @sId');
      if (stationResult.recordset.length === 0) {
        throw new Error('站點不存在 (Station ID does not exist)');
      }

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
      request.input('sId', sql.VarChar(20), sId);
      request.input('uId', sql.Char(5), upperUid);
      request.input('desc', sql.NVarChar(500), desc);
      request.input('status', sql.NVarChar(10), '處理中');

      await request.query('INSERT INTO SERVICES (formId, no, sId, uId, description, status) VALUES (@formId, @no, @sId, @uId, @desc, @status)');
      return nextId;
    } else {
      if (!USERS.some(u => u.uId === upperUid)) {
        throw new Error('會員編號不存在 (User ID does not exist)');
      }
      if (!STATIONS.some(s => s.sId === sId)) {
        throw new Error('站點不存在 (Station ID does not exist)');
      }
      const formId = 'F' + String(nextFormIdNumber++).padStart(4, '0');
      SERVICES.push({
        formId,
        no,
        sId,
        uId: upperUid,
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
  },

  async batchAddStations(stations) {
    if (USE_DATABASE && sql) {
      const pool = await sql.connect(dbConfig);
      // 開啟一筆資料庫交易 (Transaction)，確保大筆資料輸入時的安全與速度
      const transaction = new sql.Transaction(pool);
      await transaction.begin();

      try {
        for (const s of stations) {
          const request = new sql.Request(transaction);
          request.input('sno', sql.VarChar(20), s.sno);
          request.input('scity', sql.NVarChar(20), s.scity);
          request.input('scityen', sql.VarChar(50), s.scityen);
          request.input('sna', sql.NVarChar(100), s.sna);
          request.input('sarea', sql.NVarChar(50), s.sarea);
          request.input('ar', sql.NVarChar(200), s.ar);
          request.input('snaen', sql.VarChar(150), s.snaen);
          request.input('sareaen', sql.VarChar(50), s.sareaen);
          request.input('aren', sql.VarChar(250), s.aren);
          request.input('tot_quantity', sql.Int, s.tot_quantity);
          request.input('sbi_quantity', sql.Int, s.sbi_quantity);
          request.input('mday', sql.VarChar(20), s.mday);
          request.input('lat', sql.Float, s.lat);
          request.input('lng', sql.Float, s.lng);
          request.input('bemp', sql.Int, s.bemp);
          request.input('act', sql.Int, s.act);
          request.input('yb2_quantity', sql.Int, s.yb2_quantity);
          request.input('eyb_quantity', sql.Int, s.eyb_quantity);

          // 若站號重複則更新，不重複則插入 (UPSERT 語法)
          await request.query(`
            IF EXISTS (SELECT 1 FROM STATIONS WHERE sno = @sno)
            BEGIN
              UPDATE STATIONS SET 
                sbi_quantity = @sbi_quantity, bemp = @bemp, mday = @mday,
                yb2_quantity = @yb2_quantity, eyb_quantity = @eyb_quantity
              WHERE sno = @sno
            END
            ELSE
            BEGIN
              INSERT INTO STATIONS (sno, scity, scityen, sna, sarea, ar, snaen, sareaen, aren, tot_quantity, sbi_quantity, mday, lat, lng, bemp, act, yb2_quantity, eyb_quantity)
              VALUES (@sno, @scity, @scityen, @sna, @sarea, @ar, @snaen, @sareaen, @aren, @tot_quantity, @sbi_quantity, @mday, @lat, @lng, @bemp, @act, @yb2_quantity, @eyb_quantity)
            END
          `);
        }
        await transaction.commit(); // 認可交易，真正寫入硬碟
        return stations.length;
      } catch (err) {
        await transaction.rollback(); // 發生任何錯誤立刻還原，防止髒資料
        throw err;
      }
    } else {
      // 記憶體模式下直接取代暫存變數
      STATIONS = stations.map(s => ({ sId: s.sno, name: s.sna, bikeCount: s.sbi_quantity, emptySlots: s.bemp }));
      return STATIONS.length;
    }
  },

  async clearAllData() {
    if (USE_DATABASE && sql) {
      const pool = await sql.connect(dbConfig);
      // 開啟一筆交易以確保多表刪除的一致性與安全
      const transaction = new sql.Transaction(pool);
      await transaction.begin();
      try {
        const request1 = new sql.Request(transaction);
        await request1.query('DELETE FROM SERVICES');
        
        const request2 = new sql.Request(transaction);
        await request2.query('DELETE FROM RENTAL_RECORDS');
        
        const request3 = new sql.Request(transaction);
        await request3.query('DELETE FROM BIKES');
        
        const request4 = new sql.Request(transaction);
        await request4.query('DELETE FROM USERS');
        
        const request5 = new sql.Request(transaction);
        await request5.query('DELETE FROM STATIONS');
        
        await transaction.commit();
        return true;
      } catch (err) {
        await transaction.rollback();
        throw err;
      }
    } else {
      STATIONS = [];
      USERS = [];
      BIKES = [];
      RECORDS = [];
      SERVICES = [];
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
    console.error("新增會員失敗:", err);
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

// 新增單一自行車
app.post('/api/bikes', async (req, res) => {
  try {
    const { bId, model, status, sId } = req.body;
    if (!bId || !model || !status) {
      return res.status(400).json({ success: false, message: "車輛編號、車型與狀態為必填欄位" });
    }
    if (bId.length !== 5 || !bId.toUpperCase().startsWith('B')) {
      return res.status(400).json({ success: false, message: "車輛編號必須為 5 個字元且以 B 開頭 (例如 B0001)" });
    }
    if (!["Available", "Rented", "Repair"].includes(status)) {
      return res.status(400).json({ success: false, message: "無效的車輛狀態" });
    }
    if (status === "Available" && !sId) {
      return res.status(400).json({ success: false, message: "可租借車輛必須指定所在站點" });
    }

    await db.addBike({ bId, model, status, sId: sId || null });
    res.json({ success: true, message: "自行車新增成功" });
  } catch (err) {
    console.error("新增自行車失敗:", err);
    res.status(400).json({ success: false, message: err.message });
  }
});

// 修改自行車資料
app.put('/api/bikes/:bId', async (req, res) => {
  try {
    const { bId } = req.params;
    const { model, status, sId } = req.body;
    if (!model || !status) {
      return res.status(400).json({ success: false, message: "車型與狀態為必填欄位" });
    }
    if (!["Available", "Rented", "Repair"].includes(status)) {
      return res.status(400).json({ success: false, message: "無效的車輛狀態" });
    }
    if (status === "Available" && !sId) {
      return res.status(400).json({ success: false, message: "可租借車輛必須指定所在站點" });
    }

    await db.updateBike(bId, { model, status, sId: sId || null });
    res.json({ success: true, message: "自行車資料更新成功" });
  } catch (err) {
    console.error("修改自行車失敗:", err);
    res.status(400).json({ success: false, message: err.message });
  }
});

// 刪除特定自行車
app.delete('/api/bikes/:bId', async (req, res) => {
  try {
    const { bId } = req.params;
    await db.deleteBike(bId);
    res.json({ success: true, message: "自行車已刪除" });
  } catch (err) {
    console.error("刪除自行車失敗:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// 批次上傳自行車 CSV 轉換後的 JSON 資料
app.post('/api/bikes/batch', async (req, res) => {
  try {
    const { bikes } = req.body;
    if (!bikes || !Array.isArray(bikes)) {
      return res.status(400).json({ success: false, message: "無效的資料格式" });
    }

    const insertedCount = await db.batchAddBikes(bikes);
    res.json({ success: true, count: insertedCount, message: "自行車批次匯入成功" });
  } catch (err) {
    console.error("自行車批次匯入失敗:", err);
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

app.post('/api/services', async (req, res) => {
  try {
    const { sId, uId, desc } = req.body;
    let { no } = req.body;

    if (!sId || !uId || !desc) {
      return res.status(400).json({ success: false, message: "站點、會員與問題描述為必填欄位" });
    }

    if (!no) {
      no = "N001"; // 預設案件編號
    }

    const formId = await db.addService({ no, sId, uId, desc });
    res.json({ success: true, formId, message: "回報已送出" });
  } catch (err) {
    console.error("提交客服回報失敗:", err);
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

// 4. 批次上傳 CSV 轉換後的 JSON 資料
app.post('/api/stations/batch', async (req, res) => {
  try {
    const { stations } = req.body;
    if (!stations || !Array.isArray(stations)) {
      return res.status(400).json({ success: false, message: "無效的資料格式" });
    }

    const insertedCount = await db.batchAddStations(stations);
    res.json({ success: true, count: insertedCount, message: "CSV 批次匯入成功" });
  } catch (err) {
    console.error("CSV 批次匯入失敗:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// 5. 一鍵清空資料庫
app.post('/api/clear', async (req, res) => {
  try {
    await db.clearAllData();
    res.json({ success: true, message: "資料庫已成功清空" });
  } catch (err) {
    console.error("清空資料庫失敗:", err);
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
