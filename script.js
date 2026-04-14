
// ── SEMANA 1: Prueba de concepto ──
localStorage.setItem('saludo', 'Hola Mundo');
const resultado = localStorage.getItem('saludo');
console.log(resultado);

// ── SEMANA 2: Capturar y guardar leads ──

/**
 * Carga los leads guardados en localStorage.
 * Si no hay nada, devuelve un arreglo vacío.
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
 * Se ejecuta al hacer clic en "Guardar Prospecto".
 * Lee el formulario, crea el objeto y lo guarda.
 */
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
        <td>${lead.nombre}</td>
        <td>${lead.empresa}</td>
        <td>${lead.email}</td>
        <td>${lead.telefono}</td>
        <td>${lead.status}</td>
      </tr>
    `;
  });
}

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

// Semana 3
// Funcion para buscar
function buscar(){
  let filtro = document.getElementById("buscar").value.toLowerCase();
  let datos = JSON.parse(localStorage.getItem("leads")) || [];

  let filtrados = datos.filter(lead =>
    lead.nombre.toLowerCase().includes(filtro)
  );
  

  let tabla = document.getElementById("tabla");
  tabla.innerHTML = "";

    filtrados.forEach((lead, index) => {
      tabla.innerHTML += `
      <tr>
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
