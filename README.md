# xkod-leads
Gestor de prospectos XKOD
1. Brandon - Frontend & UX Architect: 
2. Fernando - Logic & Persistence Lead: 
3. Eddie - Data & Quality Engineer:


# XKOD Leads 📋

Herramienta interna desarrollada por el equipo XKOD para gestionar 
prospectos y leads de ventas directamente desde el navegador, sin 
necesidad de internet ni base de datos externa.


---

## ¿Cómo funciona?

Los datos se guardan en el **localStorage** del navegador, que es una 
memoria interna que tiene cada navegador para guardar información de 
forma permanente. Esto significa que aunque cierres el navegador o 
apagues la computadora, los datos siguen ahí la próxima vez que abras 
la aplicación.

---


## ¿Cómo usarla?

### Capturar un nuevo lead
1. Abre el archivo `index.html` en tu navegador con doble clic
2. Llena todos los campos del formulario:
   - **Nombre** — Nombre completo del prospecto
   - **Empresa** — Empresa donde trabaja
   - **Correo electrónico** — Debe tener formato válido (ejemplo@correo.com)
   - **Teléfono** — Número de contacto
   - **Estado** — Selecciona entre Pendiente, Contactado o En Negociación
3. Haz clic en **Guardar** — el contacto aparece automáticamente en la tabla

### Buscar un lead
- Escribe el nombre o el ID del prospecto en el campo **Buscador**
- La tabla se filtra automáticamente mostrando solo los que coincidan
- Si borras el texto regresa a mostrar todos los leads

### Editar un lead
- Haz clic en el botón ✏️ de la fila que quieres modificar
- Los datos del lead se cargan automáticamente en el formulario
- Modifica lo que necesites y haz clic en **Guardar**
- El lead se actualiza en la tabla y en localStorage

### Eliminar un lead
- Haz clic en el botón 🗑️ de la fila que quieres borrar
- Aparece una ventana de confirmación para evitar errores accidentales
- Si confirmas, el lead se borra de la tabla y de localStorage de forma permanente

### Exportar a CSV
- Haz clic en el botón **Exportar CSV**
- Se descarga automáticamente un archivo llamado `tabla_de_datos.csv`
- Ábrelo en Excel para ver todos los leads con sus datos organizados en columnas

---

## Estructura del proyecto

xkod-leads/
├── index.html          → Estructura principal de la página
│                         Contiene el formulario de captura,
│                         la tabla de visualización y el buscador
├── script.js           → Toda la lógica del proyecto en JavaScript
│                         Aquí están todas las funciones de CRUD,
│                         búsqueda, validación y exportación
├── style.css           → Estilos visuales de la aplicación
│                         Colores, tipografía, diseño responsive
├── imagenes/           → Íconos usados en los botones de la tabla
│   ├── Emoticons (1).png   → Ícono del botón Eliminar
│   └── Emoticons (2).png   → Ícono del botón Editar
└── README.md           → Este archivo de documentación


---

## Documentación de funciones — script.js

### `cargarLeads()`
```javascript
function cargarLeads() {
  return JSON.parse(localStorage.getItem('leads')) || [];
}
```
**¿Qué hace?** Lee el arreglo de leads guardado en localStorage y lo 
convierte de texto a objeto usando `JSON.parse`. Si no hay nada guardado 
todavía, devuelve un arreglo vacío `[]` para evitar errores.

**¿Cuándo se usa?** Cada vez que otra función necesita leer los leads 
antes de modificarlos.

---

### `guardarLeads(leads)`
```javascript
function guardarLeads(leads) {
  localStorage.setItem('leads', JSON.stringify(leads));
}
```
**¿Qué hace?** Recibe el arreglo completo de leads, lo convierte a texto 
con `JSON.stringify` y lo guarda en localStorage. Se usa porque localStorage 
solo puede guardar texto, no arreglos u objetos directamente.

**¿Cuándo se usa?** Después de cualquier operación que modifique el arreglo 
(guardar, editar o eliminar).

---

### `validarcorreo()`
```javascript
function validarcorreo() {
  const email = document.getElementById("email").value;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    alert("Por favor, ingresa un correo electrónico válido.");
    return false;
  }
  return true;
}
```
**¿Qué hace?** Verifica que el correo ingresado tenga un formato válido 
usando una expresión regular. Por ejemplo, acepta `juan@empresa.com` pero 
rechaza `juanempresa` o `juan@`. Si el correo no es válido muestra una 
alerta y devuelve `false` para detener el guardado.

**¿Cuándo se usa?** Siempre antes de ejecutar `guardar()`.

---

