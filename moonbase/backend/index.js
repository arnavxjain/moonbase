const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

// mentioning the path for the secure variables
dotenv.config({ path: './.env' });
const app = express();

// setting up cors and json
app.use(express.json());
app.use(cors());

// stating the connection to the database
let db = mysql.createConnection({
    host       : "localhost",
    user       : "root",
    password   : process.env.mySQLMasterKey,
    database   : "mb_mp_1",
});

// establishing the connection to the database
db.connect((err) => {
    if (err) throw err;
    console.log('Connected To Moonbase[db] Successfully!')
});

// starting the server
app.listen(5500, () => {
    console.log("PORT: [5500]");
});

app.post("/auth/register", async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const conPassword = req.body.conPassword;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    const hashedPassword = await bcrypt.hash(password, 8);

    if (username == "" || email == "" || password == "" || conPassword == "" || firstname == "" || lastname == "") {
        res.send({
            message: "Invalid Or Missing Details"
        });
    } else if (password !== conPassword) {
        res.send({
            message: "The two passwords don't match!"
        });   
    } else if (password.length < 3) {
        res.send({
            message: "Password is too short! Make sure the password is longer than 5 characters!"
        });
    } else {
       
        //? auth state 1
        db.query(`SELECT * FROM users WHERE email = "${email}"`, (err, result) => {
            //? auth state 2
            if (result.length === 0) {
                db.query(`SELECT * FROM users WHERE username = "${username}"`, (err, response) => {
                    if (err) throw err;
                    
                    //? auth state 3
                    if (response.length === 0) {
                        db
                        .query("INSERT INTO users (username, email, password, firstname, lastname) VALUES (?, ?, ?, ?, ?)", [username, email, hashedPassword, firstname, lastname], (err, result) => {
                            if (err) throw err;
        
                            console.log(result);
                        });
                    } else if (response.length > 0) {
                        res.send({
                            message: "This username's taken. Please choose a different one!"
                        })
                    }
                });
            } else {
                res.send({
                    message: "A user with this email already exists. Please login!"
                });
            }
        })
    }
});

app.post("/auth/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (password == "" || username == "") {
        res.send({
            message: "Invalid Form Data!"
        });
    } else {
        db.query(`SELECT * FROM users WHERE username = "${username}"`, (err, result) => {
            if (result.length === 0) {
                res.send({
                    message: "No user found! Please check your form details!"
                });
            } else {
                // res.send(result);

                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (error) throw err;

                    if (response) {
                        const user = {
                            hashedPassword: result[0].password,
                            firstname: result[0].firstname,
                            lastname: result[0].lastname,
                            username: result[0].username,
                            email: result[0].email,
                            uid: result[0].uid
                        }

                        res.send({
                            userObject: user
                        });
                    } else {
                        res.send({
                            message: "Incorrect Password!"
                        });
                    }
                });

                    // if (response) {
                    //     res.send({
                    //         hashedPassword: result[0].password,
                    //         firstname: result[0].firstname,
                    //         lastname: result[0].lastname,
                    //         uid: result[0].uid
                    //     });
                    // } else {
                    //     res.send({
                    //         message: "Wrong Password"
                    //     });
                    // }
            }
        })
    }
});

app.get('/get/projects/:uid', (req, res) => {
    db.query(`SELECT * FROM projects WHERE uid = ${req.params.uid}`, (err, results) => {
        if (err) throw err;

        res.send(results);
    })
});