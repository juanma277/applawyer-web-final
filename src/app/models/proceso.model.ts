export class Proceso {
    constructor(
        public tipo_proceso_id?:string,
        public user_id?:string,
        public juzgado_id?:string,
        public demandante?:string,
        public demandado?:string,
        public radicado?:string,
        public fecha?:string,
        public estado?:string,
        public id?:string
    ){ }        
}