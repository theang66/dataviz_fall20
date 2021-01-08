import fullpage from "fullpage.js";
import "./symptoms";
import "./seekingHelp";
// import "./intlStats";
import "./index.css";
// import "./mapplaceholder.png";
// import 'bootstrap/dist/css/bootstrap.min.css';

// fullPage.js
new fullpage("#fullPage", {
  licenseKey: "F9826397-F07A433B-875FC4BE-6C3E8519",
  autoScrolling: true,
  navigation: true,
  navigationPosition: "right",
  navigationToolTips: ["one", "two"],
  anchors: ["one", "two", "three"],
});
