import Image from '@magento/venia-ui/lib/components/Image';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
const mainSideBottom = ({className = '', footerLinks}) => {
    return (
        <div className={"h-20 absolute " + className}>
            <ul className="border-t-2 border-solid border-[#d9d9d9] flex py-[30px]">
                {
                    footerLinks.map(item => (
                        <li className='flex mr-[30px]' key={item.name}>
                            <Link to={item.link ?? '#'} className="text-sm color-[#707070] hover_underline">
                                {
                                    item.image && (
                                        <span className="w-[22px] h-5 mr-2 inline-block">
                                            <Image
                                                src={item.image}
                                                alt={item.name || ""}
                                                classes={{
                                                    image: 'absolute top-0 left-0 w-full h-full object-contain',
                                                    root: 'relative w-full h-full'
                                                }}
                                            />
                                        </span>
                                    )
                                }
                                <span className="text-sm color-[#707070] hover_underline inline-block">{item.name}</span>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
export default mainSideBottom;
mainSideBottom.propTypes = {
    className: PropTypes.string,
    footerLinks: PropTypes.array
}
mainSideBottom.defaultProps = {
    footerLinks: []
}