module.exports = {
  apps: [{
    name: "koicare",
    script: "./app.js",
    instances: 1,
    exec_mode: "cluster",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
      DATABASE_HOST:"koicaredb-koicare.i.aivencloud.com",
      DATABASE_USER:"avnadmin",
      DATABASE_PASSWORD:"AVNS_V-iOA0oN1FGpjukPixC",
      DATABASE_NAME:"defaultdb",
      JWT_SECRET: "18ab7990722a0892c66b54fc3f65c2b76a885cdac8178e8ddeb3a4f7b9e4b172"
    }
  }]
};

