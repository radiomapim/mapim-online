const { spawn } = require('child_process');

const audioURL = 'https://stream.zeno.fm/7wbprc3ce4qvv';
const logoFile = 'logo.png';
const streamKey = 'COLE_AQUI_SUA_CHAVE_DO_YOUTUBE';

const ffmpegArgs = [
  '-re', '-i', audioURL,
  '-loop', '1', '-i', logoFile,
  '-c:v', 'libx264', '-preset', 'veryfast', '-b:v', '3000k', '-maxrate', '3000k', '-bufsize', '6000k',
  '-pix_fmt', 'yuv420p',
  '-c:a', 'aac', '-b:a', '128k', '-ar', '44100',
  '-f', 'flv', `rtmp://a.rtmp.youtube.com/live2/${streamKey}`
];

const ffmpeg = spawn('ffmpeg', ffmpegArgs);

ffmpeg.stdout.on('data', data => {
  console.log(`FFmpeg stdout: ${data}`);
});

ffmpeg.stderr.on('data', data => {
  console.error(`FFmpeg stderr: ${data}`);
});

ffmpeg.on('close', code => {
  console.log(`FFmpeg exited with code ${code}`);
});
