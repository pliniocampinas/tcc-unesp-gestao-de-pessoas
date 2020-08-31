import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Imagem = new Schema({
    nome: {
        type: String
    },

    path: {
        type: String
    },

    contentType: {
        type: String
    }

});

export default mongoose.model('imagens', Imagem);