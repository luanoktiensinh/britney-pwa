import Image from '@magento/venia-ui/lib/components/Image';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Banner1 from 'src/images/MegaMenu/banner1.jpg';
import Banner2 from 'src/images/MegaMenu/banner2.jpg';
import Banner3 from 'src/images/MegaMenu/banner3.jpg';
import Banner4 from 'src/images/MegaMenu/banner4.jpg';
const mainSideItemBanner = ({className}) => {
    const items = useMemo(() => [
        { name: 'Personal Care', img: Banner1 },
        { name: 'Bathroom Accessories', img: Banner2 },
        { name: 'Towel Buying Guide', img: Banner3 },
        { name: 'Heated Towel Rails', img: Banner4 },
    ], []);
    return (
        <div className={classNames("mx-2.5", className)}>
            {
                Array.from({length: 2}).map((item, index) => (
                    <div key={index} className={classNames("flex -mx-2 5 pb-5 w-full", index === 0 ? 'pt-[30px]' : '')}>
                        {
                            items.slice(index * 2, (index + 1) * 2).map(item => (
                                <Link key={item.name} to={'#'} className="block mb-10 mx-2.5 w-[calc(50%-20px)] relative">
                                    <div className="pb-full h-full relative top-0 overflow-hidden w-full">
                                        <Image src={item.img} alt={item.name}/>
                                    </div>
                                    <div className="flex items-center top-full pt-2 5 absolute left-0 w-full" dangerouslySetInnerHTML={{__html: item.name}}></div>
                                </Link>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )
}
export default mainSideItemBanner;
mainSideItemBanner.propTypes = {
    className: PropTypes.string
}