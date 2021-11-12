import wallpaper from "wallpaper";
import pexels from "pexels";
import dotenv from "dotenv";
import download from "download";
import * as path from "path";
import * as fs from "fs";

(async () => {
  dotenv.config({ path: ".env" });
  console.log(await wallpaper.get());
  const p = pexels.createClient(process.env.pexels);
  const photos = await p.photos.search({
    query: { size: "medium" },
    per_page: 1,
    page: Math.round(Math.random() * 8000),
  });
  console.log(photos);
  const photoURL = photos.photos[0].src.original;
  const filename = path.basename(new URL(photoURL).pathname);
  console.log(photoURL, filename);
  fs.writeFileSync(filename, await download(photoURL));

  await wallpaper.set(filename);
})();
