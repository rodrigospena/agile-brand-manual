# Design System & Guidelines — Agile Engenharia

Diretrizes de identidade visual, geometria vetorial, proporções e tokens de design para a marca **Agile** (Engenharia Civil e Regularização Imobiliária).

---

## 1. Conceito e Anatomia do Símbolo

O símbolo da **Agile** é uma fusão geométrica de três elementos estruturais:
1. **A Letra "A":** Estrutura arquitetônica imponente com ângulo de abertura de 60°, representando sustentação, fundação e a inicial da marca.
2. **O Edifício Isométrico Central:** O espaço interno / recorte negativo e positivo modela uma edificação em perspectiva isométrica (30°), simbolizando a edificação que está sendo regularizada, o código de obras e a engenharia civil.
3. **O Vetor de Ascensão (Seta para o Topo):** O ápice do "A" e a cumeeira do edifício convergem para cima, transmitindo aprovação rápida, evolução patrimonial e agilidade nos trâmites da prefeitura.

---

## 2. Design Tokens & Paleta Cromática

### Cores Primárias Institucionais

| Token | Nome | HEX | RGB | CMYK | Pantone | Uso |
|---|---|---|---|---|---|---|
| `--color-navy-900` | Deep Navy | `#0B1B3D` | `11, 27, 61` | `82, 56, 0, 76` | `282 C` | Cor mestra institucional, fundos nobres, tipografia principal |
| `--color-navy-800` | Blueprint Navy | `#12244E` | `18, 36, 78` | `77, 54, 0, 69` | `281 C` | Superfícies secundárias, cartões, sombras técnicas |
| `--color-orange-500`| Safety Orange | `#FF6B00` | `255, 107, 0`| `0, 58, 100, 0` | `1505 C`| Acento de agilidade, prisma isométrico iluminado, CTAs |
| `--color-orange-600`| Amber Rust | `#E65A00` | `230, 90, 0` | `0, 61, 100, 10`| `1665 C`| Face sombreada do prisma isométrico |
| `--color-white` | Pure White | `#FFFFFF` | `255, 255, 255`| `0, 0, 0, 0` | — | Fundo padrão, versões negativas do logotipo |
| `--color-slate-100` | Technical Light | `#F1F5F9` | `241, 245, 249`| `3, 2, 0, 2` | `Cool Gray 1 C` | Fundo de pranchas, painéis e contraste suave |
| `--color-slate-700` | Steel Gray | `#334155` | `51, 65, 85` | `40, 24, 0, 67` | `7545 C` | Textos auxiliares e subtítulos técnicos |

---

## 3. Tipografia

### Tipografia Principal (Logotipo)
- **Família:** `Montserrat` (ou `Inter` / `Space Grotesk`)
- **Estilo no Logotipo:** `Bold` / `SemiBold` com tracking expandido (`letter-spacing: 0.18em`) em caixa alta (**AGILE**).
- **Regra Fundamental:** Estritamente **SEM ACENTO** ("AGILE", não "ÁGILE").

### Tipografia da Tagline / Assinatura
- **Texto:** `ENGENHARIA E REGULARIZAÇÃO` ou `REGULARIZAÇÃO DE IMÓVEIS`
- **Estilo:** `Medium` com tracking ultra-expandido (`letter-spacing: 0.28em`), corpo proporcional a 25% da altura da marca principal.

### Tipografia Institucional (Manual e Web)
- **Títulos (Headings):** `Montserrat`, `Syne` ou `Outfit` (sans-serif geométrica de alta precisão).
- **Corpo de Texto (Body):** `Inter` ou `Plus Jakarta Sans` (ótima legibilidade técnica para formulários e memoriais descritivos).
- **Códigos e Medidas (Mono):** `JetBrains Mono` ou `Fira Code`.

---

## 4. Geometria, Proporções e Área de Proteção (Logometria)

- **Módulo Básico (X):** A espessura da haste diagonal da letra "A" define a unidade modular $X$.
- **Área de Não-Interferência (Safe Zone):** Nenhum elemento gráfico, margem de prancha ou texto deve invadir a zona perimetral de no mínimo $1.5X$ ao redor do conjunto marcário.
- **Redução Mínima:**
  - Versão Completa com Tagline: Mínimo de $32\text{mm}$ (impressão) ou $140\text{px}$ (telas).
  - Versão Símbolo Isolado: Mínimo de $8\text{mm}$ (impressão) ou $20\text{px}$ (telas/favicons).

---

## 5. Regras de Aplicação e Restrições

### Usos Recomendados:
1. **Aplicação Principal:** Símbolo bicolor (Navy + Orange) sobre fundo branco ou neutro claro.
2. **Aplicação Dark / Noturna:** Símbolo iluminado (White + Orange) sobre fundo Deep Navy (`#0B1B3D`).
3. **Aplicação Monocromática / Técnica:** 100% Preto sobre pranchas de prefeitura em preto e branco, ou 100% Branco sobre fundo escuro.

### Usos Proibidos (Incorretos):
- ❌ Adicionar acento gráfico sobre o "A" ("Ágile").
- ❌ Alterar as proporções ou achatar horizontal/verticalmente o símbolo.
- ❌ Inverter a ordem das cores (ex: colocar o "A" em laranja e o prédio em azul claro desbotado).
- ❌ Aplicar sombras difusas desnecessárias, relevos 3D antiquados ou chanfros de baixa resolução.
- ❌ Aplicar o logotipo sobre fundos com baixo contraste (ex: laranja sobre vermelho).
