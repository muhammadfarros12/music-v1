// import dotenv untuk import dan menjalankan konfigurasinya
require('dotenv').config();
const Hapi = require('@hapi/hapi');
// songs
const songs = require('./api/songs');
const SongsService = require('./services/postgres/SongsService');
const SongsValidator = require('./validator/songs');
// users
const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');

const init = async () => {
  const songsService = new SongsService();
  const usersService = new UsersService();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
  // tidak digunakan
  //server.route(routes);

  await server.register([
    {
      plugin: songs,
      options: {
        service: songsService,
        // validator
        validator: SongsValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: UsersService,
        validator: UsersValidator
      }
    }
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
