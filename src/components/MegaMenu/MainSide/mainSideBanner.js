import Image from '@magento/venia-ui/lib/components/Image';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Banner1 from 'src/images/MegaMenu/banner1.jpg';
import Banner2 from 'src/images/MegaMenu/banner2.jpg';
import Banner3 from 'src/images/MegaMenu/banner3.jpg';
import Banner4 from 'src/images/MegaMenu/banner4.jpg';
const mainSideBanner = () => {
    const items = useMemo(() => [
        { name: 'Personal Care', img: Banner1 },
        { name: 'Bathroom Accessories', img: Banner2 },
        { name: 'Towel Buying Guide', img: Banner3 },
        { name: 'Heated Towel Rails', img: Banner4 },
    ], []);
    return (
        <div className="flex mx-2.5 pb-5 pt-10">
            {
                items.map(item => (
                    <Link to={item.name} key={item.name} className='mb-10 px-2.5 w-[calc(50%-20px)] relative'>
                        <div className="pb-full h-0 w-full overflow-hidden relative top-0">
                            <Image src={item.img} alt={item.name} classes={{root: "w-full h-full absolute top-0", container: ''}}/>
                        </div>
                        <p dangerouslySetInnerHTML={{__html:item.name}} className='pt-2.5 text-black font-bold mb-4 absolute top-full' />
                    </Link>
                ))
            }
        </div>
    )
}
export default mainSideBanner;