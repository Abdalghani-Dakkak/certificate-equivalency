<template>
  <q-select
    v-if="!props.multiple"
    :rules="props.rules"
    :loading="localData.loading"
    :use-input="props.useInput"
    outlined
    map-options
    behavior="menu"
    :option-label="props.optionLabel"
    :option-value="props.optionValue"
    :emit-value="props.emitValue"
    :dense="props.dense"
    :clearable="props.clearable"
    :disable="computedDisable"
    :virtual-scroll="props.virtualScroll"
    :hint="computedHint"
    @filter="filterDirectorate"
    :menu-anchor="props.menuAnchor"
    :menu-self="props.menuSelf"
    :options-cover="props.optionsCover"
    :options-dense="props.optionsDense"
    :transition-show="props.transitionShow"
    :transition-hide="props.transitionHide"
    :input-debounce="props.inputDebounce"
    :popup-content-class="popupClassComputed"
    :input-class="inputClassComputed"
    :input-style="inputStyleComputed"
    v-model="localData.selected"
    :options="localData.filtered"
    :label="props.label"
    :multiple="props.multiple"
    :use-chips="props.useChips"
    :class="[props.class, fixedClass]"
    :style="fixedStyle"
    :dark="$q.dark.isActive"
  >
    <template v-slot:label v-if="props.required">
      <span class="text-negative q-mr-xs">*</span> {{ props.label }}
    </template>
    <template #no-option>
      <q-item v-if="localData.loading" :dark="$q.dark.isActive">
        <q-item-section avatar>
          <q-spinner-ios color="primary" size="18px" />
        </q-item-section>
        <q-item-section>{{ props.loadingHint }}</q-item-section>
      </q-item>
      <q-item v-else :dark="$q.dark.isActive">
        <q-item-section class="text-grey">{{ props.noOptionText }}</q-item-section>
      </q-item>
    </template>
  </q-select>
  <q-select
    v-else
    :rules="props.rules"
    :loading="localData.loading"
    :use-input="props.useInput"
    outlined
    map-options
    behavior="menu"
    :option-label="props.optionLabel"
    :option-value="props.optionValue"
    :emit-value="props.emitValue"
    :dense="props.dense"
    :clearable="props.clearable"
    :disable="computedDisable"
    :virtual-scroll="props.virtualScroll"
    :hint="computedHint"
    @filter="filterDirectorate"
    :menu-anchor="props.menuAnchor"
    :menu-self="props.menuSelf"
    :options-cover="props.optionsCover"
    :options-dense="props.optionsDense"
    :transition-show="props.transitionShow"
    :transition-hide="props.transitionHide"
    :input-debounce="props.inputDebounce"
    :popup-content-class="popupClassComputed"
    :input-class="inputClassComputed"
    :input-style="inputStyleComputed"
    v-model="localData.lstselected"
    :options="localData.filtered"
    :label="props.label"
    :multiple="props.multiple"
    :use-chips="props.useChips"
    :class="[props.class, fixedClass]"
    :style="fixedStyle"
    :dark="$q.dark.isActive"
  >
    <template v-slot:label v-if="props.required">
      <span class="text-negative q-mr-xs">*</span> {{ props.label }}
    </template>
    <template #no-option>
      <q-item v-if="localData.loading" :dark="$q.dark.isActive">
        <q-item-section avatar>
          <q-spinner-ios color="primary" size="18px" />
        </q-item-section>
        <q-item-section>{{ props.loadingHint }}</q-item-section>
      </q-item>
      <q-item v-else :dark="$q.dark.isActive">
        <q-item-section class="text-grey">{{ props.noOptionText }}</q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import type { ListModel } from "src/shared/shared";
import { resetList } from "src/shared/shared-function";
import type { ValidationRule } from "quasar";
import { onMounted, PropType, ref, watch, computed } from "vue";
const watchValue = defineModel("watchValue", {
  type: Object as PropType<any>,
  required: false,
});
const emit = defineEmits(["reset"]);
watch(
  () => watchValue.value,
  () => {
    if (props.resetOnDependencyChange) {
      if (props.resetSelfOnDependencyChange && localData.value) {
        localData.value.selected = null;
        if ("lstselected" in localData.value) {
          (localData.value as any).lstselected = null;
        }
        if (props.clearDataOnDependencyChange) {
          localData.value.data = [] as any;
          localData.value.filtered = [] as any;
        }
      }
      if (props.dependentLists && props.dependentLists.length) {
        props.dependentLists.forEach((lst) => {
          resetList(lst);
        });
      }
      emit("reset");
    }
    props.getData();
  }
);

