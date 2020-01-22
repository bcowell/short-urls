import { connect, connection } from 'mongoose';

const doConnect = async () => {

    const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        sslValidate: false,
        useFindAndModify: false
    };

    try {
        connect(process.env.MONGODB_URL, options);
        connection.on('error', console.error.bind(console, 'Failed to connect to MongoDB...'));
        connection.on('open', () => {
            console.log('Connected to MongoDB!');
        });
    }
    catch (err) {
        console.error(err);
    }
}

export default doConnect;