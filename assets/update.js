function loadJS(url) {
    var script = document.createElement("script");  // create a script DOM node
    script.src = url;  // set its src to the provided URL
   
    document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}
import { $ } from "https://code.jquery.com/jquery-3.6.4.min.js";
$.get("/version.html", function(data){
    v = data;
    // alert("This is version: " + v);
    setInterval(function(){
        $.get("/version.html", function(data){
            if (data != v){
                alert("update available!")
                document.getElementById("update").style.opacity = "100%";
            }
        });
    }, 8000); // Every 8 seconds
});