import {Program} from "./Program";
import {AttachmentRequest} from "./AttachmentRequest";

export const enum STATUS_TYPE {
  _onProcess ='en proceso',
  _open ='abierta',
  _closed = 'cerrada'
}
export class _Request {
  constructor(
    public id:number,
    public title:string,
    public description:string,
    public student_id:number,
    public request_type_id:number,
    public program_id:number,
    public status:string,
    public program?:Program,
    public attachments?:Array<AttachmentRequest>,
    public created_at?:string
  ){
  }

}
