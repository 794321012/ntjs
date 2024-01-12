import * as fs from 'fs';

import developmentConfig from './development.config';
import productionConfig from './production.config';
import { Config } from './interface.config';

const configs = {
  development: developmentConfig,
  production: productionConfig,
};
const env = process.env.NODE_ENV;
// 查看process 文件
// fs.writeFileSync('./process.json', JSON.stringify(process.env, null, 2));
// console.log(process, '=====');
console.log({ env }, '========');
export default configs[env] as Config;
