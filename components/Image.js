import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import NextImage from 'next/image';

const KuvaBox = styled(Box)({
    position: 'relative',
    '& img': {
        maxWidth: '100%',
        height: 'auto',
        width: '100%',
    }
});

// Process Cloudinary URL with optimizations (auto format, auto quality)
function processUrl(img, w, h) {
    return img.replace("upload/", `upload/c_fill,g_faces,w_${w},h_${h},f_auto,q_auto/`);
}

// Generate a simple blur data URL for placeholder
function getBlurDataURL() {
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzIyMiIvPjwvc3ZnPg==';
}

export default function Image({src, orientation, alt}) {
    // Ensure alt text is always provided for accessibility
    const altText = alt || '';
    
    if ( orientation == 'landscape' ) {
        return (
            <KuvaBox className='image'>
                <NextImage
                    src={processUrl(src, 1920, 1080)}
                    alt={altText}
                    width={1920}
                    height={1080}
                    sizes="(max-width: 480px) 480px, (max-width: 1200px) 1200px, (max-width: 1920px) 1920px, 100vw"
                    placeholder="blur"
                    blurDataURL={getBlurDataURL()}
                    style={{ width: '100%', height: 'auto' }}
                />
            </KuvaBox>
        );
    }

    if ( orientation == 'hero' ) {
        return (
            <KuvaBox className='image'>
                <NextImage
                    src={processUrl(src, 1920, 1700)}
                    alt={altText}
                    width={1920}
                    height={1700}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL={getBlurDataURL()}
                    priority
                    fetchPriority="high"
                    style={{ width: '100%', height: 'auto' }}
                />
            </KuvaBox>
        );
    }

    if ( orientation == 'palsta' ) {
        return (
            <KuvaBox className='image'>
                <NextImage
                    src={processUrl(src, 1920, 1500)}
                    alt={altText}
                    width={1920}
                    height={1500}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL={getBlurDataURL()}
                    style={{ width: '100%', height: 'auto' }}
                />
            </KuvaBox>
        );
    }

    if ( orientation == 'julkaisu' ) {
        return (
            <KuvaBox className='image'>
                <NextImage
                    src={processUrl(src, 480, 480)}
                    alt={altText}
                    width={480}
                    height={480}
                    sizes="(max-width: 240px) 240px, 480px"
                    placeholder="blur"
                    blurDataURL={getBlurDataURL()}
                    style={{ width: '100%', height: 'auto' }}
                />
            </KuvaBox>
        );
    }

    return (
        <KuvaBox className='image'>
            <NextImage
                src={processUrl(src, 1920, 1080)}
                alt={altText}
                width={1920}
                height={1080}
                sizes="(max-width: 480px) 480px, (max-width: 1200px) 1200px, (max-width: 1920px) 1920px, 100vw"
                placeholder="blur"
                blurDataURL={getBlurDataURL()}
                style={{ width: '100%', height: 'auto' }}
            />
        </KuvaBox>
    );
}