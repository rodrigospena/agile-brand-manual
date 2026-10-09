# Decision Log — Agile Engenharia

## [ADR-001] Definição do Logotipo Oficial — Variante 2 com Abertura Ampla (Opção C: Gap 60px)
- **Data:** 07/10/2026
- **Status:** Aprovado e Publicado
- **Contexto:** Após a exploração de 12 variantes vetoriais e 4 conceitos IA, foi selecionada a Variante 2 (Minimalist Louvers com 4 pavimentos em respiro negativo). Solicitou-se o refinamento da abertura inferior da letra "A" para evitar estrangulamento da base do edifício.
- **Decisão:**
  1. Aprovada a **Opção C (Gap 60px)**, proporcionando respiro arquitetônico amplo, máxima legibilidade em favicon/carimbo e autonomia visual do edifício central.
  2. Grafia oficial estritamente **AGILE** em caixa alta sem acento e sem slogan subordinado.
  3. Gerado pacote completo de assets: SVGs vetoriais (Color, Dark, Mono Black, White), PNGs em alta definição (512px a 2048px com transparência), Favicons (.ico, 32px, 64px, 192px, 512px) e Pacote Master ZIP (`agile-brand-kit-completo.zip`).
  4. Manual de Marca publicado e hospedado na VM de produção do Project X (`https://madebypx.com/agile/`) com tag `noindex, nofollow` e botões de download direto configurados.

---

## [ADR-002] Duplicação do Manual e Redesign Evolutivo v2.0 (A como Sistema de Evolução)
- **Data:** 07/10/2026
- **Status:** Implementado em v2.0 com Painel Comparativo
- **Contexto:** Parecer crítico profissional apontou oportunidades de amadurecimento na marca v1:
  1. Símbolo visualmente pesado: hastes laterais monolíticas e excesso de recortes que viravam ruído na redução.
  2. Faixa laranja ambígua: ausência de clareza formal e topo em losango desconectado parecendo peça solta.
  3. Tipografia genérica com tracking excessivamente aberto.
  4. Proporção vertical restritiva e falta de lockups horizontais calibrados.
- **Decisão:**
  1. Preservação integral do Manual v1 em `brand-manual/` e duplicação da estrutura completa para `brand-manual-v2/`.
  2. Implementação das recomendações técnicas:
     - **Símbolo:** Hastes do "A" esbeltas e refinadas com vão interno ampliado; topo isométrico 100% integrado à coluna (sem bloco solto/flutuante); faixa transformada em fita contínua de evolução ascendente com ranhura negativa arquitetônica de travessão.
     - **Tipografia:** Adoção da família contemporânea *Plus Jakarta Sans* com tracking ponderado (`0.09em`) e proporção óptica áurea.
     - **Paleta Calibrada:** Deep Navy (`#102A43`), Azul Profundo (`#071A33`), Laranja Evolução (`#FF7A1A`), Laranja Luz (`#FF9B4A`), Cinza Neutro (`#667085`), Fundo Claro (`#F8FAFC`).
     - **Painel Comparativo & Testes:** Criação de `brand-manual-v2/redesign-preview.html` comparando os 3 caminhos de evolução (Refinamento Conservador, Fita Contínua, Sistema Modular), testes de redução (16px a 96px), monocromático e lockup horizontal.
     - **Geração de Assets:** Criação dos 15 arquivos vetoriais oficiais v2 em `assets/logos/v2/`, `brand-manual-v2/assets/logos/` e `brand-manual-v2/downloads/svg/`.

---

## [ADR-003] Calibração Óptica da Tipografia ('A' Aberto Compensado), Selo Técnico Magnificado e Auditoria de Entrega
- **Data:** 09/10/2026
- **Status:** Aprovado e Auditado (100% Pass)
- **Contexto:** Ajustes finais solicitados antes do envio ao cliente:
  1. A letra 'A' aberta (sem travessão) causava leve ilusão de afinamento visual em relação às letras G, I, L e E.
  2. O carimbo técnico circular necessitava de maior escala no símbolo central e ampliação dos textos curvos `AGILE` e `ENGENHARIA CIVIL`.
  3. Realização de auditoria rigorosa de 100% dos ativos e links de download.
- **Decisão:**
  1. **Compensação Óptica:** Hastes diagonais do 'A' reforçadas em +24% (208 unidades), ápice recortado geometricamente e vetorização em caminhos puros (`<path>`).
  2. **Carimbo Técnico Magnificado:** Símbolo escalado para `scale(0.40)` no núcleo (raio 188px) e tipografia expandida (`AGILE` em 42px / `ENGENHARIA CIVIL` em 22px).
  3. **Pipeline Completo:** Regeneração de todos os 16 SVGs por diretório, 56 PNGs em alta definição (512px a 2048px), favicons e `agile-brand-kit-completo.zip`.
  4. **Auditoria Geral:** Execução do script `scripts/audit-client-delivery.mjs` com 259/259 verificações aprovadas (0 falhas) registrado em `.ai/audits/AUDIT-CLIENT-DELIVERY.md`.
