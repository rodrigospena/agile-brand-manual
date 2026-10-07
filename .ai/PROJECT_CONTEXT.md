# Project Context — Agile Engenharia

This file contains durable, project-specific facts for Agile.
Update it when product priorities, brand identity, or conventions change in a lasting way.

---

## Product / Brand

**Name:**
Agile (sem acento no logotipo oficial)

**Segment:**
Engenharia Civil especializada em Legalização, Aprovação de Projetos e Regularização Imobiliária na Prefeitura e Cartórios.

**Summary:**
Empresa de engenharia civil focada em desburocratizar e acelerar a regularização de imóveis, aprovação de plantas, emissão de alvarás e habite-se junto aos órgãos públicos municipais e cartoriais, entregando segurança jurídica e técnica completa para proprietários e construtores.

**Target user / Client:**
- Proprietários de imóveis comerciais e residenciais com pendências na prefeitura.
- Construtores, incorporadores e arquitetos que necessitam de aprovação ágil de projetos e licenças.
- Empresas que buscam alvará de funcionamento e conformidade edilícia.

**Core value:**
Agilidade no trâmite burocrático aliado à máxima precisão técnica e segurança jurídica para regularização patrimonial definitiva.

---

## Brand Pillars & Values

1. **Agilidade:** Soluções rápidas e eficientes na tramitação de processos e aprovações.
2. **Confiança:** Segurança jurídica, transparência e tranquilidade documental para o cliente.
3. **Conhecimento Técnico:** Expertise rigorosa em código de obras, legislação municipal e normas de engenharia.
4. **Regularização Total:** Cuidado integral de ponta a ponta — do levantamento técnico e projeto arquitetônico até a averbação no cartório.

---

## Brand Priorities

In order:

1. **Clareza e Reconhecimento:** Símbolo marcante que sintetiza a letra "A" arquitetônica + edifício/regularização + vetor de ascensão.
2. **Autoridade e Sofisticação:** Paleta institucional de alto impacto (Azul Marinho Profundo `#0B1B3D` e Laranja Construção `#FF6B00`).
3. **Versatilidade de Aplicação:** Perfeita legibilidade desde favicons de 16px, carimbos de prancha técnica em DWG/PDF, até fachadas e capacetes de obra.
4. **Padronização e Rigor:** Manual de marca interativo com especificações milimétricas de proporção, logometria e paletas cromáticas.

**Anti-priorities — explicitly avoid:**
- Usar acento no nome da marca (o nome oficial da marca é **Agile**, sem acento agudo).
- Ícones genéricos de capacete ou chave de fenda comuns; a marca deve transmitir alta engenharia, gestão e legalização.
- Gradientes complexos que não funcionem em plotagens monocromáticas e carimbos de prefeitura.

---

## Technical Stack & Deliverables

**Design System & Assets:**
- Formato vetorial padrão: Pure SVG (Scalable Vector Graphics) com viewBox padronizado.
- Web Brand Manual: HTML5 semântico, Vanilla CSS (com CSS Custom Properties / Tokens) e JavaScript moderno (ES6+).
- Tipografia: Famílias de alto padrão geométrico (Montserrat, Inter, Syne / Space Grotesk).

---

## Directory Structure

```text
Agile/
├── .ai/                         # PXOS framework (AI_BASE, PROJECT_CONTEXT, DESIGN, DECISION_LOG, etc.)
├── assets/
│   ├── references/              # Imagens e referências conceituais originais
│   ├── logos/                   # SVGs oficiais (variantes, lockups, carimbos, favicons)
│   └── icons/                   # Ícones institucionais vetorizados dos 4 pilares
├── brand-manual/                # Manual de Marca Interativo (Web Application)
│   ├── index.html               # Manual de Marca completo
│   ├── selector.html            # Painel de Eliminação & Comparação de Logos
│   ├── css/                     # Tokens e estilos
│   └── js/                      # Interatividade e utilitários
└── .internal/                   # Quarentena para notas internas e rascunhos
```

---

## Critical Invariants

- **INV-001 (Nome da Marca):** A grafia institucional no logotipo é estritamente **Agile** / **AGILE** (sem acento gráfico).
- **INV-002 (Cores Oficiais):**
  - Primária: Deep Navy `#0B1B3D` (RGB: 11, 27, 61 | CMYK: 82, 56, 0, 76 | Pantone: 282 C)
  - Acento/Energia: Safety Orange `#FF6B00` (RGB: 255, 107, 0 | CMYK: 0, 58, 100, 0 | Pantone: 1505 C)
  - Apoio/Claro: Pure White `#FFFFFF` / Slate Off-White `#F8FAFC`
- **INV-003 (Pureza Vetorial):** Todos os logos em `assets/logos/` devem ser SVGs limpos, sem rastros de bitmaps embutidos.
