import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const imageDirectory = path.join(process.cwd(), "public", "images");
const replaceSources = process.argv.includes("--replace");
const sourcePattern = /\.(png|jpe?g)$/i;
const files = (await readdir(imageDirectory)).filter((file) =>
  sourcePattern.test(file),
);

let bytesBefore = 0;
let bytesAfter = 0;

for (const file of files) {
  const source = path.join(imageDirectory, file);
  const destination = path.join(
    imageDirectory,
    file.replace(sourcePattern, ".webp"),
  );
  const sourceStats = await stat(source);

  await sharp(source)
    .rotate()
    .webp({ quality: 84, effort: 6, smartSubsample: true })
    .toFile(destination);

  const destinationStats = await stat(destination);
  bytesBefore += sourceStats.size;
  bytesAfter += destinationStats.size;

  if (replaceSources) await unlink(source);

  console.log(
    `${file} -> ${path.basename(destination)} (${Math.round((1 - destinationStats.size / sourceStats.size) * 100)}% più leggero)`,
  );
}

console.log(
  `Risparmio totale: ${((bytesBefore - bytesAfter) / 1024 / 1024).toFixed(1)} MB`,
);

const socialSource = path.join(imageDirectory, "hero-pool-sea.webp");
const socialDestination = path.join(process.cwd(), "public", "opengraph-image.jpg");

await sharp(socialSource)
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(socialDestination);

console.log("Creata anche public/opengraph-image.jpg (1200x630).");
