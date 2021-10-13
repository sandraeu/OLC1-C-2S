//-- Metodo para abrir un archivo 
function readSingleFile(e) {
    var file = e.target.files[0];
    if (!file) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
      var contents = e.target.result;
      displayContents(contents);
    };
    reader.readAsText(file);
  }
  
  function displayContents(contents) {
    editor.setValue(contents);
  }
  
  document.getElementById('file-input')
    .addEventListener('change', readSingleFile, false);

//-- Metodo para hacer peticion al servidor
function compilar(){
  
  var xhr = new XMLHttpRequest();
  xhr.onload = () => {

    // print JSON response
    if (xhr.status >= 200 && xhr.status < 300) {
        // parse JSON
        const response = JSON.parse(xhr.responseText);
        document.getElementById("consola").value = response.consola;      
        console.log(response.consola);
    }else{
      alert("Se ha producido un error al ejecutar el programa.")
    }
  };
  const json = {
    "input": editor.getValue()
  };
  xhr.open('POST', 'http://localhost:3000/api/ejecutar', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(json));
 
    
}


function openPage(pageName) { 
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
 
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }

  document.getElementById(pageName).style.display = "block";

}

