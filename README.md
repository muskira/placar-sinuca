# 🎱 Placar de Sinuca

Projeto simples desenvolvido com **HTML, CSS e JavaScript** para registrar partidas de sinuca entre dois jogadores.

## Funcionalidades

* Cadastro do nome dos jogadores.
* Registro de vitórias.
* Atualização automática do placar.
* Exibição de estatísticas:

  * Vitórias
  * Derrotas
  * Total de partidas
* Histórico das partidas.
* Destaque visual para o último vencedor.
* Botão para reiniciar o placar.

## Estrutura do Projeto

```text
📁 projeto/
│
├── index.html     # Estrutura da página
├── style.css      # Estilos da interface
├── script.js      # Lógica do placar
└── README.md
```

## Descrição dos Arquivos

### `index.html`

Responsável pela estrutura da aplicação, contendo:

* Campos para os nomes dos jogadores;
* Cartões dos jogadores;
* Placar;
* Estatísticas;
* Histórico das partidas;
* Botões para registrar vitória e resetar o placar.

---

### `style.css`

Define toda a aparência da aplicação:

* Layout da página;
* Cores e fontes;
* Destaque do jogador vencedor;
* Organização dos cartões e histórico.

---

### `script.js`

Contém toda a lógica da aplicação.

Principais funções:

* `registrarVitoria(jogador)`

  * Incrementa a vitória do jogador selecionado.
  * Atualiza o histórico.
  * Destaca o vencedor.
  * Atualiza a tela.

* `atualizarTela()`

  * Atualiza o placar.
  * Calcula vitórias e derrotas.
  * Exibe o total de partidas.
  * Atualiza o histórico.

* `resetarPlacar()`

  * Zera todas as estatísticas.
  * Limpa o histórico.
  * Remove o destaque dos jogadores.

## Como executar

1. Faça o download ou clone o projeto.
2. Abra o arquivo `index.html` em qualquer navegador.
3. Informe os nomes dos jogadores.
4. Clique no botão correspondente ao vencedor de cada partida.

## Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript (Vanilla)

## Autor

Projeto desenvolvido para fins de estudo sobre manipulação do DOM e JavaScript.
