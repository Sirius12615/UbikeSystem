/**
 * 🚲 智慧共享自行車系統 - 資料庫種子資料寫入程式 (seed.js)
 * 
 * 此指令碼用於向 SQL Server 資料庫寫入豐富且真實的初始資料，
 * 包含：4 個基礎站點、15 位會員、20 台自行車、12 筆租借紀錄與 8 筆客服申訴案件。
 */

const sql = require('mssql');

const dbConfig = {
  user: process.env.DB_USER || 'db2_26',
  password: process.env.DB_PASSWORD || 'db2_26',
  server: process.env.DB_SERVER || '163.17.9.18',
  database: process.env.DB_NAME || undefined,
  options: {
    encrypt: true,
    trustServerCertificate: true,
    serverName: 'orcl1'
  }
};

const STATIONS = [
  { sno: "S0001", scity: "台中市", scityen: "Taichung City", sna: "FCU Main Gate",          sarea: "西屯區", ar: "逢甲路100號", snaen: "FCU Main Gate",          sareaen: "Xitun Dist", aren: "No. 100, Fengchia Rd.",          tot_quantity: 30, sbi_quantity: 20, mday: "20260625120000", lat: 24.1786, lng: 120.6466, bemp: 10, act: 1, yb2_quantity: 20, eyb_quantity: 0 },
  { sno: "S0002", scity: "台中市", scityen: "Taichung City", sna: "Taichung Station",       sarea: "中區",   ar: "台灣大道一段1號", snaen: "Taichung Station",       sareaen: "Central Dist", aren: "No. 1, Sec. 1, Taiwan Blvd.", tot_quantity: 40, sbi_quantity: 35, mday: "20260625120000", lat: 24.1373, lng: 120.6856, bemp: 5,  act: 1, yb2_quantity: 35, eyb_quantity: 0 },
  { sno: "S0003", scity: "台中市", scityen: "Taichung City", sna: "Feng Chia Night Market", sarea: "西屯區", ar: "福星路427號",    snaen: "Feng Chia Night Market", sareaen: "Xitun Dist", aren: "No. 427, Fuxing Rd.",         tot_quantity: 15, sbi_quantity: 15, mday: "20260625120000", lat: 24.1764, lng: 120.6455, bemp: 0,  act: 1, yb2_quantity: 15, eyb_quantity: 0 },
  { sno: "S0004", scity: "台中市", scityen: "Taichung City", sna: "City Hall",              sarea: "西屯區", ar: "台灣大道三段99號", snaen: "City Hall",              sareaen: "Xitun Dist", aren: "No. 99, Sec. 3, Taiwan Blvd.", tot_quantity: 20, sbi_quantity: 8,  mday: "20260625120000", lat: 24.1624, lng: 120.6471, bemp: 12, act: 1, yb2_quantity: 8,  eyb_quantity: 0 }
];

const USERS = [
  { uId: "U0001", name: "Tony Lin",    gender: "M", rentCount: 24, returnCount: 24 },
  { uId: "U0002", name: "Mary Jane",   gender: "F", rentCount: 15, returnCount: 14 }, // pending (尚有未歸還)
  { uId: "U0003", name: "John Doe",    gender: "M", rentCount: 8,  returnCount: 8  },
  { uId: "U0004", name: "Emily Chen",  gender: "F", rentCount: 3,  returnCount: 3  },
  { uId: "U0005", name: "Bruce Wang",  gender: "M", rentCount: 42, returnCount: 42 },
  { uId: "U0006", name: "David Beckham", gender: "M", rentCount: 19, returnCount: 18 }, // pending
  { uId: "U0007", name: "Sarah Connor", gender: "F", rentCount: 11, returnCount: 11 },
  { uId: "U0008", name: "James Bond",  gender: "M", rentCount: 57, returnCount: 57 },
  { uId: "U0009", name: "Alice Wonderland", gender: "F", rentCount: 5, returnCount: 5 },
  { uId: "U0010", name: "Bob Builder", gender: "M", rentCount: 12, returnCount: 11 }, // pending
  { uId: "U0011", name: "Peter Parker", gender: "M", rentCount: 33, returnCount: 33 },
  { uId: "U0012", name: "Clark Kent",  gender: "M", rentCount: 8,  returnCount: 8  },
  { uId: "U0013", name: "Diana Prince", gender: "F", rentCount: 29, returnCount: 29 },
  { uId: "U0014", name: "Bruce Wayne", gender: "M", rentCount: 95, returnCount: 95 },
  { uId: "U0015", name: "Selina Kyle", gender: "F", rentCount: 17, returnCount: 17 }
];

