const scriptProperties = PropertiesService.getScriptProperties();

const server = scriptProperties.getProperty('cred_server');
const port = parseInt(scriptProperties.getProperty('cred_port'), 10);
const dbName = scriptProperties.getProperty('cred_dbName');
const username = scriptProperties.getProperty('cred_username');
const password = scriptProperties.getProperty('cred_password');
const url = `jdbc:mysql://${server}:${port}/${dbName}`;
const apidomain = scriptProperties.getProperty('cred_apidomain');
const apiusername = scriptProperties.getProperty('cred_apiusername');
const apipassword = scriptProperties.getProperty('cred_apipassword');

function readData() {
 var conn = Jdbc.getConnection(url, username, password);
 var stmt = conn.createStatement();


 //Diet
 var spreadsheet = SpreadsheetApp.getActive();
 var sheet = spreadsheet.getSheetByName('Dashboard');
 var cell = sheet.getRange('B4').getValues();

 var results = stmt.executeQuery('select distinct db.`first_name` "First Name",`nickname` "Facebook Name",`social-menu-choice-one` Starter,`social-menu-choice-two` "Main",`social-menu-choice-three` "Desert", `admin-dietary-requirements` "Dietary Requirements", `admin-diet-allergies-health-extra-info` "Extra Diet Info", `admin-social-requests-notes` "Notes" , order_id  from wp_member_db db LEFT JOIN wp_order_product_customer_lookup pd on pd.user_id = db.id where product_id=' + cell + ' AND pd.status="wc-processing" order by db.`first_name` ASC');
  //console.log(results);
 var metaData=results.getMetaData();
  var numCols = metaData.getColumnCount();
 var spreadsheet = SpreadsheetApp.getActive();
 var sheet = spreadsheet.getSheetByName('Diet');
 sheet.clearContents();
 var arr=[];
  for (var col = 0; col < numCols; col++) {
   arr.push(metaData.getColumnName(col + 1));
 }
  sheet.appendRow(arr);
 while (results.next()) {
 arr=[];
 for (var col = 0; col < numCols; col++) {
   arr.push(results.getString(col + 1));
 }
 sheet.appendRow(arr);
 }


sheet.autoResizeColumns(1, numCols+1);
//Transport
 var spreadsheet = SpreadsheetApp.getActive();
 var sheet = spreadsheet.getSheetByName('Dashboard');
 var cell = sheet.getRange('B4').getValues();

 var results = stmt.executeQuery('select db.`first_name`,`nickname` fbname, `transport-need-lift`, `transport-will-you-give-lift`, `transport-leaving-location`, `transport-depature-time` from wp_member_db db LEFT JOIN wp_order_product_customer_lookup pd on pd.user_id = db.id where product_id=' + cell + ' AND status="wc-processing" order by `transport-need-lift` ASC');
  //console.log(results);
 var metaData=results.getMetaData();
  var numCols = metaData.getColumnCount();
 var spreadsheet = SpreadsheetApp.getActive();
 var sheet = spreadsheet.getSheetByName('Transport');
 sheet.clearContents();
 var arr=[];
  for (var col = 0; col < numCols; col++) {
   arr.push(metaData.getColumnName(col + 1));
 }
  sheet.appendRow(arr);
 while (results.next()) {
 arr=[];
 for (var col = 0; col < numCols; col++) {
   arr.push(results.getString(col + 1));
 }
 sheet.appendRow(arr);
 }

sheet.autoResizeColumns(1, numCols+1);





 //Volunteering
 var spreadsheet = SpreadsheetApp.getActive();
 var sheet = spreadsheet.getSheetByName('Dashboard');
 var cell = sheet.getRange('B4').getValues();

 var results = stmt.executeQuery('select db.`first_name`,`nickname` fbname, `admin-can-you-help-social` from wp_member_db db LEFT JOIN wp_order_product_customer_lookup pd on pd.user_id = db.id where product_id=' + cell + ' AND status="wc-processing" order by `transport-need-lift` ASC');
  //console.log(results);
 var metaData=results.getMetaData();
  var numCols = metaData.getColumnCount();
 var spreadsheet = SpreadsheetApp.getActive();
 var sheet = spreadsheet.getSheetByName('Volunteering');
 sheet.clearContents();
 var arr=[];
  for (var col = 0; col < numCols; col++) {
   arr.push(metaData.getColumnName(col + 1));
 }
  sheet.appendRow(arr);
 while (results.next()) {
 arr=[];
 for (var col = 0; col < numCols; col++) {
   arr.push(results.getString(col + 1));
 }
 sheet.appendRow(arr);
 }

sheet.autoResizeColumns(1, numCols+1);


 //Buddy
 var spreadsheet = SpreadsheetApp.getActive();
 var sheet = spreadsheet.getSheetByName('Dashboard');
 var cell = sheet.getRange('B4').getValues();

 var results = stmt.executeQuery('select distinct db.`first_name`,`nickname` fbname, `admin-first-timer-question`, `_order_count`  from wp_member_db db LEFT JOIN wp_order_product_customer_lookup pd on pd.user_id = db.id where product_id=' + cell + ' AND status="wc-processing" order by `_order_count` ASC');
  //console.log(results);
 var metaData=results.getMetaData();
  var numCols = metaData.getColumnCount();
 var spreadsheet = SpreadsheetApp.getActive();
 var sheet = spreadsheet.getSheetByName('Buddy');
 sheet.clearContents();
 var arr=[];
  for (var col = 0; col < numCols; col++) {
   arr.push(metaData.getColumnName(col + 1));
 }
  sheet.appendRow(arr);
 while (results.next()) {
 arr=[];
 for (var col = 0; col < numCols; col++) {
   arr.push(results.getString(col + 1));
 }
 sheet.appendRow(arr);
 }

results.close();
stmt.close();
sheet.autoResizeColumns(1, numCols+1);

}


//ScriptApp.newTrigger('readData')
//.timeBased()
//.everyMinutes(30)
//.create();
