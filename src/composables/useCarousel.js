import { useCallback, useMemo, useState } from 'react';
const getAltMedia = ({ media_type, label, video_content }) => {
    return label || (
        media_type === 'external-video' ? video_content?.video_title : ''
    ) || '';
};
const priorityImage = [
    "image",
    "small_image",
    "thumbnail",
    "swatch_image"
];
const getPriority = types => {
    const index = priorityImage.indexOf(types?.[0])
    return index > -1 ? index : Infinity
}
const sortImages = (images = []) => {
    let priA;
    let priB;
    return images
        .filter(({ disabled }) => !disabled)
        .sort((a, b) => {
            priA = getPriority(a.types);
            priB = getPriority(b.types);
            if(priA !== Infinity || priB !== Infinity) {
                return priA - priB
            }
            else {
                return a.position - b.position;
            }
        })
        .map(media => ({...media, label: getAltMedia(media)}))
};

/**
 * A hook for interacting with the state of a carousel of images.
 *
 * @param {Array} images an array of image objects
 * @param {number} startIndex the index at which to start the carousel
 */
export const useCarousel = (images = [], startIndex = 0) => {
    const [activeItemIndex, setActiveItemIndex] = useState(startIndex);

    const sortedImages = useMemo(() => sortImages(images), [images]);
    const handlePrevious = useCallback(() => {
        // If we're on the first image we want to go to the last.
        setActiveItemIndex(prevIndex => {
            if (prevIndex > 0) {
                return prevIndex - 1;
            } else {
                return images.length - 1;
            }
        });
    }, [images]);

    const handleNext = useCallback(() => {
        // If we're on the last image we want to go to the first.
        setActiveItemIndex(prevIndex => (prevIndex + 1) % images.length);
    }, [images]);

    const api = useMemo(
        () => ({ handlePrevious, handleNext, setActiveItemIndex }),
        [handlePrevious, handleNext, setActiveItemIndex]
    );

    const state = {
        activeItemIndex,
        sortedImages
    };

    return [state, api];
};
