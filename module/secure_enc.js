const CryptoJS = require("crypto-js");
const node_crypto = require('crypto');

//---------------------- Salt Key ------------------------------------------
const ENC_SECURE_KEY= "14MBJ5QCFGWTDRWOPIREPUSHTI19"

global.securedata = function(res, type) {
  expression = type
  switch (expression) {
    case "string_encrypt":
      return string_encrypt_data(res);
      break;
    case "json_encrypt":  
      return json_encrypt_data(res);
      break;
    case "string_decrypt":
      return string_decrypt_data(res);
      break;
    case "json_decrypt":
      return string_decrypt_data(res);
      break;
    case "string_encrypt_link":
      return string_encrypt_data_link(res);
      break;
    case "string_decrypt_link":
      return string_decrypt_data_link(res);
      break;
    default:
      return 'no expression'
  }
};

global.encodeBase64 = (data) => {
  return Buffer.from(data).toString('base64');
};

global.decodeBase64 = (data) => {
  return Buffer.from(data, 'base64').toString('ascii');
};

global.generateRandomString = (bytes) => {
  return new Promise((resolve, reject) => {
    node_crypto.randomBytes(bytes, function(err, buffer) {
      if(err) {
        reject({ status: false, err: err });
      }
      var token = buffer.toString('hex');
      // console.log("token: ", token);
      resolve({ status: true, token });
    });
  });
}

global.generateHash = function(value) {
  d = node_crypto.createHash('sha256').update(value).digest('hex');
  return d;

}


function string_encrypt_data(res) {
  const STRINGVAL = res;
  const ciphertext = CryptoJS.AES.encrypt(STRINGVAL.toString(), ENC_SECURE_KEY);
  return ciphertext.toString();
}

function json_encrypt_data(res) {
  const JSONVAL = res;
  const ciphertext = CryptoJS.AES.encrypt(JSONVAL, ENC_SECURE_KEY);
  return ciphertext;
}

function string_decrypt_data(res) {
  const STRINGVAL = res;
  const bytes = CryptoJS.AES.decrypt(STRINGVAL.toString(), ENC_SECURE_KEY);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
}

function json_decrypt_data(res) {
  const JSONVAL = res;
  const bytes = CryptoJS.AES.decrypt(JSONVAL.toString(), ENC_SECURE_KEY);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
}


