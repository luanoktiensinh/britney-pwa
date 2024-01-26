import React, { Fragment, Suspense, useEffect } from 'react';
import { shape, string } from 'prop-types';
import { Link, Route } from 'react-router-dom';
import { getInitialValue } from 'src/store/actions/compare-products.action';
import { useDispatch, useSelector } from 'react-redux';
// import Logo from './logo';
// import AccountTrigger from '@magento/venia-ui/lib/components/Header/accountTrigger';
// import CartTrigger from '@magento/venia-ui/lib/components/Header/cartTrigger';
import NavTrigger from '@magento/venia-ui/lib/components/Header/navTrigger';
// import SearchTrigger from '@magento/venia-ui/lib/components/Header/searchTrigger';
import OnlineIndicator from '@magento/venia-ui/lib/components/Header/onlineIndicator';
import { useHeader } from '@magento/peregrine/lib/talons/Header/useHeader';
// import resourceUrl from '@magento/peregrine/lib/util/makeUrl';

import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from '@magento/venia-ui/lib/components/Header/header.module.css';
// import StoreSwitcher from '@magento/venia-ui/lib/components/Header/storeSwitcher';
// import CurrencySwitcher from '@magento/venia-ui/lib/components/Header/currencySwitcher';
import MegaMenu from '@magento/venia-ui/lib/components/MegaMenu';
import PageLoadingIndicator from '@magento/venia-ui/lib/components/PageLoadingIndicator';
import Navigation from '../Navigation/navigation';
import megaMenuClasses from 'src/styles/MegaMenu/megaMenu.module.css';
import { useIntl } from 'react-intl';
import HeaderBanner from './HeaderBanner';
import HeaderCustom from './HeaderCustom';
import "../../styles/Header/header.scss";
import "../../styles/Carousel/hero-carousel.scss";

const SearchBar = React.lazy(() => import('@magento/venia-ui/lib/components/SearchBar'));

const Header = props => {
    const {
        handleSearchTriggerClick,
        hasBeenOffline,
        isOnline,
        isSearchOpen,
        searchRef,
        searchTriggerRef
    } = useHeader();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    useEffect(() => {
        dispatch(getInitialValue.bind(null, {isSignedIn: user.isSignedIn, currentUser: user.currentUser}));
    }, [user.currentUser, user.isSignedIn]);
    const classes = useStyle(defaultClasses, props.classes);
    const rootClass = isSearchOpen ? classes.open : classes.closed;

    const searchBarFallback = (
        <div className={classes.searchFallback} ref={searchRef}>
            <div className={classes.input}>
                <div className={classes.loader}>
                    <div className={classes.loaderBefore} />
                    <div className={classes.loaderAfter} />
                </div>
            </div>
        </div>
    );
    const searchBar = isSearchOpen ? (
        <Suspense fallback={searchBarFallback}>
            <Route>
                <SearchBar isOpen={isSearchOpen} ref={searchRef} />
            </Route>
        </Suspense>
    ) : null;

    const { formatMessage } = useIntl();
    const title = formatMessage({ id: 'logo.title', defaultMessage: 'Venia' });

    return (
        <Fragment>
            {/* <div className={classes.switchersContainer}>
                <div className={classes.switchers} data-cy="Header-switchers">
                    <StoreSwitcher />
                    <CurrencySwitcher />
                </div>
            </div> */}
            <div className='header-wrapper'>
                <HeaderBanner></HeaderBanner>
                <HeaderCustom classes={classes}>
                    <div className={classes.primaryActions}>
                        <NavTrigger />
                    </div>                    
                </HeaderCustom>
            </div>
            <header className={rootClass} data-cy="Header-root" style={{position: 'relative'}}>
                {/* <div className={classes.toolbar}>
                    <div className={classes.primaryActions}>
                        <NavTrigger />
                    </div>

                    <Link
                        aria-label={title}
                        to={resourceUrl('/')}
                        className={classes.logoContainer}
                        data-cy="Header-logoContainer"
                    >
                        <Logo classes={{ logo: classes.logo }} />
                    </Link>
                    <div className={classes.secondaryActions}>
                        <SearchTrigger
                            onClick={handleSearchTriggerClick}
                            ref={searchTriggerRef}
                        />
                        <AccountTrigger />
                        <CartTrigger />
                    </div>
                </div> */}
                <MegaMenu classes={megaMenuClasses}/>
                {searchBar}
                <PageLoadingIndicator absolute />
                <Navigation />
            </header>
            <OnlineIndicator
                hasBeenOffline={hasBeenOffline}
                isOnline={isOnline}
            />
        </Fragment>
    );
};

Header.propTypes = {
    classes: shape({
        closed: string,
        logo: string,
        open: string,
        primaryActions: string,
        secondaryActions: string,
        toolbar: string,
        switchers: string,
        switchersContainer: string
    })
};

export default Header;
