import CategoryController from './CategoryController'
import DeliveryOptionController from './DeliveryOptionController'
import StaffController from './StaffController'
import ProductController from './ProductController'
import ShopController from './ShopController'
import Settings from './Settings'
const Controllers = {
    CategoryController: Object.assign(CategoryController, CategoryController),
DeliveryOptionController: Object.assign(DeliveryOptionController, DeliveryOptionController),
StaffController: Object.assign(StaffController, StaffController),
ProductController: Object.assign(ProductController, ProductController),
ShopController: Object.assign(ShopController, ShopController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers