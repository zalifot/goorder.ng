<?php

namespace Database\Seeders;

use App\Models\ProductCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            // Electronics
            ['name' => 'Phones & Accessories', 'description' => 'Mobile phones, cases, chargers, and accessories'],
            ['name' => 'Laptops & Computers', 'description' => 'Laptops, desktops, and computer accessories'],
            ['name' => 'Tablets & E-Readers', 'description' => 'Tablets, e-readers, and related accessories'],
            ['name' => 'Audio & Headphones', 'description' => 'Headphones, speakers, and audio equipment'],
            ['name' => 'Cameras & Photography', 'description' => 'Cameras, lenses, and photography gear'],
            ['name' => 'Gaming', 'description' => 'Gaming consoles, games, and accessories'],
            ['name' => 'Smart Home', 'description' => 'Smart home devices and automation'],
            ['name' => 'TV & Video', 'description' => 'Televisions, monitors, and video equipment'],

            // Fashion
            ['name' => 'Men\'s Clothing', 'description' => 'Men\'s shirts, pants, suits, and casual wear'],
            ['name' => 'Women\'s Clothing', 'description' => 'Women\'s dresses, tops, pants, and casual wear'],
            ['name' => 'Shoes', 'description' => 'Footwear for men, women, and children'],
            ['name' => 'Bags & Luggage', 'description' => 'Handbags, backpacks, and travel luggage'],
            ['name' => 'Watches', 'description' => 'Wristwatches and smartwatches'],
            ['name' => 'Jewelry', 'description' => 'Rings, necklaces, bracelets, and earrings'],
            ['name' => 'Sunglasses', 'description' => 'Sunglasses and eyewear accessories'],

            // Health & Beauty
            ['name' => 'Skincare', 'description' => 'Face creams, serums, and skincare products'],
            ['name' => 'Makeup', 'description' => 'Cosmetics and makeup products'],
            ['name' => 'Hair Care', 'description' => 'Shampoos, conditioners, and hair styling products'],
            ['name' => 'Fragrances', 'description' => 'Perfumes, colognes, and body sprays'],
            ['name' => 'Personal Care', 'description' => 'Personal hygiene and care products'],
            ['name' => 'Health Supplements', 'description' => 'Vitamins, supplements, and health products'],

            // Home & Living
            ['name' => 'Furniture', 'description' => 'Home and office furniture'],
            ['name' => 'Kitchen & Dining', 'description' => 'Kitchen appliances and dining essentials'],
            ['name' => 'Bedding', 'description' => 'Bed sheets, pillows, and bedding accessories'],
            ['name' => 'Home Decor', 'description' => 'Decorative items and home accessories'],
            ['name' => 'Lighting', 'description' => 'Lamps, bulbs, and lighting fixtures'],
            ['name' => 'Storage & Organization', 'description' => 'Storage solutions and organizers'],

            // Food & Beverages
            ['name' => 'Groceries', 'description' => 'Food items and grocery essentials'],
            ['name' => 'Beverages', 'description' => 'Drinks, juices, and beverages'],
            ['name' => 'Snacks', 'description' => 'Snacks, chips, and confectionery'],
            ['name' => 'Fresh Produce', 'description' => 'Fresh fruits and vegetables'],
            ['name' => 'Frozen Foods', 'description' => 'Frozen foods and ice cream'],

            // Baby & Kids
            ['name' => 'Baby Clothing', 'description' => 'Clothes for babies and toddlers'],
            ['name' => 'Baby Gear', 'description' => 'Strollers, car seats, and baby equipment'],
            ['name' => 'Toys', 'description' => 'Toys and games for children'],
            ['name' => 'Kids\' Clothing', 'description' => 'Clothing for children'],

            // Sports & Outdoors
            ['name' => 'Sports Equipment', 'description' => 'Sports gear and equipment'],
            ['name' => 'Fitness', 'description' => 'Fitness equipment and accessories'],
            ['name' => 'Outdoor Recreation', 'description' => 'Camping, hiking, and outdoor gear'],
            ['name' => 'Sportswear', 'description' => 'Athletic clothing and footwear'],

            // Automotive
            ['name' => 'Car Accessories', 'description' => 'Car accessories and interior items'],
            ['name' => 'Car Electronics', 'description' => 'Car audio, GPS, and electronics'],
            ['name' => 'Motorcycle Parts', 'description' => 'Motorcycle parts and accessories'],

            // Books & Media
            ['name' => 'Books', 'description' => 'Physical books and textbooks'],
            ['name' => 'Music', 'description' => 'Music CDs and vinyl records'],
            ['name' => 'Movies', 'description' => 'DVDs and Blu-ray movies'],
            ['name' => 'Magazines', 'description' => 'Magazines and periodicals'],

            // Pharmacy
            ['name' => 'Prescription Medicines', 'description' => 'Prescription medications'],
            ['name' => 'Over-the-Counter', 'description' => 'OTC medications and remedies'],
            ['name' => 'Medical Devices', 'description' => 'Medical devices and equipment'],
            ['name' => 'First Aid', 'description' => 'First aid supplies and kits'],

            // Other
            ['name' => 'Office Supplies', 'description' => 'Office and stationery supplies'],
            ['name' => 'Pet Supplies', 'description' => 'Pet food and accessories'],
            ['name' => 'Garden & Outdoor', 'description' => 'Garden tools and outdoor items'],
            ['name' => 'Arts & Crafts', 'description' => 'Art supplies and craft materials'],
        ];

        foreach ($categories as $category) {
            ProductCategory::firstOrCreate(
                ['slug' => Str::slug($category['name'])],
                [
                    'name' => $category['name'],
                    'description' => $category['description'],
                    'is_active' => true,
                ]
            );
        }
    }
}
