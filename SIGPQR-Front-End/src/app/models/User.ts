export class User {

  constructor(
    public id:number,
    public name: string,
    public lastname: string,
    public email: string,
    public id_type: string,
    public id_num:number,
    public password: string,
    public password_confirmation:string,
    public verified:string ='0',
    public program_id:number,
    public profile_id:number=3,
    public token?: string,
    public image?: string,
    public status?:string,
    public admin?:boolean,
  ){}



}
