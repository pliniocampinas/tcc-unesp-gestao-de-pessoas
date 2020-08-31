import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let GrupoPessoas = new Schema({
    nomeGrupo: {
        type: String
    },

    descricao: {
        type: String
    },

    Pessoas: {
        type: String
    }

});

export default mongoose.model('GrupoPessoas', GrupoPessoas);