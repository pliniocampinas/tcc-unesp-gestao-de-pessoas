import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Imagem64 = new Schema({
    nome: {
        type: String
    },

    tipo: {
        type: String
    },

    base64: {
        type: String
    },

    descricao: {
        type: String
    }

});

export default mongoose.model('imagens64', Imagem64);