const express=require("express")
const bodyparser= require("body-parser")
const request= require("request")
const https=require("https")

const app=express()
app.use(bodyparser.urlencoded({extended: true}))

app.use(express.static("public"));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){
    var firstname= req.body.fname
    //console.log(firstname);
    var lastname=req.body.lname
    var email=req.body.email
    var data={
        members :[
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstname,
                LNAME: lastname
            }
        }
      ]
    };
    var jsondata=JSON.stringify(data)

    const url="https://us21.api.mailchimp.com/3.0/lists/5a767f242b"
    const options={
        method: "POST",
        auth: "shubham:b7bb7605034e757a6e369f98be5b0481-us21"
    }
    const request = https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/sucess.html")
        }
        else{
            res.sendFile(__dirname+"/failure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

   // request.write(jsondata);
    request.end();
})

app.post("/failure",function(req,res){
    res.redirect("/")
})
app.listen(3000,function(){
    console.log("server is up and running")
})

//b7bb7605034e757a6e369f98be5b0481-us21
//list id
//5a767f242b