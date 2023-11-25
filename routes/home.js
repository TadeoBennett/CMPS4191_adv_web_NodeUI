const express = require('express'); //include express again for this file
const axios = require('axios');
const db = require("../lib/db");
const rs = require("../lib/rest");
const router = express.Router();

const routeLogin = require("./login");
router.use("/login", routeLogin);

//routes declared in this file are accessing /home/...
//127.0.0.1:8038/home - represented by the route below
router.get('/', async (request, response) => {
	if (request.session.userid) {
		console.log("Session found: " + request.session.userid);

		const list = await db.getResources();

		console.log(list);
		response.render("home", { resources: list });
	} else {
		response.redirect('/login');
	}
});


//for examples the route below is accessing /home/basic-table so you don't have to put /home/basic-table for the route
// router.get('/basic-table', function (request, response) {
// 	response.render("home");
// });

router.get('/:parent', async (request, response) => {
	// const list = await db.getResourcesDetails(request.params.item.parent);
	// response.render("home", { resources: list });

	// response.send(request.params.item.id)
	let descr = "";

	if (request.session.userid) {
		switch (request.params.parent) {
			case "laptops":
				data = await rs.getLaptops();
				descr = "This request returns all laptops in the database."
				break;
			case "users":
				data = await rs.getUsers();
				descr = "This request returns all users in the database."
				break; 
			case "customers":
				data = await rs.getCustomers();
				descr = "This request returns all customers in the database."
				break;
			case "employees":
				data = await rs.getEmployees();
				descr = "This request returns all employees in the database."
				break;
			default:
				break; 
		}
		response.render("home-resource", {endPointName: request.params.parent, apiResult: data, description: descr})
	} else {
		response.redirect("/login");
	}
});

module.exports = router;
