import axios from "axios";
const jsdom = require("jsdom")

export default async function getGitHub() {
    let stats = {
        stars: 0,
        commits: 0
    }
    const url = "https://github-readme-stats.vercel.app/api?username=akukerang&theme=vue-dark&show_icons=true&hide_border=true&count_private=true"
    const res = await axios.get(url);
    const data = res.data;
    const { JSDOM } = jsdom;
    const dom = new JSDOM(data, { contentType: "image/svg+xml" });
    const parser = new dom.window.DOMParser();
    const doc = parser.parseFromString(data, "image/svg+xml");
    const texts = doc.querySelectorAll("text");
    texts.forEach((el: SVGTextElement) => {
        if (el.textContent?.includes("Stars Earned")) {
            stats.stars = parseInt(el.nextElementSibling?.textContent || "0", 10);
        }
        if (el.textContent?.includes("Total Commits")) {
            stats.commits = parseInt(el.nextElementSibling?.textContent || "0", 10);
        }
    });
    return stats;
}


