const { readdirSync } = require("fs");
const path = require("path");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://wouldyoubot.gg/",
  generateRobotsTxt: true,

  // Add blog post paths, since they are loaded from an external directory
  additionalPaths: async () =>
    readdirSync(path.join(process.cwd(), "posts"))
      .filter((path) => path.charAt(0) !== "_")
      .filter((path) => /\.mdx?$/.test(path))
      .map((path) => `/blog/${path.replace(/\.mdx?$/, "")}`),
};
