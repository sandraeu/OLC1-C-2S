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
        //tabla de simbolos en index
        document.getElementById("tablasimbols").innerHTML = response.ts;
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

function recorrer_ast(){
  
  var xhr2 = new XMLHttpRequest();
  xhr2.onload = () => {

    // print JSON response
    if (xhr2.status >= 200 && xhr2.status < 300) {
        // parse JSON
        const response = JSON.parse(xhr2.responseText); 
        console.log(response.ast);
        d3.select("#graph").graphviz()
          .renderDot(response.ast);

    }else{
      alert("Se ha producido un error al ejecutar el programa.")
    }
  };
  const json2 = {
    "input": editor.getValue()
  };
  xhr2.open('POST', 'http://localhost:3000/api/recorrer', true);
  xhr2.setRequestHeader('Content-Type', 'application/json');
  xhr2.send(JSON.stringify(json2));
 
    
}

function openPage(pageName) { 
  if(pageName == "AST"){
    recorrer_ast();
  }
  
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

