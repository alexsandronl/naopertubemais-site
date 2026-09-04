# Aprendizados — naopertubemais-site

> Registro **vivo e genérico** de lições, erros já cometidos e métodos que
> evitam retrabalho. **Leitura obrigatória antes de implementar algo novo**, e
> todo aprendizado novo entra aqui **no momento em que for descoberto** — não
> no fim da tarefa, quando o detalhe que importava já se perdeu.
>
> **Subagentes**: ler este documento **e** o [`AGENTS.md`](../AGENTS.md) é
> obrigatório. O prompt que delega **deve exigir as duas leituras**.
>
> Método trazido do Gefrota Neo, onde provou valor.

---

## 1. A lição que governa as outras

**Regra escrita só funciona se houver um GATILHO consultado no momento exato da
ação que a violaria.** Documento se lê no começo da sessão e se esquece no meio.

A prova mais cara (noutro projeto desta máquina, ITPLAY CAMERA): a proibição de
apagar pasta recursivamente **já estava escrita** no AGENTS quando um
`Remove-Item -Recurse -Force` destruiu o banco e o acervo do usuário.

Consequências práticas:

1. **Toda regra nova nasce com o seu gatilho** — a pergunta que o agente se faz
   no instante da ação, não um parágrafo lido no início.
2. **Toda regra crítica mecanicamente verificável vira tripwire** em
   [`.opencode/plugin/guardrails.ts`](../.opencode/plugin/guardrails.ts).
3. **Portão de rodada anterior expira.** Norma herdada de um loop passado
   sobrescreve a regra escrita se ninguém declarar que aquele contexto acabou.

> Regra escrita orienta; regra imposta pela ferramenta garante.

---

## 2. Erros já cometidos

Ainda vazio — o primeiro erro cometido e diagnosticado entra aqui.

---

## 3. Regras de método que provaram valor

- **Verificação observada, nunca inferida.** HTML só se aprova abrindo no
  navegador e **olhando o pixel** — inclusive em 1366×768 e mobile.
- **Evidência positiva, nunca ausência de erro.**
- **Auditoria enumerada, nunca por amostragem.**
- **Nunca apagar um teste que falha** — ajustá-lo ao comportamento correto.

---

## 4. Delegação a subagente

- Prompt com: objetivo verificável, âncoras `arquivo:linha`, limites de escopo,
  se edita ou só pesquisa, e **como validar**.
- Exigir leitura de `AGENTS.md` **e** deste documento.
- **Resultado de subagente é hipótese** até o agente principal reverificar.

---

## 5. Onde está o resto do conhecimento

| Assunto | Onde |
|---|---|
| Regras vinculantes e convenções | [`AGENTS.md`](../AGENTS.md) |
| Tripwires mecânicos | [`.opencode/plugin/guardrails.ts`](../.opencode/plugin/guardrails.ts) |
| Memória semântica (ferramenta `memory`) | pesquise **antes** de começar |
