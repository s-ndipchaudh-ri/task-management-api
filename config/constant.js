const globalConstants = {

    JWTOKENLOCAL: 'fcv42f62-g465-4dc1-ad2c-sa1f27kk1w43',
    key: {
      privateKey: 'c3f42e68-b461-4bc1-ae2c-da9f27ee3a21',
      tokenExpiry: 1 * 30 * 1000 * 60 * 24 //1 hour
    },
    POSTGRES: {
      LOCAL: {
        host: 'localhost',
        db: 'postgres',
        user: 'postgres',
        password: '1234'
      }
    }
    
  };
  
  module.exports = globalConstants;