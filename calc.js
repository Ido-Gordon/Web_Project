// calc.js - פעולות חישוב למחשבונים

// לפונקציית חישוב בלוקים
function calculateBlocks() {
  const wallLength = parseFloat(document.getElementById('wallLength').value);
  const wallHeight = parseFloat(document.getElementById('wallHeight').value);
  const blockType = document.getElementById('blockType').value;
  const blockPrice = parseFloat(document.getElementById('blockPrice').value);
  if (!wallLength || !wallHeight || !blockType || !blockPrice) {
    showAlert('נא למלא את כל השדות', 'danger');
    return;
  }
  const [blockSize, blocksPerM2] = blockType.split(':');
  const area = wallLength * wallHeight;
  const totalBlocks = Math.ceil(area * parseFloat(blocksPerM2));
  const totalPrice = totalBlocks * blockPrice;
  document.getElementById('blockResult').innerHTML =
    `<div>כמות בלוקים נדרשת: <b>${totalBlocks}</b><br>עלות משוערת: <b>${totalPrice.toLocaleString()} ש"ח</b></div>`;
}

// דוגמה לפונקציית חישוב דק
function calculateDeck() {
  const woodWidth = parseFloat(document.getElementById('woodWidth').value);
  const deckLength = parseFloat(document.getElementById('deckLength').value);
  const deckWidth = parseFloat(document.getElementById('deckWidth').value);
  const gap = parseFloat(document.getElementById('gap').value);
  const woodPrice = parseFloat(document.getElementById('woodPrice').value);
  if (!woodWidth || !deckLength || !deckWidth || isNaN(gap) || !woodPrice) {
    showAlert('נא למלא את כל השדות במחשבון הדק', 'danger');
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

// דוגמה לפונקציית חישוב גדר
function calculateFence() {
  const fenceLengthInput = parseFloat(document.getElementById('fenceLength').value);
  const postWidth = parseFloat(document.getElementById('postWidth').value);
  const minGap = parseFloat(document.getElementById('minGap').value);
  const maxGap = parseFloat(document.getElementById('maxGap').value);
  const precision = document.getElementById('precision').value; // Get selected precision (mm/cm)

  if (!fenceLengthInput || !postWidth || isNaN(minGap) || isNaN(maxGap)) {
    showAlert('נא למלא את כל השדות במחשבון הגדר', 'danger');
    return;
  }

  const fenceLength = fenceLengthInput * 100; // Convert meters to cm
  const factor = precision === 'mm' ? 10 : 1; // Conversion factor for mm/cm
  const unit = precision === 'mm' ? 'מ"מ' : 'ס"מ';

  const options = []; // Array to store options

  for (let gap = minGap; gap <= maxGap; gap += 0.1) { // Increment gap by 0.1 cm
    let totalUsed = postWidth;
    let postCount = 1;

    while (totalUsed + postWidth + gap <= fenceLength) {
      totalUsed += postWidth + gap;
      postCount++;
    }

    const remainder = fenceLength - totalUsed;
    options.push({ posts: postCount, gap, remainder });
  }

  // Sort options by remainder in ascending order
  options.sort((a, b) => a.remainder - b.remainder);

  // Display top 3 options as cards
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

// חיבור כפתורים לאירועים
window.addEventListener('DOMContentLoaded', function() {
  const btnBlocks = document.getElementById('calculateBlocks');
  if (btnBlocks) btnBlocks.addEventListener('click', calculateBlocks);
  const btnDeck = document.getElementById('calculateDeck');
  if (btnDeck) btnDeck.addEventListener('click', calculateDeck);
  const btnFence = document.getElementById('calculateFence');
  if (btnFence) btnFence.addEventListener('click', calculateFence);
});
