export const enum REQUEST_TYPE {
  peticion = 1,
  queja = 2,
  reclamo = 3
}

export class _RequestType {

  constructor(
    public id: number,
    public type: String,
    public description: string,
    public created_at?: string,
    public update_at?: string,
    public deleted_at?: string) {
  }

}
