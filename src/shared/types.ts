export type TStatus = "backlog" | "doing" | "blocked" | "done";

export type TListPack = {
  backlog: string[],
  doing: string[],
  done: string[],
  blocked: string[],
}

export const Colors = {
  "À Fazer": "#737373",
  "Em andamento": "#ffcf2d",
  "Bloqueada": "#ff2321",
  "Concluída":  "#35fd4a"
};