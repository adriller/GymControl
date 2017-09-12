function select(id, nameWk){
  $('#' + id).addClass("w3-black");

  var prevWork = localStorage.selectedWkID;

  if(prevWork != null && prevWork != id)
    $('#' + prevWork).removeClass("w3-black");

  $("#btnStart").removeClass("w3-disabled");
  $('#btnStart').removeAttr("disabled");

  localStorage.selectedWkID = id;
  localStorage.selectedWkName =  nameWk;
}

/*Controls quantity*/
function plusReps(){
  //alert($("#valueRep").val());
  $("#valueRep").val(parseInt($("#valueRep").val()) + 1);
}

function minusReps(){
  //alert($("#valueRep").val());
  $("#valueRep").val(parseInt($("#valueRep").val()) - 1);
}

function plusWeights(){
  //alert($("#valueRep").val());
  $("#valueWeight").val(parseFloat($("#valueWeight").val()) + 0.5);
}

function minusWeights(){
  //alert($("#valueRep").val());
  $("#valueWeight").val(parseFloat($("#valueWeight").val()) - 0.5);
}


/*Getters from DB*/
function getWorkouts( ){
  //get name and ID
  var wksObj = {
    "workouts" : [
      { "ID" : 1, "name" : "Chest" },
      { "ID" : 2, "name" : "Triceps" },
      { "ID" : 3, "name" : "Legs" },
      { "ID" : 4, "name" : "Calves" },
      { "ID" : 5, "name" : "Shoulders" },
      { "ID" : 6, "name" : "Back" },
      { "ID" : 7, "name" : "Biceps" },
      { "ID" : 8, "name" : "Abs" }
    ]
  }
  localStorage.wks = JSON.stringify(wksObj);
}

function getExercices(){
  var wkID = localStorage.selectedWkID;

  //request eercices of workout wkID
  var exObj = {
    "exercices" : [
      { "ID" : 1, "name" : "Bench Press", "weight" : "50", "reps" : 2, "rest" : 3},
      { "ID" : 2, "name" : "Bench Press Declined", "weight" : "45", "reps" : 3, "rest" : 3 },
      { "ID" : 3, "name" : "Contractor", "weight" : "27", "reps" : 2, "rest" : 5 },
      { "ID" : 4, "name" : "Converging Press", "weight" : "45", "reps" : 4, "rest" : 7 }
    ]
  }
  localStorage.exs = JSON.stringify(exObj);
}

/*Send to DB*/
function addNewWorkout(exJSON){
  alert(exJSON);
  //send to db
  location.href = 'workout.html';
}

function editEx(){
  var ex = {
    "IDWorkout" : localStorage.selectedWkID,
    "name": $("#iexName").val(),
    "weight" : $("#iexWeight").val(),
    "rest" : $("#iexRest").val(),
    "series" : $("#iexSeries").val(),
    "annotations" : $("#iexAnn").val()
  }


  //send request to remove exercice localStorage.editExID of localStorage.selectedWkID

  //send a request to add JSON.Stringfy(ex) in localStorage.selectedWkID

  //alert(JSON.stringify(ex));

  $("#iexName").val(" ");
  $("#iexAnn").val(" ");
  document.getElementById('modalEdit').style.display='none';

}

function addEx(){
  var ex = {
    "IDWorkout" : localStorage.selectedWkID,
    "name": $("#aexName").val(),
    "weight" : $("#aexWeight").val(),
    "rest" : $("#aexRest").val(),
    "series" : $("#aexSeries").val(),
    "annotations" : $("#aexAnn").val()
  }
  //send a request to add JSON.Stringfy(ex) in localStorage.selectedWkID

  //alert(JSON.stringify(ex));

  $("#aexName").val(" ");
  $("#aexAnn").val(" ");

  document.getElementById('modalAdd').style.display='none';
}

function deleteEx(){
  //send a request to remove exercice localStorage.editExID of localStorage.selectedWkID
  document.getElementById('modalEdit').style.display='none';
  location.href = 'edit.html';
}

function finishWorkout(){
  alert(localStorage.finalWkResults);
}
