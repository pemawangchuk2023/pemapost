import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strict query', true);

  if (isConnected) {
    console.log('Mongodb is connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL),
      {
        dbName: 'PemaPost',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };

    isConnected = true;
    console.log('MongoDB is connected');
  } catch (error) {
    console.log(`Error connecting to MongoDB: ${error}`);
  }
};
