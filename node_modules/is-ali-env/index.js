const fetch = require('node-fetch');
const FormData = require('form-data');

module.exports = function(opts) {
  opts = opts || {};
  return new Promise(function(resolve) {
    const form = new FormData();
    form.append('ip', 'myip');

    fetch('http://ip.taobao.com/service/getIpInfo2.php', {
      method: 'post',
      body: form,
      timeout: opts.timeout || 2000,
    }).then(function(res) {
      if (res.status === 200) {
        return res.json();
      } else {
        console.log(res.status);
        resolve(false);
      }
    }).then(function(res) {
      if (res.data && (res.data.isp_id === '100098' || res.data.isp_id === '100017')) {
        resolve(true);
      } else {
        resolve(false);
      }
    }).catch(function(err) {
      resolve(false);
    });
  });
};
