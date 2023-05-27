import mongoose from "mongoose";

const dbConnection = async () => {
  try {
   await mongoose.connect(process.env.MONGODB_CNN)
   console.log('bASE DE DATOS CONECTADA')
  } catch (e) {
    console.log(e)
    throw new Error("Error a la hora de iniciar base de datos");
  }
};

export { dbConnection };
