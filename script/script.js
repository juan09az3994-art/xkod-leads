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
  const email = document.getElementById('email').value;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    alert('Por favor, ingresa un correo electrónico válido.');
    return false;
  }
  return true;
}
function guardar() {
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
  validarcorreo();

  mostrarDatos() // Pinta el lead en la tabla inmediatamente
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
        <td>${lead.status}</td>
        <td>
          <img src="https://cdn-icons-png.flaticon.com/512/1827/1827933.png" width="20" style="cursor:pointer;" onclick="editar(${lead.id})" title="Editar" />
          <img src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" width="20" style="cursor:pointer; margin-left:10px;" onclick="eliminar(${lead.id})" title="Eliminar" />
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

  let tabla = document.getElementById("tabla");
  tabla.innerHTML = "";

  // Si está vacío → mostrar todo
  if(filtro === ""){
    mostrarDatos();
    return;
  }

  let filtrados = datos.filter(lead => {
    let esNumero = !isNaN(filtro);

    if(esNumero){
      return lead.id.toString().includes(filtro);
    } else {
      return lead.nombre.toLowerCase().includes(filtro);
    }
  });

  filtrados.forEach((lead) => {
    tabla.innerHTML += `
      <tr>
        <td>${lead.id}</td>
        <td>${lead.nombre}</td>
        <td>${lead.empresa}</td>
        <td>${lead.email}</td>
        <td>${lead.telefono}</td>
        <td>${lead.status}</td>
      </tr>
    `;
  });
}
// Ejecutar el metodo 
mostrarDatos();
form.addEventListener("submit", function(e) {
  e.preventDefault();

  let email = document.getElementById("email").value;
  let error = document.getElementById("errorEmail");

  // VALIDACIÓN
  if(!validarcorreo(email)){
    error.style.display = "block";
    return; // ❌ NO guarda
  } else {
    error.style.display = "none";
  }

  let lead = {
    id: Date.now(),
    nombre: document.getElementById("nombre").value,
    empresa: document.getElementById("empresa").value,
    email: email,
    telefono: document.getElementById("telefono").value,
    status: document.getElementById("status").value
  };

  let datos = JSON.parse(localStorage.getItem("leads")) || [];
  datos.push(lead);
  localStorage.setItem("leads", JSON.stringify(datos));

  form.reset();
});