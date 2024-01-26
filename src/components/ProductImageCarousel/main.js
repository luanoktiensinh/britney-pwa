import React, { forwardRef, useRef } from 'react'
import Image from '@magento/venia-ui/lib/components/Image';
import PropTypes from 'prop-types'
import Slider from 'react-slick';

import VideoSlide from './videoSlide';
const MainSlider = forwardRef((props, ref) => {
    const { 
        images, initialSlide, width, classes, thumb, onChangeSlide,
        onClickSlide,
        swipe= false
    } = props;
    const videoRefs = useRef([]);
    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        arrows: false,
        speed: 0,
        swipe,
        initialSlide,
        asNavFor: thumb,
        afterChange(index) {
            onChangeSlide(index);
            stopVideo();
        }
    };
    const stopVideo = () => {
        videoRefs.current && videoRefs.current.filter(Boolean)
            .forEach(videoRef => videoRef.stop());
    };
    const isVideo = media => media.media_type === 'external-video';
    const imageListNode = (
        images.map((item, index) => (
            isVideo(item) ? (
                <VideoSlide
                    className='px-4 relative'
                    key={item.uid}
                    poster={item.file}
                    alt={item.label}
                    width={width}
                    classes={classes}
                    src={item.video_content?.video_url}
                    ref={videoSlide => videoRefs.current[index] = videoSlide}
                />
            ): (
                <button 
                    className='flex px-4 relative' key={item.uid}
                    type='button'
                    onClick={onClickSlide}
                >
                    <Image
                        alt={item.label}
                        classes={{
                            root: classes.imageContainer,
                            image: 'w-full object-contain',
                            loaded: '',
                            notLoaded: '',
                            placeholder: 'absolute w-0 h-0 opacity-0',
                            placeholder_layoutOnly: 'absolute w-0 h-0 opacity-0'
                        }}
                        resource={item.file}
                        width={width}
                    />
                </button>
            )
        ))
    );
    const mainSlider = (
        <Slider {...settings} 
            className='w-full main-slider'
            ref={ref}
        >
            {imageListNode}
        </Slider>
    );
    return mainSlider;
});

MainSlider.propTypes = {
    images: PropTypes.array.isRequired,
    swipe: PropTypes.bool,
    initialSlide: PropTypes.number,
    width: PropTypes.number,
    classes: PropTypes.object.isRequired,
    thumb: PropTypes.any,
    onChangeSlide: PropTypes.func.isRequired,
    onClickSlide: PropTypes.func.isRequired
}
MainSlider.defaultProps = {
    initialSlide: 0,
    onChangeSlide: () => {}
}

export default MainSlider;