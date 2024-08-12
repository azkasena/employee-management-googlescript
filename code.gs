function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Manajemen Karyawan')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ID spreadsheet Anda
var SPREADSHEET_ID = '1eK2C3Q-Un-JG_wTk8yDfVk-eQkhm2VDm7Oo5AlIHkag';
var SHEET_NAME = 'Sheet1';

function getData() {
  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  var lastRow = sheet.getLastRow();
  
  // Jika hanya ada baris header, kembalikan array kosong
  if (lastRow <= 2) {
    return [];
  }
  
  // Ambil data mulai dari baris 3 (baris pertama setelah header)
  var data = sheet.getRange('B3:F' + lastRow).getValues();
  return data;
}

function addData(nama, posisi, status, noTelepon) {
  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  var lastRow = sheet.getLastRow();
  var newId = lastRow - 1; // ID baru adalah nomor baris terakhir dikurangi baris header
  
  // Pastikan ID dimulai dari 1 jika ini adalah data pertama
  if (newId < 1) {
    newId = 1;
  }
  
  // Tambahkan data baru mulai dari kolom B
  sheet.getRange(lastRow + 1, 2, 1, 5).setValues([[newId, nama, posisi, status, noTelepon]]);
  return 'Data berhasil ditambahkan';
}

function updateData(id, nama, posisi, status, noTelepon) {
  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  var data = getData();
  
  for (var i = 0; i < data.length; i++) {
    if (data[i][0] == id) {
      // Perbarui data pada baris yang sesuai (tambahkan 3 karena data dimulai dari baris 3)
      sheet.getRange(i + 3, 2, 1, 5).setValues([[id, nama, posisi, status, noTelepon]]);
      return 'Data berhasil diperbarui';
    }
  }
  
  return 'ID tidak ditemukan';
}

function deleteData(id) {
 var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  var data = getData();
  
  for (var i = 0; i < data.length; i++) {
    if (data[i][0] == id) {
      // Hapus baris yang sesuai (tambahkan 3 karena data dimulai dari baris 3)
      sheet.deleteRow(i + 3);
      return 'Data berhasil dihapus';
    }
  }
  
  return 'ID tidak ditemukan';
}
