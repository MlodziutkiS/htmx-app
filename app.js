const express = require('express')
const cors = require('cors')
const axios = require('axios')
const path = require('path')

const app = express()
const port = 3000

let data={body:"Sorry wttr.in did not respond <br> but the temperature outside should be more than -273C and less than 1400C", age:0};

//app.use(cors("https://localhost:3000/"))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./index.html"))
  })

app.get('/home', (req, res) => {
  if(req.get('sec-fetch-site')=='none'){
    console.log("redirected")
    res.redirect(301, 'http://localhost:3000')
    return;
  }
  res.sendFile(path.join(__dirname, "./home.html"))
})

app.get('/weather', (req, res) => {

  if(req.get('sec-fetch-site')=='none'){
    console.log("redirected")
    res.redirect(301, 'http://localhost:3000')
    return;
  }

    if(Date.now()-data.age > 6000){
        data.age=Date.now();
        axios.get('https://wttr.in')
        .then(resp => {
          console.log('New fetch')
          data.body=resp.data;
          res.send(resp.data);
        })
        .catch(err => {
          console.log('Error: ', err.message);
          res.send("Errors occured")
        });
    }else{
        res.send(data.body);
    }
  })

  app.get('/about', (req, res) => {

    if(req.get('sec-fetch-site')=='none'){
      console.log("redirected")
      res.redirect(301, 'http://localhost:3000')
      return;
    }

    res.send('Htmx is the way for <i>fast</i> websites')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})