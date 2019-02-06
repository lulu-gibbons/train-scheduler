

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
    console.log(firstTrain);
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
      var currentTime = moment().format();

      var firstTrainConverted = moment(firstTrain, "HH:mm"); //Converting the train time to hours and minutes
      var diffTime = moment().diff(moment(firstTrainConverted), "minutes"); //finding the difference in time between cureent time and the first train time..not changing with future time yet..
      var minutesAway = Math.abs(diffTime % frequency); //math.abs returns the absolute value of a number
      var nextArrival = moment(currentTime).add(minutesAway, "minutes").format("hh:mm A");//adding minutes the train is away to the next train time

      console.log("CURRENT TIME: " + currentTime);
      console.log("DIFFERENCE IN TIME: " + diffTime);
      console.log("FREQUENCY: " + frequency);
      console.log("FIRST TRAIN: " + firstTrain);
      console.log("MINUTES TILL TRAIN: " + minutesAway);
      console.log("NEXT ARRIVAL: " + nextArrival);

  		// Append train info to table on page
  		$("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>"+ frequency + " Minutes" + "</td><td>" + nextArrival + "</td><td>" + minutesAway + " Minutes" + "</td></tr>");

    	});
