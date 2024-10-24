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
      JWT_SECRET: "very_secret_password"
    }
  }]
};

