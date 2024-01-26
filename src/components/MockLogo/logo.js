import React from "react";
import DesktopLogo from "src/images/Logo/desktop-logo--briscoes.png";
import MobileLogo from "src/images/Logo/mobile-logo--briscoes.png";
import Image from '@magento/venia-ui/lib/components/Image';
import { any } from "prop-types";

const MockLogo = ({logo}) => {
    return (
        logo ? (
            <Image classes={{placeholder: 'hidden', placeholder_layoutOnly: 'hidden'}} className="img-fluid h-12.5 d-lg-none" src={logo} alt="Logo"></Image>
        ) : (
            <>
                <Image classes={{placeholder: 'hidden', placeholder_layoutOnly: 'hidden'}} className="img-fluid h-12.5 d-lg-none" src={DesktopLogo} alt="Logo"></Image>
                <Image classes={{placeholder: 'hidden', placeholder_layoutOnly: 'hidden'}} className="img-fluid h-12.5 d-none d-lg-block" src={MobileLogo} alt="Logo"></Image>
            </>
        )
    )
}
export default MockLogo;
MockLogo.propType = {
    logo: any
}