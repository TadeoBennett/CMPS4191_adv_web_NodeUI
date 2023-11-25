const mysql = require("mysql2");
const axios = require("axios");
const dotenv = require("dotenv").config();


// let params = JSON.stringify({ email: "tadeo@gmail.com", password: "Tadeo2002" });

let config = {
    maxBodyLength: Infinity,
    headers: {
        "Content-Type": "application/json",
        "API-KEY": "awt_[9H<TzE5pIhW08tS(yF=Qo?{_0227029b5e7013d468d8155a47f1ec2b38f9f129aaadb9a668dd956dae443540"
    }
    // data: params
}

async function getLaptops(){
    let params = JSON.stringify({ email: "tadeo@gmail.com", password: "Tadeo2002" });

    config.data = params;
    config.method = "get";
    config.url = "http://127.0.0.1:8036/demo3/laptops";

    let jsonString = "";

    try {
        const axiosResponse = await axios.request(config);
		jsonString = JSON.stringify(axiosResponse.data, undefined, 2);
    } catch (error) {
        console.log(error);
        jsonString = JSON.stringify({response_code: -1, log: "Error processing request"});
    }
    return jsonString;
}

async function getCustomers(){
    let params = JSON.stringify({ email: "tadeo@gmail.com", password: "Tadeo2002" });

    config.data = params;
    config.method = "get";
    config.url = "http://127.0.0.1:8036/demo3/users/customers";

    let jsonString = "";

    try {
        const axiosResponse = await axios.request(config);
		jsonString = JSON.stringify(axiosResponse.data, undefined, 2);
    } catch (error) {
        console.log(error);
        jsonString = JSON.stringify({response_code: -1, log: "Error processing request"});
    }
    return jsonString;
}

async function getUsers(){
    let params = JSON.stringify({ email: "tadeo@gmail.com", password: "Tadeo2002" });

    config.data = params;
    config.method = "get";
    config.url = "http://127.0.0.1:8036/demo3/users";

    let jsonString = "";

    try {
        const axiosResponse = await axios.request(config);
		jsonString = JSON.stringify(axiosResponse.data, undefined, 2);
    } catch (error) {
        console.log(error);
        jsonString = JSON.stringify({response_code: -1, log: "Error processing request"});
    }
    return jsonString;
}

async function getEmployees(){
    let params = JSON.stringify({ email: "tadeo@gmail.com", password: "Tadeo2002" });

    config.data = params;
    config.method = "get";
    config.url = "http://127.0.0.1:8036/demo3/users/employees";

    let jsonString = "";

    try {
        const axiosResponse = await axios.request(config);
		jsonString = JSON.stringify(axiosResponse.data, undefined, 2);
    } catch (error) {
        console.log(error);
        jsonString = JSON.stringify({response_code: -1, log: "Error processing request"});
    }
    return jsonString;
}


module.exports = {
    getLaptops,
    getCustomers,
    getUsers,
    getEmployees
};