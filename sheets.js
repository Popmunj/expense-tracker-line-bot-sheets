function doPost(e) {
  const p = e.parameter;
  if (p.type === "summary") {
    const res = getExpense(p.id, p.categ, new Date(p.date));
    return res;
  } else {
    const res = logExpense(p.id, p.categ, p.amount, new Date(p.date));
    return res;
  }
}

// assuming the requested month is the lastest month
function getExpense(id, categ, date) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(id);

  if (!sheet) {
    return formatted(-1, "No sheet found! Please log something.");
  }

  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();

  if (lastRow < 2 || lastCol < 2) {
    return formatted(-1, "You haven't logged anything.");
  }

  const mat = sheet.getDataRange().getValues();
  let startRow = 2;
  for (startRow; startRow <= lastRow; startRow++) {
    if (new Date(mat[startRow - 1][0]).getMonth() === date.getMonth()) {
      break;
    } else if (startRow === lastRow) {
      return formatted(0, "");
    }
  }

  if (categ === "ALL") {
    return getALL(mat, startRow, lastRow, lastCol);
  }

  const categColI = mat[0].indexOf(categ);
  if (categColI === -1) {
    return formatted(0, "");
  }

  const sum = mat.slice(startRow - 1, lastRow).reduce((total, row) => {
    return total + (isNaN(row[categColI]) ? 0 : Number(row[categColI]));
  }, 0);
  return formatted(sum, "");
}

function getALL(mat, startRow, lastRow, lastCol) {
  const sum = mat.slice(startRow - 1, lastRow).reduce((total, row) => {
    return (
      total +
      row.slice(1, lastCol).reduce((t, c) => {
        return t + (isNaN(c) ? 0 : Number(c));
      }, 0)
    );
  }, 0);
  return formatted(sum, "");
}

function logExpense(id, categ, amount, date) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(id);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(id);
    sheet.appendRow([
      "Date",
      "Meal",
      "Transportation",
      "Supermarket",
      "Phone",
      "Med",
    ]);
  }

  const mat = sheet.getDataRange().getValues();
  let categCol = mat[0].indexOf(categ);
  if (categCol === -1) {
    categCol = sheet.getLastColumn() + 1;
    sheet.getRange(1, categCol).setValue(categ);
  } else {
    categCol = categCol + 1;
  }

  const lastRow = sheet.getLastRow();
  let startRow = 2;
  for (startRow; startRow <= lastRow; startRow++) {
    if (
      new Date(mat[startRow - 1][0]).getDate() === date.getDate() &&
      mat[startRow - 1][categCol - 1] === ""
    ) {
      break;
    }
  }

  sheet.getRange(startRow, 1).setValue(date);
  sheet.getRange(startRow, categCol).setValue(amount);
  return formatted(amount, "");
}

function formatted(amount, message) {
  return ContentService.createTextOutput(
    JSON.stringify({
      amount: amount,
      message: message,
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

function testLogExpense() {
  logExpense("Bot", "Meal", 15, new Date(2025, 0, 12));
  logExpense("Bot", "Supermarket", 15, new Date(2025, 0, 12));
  logExpense("Bot", "Med", 15, new Date(2025, 0, 12));
}

function testGetExpense() {
  console.log(getExpense("Bot", "Med", new Date(2025, 0, 13)).getContent());
}
