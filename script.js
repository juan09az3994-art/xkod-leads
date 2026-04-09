
localStorage.setItem('saludo', 'Hola Mundo');

const resultado = localStorage.getItem('saludo');
console.log(resultado);

function guardar(){
}



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
