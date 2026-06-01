/** Downloaded post thumbnails in assets/images/instagram/ */
const INSTAGRAM_IMAGES = [
  "01-DYV4Rhnxzt7.jpg",
  "02-DYONx8CP-K9.jpg",
  "03-DYBJCrSPy4s.jpg",
  "04-DXwkkUaxNMu.jpg",
  "05-DXoRssWk4OE.jpg",
  "06-DW1C0sBguVA.jpg",
  "07-DWgyr6akRS_.jpg",
  "08-DWdU-laEROO.jpg",
  "09-DV04LXiEXcK.jpg",
  "10-DVnfDzkke2t.jpg",
  "11-DVjDzjZjyWU.jpg",
  "12-DVTJMs_D0MG.jpg",
  "13-DVQ5UtpD2Iz.jpg",
  "14-DUpjk90j2_7.jpg",
  "15-DUmTYjOkpOu-1.jpg",
  "15-DUmTYjOkpOu-2.jpg",
  "15-DUmTYjOkpOu-3.jpg",
  "15-DUmTYjOkpOu-4.jpg",
  "15-DUmTYjOkpOu-5.jpg",
  "15-DUmTYjOkpOu-6.jpg",
  "15-DUmTYjOkpOu-7.jpg",
  "16-DUk_SmKkS06.jpg",
  "17-DULgn8DD8nI.jpg",
  "18-DUGc3K9AUpW.jpg",
  "19-DT-WbsqEcy2.jpg",
  "20-DTqAC6-CLNg.jpg",
  "21-DTfXN2cEYUj.jpg",
  "22-DTZvAMWDyIO.jpg",
  "23-DTYPsfsk5Pz.jpg",
  "24-DHA5b2NSYDv.jpg",
];

const INSTAGRAM_PROFILE = "https://www.instagram.com/unittedfitness/";
const INSTAGRAM_IMAGE_DIR = "assets/images/instagram/";

function instagramShortcodeFromFile(filename) {
  const match = filename.match(/^\d+-([^.]+?)(?:-\d+)?\.jpg$/);
  return match ? match[1] : null;
}

function instagramPostUrl(filename) {
  const shortcode = instagramShortcodeFromFile(filename);
  return shortcode ? `https://www.instagram.com/p/${shortcode}/` : INSTAGRAM_PROFILE;
}
