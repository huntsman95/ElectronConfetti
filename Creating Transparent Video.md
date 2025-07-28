# To create transparent VP9 video

```bash
ffmpeg -i input.mp4 -vf "colorkey=black:0.3:0.2" -c:v libvpx-vp9 -pix_fmt yuva420p -b:v 1M -crf 30 output.webm
```

This assumes the video has a black background