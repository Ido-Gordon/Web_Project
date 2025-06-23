// מאזין לטעינת ה-DOM
document.addEventListener("DOMContentLoaded", () => {
    // קישור לרכיבים מעמוד ההתחברות
    const loginBtn = document.getElementById("login");         // כפתור התחברות
    const usernameInput = document.getElementById("username"); // שדה שם משתמש
    const passwordInput = document.getElementById("password"); // שדה סיסמה
    const logoutBtn = document.querySelector(".b");            // כפתור התנתקות
  
    // עיצוב רקע שדות בעת פוקוס ויציאה
    if (usernameInput && passwordInput) {
      [usernameInput, passwordInput].forEach(input => {
        input.addEventListener("focus", () => {
          input.style.backgroundColor = "#e0f7fa"; // צבע טורקיז בעת פוקוס
        });
        input.addEventListener("blur", () => {
          input.style.backgroundColor = ""; // חזרה לצבע המקורי בעת יציאה
        });
      });
    }

    
  
    // טיפול בהתנתקות – הודעה + מעבר לעמוד התחברות
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        alert("להתראות!");
        window.location.href = "index.html";
      });
    }
  });
  
  // מאזין נוסף לטעינת DOM עבור התחברות
  document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("login");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
  
    // בעת לחיצה על כפתור התחברות
    loginBtn.addEventListener("click", function () {
      const user = username.value.trim();
      const pass = password.value.trim();
  
      // בדיקה שהשדות לא ריקים
      if (user === "" || pass === "") {
        alert("אנא מלא את כל השדות");
        return;
      }
  
      // בדיקת שם משתמש וסיסמה מול ערכים קבועים
      if (user === "admin" && pass === "1234") {
        alert("ברוך הבא!");
        window.location.href = "index.html"; // מעבר לדף הבית
      } else {
        alert("שם משתמש או סיסמה שגויים");
      }
    });
  });
  
  // מאזין לטעינת DOM עבור טופס צור קשר
  document.addEventListener("DOMContentLoaded", function () {
    // קישור לשדות הטופס
    const form = document.getElementById("contactForm");
    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const message = document.getElementById("message");
    const alertBox = document.getElementById("formAlert");
  
    // בעת שליחת הטופס
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // מונע שליחה אמיתית לשרת
  
      // איפוס הודעת השגיאה הקודמת
      alertBox.textContent = "";
  
      // ולידציה לשם מלא – אותיות בלבד (עברית/אנגלית)
      if (!/^[א-תa-zA-Z\s]+$/.test(fullName.value.trim())) {
        alertBox.textContent = "שם מלא חייב להכיל רק אותיות.";
        return;
      }
  
      // ולידציה לאימייל – תבנית תקינה של כתובת
      if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
        alertBox.textContent = "כתובת אימייל לא תקינה.";
        return;
      }
  
      // ולידציה לטלפון – בדיוק 10 ספרות ומתחיל ב-0
      if (!/^0\d{9}$/.test(phone.value.trim())) {
        alertBox.textContent = "מספר טלפון חייב להכיל בדיוק 10 ספרות ולהתחיל ב-0.";
        return;
      }
  
      // ולידציה להודעה – לפחות 5 תווים
      if (message.value.trim().length < 5) {
        alertBox.textContent = "ההודעה שלך קצרה מדי.";
        return;
      }
  
      // אם כל הבדיקות עברו – הצגת הודעת הצלחה
      alertBox.style.color = "green";
      alertBox.textContent = "ההודעה נשלחה בהצלחה!";
  
      // איפוס כל שדות הטופס
      form.reset();
    });
  });

//-----------------------------------------
// calc.js - פעולות חישוב למחשבונים

