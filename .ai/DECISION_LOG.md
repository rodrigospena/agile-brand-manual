# Architectural & Product Decision Log — Agile

This log records durable decisions made for the Agile project.
Entries are appended chronologically. Do not rewrite past entries.

---

## ADR-001: Remoção do Acento Gráfico na Marca Oficial (Agile)
- **Status:** Aprovado
- **Data:** 2026-10-07
- **Contexto:** As primeiras referências visuais geradas por IA continham a escrita "Ágile" (com acento agudo).
- **Decisão:** Padronizar oficialmente a marca institucional como **Agile** (sem acento), alinhando modernidade, internacionalização e a grafia solicitada pelo cliente.
- **Consequências:** Todos os vetores, manuais e materiais de comunicação passam a utilizar exclusivamente "Agile" / "AGILE".

---

## ADR-002: Adoção do Formato SVG Puro e Arquitetura Modular de Variantes
- **Status:** Aprovado
- **Data:** 2026-10-07
- **Contexto:** Necessidade de alta precisão técnica para reprodução em pranchas de engenharia (DWG/PDF), selos de prefeitura, favicons e grandes formatos (tapumes/veículos).
- **Decisão:** Construir todos os ativos em SVG puro baseado em coordenadas e paths escaláveis, organizados em variantes com lockups modulares.
- **Consequências:** Resolução infinita, renderização ultrarrápida na web e compatibilidade direta com plotters e impressoras industriais.

---

## ADR-003: Manual de Marca como Web App Interativo (HTML5 / Vanilla CSS)
- **Status:** Aprovado
- **Data:** 2026-10-07
- **Contexto:** Manuais estáticos em PDF são pouco dinâmicos para cópia de códigos HEX/Pantone e testes ao vivo de contraste.
- **Decisão:** Desenvolver o Manual de Marca como uma aplicação web moderna com tokens CSS, simuladores de fundo, cópia de 1-clique e painel de eliminação de logos.
- **Consequências:** Experiência de marca muito superior para o cliente e equipe interna.

---

## ADR-004: Escolha Oficial da Variante 2 (Minimalist Louvers) Sem Slogan
- **Status:** Aprovado
- **Data:** 2026-10-07
- **Contexto:** Após teste e comparação de múltiplas variações e concepts, foi definida a identidade visual definitiva da marca.
- **Decisão:** A marca oficial da Agile passa a ser baseada exclusivamente na **Variante 2 (Minimalist Louvers)**, composta estritamente pelo **Símbolo Arquitetônico (Letra A + Edifício com 4 pavimentos em respiro negativo) + Logotipo AGILE em caixa alta**, sem inclusão de slogan/tagline subordinado.
- **Consequências:** O design ganha máxima solidez, atemporalidade e clareza visual, funcionando com perfeição em qualquer escala e suporte técnico.
