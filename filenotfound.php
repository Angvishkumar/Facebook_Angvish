<?php

echo 'Something went wrong please check the url !!';

if (empty($access)) {
    header("location:index.php");
    die();
}
?>
