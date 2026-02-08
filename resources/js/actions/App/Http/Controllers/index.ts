import SocialAuthController from './SocialAuthController'
import CustomerController from './CustomerController'
import OrderController from './OrderController'
import CartController from './CartController'
import DashboardController from './DashboardController'
import ProductCategoryController from './ProductCategoryController'
import GeneralCategoryController from './GeneralCategoryController'
import ShopController from './ShopController'
import DeliveryOptionController from './DeliveryOptionController'
import WhatsAppController from './WhatsAppController'
import PlatformController from './PlatformController'
import StaffController from './StaffController'
import ProductController from './ProductController'
import Settings from './Settings'
const Controllers = {
    SocialAuthController: Object.assign(SocialAuthController, SocialAuthController),
CustomerController: Object.assign(CustomerController, CustomerController),
OrderController: Object.assign(OrderController, OrderController),
CartController: Object.assign(CartController, CartController),
DashboardController: Object.assign(DashboardController, DashboardController),
ProductCategoryController: Object.assign(ProductCategoryController, ProductCategoryController),
GeneralCategoryController: Object.assign(GeneralCategoryController, GeneralCategoryController),
ShopController: Object.assign(ShopController, ShopController),
DeliveryOptionController: Object.assign(DeliveryOptionController, DeliveryOptionController),
WhatsAppController: Object.assign(WhatsAppController, WhatsAppController),
PlatformController: Object.assign(PlatformController, PlatformController),
StaffController: Object.assign(StaffController, StaffController),
ProductController: Object.assign(ProductController, ProductController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers