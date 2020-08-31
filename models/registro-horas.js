import mongoose from 'mongoose';

const Schema = mongoose.Schema;


let RegistroHoras = new Schema({
    pessoa: {
        type: String
    },

    entrada: {
        type: String
    },

    saida: {
        type: String
    },

    data: {
        type: Date
    },

    atividade: {
        type: String
    }

});

export default mongoose.model('RegistroHoras', RegistroHoras);