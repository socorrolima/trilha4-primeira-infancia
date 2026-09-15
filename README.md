# Primeira Infância no SUAS — Material de Apoio (PAIF)

Wireframe funcional de um material de apoio digital — **não um curso de
capacitação** — sobre vulnerabilidade social, risco social e
intersetorialidade na primeira infância, com base nas páginas 14–43 da
Trilha 4 (*Trabalho Social com Famílias e Territórios no PAIF*).

## O que este projeto é (e o que não é)

É pensado para consulta pontual em campo — um gestor ou técnico do CRAS
abre numa situação específica, encontra a resposta e sai. Por isso:

- **Sem progressão linear.** Navegação por sumário fixo + busca, não por
  "próximo/anterior".
- **Sem quiz de avaliação.** Não existe "aprovação" num material de apoio.
- **Sem checklist com estado salvo.** Os cartões de apoio à decisão (seção
  "Fortalecer a rede") são roteiro de discussão, não tarefa a concluir.
- **Orientação espacial, não progresso.** A barra lateral mostra em qual
  seção você está e quais já visitou *nesta sessão* (scroll-spy), mas isso
  é resetado ao recarregar a página — de propósito.

## Status atual

Este é o **shell/wireframe** — estrutura de navegação, componentes
interativos (modal, tooltip, tabs, accordion) e identidade visual
validados com conteúdo de exemplo. O conteúdo integral das 30 páginas
ainda não foi todo migrado para os componentes.

## Estrutura

```
.
├── index.html        # marcação — 9 blocos de conteúdo + sidebar
├── css/styles.css     # tokens de design e componentes
├── js/app.js          # scroll-spy, tabs, accordion, modal, busca
└── assets/            # (reservado para infográficos/imagens)
```

## Identidade visual

Paleta extraída por amostragem direta do PDF original (não inventada):

| Token | Hex | Uso |
|---|---|---|
| `--green-900` | `#2E4A18` | títulos, estado ativo |
| `--green-700` | `#5C8A1E` | marca, banda (cor de assinatura do PAIF) |
| `--green-100` | `#E7F0D9` | boxes de definição (mesmo padrão do PDF original) |
| `--paper` | `#FBFAF7` | fundo |

Tipografia: [Work Sans](https://fonts.google.com/specimen/Work+Sans).

## Rodando localmente

Não há build step — é HTML/CSS/JS puro.

```bash
# qualquer servidor estático serve
python3 -m http.server 8000
# depois abra http://localhost:8000
```

## Próximos passos

- [ ] Migrar o conteúdo completo das pp. 14–43 para cada bloco
- [ ] Infográfico estático (seção "Impactos na primeira infância")
- [ ] Decidir sobre vídeo opcional de aprofundamento (seção "Gênero, raça e interseccionalidade")
- [ ] Revisar acessibilidade de teclado nos componentes (tabs, accordion)

## Licença

Ver [LICENSE](LICENSE). Conteúdo textual de referência baseado em
material do Ministério do Desenvolvimento e Assistência Social (MDS) —
verificar termos de reuso do PDF-fonte antes de publicação pública.
