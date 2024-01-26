import React, { useMemo, useRef, useState, useEffect } from 'react';
import { arrayOf, bool, number, shape, string } from 'prop-types';
import { useIntl } from 'react-intl';
import {
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon
} from 'react-feather';
import { useProductImageCarousel } from '@magento/peregrine/lib/talons/ProductImageCarousel/useProductImageCarousel';
import Lightbox from './Lightbox';
import { useStyle } from '@magento/venia-ui/lib/classify.js';
import AriaButton from '@magento/venia-ui/lib/components/AriaButton';
import Icon from '@magento/venia-ui/lib/components/Icon/index.js';
import defaultClasses from 'src/styles/ProductImageCarousel/carousel.module.css';
import ThumbSlider from './thumb';
import Main from './main';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import 'src/styles/ProductImageCarousel/imageCarousel.scss';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

const IMAGE_WIDTH = 640;

/**
 * Carousel component for product images
 * Carousel - Component that holds number of images
 * where typically one image visible, and other
 * images can be navigated through previous and next buttons
 *
 * @typedef ProductImageCarousel
 * @kind functional component
 *
 * @param {props} props
 *
 * @returns {React.Element} React carousel component that displays a product image
 */
const ProductImageCarousel = props => {
    const { images } = props;
    const { formatMessage } = useIntl();
    const talonProps = useProductImageCarousel({
        images,
        imageWidth: IMAGE_WIDTH
    });
    const [ activeItemIndex, setActiveItemIndex ] = useState(0);
    const [initialSlide, setInitialSlide] = useState(0);
    const [ showLightBox, setShowLightBox ] = useState(false);
    const [thumbSlider, setThumbSlider] = useState(null);
    const [mainSlider, setMainSlider] = useState(null);
    const carouselRef = useRef();
    const lightBoxRef = useRef();

    const {
        handleThumbnailClick,
        sortedImages
    } = talonProps;
    const imagesLength = sortedImages.length;
    // create thumbnail image component for every images in sorted order
    const changeSlideByIndex = index => {
        if(index >= 0 && index !== activeItemIndex) {
            mainSlider.slickGoTo(index);
            setActiveItemIndex(index);
            handleThumbnailClick(index);
        }
    };
    const handleNext = () => {
        const targetIndex = activeItemIndex + imagesLength + 1;
        changeSlideByIndex(targetIndex % imagesLength);
    }
    const handlePrevious = () => {
        const targetIndex = activeItemIndex + imagesLength - 1;
        changeSlideByIndex(targetIndex % imagesLength);
    }
    useEffect(() => {
        changeSlideByIndex(0);
    }, [sortedImages]);
    const openLightBox = () => {
        setInitialSlide(activeItemIndex);
        setShowLightBox(true);
    };
    const closeLightBox = () => {
        setInitialSlide(activeItemIndex);
        setShowLightBox(false)
    }
    const classes = useStyle(defaultClasses, props.classes);

    const previousButton = formatMessage({
        id: 'productImageCarousel.previousButtonAriaLabel',
        defaultMessage: 'Previous Image'
    });

    const nextButton = formatMessage({
        id: 'productImageCarousel.nextButtonAriaLabel',
        defaultMessage: 'Next Image'
    });

    const mainSliderContent = useMemo(() => (
        <Main
            ref={(slider) => setMainSlider(slider)}
            images={sortedImages}
            width={IMAGE_WIDTH}
            initialSlide={initialSlide}
            classes={classes}
            thumb={thumbSlider}
            swipe={showLightBox}
            onChangeSlide={changeSlideByIndex}
            onClickSlide={openLightBox}
        />
    ), [sortedImages, showLightBox, activeItemIndex, thumbSlider]);
    const thumbSliderContent = useMemo(() => {
        return (<ThumbSlider
            key={sortedImages}
            ref={(slider) => setThumbSlider(slider)}
            images={sortedImages}
            activeItemIndex={activeItemIndex}
            initialSlide={initialSlide}
            classes={classes}
            vertical={!showLightBox}
            main={mainSlider}
        />)
    }, [ sortedImages, showLightBox, activeItemIndex, mainSlider]);
    const carouselContent = (
        carouselRef.current && (
            createPortal(
                <div className={classNames(
                    classes.root,
                    {
                        [classes.rootDialog]: showLightBox,
                        'carousel-root-dialog': showLightBox
                    }
                )}>
                    <div className={classNames(classes.carouselContainer, {[classes.carouselContainerDialog] : showLightBox})}>
                        <AriaButton
                            className={`${classes.previousButton} pdp-carousel-btn`}
                            onPress={handlePrevious}
                            aria-label={previousButton}
                            type="button"
                        >
                            <Icon
                                classes={chevronClasses}
                                src={ChevronLeftIcon}
                                size={30}
                            />
                        </AriaButton>
                        {mainSliderContent}
                        <AriaButton
                            className={`${classes.nextButton} pdp-carousel-btn`}
                            onPress={handleNext}
                            aria-label={nextButton}
                            type="button"
                        >
                            <Icon
                                classes={chevronClasses}
                                src={ChevronRightIcon}
                                size={30}
                            />
                        </AriaButton>
                    </div>
                    <div className={classNames(
                        classes.thumbnailList,
                        {
                            [classes.thumbnailListNoDialog]: !showLightBox
                        }
                    )}>
                        {thumbSliderContent}
                    </div>
                </div>,
                showLightBox ? lightBoxRef.current : carouselRef.current
            )
        )
    )
    const chevronClasses = { root: classes.chevron };
    return (
        <div ref={carouselRef}>
            {carouselContent}
            <Lightbox
                ref={lightBoxRef}
                show={showLightBox}
                onCancel={closeLightBox}
            />
        </div>
    );
};

/**
 * Props for {@link ProductImageCarousel}
 *
 * @typedef props
 *
 * @property {Object} classes An object containing the class names for the
 * ProductImageCarousel component
 * @property {string} classes.currentImage classes for visible image
 * @property {string} classes.imageContainer classes for image container
 * @property {string} classes.nextButton classes for next button
 * @property {string} classes.previousButton classes for previous button
 * @property {string} classes.root classes for root container
 * @property {Object[]} images Product images input for Carousel
 * @property {bool} images[].disabled Is image disabled
 * @property {string} images[].file filePath of image
 * @property {string} images[].uid the id of the image
 * @property {string} images[].label label for image
 * @property {string} images[].position Position of image in Carousel
 */
ProductImageCarousel.propTypes = {
    classes: shape({
        carouselContainer: string,
        currentImage: string,
        currentImage_placeholder: string,
        imageContainer: string,
        nextButton: string,
        previousButton: string,
        root: string
    }),
    images: arrayOf(
        shape({
            label: string,
            position: number,
            disabled: bool,
            file: string.isRequired,
            uid: string.isRequired
        })
    ).isRequired
};

export default ProductImageCarousel;
