var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");
const { click } = require("@testing-library/user-event/dist/click");
 
var app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

var ConString = "mongodb://127.0.0.1:27017";

app.get("/users", (request, response)=>{
    mongoClient.connect(ConString)
    .then(clientObject=>{
        var database = clientObject.db("react-todo")
        database.collection("users").find({}).toArray()
        .then(documents=>{
            response.send(documents);
            response.end();
        });
    });
});

app.post("/register-user", (request, response)=>{
    var user = {
        UserId: request.body.UserId,
        UserName: request.body.UserName,
        Password: request.body.Password,
        Email: request.body.Email,
        Mobile: request.body.Mobile
    }
    mongoClient.connect(ConString)
    .then(clientObject=>{
        var database = clientObject.db("react-todo");
        database.collection("users").insertOne(user)
        .then(()=>{
            console.log("User Added..");
            response.end();
        });
    });
});

app.get("/appointments/:userid", (request, response)=>{
    mongoClient.connect(ConString)
    .then(clientObject=>{
        var database = clientObject.db("react-todo");
        database.collection("appointments").find({UserId:request.params.userid}).toArray()
        .then(documents=>{
            response.send(documents);
            response.end();
        });
    });
});

app.get("/get-task/:id", (request, response)=>{
    mongoClient.connect(ConString)
    .then(clientObject=>{
        var database = clientObject.db("react-todo");
        database.collection("appointments").find({Appointment_Id: parseInt(request.params.id)}).toArray()
        .then(documents=>{
            response.send(documents);
            response.end();
        });
    });
});

app.post("/add-task",(request, response)=>{
    var task = {
        Appointment_Id:parseInt(request.body.Appointment_Id),
        Title:request.body.Title,
        Description:request.body.Description,
        Date: new Date(request.body.Date).toLocaleDateString(),
        UserId: request.body.UserId
    }
    mongoClient.connect(ConString)
    .then(clientObject=>{
        var database = clientObject.db("react-todo");
        database.collection("appointments").insertOne(task)
        .then(()=>{
            console.log("Task Added");
            response.end();
        });
    });
});

app.put("/edit-task/:id", (request, response)=>{
    var id = parseInt(request.params.id);

    mongoClient.connect(ConString)
    .then(clientObject=>{
        var database = clientObject.db("react-todo");
        database.collection("appointments").updateOne({Appointment_Id:id},
            {$set: {Appointment_Id:id,
                 Title:request.body.Title,
                  Description:request.body.Description,
                   Date: new Date(request.body.Date).toLocaleDateString(),
                   UserId:request.body.UserId}})
        .then(()=>{
            console.log("Task Updated..");
            response.end();
        });
    });
});

app.delete("/delete-task/:id", (request, response)=>{
    
    var id = parseInt(request.params.id);

    mongoClient.connect(ConString)
    .then(clientObject=>{
        var database = clientObject.db("react-todo");
        database.collection("appointments").deleteOne({Appointment_Id:id})
        .then(()=>{
            console.log("Task Deleted");
            response.end();
        });
    });
});

app.listen(7000);
console.log("Server Started : http://127.0.0.1:7000");

