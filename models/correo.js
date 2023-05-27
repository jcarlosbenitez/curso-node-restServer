import { Schema, model } from "mongoose";


const correoSchema = Schema({
correo:{
    type: String,
    required: [true,'El correo es obligatorio']
}
})






export default model('Correo',correoSchema)