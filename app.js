'use strict';

import app from './server';

const port = process.env.PORT || 4000;

(async() => {
  await app.listen(port);
  console.log(`Server started on port ${port}`);
})();
