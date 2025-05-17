const { spawn } = require('child_process');

const audioURL = 'https://stream.zeno.fm/7wbprc3ce4qvv';
const logoFile = 'https://mapim.home.blog/wp-content/uploads/2025/05/dizzer1200-web.png?w=948';
const streamKey = 'fs56-ztuy-kuz9-pzgq-amqk';

const ffmpegArgs = [
  '-re', '-i', https://stream.zeno.fm/7wbprc3ce4qvv,
  '-loop', '1', '-i', https://mapim.home.blog/wp-content/uploads/2025/05/dizzer1200-web.png?w=948,
  '-c:v', 'libx264', '-preset', 'veryfast', '-b:v', '3000k', '-maxrate', '3000k', '-bufsize', '6000k',
  '-pix_fmt', 'yuv420p',
  '-c:a', 'aac', '-b:a', '128k', '-ar', '44100',
  '-f', 'flv', `rtmp://b.rtmp.youtube.com/live2?backup=1`
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
