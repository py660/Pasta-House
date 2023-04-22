const xhr = new XMLHttpRequest();
xhr.open("GET", "/codelet/db.json", true);
xhr.onload = (e) => {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      populate(JSON.parse(xhr.responseText));
    } else {
      console.error(xhr.statusText);
    }
  }
};
xhr.onerror = (e) => {
  console.error(xhr.statusText);
};

function trim(yourString, maxLength){ // Define trim function
  
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

function populate(data){
  window.data = data;
  var a = 0;
  document.getElementById("results").innerHTML = "";
  for (let item of data.bookmarklets){
    content = `
<div id="ID${a}" class="item" onclick="details(this)">
<div class="copy" id="COPY${a}" onclick="event.stopPropagation(); copybtn(this.id);">COPY</div>
    <div class="item-author">${trim(item.author, 50)}</div>
    <div class="item-name">${trim(item.title, 50)}</div>
    <div class="item-desc">${trim(item.desc, 175)}</div>
</div>`;
    document.getElementById("results").innerHTML += content;

    a ++;
  }
}

function details(item){
  window.location = "/codelet/details?item=" + item.id;
}

function copybtn(item){
  copy(window.data.bookmarklets[item.slice(4)].data)
}

function copy(data){
  if (!window.isSecureContext){
    alert("This site is not using HTTPS, therefore I could not copy the code.")
  }
  //var data = [new ClipboardItem({ "text/plain": new Blob([window.code], { type: "text/plain" }) })];
  try{
navigator.clipboard.writeText(data).then(function() {
   console.log("Copied to clipboard successfully!");
}, function() {
  console.error("Unable to write to clipboard.");
});
  }
  catch(e){
    alert("This site is not using HTTPS, therefore I could not copy the code.")
  }
}

xhr.send(null);