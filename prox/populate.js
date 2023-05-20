const xhr = new XMLHttpRequest();
xhr.open("GET", "/prox/db.json", true);
xhr.onload = (e) => {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      populate(JSON.parse(xhr.responseText));
    } else {
        alert("ERROR 1");
      alert(xhr.statusText);
    }
  }
};
xhr.onerror = (e) => {
    alert("ERROR 2");
  alert(xhr.statusText);
};

function populate(data){
    console.log(data);
}

xhr.send(null);