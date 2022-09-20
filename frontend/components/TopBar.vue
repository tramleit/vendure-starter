<template>
  <SfTopBar class="topbar">
    <template #left>
      <SfButton class="sf-button--text">{{ $t("Help & FAQs") }}</SfButton>
    </template>
    <template #center>
      <p>{{ $t("Download") }}</p>
      <SfButton class="topbar__button sf-button--text">{{
        $t("Find out more")
      }}</SfButton>
    </template>
    <template #right>
      <div class="sf-header__icons">
        <SfButton
          v-e2e="'app-header-account'"
          class="sf-button--pure sf-header__action"
          aria-label="Open account button"
          @click="handleAccountClick"
        >
          <SfIcon :icon="accountIcon" size="1.25rem" />
        </SfButton>
        <SfButton
          class="sf-button--pure sf-header__action"
          aria-label="Toggle wishlist sidebar"
          @click="toggleWishlistSidebar"
        >
          <SfIcon class="sf-header__icon" icon="heart" size="1.25rem" />
          <SfBadge
            v-if="wishlistTotalItems"
            class="sf-badge--number cart-badge"
            >{{ wishlistTotalItems }}</SfBadge
          >
        </SfButton>
        <SfButton
          v-e2e="'app-header-cart'"
          aria-label="Toggle cart sidebar"
          class="sf-button--pure sf-header__action"
          @click="toggleCartSidebar"
        >
          <SfIcon class="sf-header__icon" icon="empty_cart" size="1.25rem" />
          <SfBadge v-if="cartTotalItems" class="sf-badge--number cart-badge">{{
            cartTotalItems
          }}</SfBadge>
        </SfButton>
      </div>
    </template>
  </SfTopBar>
</template>

<script>
import {
  SfHeader,
  SfImage,
  SfIcon,
  SfButton,
  SfBadge,
  SfSearchBar,
  SfOverlay,
  SfMenuItem,
  SfLink,
  SfModal,
  SfList,
  SfTopBar,
} from "@storefront-ui/vue";
import { useUiState, useUiHelpers } from "~/composables";

import {
  useCart,
  useWishlist,
  useUser,
  cartGetters,
  wishlistGetters,
  useCategory,
  categoryGetters,
  useFacet,
} from "@vue-storefront/vendure";
import { computed, ref, onBeforeUnmount, watch } from "@vue/composition-api";
import { onSSR } from "@vue-storefront/core";
import LocaleSelector from "~/components/LocaleSelector";
import SearchResults from "~/components/SearchResults";
import { clickOutside } from "@storefront-ui/vue/src/utilities/directives/click-outside/click-outside-directive.js";
import {
  mapMobileObserver,
  unMapMobileObserver,
} from "@storefront-ui/vue/src/utilities/mobile-observer.js";
import debounce from "lodash.debounce";

export default {
  components: {
    SfTopBar,
    SfHeader,
    SfImage,
    LocaleSelector,
    SfIcon,
    SfBadge,
    SfSearchBar,
    SearchResults,
    SfOverlay,
    SfMenuItem,
    SfLink,
    SfButton,
    SfModal,
    SfList,
  },
  directives: { clickOutside },
  setup(props, { root }) {
    const {
      toggleCartSidebar,
      toggleWishlistSidebar,
      toggleLoginModal,
      isMobileMenuOpen,
      toggleMobileMenu,
    } = useUiState();
    const { setTermForUrl, getFacetsFromURL } = useUiHelpers();
    const { isAuthenticated, load: loadUser } = useUser();
    const { cart, load: loadCart } = useCart();
    const { wishlist, load: loadWishlist } = useWishlist();
    const { search, categories } = useCategory();
    const term = ref(getFacetsFromURL().phrase);
    const { search: searchTerm, result: searchResult } = useFacet();
    const isSearchOpen = ref(false);
    const searchBarRef = ref(null);
    const result = ref(null);
    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      return count ? count.toString() : null;
    });
    const wishlistTotalItems = computed(() => {
      const count = wishlistGetters.getTotalItems(wishlist.value);
      return count ? count.toString() : null;
    });
    const accountIcon = computed(() =>
      isAuthenticated.value ? "profile_fill" : "profile"
    );
    // TODO: https://github.com/vuestorefront/vue-storefront/issues/4927
    const handleAccountClick = async () => {
      if (isAuthenticated.value) {
        return root.$router.push("/my-account");
      }
      toggleLoginModal();
    };
    onSSR(async () => {
      await loadUser();
      await loadCart();
      await loadWishlist();
      await search();
    });
    const headerNavigation = computed(() =>
      categoryGetters.getNavigation(categories.value)
    );
    const closeSearch = () => {
      if (!isSearchOpen.value) return;
      term.value = "";
      isSearchOpen.value = false;
    };
    const handleSearch = debounce(async (paramValue) => {
      if (!paramValue.target) {
        term.value = paramValue;
      } else {
        term.value = paramValue.target.value;
      }
      await searchTerm({ term: term.value });
      result.value = searchResult;
    }, 1000);
    const isMobile = computed(() => mapMobileObserver().isMobile.get());
    const closeOrFocusSearchBar = () => {
      if (isMobile.value) {
        return closeSearch();
      } else {
        term.value = "";
        return searchBarRef.value.$el.children[0].focus();
      }
    };
    watch(
      () => term.value,
      (newVal, oldVal) => {
        const shouldSearchBeOpened =
          !isMobile.value &&
          term.value.length > 0 &&
          ((!oldVal && newVal) ||
            (newVal.length !== oldVal.length && isSearchOpen.value === false));
        if (shouldSearchBeOpened) {
          isSearchOpen.value = true;
        }
      }
    );
    const removeSearchResults = () => {
      result.value = null;
    };
    onBeforeUnmount(() => {
      unMapMobileObserver();
    });
    return {
      accountIcon,
      cartTotalItems,
      handleAccountClick,
      toggleCartSidebar,
      toggleWishlistSidebar,
      setTermForUrl,
      term,
      isSearchOpen,
      closeSearch,
      handleSearch,
      result,
      closeOrFocusSearchBar,
      searchBarRef,
      isMobile,
      removeSearchResults,
      headerNavigation,
      isMobileMenuOpen,
      wishlistTotalItems,
      toggleMobileMenu,
    };
  },
};
</script>
<style lang="scss" scoped>
.topbar {
  position: relative;
  z-index: 2;
  &__button {
    margin: 0 0 0 var(--spacer-xs);
  }
}

.cart-badge {
  position: absolute;
  bottom: 40%;
  left: 40%;
}
.sf-header__action {
  position: relative;
  cursor: pointer;
}
</style>
