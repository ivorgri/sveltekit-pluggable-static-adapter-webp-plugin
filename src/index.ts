import glob = require("tiny-glob");
import sharp = require("sharp");
import * as fs from "fs";

/**
 * @param {string} assetsDirectory
 */
async function convertImagesToWebp(builder: any, assetsDirectory: string) {
  builder.log("Starting conversion of images to .webp format");
  const imageExtensions = ["jpg", "jpeg", "png"];
  const files = await glob(`**/*.{${imageExtensions.join(",")}}`, {
    cwd: assetsDirectory,
    dot: true,
    absolute: true,
    filesOnly: true,
  });

  await Promise.all(
    files.map((file: string) =>
      Promise.all([convertWebpFile(file, imageExtensions)])
    )
  );
  builder.log("Done with conversion of images to .webp format");
}

/**
 * @param {string} file
 * @param {string[]} imageExtensions
 */
async function convertWebpFile(file: string, imageExtensions: string[]) {
  const imageExtensionRegex = new RegExp(`${imageExtensions.join("|")}$`, "gi");
  const newAssetPath = file.replace(imageExtensionRegex, "webp");
  const newAsset = await sharp(file).webp().toBuffer();
  fs.writeFileSync(newAssetPath, newAsset);
}

module.exports = convertImagesToWebp;
