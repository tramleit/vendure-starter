<template>
  <div>
    <div
      class="container mx-auto"
      v-for="(productsWithCat, i) in products"
      :key="i"
    >
      <LazyHydrate when-visible>
        <div>
          <div class="similar-products">
            <SfHeading
              :title="productsWithCat.category.name"
              :level="2"
              class="uppercase"
            />
            <nuxt-link
              :to="localePath(`/c/${productsWithCat.category.slug}`)"
              class="smartphone-only"
            >
              Xem tất cả
            </nuxt-link>
          </div>
          <div class="container flex mx-auto">
            <SfProductCard
              v-e2e="'category-product-card'"
              v-for="(product, i) in productsWithCat.products"
              :key="product.id"
              :style="{ '--index': i }"
              :title="productGetters.getName(product)"
              :image="productGetters.getCoverImage(product)"
              imageWidth="100%"
              :regular-price="
                $n(productGetters.getPrice(product).regular, 'currency')
              "
              :max-rating="5"
              :score-rating="productGetters.getAverageRating(product)"
              :link="
                localePath(
                  `/p/${productGetters.getId(product)}/${productGetters.getSlug(
                    product
                  )}`
                )
              "
              class="products__product-card"
              :show-add-to-cart-button="true"
              :isInWishlist="isInWishlist({ product })"
              @click:wishlist="
                !isInWishlist({ product })
                  ? addItemToWishlist({ product })
                  : removeItemFromWishlist({ product })
              "
              @click:add-to-cart="addItemToCart({ product, quantity: 1 })"
            />
          </div>
        </div>
      </LazyHydrate>
    </div>
  </div>
</template>

<script>
import LazyHydrate from "vue-lazy-hydration";
import { SfProductCard, SfHeading } from "@storefront-ui/vue";
import { productGetters, useCart, useWishlist } from "@vue-storefront/vendure";
export default {
  name: "ProductByCategory",
  props: {
    products: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    SfProductCard,
    LazyHydrate,
    SfHeading,
  },
  setup() {
    const { addItem: addItemToCart, isInCart, cart } = useCart();
    const {
      addItem: addItemToWishlist,
      isInWishlist,
      removeItem: removeItemFromWishlist,
    } = useWishlist();
    return {
      productGetters,
      isInWishlist,
      isInCart,
      addItemToCart,
      addItemToWishlist,
      cart,
      removeItemFromWishlist,
    };
  },
};
</script>

<style lang="scss" scoped></style>
