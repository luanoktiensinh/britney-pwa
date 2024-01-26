import React, { useMemo, Suspense } from 'react';
import { bool, shape, string } from 'prop-types';
import { useScrollLock } from '@magento/peregrine';
import { useLocation } from 'react-router-dom'
import { useStyle } from '@magento/venia-ui/lib/classify';

import Header from '@magento/venia-ui/lib/components/Header';
import defaultClasses from '@magento/venia-ui/lib/components/Main/main.module.css';
import mainFullScreenClasses from 'src/styles/Main/main.module.css';
import LazyLoadFooter from '../Footer/lazyLoadFooter';

const Main = props => {
    const location = useLocation();
    const isPageFullScreen = useMemo(() => {
        const { pathname } = location;
        const pages = ['login', 'register', 'forgot-password'];
        return pages.some(page => page === pathname.replace(/\//g, ''))
    }, [location]);
    const { children, isMasked } = props;
    const classes = useStyle(defaultClasses, isPageFullScreen ? mainFullScreenClasses : {}, props.classes);

    const rootClass = isMasked ? classes.root_masked : classes.root;
    const pageClass = isMasked ? classes.page_masked : classes.page;

    useScrollLock(isMasked);
    return (
        <main className={rootClass}>
            <Header />
            <div className={pageClass}>{children}</div>
            <LazyLoadFooter />
        </main>
    );
};

export default Main;

Main.propTypes = {
    classes: shape({
        page: string,
        page_masked: string,
        root: string,
        root_masked: string
    }),
    isMasked: bool
};
