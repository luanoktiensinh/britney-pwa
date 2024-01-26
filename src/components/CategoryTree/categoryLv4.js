import React, { useState } from "react"
import { Link } from 'react-router-dom';
import { bool, func, number, shape, string } from 'prop-types';
import { Plus } from "react-feather";
import Icon from "@magento/venia-ui/lib/components/Icon";
import categoryLv4 from "../../mock/categoryLv4";
import classNames from "classnames";
const Lv4 = (props) => {
    const { category, destination, tabIndex, handleClick, isTopLevel } = props;
    const { name, level } = category;
    const [ show, setShow ] = useState(false);
    const onClick = (e) => {
        if(level >= 4) {
            e.preventDefault();
            setShow(!show);
        }
        else {
            handleClick()
        }
    }
    return (
        <>
            <a
                className={classNames(
                    "w-full flex items-center justify-between text-black font-bold",
                    level >=4 && show ? 'pt-5' : 'py-5',
                    {
                        'text-md': isTopLevel
                    }
                )}
                data-cy="CategoryTree-Leaf-target"
                href={destination}
                onClick={onClick}
                tabIndex={tabIndex}
            >
                <span>{name}</span>
                {
                    level >= 4 && <Icon src={Plus} classes={{icon: ''}}/>
                }
            </a>
            {
                level >= 4 && show && (
                    <ul className="mb-5">
                        {
                            categoryLv4.map(cat => (
                                <li key={cat.uid} className="py-1.25">
                                    <a href={'#'} className="text-base text-[#707070]" onClick={handleClick}>{cat.name}</a>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        </>
    )
}
export default Lv4;
Lv4.propTypes = {
    category: shape({
        name: string.isRequired,
        link: string.isRequired
    }).isRequired,
    destination: string.isRequired,
    tabIndex: string.isRequired,
    handleClick: func.isRequired,
    isTopLevel: bool
}