// פונקציית חישוב בלוקים
function calculateBlocks() {
    const wallLength = parseFloat(document.getElementById('wallLength').value); // אורך הקיר
    const wallHeight = parseFloat(document.getElementById('wallHeight').value); // גובה הקיר
    const blockType = document.getElementById('blockType').value; // סוג בלוק
    const blockPrice = parseFloat(document.getElementById('blockPrice').value); // מחיר בלוק
    if (!wallLength || !wallHeight || !blockType || !blockPrice) { // בדיקה אם כל השדות מולאו
      showAlert('נא למלא את כל השדות', 'danger');
      return;
    }
    const [blockSize, blocksPerM2] = blockType.split(':'); // פיצול סוג הבלוק לגדלים
    const area = wallLength * wallHeight; // חישוב שטח הקיר
    const totalBlocks = Math.ceil(area * parseFloat(blocksPerM2)); // חישוב כמות הבלוקים הנדרשת
    const totalPrice = totalBlocks * blockPrice; // חישוב עלות כוללת
    document.getElementById('blockResult').innerHTML = // הצגת תוצאות החישוב
      `<div>כמות בלוקים נדרשת: <b>${totalBlocks}</b><br>עלות משוערת: <b>${totalPrice.toLocaleString()} ש"ח</b></div>`;
  }
  
  // פונקציית חישוב דק
  function calculateDeck() {
    const woodWidth = parseFloat(document.getElementById('woodWidth').value); // רוחב לוח עץ
    const deckLength = parseFloat(document.getElementById('deckLength').value); // אורך הדק
    const deckWidth = parseFloat(document.getElementById('deckWidth').value); // רוחב הדק
    const gap = parseFloat(document.getElementById('gap').value); // מרווח בין הלוחות
    const woodPrice = parseFloat(document.getElementById('woodPrice').value); // מחיר לוח עץ
    if (!woodWidth || !deckLength || !deckWidth || isNaN(gap) || !woodPrice) { // בדיקה אם כל השדות מולאו
      showAlert('נא למלא את כל השדות', 'danger');
      return;
    }
    const widthPerBoard = woodWidth/100 + gap/1000;
    const boardsCount = Math.ceil(deckWidth / widthPerBoard);
    const totalLength = boardsCount * deckLength;
    const totalPrice = totalLength * woodPrice;
    document.getElementById('deckResult').innerHTML =
      `<div>כמות לוחות נדרשת: <b>${boardsCount}</b><br>` +
      `אורך כולל: <b>${totalLength.toFixed(2)}</b> מ' <br>` +
      `עלות משוערת: <b>${totalPrice.toLocaleString()}</b> ש"ח</div>`;
  }
  
  // פונקציית חישוב גדר
  function calculateFence() {
    const fenceLengthInput = parseFloat(document.getElementById('fenceLength').value); // אורך הגדר
    const postWidth = parseFloat(document.getElementById('postWidth').value); // רוחב עמוד
    const minGap = parseFloat(document.getElementById('minGap').value); // מרווח מינימלי
    const maxGap = parseFloat(document.getElementById('maxGap').value); // מרווח מקסימלי
    const precision = document.getElementById('precision').value; //רמת דיוק 
    if (!fenceLengthInput || !postWidth || isNaN(minGap) || isNaN(maxGap)) {// בדיקה אם כל השדות מולאו
      showAlert('נא למלא את כל השדות במחשבון הגדר', 'danger');
      return;
    }
  
    const fenceLength = fenceLengthInput * 100; // המרת אורך הגדר לס"מ
    const factor = precision === 'mm' ? 10 : 1; // המרת יחידות
    const unit = precision === 'mm' ? 'מ"מ' : 'ס"מ';
  
    const options = [];
  
    for (let gap = minGap; gap <= maxGap; gap += 0.1) { // לולאת חישוב עבור כל מרווח
      let totalUsed = postWidth;
      let postCount = 1;
  
      while (totalUsed + postWidth + gap <= fenceLength) {// חישוב כמות העמודים הנדרשים
        totalUsed += postWidth + gap;
        postCount++; 
      }
  
      const remainder = fenceLength - totalUsed; // חישוב שארית
      options.push({ posts: postCount, gap, remainder }); // הוספת תוצאה לאופציות
    }
  
    options.sort((a, b) => a.remainder - b.remainder); // מיון האופציות לפי שארית
  
    // חישוב התוצאה לפי סדר
    const resultsHtml = '<div class="row">' +
      options.slice(0, 3).map(option =>
        `<div class="col-md-4 mb-3">
           <div class="card text-center">
             <div class="card-body">
               <h5 class="card-title">מרווח ${(option.gap * factor).toFixed(1)} ${unit}</h5>
               <p class="card-text">עמודים: <b>${option.posts}</b><br>שארית: <b>${(option.remainder * factor).toFixed(1)}</b> ${unit}</p>
             </div>
           </div>
         </div>`
      ).join('') +
      '</div>';
  
    document.getElementById('fenceResult').innerHTML = resultsHtml;
  }
  
  // פונקציה לפתיחת וסגירת תפריט נפתח
  function toggleDropdown() {
      const dropdownMenu = document.getElementById("dropdownMenu");
      if (dropdownMenu) {
          dropdownMenu.classList.toggle("show");
      }
  }
  
  // שיוך כפתורים
  window.addEventListener('DOMContentLoaded', function() {
    const btnBlocks = document.getElementById('calculateBlocks');
    if (btnBlocks) btnBlocks.addEventListener('click', calculateBlocks);
    const btnDeck = document.getElementById('calculateDeck');
    if (btnDeck) btnDeck.addEventListener('click', calculateDeck);
    const btnFence = document.getElementById('calculateFence');
    if (btnFence) btnFence.addEventListener('click', calculateFence);
    const dropdownButton = document.querySelector(".dropdown-toggle");
    if (dropdownButton) {
        dropdownButton.addEventListener("click", toggleDropdown);
    }

    // קישור כפתורי המחשבונים לעמודים הנכונים
    const fenceCalculatorButton = document.querySelector("button[onclick*='fence-calculator.html']");
    const blockCalculatorButton = document.querySelector("button[onclick*='block-calculator.html']");
    const deckCalculatorButton = document.querySelector("button[onclick*='deck-calculator.html']");

    if (fenceCalculatorButton) {
        fenceCalculatorButton.addEventListener("click", () => {
            window.location.href = 'fence-calculator.html';
        });
    }

    if (blockCalculatorButton) {
        blockCalculatorButton.addEventListener("click", () => {
            window.location.href = 'block-calculator.html';
        });
    }

    if (deckCalculatorButton) {
        deckCalculatorButton.addEventListener("click", () => {
            window.location.href = 'deck-calculator.html';
        });
    }
  });

