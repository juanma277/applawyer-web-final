export class Usuario {
    constructor(
        public nombre:string,
        public email:string,
        public password:string,
        public imagen?:string,
        public uid?:string,
        public provider?:string,
        public role?:string,
        public estado?:string,
        public notificaciones?:string,
        public terminos?:string,
        public id?:string
    ){ }        
}