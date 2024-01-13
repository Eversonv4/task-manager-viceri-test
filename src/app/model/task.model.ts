type TStatus = "backlog" | "doing" | "blocked" | "done" ;

export class Task {
  title: string = "";
  status: TStatus = "backlog";
  color: string = "";

  colorsOptions = {
    backlog: "#ccc",
    doing: "#fec218",
    done: "#0ee07e",
    blocked: "#f32d48"
  }

  constructor(title: string, status: TStatus = "backlog") {
    this.title = title;
    this.status = status;
    this.color = this.colorsOptions[status]
  }
}