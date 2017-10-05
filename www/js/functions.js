//online host

var loginPage = "http://gymcontrol.co.nf/login.php";
var registerPage = "http://gymcontrol.co.nf/register.php";
var workoutsPage = "http://gymcontrol.co.nf/workouts.php";
var exercisesPage = "http://gymcontrol.co.nf/exercises.php";
var addExPage = "http://gymcontrol.co.nf/addexercise.php";
var addWkPage = "http://gymcontrol.co.nf/addWorkout.php";
var deleteWkPage = "http://gymcontrol.co.nf/deleteWorkout.php";
var saveResultsPage = "http://gymcontrol.co.nf/saveResults.php";
var resultsPage = "http://gymcontrol.co.nf/getLastResult.php";


//localhost
/*
var loginPage = "http://localhost/servGymControl/login.php";
var registerPage = "http://localhost/servGymControl/register.php";
var workoutsPage = "http://localhost/servGymControl/workouts.php";
var exercisesPage = "http://localhost/servGymControl/exercises.php";
var addExPage = "http://localhost/servGymControl/addexercise.php";
var addWkPage = "http://localhost/servGymControl/addWorkout.php";
var deleteWkPage = "http://localhost/servGymControl/deleteWorkout.php";
var saveResultsPage = "http://localhost/servGymControl/saveResults.php";
var resultsPage = "http://localhost/servGymControl/getLastResult.php";
*/

//select workout
function select(id, nameWk){
  $('#wk' + id).removeClass("w3-theme-l4");
  $('#wk' + id).addClass("w3-black");

  var prevWork = localStorage.selectedWkID;

  if(prevWork != null && prevWork != id){
    $('#wk' + prevWork).removeClass("w3-black");
    $('#wk' + prevWork).addClass("w3-theme-l4");
  }

  $("#btnStart").addClass("littleBoxShadow");
  $("#btnStart").removeClass("w3-disabled");
  $('#btnStart').removeAttr("disabled");

  localStorage.selectedWkID = id;
  localStorage.selectedWkName = nameWk;
}

//select exercise
function selectEx(id, nameEx){
  //alert(id);
  $('#ex' + id).removeClass("w3-theme-l4");
  $('#ex' + id).addClass("w3-black");

  var prevEx = localStorage.selectedExID;
  //alert(prevEx);
  if(prevEx != undefined && prevEx != id){
    $('#ex' + prevEx).removeClass("w3-black");
    $('#ex' + prevEx).addClass("w3-theme-l4");
  }

  $("#btnStart").removeClass("w3-disabled");
  $("#btnStart").addClass("littleBoxShadow");
  $('#btnStart').removeAttr("disabled");

  localStorage.selectedExID = id;
  localStorage.selectedExName =  nameEx;
  setCompleteds();
}

function setCompleteds(){
  //alert(localStorage.completedEx);
  if(localStorage.completedEx == undefined)
    return;

  var completeds = JSON.parse(localStorage.completedEx);

  if(completeds == undefined)
    return;
  for(var i = 0 ; i < completeds.length ; i++){
    $("#ex" + completeds[i]).removeClass("w3-theme-l4");
    $("#ex" + completeds[i]).addClass("w3-green");
  }
  var exercises = JSON.parse(localStorage.exs);
  //alert("complets= " + completeds.length + " total= " + exercises.exercises.length)
  if(completeds.length == exercises.exercises.length){
    localStorage.completedWorkout = "true";
  }
  else{
    localStorage.completedWorkout = "false";
  }
  if(completeds.length > 0){
    localStorage.wkInProgress = localStorage.selectedWkName;
  }
}

function changeButtonName(id, namebefore, nameafter){
  //alert(namebefore);
  $("#" + id).html(namebefore);
  var count = 0;

  var interval = setInterval(frame, 15);
  function frame() {
    if (count >= 100) {
      clearInterval(interval);
      changeName(id, nameafter, namebefore);
    } else {
      count++;
    }
  }
}

function changeName(id, namebefore, nameafter){
  $("#" + id).html(namebefore);
}

