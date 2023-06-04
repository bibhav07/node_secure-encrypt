const express  = require("express");
const app  = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const systemIncludes = require("./module/system_includes");

app.use(express.json());
app.use(cookieParser());


app.get("/encJWT", (req, res) => {

    const names = ["AKASH", "ROHAN", "BIBHAV", "VIPUL", "JAYESH", "RON", "JENNY", "THOMAS"];

    const randomName = names[Math.floor(Math.random() * 8)];
    const token = jwt.sign({name : randomName, place : "mumbai", department : "ID"},  "ABC@123",
    { expiresIn: "1m" });

    const enc_accessToken = securedata(token, "string_encrypt");

    const oneDay = 1000 * 60 * 60 * 24;
    const options = {
      expires: new Date(Date.now() + oneDay),
      httpOnly: true,
    };


    return res
    .status(200)
    .cookie("jwt", enc_accessToken, options)
    .json({token : enc_accessToken, user : randomName});


});

const verifyActivationJWT = ({ token, key }) => jwt.verify(token, key);


app.get("/decJWT", (req, res) => {

    const {jwt} = req.cookies;
    const enc_accessToken = securedata(jwt, "string_decrypt");
    const decodeVal =  verifyActivationJWT({token :enc_accessToken, key : "ABC@123"});
    return res.status(200).json({token : enc_accessToken, decodeVal});

})




app.listen(7700, () => {
    console.log("app running on port 7700");
})