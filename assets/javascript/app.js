

//Firebase Database
var config = {
    apiKey: "AIzaSyDgNhJPexArcKIpMkPwNOv5dCC6J4h4qGY",
    authDomain: "train-scheduler-f4cfb.firebaseapp.com",
    databaseURL: "https://train-scheduler-f4cfb.firebaseio.com",
    projectId: "train-scheduler-f4cfb",
    storageBucket: "train-scheduler-f4cfb.appspot.com",
    messagingSenderId: "783850546097"
  };
  firebase.initializeApp(config);

  var trainData = firebase.database();

  $("#submit").on("click", function() { //grabbing user input from the form for each variable to add a train
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = moment($("#first-train").val().trim(), "HH:mm").subtract(1, "years").format("X");
    var frequency = $("#frequency").val().trim();

    // console.log(trainName);
    // console.log(destination);
    // console.log(firstTrain);
    // console.log(frequency);


    var newTrain = {
      name: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    }

    trainData.ref().push(newTrain);

    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");

    return false;
  })

  //collecting data and storing from firebase
  trainData.ref().on("child_added", function(childSnapshot, prevChildKey) {

  		//assign firebase variables to snapshots.
  		var name = childSnapshot.val().name.toUpperCase();
  		var destination = childSnapshot.val().destination.toUpperCase();
  		var firstTrain = childSnapshot.val().firstTrain;
  		var frequency = childSnapshot.val().frequency;

      //Current Time
      var currentTime = moment(currentTime).format("hh:mm");

      //console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

      var diffTime = moment().diff(moment((firstTrain), "minutes"))%frequency;
      var minutes = frequency - diffTime;
      var arrival = moment().add(minutes, "m").format("hh:mm a");


        console.log(moment().diff(moment((firstTrain), "minutes")));
        console.log(currentTime);


      //console.log("DIFFERENCE IN TIME: " + diffTime);
      // console.log("FREQUENCY: " + frequency);
      // console.log("FIRST TRAIN: " + firstTrain);
      // console.log("MINUTES TILL TRAIN: " + minutes);
      // console.log("NEXT ARRIVAL: " + arrival);



  		// Append train info to table on page
  		$("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>"+ frequency + " Minutes" + "</td><td>" + arrival + "</td><td>" + minutes + " Minutes" + "</td></tr>");


    	});
