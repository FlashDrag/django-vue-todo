const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: [
      "ec2-18-201-100-234.eu-west-1.compute.amazonaws.com",
      "localhost",
    ],
  },
});
