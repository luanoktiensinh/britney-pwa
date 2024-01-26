import React, { useMemo } from 'react';
import { bool, func, shape, string } from 'prop-types';
import { Link } from 'react-router-dom';
import { useCategoryLeaf } from '@magento/peregrine/lib/talons/CategoryTree';
import CategoryLv4 from './categoryLv4';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from '@magento/venia-ui/lib/components/CategoryTree/categoryLeaf.module.css';

const Leaf = props => {
    const { category, onNavigate, tabIndex, isTopLevel } = props;
    const { name, link, children } = category;
    const { handleClick } = useCategoryLeaf({ onNavigate });
    const isAll = useMemo(() => !!(children && children.length), [children]);

    return (
        <li className="mx-4 border-b-2 border-solid border-[#f2f2f2]">
            {
                isAll ? (
                    <div className='py-5 border-b-[3px] border-solid border-[#707070] flex text-lg items-center justify-between'>
                        <div className="text-black font-bold">{name}</div>
                        <a
                            className="text-[#707070] text-lg"
                            href={link}
                            onClick={handleClick}
                            tabIndex={tabIndex}
                        >
                            Shop all
                        </a>
                    </div>
                ): <CategoryLv4 category={category} destination={link} handleClick={handleClick} tabIndex={tabIndex} isTopLevel={isTopLevel}/>
            }
            
        </li>
    );
};

export default Leaf;

Leaf.propTypes = {
    category: shape({
        name: string.isRequired,
        link: string.isRequired
    }).isRequired,
    isTopLevel: bool,
    classes: shape({
        root: string,
        target: string,
        text: string
    }),
    onNavigate: func.isRequired,
    tabIndex: string,
    categoryUrlSuffix: string
};
