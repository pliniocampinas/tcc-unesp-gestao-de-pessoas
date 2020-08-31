import express from 'express';
import PessoaRg from '../models/pessoa-rg';
const app = express();
const PessoasRoutes = express.Router();

// ------------------------------------------------------------------------------------------------------------------
// Metodos pessoas
PessoasRoutes.route('/').get((req, res) => {
    PessoaRg.find((err, pessoas) => {
        if(err)
            console.log(err);
        else
            res.json(pessoas);
        console.log("get pessoas");
    });
});

PessoasRoutes.route('/:id').get((req, res) => {
    PessoaRg.findById(req.params.id, (err, pessoa) => {
        if(err)
            console.log(err);
        else
            res.json(pessoa);
    });
});

PessoasRoutes.route('/cadastrar').post((req, res) => {
    // Converte a requisição em usuario
    let pessoa = new PessoaRg(req.body);
    pessoa.save()
        .then(pessoa => {
            res.status(200).json({'pessoa': 'Cadastrado com sucesso'});
        })
        .catch(err => {
            res.status(400).send('Erro no cadastro de pessoa');
            console.log(err);
        });
    console.log("Tentou cadastrar pessoa");
});

PessoasRoutes.route('/editar/:id').post((req, res) => {
    PessoaRg.findById(req.params.id, (err, pessoa) => {
        if(!pessoa) {
                console.log("Pessoa não encontrada");
                return next(new Error('Pessoa não encontrada'));
        }
        else {
            console.log("Encontrou pessoa");
            // Atualiza os dados
            pessoa.nomeCompleto = req.body.nomeCompleto;
            pessoa.numeroRg = req.body.numeroRg;
            pessoa.orgaoEmissor = req.body.orgaoEmissor;
            pessoa.UF = req.body.UF;
            pessoa.CPF = req.body.CPF;
            pessoa.dataNasc = req.body.dataNasc;
            pessoa.filiacaoPaterna = req.body.filiacaoPaterna;
            pessoa.filiacaoMaterna = req.body.filiacaoMaterna;
            pessoa.dataEmissao = req.body.dataEmissao;
            // Armazenando imagens
            pessoa.imagemRgFoto = req.body.imagemRgFoto;
            pessoa.imagemRgVerso = req.body.imagemRgVerso;

            // salva
            pessoa.save().then(pessoa => {
                console.log("Edição concluida");
                res.json('Edição concluída');
            }).catch(err =>{
                console.log("Ocorreu um erro na edicao");
                res.status(400).send('Ocorreu um erro na edição');
            });
        }
    });
});

PessoasRoutes.route('/excluir/:id').get((req, res) => {
    PessoaRg.findByIdAndRemove({_id: req.params.id}, (err, pessoa) => {
        if(err)
            res.json(err);
        else
            res.json('Pessoa foi apagada');
    });
});
// Fim metodos pessoas

export default PessoasRoutes;