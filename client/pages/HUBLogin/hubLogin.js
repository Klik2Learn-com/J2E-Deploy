/*
`   sends POST request to hub API to receive an encrypted user email
    @params key -  token for quering the hub API received earlier by get message 
    @returns a Promise to receive j2e_email - encrypted j2e email received from the hub or Error if email has not been received
                            or if there has been a network error
*/

let get_email_from_hub = function (token) {
    let data = { userKey: token };
    const url = 'https://edu.klik2learn.com/api/getUserStatus';
    return new Promise(function (resolve, reject) {
        // call 'POST' request on hub API
        $.post(url, data, function (res, status) {
            if (status !== 'success') {
                reject(new Error('error POST conn'));
                return;
            }
            res = JSON.parse(res);
            let data_res = res['data'];
            if (!data_res) {
                reject(new Error('no data field'));
                return;
            }
            let j2e_email = data_res['j2eId'];
            if (!j2e_email) {
                reject(new Error('no j2eId'));
                return;
            }
            resolve(j2e_email);
        });
    });
}

/*
    1. sends a POST request to hub API for an encrypted email.
    2. decrypts the email.
    3. gets the user with the email sent by the hub API
    4. creates a login token for the user and logs them in.

    @param token: a token to query hub API.
*/

hub_login = async function (token) {
    try {
        //wait for POST request promise to resolve
        var _encrypted_email = await get_email_from_hub(token);
    } catch (err) {
        //error or unexpected results from hub API --> redirect to error page
        Router.go('/');
    }


    if (!_encrypted_email) {
        Router.go("/hubError");
        return false;
    }

    //decrypt email received from the hub
    Meteor.call('hub_decrypt', _encrypted_email, function (err, _decrypted_email_) {
        //error decrypting email --> redirect to error page
        if (!_decrypted_email_ || err) {
            return false;
        }

        //get user with the email given
        Meteor.call('getUserByEmail', _decrypted_email_, function (err, _user_) {
            //error no user with email given in the j2e db --> redirect to error page
            if (!_user_ || err) {
                Router.go("/hubError");
            }
            let _user_id_ = _user_._id;

            //create a login token and log in the user
            Meteor.call('create_token', _user_id_, function (_err_, _token_res_) {
                //error creating the token --> redirect to error page
                if (_err_) {
                    Router.go("/hubError");
                }

                let token = _token_res_.token;
                Meteor.loginWithToken(token, function (_error_, _res_) {
                    //invalid log-in token --> redirect to error page
                    if (_error_) {
                        Router.go("/hubError");
                    }
                    //redirect the logged in user to main page
                    Router.go("/");

                });
            });
        });
    });
}