const mongoose = require('mongoose');

async function ConnectToDb() {
    try {
        await mongoose.connect(process.env.DB_Connect, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to DB');
    } catch (err) {
        console.log('DB connection error:', err);
    }
}

module.exports = ConnectToDb;
