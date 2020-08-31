import express from 'express';
import Imagem from '../models/imagem';
import multer from 'multer';
const app = express();
const ImagensRoutes = express.Router();

const DIR = './upload/images';
const upload = multer({dest: DIR}).single('photo');
// ------------------------------------------------------------------------------------------------------------------
// Metodos Imagens
// ------------------------------------------------------------------------------------------------------------------

ImagensRoutes.route('/').get((req, res) => {
    Imagem.find((err, imagens) => {
        if(err)
            console.log(err);
        else
            res.json(imagens);
        console.log("get imagens");
    });
});

ImagensRoutes.route('/:id').get((req, res) => {
    Imagem.findById(req.params.id, (err, imagem) => {
        if(err)
            console.log(err);
        else
            res.json(imagem);
    });
});

ImagensRoutes.route('/excluir/:id').get((req, res) => {
    Imagem.findByIdAndRemove({_id: req.params.id}, (err, imagem) => {
        if(err)
            res.json(err);
        else
            res.json('Imagem foi apagada');
    });
});

ImagensRoutes.route('/cadastrar').post((req, res) => {

    upload(req, res, (err) => {
       if (err) {
         // An error occurred when uploading
         console.log(err);
         console.log("Upload deu erro");
         return res.status(422).send("an Error occured")
       }  
       // No error occured.
       let imagem = new Imagem();
       imagem.nome = req.file.originalname;
       imagem.path = req.file.filename;
       imagem.contentType = req.file.mimetype;
       imagem.save()
           .then(imagem => {
               res.status(200).json(imagem);
               console.log(imagem.path);
           })
           .catch(err => {
               res.status(400).send('Erro no cadastro de imagem');
           });
    });

});

export default ImagensRoutes;