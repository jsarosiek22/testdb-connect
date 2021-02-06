var MongoClient = require("mongodb").MongoClient;
let express = require("express");
let ourApp = express();
let http = require("http");
var path = require("path");
var formidable = require("formidable");
var fs = require("fs");

ourApp.set("views", path.join(__dirname, "views"));
ourApp.set("view engine", "pug");
console.log(__dirname);
ourApp.use("/", express.static(path.join(__dirname, "")));

ourApp.use(express.urlencoded({ extended: false }));



ourApp.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

ourApp.get("/play", (req, res) => {
  res.render("play", { title: "Play" });
});

ourApp.get("/howto", (req, res) => {
  res.render("howto", { title: "How To" });
});

ourApp.get("/teamview", (req, res) => {
  fs.readFile(__dirname + "/db/baseTeam.json", (err, data) => {
    let baseTeam = JSON.parse(data);
    res.render("teamview", {
      title: "Team View",
      // Quarterback
      qbtraits: baseTeam.baseTeam[0].quarterback.traits,
      qbname: baseTeam.baseTeam[0].quarterback.name,
      qbthrpow: baseTeam.baseTeam[0].quarterback.skills.throwpower,
      qbthracs: baseTeam.baseTeam[0].quarterback.skills.throwaccuracyshort,
      qbthracm: baseTeam.baseTeam[0].quarterback.skills.throwaccuracymedium,
      qbthracl: baseTeam.baseTeam[0].quarterback.skills.throwaccuracylong,
      qbstr: baseTeam.baseTeam[0].quarterback.skills.strength,
      qbspeed: baseTeam.baseTeam[0].quarterback.skills.speed,
      // Wide Receiver 1
      wr1name: baseTeam.baseTeam[4].widereciever.name,
      wr1traits: baseTeam.baseTeam[4].widereciever.traits,
      wr1speed: baseTeam.baseTeam[4].widereciever.skills.speed,
      wr1str: baseTeam.baseTeam[4].widereciever.skills.strength,
      wr1catch: baseTeam.baseTeam[4].widereciever.skills.catch,
      // Wide Reciever 2
      wr2name: baseTeam.baseTeam[5].widereciever.name,
      wr2traits: baseTeam.baseTeam[5].widereciever.traits,
      wr2speed: baseTeam.baseTeam[5].widereciever.skills.speed,
      wr2str: baseTeam.baseTeam[5].widereciever.skills.strength,
      wr2catch: baseTeam.baseTeam[5].widereciever.skills.catch,
      // Tight End
      tename: baseTeam.baseTeam[3].tightend.name,
      tetraits: baseTeam.baseTeam[3].tightend.traits,
      tespeed: baseTeam.baseTeam[3].tightend.skills.speed,
      testr: baseTeam.baseTeam[3].tightend.skills.strength,
      terb: baseTeam.baseTeam[3].tightend.skills.runblock,
      tepb: baseTeam.baseTeam[3].tightend.skills.passblock,
      tecatch: baseTeam.baseTeam[3].tightend.skills.catch,
      // Offensive Left Tackle
      oft1name: baseTeam.baseTeam[6].offensivetackle.name,
      oft1traits: baseTeam.baseTeam[6].offensivetackle.traits,
      oft1speed: baseTeam.baseTeam[6].offensivetackle.skills.speed,
      oft1str: baseTeam.baseTeam[6].offensivetackle.skills.strength,
      oft1pb: baseTeam.baseTeam[6].offensivetackle.skills.passblock,
      oft1rb: baseTeam.baseTeam[7].offensivetackle.skills.runblock,
      // Offensive Right Tackle
      oft2name: baseTeam.baseTeam[7].offensivetackle.name,
      oft2traits: baseTeam.baseTeam[7].offensivetackle.traits,
      oft2speed: baseTeam.baseTeam[7].offensivetackle.skills.speed,
      oft2str: baseTeam.baseTeam[7].offensivetackle.skills.strength,
      oft2pb: baseTeam.baseTeam[7].offensivetackle.skills.passblock,
      oft2rb: baseTeam.baseTeam[7].offensivetackle.skills.runblock,
      // Offensive Left Guard
      ofg1name: baseTeam.baseTeam[8].offensiveguard.name,
      ofg1traits: baseTeam.baseTeam[8].offensiveguard.traits,
      ofg1speed: baseTeam.baseTeam[8].offensiveguard.skills.speed,
      ofg1str: baseTeam.baseTeam[8].offensiveguard.skills.strength,
      ofg1pb: baseTeam.baseTeam[8].offensiveguard.skills.passblock,
      ofg1rb: baseTeam.baseTeam[8].offensiveguard.skills.runblock,
      // Offensive Right Guard
      ofg2name: baseTeam.baseTeam[9].offensiveguard.name,
      ofg2traits: baseTeam.baseTeam[9].offensiveguard.traits,
      ofg2speed: baseTeam.baseTeam[9].offensiveguard.skills.speed,
      ofg2str: baseTeam.baseTeam[9].offensiveguard.skills.strength,
      ofg2pb: baseTeam.baseTeam[9].offensiveguard.skills.passblock,
      ofg2rb: baseTeam.baseTeam[9].offensiveguard.skills.runblock,
      // Offensive Center
      ofcname: baseTeam.baseTeam[10].center.name,
      ofctraits: baseTeam.baseTeam[10].center.traits,
      ofcspeed: baseTeam.baseTeam[10].center.skills.speed,
      ofcstr: baseTeam.baseTeam[10].center.skills.strength,
      ofcpb: baseTeam.baseTeam[10].center.skills.passblock,
      ofcrb: baseTeam.baseTeam[10].center.skills.runblock
      
    });
  });
});

