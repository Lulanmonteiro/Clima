function buscarClima() {
    const cidade = document.getElementById("cidade").value;
    if (!cidade) {
        alert("Digite uma cidade!");
        return;
    }

    fetch(`/clima?cidade=${cidade}`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert("Cidade não encontrada!");
                return;
            }

            document.getElementById("cidade-nome").textContent = data.cidade;
            document.getElementById("descricao").textContent = data.descricao;
            document.getElementById("icone").src = data.icone;
            document.getElementById("temperatura").textContent = data.temperatura;
            document.getElementById("vento").textContent = data.vento;
            document.getElementById("umidade").textContent = data.umidade;
            document.getElementById("sensacao").textContent = data.sensacao_termica;
            document.getElementById("pressao").textContent = data.pressao;

            document.getElementById("resultado").classList.remove("hidden");
        })
        .catch(error => console.error("Erro ao buscar o clima:", error));
}