//logout
function logOut(){
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userSenha");
  location.href = 'index.html';
  resetVariables();
}


/*Functions to control quantity*/
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

function resetVariables(){
  localStorage.removeItem("selectedExID");
  localStorage.removeItem("finalWkResults");
  localStorage.removeItem("completedEx");
  localStorage.removeItem("lastResults");
  localStorage.removeItem("completedWorkout");
  localStorage.removeItem("wkInProgress");
}
/*Getters from DB*/

//check valid user
function checkLogin(){
  var sendData = $("#formLogin").serialize();
  $.get( loginPage, sendData )
    .done(function(data){
    //alert(data);
    localStorage.userEmail = $("#emailLogin").val();
    localStorage.userSenha = $("#senhaLogin").val();
    location.href = 'main.html';
  })
    .fail(function(jqXHR, textStatus, errorThrown) {
    if(jqXHR.status == 404){
      $("#msgErroLogin").text("Password Incorrect");
    }
    else if(jqXHR.status == 500){
      $("#msgErroLogin").text("Server Error. Try later");
    }
    $("#msgErroLogin").removeClass("w3-hide");
    setTimeout(function(){ $("#msgErroLogin").addClass("w3-hide"); }, 2000);
  });
}

//get all workouts from user
function getWorkouts( ){
  //get name and ID
  //alert("a");
  $.ajaxSetup({async: false});
  var sendData = "email=" + localStorage.userEmail;
  //alert(sendData);
  $.get(workoutsPage,sendData)
    .done(function(data){
    //alert(data);
    localStorage.wks = data;
  })
    .fail(function(jqXHR, textStatus, errorThrown){
    //alert("fail " + JSON.stringify(jqXHR));));
    localStorage.removeItem("wks");
  });
  //alert("b");
  /*
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
  }*/
  //alert(localStorage.wks);
}

//get all exercises from workout
function getexercises(){
  var wkID = localStorage.selectedWkID;

  $.ajaxSetup({async: false});
  $.get(exercisesPage, "wkID=" + wkID)
    .done(function(data){
    //alert(data);
    localStorage.exs = data;
  })
    .fail(function(jqXHR, textStatus, errorThrown){
    //alert("fail " + JSON.stringify(jqXHR));
    localStorage.removeItem("exs");
    //localStorage.exs = JSON.stringify({"workouts" : []});
  });

  /*
  var exObj = {
    "exercises" : [
      { "ID" : 1, "name" : "Bench Press", "weight" : "50", "reps" : 2, "rest" : 3},
      { "ID" : 2, "name" : "Bench Press Declined", "weight" : "45", "reps" : 3, "rest" : 3 },
      { "ID" : 3, "name" : "Contractor", "weight" : "27", "reps" : 2, "rest" : 5 },
      { "ID" : 4, "name" : "Converging Press", "weight" : "45", "reps" : 4, "rest" : 7 }
    ]
  }
  localStorage.exs = JSON.stringify(exObj);*/
}

//get last scores in some workout
function getLastResults(){
  localStorage.removeItem("lastResults");
  var JSONexs = JSON.parse(localStorage.exs);
  var exercs = JSONexs.exercises;
  var len = 0;
  //alert(localStorage.exs);
  for(var i = 0 ; i < exercs.length ; i++){
    len = len + parseInt(exercs[i].reps);
    //alert(exercs.reps);
  }
  var sendData = "wkID=" + localStorage.selectedWkID + "&len=" + len;
  //alert(sendData);

  $.ajaxSetup({async: false});
  $.get(resultsPage, sendData)
    .done(function(data){
    //alert(data);
    localStorage.lastResults = data;
  })
    .fail(function(jqXHR, textStatus, errorThrown){
    //alert("fail " + JSON.stringify(jqXHR));
    localStorage.removeItem("lastResults");
    //localStorage.exs = JSON.stringify({"workouts" : []});
  });
  //alert("results= " + localStorage.lastResults);
}

