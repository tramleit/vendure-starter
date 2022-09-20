<template>
  <div class="bg-gray-50 bg-opacity-30 mt-10">
    <div class="container mx-auto pt-10">
      <div class="footer-info__container">
        <div class="footer-info__item">
          <div class="footer-info__text">
            <div class="footer-icon sf-circle-icon sf-button color-success">
              <SfIcon icon="phone" size="" aria-hidden="true" />
            </div>
            <div>
              <div class="footer-info__name">
                Liên hệ mua hàng (Từ 08:00 - 21:00)
              </div>
              <div class="footer-info__label">090.090.090</div>
              <div class="footer-info__extra">Tất cả các ngày trong tuần</div>
            </div>
          </div>
        </div>
        <div class="footer-info__item">
          <div class="footer-info__text">
            <div class="footer-icon sf-circle-icon sf-button color-success">
              <SfIcon
                class="text-white"
                icon="phone"
                size=""
                aria-hidden="true"
              />
            </div>
            <div>
              <div class="footer-info__name">
                Đổi trả, khiếu nại (Từ 08:00 - 21:00)
              </div>
              <div class="footer-info__label">090.090.090</div>
              <div class="footer-info__extra">
                Tất cả các ngày (trừ thứ 7,CN)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SfFooter :column="3" multiple class="footer">
      <SfFooterColumn :title="$t('Help')">
        <SfList>
          <SfListItem>
            <router-link to="/page/customer" exact>
              <SfMenuItem
                class="sf-footer__menu-item"
                :label="$t('Customer service')"
              />
            </router-link>
          </SfListItem>
          <SfListItem>
            <router-link to="/page/size" exact>
              <SfMenuItem
                class="sf-footer__menu-item"
                :label="$t('Size guide')"
              />
            </router-link>
          </SfListItem>
          <SfListItem>
            <router-link to="/page/contact" exact>
              <SfMenuItem
                class="sf-footer__menu-item"
                :label="$t('Contact us')"
              />
            </router-link>
          </SfListItem>
        </SfList>
      </SfFooterColumn>
      <SfFooterColumn :title="$t('About us')">
        <SfList>
          <SfListItem>
            <router-link to="/page/about" exact>
              <SfMenuItem
                class="sf-footer__menu-item"
                :label="$t('Who we are')"
              />
            </router-link>
          </SfListItem>
          <SfListItem>
            <router-link to="/page/quality" exact>
              <SfMenuItem
                class="sf-footer__menu-item"
                :label="$t('Quality in the details')"
              />
            </router-link>
          </SfListItem>
          <SfListItem>
            <router-link to="/page/reviews" exact>
              <SfMenuItem
                class="sf-footer__menu-item"
                :label="$t('Customer reviews')"
              />
            </router-link>
          </SfListItem>
        </SfList>
      </SfFooterColumn>

      <SfFooterColumn title="Social">
        <div class="footer__socials">
          <SfImage
            class="footer__social-image"
            v-for="item in social"
            :key="item"
            :src="'/icons/' + item + '.svg'"
            :alt="item"
            width="32"
            height="32"
          />
        </div>
      </SfFooterColumn>
    </SfFooter>
  </div>
</template>

<script>
import {
  SfFooter,
  SfList,
  SfImage,
  SfMenuItem,
  SfInput,
  SfIcon,
} from "@storefront-ui/vue";
export default {
  components: {
    SfFooter,
    SfList,
    SfImage,
    SfMenuItem,
    SfInput,
    SfIcon,
  },
  data() {
    return {
      departments: ["Women fashion", "Men fashion", "Kidswear", "Home"],
      social: ["facebook", "pinterest", "google", "twitter", "youtube"],
      isMobile: false,
      desktopMin: 1024,
    };
  },
};
</script>

<style lang="scss">
.footer {
  margin-bottom: 3.75rem;
  @include for-desktop {
    margin-bottom: 0;
  }
  &__socials {
    display: flex;
    justify-content: space-between;
    margin: 0 auto var(--spacer-lg);
    padding: var(--spacer-base) var(--spacer-xl);
    @include for-desktop {
      justify-content: flex-start;
      padding: var(--spacer-xs) 0;
      margin: 0 auto;
    }
  }
  &__social-image {
    margin: 0 var(--spacer-2xs) 0 0;
  }
}
.sf-footer {
  @include for-desktop {
    border-top: var(--spacer-xs) solid var(--c-primary);
    padding-bottom: 0;
    margin-top: var(--spacer-xl);
  }
  &__container {
    margin: var(--spacer-sm);
    @include for-desktop {
      max-width: 69rem;
      margin: 0 auto;
    }
  }
}
.footer-icon {
  @apply rounded-full bg-sf-c-primary text-white min-w-[48px] min-h-[48px] w-12 h-12 flex flex-col justify-center items-center;
  @apply mr-4;
}
.footer-info {
  &__container {
    @apply flex items-center gap-12 justify-center flex-wrap;
  }
  &__name {
    @apply uppercase mb-2;
  }
  &__text {
    @apply flex items-center;
  }
  &__label {
    @apply font-semibold text-xl;
  }
  &__extra {
    @apply text-sm;
  }
}
</style>
<style lang="scss">
.footer-icon {
  .sf-icon {
    svg {
      @apply text-white;
    }
  }
}
</style>
