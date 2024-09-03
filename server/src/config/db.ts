import mongoose from 'mongoose';
import config from '.';
import Logger from 'src/utils/Logger';

const mongoURI = config.mongoUri;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
  } catch (err) {
    if (err instanceof Error) {
      Logger.error(`Error: ${err.message}`);
    } else {
      Logger.error('MongoDB error');
    }
    process.exit(1);
  }
};

const connection = mongoose.connection;

connection.on('connected', () => {
  Logger.info('MongoDB connected successfully');
});

export default connectDB;
