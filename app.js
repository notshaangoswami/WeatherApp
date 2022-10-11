const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");

  //res.send("running");
});
app.post("/", function (req, res) {
  const cityNam = req.body.cityName;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?appid=341a3cdb00d7d0e34246153bf3a21cc3&q=" +
    cityNam +
    "&units=metric";

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      //data jo hai is in buffer object

      const weatherData = JSON.parse(data); //converts into jsioon object
      const temp = weatherData.main.temp;
      const weatherDes = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(
        "<p>The weather is currently " + weatherDes + " in " + cityNam + "</p>"
      );
      res.write(
        "<h1>The temp in " + cityNam + " is " + temp + " degree celcius</h1>"
      );
      res.write("<img src=" + imgUrl + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
