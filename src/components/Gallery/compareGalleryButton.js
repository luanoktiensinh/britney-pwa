import React from 'react'
import { number, string } from 'prop-types'
import { BarChart2, Check, X } from 'react-feather';
import Icon from '@magento/venia-ui/lib/components/Icon';
import defaultClasses from '@magento/venia-ui/lib/components/Wishlist/AddToListButton/addToListButton.module.css';
import { useStyle } from '@magento/venia-ui/lib/classify.js';
import { useToasts } from '@magento/peregrine/lib/Toasts/useToasts.js';
import { useCompareProduct } from 'src/composables/useCompareProduct';
import { useSelector } from "react-redux";
import { isProductSelected } from 'src/store/selector/compare-products.selector';

const CompareGalleryButton = props => {
    const [, api ] = useToasts();
    const { addToast } = api;
    const { itemUid, itemId } = props;
    const { addProducts } = useCompareProduct();
    const classes = useStyle(defaultClasses, props.classes);
    const isSelected = useSelector(isProductSelected(itemUid));
    const buttonClass = isSelected ? classes.root_selected : classes.root;
    const CompareIcon = <Icon size={20} src={BarChart2} />;
    const CheckIcon = <Icon size={20} src={Check} />;
    const XIcon = <Icon size={20} src={X} />;

    const addAction = async () => {
        if(isSelected) return;
        const data = await addProducts([itemId]);
        if(data.success) {
            const { products } = data;
            addToast({
                type: 'success',
                icon: CheckIcon,
                message: <div>You added product {products.map(product => product.name).join(', ')} to the <a className="underline text-brand-dark" href="/product_compare">comparison list.</a></div>
            });
        }
        else if(data.message) {
            addToast({
                type: 'error',
                icon: XIcon,
                message: data.message
            });
        }
    }

    return (
        <button className={buttonClass} onClick={addAction} disabled={isSelected}>{CompareIcon}</button>
    )
}

CompareGalleryButton.propTypes = {
    itemUid: string.isRequired,
    itemId: number.isRequired,
}

export default CompareGalleryButton
