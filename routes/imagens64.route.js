import express from 'express';
import Imagem64 from '../models/imagem64';
const app = express();
const Imagens64Routes = express.Router();

// ------------------------------------------------------------------------------------------------------------------
// Metodos Imagens64
// ------------------------------------------------------------------------------------------------------------------
// Melhor nem fazer um pra buscar todos...
// Imagens64Routes.route('/').get((req, res) => {
//     Imagem64.find((err, imagens) => {
//         if(err)
//             console.log(err);
//         else
//             res.json(imagens);
//         console.log("get imagens64");
//     });
// });

Imagens64Routes.route('/:id').get((req, res) => {
    Imagem64.findById(req.params.id, (err, imagem64) => {
        if(err)
            console.log(err);
        else
            res.json(imagem64);
    });
});

Imagens64Routes.route('/cadastrar').post((req, res) => {
    // Converte a requisição em atividade
    let imagem64 = new Imagem64(req.body);
    imagem64.save()
        .then(imagem64 => {
            res.status(200).json(imagem64);// {'imagem64': 'Cadastrado com sucesso'});
        })
        .catch(err => {
            res.status(400).send('Erro no cadastro de imagem64');
        });
    console.log("Tentou cadastrar imagem64");
});

Imagens64Routes.route('/excluir/:id').get((req, res) => {
    Imagem64.findByIdAndRemove({_id: req.params.id}, (err, imagem64) => {
        if(err)
            res.json(err);
        else
            res.json('Imagem64 foi apagada');
    });
});

// Deixar sem edição também
// AtividadesRoutes.route('/editar/:id').post((req, res) => {
//     Atividade.findById(req.params.id, (err, atividade) => {
//         if(!atividade) {
//                 console.log("atividade não encontrada");
//                 return next(new Error('atividade não encontrada'));
//         }
//         else {
//             console.log("Encontrou atividade");
//             // Atualiza os dados
//             atividade.usuario = req.body.usuario;
//             atividade.dataHoraInicio = req.body.dataHoraInicio;
//             atividade.dataHoraTermino = req.body.dataHoraTermino;
//             atividade.sigla = req.body.sigla;
//             atividade.descricao = req.body.descricao;

//             // salva
//             atividade.save().then(atividade => {
//                 console.log("Edição concluida");
//                 res.json('Edição concluída');
//             }).catch(err =>{
//                 console.log("Ocorreu um erro na edicao");
//                 res.status(400).send('Ocorreu um erro na edição');
//             });
//         }
//     });
// }); 
// Fim metodos atividade

export default Imagens64Routes;