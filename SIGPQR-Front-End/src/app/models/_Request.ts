import {Program} from "./Program";

export const enum STATUS_TYPE {
  _new ='en espera',
  _open ='abierto',
  _closed = 'cerrada'
}
export class _Request {

  constructor(
    public id:number,
    public title:string,
    public description:string,
    public student_id:number,
    public status:string,
    public program_id:number,
    public created_at:string
  ){
  }

}