const BIKES = [
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

const RECORDS = [
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

const SERVICES = [
  { formId: "F0001", no: "N001", sId: "S0001", desc: "App crash on login",                    uId: "U0001", status: "處理中" },
  { formId: "F0002", no: "N001", sId: "S0004", desc: "Overcharged on last ride",               uId: "U0002", status: "已完成" },
  { formId: "F0003", no: "N002", sId: "S0003", desc: "Station full cannot return bike",        uId: "U0003", status: "處理中" },
  { formId: "F0004", no: "N003", sId: "S0002", desc: "Broken bike lock",                      uId: "U0005", status: "處理中" },
  { formId: "F0005", no: "N001", sId: "S0001", desc: "Brakes not responsive on B0001",        uId: "U0008", status: "已完成" },
  { formId: "F0006", no: "N002", sId: "S0003", desc: "Flat tire on B0010",                    uId: "U0011", status: "處理中" },
  { formId: "F0007", no: "N003", sId: "S0004", desc: "Bike dock QR code scratched off",        uId: "U0013", status: "已完成" },
  { formId: "F0008", no: "N001", sId: "S0002", desc: "Left personal belongings in basket",     uId: "U0015", status: "處理中" }
];

async function seed() {
  console.log('🌱 Starting database seeding...');
  try {
    await sql.connect(dbConfig);
    console.log('⚡ Connected to SQL Server.');

    // 1. Clear existing data in correct dependency order
    console.log('🧹 Clearing old tables...');
    await sql.query('DELETE FROM SERVICES');
    await sql.query('DELETE FROM RENTAL_RECORDS');
    await sql.query('DELETE FROM BIKES');
    await sql.query('DELETE FROM USERS');
    await sql.query('DELETE FROM STATIONS');
    console.log('✨ Old tables cleared.');

    // 2. Insert Stations
    console.log('📍 Seeding STATIONS...');
    for (const s of STATIONS) {
      const request = new sql.Request();
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

      await request.query(`
        INSERT INTO STATIONS (sno, scity, scityen, sna, sarea, ar, snaen, sareaen, aren, tot_quantity, sbi_quantity, mday, lat, lng, bemp, act, yb2_quantity, eyb_quantity)
        VALUES (@sno, @scity, @scityen, @sna, @sarea, @ar, @snaen, @sareaen, @aren, @tot_quantity, @sbi_quantity, @mday, @lat, @lng, @bemp, @act, @yb2_quantity, @eyb_quantity)
      `);
    }
    console.log(`✅ Seeded ${STATIONS.length} stations.`);

    // 3. Insert Users
    console.log('👥 Seeding USERS...');
    for (const u of USERS) {
      const request = new sql.Request();
      request.input('uId', sql.Char(5), u.uId);
      request.input('name', sql.NVarChar(100), u.name);
      request.input('gender', sql.Char(1), u.gender);
      request.input('rentCount', sql.Int, u.rentCount);
      request.input('returnCount', sql.Int, u.returnCount);

      await request.query(`
        INSERT INTO USERS (uId, name, gender, rentCount, returnCount)
        VALUES (@uId, @name, @gender, @rentCount, @returnCount)
      `);
    }
    console.log(`✅ Seeded ${USERS.length} users.`);

    // 4. Insert Bikes
    console.log('🚲 Seeding BIKES...');
    for (const b of BIKES) {
      const request = new sql.Request();
      request.input('bId', sql.Char(5), b.bId);
      request.input('model', sql.NVarChar(100), b.model);
      request.input('status', sql.NVarChar(20), b.status);
      request.input('sId', sql.VarChar(20), b.sId);

      await request.query(`
        INSERT INTO BIKES (bId, model, status, sId)
        VALUES (@bId, @model, @status, @sId)
      `);
    }
    console.log(`✅ Seeded ${BIKES.length} bikes.`);

    // 5. Insert Rental Records
    console.log('📝 Seeding RENTAL_RECORDS...');
    for (const r of RECORDS) {
      const request = new sql.Request();
      request.input('uId', sql.Char(5), r.uId);
      request.input('bId', sql.Char(5), r.bId);
      request.input('rentTime', sql.VarChar(30), r.rentTime);
      request.input('returnTime', sql.VarChar(30), r.returnTime || '');

      await request.query(`
        INSERT INTO RENTAL_RECORDS (uId, bId, rentTime, returnTime)
        VALUES (@uId, @bId, @rentTime, @returnTime)
      `);
    }
    console.log(`✅ Seeded ${RECORDS.length} rental records.`);

    // 6. Insert Service Tickets
    console.log('🛠️ Seeding SERVICES...');
    for (const s of SERVICES) {
      const request = new sql.Request();
      request.input('formId', sql.Char(5), s.formId);
      request.input('no', sql.Char(4), s.no);
      request.input('sId', sql.VarChar(20), s.sId);
      request.input('uId', sql.Char(5), s.uId);
      request.input('description', sql.NVarChar(500), s.desc);
      request.input('status', sql.NVarChar(10), s.status);

      await request.query(`
        INSERT INTO SERVICES (formId, no, sId, uId, description, status)
        VALUES (@formId, @no, @sId, @uId, @description, @status)
      `);
    }
    console.log(`✅ Seeded ${SERVICES.length} customer service reports.`);

    console.log('🌱 Database seeding completed successfully!');
  } catch (err) {
    console.error('❌ Error seeding database:', err.message);
  } finally {
    await sql.close();
  }
}

seed();
