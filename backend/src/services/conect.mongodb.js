const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

try {
    db.on('error', console.error.bind(console, 'Erro ao conectar no Mongo'));
    db.once('open', function () {
        console.log("Banco de Dados Mongo conectado com sucesso");
    });
} catch (error) {
    console.log(error)
}

module.export = db;