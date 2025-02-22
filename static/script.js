function buscarClima() {
    const cidade = document.getElementById("cidade").value;
    if (!cidade) {
        alert("Digite uma cidade!");
        return;
    }

    const apiKey = "506a80532eade5d8241b2807f8da4dd3"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                alert("Cidade não encontrada!");
                return;
            }

            document.getElementById("cidade-nome").textContent = data.name;
            document.getElementById("descricao").textContent = data.weather[0].description;
            document.getElementById("icone").src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
            document.getElementById("temperatura").textContent = data.main.temp;
            document.getElementById("vento").textContent = data.wind.speed;
            document.getElementById("umidade").textContent = data.main.humidity;
            document.getElementById("sensacao").textContent = data.main.feels_like;
            document.getElementById("pressao").textContent = data.main.pressure;

            document.getElementById("resultado").classList.remove("hidden");
        })
        .catch(error => console.error("Erro ao buscar o clima:", error));
}
