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

Conteúdo das pp. 14–43 (Seção 1 da Trilha 4) **operacionalizado** nos
componentes — não é mais placeholder. Durante a migração do texto
corrigi duas contagens erradas do wireframe inicial:

- O Quadro 1 tem **6 dimensões** de vulnerabilidade/risco, não 4 (faltavam
  "Exposição a discriminações e preconceitos" e "Risco social e pessoal" —
  esta última tratada com estilo visualmente sóbrio, sem a cor de destaque
  das demais, por ser conteúdo sensível).
- A seção "Como fortalecer a rede" tem **10 requisitos**, não 7.

Cada um dos 6 marcos legais agora abre seu próprio modal (antes só a
CF/88 estava funcional). O Quadro 2 traz as 3 colunas completas
(descrição, eixos de integração, resultados esperados) por etapa.

Pendente: revisão de conteúdo pela equipe antes de considerar esta
parte fechada; infográfico visual (hoje é um grid de stat-cards em
texto); decisão sobre vídeo de aprofundamento na seção de gênero/raça.

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
