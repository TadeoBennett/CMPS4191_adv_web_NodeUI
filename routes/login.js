const axios = require('axios');
const express = require('express'); //include express again for this file
const router = express.Router();


router.get('/', function (request, response) {
	if (request.session.userid) {
		console.log("Session found: " + request.session.userid);
		response.redirect("home");
	} else {
		console.log("Session NOT found");
		response.render("index");
	}
	// response.render("index");
});

router.post('/', async (request, response) => {

	//console.log("Email: " + request.body.email + ", Password: " + request.body.password);

	// console.log(data);
	console.log(request.body);
	// let sentEmail = request.body.email;
	// let sentPassword = request.body.password;
	// let data = JSON.stringify({email: sentEmail, password: sentPassword});

	let params = JSON.stringify(request.body);

	let config = {
		method: 'get',
		maxBodyLength: Infinity,
		url: "http://127.0.0.1:8036/CMPS4191_adv_web_RESTAPI/login",
		headers: {
			"Content-Type": "application/json",
			"API-KEY": "awt_[9H<TzE5pIhW08tS(yF=Qo?{_0227029b5e7013d468d8155a47f1ec2b38f9f129aaadb9a668dd956dae443540"
		},
		data: params
	}

	// Make a GET  request to the external API with data in the request body
	//may run into problems using this if the response from the API is not received in time
	// axios.request(config).then((axiosResponse) => {
	// 	let responseString = JSON.stringify(axiosResponse.data);
	// 	console.log(responseString);
	// 	response.send(responseString); 
	// }).catch((error) =>{ 
	// 	console.log(error);
	// 	// res.send(JSON.stringify({ "rc": -1 }));
	// });


	//----------------------
	let userID = -1;
	let username = "";
	let jsonString = "";

	try {
		const axiosResponse = await axios.request(config);
		console.log("axios response message: "+ axiosResponse.data.message);
		console.log("axios response code: "+ axiosResponse.data.rc);
		userID = axiosResponse.data.data.userid;
		username = axiosResponse.data.data.user;
		
		jsonString = JSON.stringify(axiosResponse.data);
		console.log(jsonString);
	} catch (error) {
		console.log(error);
	}
	
	request.session.userid = userID;
	request.session.username = username;
	console.log("userID: " + userID);
	console.log("user: " + username);
	console.log("session end: " + request.session.userid);
	response.send(jsonString);
});


module.exports = router;
