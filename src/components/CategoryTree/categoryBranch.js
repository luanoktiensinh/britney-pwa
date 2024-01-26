import React from 'react';
import { bool, func, number, shape, string } from 'prop-types';
import { useCategoryBranch } from '@magento/peregrine/lib/talons/CategoryTree';
import { ChevronRight } from 'react-feather';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from '@magento/venia-ui/lib/components/CategoryTree/categoryBranch.module.css';

const Branch = props => {
    const { category, setCategoryId, tabIndex, isTopLevel } = props;
    const { name, level } = category;
    const classes = useStyle(defaultClasses, props.classes);

    const talonProps = useCategoryBranch({ category, setCategoryId });
    const { exclude, handleClick } = talonProps;

    if (exclude) {
        return null;
    }

    return (
        <li className="mx-4 border-b-2 border-solid border-[#f2f2f2]">
            <button
                tabIndex={tabIndex}
                className={"w-full py-5 flex items-center justify-between text-black font-bold" + (isTopLevel ? ' text-md' : '')}
                data-cy="CategoryTree-Branch-target"
                type="button"
                onClick={handleClick}
            >
                <span className={classes.text}>{name}</span>
                <ChevronRight className='ml-2'/>
            </button>
        </li>
    );
};

export default Branch;

Branch.propTypes = {
    category: shape({
        id: number.isRequired,
        name: string.isRequired
    }).isRequired,
    isTopLevel: bool,
    classes: shape({
        root: string,
        target: string,
        text: string
    }),
    setCategoryId: func.isRequired,
    tabIndex: string
};
