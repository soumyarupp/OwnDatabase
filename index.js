import { info } from "console";
import express from "express";
import fs from "fs";

const app = express();

app.use(express.json());
const DB_file = "./database.txt";

// read data form database
function DB_read(){
    const data = fs.readFileSync(DB_file,"utf-8");
    return JSON.parse(data);
}
// write data in database
function DB_write(data){
    fs.writeFileSync(DB_file,JSON.stringify(data,null,2));
}

//homepage
app.get("/",(req,res)=>{
    res.send("Bank File Database is running");
});
// see all user data
app.get("/user",(req,res)=>{
    const userData = DB_read();
    res.json(userData);
});
// add user
app.post("/user",(req,res)=>{
    const newAccount = req.body;
    let useData = DB_read();
    useData.push(newAccount);
    DB_write(useData);
    res.json({
        message: "Account created successfully",
        account: newAccount
  });
});
//update 
app.patch("/user",(req,res)=>{
    const accountDe = req.body;
    const userData = DB_read();
    const useraccount = userData.findIndex((p)=>(p.accountNumber == accountDe.accountNumber))
    if(useraccount >= 0){
        userData[useraccount].balance = accountDe.balance;
        DB_write(userData);
        res.send("Account Deta update");
    }
    else{
        res.send("Account is Not found!");
        return;
    }
    console.log(useraccount);

    
})


app.listen(1000,()=>{
    console.log("Server Is running");
})