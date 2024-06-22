function calculateDataUsage() {
    var devices = parseInt(document.getElementById('devices').value);
    var multiplayerHours = parseInt(document.getElementById('multiplayer-hours').value);
    var downloadsCount = parseInt(document.getElementById('downloads-count').value);

    var multiplayerDataPerHour = 150; // MB
    var downloadsDataPerTime = 5000; // MB (5 GB)

    var multiplayerDataUsage = devices * multiplayerHours * multiplayerDataPerHour * 30 / 1024; // Convertir a GB
    var downloadsDataUsage = devices * downloadsCount * downloadsDataPerTime / 1024; // Convertir a GB
    var totalDataUsage = multiplayerDataUsage + downloadsDataUsage;

    var dataUsageElement = document.getElementById('data-usage');
    dataUsageElement.textContent = "Consumo estimado de datos: " + totalDataUsage.toFixed(2) + " GB/mes";

    var recommendationElement = document.getElementById('recommendation');
    if (totalDataUsage <= 50) {
        recommendationElement.textContent = "Recomendación Paquete Basico ";
    } else if (totalDataUsage <= 100) {
        recommendationElement.textContent = "Recomendación: Paquete Profecional";
    } else {
        recommendationElement.textContent = "Recomendación:  Paquete Plus ";
    }
}



