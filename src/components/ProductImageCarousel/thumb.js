import React, { forwardRef, useEffect, useMemo } from 'react'
// import Thumbnail from '@magento/venia-ui/lib/components/ProductImageCarousel/thumbnail.js';
import Image from '@magento/venia-ui/lib/components/Image';
import Counter from './counter';
import PropTypes from 'prop-types'
import Slider from 'react-slick';
import { useStyle } from '@magento/venia-ui/lib/classify.js';
import thumbnailStyle from 'src/styles/ProductImageCarousel/thumbnail.module.css';
import defaultClasses from '@magento/venia-ui/lib/components/ProductImageCarousel/thumbnail.module.css';
import {
    Video as VideoIcon
  } from 'react-feather';
const Thumb = forwardRef((props, ref) => {
    const { images, activeItemIndex, initialSlide, vertical, main} = props;
    const slidesToShow = useMemo(() => {
        const result = vertical ? 4 : 6;
        return Math.min(result, images.length);
    }, [images]);
    const settings = {
        slidesToShow: !vertical ? 8 : slidesToShow,
        slidesToScroll: 1,
        infinite: false,
        focusOnSelect: true,
        arrows: false,
        initialSlide,
        vertical,
        verticalSwiping: vertical,
        swipeToSlide: false,
        speed: 300,
        asNavFor: main,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: vertical ? 3 : 5
              }
            },
            {
                breakpoint: 768,
                settings: {
                  slidesToShow: vertical ? 3 : 4
                }
            },
            {
                breakpoint: 480,
                settings: {
                  slidesToShow: 3
                }
            }
        ]
    };
    const classes = useStyle(defaultClasses, thumbnailStyle);
    const isVideo = media => media.media_type === 'external-video';
    const thumbnailList = useMemo(() => (
        images.map((item) => (
            <div 
                key={item.uid}
                className='flex px-4'
            >
                <button
                type="button"
                    className='thumb-slider--button relative h-25 line-clamp-1'
                >
                    <Image
                        alt={item.label}
                        classes={{
                            root: '',
                            container: '',
                            image: 'absolute top-0 left-0 w-full h-full object-contain bg-[#e5e5e5]',
                            loaded: '',
                            placeholder: 'absolute w-0 h-0 opacity-0',
                            placeholder_layoutOnly: 'absolute w-0 h-0 opacity-0'
                        }}
                        resource={item.file}
                    />
                    {
                    isVideo(item) && (
                            <VideoIcon
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                                color="white"
                                size={40}
                            />
                        )
                    }
                </button>
            </div>
        ))
    ), [images, initialSlide]);
    useEffect(() => {
        if(main?.innerSlider && initialSlide >= 0) {
            main.slickGoTo(initialSlide);
        }
    }, [main, initialSlide]);
    const thumbnails = (
        <Slider {...settings} ref={ref} className='thumb-slider'>
            {thumbnailList}
        </Slider>
    );
    return (
        <div className="thumb-slider w-full">
            <Counter
                className={vertical ? 'absolute -bottom-8 left-0 right-0' : 'mb-4'}
                current={activeItemIndex + 1}
                total={images.length}
            />
            {thumbnails}
        </div>
    )
});

Thumb.propTypes = {
    images: PropTypes.array.isRequired,
    activeItemIndex: PropTypes.number.isRequired,
    initialSlide: PropTypes.number,
    vertical: PropTypes.bool.isRequired,
    main: PropTypes.any
}
Thumb.defaultProps = {
    initialSlide: 0,
    vertical: false,
    activeItemIndex: 0
}

export default Thumb;