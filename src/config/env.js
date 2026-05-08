import dotenv from "dotenv";
dotenv.config();

export const envconfig = () => {
  return { PORT: process.env.PORT || 6001 };
};
