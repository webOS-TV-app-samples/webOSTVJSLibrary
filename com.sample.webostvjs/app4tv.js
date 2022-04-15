function print(content, res) {
  document.querySelector('#' + content).innerHTML = res;
}

function getSystemInfo() {
  var systemInfo = webOS.systemInfo();
  var info =
    '<table>' +
      '<tr>' +
        '<th>country</th>' +
        '<td>' + systemInfo.country + '</td>' +
        '<th>smartServiceCountry</th>' +
        '<td>' + systemInfo.smartServiceCountry + '</td>' +
        '<th>timezone</th>' +
        '<td>' + systemInfo.timezone + '</td>' +
      '</tr>' +
    '</table>';
  print('systemInfo', info);
}

function getDeviceInfo(device) {
  var info =
    '<table>' +
      '<tr>' +
        '<th>modelName</th>' +
        '<td>' + device.modelName + '</td>' +
        '<th>version</th>' +
        '<td>' + device.version + '</td>' +
        '<th>sdkVersion</th>' +
        '<td>' + device.sdkVersion + '</td>' +
      '</tr>' +
      '<tr>' +
        '<th>screenWidth</th>' +
        '<td>' + device.screenWidth + '</td>' +
        '<th>screenHeight</th>' +
        '<td>' + device.screenHeight + '</td>' +
        '<th>ddrSize</th>' +
        '<td>' + device.ddrSize + '</td>' +
      '</tr>' +
      '<tr>' +
        '<th>uhd</th>' +
        '<td>' + device.uhd + '</td>' +
        '<th>uhd8K</th>' +
        '<td>' + device.uhd8K + '</td>' +
        '<th>oled</th>' +
        '<td>' + device.oled + '</td>' +
      '</tr>' +
      '<tr>' +
        '<th>hdr10</th>' +
        '<td>' + device.hdr10 + '</td>' +
        '<th>dolbyVision</th>' +
        '<td>' + device.dolbyVision + '</td>' +
        '<th>dolbyAtmos</th>' +
        '<td>' + device.dolbyAtmos + '</td>' +
      '</tr>' +
    '</table>';
  print('deviceInfo', info);
}

function initPage() {
  document.querySelector('#refresh').addEventListener('click', function () {
    window.location.reload();
  });

  print('libVersion', webOS.libVersion);
  print('platform', webOS.platform.tv);

  document.querySelector('#platformBack').addEventListener('click', function () {
    webOS.platformBack();
  });
  print('keyboard', webOS.keyboard.isShowing());
  document.querySelector('#input').addEventListener('click', function () {
    print('keyboard', webOS.keyboard.isShowing());
  });
  
  print('fetchAppRootPath', webOS.fetchAppRootPath());
  print('fetchAppId', webOS.fetchAppId());
  webOS.fetchAppInfo(function (info) {
    print('fetchAppInfo', info === undefined ? 'none' : 'version - ' +  info.version);
  }, webOS.fetchAppRootPath() + 'appinfo.json');

  getSystemInfo();
  webOS.deviceInfo(function (device) {
    getDeviceInfo(device);
  });
  callSystemService();

  // run webOS.service.request and webOS.keyboard.isShowing every 1sec
  setInterval(function() {
    callSystemService();
    print('keyboard', webOS.keyboard.isShowing());
  }, 1000);
}

function callSystemService() {
  webOS.service.request('luna://com.palm.systemservice',
    {
      method: 'time/getSystemTime',
      parameters: {},
      onSuccess: function (res) {
        print('service', Date(res.utc));
      },
      onFailure: function (res) {
        console.log('system time fail', res);
        print('service', res.errorCode);
      },
    }
  );
}
