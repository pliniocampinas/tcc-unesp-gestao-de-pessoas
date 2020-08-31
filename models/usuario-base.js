import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// nomeCompleto, usuario, email, dataNasc, senha
let UsuarioBase = new Schema({
    nomeCompleto: {
        type: String
    },

    usuario: {
        type: String
    },

    email: {
        type: String
    },

    dataNasc: {
        type: Date
    },

    senha: {
        type: String
    },

    privilegio: {
        type: Number
    },

    imagemPerfil: {
        type: Schema.Types.ObjectId
    }

});

export default mongoose.model('usuarios', UsuarioBase);