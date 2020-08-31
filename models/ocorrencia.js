import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Sempre vinculada a um usuario
let Ocorrencia = new Schema({
    nomeUsuario: {
        type: String
    },

    usuarioId: {
        type: Schema.Types.ObjectId
    },

    tipo: {
        type: String
    },

    titulo: {
        type: String
    },

    texto: {
        type: String
    }

});

export default mongoose.model('ocorrencias', Ocorrencia);