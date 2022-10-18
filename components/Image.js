import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const KuvaBox = styled(Box)({
    position: 'relative',
    '& img': {
        maxWidth: '100%',
        height: 'auto',
    }
});

function processUrl( img, w, h ) {
    return img.replace("upload/", `upload/c_fill,g_faces,w_${w},h_${h}/`);
}

export default function Image({src, orientation, alt}) {
    if ( orientation == 'landscape' ) {
        return (
            <KuvaBox>
                <picture>
                    <source media="(max-width: 480px)" srcSet={processUrl(src, 480, 270)} />
                    <source media="(max-width: 1280px)" srcSet={processUrl(src, 1280, 720)} />
                    <source media="(max-width: 1919px)" srcSet={processUrl(src, 1920, 1080)} />
                    <source media="(min-width: 1920px)" srcSet={processUrl(src, 3840, 2160)} />
                    <img src={processUrl(src, 480, 270)} alt={alt} loading="lazy" />
                </picture>
            </KuvaBox>
        );
    }
}