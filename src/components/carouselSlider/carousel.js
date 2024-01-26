import React from 'react';
import SlickSlider from 'react-slick';
import GalleryItem from '@magento/venia-ui/lib/components/Gallery/item';
import { useCarousel } from '@magento/pagebuilder/lib/ContentTypes/Products/Carousel/useCarousel';

const Carousel = props => {
    const { settings, items } = props;
    let lazySettings = {
        lazyLoad: "ondemand",
        ...settings
    }

    const { storeConfig } = useCarousel();

    const galleryItem = items.map((item, index) => {
        return (
            <GalleryItem key={index} item={item} storeConfig={storeConfig} />
        );
    });

    return <SlickSlider {...lazySettings}>{galleryItem}</SlickSlider>;
};

export default Carousel;
