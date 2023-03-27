const xhr = new XMLHttpRequest();
xhr.open("GET", "/codelet/db.json", true);
xhr.onload = (e) => {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      populate(JSON.parse(xhr.responseText));
    } else {
        alert("ERROR 1")
      alert(xhr.statusText);
    }
  }
};
xhr.onerror = (e) => {
    alert("ERROR 2")
  alert(xhr.statusText);
};

function trim(yourString, maxLength){ // Define trim function
  //var maxLength = 600 // maximum number of characters to extract
  
  //trim the string to the maximum length
  var trimmedString = (yourString.trim() + " ").substr(0, maxLength);
  
  //re-trim if we are in the middle of a word
  trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
  if (trimmedString == yourString){
    return trimmedString;
  }
  else{
    return trimmedString + "...";
  }
}

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
// Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
let value = params.some_key; // "some_value"

function timify(unix_timestamp){
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return formattedTime;
}

function datify(unix_timestamp){
    var date = new Date(unix_timestamp * 1000);
    return date.toLocaleDateString("en-US");
}

function populate(data){
    let id = parseInt(params.item.slice(2));
    item = data.bookmarklets[id];
    if (! item){
        window.location = "/codelet/";
    }
    let timestamp = datify(item.timestamp);
    //alert(timestamp)
    let title = trim(item.title, 50);
    let author = trim(item.author, 50);
    let code = item.data;
    let description = trim(item.desc, 200);
    let ext_desc = trim(item.about, 600);
    let usage = trim(item.usage, 300);
    
    document.getElementById("title").innerHTML = title;
    document.getElementById("img").innerHTML = `<img width="200px" src="/assets/img/RED01.png"/>`;
    let content = `
    <p>Uploaded 3/23/2023</p>
    <p>Submitted by ${author}</p>
    <h1>${description}</h1>
    <p>${ext_desc}</p>
    <br/>
    <!--h1>Code</h1-->
    <!--hr/-->
    <br/>
    <div class="container">
        <div class="flex-item">
            <code class="snippet">${code}</code>
            <code class="snippet clickable" style="text-align: center;" onclick="copy();"><i class="fa-solid fa-clipboard"></i> <b>COPY</b></code>
        </div>
    </div>
    <p>${usage}</p>`;
    document.getElementById("info").innerHTML = content;


    /*
    "timestamp": "1679779975",
            "title": "Youtube AdBlocker",
            "author": "JASON LIN",
            "data": "(function(){document.querySelectorAll(\"video\").forEach((e) => {try{e.currentTime = e.duration;}catch(e){}})})();",
            "desc": "Enjoy YouTube without the clutter.",
            "usage": "Click on this script when an ad is playing to skip to the end.",
            "keywords": "adblocker youtube skip tool"
    */

    //alert(JSON.stringify(item))
    
}

function copy(data){
  var data = [new ClipboardItem({ "text/plain": new Blob(["Text data"], { type: "text/plain" }) })];
navigator.clipboard.write(data).then(function() {
   console.log("Copied to clipboard successfully!");
}, function() {
  console.error("Unable to write to clipboard. :-(");
});
}

xhr.send(null)