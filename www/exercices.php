<?php
header('Access-Control-Allow-Origin: *');
session_start();

require_once('exercice.php');
require_once('workout.php');

$wkID = $_POST["wkID"];
$email = $_SESSION["userEmail"];

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

$servername = "localhost";
$username = "root";
$password = "Adriller123@";
$dbname = "GymControlDB";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  http_response_code(500);
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM workouts WHERE emailUser = '" .$email. "'";
$result = $conn->query($sql);


$workouts = array();

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()){
    $w = new Workout($row["name"], $row["ID"]);
    array_push($workouts, $w);
  }
  $response = new \stdClass();
  $response->workouts = $workouts;
  echo json_encode($response);
  http_response_code(200);
} else {
  echo $sql;
  http_response_code(404);
}
$conn->close();


?>
