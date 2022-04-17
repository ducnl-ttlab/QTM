module.exports = {
  pagination: function (data, currentPage, resultPerPage) {
    resultPerPage = resultPerPage || 8;
    currentPage = currentPage || 1;
    let begin = resultPerPage * (currentPage - 1);
    let end = resultPerPage * currentPage;
    return data.slice(begin, end);
  },
  //alo
  setOrGetCache: function (key, cb) {
    return new Promise(async (resolve, reject) => {
      let data = await redisClient.get(key);
      if (data) {
        resolve(JSON.parse(data));
      } else {
        const DEFAULT_EXPIRE = 3600;
        let freshData = await cb();
        await redisClient.setEx(key, DEFAULT_EXPIRE, JSON.stringify(freshData));
        resolve(freshData);
      }
    });
  },
};
