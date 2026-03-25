import bcrypt from 'bcrypt';

bcrypt.hash('mypassword',10).then(console.log);