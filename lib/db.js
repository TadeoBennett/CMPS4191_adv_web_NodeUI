const mysql = require("mysql2");
const dotenv = require("dotenv").config();

// pools are better because it gives x number of connections and connections can be reused
const pool = mysql.createPool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPWD,
    database: process.env.DBNAME
}).promise();


async function getResources() {
    var result = [];
    try {
        const sql = `SELECT ROW_NUMBER() 
        OVER (ORDER BY pr.parent, pr.resource) AS id,
            COALESCE(pr.parent, -1) AS parent,     
            pr.resource,     
            GROUP_CONCAT(m.method) AS methods FROM user_keys AS uk 
            INNER JOIN users AS u ON u.user_id = uk.user_id 
            INNER JOIN key_permissions AS kp ON uk.key_id = kp.key_id AND kp.status = 1 
            INNER JOIN     permissions AS pr ON kp.permission_id = pr.permission_id AND pr.status = 1 
            INNER JOIN     methods AS m ON kp.method_id = m.method_id 
            WHERE uk.key = 'awt_[9H<TzE5pIhW08tS(yF=Qo?{_0227029b5e7013d468d8155a47f1ec2b38f9f129aaadb9a668dd956dae443540'     
            AND uk.status = 1 AND u.status = 1 
            GROUP BY pr.parent, pr.resource 
            ORDER BY pr.parent, pr.resource;
        `;

        [result] = await pool.query(sql);
    } catch (error) {
        console.log("error");
    }

    let fixedResult = fixOutput(result);
    return fixedResult;

    // return result;
}

async function getResourcesDetails() {
    var result = [];
    try {
        const sql = `SELECT ROW_NUMBER() 
        OVER (ORDER BY pr.parent, pr.resource) AS id,
            COALESCE(pr.parent, -1) AS parent,     
            pr.resource,     
            GROUP_CONCAT(m.method) AS methods FROM user_keys AS uk 
            INNER JOIN users AS u ON u.user_id = uk.user_id 
            INNER JOIN key_permissions AS kp ON uk.key_id = kp.key_id AND kp.status = 1 
            INNER JOIN     permissions AS pr ON kp.permission_id = pr.permission_id AND pr.status = 1 
            INNER JOIN     methods AS m ON kp.method_id = m.method_id 
            WHERE uk.key = 'awt_[9H<TzE5pIhW08tS(yF=Qo?{_0227029b5e7013d468d8155a47f1ec2b38f9f129aaadb9a668dd956dae443540'     
            AND uk.status = 1 AND u.status = 1 
            GROUP BY pr.parent, pr.resource 
            ORDER BY pr.parent, pr.resource;
        `;

        [result] = await pool.query(sql);
    } catch (error) {
        console.log("error");
    }

    let fixedResult = fixOutput(result);
    return fixedResult;

    // return result;
}

async function fixOutput(input) {
    const output = input.map(entry => {
        const { id, parent, resource, methods } = entry;
        return { id, parent, resource, methods };
    });

    return output;
}


module.exports = {
    getResources,
    getResourcesDetails
};














