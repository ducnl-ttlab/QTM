module.exports = {
  pagination: function (data, currentPage, resultPerPage) {
    resultPerPage = resultPerPage || 8;
    currentPage = currentPage || 1;
    let begin = resultPerPage * (currentPage - 1);
    let end = resultPerPage * currentPage;
    return data.slice(begin, end);
  },
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
  removeCache: function (key) {
    return new Promise(async (resolve, reject) => {
      let delKey = await redisClient.del(key);
      resolve(delKey);
    });
  },

  removeCacheWithPrefix: async function (prefix) {
    let test = redisClient.scanIterator({
      TYPE: "string", // `SCAN` only
      MATCH: `${prefix}*`,
      COUNT: 100,
    });
    for await (const key of test) {
      console.log(key);
      await redisClient.del(key);
    }
  },
};
