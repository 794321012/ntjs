// src/utils/cryptogram.util.ts

import * as crypto from 'crypto';

// 随机盐
export function makeSalt(): string {
  return crypto.randomBytes(3).toString('base64');
}

/**
 * 使用盐加密明文密码
 * @param password 密码
 * @param salt 密码盐
 */
export function encryptPassword(password: string, salt: string): string {
  if (!password || !salt) {
    return '';
  }
  const tempSalt = Buffer.from(salt, 'base64');
  return (
    // 10000 代表迭代次数 16代表长度
    crypto.pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1').toString('base64')
  );
}

/**
 * 计算流md5
 */
export function encryptFileMD5(Buffer: Buffer) {
  const md5 = crypto.createHash('md5');
  return md5.update(Buffer).digest('hex');
}
