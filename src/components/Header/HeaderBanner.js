import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Image from '@magento/venia-ui/lib/components/Image';
import IconPanelReturn from "src/images/Icons/icon-panel-return.png";
import IconPanelShipping from "src/images/Icons/icon-panel-standard-shipping.png";

const HeaderBanner = props => {
    return (
        <Fragment>
            <div className="header-banner">
                <div className="header-banner__container">
                    <div className="header-banner__text">
                        <p><strong>GET $10 OFF YOUR FIRST ORDER OVER $50!* <a href='/register' className="header-banner__link">SIGN UP NOW</a></strong></p>
                    </div>
                </div>
            </div>
            <div className="header-panel">
                <div className="header-panel__container">
                    <div className="header-panel__left visible-desktop">
                        <ul className="header-panel__ul">
                            <li className="header-panel__li">
                                <a href="/">
                                    <Image src={IconPanelShipping} alt="$7 Standard Shipping"></Image>
                                    <span>$7 Standard Shipping</span>
                                </a>
                            </li>
                            <li className="header-panel__li">
                                <a href="/">
                                    <Image src={IconPanelReturn} alt="Free returns"></Image>
                                    <span>Free returns</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="header-panel__right visible-desktop">
                        <ul className="header-panel__ul">
                            <li className="header-panel__li"><Link to="/register">Sign up for $10 Off*</Link></li>
                            <li className="header-panel__li"><Link to="/store-finder">Store Finder</Link></li>
                            <li className="header-panel__li"><Link to="/about-us">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div className="header-panel__mobile visible-mobile">
                        <div className="header-panel__mobile--wrapper">
                            <div className="header-panel__mobile--content">
                                <h3><a href="/">Price Guarantee</a>&nbsp; | &nbsp; <a href="/">Free Returns</a>&nbsp; &nbsp;|&nbsp; &nbsp;<a href="/guides/">Guides &amp; Inspiration</a></h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default HeaderBanner;
