function print(content, res) {
  document.querySelector('#' + content).innerHTML = res;
}

function getConnectionStatus(status) {
  var connection = {
    ipAddress: '',
    gateway: '',
    netmask: '',
    dns1: ''
  };
  if (status.wired.state === 'connected') {
    connection = status.wired;
  } else if (status.wifi.state === 'connected') {
    connection = status.wifi;
  }
  var info =
    '<table>' +
      '<tr>' +
        '<th>wired.state</th>' +
        '<td>' + status.wired.state + '</td>' +
        '<th>wifi.state</th>' +
        '<td>' + status.wifi.state + '</td>' +
      '</tr>' +
      '<tr>' +
        '<th>ipAddress</th>' +
        '<td>' + connection.ipAddress + '</td>' +
        '<th>gateway</th>' +
        '<td>' + connection.gateway + '</td>' +
      '</tr>' +
      '<tr>' +
        '<th>netmask</th>' +
        '<td>' + connection.netmask + '</td>' +
        '<th>dns1</th>' +
        '<td>' + connection.dns1 + '</td>' +
      '</tr>' +
    '</table>';
  print('connection', info);
}

function initDevPage() {
  document.querySelector('#refresh').addEventListener('click', function () {
    window.location.reload();
  });
  webOSDev.LGUDID({
    onSuccess: function (res) {
      print('lgudid', res.id);
    },
    onFailure: function (res) {
      print('lgudid', res.errorCode, ' - ', res.errorText);
    }}
  );
  webOSDev.connection.getStatus({
    onSuccess: function (info) {
      getConnectionStatus(info);
    },
    onFailure: function (res) {
      console.log('connection getStatus failure', res.errorCode, res.errorText);
    },
    subscribe: true
  });
  document.querySelector('#launchApp').addEventListener('click', function () {
    webOSDev.launch({
      id: 'com.sample.launch',
      params: {
        firstParam: 'firstValue',
        secondParam: 'secondValue',
      },
      onSuccess: function () {
        console.log('success');
      },
      onFailure: function (res) {
        console.log('failure', res.errorCode, res.errorText);
      }
    });
  });
  document.querySelector('#launchBrowser').addEventListener('click', function () {
    webOSDev.launch({
      id: webOSDev.APP.BROWSER,
      params: {
        target: 'http://webostv.developer.lge.com',
      },
      onSuccess: function () {
        console.log('success');
      },
      onFailure: function (res) {
        console.log('failure', res.errorCode, res.errorText);
      }
    });
  });
}
