export class AttachmentRequest {

 constructor(
   private _id:number,
  private _name:string,
  private _route:string,
  private _request_id:number,
  private _created_at?:string,
  private _updated_at?:string,
  private _deleted_at?:string,
 ){

 }

  get id(): number {
    return this._id;
  }
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get route(): string {
    return this._route;
  }

  set route(value: string) {
    this._route = value;
  }

  get request_id(): number {
    return this._request_id;
  }

  set request_id(value: number) {
    this._request_id = value;
  }

  get created_at(): string {
    return this._created_at;
  }

  set created_at(value: string) {
    this._created_at = value;
  }

  get updated_at(): string {
    return this._updated_at;
  }

  set updated_at(value: string) {
    this._updated_at = value;
  }

  get deleted_at(): string {
    return this._deleted_at;
  }

  set deleted_at(value: string) {
    this._deleted_at = value;
  }
}
