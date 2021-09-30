export function parseTotalPage({total, articlePerPage}: { total: number, articlePerPage: number }) {
  const dividedValue = Math.floor(total / articlePerPage);
  
  if (total % articlePerPage === 0) {
    return dividedValue;
  }
  
  return dividedValue + 1;
}
