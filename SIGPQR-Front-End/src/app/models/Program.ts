import {Coordinator} from "./Coordinator";

export class Program {

  constructor(
    public id:number,
    public name:string,
    public faculty_id:number,
    public coordinator_id?:number,
    public created_at?:string,
    public update_at?:string,
    public deleted_at? :string,
    public coordinator?:Coordinator
  ){}
}
