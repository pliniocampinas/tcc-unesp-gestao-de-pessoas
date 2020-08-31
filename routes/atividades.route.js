import express from 'express';
import Atividade from '../models/atividade';
const app = express();
const AtividadesRoutes = express.Router();

// ------------------------------------------------------------------------------------------------------------------
// Metodos atividades
AtividadesRoutes.route('/').get((req, res) => {
    Atividade.find((err, atividades) => {
        if(err)
            console.log(err);
        else
            res.json(atividades);
        console.log("get atividades");
    });
});

AtividadesRoutes.route('/:id').get((req, res) => {
    Atividade.findById(req.params.id, (err, atividade) => {
        if(err)
            console.log(err);
        else
            res.json(atividade);
    });
});

// Procura por usuário
AtividadesRoutes.route('/usuario/:usuario').get((req, res) => {
    Atividade.find({ usuario: req.params.usuario }, (err, atividades) => {
        if(err)
            console.log(err);
        else
            res.json(atividades);
    });
});

AtividadesRoutes.route('/cadastrar').post((req, res) => {
    // Converte a requisição em atividade
    let atividade = new Atividade(req.body);
    atividade.save()
        .then(atividade => {
            res.status(200).json({'atividade': 'Cadastrado com sucesso'});
        })
        .catch(err => {
            res.status(400).send('Erro no cadastro de atividade');
        });
    console.log("Tentou cadastrar atividade");
});

AtividadesRoutes.route('/editar/:id').post((req, res) => {
    Atividade.findById(req.params.id, (err, atividade) => {
        if(!atividade) {
                console.log("atividade não encontrada");
                return next(new Error('atividade não encontrada'));
        }
        else {
            console.log("Encontrou atividade");
            // Atualiza os dados
            atividade.usuario = req.body.usuario;
            atividade.dataHoraInicio = req.body.dataHoraInicio;
            atividade.dataHoraTermino = req.body.dataHoraTermino;
            atividade.sigla = req.body.sigla;
            atividade.descricao = req.body.descricao;

            // salva
            atividade.save().then(atividade => {
                console.log("Edição concluida");
                res.json('Edição concluída');
            }).catch(err =>{
                console.log("Ocorreu um erro na edicao");
                res.status(400).send('Ocorreu um erro na edição');
            });
        }
    });
});

AtividadesRoutes.route('/excluir/:id').get((req, res) => {
    Atividade.findByIdAndRemove({_id: req.params.id}, (err, atividade) => {
        if(err)
            res.json(err);
        else
            res.json('Atividade foi apagada');
    });
});
// Fim metodos atividade

export default AtividadesRoutes;