const props = defineProps({
  lstData: {
    type: {} as PropType<ListModel>,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  rules: {
    type: Array as PropType<ValidationRule[]>,
    required: false,
    default: () => [(val: any) => !!val || "هذا الحقل مطلوب*"],
  },
  optionLabel: {
    type: String,
    required: false,
    default: "name",
  },
  optionValue: {
    type: String,
    required: false,
    default: "id",
  },
  multiple: {
    type: Boolean,
    required: false,
    default: false,
  },
  useChips: {
    type: Boolean,
    required: false,
    default: false,
  },
  useInput: {
    type: Boolean,
    required: false,
    default: true,
  },
  inputDebounce: {
    type: Number,
    required: false,
    default: 0,
  },
  dense: {
    type: Boolean,
    required: false,
    default: true,
  },
  clearable: {
    type: Boolean,
    required: false,
    default: true,
  },
  disable: {
    type: Boolean,
    required: false,
    default: false,
  },
  virtualScroll: {
    type: Boolean,
    required: false,
    default: false,
  },
  emitValue: {
    type: Boolean,
    required: false,
    default: false,
  },
  class: {
    type: String,
    required: false,
    default: "",
  },
  inputClass: {
    type: String,
    required: false,
    default: "",
  },
  inputStyle: {
    type: Object as PropType<Record<string, any>>,
    required: false,
    default: () => ({}),
  },
  getData: {
    type: Function,
    required: false,
    default: () => {},
  },
  hint: {
    type: String,
    required: false,
    default: "",
  },
  loadingHint: {
    type: String,
    required: false,
    default: "جاري تحميل البيانات...",
  },
  menuAnchor: {
    type: String as PropType<
      | "bottom left"
      | "top left"
      | "top middle"
      | "top right"
      | "top start"
      | "top end"
      | "center left"
      | "center middle"
      | "center right"
      | "center start"
      | "center end"
      | "bottom middle"
      | "bottom right"
      | "bottom start"
      | "bottom end"
    >,
    required: false,
    default: "bottom left",
  },
  menuSelf: {
    type: String as PropType<
      | "bottom left"
      | "top left"
      | "top middle"
      | "top right"
      | "top start"
      | "top end"
      | "center left"
      | "center middle"
      | "center right"
      | "center start"
      | "center end"
      | "bottom middle"
      | "bottom right"
      | "bottom start"
      | "bottom end"
    >,
    required: false,
    default: "top left",
  },
  optionsCover: {
    type: Boolean,
    required: false,
    default: true,
  },
  optionsDense: {
    type: Boolean,
    required: false,
    default: true,
  },
  transitionShow: {
    type: String,
    required: false,
    default: "jump-down",
  },
  transitionHide: {
    type: String,
    required: false,
    default: "jump-up",
  },
  popupClass: {
    type: String,
    required: false,
    default: "custom-select-popup",
  },
  noOptionText: {
    type: String,
    required: false,
    default: "لا توجد نتائج",
  },
  searchFields: {
    type: Array as PropType<string[]>,
    required: false,
    default: () => ["name"],
  },
  caseInsensitive: {
    type: Boolean,
    required: false,
    default: true,
  },
  debounceMs: {
    type: Number,
    required: false,
    default: 200,
  },
  matchMode: {
    type: String as PropType<"contains" | "startsWith">,
    required: false,
    default: "contains",
  },
  fixedHeight: {
    type: String,
    required: false,
    default: "",
  },
  fixedWidth: {
    type: String,
    required: false,
    default: "",
  },
  maxWidth: {
    type: String,
    required: false,
    default: "",
  },
  fullWidth: {
    type: Boolean,
    required: false,
    default: false,
  },
  noWrap: {
    type: Boolean,
    required: false,
    default: true,
  },
  dependentLists: {
    type: Array as PropType<ListModel[]>,
    required: false,
    default: () => [],
  },
  resetOnDependencyChange: {
    type: Boolean,
    required: false,
    default: true,
  },
  clearDataOnDependencyChange: {
    type: Boolean,
    required: false,
    default: true,
  },
  resetSelfOnDependencyChange: {
    type: Boolean,
    required: false,
    default: false,
  },
  dependencyRequired: {
    type: Boolean,
    required: false,
    default: false,
  },
  onMountedClear: {
    type: Boolean,
    required: false,
    default: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
});
onMounted(() => {
  if (props.lstData) {
    localData.value = props.lstData;
    if (localData.value.data) {
      localData.value.filtered = localData.value.data;
    }
  }
});
const localData = ref<ListModel>({} as ListModel);
const computedDisable = computed(
  () => props.disable || (props.dependencyRequired && !watchValue.value)
);
const computedHint = computed(() =>
  localData.value?.loading ? props.loadingHint : props.hint
);
const fixedClass = computed(() => {
  const classes: string[] = [];
  if (props.fixedHeight) classes.push("qs-fixed");
  if (props.noWrap) classes.push("qs-nowrap");
  return classes.join(" ");
});
const fixedStyle = computed(() => {
  const st: Record<string, any> = {};
  if (props.fixedHeight) st["--qs-h"] = props.fixedHeight;
  if (props.fullWidth) st.width = "100%";
  else if (props.fixedWidth) st.width = props.fixedWidth;
  if (props.maxWidth) st.maxWidth = props.maxWidth;
  return st;
});
const inputClassComputed = computed(() => props.inputClass || "");
const inputStyleComputed = computed(() => ({
  whiteSpace: props.noWrap ? "nowrap" : "normal",
  overflow: "hidden",
  textOverflow: "ellipsis",
  ...props.inputStyle,
}));
const popupClassComputed = computed(() => {
  return `${props.popupClass} ${
    import.meta.env.SSR
      ? ""
      : document.body.classList.contains("body--dark")
      ? "bg-grey-10 text-white"
      : "bg-white text-black"
  }`;
});

watch(
  () => props.lstData,
  (newVal) => {
    localData.value = newVal;
    if (
      localData.value &&
      localData.value.data &&
      (!localData.value.filtered || localData.value.filtered.length === 0)
    ) {
      localData.value.filtered = localData.value.data;
    }
  },
  { immediate: true }
);
watch(
  () => [props.lstData.data, props.lstData.loading],
  () => {
    localData.value.data = props.lstData.data;
    localData.value.loading = props.lstData.loading as any;
    localData.value.filtered = props.lstData.data;
  }
);
const currentQuery = ref("");
function normalizeArabic(input: string) {
  let s = input.normalize("NFKD");
  s = s.replace(/[\u064B-\u0652]/g, "");
  s = s.replace(/أ|إ|آ|ا/g, "ا");
  s = s.replace(/ى|ي/g, "ي");
  s = s.replace(/ة/g, "ه");
  s = s.replace(/ـ/g, "");
  return s.toLowerCase();
}
function filterDirectorate(val: any, update: (cb: () => void) => void) {
  if (!localData.value) {
    update(() => {
      localData.value = {
        data: [],
        filtered: [],
        selected: null,
        lstselected: null,
        loading: false,
        error: "",
        isError: false,
      } as any;
    });
    return;
  }
  if (localData.value.loading) {
    update(() => {
      localData.value.filtered = [];
    });
    return;
  }
  const raw = `${val ?? ""}`;
  currentQuery.value = raw;
  const query = props.caseInsensitive ? normalizeArabic(raw) : raw;
  update(() => {
    if (!query) {
      localData.value.filtered = localData.value.data;
      return;
    }
    localData.value.filtered = (localData.value.data || []).filter((v: any) => {
      return props.searchFields.some((f) => {
        const s = `${v[f] ?? ""}`;
        const t = props.caseInsensitive ? normalizeArabic(s) : s;
        return props.matchMode === "startsWith" ? t.startsWith(query) : t.includes(query);
      });
    });
  });
}

watch(
  () => localData.value?.loading,
  (loading) => {
    if (!loading && localData.value && Array.isArray(localData.value.data)) {
      const raw = currentQuery.value;
      const query = props.caseInsensitive ? normalizeArabic(raw) : raw;
      if (!query) {
        localData.value.filtered = localData.value.data.slice();
        return;
      }
      localData.value.filtered = localData.value.data.filter((v: any) => {
        return props.searchFields.some((f) => {
          const s = `${v[f] ?? ""}`;
          const t = props.caseInsensitive ? normalizeArabic(s) : s;
          return props.matchMode === "startsWith"
            ? t.startsWith(query)
            : t.includes(query);
        });
      });
    }
  }
);

onMounted(() => {
  if (props.onMountedClear) {
    localData.value.selected = null;
    localData.value.lstselected = null;
  }
});
</script>

<style scoped>
.custom-select-popup {
  max-height: 320px;
  overflow-y: auto;
}
.qs-fixed .q-field__control {
  min-height: var(--qs-h, 42px);
}
.qs-fixed .q-field__native {
  line-height: var(--qs-h, 42px);
}
.qs-nowrap .q-field__native,
.qs-nowrap .q-select__label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
