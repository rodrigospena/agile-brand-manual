# Task Spec — SPEC-02: Calibração Óptica da Tipografia, Selo Técnico & Auditoria de Entrega ao Cliente

Especificação ativa para calibração milimétrica da tipografia oficial, ampliação e ajuste do carimbo técnico circular, geração de assets vetoriais definitivos e auditoria integral de entrega ao cliente.

---

## 1. Goal

1. **Calibrar Opticamente o 'A' Aberto (Sem Travessão):** Eliminar a ilusão de ótica de afinamento reforçando o peso das hastes diagonais (+18% a +25%) e ajustando o ápice e proporções para casar em peso e massa visual absoluta com as letras `G`, `I`, `L`, `E`.
2. **Ampliar e Refinar o Selo/Carimbo Técnico Circular:** Aumentar o tamanho do símbolo central no núcleo do círculo e ampliar os textos em arco curvo `AGILE` (topo) e `ENGENHARIA CIVIL` (base) para máxima imponência e legibilidade em pranchas técnicas e selos municipais.
3. **Auditoria Geral Pré-Entrega (/audit):** Inspecionar e validar 100% dos assets vetoriais (SVGs), PNGs em alta definição, pacotes ZIP, links de download, tipografias, tokens CSS e páginas do Manual de Marca (`brand-manual/index.html` e complementos) para garantir zero inconsistências antes do envio ao cliente.

---

## 2. Strategic & Audit Alignment

- **Alinhamento do Negócio:** Entrega de um pacote de identidade visual impecável, com pureza vetorial profissional pronta para uso imediato pelo cliente em qualquer escala (de favicon a fachadas e pranchas DWG).
- **Conformidade de Marca (INV-001):** Grafia oficial estritamente **Agile** (sem acento agudo).
- **Conformidade Cromática (INV-002):** Deep Navy (`#0B1B3D`), Safety Orange (`#FF6B00`), White (`#FFFFFF`) e Black puro para monocromático.
- **Pureza Vetorial (INV-003):** Vetores limpos, sem fontes não renderizadas ou dependências externas frágeis — wordmark convertido em caminhos vetoriais fechados (`path data`) para máxima confiabilidade.

---

## 3. Scope (In / Out)

### In Scope
- [x] Construção do algoritmo vetorial de compensação óptica de peso para a letra `A` aberta + `G`, `I`, `L`, `E` em curvas puras.
- [x] Reconstrução do Carimbo Técnico (`agile-technical-stamp.svg` e versão monocromática) com símbolo central ampliado e tipografia em arco magnificada.
- [x] Atualização de todos os lockups oficiais (Primary Vertical, Horizontal, Símbolo, Carimbo, Favicon) em todas as variações cromáticas (Color, Dark, White, Mono).
- [x] Renderização de novos PNGs de alta resolução (512px, 1024px, 2048px).
- [x] Atualização do pacote de download ZIP e links no Manual de Marca.
- [x] Auditoria automatizada e manual de todos os arquivos, downloads e integridade visual.

### Out of Scope
- Alterações na geometria do símbolo Option C (Gap 60px) que já foi aprovado.
- Reestruturação da arquitetura geral do manual.

---

## 4. Proposed Changes & Technical Flow

1. **Script de Geração Vetorial de Precisão (`scripts/build-official-final-c.mjs` / `scripts/export-all-formats.mjs`):**
   - Calcular espessura diagonal do `A` aberto com compensação de ~25px a 27px perpendicular (matching exato com a espessura das hastes verticais de `I`, `L`, `E` e do arco do `G`).
   - Gerar o selo técnico com raio e escala do símbolo aumentados de 0.32 para ~0.40 e fontes dos arcos redimensionadas e com tracking calibrado.
   - Escrever os SVGs finais com caminhos vetoriais puros (`<path d="..." />`).
2. **Exportação de PNGs e Pacotes:**
   - Gerar PNGs transparentes via renderizador SVG nativo/Resvg/Puppeteer/Canvas.
   - Atualizar `agile-brand-kit-completo.zip` com a árvore completa de pastas (`/svg`, `/png`, `/carimbos`, `/favicons`).
3. **Manual de Marca (`brand-manual/index.html`):**
   - Atualizar previews, cartões de download e tags interativas.
4. **Execução de Auditoria Completa:**
   - Script de teste e checagem de integridade de arquivos, links HTTP, integridade de SVGs e validação de textos.

---

## 5. Acceptance Criteria & Validation Plan

- [ ] A letra `A` aberta possui espessura óptica idêntica e harmônica em relação a `G`, `I`, `L`, `E`.
- [ ] O carimbo técnico possui o símbolo central destacado e os textos `AGILE` e `ENGENHARIA CIVIL` grandes e legíveis.
- [ ] Todos os arquivos SVG em `assets/logos/official/`, `assets/logos/exports/`, `brand-manual/assets/` e `brand-manual/downloads/` estão sincronizados e com código validado.
- [ ] Todos os botões de download do Manual de Marca funcionam e baixam arquivos existentes e atualizados.
- [ ] Teste de auditoria geral executado com 100% de aprovação (0 inconsistências encontradas).