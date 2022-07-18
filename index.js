const app = require("./app");
const { API_SERVER_PORT } = process.env;
app.listen(API_SERVER_PORT, () => {
    console.log(`Server now is running on prot ${API_SERVER_PORT}`);
})