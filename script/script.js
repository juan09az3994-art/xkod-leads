// ── SEMANA 1: Prueba de concepto ──
localStorage.setItem('saludo', 'Hola Mundo');
const resultado = localStorage.getItem('saludo');
console.log(resultado);
// ── SEMANA 2: Capturar y guardar leads ──
/**
   Carga los leads guardados en localStorage.
   Si no hay nada, devuelve un arreglo vacío.
 */
function cargarLeads() {
  return JSON.parse(localStorage.getItem('leads')) || [];
}
/**
 * Guarda el arreglo completo de leads en localStorage.
 */
function guardarLeads(leads) {
  localStorage.setItem('leads', JSON.stringify(leads));
}
/**
   Se ejecuta al hacer clic en "Guardar Prospecto".
    Lee el formulario, crea el objeto y lo guarda.
 */
function validarcorreo() {
  const email = document.getElementById("email").value;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email)) {
    alert("Por favor, ingresa un correo electrónico válido.");
    return false;
  }

  return true;
}
function validartelefono() {
  const telefono = document.getElementById("telefono").value;
  const regex = /^\d{7,15}$/;

  if (!regex.test(telefono)) {
    alert("Por favor, ingresa un número de teléfono válido.");
    return false;
  }

  return true;
}

document.getElementById("lead-form").addEventListener("submit", function(e){

  e.preventDefault();

  let valido = true;

  document.querySelectorAll("#lead-form input, #lead-form select").forEach(campo => {

    let error = campo.nextElementSibling;

    if(!campo.value || campo.value === ""){
      campo.classList.add("error-activo");
      if(error) error.style.display = "block";
      valido = false;
    } else {
      campo.classList.remove("error-activo");
      if(error) error.style.display = "none";
    }

  });

  if(valido){
    guardar(); // tu función
  }

});

function guardar() {
  // Validar correo antes de guardar el lead
  if (!validarcorreo()) return;
  // Validar teléfono antes de guardar el lead
  if (!validartelefono()) return;

  const nombre   = document.getElementById('nombre').value;
  const empresa  = document.getElementById('empresa').value;
  const email    = document.getElementById('email').value;
  const telefono = document.getElementById('telefono').value;
  const status   = document.getElementById('status').value;

  const nuevoLead = {
    id:       Date.now(),
    nombre:   nombre,
    empresa:  empresa,
    email:    email,
    telefono: telefono,
    status:   status,
  };

  const leads = cargarLeads();
  leads.push(nuevoLead);
  guardarLeads(leads);

  mostrarDatos();
  document.getElementById('lead-form').reset();
}
// Funcion de renderizado para la tabla
function mostrarDatos() {
  let datos = JSON.parse(localStorage.getItem("leads")) || [];
  let tabla = document.getElementById("tablaDatos");
  tabla.innerHTML = "";
 
  datos.forEach(lead => {
    tabla.innerHTML += `
      <tr>
        <td>${lead.id}</td>
        <td>${lead.nombre}</td>
        <td>${lead.empresa}</td>
        <td>${lead.email}</td>
        <td>${lead.telefono}</td>
        <td><span class="badge badge${lead.status}">${lead.status}</span></td>
        <td>
          <button class="editar" onclick="editar(${lead.id})" title="Editar"><img src="imagenes/Emoticons (2).png" width="30px" height="30px" /></button>
          <br>
          <button class="eliminar" onclick="eliminar(${lead.id})" title="Eliminar"><img src="imagenes/Emoticons (1).png" width="30px" height="30px" /></button>
        </td>
      </tr>
    `;
  });
}


// Semana 3 funciones para buscar, eliminar y editar

// ── SEMANA 3: Eliminar ──
/**
 * Elimina un lead por su ID de localStorage
 * y actualiza la tabla inmediatamente.
 */
function eliminar(id) {
  const confirmar = confirm('¿Estás seguro de eliminar este prospecto?');
  if (!confirmar) return;
 
  let leads = cargarLeads();
  leads = leads.filter(lead => lead.id !== id);
  guardarLeads(leads);
  mostrarDatos();
}
 
// ── SEMANA 3: Editar ──
/**
 * Busca el lead por ID, rellena el formulario con sus datos
 * y lo elimina de localStorage para que al guardar se actualice.
 */
function editar(id) {
  let leads = cargarLeads();
 
  // 1. Encontrar el lead que se quiere editar
  const lead = leads.find(lead => lead.id === id);
  if (!lead) return;
 
  // 2. Rellenar el formulario con los datos actuales del lead
  document.getElementById('nombre').value   = lead.nombre;
  document.getElementById('empresa').value  = lead.empresa;
  document.getElementById('email').value    = lead.email;
  document.getElementById('telefono').value = lead.telefono;
  document.getElementById('status').value   = lead.status;
 
  // 3. Eliminar el lead viejo de localStorage
  leads = leads.filter(l => l.id !== id);
  guardarLeads(leads);
  mostrarDatos();
 
  // 4. Subir el scroll para que el usuario vea el formulario
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
// Funcion para buscar
function buscar(){
  let filtro = document.getElementById("buscador").value.toLowerCase();
  let datos = JSON.parse(localStorage.getItem("leads")) || [];

  let tabla = document.getElementById("tablaDatos");
  tabla.innerHTML = "";

  if(filtro === ""){
    mostrarDatos();
    return;
  }

  let filtrados = datos.filter(lead => 
    lead.nombre.toLowerCase().includes(filtro) || 
    lead.id.toString().includes(filtro)
  );

  filtrados.forEach((lead) => {
    tabla.innerHTML += `
      <tr>
        <td>${lead.id}</td>
        <td>${lead.nombre}</td>
        <td>${lead.empresa}</td>
        <td>${lead.email}</td>
        <td>${lead.telefono}</td>
        <td><span class="badge badge${lead.status}">${lead.status}</span></td>
        <td>
          <button class="editar" onclick="editar(${lead.id})" title="Editar"><img src="imagenes/Emoticons (2).png" width="30px" height="30px" /></button>
          <br>
          <button class="eliminar" onclick="eliminar(${lead.id})" title="Eliminar"><img src="imagenes/Emoticons (1).png" width="30px" height="30px" /></button>
        </td>
      </tr>
    `;
  });
}
function limpiarBusqueda() {
  document.getElementById("buscador").value = "";
  mostrarDatos();
}

// SEMANA 4: funcion para exportar a CSV
function exportarCSV() {
  let datos = JSON.parse(localStorage.getItem("leads")) || [];

  let csv = "Id,Nombre,Empresa,Email,Telefono,Status\n";

  datos.forEach(lead => {
    csv += `${lead.id},${lead.nombre},${lead.empresa},${lead.email},${lead.telefono},${lead.status}\n`;
  });

  let blob = new Blob([csv], { type: "text/csv" });
  let url = URL.createObjectURL(blob);

  let a = document.createElement("a");
  a.href = url;
  a.download = "tabla_de_datos.csv";
  a.click();
}

// Ejecutar el metodo 
mostrarDatos();
