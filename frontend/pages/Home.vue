<template>
  <div id="home">
    <LazyHydrate when-idle>
      <SfHero class="hero">
        <SfHeroItem
          v-for="(hero, i) in heroes"
          :key="i"
          :title="hero.title"
          :subtitle="hero.subtitle"
          :background="hero.background"
          :image="hero.image"
          :class="hero.className"
        />
      </SfHero>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <div class="category-banner">
        <SfCategoryCard
          v-for="item in categoriesBanner"
          :key="item.id"
          :label="item.name"
          :link="localePath('/c/' + item.slug)"
          class="!bg-cover category-banner__card"
          :background="{
            mobile: item.assets && item.assets[0] ? item.assets[0].source : '',
            desktop: item.assets && item.assets[0] ? item.assets[0].source : '',
          }"
        />
      </div>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <ProductsByCategory :products="productsByCat.first" />
    </LazyHydrate>

    <LazyHydrate when-visible>
      <shop-benefits-banner />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <ProductsByCategory :products="productsByCat.last" />
    </LazyHydrate>

    <!-- <LazyHydrate when-visible>
      <InstagramFeed />
    </LazyHydrate> -->
  </div>
</template>
<script>
import {
  SfHero,
  SfBanner,
  SfCallToAction,
  SfSection,
  SfCard,
  SfProductCard,
  SfImage,
  SfBannerGrid,
  SfHeading,
  SfArrow,
  SfButton,
  SfTile,
  SfCategoryCard,
} from "@storefront-ui/vue";
import InstagramFeed from "~/components/InstagramFeed.vue";
import LazyHydrate from "vue-lazy-hydration";
import { useContext, computed, watch, reactive } from "@nuxtjs/composition-api";
import {
  facetGetters,
  productGetters,
  useCart,
  useCategory,
  useWishlist,
} from "@vue-storefront/vendure";
import { onSSR, useVSFContext } from "@vue-storefront/core";
import { getCalculatedPrice } from "~/helpers";
import ShopBenefitsBanner from "~/components/ShopBenefitsBanner";
import ProductsByCategory from "~/components/ProductsByCategory";

export default {
  name: "Home",
  layout: "default",
  components: {
    InstagramFeed,
    SfTile,
    SfHero,
    SfBanner,
    SfCallToAction,
    SfSection,
    SfCard,
    SfProductCard,
    SfImage,
    SfBannerGrid,
    SfHeading,
    SfArrow,
    SfButton,
    LazyHydrate,
    SfCategoryCard,
    ShopBenefitsBanner,
    ProductsByCategory,
  },
  setup() {
    const { $config } = useContext();
    const { $vendure } = useVSFContext();
    const heroes = [
      {
        title: "Colorful summer dresses are already in store",
        subtitle: "SUMMER COLLECTION 2019",
        background: "#eceff1",
        image: "/homepage/bannerH.webp",
      },
      {
        title: "Colorful summer dresses are already in store",
        subtitle: "SUMMER COLLECTION 2019",
        background: "#efebe9",
        image: "/homepage/bannerA.webp",
        className:
          "sf-hero-item--position-bg-top-left sf-hero-item--align-right",
      },
      {
        title: "Colorful summer dresses are already in store",
        subtitle: "SUMMER COLLECTION 2019",
        background: "#fce4ec",
        image: "/homepage/bannerB.webp",
      },
    ];

    const { categories } = useCategory("all");

    const categoriesBanner = computed(() => {
      const items = categories?.value?.items?.filter(
        (c) => !!c?.customFields?.show_in_list
      );
      return items || [];
    });

    const categoriesList = computed(() => {
      const items = categories?.value?.items?.filter(
        (c) => !!c?.customFields?.show_in_home_page
      );
      return items || [];
    });
    const productsByCat = reactive({ first: [], last: [] });

    watch(
      () => categoriesList.value,
      async (newCategories) => {
        const middleIndex = Math.round(newCategories.length / 2);
        await Promise.all(
          newCategories.map(async (cat, index) => {
            const result = await $vendure.api.getFacet({
              input: {
                collectionId: cat.id,
                groupByProduct: true,
                take: 12,
              },
            });
            const searchResult = facetGetters.getAgnosticSearchResult({
              data: result.data.search,
              input: { sort: { name: "DESC" } },
            });
            const position = index < middleIndex ? "first" : "last";
            productsByCat[position].push({
              category: cat,
              products: facetGetters.getProducts(searchResult),
            });
          })
        );
      },
      {
        immediate: true,
      }
    );

    return {
      heroes,
      categoriesBanner,
      productsByCat,
      getCalculatedPrice,
      productGetters,
    };
  },
};
</script>

<style lang="scss">
.category-banner {
  @apply mb-10 mx-auto w-full flex container gap-6 justify-center flex-wrap;

  &__card {
    @apply transition-all duration-300;
    @apply shrink grow basis-0 min-w-[128px] overflow-hidden;

    &:hover {
      @apply shadow-primary transform scale-105 origin-bottom;
    }
    @screen lg {
      @apply grow-0 shrink-0 basis-[256px] relative h-96;
    }
    .sf-category-card__label {
      @apply uppercase text-xl;
    }
  }
}
</style>
<style lang="scss" scoped>
#home {
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    // max-width: 1240px;
    padding: 0;
    margin: 0 auto;
  }
}

.hero {
  margin: var(--spacer-xl) auto var(--spacer-lg);
  --hero-item-background-position: center;
  @include for-desktop {
    margin: var(--spacer-xl) auto var(--spacer-2xl);
  }
  .sf-hero-item {
    &:nth-child(even) {
      --hero-item-background-position: left;
      @include for-mobile {
        --hero-item-background-position: 30%;
        ::v-deep .sf-hero-item__subtitle,
        ::v-deep .sf-hero-item__title {
          text-align: right;
          width: 100%;
          padding-left: var(--spacer-sm);
        }
      }
    }
  }
  ::v-deep .sf-hero__control {
    &--right,
    &--left {
      display: none;
    }
  }
}

.banner {
  &__tshirt {
    background-position: left;
  }
  &-central {
    @include for-desktop {
      --banner-container-flex: 0 0 70%;
    }
  }
}

.similar-products {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--spacer-2xs);
  --heading-padding: 0;
  border-bottom: 1px var(--c-light) solid;
  @include for-desktop {
    border-bottom: 0;
    justify-content: center;
    padding-bottom: 0;
  }
}
::v-deep .sf-product-card__image .sf-image {
  --image-height: 14.375rem;
  --image-width: 9.375rem;
  object-fit: cover;
  @include for-desktop {
    --image-width: 13.125rem;
    --image-height: 18.75rem;
  }
}

// .call-to-action {
//   background-position: right;
//   margin: var(--spacer-xs) 0;
//   @include for-desktop {
//     margin: var(--spacer-xl) 0 var(--spacer-2xl) 0;
//   }
// }

// .carousel {
//   margin: 0 calc(-1 * var(--spacer-sm)) 0 0;
//   @include for-desktop {
//     margin: 0;
//   }
//   &__item {
//     margin: 1.375rem 0 2.5rem 0;
//     @include for-desktop {
//       margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
//     }
//     &__product {
//       --product-card-add-button-transform: translate3d(0, 30%, 0);
//     }
//   }
//   ::v-deep .sf-arrow--long .sf-arrow--right {
//     --arrow-icon-transform: rotate(180deg);
//     -webkit-transform-origin: center;
//     transform-origin: center;
//   }
// }
</style>
