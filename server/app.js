import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';

// MySQL  - יצירת חיבור עם 
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'users',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// הפעלת השרת והאזנה לבקשות המגיעות לכתובת ולפורט 
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.use(express.static(path.join(__dirname, '../')));


// טיפול בבקשת התחברות: בדיקת מייל וסיסמה מול מסד הנתונים
// .ואם הפרטים נכונים – הפניה לדף הבית עם שם המשתמש
app.post('/login', async (req, res) => {
  console.log('body:', req.body);
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password]
    );
    console.log('rows:', rows);
    if (rows.length > 0) {
      const fullname = encodeURIComponent(rows[0].fullname);
      res.redirect(`/menu.html?fullname=${fullname}`);
    } else {
      res.status(401).send(`
        <link rel="stylesheet" href="styles.css">
        <div class="success-message-box">
          <div class="icon">❌</div>
          <h2>מייל או סיסמה שגויים</h2>
          <p><a href="index.html" class="success-btn">חזרה לעמוד התחברות</a></p>
        </div>
         <script>
          setTimeout(function() {
            window.location.href = "menu.html";
          }, 5000);
        </script>
      `);
      
    }
  } catch (err) {
    console.error('DB ERROR:', err);
    res.status(500).send('שגיאת שרת');
  }
});


// טיפול בבקשת רישום משתמש: בדיקת תקינות נתונים, ווידוא שאין משתמש עם אותו מייל
// והוספת משתמש חדש למסד הנתונים אם הכל תקין
app.post('/register', async (req, res) => {
  const { fullname, email, password, password2 } = req.body;
  if (!fullname || !email || !password || password !== password2) {
    return res.send('<h2>שגיאה בהרשמה – אנא מלא את כל הפרטים וסיסמאות תואמות</h2>');
  }
  try {
    // בדוק שאין כבר משתמש כזה
    const [exists] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    if (exists.length > 0) {
      return res.send(`
        <link rel="stylesheet" href="styles.css">
        <div class="success-message-box">
          <div class="icon">❌</div>
          <h2>משתמש זה כבר קיים במערכת</h2>
          <p><br>.המערכת תעביר אותך לעמוד ההרשמה בעוד מספר שניות<br>
          <a href="register.html" class="success-btn">לחץ כאן לניסיון נוסף</a></p>
        </div>
        <script>
          setTimeout(function() {
            window.location.href = "register.html";
          }, 6500);
        </script>
      `);
      
    }
    // הכנסת משתמש חדש
    await pool.query(
      'INSERT INTO users (email, fullname, password) VALUES (?, ?, ?)',
      [email, fullname, password]
    );
    res.send(`
      <link rel="stylesheet" href="styles.css">
      <div class="success-message-box">
      <div class="icon">✅</div>
      <h2>!נרשמת בהצלחה</h2>
      <p>.החשבון שלך נוצר בהצלחה<br>המערכת תעביר אותך לעמוד ההתחברות בעוד מספר שניות<br>
    </div>
      <script>
        setTimeout(function() {
          window.location.href = "menu.html";
        }, 5000);
      </script>
    `);
    
  } catch (err) {
    console.error('REGISTER ERROR:', err);
    res.status(500).send('<h2>שגיאת שרת בעת הרישום</h2>');
  }
});

