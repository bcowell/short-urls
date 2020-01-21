import { connect, connection } from 'mongoose';

const doConnect = () => {

    const options = {
        dbName: 'dev',
        useUnifiedTopology: true,
        useNewUrlParser: true,
        sslValidate: false
    };

    try {
        connect(process.env.MONGODB_URL, options);
        const MongoDB = connection;
        MongoDB.on('error', console.error.bind(console, 'Failed to connect to MongoDB...'));
        MongoDB.on('open', () => {
            console.log('Connected to MongoDB!');
        });
    }
    catch (err) {
        console.error(err);
    }
}

export default doConnect;