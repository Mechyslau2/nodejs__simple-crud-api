import  { createServer } from 'http';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

const server = createServer((req, res) => {
    res.end(`<p>Hi</p>`);
});

server.listen(PORT, () => console.log(`Sever is running on the port: ${PORT}`))

