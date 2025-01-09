import config from 'config';
import express from 'express';
import mongoose from 'mongoose';
import expressSetup from './middleware/express';
import Core from './models/core';
import * as SeedHelper from './seed';
function connectToMongoDB() {
    // Mongoose Config & Connection to MongoDB
    mongoose.set('strictQuery', false);
    mongoose.connect(`${config.get('db.MONGO_PROTOCOL', process.env.MONGO_PROTOCOL)}://${config.get('db.MONGO_USER', process.env.MONGO_USER)}:${config.get('db.MONGO_PWD', process.env.MONGO_PWD)}@${config.get('db.MONGO_HOST', process.env.MONGO_HOST)}/${config.get('db.MONGO_DB', process.env.MONGO_DB)}`);
}
mongoose.connection.on('connecting', (event) => {
    console.log('Connecting to MongoDB...');
});
mongoose.connection.on('connected', async (event) => {
    console.log('Connected to MongoDB');
    const core = await Core.findOne();
    if (!core) {
        console.log('No initialization detected.');
        SeedHelper.generateSeedIfNeeded();
    }
});
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});
mongoose.connection.on('reconnected', () => {
    console.error('MongoDB reconnected');
});
mongoose.connection.on('disconnected', () => {
    console.error('MongoDB disconnected');
});
connectToMongoDB();
// Setup server
const app = express();
expressSetup(app);
// Expose app
export default app;
//# sourceMappingURL=app.js.map