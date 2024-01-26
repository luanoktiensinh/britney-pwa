import React, { Suspense, lazy, useRef } from 'react';
import { useIsInViewport } from '@magento/peregrine/lib/hooks/useIsInViewport';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator/index.js';

const LazyLoadComponent = lazy(() => 
    import('src/components/Footer/footer.js')
);

const LazyLoadFooter = props => {
    const containerRef = useRef(null);
    const shouldRenderContent = useIsInViewport({
        elementRef: containerRef
    });

    return (
        <div ref={containerRef}>
            <Suspense fallback={<LoadingIndicator />}>
                {shouldRenderContent ? <LazyLoadComponent /> : null}
            </Suspense>
        </div>
    );
};

export default LazyLoadFooter;