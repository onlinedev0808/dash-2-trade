const path = require("path");

module.exports = {
  images: {
    domains: [
      "s3.amazonaws.com",
      "s2.coinmarketcap.com",
      "avatars.dicebear.com",
      "bullbear-data-scrapers.s3.amazonaws.com",
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  serverRuntimeConfig: {
    googleNews: {
      apiKey: "6e12cb9a5db447e9bb87ec3e332b25a5",
    },
    mongoDb: {
      connectionString:
        "mongodb+srv://admin:GoA0K2mVICFjS5QZ@cluster0.bhcgd.mongodb.net/?retryWrites=true&w=majority",
      dbName: "DashboardX",
    },
    cryptoPanic: {
      apiKey: "7c2804558cb738c6bcd34c4e968dc411b7ccaef5",
    },
  },
  publicRuntimeConfig: {},
  env: {
    CONTENT_API_ACCESS_TOKEN: process.env.CONTENT_API_ACCESS_TOKEN,
    CONTENT_SPACE_ID: process.env.CONTENT_SPACE_ID
  }
};
