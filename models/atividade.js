import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Atividade = new Schema({
    usuario: {
        type: String
    },

    dataHoraInicio: {
        type: Date
    },

    dataHoraTermino: {
        type: Date
    },

    sigla: {
        type: String
    },

    descricao: {
        type: String
    }

});

export default mongoose.model('atividades', Atividade);