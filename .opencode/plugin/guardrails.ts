// =============================================================================
// guardrails.ts — tripwires MECÂNICOS das regras deste projeto.
//
// Método trazido do Gefrota Neo (lição 36 do APRENDIZADOS de lá):
//
//   REGRA ESCRITA ORIENTA; REGRA IMPOSTA PELA FERRAMENTA GARANTE.
//
// Regra em documento só funciona se houver um GATILHO consultado no momento
// exato da ação que a violaria. Noutro projeto desta máquina (ITPLAY CAMERA),
// um `Remove-Item -Recurse -Force` destruiu o banco e o acervo do usuário —
// com a regra já escrita no AGENTS.md. Não adiantou.
//
// Este plugin intercepta TODO comando bash antes de executar e RECUSA as
// famílias catalogadas. O agente vê a regra na mensagem e se corrige sozinho.
//
// Contexto deste repo: site estático (HTML puro), sem build e sem suíte.
//
// MANUTENÇÃO: toda regra crítica nova mecanicamente verificável DEVE ganhar
// uma entrada aqui. Plugin só recarrega na subida do opencode.
// =============================================================================
import type { Plugin } from "@opencode-ai/plugin"

interface Tripwire {
  padrao: RegExp
  regra: string
}

const TRIPWIRES: Tripwire[] = [
  // ----------------------------------------------------- destruição de dado
  {
    padrao: /Remove-Item\s+(?=[^\n;|]*-Recurse)(?=[^\n;|]*-Force)/i,
    regra:
      "REGRA ABSOLUTA (AGENTS global): nunca apagar pasta recursivamente sem listar o conteúdo antes e procurar dado. -Force NÃO usa a lixeira. Liste primeiro; apague por padrão de arquivo.",
  },
  {
    padrao: /\brm\s+-[a-z]*r[a-z]*f|\brm\s+-[a-z]*f[a-z]*r/i,
    regra:
      "REGRA ABSOLUTA (AGENTS global): rm -rf não usa lixeira. Liste o conteúdo antes e apague seletivamente.",
  },
  {
    padrao: /git\s+clean\s+-[a-z]*[fdx]/i,
    regra:
      "REGRA ABSOLUTA (AGENTS global): git clean -fdx destrói untracked sem lixeira. `git clean -n` primeiro e confirmação explícita do usuário.",
  },

  // ----------------------------------------------------------- git destrutivo
  {
    padrao: /git\s+push\s[^\n;|]*(--force\b|-f\b)/i,
    regra:
      "AGENTS global: force-push proibido sem pedido explícito do usuário NESTA conversa.",
  },
  {
    padrao: /git\s+commit\s[^\n;|]*--amend/i,
    regra:
      "AGENTS global: amend proibido sem pedido explícito. Commit que falhou = commit novo.",
  },
  {
    padrao: /git\s+(reset\s+--hard|checkout\s+\.\s*$)/i,
    regra:
      "AGENTS global: descarte em massa de alteração local exige confirmação explícita — trabalho não commitado não tem lixeira.",
  },

  // ------------------------------------------- processos e servidores no ar
  {
    padrao:
      /Stop-Process\s[^\n;|]*-Name\s+(node|python)\b|taskkill\s[^\n;|]*\/im\s+(node|python)/i,
    regra:
      "AGENTS global: não matar processo em massa por nome — outros servidores e agentes usam o mesmo executável. Descubra o PID exato pela porta e mate só ele.",
  },

  // ----------------------------------------- edição de código que falha calada
  {
    padrao: /(Get-Content|\$\w+)\s[^\n]*\|\s*ForEach-Object\s*\{[^\n]*-replace|\.Replace\([^\n]*\)\s*\|\s*Set-Content/i,
    regra:
      "Armadilha medida (ITPLAY CAMERA): -replace/.Replace() do PowerShell devolve o texto ORIGINAL sem reclamar quando a âncora não casa — a alteração simplesmente não existe. Use a ferramenta de edição, que FALHA quando a âncora não bate.",
  },
]

export default (async () => {
  return {
    "tool.execute.before": async (input, output) => {
      if (input.tool !== "bash") return

      const comando: string = String(output.args?.command ?? "")

      // Válvula auditável: quando o USUÁRIO autorizou explicitamente a ação
      // nesta conversa, o agente prefixa o comando com o marcador — que fica
      // no histórico junto do comando. Usar sem autorização é violação grave.
      if (comando.includes("GUARDRAIL_LIBERADO_PELO_USUARIO")) return

      for (const t of TRIPWIRES) {
        if (t.padrao.test(comando)) {
          throw new Error(
            `⛔ GUARDRAIL DO PROJETO — comando bloqueado.\n${t.regra}\n` +
              `Comando recusado: ${comando.slice(0, 200)}\n` +
              `Corrija sozinho e siga (NÃO pare o fluxo nem peça aprovação). ` +
              `Somente se o USUÁRIO tiver autorizado explicitamente esta ação NESTA conversa, ` +
              `reexecute prefixando: $env:GUARDRAIL_LIBERADO_PELO_USUARIO=1; <comando>`,
          )
        }
      }
    },
  }
}) satisfies Plugin
