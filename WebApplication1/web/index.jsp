<%-- 
    Document   : index
    Created on : Oct 2, 2012, 6:03:29 PM
    Author     : goryunov vladimir
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <!--<title>JSP Page</title>-->
        <title></title>
        <!--[if gte IE 5]><script type="text/javascript" src="excanvas.js"></script><![endif]-->
        <script type="text/javascript" src="init.js"></script>
        <script type="text/javascript" src="start.js"></script>
        <script type="text/javascript" src="waiting.js"></script>
        <script type="text/javascript" src="field.js"></script>
    </head>
    <body onload="startGame()">
        <!--<h1>Hello World!</h1>-->
        <!--<input type="file" id="your-files" multiple>-->
       <canvas id="game" width="1" height="1">Canvas is not supported!</canvas>
       <!--<canvas id="canvasElement" width="100" height="100">Canvas is not supported!</canvas>-->
    </body>
</html>
