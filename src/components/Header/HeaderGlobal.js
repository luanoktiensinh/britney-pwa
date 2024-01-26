import React, { Fragment, Suspense, useEffect, useRef, useState } from 'react';
import {
    Search as IconSearch, X as IconClose
} from 'react-feather';
import Icon from '@magento/venia-ui/lib/components/Icon/index.js';
import SharedDialog from '../Dialog/SharedDialog';
import { DialogUtils } from '../Dialog/DialogUtils';
import Image from '@magento/venia-ui/lib/components/Image';
import DesktopLogo from "src/images/Logo/desktop-logo--briscoes.png";
import MobileLogo from "src/images/Logo/mobile-logo--briscoes.png";
import IconDelivery from "src/images/Icons/icon-delivery.png";
import IconRegion from "src/images/Icons/icon-region.png";

const HeaderGlobal = props => {
    const [currentFocus, setCurrentFocus] = useState(null),
        [openPostcodeDialog, setOpenPostcodeDialog] = useState(false),
        dropdownSuggestionRef = useRef(null),
        dropdownAccountRef = useRef(null),
        dropdownCartRef = useRef(null),
        FOCUS_INPUT_SEARCH="search",
        FOCUS_ACCOUNT="account",
        FOCUS_CART="cart";

    const closeDropdown = () => {
        setCurrentFocus("");
    }

    const handleCloseDialog = () => {
        setOpenPostcodeDialog(false);
    }

    const { 
        useOutsideDetection 
    } = DialogUtils({callback: closeDropdown});
    useOutsideDetection(dropdownSuggestionRef);

    return (
        <Fragment>
            <SharedDialog open={openPostcodeDialog} onCloseDialog={handleCloseDialog}>
                <div>Dialog Content</div>
            </SharedDialog>
            <div className="header-global">
                <div className="header-global__container">
                    <div className="header-global__logo">
                        <button className="header-global__navbar-toggler" type="button">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        <a href="/">
                            <Image className="img-fluid header-global__logo--img d-lg-none" src={DesktopLogo} alt="Logo"></Image>
                            <Image className="img-fluid header-global__logo--img d-none d-lg-block" src={MobileLogo} alt="Logo"></Image>
                        </a>
                    </div>
                    <div className="header-global__main">
                        <div ref={dropdownSuggestionRef} className={["header-global__search", currentFocus == FOCUS_INPUT_SEARCH ? "active" : ""].join(" ")} onClick={() => setCurrentFocus(FOCUS_INPUT_SEARCH)}>
                            <form action="/search2/" method="get" className="header-global__search--form">
                                <input type="text" name="q" className="header-global__search--input siteHeader-searchField form-control" placeholder="What are you looking for?" autoComplete="off"/>
                                <button type="button" className="header-global__search--close-btn">
                                    <span className="icon-close"></span>
                                    Close
                                </button>
                                <button type="submit" className="header-global__search--submit-btn">
                                    <Icon
                                        className="svg-icon-search"
                                        src={IconSearch}
                                        size={30}
                                    />
                                    {/* <span className="icon-search"></span> */}
                                </button>
                            </form>
                            <div className="header-global__suggest">
                                <div className="header-global__suggest--wrapper">
                                    <div className="header-global__suggest--container">
                                        <div className="header-global__suggest--main">
                                            <div className="row">
                                                <div className="col-12 col-md-4 col-lg-5 header-global__suggest--category">
                                                    <div className="header-global__suggest--link">
                                                        <div className="header-global__suggest--block">
                                                            <div className="header-global__suggest--block-heading">
                                                                <span className="text">Category</span>
                                                            </div>
                                                            <ul className="header-global__suggest--block-list">
                                                                <li>
                                                                    <a target="_self" href="/search2/?q=&amp;type=Accessories" className="klevu-track-click" data-url="/search2/?q=&amp;type=Accessories" data-name="Accessories">Accessories</a>
                                                                </li>
                                                                <li>
                                                                    <a target="_self" href="/search2/?q=&amp;type=Storage" className="klevu-track-click" data-url="/search2/?q=&amp;type=Storage" data-name="Storage">Storage</a>
                                                                </li>
                                                                <li>
                                                                    <a target="_self" href="/search2/?q=&amp;type=Mugs" className="klevu-track-click" data-url="/search2/?q=&amp;type=Mugs" data-name="Mugs">Mugs</a>
                                                                </li>
                                                                <li>
                                                                    <a target="_self" href="/search2/?q=&amp;type=Kids" className="klevu-track-click" data-url="/search2/?q=&amp;type=Kids" data-name="Kids">Kids</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="header-global__suggest--block">
                                                            <div className="header-global__suggest--block-heading">
                                                                <span className="text">Brands</span>
                                                            </div>
                                                            <ul className="header-global__suggest--block-list">
                                                                <li>
                                                                    <a target="_self" href="/search2/?q=&amp;brand=Maxwell%20%26%20Williams" className="klevu-track-click" data-url="/search2/?q=&amp;brand=Maxwell%20%26%20Williams" data-name="Maxwell &amp; Williams">Maxwell &amp; Williams</a>
                                                                </li>
                                                                <li>
                                                                    <a target="_self" href="/search2/?q=&amp;brand=Just%20Home" className="klevu-track-click" data-url="/search2/?q=&amp;brand=Just%20Home" data-name="Just Home">Just Home</a>
                                                                </li>
                                                                <li>
                                                                    <a target="_self" href="/search2/?q=&amp;brand=Brabantia" className="klevu-track-click" data-url="/search2/?q=&amp;brand=Brabantia" data-name="Brabantia">Brabantia</a>
                                                                </li>
                                                                <li>
                                                                    <a target="_self" href="/search2/?q=&amp;brand=Simon%20Gault" className="klevu-track-click" data-url="/search2/?q=&amp;brand=Simon%20Gault" data-name="Simon Gault">Simon Gault</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-8 col-lg-7 header-global__suggest--products">
                                                    <div className="header-global__suggest--products-container">
                                                        <div className="header-global__suggest--block-heading">
                                                            <span className="text">Popular Products</span>
                                                        </div>
                                                        <div className="header-global__suggest--products-result" id="productsList">
                                                            <ul className="header-global__suggest--products-list">
                                                                <li className="header-global__suggest--item" data-id="1093874">
                                                                    <a target="_self" href="/" data-id="1093874" className="header-global__suggest--item-action">
                                                                        <div className="header-global__suggest--item-top">
                                                                            <div className="img-wrapper">
                                                                                <div className="discount-badge">
                                                                                    <strong></strong>
                                                                                </div>
                                                                                <img src="/" alt="Sunbeam Schott Capri Glass Kettle 1.7 Litre KE6150" className="klevuQuickImg"/>
                                                                            </div>
                                                                        </div>
                                                                        <div className="header-global__suggest--item-bottom">
                                                                            <div className="product-description">
                                                                                <div className="product-name">Sunbeam Schott Capri Glass Kettle 1.7 Litre KE6150</div>
                                                                                <div className="product-price">
                                                                                    <p className="product-price--original">Was $169.99</p>
                                                                                    <p className="product-price--discount">Now $49.99</p>
                                                                                    <div className="kuClearBoth"></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="header-global__suggest--item-label">
                                                                            <div className="product-label product-label--new">
                                                                                <span>HOT PRICE</span>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </li>
                                                                <li className="header-global__suggest--item" data-id="1100520">
                                                                    <a target="_self" href="/" data-id="1100520" className="header-global__suggest--item-action">
                                                                        <div className="header-global__suggest--item-top">
                                                                            <div className="img-wrapper">
                                                                                <div className="discount-badge">
                                                                                    <strong></strong>
                                                                                </div>
                                                                                <img src="/" alt="Hotel At Home Slumberest Twin Pack Pillow" className="klevuQuickImg"/>
                                                                            </div>
                                                                        </div>
                                                                        <div className="header-global__suggest--item-bottom">
                                                                            <div className="product-description">
                                                                                <div className="product-name">Hotel At Home Slumberest Twin Pack Pillow</div>
                                                                                <div className="product-price">
                                                                                    <p className="product-price--discount">Now $27.50</p>
                                                                                    <div className="kuClearBoth"></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="header-global__suggest--item-label">
                                                                            <div className="product-label product-label--sale">
                                                                                <span>50% OFF</span>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </li>
                                                                <li className="header-global__suggest--item" data-id="1085524">
                                                                    <a target="_self" href="/" data-id="1085524" className="header-global__suggest--item-action">
                                                                        <div className="header-global__suggest--item-top">
                                                                            <div className="img-wrapper">
                                                                                <div className="discount-badge">
                                                                                    <strong></strong>
                                                                                </div>
                                                                                <img src="/" alt="Hampton &amp; Mason Everyday Steak Knife Set 6pc" className="klevuQuickImg"/>
                                                                            </div>
                                                                        </div>
                                                                        <div className="header-global__suggest--item-bottom">
                                                                            <div className="product-description">
                                                                                <div className="product-name">Hampton &amp; Mason Everyday Steak Knife Set 6pc</div>
                                                                                <div className="product-price">
                                                                                    <p className="product-price--discount">Now $11.99</p>
                                                                                    <div className="kuClearBoth"></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="header-global__suggest--item-label">
                                                                            <div className="product-label product-label--sale">
                                                                                <span>40% OFF</span>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </li>
                                                                <li className="header-global__suggest--item" data-id="1106273">
                                                                    <a target="_self" href="/" data-id="1106273" className="header-global__suggest--item-action">
                                                                        <div className="header-global__suggest--item-top">
                                                                            <div className="img-wrapper">
                                                                                <div className="discount-badge">
                                                                                    <strong></strong>
                                                                                </div>
                                                                                <img src="/" alt="Tefal Easy Frypan 2 Pack 20cm &amp; 28cm" className="klevuQuickImg"/>
                                                                            </div>
                                                                        </div>
                                                                        <div className="header-global__suggest--item-bottom">
                                                                            <div className="product-description">
                                                                                <div className="product-name">Tefal Easy Frypan 2 Pack 20cm &amp; 28cm</div>
                                                                                <div className="product-price">
                                                                                    <p className="product-price--original">Was $169.99</p>
                                                                                    <p className="product-price--discount">Now $49.99</p>
                                                                                    <div className="kuClearBoth"></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="header-global__suggest--item-label">
                                                                            <div className="product-label product-label--new">
                                                                                <span>HOT PRICE</span>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                            <div className="klevuProductsViewAll button-btn button--primary">
                                                                <a href="/search2/?q=" target="_parent"> See all Results </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>      
                    </div>
                    <div className="header-global__delivery">
                        <div className="header-global__label">
                            <div className="header-global__label--modal" onClick={() => setOpenPostcodeDialog(true)}>
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
                                <li ref={dropdownAccountRef} className={currentFocus == FOCUS_ACCOUNT ? "active": ""}>
                                    <div className="header-icon" onClick={() => setCurrentFocus(FOCUS_ACCOUNT)}>
                                        <img className="icon-wrapper icon-account" src='/icon-account.svg' alt=''/>
                                    </div>
                                    <div className="header-expand">
                                        <div className="dropdown-heading">
                                            <div className="dropdown-title">
                                                <div className="icon-account">
                                                    <img className="icon-account__img" src='/icon-account.svg' alt=''/>
                                                </div>
                                                <div className="account-name"></div>
                                            </div>
                                            {/* <div className="icon-close"></div> */}
                                            <Icon
                                                className="svg-icon-close"
                                                src={IconClose}
                                                size={30}
                                                onClick={() => setCurrentFocus("")}
                                            />
                                        </div>
                                        <ul className="account-link-list">
                                            <li>
                                                <a href="/login/" title="Login">Login</a>
                                            </li>
                                            <li>
                                                <a href="/register/">Register</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <div className="header-icon js-wishlist">
                                        <a href="/wishlist/">
                                            <img className="icon-wrapper icon-heart" src='/icon-wishlist.svg' alt=''></img>
                                        </a>
                                    </div>
                                </li>
                                <li ref={dropdownCartRef} className={["header-item-cart", currentFocus == FOCUS_CART ? "active" : ""].join(" ")}>
                                    <div className="header-icon visible-desktop" onClick={() => setCurrentFocus(FOCUS_CART)}>
                                        <img className="icon-wrapper icon-cart" src='/icon-shopping-cart.svg' alt=''></img>
                                    </div>
                                    <a href="/cart/" className='visible-mobile'>
                                        <img className="icon-wrapper icon-cart" src='/icon-shopping-cart.svg' alt=''></img>
                                    </a>
                                    <div className="header-expand cart-dropdown">
                                        <div className="dropdown-heading">
                                            <div className="dropdown-title">Cart</div>
                                            {/* <div className="icon-close"></div> */}
                                            <Icon
                                                className="svg-icon-close"
                                                src={IconClose}
                                                size={30}
                                                onClick={() => setCurrentFocus("")}
                                            />
                                        </div>
                                        <div className="cart-content">
                                            <div className="cart-list">
                                                <div className="no-cart-items py-3 font-weight-bold d-flex justify-content-center align-item-center"> Your cart is empty </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default HeaderGlobal;