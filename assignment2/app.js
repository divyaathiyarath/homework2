const Express=require('express');
var app=new Express();
var request=require('request');
var bodyparser=require('body-parser');
var mongoose=require('mongoose');
app.set('view engine','ejs');
app.use(Express.static(__dirname+"/public"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
mongoose.connect("mongodb+srv://mongodb:mongodb@mycluster-rfooj.mongodb.net/test?retryWrites=true&w=majority");
var LibraryModel=mongoose.model("library",{
    title:String,
    author:String,
    publisher:String,
    date_of_publication:String,
    distributor:String,
    price:String,
    description:String
});
books=[
    {
        'title':'Turning points',
        'author':'A.P.J.Abdul Kalam',
        'publisher':'HarperCollins',
        'date_of_publication':'8/9/2012',
        'distributor':'HarperCollins',
        'price':225,
        'Description':'Turning points'


    },
    {
        title:"Randamoozham",
        author:"M.T.Vasudevan Nair",
        publisher:"DC Books",
        date_of_publication:"December 1984",
        distributor:"DC Books",
        price:225,
        Description:"Malayalam novel"

    },
    {
        title:"Aarachaar",
        author:"K.R.Meera",
        publisher:"DC Books",
        date_of_publication:"1 November 2012",
        distributor:"DC Books",
        price:225,
        Description:"Novel"
    },
    {
        title:"Pathummayude Aadu",
        author:"Vaikom Muhammad Basheer",
        publisher:"DC Books",
        date_of_publication:"April 1959",
        distributor:"DC Books",
        price:225,
        Description:"Novel"

    },
    {
        title:"Oru Desathinte Katha",
        author:"S. K. Pottekkatt",
        publisher:"DC Books",
        date_of_publication:"1971",
        distributor:"DC Books",
        price:225,
        Description:"Novel"

    },
    {
        title:"Oru Sankeerthanam Pole",
        author:"Perumbadavam Sreedharan",
        publisher:"DC Books",
        date_of_publication:"September 1993",
        distributor:"DC Books",
        price:225,
        Description:"Novel"
    },
    {
        title:"Naalukettu",
        author:"M. T. Vasudevan Nair",
        publisher:"DC Books",
        date_of_publication:"1958",
        distributor:"DC Books",
        price:225,
        Description:"Novel"

    },
    {
        title:"Ente Katha",
        author:"Kamala Suraiyya",
        publisher:"DC Books",
        date_of_publication:"1 February 1973",
        distributor:"DC Books",
        price:225,
        Description:"Novel"

    },
    {
        title:"Balyakalasakhi",
        author:"Vaikom Muhammad Basheer",
        publisher:"DC Books",
        date_of_publication:"1944",
        distributor:"DC Books",
        price:225,
        Description:"Novel"
    },
    {
        title:"Ini Njan Urangatte",
        author:"P. K. Balakrishnan",
        publisher:"DC Books",
        date_of_publication:"1973",
        distributor:"DC Books",
        price:225,
        Description:"Novel"
    }];


app.get('/',(req,res)=>{
    res.render('index.ejs');
});
app.get('/index',(req,res)=>{
    res.render('index.ejs');
});
app.get('/viewbooks',(req,res)=>{
    res.render('viewbooks.ejs',books);
});
app.post('/read',(req,res)=>
{
    var lib=new LibraryModel(req.body);
    var result=lib.save((error)=>
{
    if(error)
    {
        throw error;
    }
    else{
        console.log("User created");
    }
});
res.send(result);
});

app.get('/getdataApi/:bname',(req,res)=>
{
    var name=req.params.bname;
    var result=LibraryModel.find({title:name},(error,data)=>
{
    if(error)
    {
        throw error;
    }
    else{
        res.send(data);
    }
});
});
const dataApi="http://localhost:3000/getdataApi";
app.get('/viewall',(req,res)=>
{
    request(dataApi,(error,response,body)=>
{
    if(error)
    {
        throw error;
    }
    else{
    var result=JSON.parse(body);
    res.render('viewall',{result}); 
    }

})

})


app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is running");
});