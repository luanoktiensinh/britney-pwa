import React, { Fragment, Suspense, lazy, useRef, useState, useEffect } from 'react';
import { any, string } from 'prop-types';

import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator/index.js';

const LazyLoadComponent = lazy(() => import('@magento/venia-ui/lib/components/RichContent'));

const LazyLoadRichContent = props => {
    const { htmlContent } = props;
    const containerRef = useRef(null);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        const containerEl = containerRef.current;
        if (containerEl) {
            const observer = new window.IntersectionObserver(entries => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting & entry.target?.previousSibling?.offsetHeight > 0) {
                        setShown(true);
                    }
                });
            });
            observer.observe(containerEl);
        }
    });
    return (
        <div ref={containerRef} data-show={shown}>
            {
                shown && 
                <Suspense fallback={<LoadingIndicator />}>
                    <LazyLoadComponent html={htmlContent} />
                </Suspense>
            }
        </div>
    );
};

LazyLoadRichContent.propTypes = {
    htmlContent: string,
    mainRef: any
};

export default LazyLoadRichContent;