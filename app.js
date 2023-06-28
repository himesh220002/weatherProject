const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req, res){
        res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req,res){
    const query = req.body.cityName;
    const apiKey = "40b492c7e33364bb79db298bc176472c";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units=metric";
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data); // converting hexadecimal into js object
            const temp = weatherData.main.temp;
            const weatherDiscription = weatherData.weather[0].description;
            const icon =weatherData.weather[0].icon;
            const imageUrl ="https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p>The weather is currently "+ weatherDiscription+" </p>");
            res.write("<h1>The temp in "+query+" is "+temp+" degree celcius</h1>");
            res.write("<img src="+imageUrl+">");            
            res.send();
            
        });
    });
});



app.listen(3000,()=>{
    console.log("server is running at port 3000");
});