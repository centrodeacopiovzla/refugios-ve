const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTe6z13jruVcXbhy2JUxz0dYlE1TFBSl50B55K-a3M5yYGLZCTagIfoZLJxIP-56DSSvLpsfUPIX5TZ/pub?gid=0&single=true&output=csv';

let datosGlobales = [];

async function cargarDatos() {
    try {
        const response = await fetch(CSV_URL);
        const texto = await response.text();
        const filas = texto.split('\n').slice(1);
        
        datosGlobales = filas
            .filter(fila => fila.trim() !== "")
            .map(fila => {
                const [Centro, Estado, Municipio, Ubicacion, Agua, ComidaNP, ComidaP, Medicinas, Tapabocas, Carpas, Cama, Higiene, Ropa, Bolsas, Mascota, Silbatos, Materiales] = fila.split(',');
                return { Centro, Estado, Municipio, Ubicacion, Agua, ComidaNP, ComidaP, Medicinas, Tapabocas, Carpas, Cama, Higiene, Ropa, Bolsas, Mascota, Silbatos, Materiales };
            });

        renderizar(datosGlobales);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Buscador
document.getElementById('buscador').addEventListener('input', (e) => {
    const termino = e.target.value.toLowerCase();
    const filtrados = datosGlobales.filter(item => 
        item.Centro?.toLowerCase().includes(termino) || 
        item.Estado?.toLowerCase().includes(termino) || 
        item.Municipio?.toLowerCase().includes(termino)
    );
    renderizar(filtrados);
});

function renderizar(datos) {
    const contenedor = document.getElementById('contenedor-refugios');
    if (!contenedor) return;
    contenedor.innerHTML = '';

    datos.forEach(item => {
        const tarjeta = document.createElement('div');
        tarjeta.className = "p-5 bg-white rounded-xl shadow-md mb-4 border-l-4 border-blue-500";
        
        tarjeta.innerHTML = `
            <h2 class="text-xl font-bold text-gray-800">${item.Centro}</h2>
            <p class="text-sm text-gray-600">📍 ${item.Ubicacion} - ${item.Municipio}, ${item.Estado}</p>
            <div class="mt-3 grid grid-cols-2 gap-2 text-sm">
                <p>💧 <b>Agua:</b> ${item.Agua}</p>
                <p>🥪 <b>C. No perecedera:</b> ${item.ComidaNP}</p>
                <p>🍲 <b>C. Preparada:</b> ${item.ComidaP}</p>
                <p>💊 <b>Medicinas:</b> ${item.Medicinas}</p>
                <p>😷 <b>Tapabocas:</b> ${item.Tapabocas}</p>
                <p>⛺ <b>Carpas:</b> ${item.Carpas}</p>
                <p>🛏️ <b>Cama:</b> ${item.Cama}</p>
                <p>🧼 <b>Higiene:</b> ${item.Higiene}</p>
                <p>👕 <b>Ropa:</b> ${item.Ropa}</p>
                <p>🛍️ <b>Bolsas:</b> ${item.Bolsas}</p>
                <p>🐾 <b>Mascota:</b> ${item.Mascota}</p>
                <p>📯 <b>Silbatos:</b> ${item.Silbatos}</p>
                <p>✏️ <b>Materiales:</b> ${item.Materiales}</p>
            </div>
        `;
        contenedor.appendChild(tarjeta);
    });
}

document.addEventListener('DOMContentLoaded', cargarDatos);