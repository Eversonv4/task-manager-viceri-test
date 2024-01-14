export type TStatus = "backlog" | "doing" | "blocked" | "done" ;

export type TListPack = {
  backlog: string[],
  doing: string[],
  done: string[],
  blocked: string[],
}