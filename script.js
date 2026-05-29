
function validarNombre() {
    var valor = document.getElementById("nombre").value.trim();
    var errorEl = document.getElementById("error-nombre");
    var inputEl = document.getElementById("nombre");


    var regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;

    if (valor === "") {
        mostrarError(errorEl, inputEl, "El nombre y apellido no puede estar vacío.");
        return false;
    }

    if (valor.length < 3) {
        mostrarError(errorEl, inputEl, "El nombre debe tener al menos 3 caracteres.");
        return false;
    }

    if (!regex.test(valor)) {
        mostrarError(errorEl, inputEl, "Solo se permiten letras. Sin números ni caracteres especiales.");
        return false;
    }

    limpiarError(errorEl, inputEl);
    return true;
}

function validarDNI() {
    var valor = document.getElementById("dni").value.trim();
    var errorEl = document.getElementById("error-dni");
    var inputEl = document.getElementById("dni");

    if (valor === "") {
        mostrarError(errorEl, inputEl, "El DNI no puede estar vacío.");
        return false;
    }

    if (isNaN(valor) || valor.includes(" ")) {
        mostrarError(errorEl, inputEl, "El DNI debe contener solo números.");
        return false;
    }

    if (valor.length !== 8) {
        mostrarError(errorEl, inputEl, "El DNI debe tener exactamente 8 dígitos. Actualmente tiene " + valor.length + ".");
        return false;
    }

    limpiarError(errorEl, inputEl);
    return true;
}

function validarFechaNacimiento() {
    var valor = document.getElementById("fechaNacimiento").value;
    var errorEl = document.getElementById("error-fecha");
    var inputEl = document.getElementById("fechaNacimiento");
    if (valor === "") {
        mostrarError(errorEl, inputEl, "Debe ingresar su fecha de nacimiento.");
        return false;
    }
    var fechaNac = new Date(valor);
    var hoy = new Date();
    var edad = hoy.getFullYear() - fechaNac.getFullYear();
    var mesActual = hoy.getMonth();
    var mesNac = fechaNac.getMonth();

    if (mesActual < mesNac || (mesActual === mesNac && hoy.getDate() < fechaNac.getDate())) {
        edad = edad - 1;
    }

    if (edad < 18) {
        mostrarError(errorEl, inputEl, "Debes ser mayor de 18 años para inscribirte. Edad detectada: " + edad + " años.");
        return false;
    }

    limpiarError(errorEl, inputEl);
    return true;
}

function validarFormulario() {
    var nombreOk = validarNombre();
    var dniOk    = validarDNI();
    var fechaOk  = validarFechaNacimiento();

    var mensajeExito = document.getElementById("mensaje-exito");

    if (nombreOk && dniOk && fechaOk) {
        mensajeExito.classList.remove("hidden");
        mensajeExito.innerHTML = "¡Formulario enviado correctamente! Tu inscripción fue registrada.";
    } else {
        mensajeExito.classList.add("hidden");
    }
}

function hacerPreguntas() {
    var preguntas = [
        "¿Cuál es tu nacionalidad?",
        "¿Cuál es tu nivel de conocimiento en programación? (Básico,Intermedio,Avanzado)",
        "¿Por qué elegiste esta carrera?"
    ];

    var respuestas = [];

    //Pregunta 1
    var resp1 = prompt(preguntas[0]);
    respuestas.push(resp1);

    //Pregunta 2
    var resp2 = prompt(preguntas[1]);
    respuestas.push(resp2);

    //Pregunta 3
    var resp3 = prompt(preguntas[2]);
    respuestas.push(resp3);

    //Mostramos las respuestas
    mostrarRespuestasEnDOM(preguntas, respuestas);
}

function mostrarRespuestasEnDOM(preguntas, respuestas) {
    var container = document.getElementById("respuestas-container");
    var lista      = document.getElementById("respuestas-lista");

    var html = "";

    for (var i = 0; i < preguntas.length; i++) {
        var numero   = i + 1;
        var pregunta = preguntas[i];
        var respuesta = respuestas[i];
        if (respuesta === null || respuesta === "") {

        html += "<div class='respuesta-item respuesta-item--vacia'>" +
                    "<span class='respuesta-num'>Pregunta " + numero + "</span>" +
                    "<span class='respuesta-texto'>El usuario no respondió esta pregunta.</span>" +
                "</div>";
        } else {
        html += "<div class='respuesta-item'>" +
                    "<span class='respuesta-num'>Pregunta " + numero + "</span>" +
                    "<span class='respuesta-texto'>" + respuesta + "</span>" +
                "</div>";
        }
    }

    lista.innerHTML = html;
    container.classList.remove("hidden");

    container.scrollIntoView({ behavior: "smooth", block: "start" });
}

function mostrarError(errorEl, inputEl, mensaje) {
    errorEl.innerHTML = "ERROR " + mensaje;
    errorEl.className = "field-message field-message--error";
    inputEl.classList.add("field-input--error");
    inputEl.classList.remove("field-input--ok");
}

function limpiarError(errorEl, inputEl) {
    errorEl.innerHTML = "Campo válido.";
    errorEl.className = "field-message field-message--ok";
    inputEl.classList.add("field-input--ok");
    inputEl.classList.remove("field-input--error");
}