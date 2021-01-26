const isProd = ["production", "prod"].includes(process.env.NODE_ENV);

module.exports = {
  publicPath: isProd ? "/cnode/" : "/"
};
