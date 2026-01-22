import SocialAuthController from './SocialAuthController'
import DashboardController from './DashboardController'
import CategoryController from './CategoryController'
import DeliveryOptionController from './DeliveryOptionController'
import StaffController from './StaffController'
import ProductController from './ProductController'
import ShopController from './ShopController'
import PlatformController from './PlatformController'
import Settings from './Settings'
const Controllers = {
    SocialAuthController: Object.assign(SocialAuthController, SocialAuthController),
DashboardController: Object.assign(DashboardController, DashboardController),
CategoryController: Object.assign(CategoryController, CategoryController),
DeliveryOptionController: Object.assign(DeliveryOptionController, DeliveryOptionController),
StaffController: Object.assign(StaffController, StaffController),
ProductController: Object.assign(ProductController, ProductController),
ShopController: Object.assign(ShopController, ShopController),
PlatformController: Object.assign(PlatformController, PlatformController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers