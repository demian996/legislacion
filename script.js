document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('theme-switch');
    const content = document.getElementById('content');
    const navLinks = document.querySelectorAll('nav a');

    const parseCSV = (text) => {
        const rows = [];
        let currentRow = [];
        let currentField = '';
        let inQuotedField = false;
        text += '\n';

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const nextChar = text[i + 1];

            if (char === '"' && nextChar === '"') {
                currentField += '"';
                i++;
            } else if (char === '"') {
                inQuotedField = !inQuotedField;
            } else if ((char === ',' || char === '\n') && !inQuotedField) {
                currentRow.push(currentField.trim());
                currentField = '';
                if (char === '\n') {
                    if (currentRow.length > 1 || currentRow[0] !== '') {
                        rows.push(currentRow);
                    }
                    currentRow = [];
                }
            } else {
                currentField += char;
            }
        }
        return rows;
    };

    const cleanCell = (cell) => (cell || '').replace(/\r/gm, "").trim();

    const getChartColors = () => {
        const isDarkMode = document.body.classList.contains('dark-mode');
        return {
            textColor: isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)',
            gridColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        };
    };

    const updateCharts = () => {
        Chart.helpers.each(Chart.instances, (instance) => {
            const { textColor, gridColor } = getChartColors();
            if (instance.options.plugins.title) instance.options.plugins.title.color = textColor;
            if (instance.options.plugins.legend) instance.options.plugins.legend.labels.color = textColor;
            if (instance.options.scales) {
                Object.keys(instance.options.scales).forEach(axis => {
                    const scale = instance.options.scales[axis];
                    if (scale.ticks) scale.ticks.color = textColor;
                    if (scale.grid) scale.grid.color = gridColor;
                });
            }
            instance.update();
        });
    };

    themeSwitch.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        updateCharts();
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
            loadContent(link.getAttribute('href').substring(1));
        });
    });

    function loadContent(section) {
        content.innerHTML = ''; 
        if (section === 'resumen') loadResumen();
        else if (section === 'produccion') loadProduccion();
        else if (section === 'comercio') loadComercio();
        else if (section === 'habitos') loadHabitos();
        else if (section === 'librerias') loadLibrerias();
    }

    function loadResumen(){
        content.innerHTML = `<h2>Resumen</h2><div class="card-container"><div class="card"><h3>Títulos Registrados (2024)</h3><p>7,616</p></div><div class="card"><h3>Digital vs. Impreso (2024)</h3><p>54.8% Digital / 45% Impreso</p></div><div class="card"><h3>Balanza Comercial (2024)</h3><p id="balanza-comercial">Cargando...</p></div></div><div class="chart-container"><canvas id="titulos-chart"></canvas></div><div class="chart-container"><canvas id="formatos-chart"></canvas></div>`;
        
        const importValue = 71993936.8;
        const exportValue = 15786935.7;
        document.getElementById('balanza-comercial').innerText = `Import: $${(importValue / 1000000).toFixed(2)}M / Export: $${(exportValue / 1000000).toFixed(2)}M`;

        const { textColor, gridColor } = getChartColors();
        new Chart(document.getElementById('titulos-chart'), { type: 'bar', data: { labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'], datasets: [{ label: 'Títulos por Mes (2024)', data: [501, 423, 561, 535, 595, 776, 600, 733, 821, 770, 604, 697], backgroundColor: 'rgba(54, 162, 235, 0.5)' }] }, options: { plugins: { title: { display: true, text: 'Títulos por Mes (2024)', color: textColor }, legend: { labels: { color: textColor } } }, scales: { x: { ticks: { color: textColor }, grid: { color: gridColor } }, y: { ticks: { color: textColor }, grid: { color: gridColor } } } } });
        new Chart(document.getElementById('formatos-chart'), { type: 'pie', data: { labels: ['PDF', 'EPUB', 'PDF/A', 'iBook', 'Otros'], datasets: [{ label: 'Formatos Digitales (2024)', data: [85.04, 6.58, 2.76, 2.76, 2.86], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'] }] }, options: { plugins: { title: { display: true, text: 'Formatos Digitales (2024)', color: textColor }, legend: { labels: { color: textColor } } } } });
    }

    function loadProduccion() {
        content.innerHTML = `<h2>Producción Editorial</h2><div class="chart-container"><canvas id="editores-chart"></canvas></div><div class="chart-container"><canvas id="temas-chart"></canvas></div><div class="chart-container"><canvas id="provincias-chart"></canvas></div>`;
        const { textColor, gridColor } = getChartColors();
        new Chart(document.getElementById('editores-chart'), { type: 'bar', data: { labels: ['2020', '2021', '2022', '2023', '2024'], datasets: [{ label: 'Persona Jurídica', data: [2944, 2907, 3368, 3543, 4874], backgroundColor: 'rgba(255, 99, 132, 0.5)' }, { label: 'Autores-Editores', data: [861, 984, 1110, 1203, 1219], backgroundColor: 'rgba(54, 162, 235, 0.5)' }, { label: 'Persona Natural', data: [544, 618, 768, 873, 1523], backgroundColor: 'rgba(75, 192, 192, 0.5)' }] }, options: { scales: { x: { stacked: true, ticks: { color: textColor }, grid: { color: gridColor } }, y: { stacked: true, ticks: { color: textColor }, grid: { color: gridColor } } }, plugins: { title: { display: true, text: 'Títulos por Tipo de Editor (2020-2024)', color: textColor }, legend: { labels: { color: textColor } } } } });
        new Chart(document.getElementById('temas-chart'), { type: 'bar', data: { labels: ['Educación', 'Investigación', 'Derecho', 'Ciencias Médicas', 'Lit. Ecuatoriana', 'Lit. Infantil', 'Conocimiento', 'Poesía Ecuatoriana', 'Educ. Superior', 'Matemática'], datasets: [{ label: 'Número de Títulos', data: [549, 469, 251, 213, 148, 142, 122, 119, 116, 116], backgroundColor: 'rgba(255, 159, 64, 0.5)' }] }, options: { indexAxis: 'y', plugins: { title: { display: true, text: 'Top 10 Temas (2024)', color: textColor }, legend: { labels: { color: textColor } } }, scales: { x: { ticks: { color: textColor }, grid: { color: gridColor } }, y: { ticks: { color: textColor }, grid: { color: gridColor } } } } });
        new Chart(document.getElementById('provincias-chart'), { type: 'bar', data: { labels: ['Pichincha', 'Guayas', 'Azuay', 'Loja', 'Manabí', 'Chimborazo', 'Tungurahua', 'Cotopaxi', 'Los Ríos', 'El Oro', 'Imbabura', 'Cañar', 'Carchi', 'Sucumbíos', 'Orellana', 'Esmeraldas', 'Bolívar', 'Galápagos', 'Pastaza', 'Napo', 'Morona S.', 'Zamora Ch.'], datasets: [{ label: 'Número de Títulos', data: [4213, 1100, 415, 341, 286, 270, 265, 229, 122, 104, 74, 68, 31, 24, 19, 17, 15, 8, 7, 5, 2, 1], backgroundColor: 'rgba(153, 102, 255, 0.5)' }] }, options: { indexAxis: 'y', plugins: { title: { display: true, text: 'Producción por Provincia (2024)', color: textColor }, legend: { labels: { color: textColor } } }, scales: { x: { ticks: { color: textColor }, grid: { color: gridColor } }, y: { ticks: { color: textColor }, grid: { color: gridColor } } } } });
    }
    
    function loadComercio() {
        content.innerHTML = `<h2>Comercio Exterior</h2><div class="chart-container"><canvas id="import-countries-chart"></canvas></div><div class="chart-container"><canvas id="export-countries-chart"></canvas></div>`;
        const { textColor, gridColor } = getChartColors();
        
        new Chart(document.getElementById('import-countries-chart'), { type: 'pie', data: { labels: ['Reino Unido', 'Colombia', 'España', 'México', 'EE.UU.', 'Otros'], datasets: [{ data: [21.7, 18.1, 17.5, 11.9, 10.1, 20.7], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'] }] }, options: { plugins: { title: { display: true, text: 'Orígenes de Importación (2024)', color: textColor }, legend: { labels: { color: textColor } } } } });
        new Chart(document.getElementById('export-countries-chart'), { type: 'pie', data: { labels: ['EE.UU.', 'Panamá', 'Italia', 'Perú', 'Colombia', 'Otros'], datasets: [{ data: [62.7, 12.9, 9.9, 6.4, 4.1, 4.0], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'] }] }, options: { plugins: { title: { display: true, text: 'Destinos de Exportación (2024)', color: textColor }, legend: { labels: { color: textColor } } } } });
    }

    function loadHabitos() {
        content.innerHTML = `<h2>Hábitos de Lectura (Encuesta 2012)</h2><div class="chart-container"><canvas id="habito-lectura-chart"></canvas></div><div class="chart-container"><canvas id="razones-no-leer-chart"></canvas></div><div class="chart-container"><canvas id="tiempo-lectura-chart"></canvas></div><div class="chart-container"><canvas id="tipo-material-chart"></canvas></div>`;
        const { textColor, gridColor } = getChartColors();
        new Chart(document.getElementById('habito-lectura-chart'), { type: 'pie', data: { labels: ['Lee', 'No Lee'], datasets: [{ data: [73.5, 26.5], backgroundColor: ['#36A2EB', '#FF6384'] }] }, options: { plugins: { title: { display: true, text: 'Hábito de Lectura en Ecuador', color: textColor }, legend: { labels: { color: textColor } } } } });
        new Chart(document.getElementById('razones-no-leer-chart'), { type: 'bar', data: { labels: ['Falta de Interés', 'Falta de Tiempo', 'Problemas de Concentración', 'Otro'], datasets: [{ label: 'Porcentaje', data: [56.8, 31.7, 3.2, 8.2], backgroundColor: 'rgba(255, 99, 132, 0.5)' }] }, options: { plugins: { title: { display: true, text: 'Razones para No Leer', color: textColor }, legend: { labels: { color: textColor } } }, scales: { x: { ticks: { color: textColor }, grid: { color: gridColor } }, y: { ticks: { color: textColor }, grid: { color: gridColor } } } } });
        new Chart(document.getElementById('tiempo-lectura-chart'), { type: 'bar', data: { labels: ['1-2 horas', '3-4 horas', '5-6 horas', '7-8 horas', '9-10 horas', '>10 horas'], datasets: [{ label: 'Porcentaje de Lectores', data: [50.3, 13.5, 5.4, 2.4, 0.8, 1.2], backgroundColor: 'rgba(54, 162, 235, 0.5)' }] }, options: { plugins: { title: { display: true, text: 'Tiempo Semanal de Lectura', color: textColor }, legend: { labels: { color: textColor } } }, scales: { x: { ticks: { color: textColor }, grid: { color: gridColor } }, y: { ticks: { color: textColor }, grid: { color: gridColor } } } } });
        new Chart(document.getElementById('tipo-material-chart'), { type: 'bar', data: { labels: ['Periódico', 'Libro', 'Revista', 'Otro'], datasets: [{ label: 'Porcentaje de Lectores', data: [31, 28, 7, 2], backgroundColor: 'rgba(255, 206, 86, 0.5)' }] }, options: { indexAxis: 'y', plugins: { title: { display: true, text: 'Material de Lectura Más Frecuente', color: textColor }, legend: { labels: { color: textColor } } }, scales: { x: { ticks: { color: textColor }, grid: { color: gridColor } }, y: { ticks: { color: textColor }, grid: { color: gridColor } } } } });
    }

    function loadLibrerias() {
        content.innerHTML = `<h2>Librerías en Ecuador</h2><div id="map-filters"><select id="provincia-filter"><option value="all">Todas las Provincias</option></select><select id="estado-filter"><option value="all">Todos los Estados</option></select></div><div id="mapid"></div><div id="librerias-table-container"><table id="librerias-table"><thead><tr><th>Nombre</th><th>Provincia</th><th>Cantón</th><th>Estado</th></tr></thead><tbody></tbody></table></div>`;
        const map = L.map('mapid').setView([-1.831239, -78.183406], 7);
        const markers = L.markerClusterGroup();
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);
        const provinciaCoordenadas = {
            "PICHINCHA": [-0.180653, -78.467834], "GUAYAS": [-2.170998, -79.922356], "AZUAY": [-2.90012, -79.00589], "MANABI": [-1.05454, -80.45445], "LOJA": [-3.99313, -79.20422], "CHIMBORAZO": [-1.67098, -78.64789], "TUNGURAHUA": [-1.24907, -78.61675], "COTOPAXI": [-0.93223, -78.61675], "LOS RIOS": [-1.0569, -79.4633], "EL ORO": [-3.2581, -79.9573], "IMBABURA": [0.3533, -78.1189], "CAÑAR": [-2.55, -78.93333], "CARCHI": [0.48333, -77.9], "SUCUMBIOS": [0.08333, -76.88333], "ORELLANA": [-0.46667, -76.98333], "ESMERALDAS": [0.96667, -79.65], "BOLIVAR": [-1.58333, -79.0], "GALAPAGOS": [-0.73333, -90.3], "PASTAZA": [-1.48333, -78.0], "NAPO": [-0.8, -77.8], "MORONA SANTIAGO": [-2.3, -78.11667], "ZAMORA CHINCHIPE": [-4.06667, -78.95]
        };
        let allLibrerias = [];
        fetch('data/filtrado_Completo.csv').then(response => response.text()).then(data => {
             const rows = parseCSV(data).slice(1);
            const provincias = new Set(), estados = new Set();
            allLibrerias = rows.map(row => {
                if (row.length > 15) {
                    const provincia = cleanCell(row[14]), canton = cleanCell(row[15]), estado = cleanCell(row[3]);
                    if (provincia && estado) {
                        provincias.add(provincia); estados.add(estado);
                        return { nombre: cleanCell(row[12]), provincia, canton, estado, coords: provinciaCoordenadas[provincia] ? [provinciaCoordenadas[provincia][0] + (Math.random() - 0.5) * 0.1, provinciaCoordenadas[provincia][1] + (Math.random() - 0.5) * 0.1] : null };
                    }
                }
                return null;
            }).filter(Boolean);
            const provinciaFilter = document.getElementById('provincia-filter');
            provincias.forEach(p => provinciaFilter.innerHTML += `<option value="${p}">${p}</option>`);
            const estadoFilter = document.getElementById('estado-filter');
            estados.forEach(e => estadoFilter.innerHTML += `<option value="${e}">${e}</option>`);
            provinciaFilter.addEventListener('change', updateMapAndTable);
            estadoFilter.addEventListener('change', updateMapAndTable);
            updateMapAndTable();
        });
        function updateMapAndTable() {
            const selectedProvincia = document.getElementById('provincia-filter').value;
            const selectedEstado = document.getElementById('estado-filter').value;
            markers.clearLayers();
            const tableBody = document.querySelector('#librerias-table tbody');
            tableBody.innerHTML = '';
            const filteredLibrerias = allLibrerias.filter(l => (selectedProvincia === 'all' || l.provincia === selectedProvincia) && (selectedEstado === 'all' || l.estado === selectedEstado));
            filteredLibrerias.forEach(l => {
                if (l.coords) {
                    const marker = L.marker(l.coords).bindPopup(`<b>${l.nombre}</b><br>${l.canton}<br>Estado: ${l.estado}`);
                    markers.addLayer(marker);
                }
                const row = `<tr><td>${l.nombre}</td><td>${l.provincia}</td><td>${l.canton}</td><td>${l.estado}</td></tr>`;
                tableBody.innerHTML += row;
            });
            map.addLayer(markers);
        }
    }

    loadContent('resumen');
});