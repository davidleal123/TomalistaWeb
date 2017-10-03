
var iniciaApp = function () {
    //Funcion para llenar tabla de materias 

    function obtenerVariables( name ){
        var regexS = "[\\?&]"+name+"=([^&#]*)";
        var regex = new RegExp ( regexS );
        var tmpURL = window.location.href;
        var results = regex.exec( tmpURL );
        if( results == null )
          return"";
        else
          return results[1];
      }
      var Uri;
      function loadURL(){
          Uri= "http://itculiacan.edu.mx/dadm/apipaselista/data/obtienegrupos2.php?usuario=";
          Uri +=obtenerVariables('usuario');
          Uri+="&usuariovalida=";
          Uri+=obtenerVariables('usuariovalida');
          Uri+="&periodoactual=";
          Uri+=obtenerVariables('periodoactual');

      }

    var materias = function () {

        var usuario;
        var usuariovalida;
        var periodoactual;
        var parametros = "opcion=guardar" + "&id=" + 0;
        loadURL();
        
        var cargar = $.ajax({
            method: "GET",
            //url: "http://itculiacan.edu.mx/dadm/apipaselista/data/obtienegrupos2.php?usuario="+usuario+"&usuariovalida="+usuariovalida+"&periodoactual="+periodoactual,
            //url: "http://itculiacan.edu.mx/dadm/apipaselista/data/obtienegrupos2.php?usuario=920&usuariovalida=49nc8Eznl4dnU&periodoactual=2173",
            url: Uri,
            data: parametros,
            crossDomain: true,
            datatype: "json"
        });

        cargar.done(function (data) {
            var obj = jQuery.parseJSON(data);
            if (obj.respuesta) {

                /*for (var i = 1; i < data.grupos.; i++) {
                    d += '<tr>' +
                        '<td>' + data["grupos"][i].materia + '</td>' +
                        '</tr>';
                }*/
                // Obtener la referencia del elemento body
                var body = document.getElementsByTagName("body")[0];

                // Crea un elemento <table> y un elemento <tbody>
                var tabla = document.createElement("table");
                tabla.id='tblmateria';
                var tblBody = document.createElement("tbody");

                


                $.each(obj.grupos, function (index, value) {
                    if (value.materia != undefined) {
                        var hilera = document.createElement("tr");
                        var celda = document.createElement("td");
                        var button =document.createElement("button");
                        var textoCelda = document.createTextNode(value.materia);
                        button.appendChild(textoCelda);
                        button.id ='btnmateria';
                        celda.appendChild(button);
                        hilera.appendChild(celda);               
                        tblBody.appendChild(hilera);

                    }
                });
                // posiciona el <tbody> debajo del elemento <table>
                tabla.appendChild(tblBody);
                // appends <table> into <body>
                body.appendChild(tabla);
                // modifica el atributo "border" de la tabla y lo fija a "2";
                tabla.setAttribute("border", "2");

            } else {
                alert(obj.respuesta);
                //location.reload();
            }
        })

        cargar.fail(function (jqError, textStatus) {
            alert("Ha ocurrido un error.");
        });
        return false;
    }
    $(document).ready(materias);

    var listas = function () {
		alert("click");
		var usuario = document.getElementById("txtUsuario").value;
		var clave = document.getElementById("txtClave").value;
		var parametros = "opcion=guardar" + "&id=" + 0;

		var entrar = $.ajax({
			method: "GET",
			url: "http://itculiacan.edu.mx/dadm/apipaselista/data/obtienealumnos.php?usuario=920&usuariovalida=49nc8Eznl4dnU&periodoactual=2173&materia=AEB1011&grupo=7A",
			data: parametros,
			crossDomain: true,
			datatype: "json"
		});
		entrar.done(function (data) {
			var obj = jQuery.parseJSON(data);
			if (obj.respuesta) {
				alert("Acceso concedido");
				window.location = ('material.html');

			} else {
				alert(obj.respuesta);
				//location.reload();
			}
		});
		entrar.fail(function (jqError, textStatus) {
			alert("Ha ocurrido un error.");
		});
		return false;
	}
	$("#btnmateria").on("click", listas);
}

$(document).ready(iniciaApp);        