const express=require('express');
const mysql=require('mysql');
const cors =require('cors');
const path=require("path");
const app = express();
const PORT=8080;

app.use(cors());
app.use(express.json());

const _dirname=path.dirname("");
const buildpath = path.join(_dirname,"../parking_system/build");
app.use(express.static(buildpath));


// let PORT=process.env.PORT || 8081;
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Darshan@29',
    database: 'ParkingSystem',
})
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to MySQL database!');
  }
});

app.post('/signup',(req,res)=>{
    const sql ='INSERT INTO USER(`Fname`,`Email`,`Upassword`) VALUES (?)';
    const values = [
        req.body.username,
        req.body.email,
        req.body.password
    ]
    db.query(sql,[values],(err,data)=>{
        if(err){
            return res.json('Error');
        }
        return res.json(data);
    })
})

app.post('/login',(req,res)=>{
    const sql ='SELECT * FROM USER WHERE `Email`=? AND `Upassword`=?';
    db.query(sql,[req.body.email,req.body.password],(err,data)=>{
        if(err){
            return res.json('Error');
        }
        else if(req.body.email=='darshan.mahajan@gmail.com' && req.body.password=='Darshan@29')
        {
            return res.json('Admin');
        }
        if(data.length>0){
            return res.json("Success");
        }else{
            return res.json('Failed');
        }
    })
})


app.post("/Home", (req, res) => {
    const sql =
      "INSERT INTO parking(date1, park, Vechileno, model, TimeA, TimeB) VALUES (?, ?, ?, ?, ?, ?)";
    
    
    const values = [
      req.body.Date, 
      req.body.Park,
      req.body.Vechile_no,  
      req.body.Model, 
      req.body.aTime, 
      req.body.dTime, 
    ];
  
    db.query(sql, values, (err, data) => {
      if (err) {
        console.error("Error inserting data into the database: " + err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.log("Data inserted successfully");
        res.json(data);
      }
    });
  });

  app.get('/Home/Slots', (req, res) => {
    db.query('SELECT * FROM parkstatus', (err, results) => {
      if (err) {
        console.error('Error fetching seat data:', err);
        res.status(500).json({ error: 'Failed to fetch seat data' });
      } else {
        res.json(results);
      }
    });
  });

  app.post("/Home/Slots", (req, res) => {
    const sql =
      "INSERT INTO parkstatus(slot,Vechileno,startTime,endTime) VALUES (?, ?, ?, ?)";
    
    
    const values = [
      req.body.selectedSlot, 
      req.body.Vechile_no,
      req.body.arr,  
      req.body.dep,  
    ];
    
  
    db.query(sql, values, (err, data) => {
      if (err) {
        console.error("Error inserting data into the database: " + err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.log("Data inserted successfully");
        res.json(data);
      }
    });
  });
  

app.listen(PORT,()=>{
    console.log('listening ',PORT);
})