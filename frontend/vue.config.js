const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: [
      "ec2-34-245-90-50.eu-west-1.compute.amazonaws.com",
      "localhost",
    ],
  },
});
