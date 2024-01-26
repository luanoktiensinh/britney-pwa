import React, { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import Image from '@magento/venia-ui/lib/components/Image';
import {
    PlayCircle as PlayIcon
  } from 'react-feather';
  
const VideoSlide = forwardRef(({ className, poster, src, alt, width, classes }, ref) => {
    const [ playing, setPlaying ] = useState(false);
    useImperativeHandle(ref, () => ({
        stop() {
            setPlaying(false);
        }
    }));
    function getId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
    
        return (match && match[2].length === 11)
          ? match[2]
          : null;
    }
    return (
        <button 
            className={className + ' block w-full relative'}
            type='button'
            onClick={setPlaying.bind(null, !playing)}
        >
            <Image
                alt={alt}
                classes={{
                    image: classes.currentImage,
                    root: classes.imageContainer
                }}
                resource={poster}
                width={width}
            />
            {
                !playing ? (
                    <PlayIcon
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                        color="white"
                        size={60}
                    />
                ): (
                    <iframe
                        className='absolute top-0 left-0 w-full h-full z-10'
                        frameBorder="0"
                        allowFullScreen="1"
                        loading="lazy"
                        src={'https://www.youtube.com/embed/' + getId(src) + '?autoplay=1&rel=0&enablejsapi=1'}
                        title={alt}
                    />
                )
            }
        </button>
    );
});

VideoSlide.propTypes = {
    poster: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    width: PropTypes.number,
    src: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
}

export default VideoSlide