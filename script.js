let vitoriasJogador1 = 0;
let vitoriasJogador2 = 0;
let historico = [];

function registrarVitoria(jogador) {

    const nome1 = document.getElementById("nomeJogador1").value;
    const nome2 = document.getElementById("nomeJogador2").value;

    const card1 = document.getElementById("cardJogador1");
    const card2 = document.getElementById("cardJogador2");

    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString("pt-BR") + " " + agora.toLocaleTimeString("pt-BR");

    if (jogador === 1) {
        vitoriasJogador1++;

        card1.classList.add("destaque");
        card2.classList.remove("destaque");

        historico.unshift({
            texto: `🏆 ${nome1} venceu a partida contra ${nome2}`,
            data: dataFormatada,
            vencedor: nome1,
            perdedor: nome2,
            placarVencedorApos: vitoriasJogador1,
            placarPerdedorApos: vitoriasJogador2
        });

    } else {
        vitoriasJogador2++;

        card2.classList.add("destaque");
        card1.classList.remove("destaque");

        historico.unshift({
            texto: `🏆 ${nome2} venceu a partida contra ${nome1}`,
            data: dataFormatada,
            vencedor: nome2,
            perdedor: nome1,
            placarVencedorApos: vitoriasJogador2,
            placarPerdedorApos: vitoriasJogador1
        });
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
        item.textContent = `${partida.texto} — ${partida.data}`;
        lista.appendChild(item);
    });
}

function gerarConteudoExportacao() {
    const nome1 = document.getElementById("nomeJogador1").value;
    const nome2 = document.getElementById("nomeJogador2").value;

    const derrotasJogador1 = vitoriasJogador2;
    const derrotasJogador2 = vitoriasJogador1;

    const agora = new Date();
    const dataExportacao = agora.toLocaleDateString("pt-BR") + " " + agora.toLocaleTimeString("pt-BR");

    let linhas = [];
    linhas.push("PLACAR DE SINUCA");
    linhas.push(`Exportado em: ${dataExportacao}`);
    linhas.push("");
    linhas.push("PLACAR GERAL");
    linhas.push(`${nome1}: ${vitoriasJogador1} vitórias | ${derrotasJogador1} derrotas`);
    linhas.push(`${nome2}: ${vitoriasJogador2} vitórias | ${derrotasJogador2} derrotas`);
    linhas.push(`Total de partidas: ${vitoriasJogador1 + vitoriasJogador2}`);
    linhas.push("");
    linhas.push("HISTÓRICO DAS PARTIDAS");

    if (historico.length === 0) {
        linhas.push("Nenhuma partida registrada.");
    } else {
        // historico está do mais recente para o mais antigo; exporta em ordem cronológica
        const historicoCronologico = [...historico].reverse();
        historicoCronologico.forEach((partida, indice) => {
            linhas.push(
                `${indice + 1}. [${partida.data}] Vencedor: ${partida.vencedor} | Perdedor: ${partida.perdedor} | Placar após a partida: ${partida.vencedor} ${partida.placarVencedorApos} x ${partida.placarPerdedorApos} ${partida.perdedor}`
            );
        });
    }

    return linhas.join("\r\n");
}

async function exportarPlacar() {
    const conteudo = gerarConteudoExportacao();
    const nomeArquivo = `placar-sinuca-${new Date().toISOString().slice(0, 10)}.txt`;

    // Navegadores com suporte à File System Access API (Chrome/Edge) mostram
    // a caixa de diálogo nativa "Salvar como", permitindo escolher a pasta.
    if (window.showSaveFilePicker) {
        try {
            const handle = await window.showSaveFilePicker({
                suggestedName: nomeArquivo,
                types: [
                    {
                        description: "Arquivo de texto",
                        accept: { "text/plain": [".txt"] }
                    }
                ]
            });

            const writable = await handle.createWritable();
            await writable.write(conteudo);
            await writable.close();
            return;
        } catch (erro) {
            // Usuário cancelou a caixa de diálogo: não faz nada.
            if (erro.name === "AbortError") {
                return;
            }
            // Qualquer outro erro: cai no método alternativo abaixo.
        }
    }

    // Alternativa para navegadores sem suporte (Firefox, Safari, etc.):
    // dispara o download padrão, que abre a caixa "Salvar como" do navegador.
    const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = nomeArquivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function exportarPlacarExcel() {
    const nome1 = document.getElementById("nomeJogador1").value;
    const nome2 = document.getElementById("nomeJogador2").value;

    const derrotasJogador1 = vitoriasJogador2;
    const derrotasJogador2 = vitoriasJogador1;

    const agora = new Date();
    const dataExportacao = agora.toLocaleDateString("pt-BR") + " " + agora.toLocaleTimeString("pt-BR");

    // Planilha 1: Placar Geral
    const dadosPlacar = [
        ["PLACAR DE SINUCA"],
        [`Exportado em: ${dataExportacao}`],
        [],
        ["Jogador", "Vitórias", "Derrotas"],
        [nome1, vitoriasJogador1, derrotasJogador1],
        [nome2, vitoriasJogador2, derrotasJogador2],
        [],
        ["Total de partidas", vitoriasJogador1 + vitoriasJogador2]
    ];
    const planilhaPlacar = XLSX.utils.aoa_to_sheet(dadosPlacar);
    planilhaPlacar["!cols"] = [{ wch: 20 }, { wch: 12 }, { wch: 12 }];

    // Planilha 2: Histórico das Partidas (ordem cronológica)
    const cabecalhoHistorico = ["#", "Data", "Vencedor", "Perdedor", "Placar Após a Partida"];
    const linhasHistorico = [];

    if (historico.length === 0) {
        linhasHistorico.push(["Nenhuma partida registrada."]);
    } else {
        const historicoCronologico = [...historico].reverse();
        historicoCronologico.forEach((partida, indice) => {
            linhasHistorico.push([
                indice + 1,
                partida.data,
                partida.vencedor,
                partida.perdedor,
                `${partida.vencedor} ${partida.placarVencedorApos} x ${partida.placarPerdedorApos} ${partida.perdedor}`
            ]);
        });
    }

    const planilhaHistorico = XLSX.utils.aoa_to_sheet([cabecalhoHistorico, ...linhasHistorico]);
    planilhaHistorico["!cols"] = [{ wch: 5 }, { wch: 20 }, { wch: 18 }, { wch: 18 }, { wch: 35 }];

    const livro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(livro, planilhaPlacar, "Placar Geral");
    XLSX.utils.book_append_sheet(livro, planilhaHistorico, "Histórico");

    const nomeArquivo = `placar-sinuca-${new Date().toISOString().slice(0, 10)}.xlsx`;
    XLSX.writeFile(livro, nomeArquivo);
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
