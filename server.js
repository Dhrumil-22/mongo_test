const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));


app.get("/", (req, res) => {
    res.send("Server is running");
});

/* ------------------ DATABASE CONNECTION ------------------ */

mongoose.connect("mongodb+srv://dhrumilvaghela22_db_user:RkVTx17DAZumDo7K@cluster0.xzbjlpd.mongodb.net/project")
.then(() => console.log("MongoDB atlas Connected"))
.catch(err => console.log(err));


/* ------------------ Register SCHEMA ------------------ */

const regisSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const Register = mongoose.model("regis", regisSchema);


/* ------------------ REGISTER API ------------------ */

app.post("/register", async (req, res) => {

    const { name, email, password } = req.body;
    
    try {
        
        const user = new Register({
            name: name,
            email: email,
            password: password
        });

        await user.save();

       res.redirect("/login.html");
        
    } catch (error) {
        
        res.status(500).send("Error saving user");
        
    }
});


/* ------------------ LOGIN API ------------------ */

app.post("/login", async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await Register.findOne({ email: email, password: password });

        if (user) {
            res.send("Login Successful");
        } else {
            res.send("Invalid Email or Password");
        }

    } catch (error) {

        res.status(500).send("Login Error");

    }
});


/* ------------------ SERVER ------------------ */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running");
});


