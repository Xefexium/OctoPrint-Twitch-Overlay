var baseURL = "http://192.168.0.213";
var refreshRate = 1000;
var actualTemperatureNozzle = "Pending";
var targetTemperatureNozzle = "Pending";
var actualTemperatureBed = "Pending";
var targetTemperatureBed = "Pending";
var stateText = "Nothing happening now";

var interval = setInterval(refresh, refreshRate);

function refresh() {
  getPrinterInfo();
  logInfo();
  displayData();
}

function logInfo() {
  console.log(actualTemperatureNozzle);
  console.log(targetTemperatureNozzle);
  console.log(actualTemperatureBed);
  console.log(targetTemperatureBed);
  console.log(stateText);
}

function displayData() {
  $(document).ready(function() {
    $("#actualTemperatureNozzle").text(actualTemperatureNozzle);
    $("#targetTemperatureNozzle").text(targetTemperatureNozzle);
    $("#actualTemperatureBed").text(actualTemperatureBed);
    $("#targetTemperatureBed").text(targetTemperatureBed);
    $("#stateText").text(stateText);

  });
}

function getPrinterInfo() {
  let printerState = "/api/printer";
  let printerStateRequest = getRequest(baseURL + printerState);
  printerStateRequest
  .then(printerData => setPrinterStatus(printerData))
  .catch(_ => clearInterval(interval));
}

function getRequest(url) {
  return $.get({
    url: url,
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': 'BAEDF577501645078C15126E74809AA6',
    }
  });
}

function setPrinterStatus(printerData) {
  console.log(printerData);
  actualTemperatureNozzle = printerData.temperature.tool0.actual;
  targetTemperatureNozzle = printerData.temperature.tool0.target;
  actualTemperatureBed = printerData.temperature.bed.actual;
  targetTemperatureBed = printerData.temperature.bed.target;
  stateText = printerData.state.text;
}