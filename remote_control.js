var admin = require("firebase-admin");
var serviceAccount = admin.credential.cert('./.credentials');

admin.initializeApp({ credential: serviceAccount, databaseURL: process.env.FIREBASE_DB_URL });


var db = admin.database();
var ref = db.ref();

ref.on("value", function(snapshot) {

    const exec = require('child_process').exec;

    if(/消し.*て/.test(snapshot.val().light)){
        exec('python ../I2C0x52-IR/IR-remocon02-commandline.py t `cat ../I2C0x52-IR/light_off.txt`', function(err, stdout, stderr){});
        console.log(snapshot.val().light);

    };
    if(/つけ.*て/.test(snapshot.val().light)){
        exec('python ../I2C0x52-IR/IR-remocon02-commandline.py t `cat ../I2C0x52-IR/light_on.txt`', function(err, stdout, stderr){});
        console.log(snapshot.val().light);

    };


    if(/消し.*て|つけ.*て/.test(snapshot.val().tv)){
        exec('python ../I2C0x52-IR/IR-remocon02-commandline.py t `cat ../I2C0x52-IR/tv_on_off.txt`', function(err, stdout, stderr){});
        console.log(snapshot.val().tv);

    };

    var updates = {light: '', tv: ''};
    ref.update(updates);

}, 
function(errorObject) {
    console.log("The read failed: " + errorObject.code);
} );
