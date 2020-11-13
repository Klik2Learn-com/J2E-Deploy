/**
*	The validation object and it's methods are used to validate data on the client side before it is sent to the server.
*	The data must still be validated on the server side.
*/
validator = {

	/**
	*	@method:	isValidEmailAddress
	*	@descr:		This function is used to check the emailAddress string is in valid email format.
	*	@returns:	true if valid email address format, false if not.	
	*/
	isValidEmailAddress : function(emailAddress) {
	    var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
	    return pattern.test(emailAddress);
	}

}