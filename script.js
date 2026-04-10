
localStorage.setItem('saludo', 'Hola Mundo');

const resultado = localStorage.getItem('saludo');
console.log(resultado);

function cargarLeads() {
  return JSON.parse(localStorage.getItem('leads')) || [];
}


function guardarLeads(leads) {
  localStorage.setItem('leads', JSON.stringify(leads));
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

  document.getElementById('lead-form').reset();
}

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

// Ejecutar al cargar
mostrarDatos();