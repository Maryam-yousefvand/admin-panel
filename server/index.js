let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
const path = require('path')
var fs = require('fs');

const loginRoute = require('../server/routes/login')
const registerRoute = require('../server/routes/register')

mongoose.Promise = global.Promise;
mongoose.connect((process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/panel'), {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
        console.log('Database connected sucessfully !')
    },
    error => {
        console.log('Database could not be connected : ' + error)
    }
)

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use('/login', loginRoute )
app.use('/register', registerRoute )

if (process.env.NODE_ENV === "production") {
    app.use(express.static('./panel/build'))
    app.get('*', (req, res) => {
        req.sendFile(path.resolve(__dirname + './panel/build/index.html'))
    })
}




const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})
// Error Handling
app.use((req, res, next) => {
    next(createError(404));
});
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
