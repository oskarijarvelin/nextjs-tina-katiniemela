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
            <KuvaBox className='image'>
                <picture>
                    <source media="(max-width: 480px)" srcSet={processUrl(src, 480, 270)} />
                    <source media="(max-width: 1200px)" srcSet={processUrl(src, 1200, 675)} />
                    <source media="(max-width: 1919px)" srcSet={processUrl(src, 1920, 1080)} />
                    <source media="(min-width: 1920px)" srcSet={processUrl(src, 3840, 2160)} />
                    <img src={processUrl(src, 480, 270)} alt={alt} loading="lazy" />
                </picture>
            </KuvaBox>
        );
    }

    if ( orientation == 'hero' ) {
        return (
            <KuvaBox className='image'>
                <picture>
                    <source media="(max-width: 480px)" srcSet={processUrl(src, 480, 480)} />
                    <source media="(max-width: 1200px)" srcSet={processUrl(src, 1200, 900)} />
                    <source media="(max-width: 1919px)" srcSet={processUrl(src, 1920, 1700)} />
                    <source media="(min-width: 1920px)" srcSet={processUrl(src, 3840, 3600)} />
                    <img src={processUrl(src, 480, 270)} alt={alt} loading="lazy" />
                </picture>
            </KuvaBox>
        );
    }

    if ( orientation == 'palsta' ) {
        return (
            <KuvaBox className='image'>
                <picture>
                    <source media="(max-width: 480px)" srcSet={processUrl(src, 480, 480)} />
                    <source media="(max-width: 1200px)" srcSet={processUrl(src, 1200, 900)} />
                    <source media="(max-width: 1919px)" srcSet={processUrl(src, 1920, 1920)} />
                    <source media="(min-width: 1920px)" srcSet={processUrl(src, 3840, 3840)} />
                    <img src={processUrl(src, 480, 270)} alt={alt} loading="lazy" />
                </picture>
            </KuvaBox>
        );
    }

    if ( orientation == 'julkaisu' ) {
        return (
            <KuvaBox className='image'>
                <picture>
                    <source media="(max-width: 239px)" srcSet={processUrl(src, 240, 240)} />
                    <source media="(in-width: 240px)" srcSet={processUrl(src, 480, 480)} />
                    <img src={processUrl(src, 480, 480)} alt={alt} loading="lazy" />
                </picture>
            </KuvaBox>
        );
    }

    return (
        <KuvaBox className='image'>
            <picture>
                <source media="(max-width: 480px)" srcSet={processUrl(src, 480, 270)} />
                <source media="(max-width: 1200px)" srcSet={processUrl(src, 1200, 675)} />
                <source media="(max-width: 1919px)" srcSet={processUrl(src, 1920, 1080)} />
                <source media="(min-width: 1920px)" srcSet={processUrl(src, 3840, 2160)} />
                <img src={processUrl(src, 480, 270)} alt={alt} loading="lazy" />
            </picture>
        </KuvaBox>
    );
}