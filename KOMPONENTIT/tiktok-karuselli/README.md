# TikTok-karuselli

Pystyvideoiden (9:16) karuselli: päällimmäinen video keskellä, muut pyörivät pienempinä ja himmennettyinä sen takana sivuilla, jotta kävijä näkee useamman videon olevan olemassa.

## Käyttö
```html
<link rel="stylesheet" href="KOMPONENTIT/tiktok-karuselli/tiktok-karuselli.css">

<div class="ttk" data-videos="video1.mp4, video2.mp4, video3.mp4"></div>

<script src="KOMPONENTIT/tiktok-karuselli/tiktok-karuselli.js"></script>
```

- Vaihto nuolista tai klikkaamalla sivuvideota. Indikaattoripisteet saa halutessaan päälle: `data-dots="true"`.
- Kaikki videot autoplay + loop mykistettyinä; keskimmäisessä ohjaimet. Kun käyttäjä laittaa äänen päälle, keskelle tuleva video soi siitä eteenpäin automaattisesti äänen kanssa.
- Muistaa käyttäjän asettaman äänenvoimakkuuden videosta toiseen. Oletusvoimakkuus 35 %, muutettavissa: `data-volume="0.5"`.
- Useampi karuselli samalla sivulla toimii.
- Koko: `style="--ttk-w:300px"`, korostusväri: `--ttk-accent:#ff8c1a`.
- Videot kannattaa pakata: `ffmpeg -i in.mp4 -vf scale=720:-2 -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart out.mp4`

Esimerkki: `esimerkki.html`.
