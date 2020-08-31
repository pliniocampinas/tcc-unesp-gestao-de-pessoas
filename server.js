import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import multer from 'multer';

// import MulterGridfsStorage from 'multer-gridfs-storage';
// import GridFsStorage from 'gridfs-stream';

// models
import UsuarioBase from './models/usuario-base';
import PessoaRg from './models/pessoa-rg';
import RegistroHoras from './models/registro-horas';
import Ocorrencia from './models/ocorrencia';
import Imagem64 from './models/imagem64';
import Imagem from './models/imagem';
// depois ver como vai agrupar
import GrupoPessoas from './models/grupo-pessoas';
import Atividade from './models/atividade';

//import Pagamento from './models/pagamento';
//import Pagamento from './models/notificacao';
//import Pagamento from './models/historico-ferias';
//import Pagamento from './models/requisisao-ferias';

// Rotas
import PessoasRoutes from './routes/pessoas.route';
import AtividadesRoutes from './routes/atividades.route';
import Imagens64Routes from './routes/imagens64.route';
import OcorrenciasRoutes from './routes/ocorrencias.route';
import ImagensRoutes from './routes/imagens.route';

const app = express();
const router = express.Router();

// substituir por import, ou nao?
const pessoasRoute = PessoasRoutes;
const atividadesRoute = AtividadesRoutes;
const imagens64Route = Imagens64Routes;
const imagensRoute = ImagensRoutes;
const ocorrenciasRoute = OcorrenciasRoutes;

app.use(cors());
app.use(bodyParser.json());

// endereço do server/<nome_da_base>
mongoose.connect('mongodb://localhost:27017/tcc');

const connection = mongoose.connection;

// Rotas configuradas em arquivos próprios
app.use('/pessoas', pessoasRoute);
app.use('/atividades', atividadesRoute);
app.use('/imagens64', imagens64Route);
app.use('/ocorrencias', ocorrenciasRoute);
app.use('/imagens', imagensRoute);
// ----- Configurando para armazenar arquivos ---------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------
// app.use('/upload', express.static('public'));
// app.use('/upload', express.static(path.join(__dirname, 'public')))
app.use(express.static('upload'));

// ---- Fim alterações para arquivo ---------------------------------------------------


// configura event listerner
connection.once('open', () => {
    console.log('Mongo conectado!');

});
// ------------------------------------------------------------------------------------------------------------------
// Metodos usuarios
router.route('/usuarios').get((req, res) => {
    UsuarioBase.find((err, usuarios) => {
        if(err)
            console.log(err);
        else
            res.json(usuarios);
        console.log("get usuarios");
    });
});

router.route('/usuarios/:id').get((req, res) => {
    UsuarioBase.findById(req.params.id, (err, usuario) => {
        if(err)
            console.log(err);
        else
            res.json(usuario);
    });
});

router.route('/usuarios-username/:username').get((req, res) => {
    UsuarioBase.findOne( { usuario: req.params.username }, (err, usuario) => {
        if(err)
            console.log(err);
        else
            res.json(usuario);
    });
});

// Retornando os usuarios com o Path da imagem de perfil
router.route('/usuarios-com-path').get( (req, res) => {
    var usuariosComPath = [];
    UsuarioBase.find( (err, usuarios) => {

        var arrayLength = usuarios.length;
        console.log(usuarios.length);
        console.log(usuarios);
    
        var SyncI = 0;
        for (var i = 0; i < arrayLength; i++) {
            console.log("--- Iteracao " + i);
            var enviouReq = false;
            let IdImagemusuario = '';
            if(!(usuarios[i].imagemPerfil === undefined)) {
                IdImagemusuario = usuarios[i].imagemPerfil;
            }
            console.log("Id Utilizado: " + IdImagemusuario);
            if (IdImagemusuario) {
                console.log(usuarios[i].nomeCompleto);
                const usuario = usuarios[i];
                Imagem.findById(IdImagemusuario, (err, imagem) => {
                    console.log("Entrou ImagemFindById");
                    console.log(usuario.nome);
                    if(err) {
                        console.log(err);
                        console.log("Deu erro");
                    }
                    else if (!(usuario === undefined)) {
                        let usuarioComPath = {
                            nomeCompleto: usuario.nomeCompleto,
                            usuario: usuario.usuario,
                            email: usuario.email,
                            dataNasc: usuario.dataNasc,
                            senha: usuario.senha,
                            privilegio: usuario.privilegio,
                            imagemPerfil: usuario.imagemPerfil,
                            pathImagem: ''
                        };
                        if(imagem)
                            usuarioComPath.pathImagem = imagem.path;
                        usuariosComPath.push(usuarioComPath);
                    }
                    SyncI ++;
                    console.log(SyncI);
                    if(SyncI >= arrayLength && !enviouReq) {
                        console.log(usuariosComPath);
                        enviouReq = true;
                        res.json(usuariosComPath);
                    }

                });
            }
            console.log(i);
            console.log(usuariosComPath);
            console.log("--- Fim Iteracao " + i);
        };

    },
    (err) => {
        console.log(err);
        console.log("Deu erro");
    },
    () => {
        console.log("Completou requisicao");
        console.log(usuariosComPath);
        res.json(usuariosComPath);
    });

    // .find()
    // .exec(function(err, stories) {
    //     var arrayLength = stories.length;
    
    //     for (var i = 0; i < arrayLength; i++) {
    //         var story = stories[i];
    //         personProfile.findById(story._creator, function (err, person) {
    //             story._creator = person;
    //         }
    //     };
    //     // do your stuff here
    // }

});

router.route('/usuarios/cadastrar').post((req, res) => {
    // Converte a requisição em usuario
    let usuario = new UsuarioBase(req.body);
    let UsuarioJaExiste = false;
    let a = 1;
    // Procura se ja existe usuario com mesmo nome
    UsuarioBase.find({ usuario: usuario.usuario }, (err, usuarios) => { 
        console.log(usuarios);

        if(err)
            console.log(err);
        else if(usuarios == 0) {
            // Se nao existe, salva
            usuario.save()
            .then(usuario => {
                res.status(200).json({'usuario': 'Cadastrado com sucesso'});
            })
            .catch(err => {
                res.status(400).send('Erro no cadastro');
            });
            console.log("Usuario cadastrado");
        }
        else {
            console.log("Usuário já existe");
            res.status(400).send('Usuário já existe');
        }
    });
    console.log("Tentou cadastrar usuario");
});

router.route('/usuarios/editar/:id').post((req, res) => {
    console.log("Procurando usuario");
    UsuarioBase.findById(req.params.id, (err, usuario) => {
        if(!usuario) {
                console.log("Usuario não encontrado");
                return next(new Error('Usuario não encontrado'));
        }
        else {
            console.log("Encontrou usuário");
            // Atualiza os dados
            usuario.nomeCompleto = req.body.nomeCompleto;
            usuario.usuario = req.body.usuario;
            usuario.email = req.body.email;
            usuario.dataNasc = req.body.dataNasc;
            usuario.senha = req.body.senha;
            usuario.privilegio = req.body.privilegio;
            usuario.imagemPerfil = req.body.imagemPerfil;

            // salva
            usuario.save().then(usuario => {
                console.log("Edição concluida");
                res.json('Edição concluída');
            }).catch(err =>{
                console.log("Ocorreu um erro na edicao");
                res.status(400).send('Ocorreu um erro na edição');
            });
        }
    });
});

router.route('/usuarios/excluir/:id').get((req, res) => {
    UsuarioBase.findByIdAndRemove({_id: req.params.id}, (err, usuario) => {
        if(err)
            res.json(err);
        else
            res.json('Usuário foi apagado');
    });
});
// Fim metodos usuarios
// ------------------------------------------------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
app.use('/', router);

app.get('/', (req, res) => res.send('Ta tendo'));

app.listen(4000, () => console.log('Servidor express rodando no Port 4000'));
