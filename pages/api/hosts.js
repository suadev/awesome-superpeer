const fs = require("fs/promises");
const rl = require("readline");
const path = require("path");

// NOTE: I've tried to add photos but it takes too long to load with this method

// const axios = require("axios");
// const cheerio = require("cheerio");

// async function getSuperpeerHostImageUrl(hostUrl) {
//   try {
//     const { data } = await axios.get(hostUrl);
//     const $ = cheerio.load(data);
//     var imageUrl = $('meta[property="og:image"]').attr("content");
//     if (imageUrl.includes("superpeer")) return imageUrl;
//     return "/avatar.svg";
//   } catch (err) {
//     console.error(err);
//   }
// }

export default async function handler(_req, res) {
  const hosts = [];
  const categories = [];
  let currentCategory = "";

  const readmeDirectory = path.join(process.cwd(), "/README.md");

  try {
    const rawData = await fs.readFile(readmeDirectory, {
      encoding: "utf8",
    });
    const data = rawData
      .slice(rawData.indexOf("## Back-end Software Development"))
      .split("\n");

    for (const row of data) {
      if (row.includes("## ") && !row.includes("###")) {
        let category = row.replace("## ", "").trim();
        categories.push(category);
        currentCategory = category;
      }

      if (row.includes("* [")) {
        let newHost = {};
        newHost.name = row.slice(row.indexOf("[") + 1, row.indexOf("]"));
        newHost.link = row.slice(row.indexOf("(") + 1, row.indexOf(")"));
        newHost.categories = [currentCategory];
        //newHost.imageUrl = await getSuperpeerHostImageUrl(newHost.link);
        newHost.description = row.slice(row.indexOf("- ") + 2);
        let hostIndex = hosts.findIndex((host) => host.link === newHost.link);
        if (hostIndex !== -1) {
          hosts[hostIndex].categories = [
            ...hosts[hostIndex].categories,
            currentCategory,
          ];
        } else {
          hosts.push(newHost);
        }
      }
    }
    res.status(200).json({ categories, hosts });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
