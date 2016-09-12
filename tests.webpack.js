var context = require.context('test.js', true, /test\.js$/);
context.keys().forEach(context);