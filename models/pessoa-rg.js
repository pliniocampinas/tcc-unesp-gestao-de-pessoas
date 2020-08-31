import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let PessoaRg = new Schema({
    nomeCompleto: {
        type: String
    },

    numeroRg: {
        type: String
    },

    orgaoEmissor: {
        type: String
    },

    UF: {
        type: String
    },

    CPF: {
        type: String
    },

    dataNasc: {
        type: Date
    },

    filiacaoPaterna: {
        type: String
    },

    filiacaoMaterna: {
        type: String
    },

    dataEmissao: {
        type: Date
    },

    imagemRgFoto: {
        type: Schema.Types.ObjectId
    },

    imagemRgVerso: {
        type: Schema.Types.ObjectId
    }

});

export default mongoose.model('pessoas', PessoaRg);