const express = require('express');
const bodyParse = require('body-parser');
const { request } = require('express');

// call express class and function, using below
const app = express()
//create port
const port = 5000




// defined the get request, using get(), we will send the response in pages to display, / respresnts your homepage
app.get('/',(req,res)=>{
    res.send('Welcome to custom express server')
})

// routing
app.get('/about', (req, res) => {
    res.send('Wanna know about us')
})

app.get('/contact', (req, res) => {
    res.send('<h1 style="text-align:center">Contact Us Now</h1>')
})

//now instead of sending text as response, we can send filename like index.html as well, using below method
app.get('/calculator', (req, res) => {
    // res.sendFile('/index.html')
    // when we pass directly filename, it will throw an error saying to provide absolute path, thus we need to get the directory path
    res.sendFile(__dirname+'/index.html');
})


// we can also post method to perform certain operation


// we can access bodyparser using app.use(bodyParse,urlencoded({extended:true}))
app.use(bodyParse.urlencoded({extended:true})); 

app.post('/calculator',(req,res)=>{
    // res.send('<h2 style="text-align:center">Thank you for checking out our calculator</h2>');

    // to handle http post request, we have to install middleware module called body-parser
    // body-parser extract the entire body portion of an incoming request stream and expose it to request body
    //body-parser module parses a JSON, buffer, string and URL encoded data submitted using HTTP POST request
    // after installing body-parser import the package via require() like above

    // we can fetch the body using req(body)
    console.log(req.body) // see the fetched data after submission

    // now we can fetch the values
    let num1 = +req.body.n1;
    let num2= +req.body.n2;    
    res.send(`<h2 style='text-align:center'>the sume of given numbers are: ${num1 + num2}</h2>`)
})


app.get('/bmi',(req,res)=>{
    res.sendFile(__dirname+'/bmi.html')
})


app.post('/bmi', (req, res) => {
    // console.log(req.body);
    let weight = +req.body.weight;
    let height = +req.body.height
    let bmi = weight/ (height**height)
    let result
    if(bmi>=18.5 && bmi<=24.9){
        result = "congrats! your bmi index shows you are healthy";
    }else if(bmi<18.5){
        result = "sorry! your bmi index shows you are thin and need more nutrition";
    }else{
        result = "warning! your bmi index shows you are overweight, time to exercise";
    }
    res.send(`<h3 style='text-align:center'>Your BMI is: ${bmi} and ${result}</h3>`)
})

// to create server listen(port) is used, and we can use the callback() to display message
app.listen(port, (request,response)=>{
    console.log(`server is running at port no. ${port} `);
});
