import { config } from "dotenv";
import app from "./app";
import connectDb from "./config/database";

config()
const PORT = process.env.PORT || 3000;

// Start Server
app.listen(PORT, () => {
    connectDb()
    console.log(`Server running on http://localhost:${PORT}`);
});