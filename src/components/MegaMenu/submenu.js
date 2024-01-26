import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { useSubMenu } from '@magento/peregrine/lib/talons/MegaMenu/useSubMenu';
import MainSideBottom from './MainSide/mainSideBottom';
import Icon from '@magento/venia-ui/lib/components/Icon';
import {  ChevronRight } from 'react-feather';
import withHOCPopover from 'src/hoc/MegaMenu/HOCPopover';
import classNames from 'classnames';

/**
 * The Submenu component displays submenu in mega menu
 *
 * @param {array} props.items - categories to display
 * @param {int} props.mainNavWidth - width of the main nav. It's used for setting min-width of the submenu
 * @param {function} props.onNavigate - function called when clicking on Link
 */
const Submenu = props => {
    const {
        data,
        isFocused,
        subMenuState,
        handleCloseSubMenu,
        megaMenuFooterLinks,
        onNavigate
    } = props;
    const { children: items = [], name, link, footer_links } = data;
    const talonProps = useSubMenu({
        isFocused,
        subMenuState,
        handleCloseSubMenu
    });
    const [ active, setActive ] = useState();
    const { isSubMenuActive } = talonProps;

    const makeUrl = useCallback(item => item.link, [])
    const mainContent = useMemo(() => {
        if(!active?.id) {
            return <div dangerouslySetInnerHTML={{__html: data.right_content ?? ''}}></div>;
            // return <MainSideBanner />;
        }
        else {
            return <div dangerouslySetInnerHTML={{__html: active.right_content ?? ''}}></div>;
            // return <MainSide name={active.name} url={makeUrl(active)} items={active.children} categoryUrlSuffix={categoryUrlSuffix} />
        }
    }, [active]);
    useEffect(() => {
        setActive(null);
    }, [isSubMenuActive])
    return (
        <>
            <div className="w-1/5">
                <div className="relative pt-5 pr-10 pb-[30px] flex flex-col h-full justify-between">
                    <div>
                        <div className="border-b-2 border-solid border-[#c4c4c4] flex justify-between leading-6 py-[9px]">
                            <h3 className="text-lg text-black font-bold">
                                {name}
                            </h3>
                            <a className='text-primary-500 text-sm hover_underline' href={link}>Shop all</a>
                        </div>
                        <ul className="pt-[13px] pb-[90px] bg-[#f8f8f8]">
                            {
                                items.map(item => (
                                    <li key={item.id} onMouseEnter={() => setActive(item)}>
                                        <a
                                            href={makeUrl(item)}
                                            className={classNames(
                                                "flex items-center justify-between hover_underline py-[5px] inline-block",
                                                active?.id === item.id ? "text-primary-500 font-bold": "text-[#707070]"
                                            )}
                                        >
                                            <p dangerouslySetInnerHTML={{__html: item.name}}></p>
                                            { active?.id === item.id && active.children?.length > 0 && <Icon src={ChevronRight} classes={{icon: ''}} size={20}/>}
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <ul>
                        {
                            footer_links?.map(item => (
                                <li key={item.id}>
                                    <a className='pb[3px] leading-5 text-primary-500 hover_underline' href={item.link}>{item.name}</a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className="w-4/5 overflow-hidden pl-10 relative min-h-[300px] pb-[100px]">
                <div className="flex -mx-2.5">
                    <div className="mx-2.5 pt-10 pb-5 w-[calc(100%-20px)]">
                        {mainContent}
                    </div>
                </div>
                <MainSideBottom  footerLinks={megaMenuFooterLinks}/>
            </div>
        </>
    );
};

export default withHOCPopover(Submenu);

Submenu.propTypes = {
    data: PropTypes.shape({
        children: PropTypes.array,
        id: PropTypes.number.isRequired,
        isActive: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired
    }).isRequired,
    mainNavWidth: PropTypes.number.isRequired,
    categoryUrlSuffix: PropTypes.string,
    onNavigate: PropTypes.func.isRequired,
    handleCloseSubMenu: PropTypes.func.isRequired,
    megaMenuFooterLinks: PropTypes.array
};
