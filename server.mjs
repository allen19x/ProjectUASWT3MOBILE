import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AppRouter from './AppRouter';
const basicAuth = require('./middleware/basic-auth');
require('dotenv').config()
const app = express()
const express = require('express')
app.use(express.json());
const port = 3000
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content - Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.get('/', basicAuth, (req, res) =>
    res.send('Hello World!')
)
app.get('/restaurants', (req, res) => {
    page = 1;
    limit = 20;
    city = "";

    var errors = [];
    if (req.query.page) {
        if (isNaN(req.query.page)) {
            errors.push({
                field: "page",
                message: "Page should be a number",
            });
        }
        else if (parseInt(req.query.page) <= 0) {
            errors.push({
                field: "page",
                message: "Page should be greater than zero",
            });
        }
        else {
            page = parseInt(req.query.page);
        }
    }
    if (req.query.limit) {
        if (isNaN(req.query.limit)) {
            errors.push({
                field: "limit",
                message: "Limit should be a number",
            });
        }
        else if (parseInt(req.query.limit) <= 0) {
            errors.push({
                field: "limit",
                message: "Limit should be greater than zero",
            });
        }
        else {
            limit = parseInt(req.query.limit);
        }
    }

    if (errors.length > 0) {
        res.status(400).send({
            errors
        });
    }
    else {
        offset = (page - 1) * limit;
        // contoh: limit 4
        // page 1 ----> offset 0
        // page 2 ----> (2-1) * 4 ---> offset 4 ---> longkap 4 record pertama
        // page 3 ----> (3-1) * 4 ---> offset 8 ---> longkap 8 record pertama
        // dst

        var dbconn = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            multipleStatements: true
        });

        dbconn.connect()
        if (req.user[0].allowview == 1) {
            query = "select id, name, cuisineType, city, rating from restaurants "

            values = []
            condition = ""

            countquery = "select count(id) as totalresto from restaurants "
            if (req.query.city) {
                if (condition) {
                    condition += " and "
                }
                condition += " city = ? "
                values.push(req.query.city)
            }
            if (req.query.cuisinetype) {
                if (condition) {
                    condition += " and "
                }
                condition += " cuisineType = ? "
                values.push(req.query.cuisinetype)
            }
            if (req.query.keyword) {
                if (condition) {
                    condition += " and "
                }
                condition += " name like ? "
                values.push("%" + req.query.keyword + "%")
            }

            // query = "select id, name, cuisineType, city, rating from restaurants "
            // http://localhost:3000?city=jakarta&cuisinetype=western&keyword=resto
            // condition = " city = ? and cuisinetype = ? and name like ? "
            // values = [  'jakarta',       'western',           '%resto%' ]

            if (condition) {
                query = query + " where " + condition
                countquery = countquery + " where " + condition
            }

            // countquery = "select count(id) as totalresto from restaurants 
            //            where city = ? and cuisinetype = ? and name like ?  "

            query = query + ' limit ? offset ? '

            // query = "select id, name, cuisineType, city, rating from restaurants 
            //            where city = ? and cuisinetype = ? and name like ?  
            //            limit ? offset ? ""

            // select id, name, cuisinetype, city, rating from resto 
            // where city = 'Jakarta' and name like '%food%' ----> values
            // limit 10 offset 0 ;                           ----> limit, offset
            // select count(id) as totalresto from resto
            // where city = 'Jakarta' and name like '%food%' ----> values
            dbconn.query(query + "; " + countquery, [...values, limit, offset, ...values],
                function (error, results, fields) {
                    if (error) {
                        res.status(500).send({
                            "message": "database error occured",
                            "detail": error
                        })
                    }
                    else {
                        // results[0] ----> hasil select query ---> 1 table
                        // results[0][row][field]
                        // contoh hasil query ada 3 record:
                        // results[0][0]['id'] ---> record index 0, field resto
                        // results[0][1]['cuisinetype'] ---> record index 1, field cuisinetype
                        // results[0][2]['city'] ---> record index 2, field city

                        // results[1] ----> hasil count query
                        // results[1][0]['totalresto']
                        totalresto = results[1][0]['totalresto']
                        response = {
                            data: results[0],
                            meta: {
                                page: page,
                                limit: limit,
                                totalPages: Math.ceil(totalresto / limit),
                                totalData: totalresto
                            }
                        };
                        res.status(200).send(response)
                    }
                    dbconn.end()
                })
        }
        else {
            res.status(401).send({
                "message": "Unauthorize",
                "detail": "User unauthorize to view data"
            })
        }
    }
})

app.get('/restaurants/:id', (req, res) => {
    var dbconn = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    dbconn.connect()
    if (req.user[0].allowview == 1) {
        dbconn.query(" select id, name, cuisineType, city, rating from restaurants where id = ? ", [req.params.id],
            function (error, results, fields) {
                if (error) {
                    res.status(500).send({
                        "message": "database error occured",
                        "detail": error
                    })
                }
                else if (results.length == 0) {
                    res.status(404).send({
                        errors: [
                            {
                                field: "id",
                                message: "Restaurant with id " + req.params.id + " is not found.",
                            }
                        ]
                    })
                }
                else {
                    res.status(200).send(results[0])
                }
                dbconn.end()
            })
    }
    else {
        res.status(401).send({
            "message": "Unauthorize",
            "detail": "User unauthorize to view data"
        })
    }
});

