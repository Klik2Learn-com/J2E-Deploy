var crypto = require('crypto'); // Node.js module for cryptography

//encryption/decryption parameters
let password = '1234567890abcdef1234567890abcdef'; // password- same as on the hub
let iv = '1234567890abcdef' // initialization vector, same as on the hub


Meteor.methods({
    /*
        encrypts @text based on 'aes-256-ctr' algorithm
        @params text- text to be encrypted
        @return encrypted- encrypted text value or Error if crypto module has not been found
    */
    'hub_encrypt': function (text) {
        console.log('hub encrypt');
        if (crypto) {
            let cipher = crypto.createCipheriv('aes-256-ctr', password, iv)
            let encrypted = cipher.update(text, 'utf8', 'hex')
            encrypted += cipher.final('hex');
            return encrypted;
        }
        return new Error('crypto module not found');
    },

    /*
        decrypts @text based on 'aes-256-ctr' algorithm
        @params text- text to be decrypted
        @return dec- decrypted text value or Error if crypto module has not been found
    */
    'hub_decrypt': function (text) {
        if (crypto) {
            var decipher = crypto.createDecipheriv('aes-256-ctr', password, iv);
            var dec = decipher.update(text, 'hex', 'utf8');
            dec += decipher.final('utf8');
            return dec;
        }
        return new Error('crypto module not found');
    },

    /* 
        --------------NOT USED---------------
        got 404 responses from the hub on dev

        sends POST request to hub API to receive an encrypted user email
        @params key -  token for quering the hub API received earlier by get message 
        @returns j2e_email - encrypted j2e email received from the hub or Error if email has not been received
                            or if there has been a network error
    */
   /*
    'query_user_email_hub': async function (key) {
        try {
            const url = 'https://hub.klik2learn.com/api/getUserStatus'; // hub API url

            let hub_resp = new Promise(function (resolve, reject) {
                // call 'POST' request on hub API
                HTTP.call('POST', url,
                    { params: { userKey: key }, 
                      npmRequestOptions: { rejectUnauthorized: false } 
                    },
                    function (err, res) {
                        if (err) {
                            resolve({res: res, err_msg: "Error POST conn", err: err});
                        } else {
                            //response content
                            let res_content = res['content'];
                            if (!res_content) {
                                //reject(new Error('invalid POST response'));
                                resolve({res: res, err: "No res_content field"});
                            }
                            res_content = JSON.parse(res_content);
                            let data = res_content['data'];
                            if (!data) {
                                //reject(new Error('invalid POST response'));
                                resolve({res: res, err: "No data field"});
                            }
                            let j2eId = data['j2eId']; //encrypted user email
                            result = j2eId;
                            resolve({j2eId: j2eId, res: res});
                        }
                    });
            });

            let j2e_email = await hub_resp;
            return j2e_email;

        } catch (e) {
            // Got a network error, timeout, or HTTP error in the 400 or 500 range.
            return Error('Network error');
        }
    }
    */
});