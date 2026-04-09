<template>
  <div class="row q-col-gutter-sm">
    <div class="col-12 col-md-3">
      <CustomQSelect
        :lst-data="locationStore.lstGovernorate"
        label="المحافظة"
        :get-data="locationStore.getGovernorate"
        :dependent-lists="[locationStore.lstDistrict]"
        :rules="[(val) => !!val || 'يرجى اختيار المحافظة']"
        dense
        outlined
      />
    </div>
    <div class="col-12 col-md-3">
      <CustomQSelect
        :lst-data="locationStore.lstDistrict"
        label="المنطقة"
        :get-data="() => locationStore.getDistrict(locationStore.lstGovernorate.selected?.id as number)"
        :dependent-lists="[locationStore.lstSubdistrict]"
        :watch-value="locationStore.lstGovernorate.selected"
        :dependency-required="true"
        :reset-self-on-dependency-change="true"
        :clear-data-on-dependency-change="true"
        @update:model-value="(val) => {
          placeCode = locationStore.lstDistrict.selected?.code || '';
        }"
        :rules="[(val) => !!val || 'يرجى اختيار المنطقة']"
        dense
        outlined
      />
    </div>
    <div class="col-12 col-md-3">
      <CustomQSelect
        :lst-data="locationStore.lstSubdistrict"
        label="الناحية"
        :get-data="() => locationStore.getSubdistrict(locationStore.lstDistrict.selected?.id as number)"
        :dependent-lists="[locationStore.lstCommunity]"
        :watch-value="locationStore.lstDistrict.selected"
        :dependency-required="true"
        :reset-self-on-dependency-change="true"
        :clear-data-on-dependency-change="true"
        @update:model-value="(val) => {
          placeCode = locationStore.lstSubdistrict.selected?.code || '';
        }"
        :rules="[(val) => !!val || 'يرجى اختيار الناحية']"
        dense
        outlined
      />
    </div>
    <div class="col-12 col-md-3">
      <CustomQSelect
        :lst-data="locationStore.lstCommunity"
        label="البلدة"
        :get-data="() => locationStore.getCommunity(locationStore.lstSubdistrict.selected?.id as number)"
        :dependent-lists="[locationStore.lstSection]"
        :watch-value="locationStore.lstSubdistrict.selected"
        :dependency-required="true"
        :reset-self-on-dependency-change="true"
        :clear-data-on-dependency-change="true"
        @update:model-value="(val) => {
          placeCode = locationStore.lstCommunity.selected?.code || '';
        }"
        :rules="[(val) => !!val || 'يرجى اختيار البلدة']"
        dense
        outlined
      />
    </div>
    <div class="col-12 col-md-3 hidden">
      <q-input
        v-model="placeCode"
        label="رمز الموقع"
        :readonly="true"
        dense
        outlined
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomQSelect from 'src/components/common/CustomQSelect.vue';
import { useLocationStore } from 'src/stores/location-store';
import { onMounted } from 'vue';

const locationStore = useLocationStore();
const placeCode = defineModel<string>({ default: '' });

onMounted(() => {
  locationStore.getGovernorate();
});
</script>
