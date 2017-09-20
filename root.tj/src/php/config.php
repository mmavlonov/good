<?php
/**
 * Created by PhpStorm.
 * User: Abdurashidov-R
 * Date: 29.12.2016
 * Time: 9:23
 */

$db_hostname = 'localhost';
$db_username = 'root';
$db_password = '123';
$db_name = 'root-tj';

$conn = mysqli_connect($db_hostname, $db_username, $db_password, $db_name);

if(!$conn){
    echo "Невозможно подключиться к БД".mysqli_error($conn);die;
}
