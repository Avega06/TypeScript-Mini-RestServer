import { Sequelize  } from "sequelize";


const db = new Sequelize('node', /*'UserDB', 'Password',*/{
    host: 'localhost',
    dialect: 'mysql',
    // logging: false,
});

export default db;