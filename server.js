const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const app = express();

// اجازه دادن به فرانت‌اِند برای گرفتن دیتا
app.use(cors());

// آدرس اتصال به دیتابیس (همونی که فرستادی)
const uri =
  "mongodb://root:B97joTxzrfNnXB6OTzth95pm@shop-db:27017/my-app?authSource=admin";
const client = new MongoClient(uri);

// مسیر اصلی برای گرفتن محصولات
app.get("/api/products", async (req, res) => {
  try {
    await client.connect();
    // نام دیتابیس که توی URI مشخص کردی my-app هست
    const db = client.db("stella_shop");

    // پیدا کردن سندی که تمام محصولات توش هست
    const result = await db.collection("products").findOne({});

    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: "محصولی پیدا نشد" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "خطا در اتصال به دیتابیس" });
  } finally {
    await client.close();
  }
});

// تنظیم پورت برای لیارا
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
