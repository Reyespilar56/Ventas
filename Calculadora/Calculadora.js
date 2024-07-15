function calculateDataUsage() {
    // Obtener valores seleccionados
    let devicesValue = document.querySelector('input[name="devices"]:checked').value;
    let multiplayerHoursValue = document.querySelector('input[name="multiplayer-hours"]:checked').value;
    let downloadsCount = parseInt(document.querySelector('input[name="downloads-count"]:checked').value);

    // Convertir el valor de dispositivos a un número representativo
    let devices;
    if (devicesValue === "1-3") {
        devices = 3; // Promedio
    } else if (devicesValue === "4-6") {
        devices = 5; // Promedio
    } else {
        devices = 6; // promedio
    }

    // Convertir el valor de horas de juego multijugador a un número representativo
    let multiplayerHours;
    if (multiplayerHoursValue === "mas") {
        multiplayerHours = 6; // Asignar un valor numérico para "más"
    } else {
        multiplayerHours = parseInt(multiplayerHoursValue);
    }

    // Lógica para calcular el consumo estimado de datos
    const dataPerDevice = 2; // GB por dispositivo
    const dataPerMultiplayerHour = 1; // GB por hora de juego multijugador
    const dataPerDownload = 0.5; // GB por descarga/actualización

    const totalDataUsage = (devices * dataPerDevice) + 
                           (multiplayerHours * dataPerMultiplayerHour * devices) + 
                           (downloadsCount * dataPerDownload * devices);

    // Mostrar resultado
    document.getElementById('data-usage').textContent = `${totalDataUsage.toFixed(2)} GB por mes`;

    // Recomendación basada en el uso
    let recommendation = 'Paquete recomendado: ';

    if (totalDataUsage <= 20) {
        recommendation += 'PAQUETE BASICO';
    } else if (totalDataUsage <= 50) {
        recommendation += 'PAQUETE PROFESIONAL';
    } else if (totalDataUsage <= 100) {
        recommendation += 'PAQUETE PLUS';
    } 

    document.getElementById('recommendation').textContent = recommendation;
}









