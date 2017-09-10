function select(id, nameWk){
  $('#' + id).addClass("w3-black");

  var prevWork = localStorage.selectedWorkout;

  if(prevWork != null && prevWork != id)
    $('#' + prevWork).removeClass("w3-black");

  $("#btnStart").removeClass("w3-disabled");
  $('#btnStart').removeAttr("disabled")

  localStorage.selectedWorkout = id;
  localStorage.selectedWkName =  nameWk;
}

function editEx(id){
  document.getElementById('modalEdit').style.display='block'
  //put in fields the data
  //send changes to db
}

function addEx(){
  document.getElementById('modalEdit').style.display='block';
  //send to db
}

function doneEx(){
  //next ex
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
  //get name and ID
  var exObj = {
    "exercices" : [
      { "ID" : 1, "name" : "Bench Press", "weight" : "50", "reps" : 4, "rest" : 90},
      { "ID" : 2, "name" : "Bench Press Declined", "weight" : "45", "reps" : 4, "rest" : 90 },
      { "ID" : 3, "name" : "Contractor", "weight" : "27", "reps" : 3, "rest" : 90 },
      { "ID" : 4, "name" : "Converging", "weight" : "45", "reps" : 4, "rest" : 90 }
    ]
  }
  localStorage.exs = JSON.stringify(exObj);
}

/*Send to DB*/
function addNewWorkout(exJSON){

}

function addNewExercice(wkID){

}
