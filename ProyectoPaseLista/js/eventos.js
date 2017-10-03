var iniciaApp = function () {

	

	var guarda = function () {

		function pasarVariables(pagina, nombres) {
			pagina +="?";
			nomVec = nombres.split(",");
			for (i=0; i<nomVec.length; i++)
			  pagina += nomVec[i] + "=" + escape(eval(nomVec[i]))+"&";
			pagina = pagina.substring(0,pagina.length-1);
			var pag= pagina;
			return pag;
		  }


		alert("click");
		var usuario = document.getElementById("txtUsuario").value;
		var clave = document.getElementById("txtClave").value;
		var usuariovalida;
		var periodoactual;
		var parametros = "opcion=guardar" + "&id=" + 0;
		var obj;
		var entrar = $.ajax({
			method: "GET",
			url: "http://itculiacan.edu.mx/dadm/apipaselista/data/validausuario.php?usuario=" + usuario + "&clave=" + clave,
			data: parametros,
			crossDomain: true,
			datatype: "json"
		});
		entrar.done(function (data) {
			obj = jQuery.parseJSON(data);
			if (obj.respuesta) {
				alert("Acceso concedido");
				usuariovalida=obj.usuariovalida;
				periodoactual=obj.periodoactual;
				window.location=(pasarVariables('material.html','usuario,usuariovalida,periodoactual'));


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
	$("#btnEntrar").on("click", guarda);
}

$(document).ready(iniciaApp);        









