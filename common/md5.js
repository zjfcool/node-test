const crypto = require('crypto');

module.exports = {
  EXTKEY:'sdD;AFf;adflafl',
  md5:function(password){
    return crypto.createHash('md5').update(password,'utf-8').digest('hex');
  }
}
