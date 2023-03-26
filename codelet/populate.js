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

function trim(yourString){ // Define trim function
  var maxLength = 300 // maximum number of characters to extract
  
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
  var a = 1;
  document.getElementById("results").innerHTML = "";
  for (let item of data.bookmarklets){
    content = `
<div id="ID${a}" class="item" onclick="details(this)">
    <div class="item-author">${item.author}</div>
    <div class="item-name">${item.title}</div>
    <div class="item-desc">${trim(item.desc)}</div>
</div>`;
    document.getElementById("results").innerHTML += content;
    a ++;
  }
}

function details(item){
  window.location = "/codelet/details?item=" + item.id;
}

xhr.send(null);