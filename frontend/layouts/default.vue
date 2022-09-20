<template>
  <div>
    <LazyHydrate when-visible>
      <TopBar class="desktop-only" />
    </LazyHydrate>
    <LazyHydrate when-idle>
      <AppHeader />
    </LazyHydrate>

    <div id="layout">
      <nuxt :key="$route.fullPath" />

      <LazyHydrate when-visible>
        <BottomNavigation />
      </LazyHydrate>
      <CartSidebar />
      <WishlistSidebar />
      <LoginModal />
      <Notification />
    </div>
    <LazyHydrate when-visible>
      <AppFooter />
    </LazyHydrate>
  </div>
</template>

<script>
import AppHeader from "~/components/AppHeader.vue";
import BottomNavigation from "~/components/BottomNavigation.vue";
import AppFooter from "~/components/AppFooter.vue";
import TopBar from "~/components/TopBar.vue";
import CartSidebar from "~/components/CartSidebar.vue";
import WishlistSidebar from "~/components/WishlistSidebar.vue";
import LoginModal from "~/components/LoginModal.vue";
import LazyHydrate from "vue-lazy-hydration";
import Notification from "~/components/Notification";
import { onSSR } from "@vue-storefront/core";
import { useCategory } from "@vue-storefront/vendure";
export default {
  name: "DefaultLayout",

  components: {
    LazyHydrate,
    TopBar,
    AppHeader,
    BottomNavigation,
    AppFooter,
    CartSidebar,
    WishlistSidebar,
    LoginModal,
    Notification,
  },
  setup() {
    const { search } = useCategory("all");
    onSSR(async () => {
      await search({
        customQuery: {
          collections: "custom-category",
        },
        options: {
          sort: { position: "ASC" },
        },
      });
    });
  },
};
</script>

<style lang="scss">
@import "~@storefront-ui/vue/styles";

#layout {
  box-sizing: border-box;
  @include for-desktop {
    // max-width: 1240px;
    margin: auto;
  }
}

.no-scroll {
  overflow: hidden;
  height: 100vh;
}
</style>
