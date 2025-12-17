import { useRef } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const VideoBox = styled(Box)({
    '& img': {
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        top: 0,
        left: 0,
    },
    '& iframe': {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
    },
    '& button': {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'rgba(0, 0, 0, 0.7)',
        border: 'none',
        borderRadius: '50%',
        width: '80px',
        height: '80px',
        cursor: 'pointer',
        zIndex: 1,
        transition: 'background 0.3s ease',
        '&:hover': {
            background: 'rgba(0, 0, 0, 0.9)',
        },
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '55%',
            transform: 'translate(-50%, -50%)',
            width: 0,
            height: 0,
            borderLeft: '20px solid white',
            borderTop: '12px solid transparent',
            borderBottom: '12px solid transparent',
        }
    }
  });

export default function Video({video, title}) {
    const divRef = useRef(null);

    const onClick = () => {
        const iframe = document.createElement( "iframe" );
        iframe.setAttribute( "frameborder", "0" );
        iframe.setAttribute( "allowfullscreen", "1");
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute( "title", title || "YouTube video");
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.setAttribute( "src", `https://www.youtube.com/embed/${video}?rel=0&showinfo=1&autoplay=1` );
        if (divRef.current) {
            divRef.current.innerHTML = "";
            divRef.current.appendChild(iframe);
        }
    }


    return (
        <VideoBox ref={divRef} sx={{ position: 'relative', height: 0, maxHeight: 0, paddingTop: '56.25%' }}>
            <button onClick={onClick} aria-label={`Toista video: ${title || 'YouTube video'}`} type="button" />
            <img onClick={onClick} loading="lazy" src={`https://img.youtube.com/vi/${video}/hqdefault.jpg`} alt={`Video thumbnail: ${title || 'YouTube video'}`} width="480" height="360" />
        </VideoBox>
    );
}