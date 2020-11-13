Template.scormFrame.rendered = function () {
    $.scormTest = {};
    $.scormTest.requestObj = {
        request: null,
        user: null,
        app_key: "r4652hsnd735dgbcjd83u",
        date: null
    }
    $.scormTest.domain = window.location.toString().substring(0, window.location.toString().lastIndexOf("/"));
    $.scormTest.iframe = document.getElementById("myFrame").contentWindow;
    $.scormTest.log = document.getElementById("debugConsole");
    $.scormTest.intervalTime = 2000;
}

// TESTING CODE FOR SCORM IE STUFF
// var log = function(txt){
//     document.getElementById("console").innerHTML += txt + "</br>";
//     console.log(txt);
// }

Template.scormFrame.events({
    // TESTING CODE FOR SCORM IE STUFF
    // 'click #test-btn': function(){
    //     log("button click");
    //     log("doc.getElemById... div with id test-1: " + document.getElementById("test-1"));
    //     log("jquery select by id test-1: " + $("#test-1"));
    //     log("doc... div with id test-2 dataset: " + document.getElementById("test-2").dataset);
    //     log("jquery... div with id test-2 data(): " + $("#test-2").data());
    //     log("jquery... div with id test-2 data('test'): " + $("#test-2").data("test"));
    //     log("doc... div with id test-2 dataset.test: " + document.getElementById("test-2").dataset.test); // This fails in SCORM module when using IE
    // }

    //Initial Handshake *required by our frame
    "click #handshakeBtn": function (evt) {
        var handshakeInterval = setInterval(function () {
            var message = $.scormTest.requestObj;
            message.request = "handshake",
            message.date = new Date().toLocaleTimeString();

            $.scormTest.log.innerHTML += "<p>Requesting connection with the frame...</p>";
            $.scormTest.iframe.postMessage(message, $.scormTest.domain);
            autoTimeoutRequest(handshakeInterval);
        }, $.scormTest.intervalTime);

        var requestHandshake = function (evt) {
            var response = evt.data;
            if(response.app_key !== $.scormTest.requestObj.app_key) return false;

            if (response.request === "handshake" && response.success === "OK") {
                $.scormTest.log.innerHTML += "<p>Connection Established!</p>";
            } else {
                $.scormTest.log.innerHTML += "<p>" + response.success + "<br> " + response.data + "</p>";
            }
            clearInterval(handshakeInterval);
            window.removeEventListener('message', requestHandshake, false);
        }

        window.addEventListener('message', requestHandshake , false);
    },


    //Request user login with SCORM profile
    "click #loginBtn": function (evt) {
        var loginInterval = setInterval(function () {
            
            var message = $.scormTest.requestObj;
            message.user = {
                firstName: $("#fName").val(),
                lastName: $("#lName").val(),
                email: $("#userEmail").val(),
                scormId: $("#scormId").val()
            };
            message.request = "login";

            $.scormTest.log.innerHTML += "<p>Requesting login...</p>";
            $.scormTest.iframe.postMessage(message, $.scormTest.domain);
            autoTimeoutRequest(loginInterval);
        }, $.scormTest.intervalTime);

        var requestLogin = function (evt) {

            var response = evt.data;
            if(response.app_key !== $.scormTest.requestObj.app_key) return false;

            if (response.request === "login" && response.success === "OK") {
                $.scormTest.log.innerHTML += "<p>We are logged in!</p>";
            } else {
                $.scormTest.log.innerHTML += "<p>" + response.success + "<br> " + response.data + "</p>";
            }
            
            window.removeEventListener('message', requestLogin, false);
            clearInterval(loginInterval);
        }
        window.addEventListener('message', requestLogin , false);
    },


    //Request user logout for the provided user
    "click #logoutBtn": function (evt) {
        var logoutInterval = setInterval(function () {
            var message = $.scormTest.requestObj;

            message.request = "logout";

            $.scormTest.log.innerHTML += "<p>Requesting logout...</p>";
            $.scormTest.iframe.postMessage(message, $.scormTest.domain);
            autoTimeoutRequest(logoutInterval);
        }, $.scormTest.intervalTime);


        var requestLogout = function (evt) {
            var response = evt.data;
            if(response.app_key !== $.scormTest.requestObj.app_key) return false;

            if (response.request === "logout" && response.success === "OK") {
                $.scormTest.log.innerHTML += "<p>We are logged out!</p>";
            } else {
                $.scormTest.log.innerHTML += "<p>" + response.success + "<br> " + response.data + "</p>";
            }

            window.removeEventListener('message', requestLogout, false);
            clearInterval(logoutInterval);
        }
        window.addEventListener('message', requestLogout , false);
    }
})

var autoTimeoutRequest = function (interval) {
    setTimeout(function () {
        if (interval != null && interval != 'undefined') {
            clearInterval(interval);
        }
    }, 60000);
    // Automatically timeout requests after 1 minute of no response
}