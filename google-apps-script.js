const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID";

function doGet() {
  return ContentService
    .createTextOutput("Day 2 RSVP endpoint is working")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp
      .openById(SPREADSHEET_ID)
      .getSheetByName("Sheet1");

    if (!sheet) throw new Error("Sheet1 not found");

    const p = e.parameter;
    const ps = e.parameters;
    const joinValues = (key) => ps[key] ? ps[key].filter(Boolean).join(", ") : "";

    sheet.appendRow([
      new Date(),
      p.name || "",
      p.attendance || "",
      p.plusOne || "",
      p.plusOneName || "",
      p.overnight || "",
      joinValues("food"),
      joinValues("snacks"),
      joinValues("drinks"),
      p.notes || ""
    ]);

    return ContentService
      .createTextOutput("OK")
      .setMimeType(ContentService.MimeType.TEXT);

  } catch (error) {
    console.error(error);
    return ContentService
      .createTextOutput("ERROR: " + error.message)
      .setMimeType(ContentService.MimeType.TEXT);
  }
}