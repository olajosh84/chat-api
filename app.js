const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

/** express middlewares **/
const origin = process.env.CLIENT_URI;
app.use(cors({
    origin: origin,
    methods: ["POST", 'GET'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const connectDb = require('./db/connect');
const notFound = require('./middlewares/not-found');
const authenticateUser = require('./middlewares/authenticate-user');

/** routers **/
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const conversationRouter = require("./routes/conversation");
const messageRouter = require("./routes/message");
const dashboardRouter = require('./routes/dashboard');

//test route. PS: TO BE DELETED LATER
app.get('/', (req, res) => res.send("<h2>Hello world</h2>"));

/** route endpoints **/
app.use('/api/v1/auth', authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/conversations", conversationRouter);
app.use("/api/v1/messages", messageRouter);
app.use('/api/v1/dashboard', authenticateUser, dashboardRouter);

/** my middlewares **/
app.use(notFound);

/** DB and Server Connection **/
const port = process.env.PORT || 8080;
const dbConnection = async (req, res) => {
    try{
        await connectDb(process.env.MONGODB_URI);
        app.listen(port, () => {
            console.log(`DB connected and server listening on port http://localhost:${port}`);
        })
    } catch(error){
        console.log("DB connection failed");
    }
    
}
dbConnection();


