function doGet() {
    return HtmlService.createHtmlOutputFromFile('index');
  }
  
  function checkConnection(phoneNumber) {
    var callingDataSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Calling Data");
    var phoneNumbers = callingDataSheet.getRange("E2:E" + callingDataSheet.getLastRow()).getValues();
    
    for (var i = 0; i < phoneNumbers.length; i++) {
      if (phoneNumbers[i][0] === phoneNumber) {
        return "Connected";
      }
    }
    
    return "Not Connected";
  }
  
  function importData(contents, filename) {
    var callingDataSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Calling Data");
    var csvData = Utilities.parseCsv(contents);
    callingDataSheet.getRange(callingDataSheet.getLastRow() + 1, 1, csvData.length, csvData[0].length).setValues(csvData);
    return filename; // Return filename to the client-side for download
  }
  
  function exportData() {
    var callingDataSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Calling Data");
    var csv = Utilities.convertRangeToCsvFile(callingDataSheet.getRange("A1:Z" + callingDataSheet.getLastRow()));
    var blob = Utilities.newBlob(csv, "text/csv", "calling_data.csv");
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "calling_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  