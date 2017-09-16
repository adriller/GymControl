//var loginPage = "http://localhost/servGymControl/login.php";
var loginPage = "http://gymcontrol.co.nf/login.php";
var registerPage = "http://gymcontrol.co.nf/register.php";
var workoutsPage = "http://gymcontrol.co.nf/workouts.php";
var exercisesPage = "http://gymcontrol.co.nf/exercises.php";
var addExPage = "http://gymcontrol.co.nf/addexercise.php";
var addWkPage = "http://gymcontrol.co.nf/addWorkout.php";
var deleteWkPage = "http://gymcontrol.co.nf/deleteWorkout.php";
var saveResultsPage = "http://gymcontrol.co.nf/saveResults.php";
var resultsPage = "http://gymcontrol.co.nf/getLastResult.php";


function select(id, nameWk){
  $('#wk' + id).addClass("w3-black");

  var prevWork = localStorage.selectedWkID;

  if(prevWork != null && prevWork != id)
    $('#wk' + prevWork).removeClass("w3-black");

  $("#btnStart").removeClass("w3-disabled");
  $('#btnStart').removeAttr("disabled");

  localStorage.selectedWkID = id;
  localStorage.selectedWkName =  nameWk;
}

function logOut(){
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userSenha");
  location.href = 'index.html';
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

function getWorkouts( ){
  //get name and ID
  //alert("a");
  $.ajaxSetup({async: false});
  $.get(workoutsPage)
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

function getexercises(){
  var wkID = localStorage.selectedWkID;

  $.ajaxSetup({async: false});
  $.get(exercisesPage, "wkID=" + wkID+ "&SSemail=" + localStorage.userEmail)
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
function addNewWorkout(wkJSON){

  //alert("b");
  var sendData = wkJSON;
 //alert(sendData);

  $.post( addWkPage, "q=" + sendData )
    .done(function(data){
  })
    .always(function() {
    location.href = 'main.html';
  })
    .fail(function(jqXHR, textStatus, errorThrown){
   //alert("fail " + JSON.stringify(jqXHR));
  });

}

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

  //alert("b");
  var sendData = JSON.stringify(ex);
  //alert(sendData);

  $.post( addExPage, "q=" + sendData )
    .done(function(data){
    location.href = 'main.html';
  })
    .fail(function(jqXHR, textStatus, errorThrown){
   //alert("fail " + JSON.stringify(jqXHR));
  });

  //alert(JSON.stringify(ex));

  $("#aexName").val(" ");
  $("#aexAnn").val(" ");

  document.getElementById('modalAdd').style.display='none';
}

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

function deleteEx(){
  //send a request to remove exercise localStorage.editExID of localStorage.selectedWkID
  document.getElementById('modalEdit').style.display='none';
  location.href = 'edit.html';
}

function finishWorkout(){
  var sendData = localStorage.finalWkResults;
  $.post( saveResultsPage, "q=" + sendData )
    .done(function(data){
   //alert(data);
    location.href = 'main.html';
  })
    .fail(function(jqXHR, textStatus, errorThrown){
   //alert("fail " + JSON.stringify(jqXHR));
  });
}
