import React, { useRef } from 'react';
import { shape, string } from 'prop-types';
import { useNavigation } from '@magento/peregrine/lib/talons/Navigation/useNavigation';
import { useStyle } from '@magento/venia-ui/lib/classify';
import CategoryTree from '@magento/venia-ui/lib/components/CategoryTree';
import NavHeader from 'src/components/Navigation/navHeader.js';
import defaultClasses from 'src/styles/Navigation/navigation.module.css';
import BannerMobile from 'src/images/MegaMenu/banner_mobile.jpg';
import { FocusScope } from 'react-aria';
import { Link } from 'react-router-dom';
import Image from '@magento/venia-ui/lib/components/Image';
const Navigation = props => {
    const {
        catalogActions,
        categoryId,
        handleBack,
        handleClose,
        hasModal,
        isOpen,
        isTopLevel,
        setCategoryId,
        view
    } = useNavigation();

    const classes = useStyle(defaultClasses, props.classes);
    const rootClassName = isOpen ? classes.root_open : classes.root;
    const bodyClassName = hasModal ? classes.body_masked : classes.body;
    const tabIndex = isOpen ? '0' : '-1';
    const links = [
        { name: 'Store Locator', url: '#' },
        { name: 'Join Our Mailing List', url: '#' },
        { name: 'Buying Guides & Inspiration', url: '#' },
        { name: 'Gift Guide', url: '#' }
    ]
    const treeRef = useRef()
    return (
        <FocusScope contain={isOpen} restoreFocus autoFocus className="test">
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <aside className={rootClassName}>
                {
                    !isTopLevel && (
                        <div className={classes.header}>
                            <NavHeader
                                isTopLevel={isTopLevel}
                                onBack={() => treeRef.current?.onBack()}
                                view={view}
                            />
                        </div>
                    )
                }
                <div className={bodyClassName}>
                    <CategoryTree
                        categoryId={categoryId}
                        onNavigate={handleClose}
                        isTopLevel={isTopLevel}
                        setCategoryId={setCategoryId}
                        updateCategories={catalogActions.updateCategories}
                        tabIndex={tabIndex}
                        ref={treeRef}
                    />
                </div>
            </aside>
        </FocusScope>
    );
};

export default Navigation;

Navigation.propTypes = {
    classes: shape({
        body: string,
        form_closed: string,
        form_open: string,
        footer: string,
        header: string,
        root: string,
        root_open: string,
        signIn_closed: string,
        signIn_open: string
    })
};
