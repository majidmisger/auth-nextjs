import mongoose from "mongoose";


export const connectDB = async () => {

    try {
        
        mongoose.connect('mongodb://localhost:27017/auth-nextjs');

        mongoose.connection.on('connected', () => console.log('Datbase connected'));
        mongoose.connection.on('close', () => console.log('Connection closed'));
        mongoose.connection.on('error', err => {
            console.log('Error while connecting to the db ');
          });
          
    } catch (error) {
        console.log(`Error in Connecting database, Something went wrong`)
    }
}