import React, { forwardRef, useImperativeHandle } from 'react';
import { bool, func, number, shape, string } from 'prop-types';
import { useCategoryTree } from '@magento/peregrine/lib/talons/CategoryTree';
import { Link } from 'react-router-dom';
import { useStyle } from '@magento/venia-ui/lib/classify';
import Branch from '@magento/venia-ui/lib/components/CategoryTree/categoryBranch';
import Leaf from '@magento/venia-ui/lib/components/CategoryTree/categoryLeaf';
import defaultClasses from '@magento/venia-ui/lib/components/CategoryTree/categoryTree.module.css';
import Brands from '../MegaMenu/Brands/brands';
import mockBrands from 'src/mock/brands.js';


const Tree = forwardRef((props, ref) => {
    const {
        categoryId,
        onNavigate,
        setCategoryId,
        updateCategories,
        isTopLevel,
        tabIndex
    } = props;
    const talonProps = categoryId !== 'brands' ? useCategoryTree({
        categoryId,
        updateCategories,
        setCategoryId
    }) : {};

    const { data, footerIcons, rootCategory, childCategories, categoryUrlSuffix, onBack } = talonProps;
    const classes = useStyle(defaultClasses, props.classes);
    useImperativeHandle(ref, () => ({
        onBack
    }));
    // for each child category, render a direct link if it has no children
    // otherwise render a branch
    isTopLevel && childCategories.set('brands', {
        category: {
            id: 9999,
            name: 'Shop By Brands',
            link: "#",
            __typename: "CategoryTree"
        }
    });
    const branches = data
        ? Array.from(childCategories, childCategory => {
              const [id, { category, isLeaf }] = childCategory;
              return isLeaf ? (
                  <Leaf
                      key={id}
                      isTopLevel={isTopLevel}
                      category={category}
                      onNavigate={onNavigate}
                      categoryUrlSuffix={categoryUrlSuffix}
                      tabIndex={tabIndex}
                  />
              ) : (
                  <Branch
                      key={id}
                      isTopLevel={isTopLevel}
                      category={category}
                      setCategoryId={setCategoryId}
                      tabIndex={tabIndex}
                  />
              );
          })
        : null;

    return (
        <>
            <div className={classes.root} data-cy="CategoryTree-root">
                {
                    categoryId === 9999 ? (
                        <Brands data={mockBrands}/>
                    ): <ul className={classes.tree}>{branches}</ul>
                }
                
            </div>
            <div className='px-4'>
                {
                    !categoryId && (
                        <ul className='py-[23px]'>
                            {
                                footerIcons.map(item => (
                                    <li key={item.name} className='py-[7px]'>
                                        <a href={item.link ?? '#'} className="text-[#707070] font-bold" onClick={onNavigate}>
                                            {item.name}
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
                {
                    rootCategory?.right_content && (
                        <div className='pb-16' dangerouslySetInnerHTML={{__html: rootCategory.right_content}}></div>
                    )
                }
            </div>
        </>
    );
});

export default Tree;

Tree.propTypes = {
    categoryId: number,
    classes: shape({
        root: string,
        tree: string
    }),
    isTopLevel: bool,
    onNavigate: func.isRequired,
    setCategoryId: func.isRequired,
    updateCategories: func.isRequired,
    tabIndex: string
};
