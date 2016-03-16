import fs from 'fs';
import http from 'http';

import program from 'commander';
import concat from 'concat-stream';

const CHIMERA_API_URL_PREFIX = 'http://dusken.no/radio/api';
const EPISODE_SLICE_SIZE = 5;

const downloadAndParseJSON = function (url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      res.setEncoding('utf8');
      res.on('error', reject);
      res.pipe(concat(resolve));
    });
  }).then(JSON.parse);
};

const downloadPrograms = downloadAndParseJSON.bind(undefined, `${CHIMERA_API_URL_PREFIX}/shows/?format=json`);

const run = async (episodeSliceSize) => {
  const programs = await downloadPrograms();
  for (const p of programs) {
    const episodes = await downloadAndParseJSON(p.episodes);
    p.episodes = episodes.slice(0, episodeSliceSize || episodes.length);
  }

  fs.writeFile('example_data.json', JSON.stringify(programs), () => {
    console.log('Data successfully downloaded from the Chimera server.');
  })

};

program
  .option('-s, --slice <n>', parseInt)
  .option('-a --all')
  .parse(process.argv);

if (program.all) {
  run();
} else {
  run(program.slice || EPISODE_SLICE_SIZE);
}
