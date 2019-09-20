var firebaseConfig = {
    apiKey: "AIzaSyBNeXA-cyP4HI5-AVt2DYtN9dvfw6ExM90",
    authDomain: "train-tracker-ec583.firebaseapp.com",
    databaseURL: "https://train-tracker-ec583.firebaseio.com",
    projectId: "train-tracker-ec583",
    storageBucket: "",
    messagingSenderId: "905888519496",
    appId: "1:905888519496:web:4b9ca19f06d080250ecf7d"
  };

  firebase.initializeApp(firebaseConfig);

//   create database
var database = firebase.database();

// button for adding trains and grabbing input
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    // var name = $("#train-name-input").val().trim();
    // var destination = $("#destination-input").val().trim();
    // var time = $("#time-input").val().trim();
    // var freq = $("#freq-input").val().trim();

    var newTrain = {
         name: $("#train-name-input").val().trim(),
         destination: $("#destination-input").val().trim(),
         time: moment($("#time-input").val().trim(), "hh:mm").format("hh:mm"),
         freq: $("#freq-input").val().trim(),

         
}
console.log(newTrain)

    database.ref("/trains").push(newTrain);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#freq-input").val("");
    });


    database.ref("/trains").on("child_added", function(snapshot) {
        console.log(snapshot.val());
        var name = snapshot.val().name;
        var destination = snapshot.val().destination;
        var time = snapshot.val().time;
        var freq = snapshot.val().freq;
        // console.log (name)
        // console.log (destination)
        // console.log (time)
        // console.log (freq)

// variable for next
// variable for distance (in time)

var timeConverted = moment(time, "HH:mm").subtract(1, "years");
// console.log("converted time is " + timeConverted);

var currentTime = moment();
// console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

var diffTime = moment().diff(moment(timeConverted), "minutes");
// console.log("Difference: " + diffTime);

var timeRemaining = diffTime % freq;
// console.log("time remaining: " + timeRemaining);

var arrivalIn = freq - timeRemaining;
// console.log("Arriving in: " + arrivalIn + " minutes");

var etaTime = moment().add(arrivalIn, "minutes");
// console.log("ETA: " + moment(etaTime).format("hh:mm"));

        var newRow = $("<tr>").append(
            $("<td>").text(name),
            $("<td>").text(destination),
            $("<td>").text(freq),
            $("<td>").text(arrivalIn),
            $("<td>").text(moment(etaTime).format("hh:mm")),
          );
          $("#train-table > tbody").append(newRow);

    });
