import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Image from '@magento/venia-ui/lib/components/Image';

import Breville from 'src/images/MegaMenu/Brands/breville.jpg';
import Delonghi from 'src/images/MegaMenu/Brands/delonghi.jpg';
import Goldair from 'src/images/MegaMenu/Brands/goldair_2.jpg';
import JamieOliver from 'src/images/MegaMenu/Brands/jamie-oliver.jpg';
import KitchenAid from 'src/images/MegaMenu/Brands/kitchen-aid.jpg';
import Panasonic from 'src/images/MegaMenu/Brands/panasonic.jpg';
import Nespresso from 'src/images/MegaMenu/Brands/nespresso.jpg';
import Samsung from 'src/images/MegaMenu/Brands/samsung.jpg';
const topBrands = () => {
    const brands = useMemo(() => [Breville, Delonghi, Goldair, JamieOliver, KitchenAid, Panasonic, Nespresso, Samsung], []);
    return (
        <div className="py-5 px-4 lg_pt-[30px] lg_pb-[110px] lg_pl-10 lg_pr-0 -mx-4 mb-5 lg_mb-0 lg_mx-0 bg-[#ececec] lg_bg-transparent">
            <h3 className="text-lg text-black font-bold mb-4 leading-[1.1] hidden lg_block">Our Top Brands</h3>
            <div className="grid grid-cols-3 lg_grid-cols-2 gap-4 lg_gap-5">
                {
                    brands.map(brand => (
                        <div key={brand} className="flex 2xl_h-40 lg_h-30 h-[65px] py-5 items-center justify-center bg-white">
                            <Link to={'#'} className="flex items-center justify-center">
                                <Image src={brand} alt="Brand" className="block mx-auto w-full max-w-[90%] max-h-[65px] lg_max-h-[115px]"/>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default topBrands