app.post('/restaurants', (req, res) => {
    var newresto = req.body;
    var errors = [];
    if (!newresto.id) {
        errors.push({
            field: "id",
            message: "Restaurant id is required"
        })
    }
    if (!newresto.name) {
        errors.push({
            field: "name",
            message: "Restaurant name is required"
        })
    }
    if (!newresto.city) {
        errors.push({
            field: "city",
            message: "Restaurant city is required"
        })
    }
    if (!newresto.rating) {
        errors.push({
            field: "rating",
            message: "Restaurant rating is required"
        })
    }
    else if (isNaN(newresto.rating)) {
        errors.push({
            field: "rating",
            message: "Restaurant rating should be a number"
        })
    }
    else if (newresto.rating < 1 || newresto.rating > 5) {
        errors.push({
            field: "rating",
            message: "Restaurant rating should be between 1 to 5"
        })
    }
    if (errors.length == 0) {
        var dbconn = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        dbconn.connect()
        if (req.user[0].allowadd == 1) {
            dbconn.query(" insert into restaurants (id, name, city, cuisineType, rating) values (?, ?, ?, ?, ?) ",
                [newresto.id, newresto.name, newresto.city, newresto.cuisineType, newresto.rating],
                function (error, results, fields) {
                    if (error) {
                        res.status(500).send({
                            "message": "database error occured",
                            "detail": error
                        })
                    }
                    else if (results.affectedRows > 0) {
                        res.status(201).send({
                            "data": newresto
                        })
                    }
                    else {
                        res.status(500).send({
                            "message": "database error occured",
                            "detail": "Failed to insert record to database"
                        })
                    }
                    dbconn.end()
                })
        }
        else {
            res.status(401).send({
                "message": "Unauthorize",
                "detail": "User unauthorize to add data"
            })
        }

    }
    else {
        res.status(400).send({
            errors
        });
    }
});

app.put('/restaurants/:id', (req, res) => {
    var updateddata = req.body;
    var errors = [];
    if (!req.params.id) {
        errors.push({
            field: "id",
            message: "Restaurant id is required"
        })
    }
    if (!updateddata.name) {
        errors.push({
            field: "name",
            message: "Restaurant name is required"
        })
    }
    if (!updateddata.city) {
        errors.push({
            field: "city",
            message: "Restaurant city is required"
        })
    }
    if (!updateddata.rating) {
        errors.push({
            field: "rating",
            message: "Restaurant rating is required"
        })
    }
    else if (isNaN(updateddata.rating)) {
        errors.push({
            field: "rating",
            message: "Restaurant rating should be a number"
        })
    }
    else if (updateddata.rating < 1 || updateddata.rating > 5) {
        errors.push({
            field: "rating",
            message: "Restaurant rating should be between 1 to 5"
        })
    }

    if (errors.length == 0) {
        var dbconn = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        dbconn.connect()
        if (req.user[0].allowupdate == 1) {
            dbconn.query(" update restaurants " +
                "  set name = ?, " +
                "     city = ?, " +
                "     cuisineType = ?, " +
                "     rating = ? " +
                "  where id = ?; ",
                [updateddata.name, updateddata.city, updateddata.cuisineType, updateddata.rating, req.params.id,
                req.params.id],
                function (error, results, fields) {
                    if (error) {
                        res.status(500).send({
                            "message": "database error occured",
                            "detail": error
                        })
                    }
                    else if (results.affectedRows > 0) {
                        res.status(200).send(updateddata)
                    }
                    else {
                        res.status(404).send({
                            errors: [
                                {
                                    field: "id",
                                    message: "Restaurant with id " + req.params.id + " is not found.",
                                }
                            ]
                        })
                    }
                    dbconn.end()
                })
            }
                    else {
                        res.status(401).send({
                            "message": "Unauthorize",
                            "detail": "User unauthorize to update data"
                        })
                    }
                }
            else {
                res.status(400).send({
                    errors
                });
            }
});

app.delete('/restaurants/:id', (req, res) => {
    var dbconn = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    dbconn.connect()
    if (req.user[0].allowdelete == 1) {
        dbconn.query(" delete from restaurants where id = ? ", [req.params.id],
            function (error, results, fields) {
                if (error) {
                    res.status(500).send({
                        "message": "database error occured",
                        "detail": error
                    })
                }
                else if (results.affectedRows > 0) {
                    res.status(204).send()
                }
                else {
                    res.status(404).send({
                        errors: [
                            {
                                field: "id",
                                message: "Restaurant with id " + req.params.id + " is not found.",
                            }
                        ]
                    })
                }
                dbconn.end()
            })
    }
    else {
        res.status(401).send({
            "message": "Unauthorize",
            "detail": "User unauthorize to delete data"
        })
    }
});

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
)



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