/*Send to DB*/
//add new workout
function addNewWorkout(wkJSON){
  var sendData = wkJSON;
  //alert(sendData);
  $.post( addWkPage, "q=" + sendData  + "&userEmail=" + localStorage.userEmail )
    .done(function(data){
  })
    .always(function() {
    location.href = 'main.html';
  })
    .fail(function(jqXHR, textStatus, errorThrown){
    //alert("fail " + JSON.stringify(jqXHR));
  });

}

//register new user
function registerUser(){
  if($("#pswReg").val() != $("#pswRegRep").val()){
    $("#msgErroReg").text("Passowrds don't match");
    $("#msgErroReg").removeClass("w3-hide");
    setTimeout(function(){ $("#msgErroReg").addClass("w3-hide"); }, 2000);
  }
  else{
    var sendData = $("#formRegister").serialize();
    //alert(sendData);
    $.post( registerPage, sendData )
      .done(function(data){
      localStorage.userEmail = $("#emaiRegister").val();
      localStorage.userSenha = $("#senhaRegister").val();
      //alert("success " + data);
      location.href = 'main.html';
    })
      .fail(function(jqXHR, textStatus, errorThrown) {
      if(jqXHR.status == 404){
        $("#msgErroReg").text("Error. Try again later");
        //alert(JSON.stringify(jqXHR));
      }
      else if(jqXHR.status == 500){
        $("#msgErroReg").text("Server Error. Try later");
        //alert(JSON.stringify(jqXHR));
      }
      else{
        $("#msgErroReg").text("Unknown error. Try later");
        //alert(JSON.stringify(jqXHR));
      }
      $("#msgErroReg").removeClass("w3-hide");
      setTimeout(function(){ $("#msgErroReg").addClass("w3-hide"); }, 2000);
    });
  }
}

//edit workout -- coming soon
function editEx(){
  var ex = {
    "IDWorkout" : localStorage.selectedWkID,
    "name": $("#iexName").val(),
    "weight" : $("#iexWeight").val(),
    "rest" : $("#iexRest").val(),
    "series" : $("#iexSeries").val(),
    "annotations" : $("#iexAnn").val()
  };

  //send request to remove exercise localStorage.editExID of localStorage.selectedWkID

  //send a request to add JSON.Stringfy(ex) in localStorage.selectedWkID

  //alert(JSON.stringify(ex));

  $("#iexName").val(" ");
  $("#iexAnn").val(" ");
  document.getElementById('modalEdit').style.display='none';

}

//add exercise to workout
function addEx(){
  //alert("oi");
  //alert( $("#aexWeight").val());
  var ex = {
    "IDWorkout" : localStorage.selectedWkID,
    "name": $("#aexName").val(),
    "weight" : $("#aexWeight").val(),
    "rest" : $("#aexRest").val(),
    "series" : $("#aexSeries").val(),
    "annotations" : $("#aexAnn").val()
  };

  var sendData = JSON.stringify(ex);

  $.post( addExPage, "q=" + sendData )
    .done(function(data){
    location.href = 'main.html';
  })
    .fail(function(jqXHR, textStatus, errorThrown){
    //alert("fail " + JSON.stringify(jqXHR));
  });

  $("#aexName").val(" ");
  $("#aexAnn").val(" ");

  document.getElementById('modalAdd').style.display='none';
}

//delete workout
function deleteWk(){
  $.post( deleteWkPage, "wkID=" + localStorage.selectedWkID )
    .done(function(data){
    //alert(data);
    location.href = 'main.html';
  })
    .fail(function(jqXHR, textStatus, errorThrown){
    //alert("fail " + JSON.stringify(jqXHR));
  });
}

//delete exercise -- coming soon
function deleteEx(){
  //send a request to remove exercise localStorage.editExID of localStorage.selectedWkID
  document.getElementById('modalEdit').style.display='none';
  location.href = 'edit.html';
}

//save workout finished
function finishWorkout(){
  var sendData = localStorage.finalWkResults;
  //alert(sendData);
  $.post( saveResultsPage, "q=" + sendData )
    .done(function(data){
    //alert(data);
    location.href = 'main.html';
  })
    .fail(function(jqXHR, textStatus, errorThrown){
    //alert("fail " + JSON.stringify(jqXHR));
  });
  resetVariables();
}
