import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { shape, string } from 'prop-types';
import { useFooter } from '@magento/peregrine/lib/talons/Footer/useFooter';

import Newsletter from '@magento/venia-ui/lib/components/Newsletter';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from '@magento/venia-ui/lib/components/Footer/footer.module.css';
import cureKidsImg from "src/images/curekids_white.png";
import paymentImg1 from "src/images/payment/bris-brand-1.png";
import paymentImg2 from "src/images/payment/bris-brand-2.png";
import paymentImg3 from "src/images/payment/bris-brand-3.png";
import paymentImg4 from "src/images/payment/bris-brand-4.png";
import paymentImg5 from "src/images/payment/bris-brand-5.png";
import paymentImg6 from "src/images/payment/bris-brand-6.png";
import paymentImg7 from "src/images/payment/bris-brand-7.png";
import paymentImg8 from "src/images/payment/bris-brand-8.png";

import { useQuery } from '@apollo/client';
import GET_FOOTER_LINK from '../../queries/footer.gql';

const Footer = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const talonProps = useFooter();

    const { loading, error, data } = useQuery(GET_FOOTER_LINK, {
        fetchPolicy: 'no-cache',
    });

    const { copyrightText } = talonProps;
    const { formatMessage } = useIntl();
    const title = formatMessage({ id: 'logo.title', defaultMessage: 'Venia' });

    return (
        <footer data-cy="Footer-root" className="footer-root-TJu border-t-2 border-solid border-light gap-y-8 grid leading-normal min-h-[15rem] mx-auto my-0 text-sm text-subtle w-full footer">
            <div className="footer-newsletter">
                <div className="max-w-site footer-container">
                    <Newsletter />

                    <div className="footer-payment">
                        <img src={paymentImg1} alt="Payment" />
                        <img src={paymentImg2} alt="Payment" />
                        <img src={paymentImg3} alt="Payment" />
                        <img src={paymentImg4} alt="Payment" />
                        <img src={paymentImg5} alt="Payment" />
                        <img src={paymentImg6} alt="Payment" />
                        <img src={paymentImg7} alt="Payment" />
                        <img src={paymentImg8} alt="Payment" />
                    </div>
                </div>
            </div>
            <div className="footer-wrapper">
                <div className="footer-links-HhQ gap-x-md gap-y-lg grid grid-cols-6 grid-flow-row-dense px-xs lg_gap-x-sm lg_gap-y-md lg_grid-cols-12 max-w-site footer-container">
                    <div className="footer-link__container col-span-9">
                        <div className='footer-link__wrapper'>
                            {data?.footers?.map((footerLinkItem, footerLinkItemIndex) => (
                                <div className='footer-link__item' key={footerLinkItemIndex}>
                                    <h6>{footerLinkItem.title}</h6>
                                    <ul className="footer-links">
                                        {footerLinkItem.items?.map((item, index) => (
                                            <li key={index}>
                                                <a href={item.linkurl}>{item.linktext}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-3 max-w-[20rem] xs_col-span-6 xs_mx-auto sm_col-span-3 footer-curekids">
                        <div className="footer-curekids__text">
                            <FormattedMessage
                                id={'footer.curekidsSupport'}
                                defaultMessage={'We Proudly Support'}
                            />
                        </div>
                        <a href="https://curekids.org.nz/" target="_blank">
                            <img className="footer-curekids__img" src={cureKidsImg} alt="Curekids" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <div className="max-w-site footer-container footer-copyright__container">
                    <p className="footer-copyright__text">{copyrightText || null}</p>
                    <ul className="footer-copyright__legal">
                        <li data-cy="Footer-privacy" className={classes.privacy}>
                            <Link to="/privacy-policy">
                                <FormattedMessage
                                    id={'footer.privacyText'}
                                    defaultMessage={'Privacy'}
                                />
                            </Link>
                        </li>
                        <li data-cy="Footer-terms" className={classes.terms}>
                            <Link to="/terms-and-conditions">
                                <FormattedMessage
                                    id={'footer.termsText'}
                                    defaultMessage={'Terms & Conditions'}
                                />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

Footer.propTypes = {
    classes: shape({
        root: string
    })
};
