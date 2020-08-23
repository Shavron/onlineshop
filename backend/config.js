import dotenv from "dotenv";

dotenv.config();

const CLIENT = {
  sandbox:
    "AayLVLYnqGm4Wlsg2Yg3lDYK73Dr84hp9kdy2e2nIbxR6e2fsoG4COA6f9sBzcRr9UM0ps7LxmhDBaW4",
  production: "your_production_key"
};

export default {
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost/onlineshopdb",
  JWT_SECRET: process.env.JWT_SECRET || "somethingsecret",
  PAYPAL_CLIENT_ID:
    process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox,
  accessKeyId: process.env.accessKeyId || "accessKeyId",
  secretAccessKey: process.env.secretAccessKey || "secretAccessKey"
};
