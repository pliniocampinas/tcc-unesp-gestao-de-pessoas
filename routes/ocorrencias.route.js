import express from 'express';
import Ocorrencia from '../models/ocorrencia';
const app = express();
const OcorrenciasRoutes = express.Router();

// ------------------------------------------------------------------------------------------------------------------
// Metodos ocorrencia
OcorrenciasRoutes.route('/').get((req, res) => {
    Ocorrencia.find((err, ocorrencias) => {
        if(err)
            console.log(err);
        else
            res.json(ocorrencias);
        console.log("get ocorrencias");
    });
});

OcorrenciasRoutes.route('/:id').get((req, res) => {
    Ocorrencia.findById(req.params.id, (err, ocorrencia) => {
        if(err)
            console.log(err);
        else
            res.json(ocorrencia);
    });
});

OcorrenciasRoutes.route('/cadastrar').post((req, res) => {
    // Converte a requisição em usuario
    let ocorrencia = new Ocorrencia(req.body);
    ocorrencia.save()
        .then(ocorrencia => {
            res.status(200).json({'ocorrencia': 'Cadastrado com sucesso'});
        })
        .catch(err => {
            res.status(400).send('Erro no cadastro de ocorrencia');
            console.log(err);
        });
    console.log("Tentou cadastrar ocorrencia");
});

OcorrenciasRoutes.route('/editar/:id').post((req, res) => {
    Ocorrencia.findById(req.params.id, (err, ocorrencia) => {
        if(!ocorrencia) {
                console.log("ocorrencia não encontrada");
                return next(new Error('ocorrencia não encontrada'));
        }
        else {
            console.log("Encontrou ocorrencia");
            // Atualiza os dados
            ocorrencia.nomeUsuario = req.body.nomeUsuario;
            ocorrencia.usuarioId = req.body.usuarioId;
            ocorrencia.tipo = req.body.tipo;
            ocorrencia.titulo = req.body.titulo;
            ocorrencia.texto = req.body.texto;

            // salva
            ocorrencia.save().then(ocorrencia => {
                console.log("Edição concluida");
                res.json('Edição concluída');
            }).catch(err =>{
                console.log("Ocorreu um erro na edicao");
                res.status(400).send('Ocorreu um erro na edição');
            });
        }
    });
});

OcorrenciasRoutes.route('/excluir/:id').get((req, res) => {
    Ocorrencia.findByIdAndRemove({_id: req.params.id}, (err, ocorrencia) => {
        if(err)
            res.json(err);
        else
            res.json('ocorrencia foi apagada');
    });
});
// Fim metodos ocorrencias

export default OcorrenciasRoutes;