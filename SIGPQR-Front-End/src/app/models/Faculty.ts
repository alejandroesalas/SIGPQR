import {Program} from "./Program";

export class Faculty {
  constructor(
        public id:number,
        public name:string,
        public created_at:string,
        public update_at:string,
        public deleted_at :string,
        public programs?:Array<Program>
  ){}
}
