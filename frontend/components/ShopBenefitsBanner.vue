<template>
  <div class="relative bg-gray-50 pb-24 my-10">
    <SfCallToAction
      title=""
      description=""
      image="/homepage/newsletter.webp"
      class="call-to-action"
    >
    </SfCallToAction>
    <div class="container mx-auto -mt-28">
      <div class="benefit">
        <SfCharacteristic
          v-for="(b, i) in benefits"
          :key="i"
          :icon="b.icon"
          :title="b.title"
          :description="b.description"
          class="benefit__card"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { SfCharacteristic, SfCallToAction } from "@storefront-ui/vue";

export default {
  name: "ShopBenefitsBanner",
  components: {
    SfCharacteristic,
    SfCallToAction,
  },
  setup() {
    const benefits = [
      {
        icon: "phone",
        title: "Hỗ trợ 24/7",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        icon: "shipping",
        title: "Miễn phí giao hàng",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        icon: "return",
        title: "Đổi trả miễn phí",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        icon: "gift",
        title: "Voucher & khuyến mãi",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
    ];
    return {
      benefits,
    };
  },
};
</script>

<style lang="scss">
.benefit {
  @apply flex justify-center gap-6 flex-wrap;
  @screen lg {
    @apply flex-nowrap;
  }
  .sf-characteristic {
    &__icon {
      --icon-size: 4rem;
      @apply transition-all duration-500;
    }
    &__text {
      @apply py-5;
    }
    &__description {
      @apply text-base text-justify text-sm;
    }
    &__title {
      @apply text-2xl font-semibold text-sf-c-secondary-base my-4;
    }
  }
  &__card {
    @apply transition-all duration-300 bg-white p-5;
    @apply flex flex-col justify-center items-center text-center;

    &:hover {
      @apply shadow-primary transform scale-105 origin-bottom;
      //   --tw-shadow-colored: 0 25px 50px -12px var()
      .sf-characteristic__icon {
        @apply transform scale-110;
      }
    }
  }
}
</style>
