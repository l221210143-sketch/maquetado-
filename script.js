// BASE DE DATOS LOCAL DE EMPLEADOS
const empleados = [
    { id: 1, nombre: "Carlos Ruiz Gómez", org: "CEMEFI", puesto: "Coordinador IT", edificio: "Edificio A", piso: "Piso 1", auto: "Mazda 3 (Azul)", check: false },
    { id: 2, nombre: "María Fernández", org: "CEMEFI", puesto: "Directora Operativa", edificio: "Edificio A", piso: "Piso 2", auto: "Sin vehículo", check: false },
    { id: 3, nombre: "Juan López", org: "Fundación A.C.", puesto: "Analista", edificio: "Edificio B", piso: "Piso 1", auto: "Honda Civic (Gris)", check: false },
    { id: 4, nombre: "Laura Martínez", org: "Unión Pro-RSE", puesto: "Consultora", edificio: "Edificio B", piso: "Piso 2", auto: "Sin vehículo", check: false }
];

let orgActual = 'CEMEFI';

// NAVEGACIÓN ENTRE PESTAÑAS
function nav(tabId, el) {
    document.querySelectorAll('.panel-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    el.classList.add('active');
    document.getElementById('section-title').innerText = el.innerText.trim();
}

// DESPLEGAR VEHÍCULO VISITANTE
function toggleVehiculo(val) {
    document.getElementById('campos-vehiculo').style.display = (val === 'Sí') ? 'flex' : 'none';
}

// REGISTRAR VISITANTE
function registrarVisitante(e) {
    e.preventDefault();
    const nombre = document.getElementById('v-nombre').value;
    const asunto = document.getElementById('v-asunto').value;
    
    const item = document.createElement('li');
    item.innerHTML = `🟡 <strong>${nombre}</strong> (Visitante) - Asunto: ${asunto}`;
    document.getElementById('lista-personas').appendChild(item);

    alert('Visitante registrado con éxito.');
    e.target.reset();
    toggleVehiculo('No');
}

// FILTRAR EMPLEADOS POR ORGANIZACIÓN
function filtrarOrg(org, btn) {
    orgActual = org;
    document.querySelectorAll('.btn-org').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderEmpleados();
}

function buscarEmpleado() {
    renderEmpleados();
}

function renderEmpleados() {
    const container = document.getElementById('contenedor-empleados');
    container.innerHTML = '';
    const filtro = document.getElementById('input-busqueda').value.toLowerCase();

    const filtrados = empleados.filter(e => e.org === orgActual && e.nombre.toLowerCase().includes(filtro));

    filtrados.forEach(e => {
        const div = document.createElement('div');
        div.className = `emp-item ${e.check ? 'checked' : ''}`;
        div.innerHTML = `
            <div>
                <strong>${e.nombre}</strong> <br>
                <small>${e.puesto} | ${e.edificio} (${e.piso}) | Auto: ${e.auto}</small>
            </div>
            <button class="btn ${e.check ? 'btn-primary' : ''}" onclick="toggleCheck(${e.id})" style="border: 1px solid #cbd5e1;">
                <i class="fa-solid ${e.check ? 'fa-square-check' : 'fa-square'}"></i> ${e.check ? 'Dentro' : 'Marcar Entrada'}
            </button>
        `;
        container.appendChild(div);
    });
}

function toggleCheck(id) {
    const emp = empleados.find(e => e.id === id);
    if (emp) {
        emp.check = !emp.check;
        renderEmpleados();
    }
}

// Carga Inicial
renderEmpleados();