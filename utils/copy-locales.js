const del = require('del');
const ncp = require('ncp');
const fs = require('fs');

const localeDir = 'src/locale';
const localePublicDir = 'public/locale';

del.sync(localePublicDir);
fs.mkdirSync(localePublicDir);

ncp(localeDir, localePublicDir);
