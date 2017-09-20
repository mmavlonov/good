<?php
/**
 * Created by PhpStorm.
 * User: Abdurashidov-R
 * Date: 29.12.2016
 * Time: 9:24
 */

require "config.php";

$name = $email = $phone = $message = $error =  "";
$valid = true;

if(isset($_POST['userName']) && !empty($_POST['userName'])){
    $name = $_POST['userName'];
}else{
    $valid = false;
    $error .= "* Required field.\n";
    $name = '';
}


if(isset($_POST['userEmail']) && !empty($_POST['userEmail'])){
    $email = $_POST['userEmail'];
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
        $valid = false;
        $error .= "* Wrong email type.";
        $email = "";
    }else{
        $email = $_POST['userEmail'];
    }
}else{
    $valid = false;
    $error .= "* Required field.\n";
    $email = '';
}

if(isset($_POST['userTelephone']) && !empty($_POST['userTelephone'])){
    $phone = $_POST['userTelephone'];
}else{
    $valid = false;
    $error .= "* Required field.\n";
    $phone = '';
}

if(isset($_POST['userMessage']) && !empty($_POST['userMessage'])){
    $message = $_POST['userMessage'];
}else{
    $valid = false;
    $error .= "* Required field.\n";
    $name = '';
}


if($valid){
        $sql = "INSERT INTO contact (id, `name`, email, phone, message) VALUES (NULL, '$name', '$email', '$phone', '$message')";
        $query = mysqli_query($conn, $sql);
        if($query){
            $data = array("valid"=>true, "msg"=>"Thank you for your message!");
            echo json_encode($data);
        }else{
            $data = array("valid"=>false, "msg"=>"Error. Try again!");
            echo json_encode($data);
        }
}else{
    $resp = [];
    $resp = array("valid"=>false, "msg"=>$error);
    echo json_encode($resp);
}