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
---

## [ADR-004] Calibração de Kerning Óptico, Redesign do Selo Técnico em Anel Sólido e Showcase de Mockups
- **Data:** 09/10/2026
- **Status:** Aprovado, Publicado & Em Produção
- **Contexto:** Refinamentos de alta precisão na tipografia, no carimbo técnico e inclusão de aplicações práticas:
  1. O 'A' customizado em 208 upm estava +34% mais espesso que as hastes reais de `I`, `L` e `E` (155 upm), e o espaçamento mecânico causava desconexão óptica no par `A-G`.
  2. O carimbo anterior em traço fino parecia vazio e sofria com desalinhamentos e texto invertido em alguns visualizadores SVG.
  3. Necessidade de demonstrar o impacto prático da identidade visual no mundo real através do acervo de mockups em alta definição.
- **Decisão:**
  1. **Tipografia & Kerning Óptico:** Espessura da haste diagonal do `A` calibrada para exatamente 155 upm (idêntica às hastes de `I`, `L`, `E`). Compensação de kerning óptico distribuída (-16px no par `A-G`, +4px no `G-I`, +9px no `I-L`, +3px no `L-E`), mantendo a ancoragem total de 404.8px na base do símbolo.
  2. **Selo Técnico em Anel Sólido (Master Solid Seal):** Reconstrução completa com anel estrutural em Deep Navy sólido, tipografia curva calculada por trigonometria em caminhos vetoriais puros (zero drift de fonte), marcadores cardeais em losango e núcleo com textura técnica de blueprint e símbolo perfeitamente centralizado no centroide geométrico (300, 300).
  3. **Showcase de Mockups Reais:** Criação de seção dedicada no Manual de Marca exibindo 5 aplicações de alto padrão: Caderno Executivo em Couro, Capacete de Proteção EPI, Cartão de Visita em Hot Stamping, Pasta Institucional de Projetos e Fachada Corporativa em Letra-Caixa.
  4. **Deploy em Produção:** Sincronização e deploy contínuo na VM do Project X (`https://madebypx.com/agile/`) com verificação HTTP 200 em todos os ativos.

---

## [ADR-005] Modernização do Brand Manual, Família Tríade de Carimbos, Grid 2-Colunas de Mockups e Deploy na VM
- **Data:** 09/10/2026
- **Status:** Aprovado, Comitado, Enviado ao GitHub e Publicado na VM
- **Contexto:** Solicitação de modernização estética do cabeçalho, remoção universal de emojis em prol de ícones SVG técnicos, correção no arco e na fonte do carimbo técnico, simplificação do grid de mockups e publicação em ambiente remoto:
  1. A letra "A" no carimbo anterior utilizava o glifo com traço horizontal da fonte padrão e estava tangente à borda superior.
  2. O layout dos mockups demandava menor escala, ausência de ruído textual e apresentação direta em grid de 2 colunas.
  3. A interface do manual exigia um cabeçalho mais moderno e sem emojis infantis em botões.
- **Decisão:**
  1. **Tipografia do Carimbo:** Adoção da geometria proprietária da letra `A` sem traço horizontal (open chevron) e centralização polar pelo centro óptico vertical dos caracteres no anel ($R = 236\text{px}$).
  2. **Tríade de Carimbos Técnicos:** Apresentação e distribuição simultânea dos 3 carimbos oficiais: Institucional Color, Noturno (Dark) e Monocromático (P&B / ABNT).
  3. **Mockups Limpos em 2 Colunas:** Conversão da galeria para um grid balanceado de 2 colunas, sem textos ou títulos, com proporções travadas em `16:10` e foco na imagem.
  4. **Header Moderno & UI Limpa:** Nova navbar em glassmorphism com a assinatura horizontal oficial branca (`agile-logo-horizontal-white.svg`), remoção de emojis e adoção de ícones SVG.
  5. **Repositório GitHub & Deploy na VM:** Criação do repositório remoto `rodrigospena/agile-brand-manual` no GitHub, `git push origin master` e deploy com Nginx recarregado em `https://madebypx.com/agile/` (HTTP/2 200 OK).
