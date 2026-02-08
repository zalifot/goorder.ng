<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     * Display all carts for the current user (grouped by shop).
     */
    public function index()
    {
        $carts = Cart::with(['shop:id,name,public_id,image', 'items.product:id,name,price,discount_percentage,image,stock_quantity'])
            ->where('user_id', Auth::id())
            ->get()
            ->map(function ($cart) {
                return [
                    'id' => $cart->id,
                    'shop' => $cart->shop,
                    'items' => $cart->items->map(function ($item) {
                        return [
                            'id' => $item->id,
                            'product_id' => $item->product_id,
                            'quantity' => $item->quantity,
                            'line_total' => $item->line_total,
                            'product' => $item->product,
                        ];
                    }),
                    'subtotal' => $cart->subtotal,
                    'item_count' => $cart->item_count,
                ];
            });

        return Inertia::render('customer/cart', [
            'carts' => $carts,
        ]);
    }

    /**
     * Add a product to cart.
     */
    public function addItem(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'integer|min:1',
        ]);

        $product = Product::with('shop')->findOrFail($validated['product_id']);
        $quantity = $validated['quantity'] ?? 1;

        // Check stock
        if ($product->stock_quantity < $quantity) {
            return back()->with('error', 'Not enough stock available');
        }

        // Get or create cart for this shop
        $cart = Cart::firstOrCreate([
            'user_id' => Auth::id(),
            'shop_id' => $product->shop->id,
        ]);

        // Check if item already exists in cart
        $cartItem = CartItem::where('cart_id', $cart->id)
            ->where('product_id', $product->id)
            ->first();

        if ($cartItem) {
            $newQuantity = $cartItem->quantity + $quantity;

            // Check total doesn't exceed stock
            if ($newQuantity > $product->stock_quantity) {
                return back()->with('error', 'Cannot add more items than available stock');
            }

            $cartItem->update(['quantity' => $newQuantity]);
        } else {
            CartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $product->id,
                'quantity' => $quantity,
            ]);
        }

        return back()->with('success', 'Item added to cart');
    }

    /**
     * Update cart item quantity.
     */
    public function updateItem(Request $request, CartItem $cartItem)
    {
        // Verify ownership
        if ($cartItem->cart->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        // Check stock
        if ($validated['quantity'] > $cartItem->product->stock_quantity) {
            return back()->with('error', 'Not enough stock available');
        }

        $cartItem->update(['quantity' => $validated['quantity']]);

        return back()->with('success', 'Cart updated');
    }

    /**
     * Remove item from cart.
     */
    public function removeItem(CartItem $cartItem)
    {
        // Verify ownership
        if ($cartItem->cart->user_id !== Auth::id()) {
            abort(403);
        }

        $cart = $cartItem->cart;
        $cartItem->delete();

        // If cart is empty, delete it
        if ($cart->items()->count() === 0) {
            $cart->delete();
        }

        return back()->with('success', 'Item removed from cart');
    }

    /**
     * Clear entire cart.
     */
    public function clearCart(Cart $cart)
    {
        // Verify ownership
        if ($cart->user_id !== Auth::id()) {
            abort(403);
        }

        $cart->delete();

        return back()->with('success', 'Cart cleared');
    }

    /**
     * Get cart for a specific shop (API endpoint for vendor/show.tsx).
     */
    public function getShopCart(Shop $shop)
    {
        $cart = Cart::with(['items.product:id,name,price,discount_percentage,image,stock_quantity'])
            ->where('user_id', Auth::id())
            ->where('shop_id', $shop->id)
            ->first();

        if (!$cart) {
            return response()->json(['items' => []]);
        }

        return response()->json([
            'id' => $cart->id,
            'items' => $cart->items->map(function ($item) {
                return [
                    'id' => $item->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'product' => $item->product,
                ];
            }),
            'subtotal' => $cart->subtotal,
            'item_count' => $cart->item_count,
        ]);
    }
}
