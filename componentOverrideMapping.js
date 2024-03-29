const veniaUiPackagePath = '@magento/venia-ui';
const peregrinePackagePath = '@magento/peregrine';
const pagebuilderPackagePath = '@magento/pagebuilder';
module.exports = componentOverrideMapping = {
    [`${veniaUiPackagePath}/lib/components/Header/header.js`]: 'src/components/Header/header.js',
    [`${veniaUiPackagePath}/lib/components/ProductFullDetail/productFullDetail.js`]: 'src/components/ProductDetailPage/productFullDetail.js',
    [`${veniaUiPackagePath}/lib/components/Logo/logo.js`]: 'src/components/Header/logo.js',
    [`${veniaUiPackagePath}/lib/components/Footer/footer.js`]: 'src/components/Footer/footer.js',
    [`${veniaUiPackagePath}/lib/components/Newsletter/newsletter.js`]: 'src/components/Footer/Newsletter/newsletter.js',
    [`${peregrinePackagePath}/lib/talons/Newsletter/useNewsletter.js`]: 'src/components/Footer/Newsletter/useNewsletter.js',
    [`${peregrinePackagePath}/lib/talons/Newsletter/newsletter.gql.js`]: 'src/components/Footer/Newsletter/newsletter.gql.js',
    [`${veniaUiPackagePath}/lib/components/ProductImageCarousel/carousel.js`]: 'src/components/ProductImageCarousel/carousel.js',
    [`${veniaUiPackagePath}/lib/components/Gallery/gallery.js`]: 'src/components/Gallery/gallery.js',
    [`${veniaUiPackagePath}/lib/components/Gallery/item.js`]: 'src/components/Gallery/item.js',
    [`${veniaUiPackagePath}/lib/components/MegaMenu/megaMenu.js`]: 'src/components/MegaMenu/megaMenu.js',
    [`${veniaUiPackagePath}/lib/components/MegaMenu/megaMenuItem.js`]: 'src/components/MegaMenu/megaMenuItem.js',
    [`${veniaUiPackagePath}/lib/components/MegaMenu/submenu.js`]: 'src/components/MegaMenu/submenu.js',
    [`${veniaUiPackagePath}/lib/components/Navigation/navigation.js`]: 'src/components/Navigation/navigation.js',
    [`${veniaUiPackagePath}/lib/components/App/app.js`]: 'src/components/app.js',
    [`${veniaUiPackagePath}/lib/components/Header/navTrigger.js`]: 'src/components/Header/navTrigger.js',
    [`${veniaUiPackagePath}/lib/components/Header/cartTrigger.js`]: 'src/components/Header/cartTrigger.js',
    [`${veniaUiPackagePath}/lib/components/CategoryTree/categoryTree.js`]: 'src/components/CategoryTree/categoryTree.js',
    [`${veniaUiPackagePath}/lib/components/CategoryTree/categoryBranch.js`]: 'src/components/CategoryTree/categoryBranch.js',
    [`${veniaUiPackagePath}/lib/components/CategoryTree/categoryLeaf.js`]: 'src/components/CategoryTree/categoryLeaf.js',
    [`${veniaUiPackagePath}/lib/components/Main/main.js`]: 'src/components/Main/main.js',
    [`${veniaUiPackagePath}/lib/components/Field/message.module.css`]: 'src/styles/Field/message.module.css',
    [`${veniaUiPackagePath}/lib/components/ProductOptions/getOptionType.js`]: 'src/components/ProductOptions/getOptionType.js',
    [`${pagebuilderPackagePath}/lib/factory.js`]: 'src/components/DynamicBlock/factory.js',
    [`${pagebuilderPackagePath}/lib/ContentTypes/Slider/slider.js`]: 'src/components/carouselSlider/slider.js',
    [`${pagebuilderPackagePath}/lib/ContentTypes/Products/Carousel/carousel.js`]: 'src/components/carouselSlider/carousel.js',
    [`${peregrinePackagePath}/lib/talons/CategoryTree/categoryTree.gql.js`]: 'src/queries/CategoryTree/categoryTree.gql.js',
    [`${peregrinePackagePath}/lib/talons/RootComponents/Product/productDetailFragment.gql.js`]: 'src/queries/Product/productDetailFragment.gql.js',
    [`${peregrinePackagePath}/lib/talons/Navigation/useNavigation.js`]: 'src/composables/Navigation/useNavigation.js',
    [`${peregrinePackagePath}/lib/hooks/useCarousel.js`]: 'src/composables/useCarousel.js',
    [`${peregrinePackagePath}/lib/talons/ProductFullDetail/useProductFullDetail.js`]: 'src/composables/ProductFullDetail/useProductFullDetail.js',
    [`${peregrinePackagePath}/lib/talons/WishlistPage/wishlistItemFragments.gql.js`]: 'src/queries/WishlistPage/wishlistItemFragments.gql.js',
    [`${veniaUiPackagePath}/lib/components/SearchBar/searchBar.js`]: 'src/components/Header/SearchBar.js',
    [`${veniaUiPackagePath}/lib/components/ForgotPasswordPage/forgotPasswordPage.js`]: 'src/pages/forgot-password',
    [`${veniaUiPackagePath}/lib/components/AccountMenu/accountMenu.js`]: 'src/components/AccountMenu/accountMenu.js',
    [`${veniaUiPackagePath}/lib/components/SignIn/signIn.js`]: 'src/components/Dialog/SignIn.js',
    [`${veniaUiPackagePath}/lib/components/Gallery/gallery.module.css`]: 'src/styles/Gallery/gallery.module.css',
    [`${veniaUiPackagePath}/lib/components/WishlistPage/wishlistItem.js`]: 'src/components/WishlistPage/wishlistItem.js',
    [`${veniaUiPackagePath}/lib/RootComponents/Category/categoryContent.js`]: 'src/components/Category/categoryContent.js',
    [`${veniaUiPackagePath}/lib/RootComponents/Category/category.module.css`]: 'src/styles/Category/category.module.css',
    [`${veniaUiPackagePath}/lib/components/ProductSort/productSort.js`]: 'src/components/ProductSort/productSort.js',
    [`${veniaUiPackagePath}/lib/RootComponents/Category/category.js`]: 'src/components/Category/category.js',
    [`${peregrinePackagePath}/lib/talons/RootComponents/Category/useCategory.js`]: 'src/components/Category/useCategory.js',
    [`${peregrinePackagePath}/lib/talons/CreateAccount/useCreateAccount.js`]: 'src/composables/CreateAccount/useCreateAccount.js',
    [`${peregrinePackagePath}/lib/talons/MegaMenu/useMegaMenu.js`]: 'src/composables/MegaMenu/useMegaMenu.js',
    [`${veniaUiPackagePath}/lib/components/ErrorView/errorView.js`]: 'src/components/ErrorView/errorView.js',
    [`${veniaUiPackagePath}/lib/components/SearchPage/searchPage.js`]: 'src/components/SearchPage/searchPage.js',
    [`${peregrinePackagePath}/lib/talons/SearchPage/useSearchPage.js`]: 'src/components/SearchPage/useSearchPage.js',
    [`${peregrinePackagePath}/lib/talons/Wishlist/AddToListButton/helpers/useSingleWishlist.js`]: 'src/composables/Wishlist/useSingleWishlist.js',
    [`${peregrinePackagePath}/lib/hooks/useCustomerWishlistSkus/useCustomerWishlistSkus.js`]: 'src/hook/useCustomerWishlistSkus/useCustomerWishlistSkus.js',
    [`${peregrinePackagePath}/lib/talons/WishlistPage/useWishlistItem.js`]: 'src/talons/WishlistPage/useWishlistItem.js',
    [`${peregrinePackagePath}/lib/Apollo/policies/index.js`]: 'src/lib/Apollo/policies/index.js',
    [`${pagebuilderPackagePath}/lib/ContentTypes/Products/products.js`]: 'src/components/ContentTypes/products.js',
    [`${peregrinePackagePath}/lib/talons/RootComponents/Category/useCategoryContent.js`]: 'src/components/Category/useCategoryContent.js',
    [`${peregrinePackagePath}/lib/talons/CategoryTree/useCategoryTree.js`]: 'src/talons/CategoryTree/useCategoryTree.js',
    [`${peregrinePackagePath}/lib/talons/CategoryTree/useCategoryBranch.js`]: 'src/talons/CategoryTree/useCategoryBranch.js',
    [`${veniaUiPackagePath}/lib/components/FilterModal/CurrentFilters/currentFilter.js`]: 'src/components/CurrentFilters/currentFilter.js',
    [`${peregrinePackagePath}/lib/talons/CheckoutPage/useCheckoutPage.js`]: 'src/components/CheckoutPage/useCheckoutPage.js',
    [`${peregrinePackagePath}/lib/talons/CheckoutPage/OrderConfirmationPage/useCreateAccount.js`]: 'src/talons/CheckoutPage/OrderConfirmationPage/useCreateAccount.js',
    [`${veniaUiPackagePath}/lib/components/CheckoutPage/PaymentInformation/paymentMethods.js`]: 'src/components/CheckoutPage/paymentMethods.js',
    [`${veniaUiPackagePath}/lib/components/CheckoutPage/OrderConfirmationPage/createAccount.js`]: 'src/components/CheckoutPage/OrderConfirmationPage/createAccount.js',
    [`${peregrinePackagePath}/lib/talons/SearchBar/useSuggestedCategory.js`]: 'src/components/Header/useSuggestedCategory.js',
    [`${peregrinePackagePath}/lib/talons/RootComponents/Product/product.gql.js`]: 'src/queries/Product/product.gql.js',
    [`${veniaUiPackagePath}/lib/components/CheckoutPage/GuestSignIn/guestSignIn.js`]: 'src/components/CheckoutPage/GuestSignIn/guestSignIn.js',
    [`${veniaUiPackagePath}/lib/RootComponents/CMS/cms.js`]: 'src/components/CMS/cms.js',
    [`${peregrinePackagePath}/lib/talons/Cms/cmsPage.gql.js`]: 'src/queries/Cms/cmsPage.gql.js',
    [`${veniaUiPackagePath}/lib/components/CheckoutPage/checkoutPage.js`]: 'src/components/CheckoutPage/checkoutPage.js',
    [`${veniaUiPackagePath}/lib/components/CheckoutPage/PaymentInformation/paymentInformation.js`]: 'src/components/CheckoutPage/PaymentInformation/paymentInformation.js',
    [`${peregrinePackagePath}/lib/talons/CheckoutPage/PaymentInformation/usePaymentInformation.js`]: 'src/components/CheckoutPage/PaymentInformation/usePaymentInformation.js',
    [`${veniaUiPackagePath}/lib/components/CheckoutPage/OrderSummary/orderSummary.js`]: 'src/components/CheckoutPage/OrderSummary/orderSummary.js',
    [`${veniaUiPackagePath}/lib/components/CartPage/PriceAdjustments/priceAdjustments.js`]: 'src/components/CartPage/PriceAdjustments/priceAdjustments.js',
    [`${veniaUiPackagePath}/lib/components/CartPage/GiftCards/giftCards.js`]: 'src/components/CartPage/GiftCards/giftCards.js',
    [`${peregrinePackagePath}/lib/talons/CartPage/GiftCards/useGiftCards.js`]: 'src/components/CartPage/GiftCards/useGiftCards.js',
    [`${veniaUiPackagePath}/lib/components/CartPage/PriceSummary/discountSummary.js`]: 'src/components/CartPage/PriceSummary/discountSummary.js',
    [`${veniaUiPackagePath}/lib/components/CartPage/PriceSummary/priceSummary.js`]: 'src/components/CartPage/PriceSummary/priceSummary.js',
    [`${peregrinePackagePath}/lib/talons/CartPage/PriceSummary/usePriceSummary.js`]: 'src/components/CartPage/PriceSummary/usePriceSummary.js',
    [`${veniaUiPackagePath}/lib/components/MiniCart/miniCart.js`]: 'src/components/MiniCart/miniCart.js',
    [`${pagebuilderPackagePath}/lib/ContentTypes/Banner/banner.js`]: 'src/components/pagebuilder/ContentTypes/Banner/banner.js',
    [`${peregrinePackagePath}/lib/talons/RootComponents/Category/categoryFragments.gql.js`]: 'src/queries/Category/categoryFragments.gql.js',
    [`${peregrinePackagePath}/lib/talons/OrderHistoryPage/orderHistoryPage.gql.js`]: 'src/queries/OrderHistoryPage/orderHistoryPage.gql.js',
    [`${veniaUiPackagePath}/lib/components/OrderHistoryPage/OrderDetails/orderTotal.js`]: 'src/components/OrderHistoryPage/OrderDetails/orderTotal.js',
    [`${veniaUiPackagePath}/lib/components/SignInPage/signInPage.js`]: 'src/components/SignInPage/signInPage.js',
};