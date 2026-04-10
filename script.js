
localStorage.setItem('saludo', 'Hola Mundo');

const resultado = localStorage.getItem('saludo');
console.log(resultado);

function guardar(){
  let nombre = document.getElementById("nombre").value;
  let empresa = document.getElementById("empresa").value;
  let email = document.getElementById("email").value;
  let telefono = document.getElementById("telefono").value;
  let status = document.getElementById("status").value;

  let lead = { nombre, empresa, email, telefono, status };

  let leads = JSON.parse(localStorage.getItem("leads")) || [];
  leads.push(lead);
  localStorage.setItem("leads", JSON.stringify(leads));

  mostrarDatos();

}
function limpiar() {
  document.getElementById("nombre").value = "";
  document.getElementById("empresa").value = "";
  document.getElementById("email").value = "";
  document.getElementById("telefono").value = "";
  document.getElementById("status").value = "";
}
 function eliminarDatos() {
  localStorage.removeItem("leads");
  mostrarDatos();
}

function eliminarTodo() {
  localStorage.clear();
  mostrarDatos();
}

function reemplazarDatos() {
let nuevoLead = {
  nombre: "Nuevo Nombre",
  empresa: "Nueva Empresa",
  email: "nuevo@email.com",
  telefono: "123456789",
  status: "Nuevo"
  };

localStorage.setItem("leads", JSON.stringify([nuevoLead]));
mostrarDatos();
}

function actualizarDatos() {
  let leads = JSON.parse(localStorage.getItem("leads")) || [];
  if (leads.length > 0) {
    leads[0].nombre = "Nombre Actualizado";
    localStorage.setItem("leads", JSON.stringify(leads));
    mostrarDatos();
  }
}

function agregarDatos() {
  let leads = JSON.parse(localStorage.getItem("leads")) || [];
  let nuevoLead = {
    nombre: "Nuevo Lead",
    empresa: "Empresa X",
    email: "nuevolead@email.com",
    telefono: "987654321",
    status: "Nuevo"
  };
  leads.push(nuevoLead);
  localStorage.setItem("leads", JSON.stringify(leads));
  mostrarDatos();
}

function buscarDatos() {
  let leads = JSON.parse(localStorage.getItem("leads")) || [];
  let busqueda = document.getElementById("busqueda").value.toLowerCase();
  let tabla = document.getElementById("tablaDatos");
  tabla.innerHTML = "";
  leads.forEach(lead => {
    if (lead.nombre.toLowerCase().includes(busqueda) || 
        lead.empresa.toLowerCase().includes(busqueda) ||
        lead.email.toLowerCase().includes(busqueda) || 
        lead.telefono.toLowerCase().includes(busqueda) || 
        lead.status.toLowerCase().includes(busqueda)) {
      tabla.innerHTML += `
        <tr>
          <td>${lead.nombre}</td>
          <td>${lead.empresa}</td>
          <td>${lead.email}</td>
          <td>${lead.telefono}</td>
          <td>${lead.status}</td>
        </tr>
      `;
    }
  });
}

function filtrarDatos() {
  let leads = JSON.parse(localStorage.getItem("leads")) || [];
  let filtro = document.getElementById("filtro").value.toLowerCase();
  let tabla = document.getElementById("tablaDatos");
  tabla.innerHTML = "";

  leads.forEach(lead => {
    if (lead.nombre.toLowerCase().includes(filtro) || 
        lead.empresa.toLowerCase().includes(filtro) ||
        lead.email.toLowerCase().includes(filtro) || 
        lead.telefono.toLowerCase().includes(filtro) || 
        lead.status.toLowerCase().includes(filtro)) {
      tabla.innerHTML += `
        <tr>
          <td>${lead.nombre}</td>
          <td>${lead.empresa}</td>
          <td>${lead.email}</td>
          <td>${lead.telefono}</td>
          <td>${lead.status}</td>
        </tr>
      `;
    }
  });
}


function exportarDatos() {
  let leads = JSON.parse(localStorage.getItem("leads")) || [];
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Nombre,Empresa,Email,Telefono,Status\n";
  leads.forEach(lead => {
    csvContent += `${lead.nombre},${lead.empresa},${lead.email},${lead.telefono},${lead.status}\n`;
  });
  let encodedUri = encodeURI(csvContent);
  let link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "leads.csv");
  document.body.appendChild(link);
  link.click();
}


// Ejecutar al cargar
mostrarDatos();

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

