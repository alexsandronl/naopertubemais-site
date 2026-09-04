# AGENTS.md — Instruções para Agentes de IA

> **IDIOMA**: PT-BR em mensagens, commits e planejamento. Código/libs: inglês.
> **RETOMADA PÓS-COMPACTAÇÃO**: Reler este arquivo + arquivos relevantes antes de continuar. Nunca assumir estado sem verificar no código.
> **TODO**: usar TODO nativo do OpenCode para rastrear progresso da sessão.

## Guardrails mecânicos

As regras críticas deste repo são também **MECÂNICAS**: o plugin
[`.opencode/plugin/guardrails.ts`](.opencode/plugin/guardrails.ts) recusa remoção
recursiva, `git clean`, git destrutivo, kill em massa e edição via
`-replace | Set-Content` **antes de executarem**. Regra escrita orienta; regra
imposta pela ferramenta garante. Toda regra crítica nova mecanicamente
verificável deve ganhar um tripwire lá.

## Antes de começar qualquer tarefa

1. **Pesquise a memória do projeto** (`memory search "<termo>"`).
2. **Leia [`docs/APRENDIZADOS.md`](docs/APRENDIZADOS.md)** — todo aprendizado
   novo entra lá **no momento da descoberta**, não no fim da tarefa.
3. **Todo SUBAGENTE lê este arquivo E o `APRENDIZADOS.md`** — o prompt que o
   delega deve exigir as duas leituras explicitamente.

## Sessão Atual

- **Módulo em andamento:** _______
- **Objetivo da sessão:** _______
- **Pendências:** usar `/todo` no OpenCode

## Projeto

<!-- Descreva o projeto aqui -->

## Convenções

<!-- Adicione convenções do projeto aqui -->

