let vitoriasJogador1 = 0;
let vitoriasJogador2 = 0;
let historico = [];

function registrarVitoria(jogador) {

    const nome1 = document.getElementById("nomeJogador1").value;
    const nome2 = document.getElementById("nomeJogador2").value;

    const card1 = document.getElementById("cardJogador1");
    const card2 = document.getElementById("cardJogador2");

    if (jogador === 1) {
        vitoriasJogador1++;

        card1.classList.add("destaque");
        card2.classList.remove("destaque");

        historico.unshift(
            `🏆 ${nome1} venceu a partida contra ${nome2}`
        );

    } else {
        vitoriasJogador2++;

        card2.classList.add("destaque");
        card1.classList.remove("destaque");

        historico.unshift(
            `🏆 ${nome2} venceu a partida contra ${nome1}`
        );
    }

    atualizarTela();
}

function atualizarTela() {

    const nome1 = document.getElementById("nomeJogador1").value;
    const nome2 = document.getElementById("nomeJogador2").value;

    document.getElementById("placar1").innerText = vitoriasJogador1;
    document.getElementById("placar2").innerText = vitoriasJogador2;

    const derrotasJogador1 = vitoriasJogador2;
    const derrotasJogador2 = vitoriasJogador1;

    document.getElementById("estatisticasJogador1").innerHTML =
        `🎱 ${nome1}: ${vitoriasJogador1} vitórias | ${derrotasJogador1} derrotas`;

    document.getElementById("estatisticasJogador2").innerHTML =
        `🎱 ${nome2}: ${vitoriasJogador2} vitórias | ${derrotasJogador2} derrotas`;

    document.getElementById("totalPartidas").innerHTML =
        `📌 Total de partidas: ${vitoriasJogador1 + vitoriasJogador2}`;

    const lista = document.getElementById("listaHistorico");
    lista.innerHTML = "";

    historico.forEach(partida => {
        const item = document.createElement("li");
        item.textContent = partida;
        lista.appendChild(item);
    });
}

function resetarPlacar() {

    vitoriasJogador1 = 0;
    vitoriasJogador2 = 0;
    historico = [];

    document.getElementById("cardJogador1").classList.remove("destaque");
    document.getElementById("cardJogador2").classList.remove("destaque");

    atualizarTela();
}

atualizarTela();