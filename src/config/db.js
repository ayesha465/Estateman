const config = {
    production: {
      secret: process.env.secret,
  
      DATABASE: process.env.MONGODB_URI,
    },
    default: {
      secret: "mySecret key",
  
      DATABASE:
        "mongodb+srv://estateman:etm123@cluster0.nxu9bwl.mongodb.net/Estateman",
    },
  };
  
  exports.get = function get(env) {
    console.log("test reaching here");
    return config[env] || config.default;
  };
  