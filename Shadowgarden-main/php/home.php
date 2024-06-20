<?php
session_start();

if(isset($_SESSION['id']) && isset($_SESSION['user_name']))  /*hier was een {*/
    ?> 
    <!DOCTYPE html>
    <html>
    </html>
    <head>


    <title>Home</title>
    <link rel = "stylesheet" type="text/css" href="style.css">
    </head>
    <body>
        <h1>Hello, <?php echo $_SESSION['user_name']; ?></h1>
        <a href="logout.php" >Logout</a>
     </body>
     </html>

     <?php
     
   else {
      header("Location: index.php");
      exit();
   }

   // FTP connection settings
   $ftpServer = '127.0.0.1';
   $ftpUsername = 'Admin';
   $ftpPassword = '123';


   // Connect to FTP server
   $ftpConnection = ftp_connect($ftpServer);
   if (!$ftpConnection) {
      die('Failed to connect to FTP server');
   }

   // Login to FTP server
   $ftpLogin = ftp_login($ftpConnection, $ftpUsername, $ftpPassword);
   if (!$ftpLogin) {
      die('Failed to login to FTP server');
   }

   // Perform FTP operations
   // Example: Upload a file to the FTP server
   $localFile = '/path/to/local/file.txt';
   $remoteFile = '/path/on/ftp/server/file.txt';
   if (ftp_put($ftpConnection, $remoteFile, $localFile, FTP_BINARY)) {
      echo 'File uploaded successfully';
   } else {
      echo 'Failed to upload file';
   }

   // Close FTP connection
   ftp_close($ftpConnection);