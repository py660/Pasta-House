function loadJS(url, callback){
    // Adding the script tag to the head as suggested before
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}
loadJS("https://code.jquery.com/jquery-3.6.4.min.js", function(){
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
});