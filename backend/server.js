const express = require('express');
const cors = require('cors');
const data = require('./data');

const app = express();
app.use(cors());

app.get('/api/products', (req, res) => {
    const { branch } = req.query;
    if (branch) {
        const filteredData = data.products.filter(product => product.branch === branch);
        res.json(filteredData);
    } else {
        res.json(data.products);
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
