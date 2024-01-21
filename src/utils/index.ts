/**
 * 计算分页
 * @param total
 * @param pageSize
 * @param page
 * @returns
 */
export const getPagination = (
  total: number,
  pageSize: number,
  page: number,
) => {
  const pages = Math.ceil(total / pageSize);
  return {
    total,
    page,
    pageSize,
    pages,
  };
};
/**
 * 所处环境
 */
export const isProduction = process.env.NODE_ENV === 'production';
