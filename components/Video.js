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
    }
  });

export default function Video({video}) {
    const divRef = useRef(null);

    const onClick = () => {
        const iframe = document.createElement( "iframe" );
        iframe.setAttribute( "frameborder", "0" );
        iframe.setAttribute( "allowfullscreen", "1");
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
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
            <span onClick={onClick} className="ti-control-play position-absolute display-1 text-white" />
            <img onClick={onClick} loading="lazy" src={`https://img.youtube.com/vi/${video}/hqdefault.jpg`} alt="YouTube Video Thumbnail" />
        </VideoBox>
    );
}