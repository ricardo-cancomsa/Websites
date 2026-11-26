const markdownItAnchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.amendLibrary("md", (md) =>
    md.use(markdownItAnchor, {
      level: [2],
      permalink: markdownItAnchor.permalink.linkInsideHeader({ symbol: "#" }),
      slugify: (s) => s.replace(/^\d+\.\s*/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    })
  );

  // "On this page": [{ id, text }] from each <h2 id="…"> in rendered HTML
  eleventyConfig.addFilter("toc", (html) =>
    [...html.matchAll(/<h2 id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g)].map(([, id, inner]) => ({
      id,
      text: inner.replace(/<a [\s\S]*?<\/a>/g, "").replace(/<[^>]+>/g, "").trim(),
    }))
  );

  return {
    dir: { input: "src", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
