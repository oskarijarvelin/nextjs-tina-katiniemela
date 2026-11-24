// YouTube-video: esikatselukuva ensin, soitin ladataan vasta klikkauksesta (kevyempi sivu, ei evästeitä ennen toistoa)
import { useState } from 'react';

export function youtubeId(url) {
  const match = (url || '').match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/);
  return match && match[7].length === 11 ? match[7] : null;
}

export default function Video({ video, title }) {
  const [toista, setToista] = useState(false);
  const nimi = title || 'YouTube-video';
  return (
    <div className="yt">
      {toista ? (
        <iframe src={`https://www.youtube-nocookie.com/embed/${video}?rel=0&autoplay=1`} title={nimi}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://img.youtube.com/vi/${video}/hqdefault.jpg`} alt="" loading="lazy" width="480" height="360" />
          <button type="button" className="yt-play" onClick={() => setToista(true)} aria-label={`Toista video: ${nimi}`}>
            <span><svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4v16l13-8z" /></svg></span>
          </button>
        </>
      )}
    </div>
  );
}
