import React, { Fragment, Suspense, useEffect, useRef, useState, useStyle } from 'react';
import { Link, Route } from 'react-router-dom';
import { useHeader } from '@magento/peregrine/lib/talons/Header/useHeader';
import AccountTrigger from '@magento/venia-ui/lib/components/Header/accountTrigger';
import CartTrigger from '@magento/venia-ui/lib/components/Header/cartTrigger';
import Image from '@magento/venia-ui/lib/components/Image';
import DesktopLogo from "src/images/Logo/desktop-logo--briscoes.png";
import MobileLogo from "src/images/Logo/mobile-logo--briscoes.png";
import IconDelivery from "src/images/Icons/icon-delivery.png";
import IconRegion from "src/images/Icons/icon-region.png";

const SearchBar = React.lazy(() => import('@magento/venia-ui/lib/components/SearchBar'));

const HeaderCustom = props => {
    const {
        handleSearchTriggerClick,
        hasBeenOffline,
        isOnline,
        isSearchOpen,
        searchRef,
        searchTriggerRef
    } = useHeader();
    const { children, classes } = props;
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
    const searchBar = (
        <Suspense fallback={searchBarFallback}>
            <Route>
                <SearchBar isOpen={isSearchOpen} ref={searchRef} />
            </Route>
        </Suspense>
    );

    return (
        <Fragment>
            <div className="header-global">
                <div className="header-global__container">
                    <div className="header-global__logo">
                        {children}
                        <a href="/">
                            <Image className="img-fluid header-global__logo--img d-lg-none" src={DesktopLogo} alt="Logo"></Image>
                            <Image className="img-fluid header-global__logo--img d-none d-lg-block" src={MobileLogo} alt="Logo"></Image>
                        </a>
                    </div>
                    <div className="header-global__main">
                        <div className="header-global__search">
                            {searchBar}
                        </div>      
                    </div>
                    <div className="header-global__delivery">
                        <div className="header-global__label">
                            <div className="header-global__label--modal">
                                <Image src={IconDelivery} alt="Delivery"></Image>
                                <div className="header-global__label--modal-detail">
                                    <div className='d-none d-lg-block'>DELIVERY POSTCODE</div>
                                    <div className='d-lg-none'>ENTER POSTCODE</div>
                                    <div className="selected-val selected-postcode">Set your postcode</div>
                                </div>
                            </div>
                        </div>
                        <div className="header-global__label">
                            <div className="header-global__label--modal">
                                <Image src={IconRegion} alt="Region"></Image>
                                <div className="header-global__label--modal-detail">
                                    <div className='d-none d-lg-block'>YOUR STORE</div>
                                    <div className='d-lg-none'>SELECT STORE</div>
                                    <div className="selected-val selected-store">Choose your store</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="header-global__utility">
                        <div className="header-global__action">
                            <ul>
                                <li>
                                    <AccountTrigger />
                                </li>
                                <li className="header-item-cart">
                                    <CartTrigger />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default HeaderCustom;