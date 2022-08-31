window.addEventListener("load", initPage, false);

function initPage() {
  document.addEventListener(
    "webOSLaunch",
    function (inData) {
      console.log("Launch: " + JSON.stringify(inData.detail));
      document.querySelector("#result").innerHTML = JSON.stringify(
        webOSDev.launchParams()
      );
      document.querySelector("#type").innerHTML = "Launched with";
    },
    true
  );

  document.addEventListener("webOSRelaunch", function (inData) {
    console.log("Relaunch: " + JSON.stringify(inData.detail));
    document.querySelector("#result").innerHTML = JSON.stringify(
      webOSDev.launchParams()
    );
    document.querySelector("#type").innerHTML = "Relaunched with";
  });
}