### `guardar()`
```javascript
function guardar() {
  // Validar correo antes de guardar el lead
  if (!validarcorreo()) return;

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
```
**¿Qué hace?** Es la función principal que se ejecuta al hacer clic en 
el botón "Guardar". Realiza estos pasos en orden:
1. Llama a `validarcorreo()` — si falla, detiene todo con `return`
2. Lee los valores de cada campo del formulario con `getElementById`
3. Crea un objeto `nuevoLead` con todos los datos más un ID único generado con `Date.now()`
4. Carga el arreglo existente con `cargarLeads()`
5. Agrega el nuevo lead al arreglo con `push()`
6. Guarda el arreglo actualizado con `guardarLeads()`
7. Llama a `mostrarDatos()` para refrescar la tabla
8. Limpia el formulario con `reset()`

---

### `mostrarDatos()`
```javascript
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
```
**¿Qué hace?** Lee todos los leads de localStorage y los pinta en la 
tabla del HTML. Primero limpia el contenido actual de la tabla con 
`innerHTML = ""` y luego recorre el arreglo con `forEach` construyendo 
una fila `<tr>` por cada lead. Cada fila incluye los botones de editar 
y eliminar con el ID del lead como parámetro.

**¿Cuándo se usa?** Al cargar la página, al guardar, al editar y al 
eliminar un lead para mantener la tabla siempre actualizada.

---

### `editar(id)`
```javascript
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
```
**¿Qué hace?** Recibe el ID del lead a editar y realiza estos pasos:
1. Busca el lead en el arreglo con `leads.find()`
2. Rellena cada campo del formulario con los datos del lead encontrado
3. Elimina el lead viejo del arreglo con `filter()` para que al 
   hacer clic en Guardar se cree uno nuevo con los datos modificados
4. Sube el scroll al inicio de la página con `window.scrollTo()` 
   para que el usuario vea el formulario automáticamente

---

### `eliminar(id)`
```javascript
function eliminar(id) {
  const confirmar = confirm('¿Estás seguro de eliminar este prospecto?');
  if (!confirmar) return;
 
  let leads = cargarLeads();
  leads = leads.filter(lead => lead.id !== id);
  guardarLeads(leads);
  mostrarDatos();
}
```
**¿Qué hace?** Recibe el ID del lead a eliminar y realiza estos pasos:
1. Muestra una ventana de confirmación con `confirm()` para evitar 
   borrados accidentales
2. Si el usuario confirma, filtra el arreglo con `leads.filter()` 
   quitando el lead cuyo ID coincida
3. Guarda el arreglo actualizado con `guardarLeads()`
4. Refresca la tabla con `mostrarDatos()`

---

### `buscar()`
```javascript
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
```
**¿Qué hace?** Lee el texto del campo buscador y filtra los leads 
que coincidan por nombre o por ID. Usa `toLowerCase()` para que la 
búsqueda no distinga entre mayúsculas y minúsculas. Si el buscador 
está vacío, llama a `mostrarDatos()` para mostrar todos los leads.

---

### `exportarCSV()`
```javascript
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
```
**¿Qué hace?** Genera un archivo `.csv` con todos los leads guardados 
y lo descarga automáticamente. Construye el texto del archivo con los 
encabezados y los datos de cada lead separados por comas. Usa `Blob` 
y `URL.createObjectURL` para crear el archivo en memoria y simular 
un clic en un enlace de descarga.

---

## Tecnologías usadas

| Tecnología | Versión | ¿Para qué se usa? |
|---|---|---|
| HTML5 | — | Estructura de la página y formulario |
| CSS3 | — | Estilos, colores y diseño responsive |
| JavaScript | Vanilla ES6 | Toda la lógica del proyecto |
| localStorage | API del navegador | Persistencia de datos sin base de datos |

---

## Equipo de desarrollo

| Rol | Nombre | Responsabilidad |
|---|---|---|
| Frontend & UX Architect | Brandon | Estructura HTML, estilos CSS y experiencia de usuario |
| Logic & Persistence Lead | Fernando | Lógica JavaScript, localStorage y documentación |
| Data & Quality Engineer | Eddie | Validaciones, búsqueda, filtros y exportación CSV |

---

## ¿Cómo clonar y usar el proyecto?

```bash
# 1. Clona el repositorio
git clone https://github.com/fnando04/xkod-leads.git

# 2. Entra a la carpeta
cd xkod-leads

# 3. Abre el archivo index.html en tu navegador
# No se necesita instalar nada más
```

---

## ¿Cómo contribuir al proyecto?

```bash
# 1. Asegúrate de tener la versión más reciente
git pull origin main

# 2. Haz tus cambios en los archivos

# 3. Sube los cambios
git add .
git commit -m "descripción de lo que hiciste"
git push origin main
```

---

## Notas importantes para futuros becarios

- Los datos se guardan **solo en el navegador** donde se use la app. 
  Si cambias de navegador o computadora, los datos no se transfieren.
- Para transferir datos entre computadoras usa el botón **Exportar CSV**.
- Si limpias el historial o caché del navegador **los datos se borran**, 
  así que exporta el CSV regularmente como respaldo.
- El proyecto no requiere servidor ni conexión a internet para funcionar.
