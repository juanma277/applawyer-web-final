export class Notificacion {
    constructor(
        public user?:string,
        public titulo?:string,
        public mensaje?:string,
        public tipo?:string,
        public estado?:string,
        public id?:string,
        public email?:string
    ){ }        
}