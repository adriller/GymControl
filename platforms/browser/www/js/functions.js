
var selected;

function select(id){
  $(id).addClass("w3-black");
  $(selected).removeClass("w3-black");
  $("#btnStart").removeClass("w3-disabled");
  selected = id;
}

function editEx(id){
  document.getElementById('modalEdit').style.display='block';
}

function addEx(){
  document.getElementById('modalEdit').style.display='block';
}

function doneEx(){
  document.getElementById('modalDone').style.display='block';
}

function plusReps(){
  //alert($("#valueRep").val());
  $("#valueRep").val(parseInt($("#valueRep").val()) + 1);
}

function minusReps(){
  //alert($("#valueRep").val());
  $("#valueRep").val(parseInt($("#valueRep").val()) - 1);
}
