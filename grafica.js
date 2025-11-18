document.addEventListener("DOMContentLoaded", function () {
    var chart = document.getElementById("myPieChart");
    var myPieChart = new Chart(chart, {
        type: 'doughnut',
        data: {
            labels: ["Masculino", "Femenino"],
            datasets: [{
                data: [generoData.masculino, generoData.femenino], // Usamos la variable global generoData
                backgroundColor: ['#007bff', '#dc3545'],
            }],
        },
    });
});


