import React, { useState } from 'react';
import { isSupportedProductType as isSupported } from '@magento/peregrine/lib/util/isSupportedProductType';
import { useSelector } from "react-redux";
import Price from '@magento/venia-ui/lib/components/Price';
import { FormattedMessage } from 'react-intl';
import { Info, X, Check } from 'react-feather';
import WishlistGalleryButton from '@magento/venia-ui/lib/components/Wishlist/AddToListButton';
import AddToCartButton from '@magento/venia-ui/lib/components/Gallery/addToCartButton';
import Icon from '@magento/venia-ui/lib/components/Icon';
import { useGallery } from '@magento/peregrine/lib/talons/Gallery/useGallery';
import { useCompareProduct } from 'src/composables/useCompareProduct';
import { useToasts } from '@magento/peregrine/lib/Toasts/useToasts.js';
import Dialog from '@magento/venia-ui/lib/components/Dialog';
import addToCartButtonClasses from 'src/styles/Gallery/addToCartButton.module.css';
import confirmDialogClasses from 'src/styles/confirmDialog.module.css';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';

const Compare = () => {
    const compareStore = useSelector(state => state.compare);
    const { products, isLoaded, attributes: tableCols } = compareStore;
    const [, api ] = useToasts();
    const { addToast } = api;

    const XIcon = <Icon size={20} src={X} />;
    const CheckIcon = <Icon size={20} src={Check} />;
    const { removeProducts } = useCompareProduct();
    const { storeConfig } = useGallery();
    const [showDialogConfirm, setShowDialogConfirm] = useState(false);
    const [productIdSelected, setProductIdSelected] = useState(null);
    const openConfirmDialog = product => {
        setShowDialogConfirm(true);
        setProductIdSelected(product.id);
    };
    const closeConfirmDialog = () => {
        setShowDialogConfirm(false);
        setProductIdSelected(null);
    };
    const onConfirm = async () => {
        if(productIdSelected) {
            const res = await removeProducts([productIdSelected]);
            if(res.success) {
                const { products } = res;
                addToast({
                    type: 'success',
                    icon: CheckIcon,
                    message: `You removed product ${products.map(product => product.name).join(', ')} from the comparison list.`
                });
            }
            else if(res.message) {
                addToast({
                    type: 'error',
                    icon: XIcon,
                    message: res.message
                });
            }
        }
        closeConfirmDialog();
    }

    return (
        <div className="p-xs">
            <Dialog
                isOpen={showDialogConfirm}
                classes={confirmDialogClasses}
                onCancel={closeConfirmDialog}
                onConfirm={onConfirm}
            >
                Are you sure you want to remove this item from your Compare Products list?
            </Dialog>
            <h1 className='mb-4 text-xl'>Compare products</h1>
            {
                isLoaded ? (
                    products.length ? (
                        <div className='overflow-x-auto border-t border-gray-300 border-solid'>
                            <table>
                                <thead className='align-top'>
                                    <tr>
                                        <th className='min-w-[100px] lg_min-w-[140px]'/>
                                        {
                                            products.map(product => {
                                                const { price_range } = product;
                                                const priceSource =
                                                    price_range.maximum_price.final_price ||
                                                    price_range.maximum_price.regular_price;
                                                const productType = product ? product.__typename : null;
                                                const isSupportedProductType = isSupported(productType);
                                                const _wishlistButtonProps = storeConfig && storeConfig.magento_wishlist_general_is_enabled === '1'
                                                ? {
                                                    item: {
                                                        sku: product.sku,
                                                        quantity: 1
                                                    },
                                                    storeConfig
                                                }
                                                : null;

                                                const wishlistButton = _wishlistButtonProps ? (
                                                    <WishlistGalleryButton {..._wishlistButtonProps} />
                                                ) : null;
                                                return (
                                                    <th
                                                        key={product.uid}
                                                        className='relative min-w-[140px] w-[300px] p-4 font-normal text-left'
                                                    >
                                                        <button className='absolute top-1 right-0' onClick={() => openConfirmDialog(product)}>{XIcon}</button>
                                                        <a href={product.url_rewrites[0] ? `/${product.url_rewrites[0].url}` : null} title={product.name}>
                                                            <img className='object-cover aspect-product' src={product.small_image?.url} alt={product.small_image?.label}/>
                                                        </a>
                                                        <a
                                                            className='mt-2 block font-bold hover_underline'
                                                            href={product.url_rewrites[0] ? `/${product.url_rewrites[0].url}` : null}
                                                            title={product.name}
                                                        >
                                                            {product.name}
                                                        </a>
                                                        <div className='text-sm my-1' data-cy="GalleryItem-price">
                                                            <Price
                                                                value={priceSource.value}
                                                                currencyCode={priceSource.currency}
                                                            />
                                                        </div>
                                                        {
                                                            isSupportedProductType ? (
                                                                <AddToCartButton
                                                                    item={product}
                                                                    urlSuffix={product['url_suffix']}
                                                                    classes={addToCartButtonClasses}
                                                                />
                                                            ) : (
                                                                <div>
                                                                    <Info />
                                                                    <p>
                                                                        <FormattedMessage
                                                                            id={'galleryItem.unavailableProduct'}
                                                                            defaultMessage={'Currently unavailable for purchase.'}
                                                                        />
                                                                    </p>
                                                                </div>
                                                            )
                                                        }
                                                        <div className='block'>
                                                            {wishlistButton}
                                                        </div>
                                                    </th>
                                                )
                                            })
                                        }
                                    </tr>
                                </thead>
                                <tbody className='border-t border-gray-300 border-solid align-top'>
                                    {
                                        tableCols.map(tableCol => (
                                            <tr
                                                key={tableCol.code}
                                            >
                                                <td className='font-bold p-4'>{tableCol.label}</td>
                                                {
                                                    products.map(product => (
                                                        <td className='p-4' key={product.uid} dangerouslySetInnerHTML={{__html: product._attributes[tableCol.code]}}></td>
                                                    ))
                                                }
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div>You have no items to compare.</div>
                    )
                ) : fullPageLoadingIndicator
            }


        </div>
    );
};

export default Compare;
