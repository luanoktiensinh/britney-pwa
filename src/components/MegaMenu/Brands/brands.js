import React from 'react';
import PropTypes from 'prop-types';
import MegaMenuBrandFilter from './filter';
import MainSideBottom from '../MainSide/mainSideBottom';
import TopBrands from './topBrands';
const MegaMenuBrands = (props) => {
    const {
        data,
        megaMenuFooterLinks
    } = props;
    const { name } = data;
    return (
        <>
            <div className="relative lg_overflow-hidden min-h-[300px] pb-5 lg_pb-[100px] lg_w-[calc((100%/3)*2)]">
                <div className="pt-[30px] lg_pr-10 lg_pl-0 px-4">
                    <h3 dangerouslySetInnerHTML={{__html: name}} className='text-lg text-black font-bold mb-5'></h3>
                    <div className='block lg_hidden'>
                        <TopBrands />
                    </div>
                    <MegaMenuBrandFilter />
                </div>
                <MainSideBottom footerLinks={megaMenuFooterLinks} className="hidden lg_block bottom-0 w-[calc(100%-40px)]"/>
            </div>
            <div className='hidden lg_block w-[calc(100%/3)]'>
                <TopBrands />
            </div>
        </>

    )
}
export default MegaMenuBrands;
MegaMenuBrands.propTypes = {
    data: PropTypes.shape({
        children: PropTypes.array,
        id: PropTypes.number.isRequired,
        isActive: PropTypes.bool,
        name: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired
    }).isRequired,
    megaMenuFooterLinks: PropTypes.any
};