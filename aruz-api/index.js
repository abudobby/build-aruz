import server from './config/server.js';
import dotenv  from "dotenv"
dotenv.config()
const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});