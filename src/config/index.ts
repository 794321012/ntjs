import * as fs from 'fs';

import developmentConfig from './development.config';
import productionConfig from './production.config';
import { Config } from './interface.config';
console.log(process.env.NODE_ENV, '===');
const configs = {
  development: developmentConfig,
  production: productionConfig,
};
const config: Config = configs[process.env.NODE_ENV];
// 查看process 文件
// fs.writeFileSync('./process.json', JSON.stringify(process.env, null, 2));
// console.log(process, '=====');
// console.log({ config }, '========');
export default config;