ourApp.get("/coachselect", (req, res) => {
  var optOneId,
    optOneName,
    optOneSpec,
    optOnePos,
    optOneDesc,
    optTwoId,
    optTwoName,
    optTwoSpec,
    optTwoPos,
    optTwoDesc;
  fs.readFile(__dirname + "/db/coach.json", (err, data) => {
    if (err) throw err;

    let coach = JSON.parse(data);
    optOneId = getRandomWithOneExclusion(4, -1);
    optTwoId = getRandomWithOneExclusion(4, optOneId);
    optOneName = coach.coach[optOneId].name;
    optOneSpec = coach.coach[optOneId].specialty;
    optOnePos = coach.coach[optOneId].positions;
    optOneDesc = coach.coach[optOneId].description;
    optTwoName = coach.coach[optTwoId].name;
    optTwoSpec = coach.coach[optTwoId].specialty;
    optTwoPos = coach.coach[optTwoId].positions;
    optTwoDesc = coach.coach[optTwoId].description;

    res.render("coachselect", {
      title: "Coach Select",
      optOneId: optOneId,
      optOneName: optOneName,
      optOneSpec: optOneSpec,
      optOnePos: optOnePos,
      optOneDesc: optOneDesc,
      optTwoId: optTwoId,
      optTwoName: optTwoName,
      optTwoSpec: optTwoSpec,
      optTwoPos: optTwoPos,
      optTwoDesc: optTwoDesc,
    });
  });
});

// ourApp.get("/", function(req, res) {
//   res.send(`
//             <h1>Hello, welcome to our home page</h1>
//             <a href="/signup">Sign Up</button>
//         `);
// });
ourApp.get("/signup", function (req, res) {
  console.log(__dirname);
  res.sendFile(path.join(__dirname + "/signupform.html"));
});
ourApp.get("/uploadfileform", function (req, res) {
  res.sendFile(path.join(__dirname + "/uploadfileform.html"));
});
ourApp.post("/uploadfile", function (req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var oldpath = files.filetoupload.path;
    var newpath = path.join(__dirname + "/uploads/" + files.filetoupload.name);
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      res.write("File uploaded and moved!");
      res.end();
    });
  });
});
ourApp.post("/submitsignup", function (req, res) {
  if (req.body.firstName == "") {
    res.end(`
              Bad Request!
              <a href="/">Return Home</a>
          `);
  } else {
    var person = {};
    var fname, lname, userid, pwd;
    fname = req.body.firstName;
    lname = req.body.lastName;
    userid = req.body.userID;
    pwd = req.body.password;

    person = {
      FirstName: fname,
      LastName: lname,
      UserID: userid,
      Pwd: pwd,
    };

    insertUsers(person);

    res.send(`
              <h2>Successfully added user!</h2> 
              <div>
                  <a href="/">Return Home</a>
              </div>
              `);
  }
});
ourApp.get("/submitsignup", function (req, res) {
  res.send(`
        <h2>Must submit a user form</h2>
        <a href="/">Return Home</a>
    `);
});

ourApp.listen(3030);

async function insertUsers(ins) {
  // connect to your cluster
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // specify the DB's name
  const db = client.db("users");

  await db.collection("users").insertOne(ins);

  // execute find query
  const items = await db.collection("users").find({}).toArray();

  console.log(items);
  // close connection
  client.close();
}

function generateRandom(min, max, exclude) {
  if (exclude == -1) {
    exclude == 1000;
  }
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num === exclude ? generateRandom(min, max) : num;
}

function getRandomWithOneExclusion(lengthOfArray, indexToExclude) {
  var rand = null; //an integer

  while (rand === null || rand === indexToExclude) {
    rand = Math.round(Math.random() * (lengthOfArray - 1));
  }

  return rand;
}
