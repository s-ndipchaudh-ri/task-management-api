const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
global.Joi = require("joi");
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Management',
            version: '1.0.0',
            description: 'A simple API for task management.',
        },
        tags: [
            {
                name: 'USER',
                description: 'Operations related to users'
            },
            {
                name: 'TASK',
                description: 'Operations related to tasks'
            }
        ],
    },
    apis: ['./routes/task.js','./routes/user.js']
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);

var cookieParser = require("cookie-parser");

const app = express()
require("./dbConfig").connectDB();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())
app.options('/*',cors())
app.use(function (req, res, next) {
	//Enabling CORS
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
	next();
});


// import all routes
const Routes = require('./routes');
app.use(Routes)


app.listen(8001, function() {
    console.log("App started")
});