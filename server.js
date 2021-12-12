// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const fs = require('fs');
const middlewares = jsonServer.defaults();

server.use(middlewares);

const getHobbiesFromIds = (idArray, file) => {
  const elemsResolved = idArray.map((hobbyId) => {
    const dataToResolve = file['Hobbies'];
    const hobby = dataToResolve.find((e) => e.id === hobbyId);
    return hobby;
  });
  return elemsResolved;
};

router.render = (req, res) => {
  if (req.path === '/Users' && req.method === 'GET') {
    const file = JSON.parse(fs.readFileSync('db.json'));
    const enhancedUsers = res.locals.data.map((user) => {
      return {
        ...user,
        hobbies: getHobbiesFromIds(user.hobbies, file),
      };
    });
    return res.jsonp(enhancedUsers);
  } else if (req.path.includes('/Users/') && req.method === 'GET') {
    const file = JSON.parse(fs.readFileSync('db.json'));
    const userHobbies = res.locals.data.hobbies;
    res.locals.data.hobbies = getHobbiesFromIds(userHobbies, file);
  }
  return res.jsonp(res.locals.data);
};

server.use(router);
server.listen(5000, () => {
  console.log('JSON Server is running');
});
