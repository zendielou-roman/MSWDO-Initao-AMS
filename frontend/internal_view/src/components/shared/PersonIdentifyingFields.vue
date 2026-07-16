<!-- src/components/shared/PersonIdentifyingFields.vue -->
<script setup>
import { barangaysOfInitao, civilStatusOptions } from '@/data/mockClients'
import BarangaySelect from '@/components/shared/BarangaySelect.vue'

const person = defineModel({ required: true })

const props = defineProps({
  errors: { type: Object, default: () => ({}) },
  showAttempted: { type: Boolean, default: false },
  requiredFields: { type: Array, default: () => [] },
})

function inputClass(hasError) {
  const base = 'rounded-lg border px-3 py-2 text-sm outline-none focus:border-slate-400'
  return hasError ? `${base} border-red-400 bg-red-50` : `${base} border-slate-200`
}
function isRequired(key) {
  return props.requiredFields.includes(key)
}
</script>

<template>
  <div class="space-y-4">
    <div>
      <p class="mb-1 text-[11px] text-slate-400">
        Surname / First Name / Middle Name / Ext.
        <span v-if="isRequired('surname')" class="text-red-500">*</span>
      </p>
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <input
          v-model="person.surname"
          placeholder="Surname"
          :class="[inputClass(showAttempted && errors.surname), 'col-span-2 sm:col-span-1']"
        />
        <input
          v-model="person.firstName"
          placeholder="First Name"
          :class="inputClass(showAttempted && errors.firstName)"
        />
        <input v-model="person.middleName" placeholder="Middle Name" :class="inputClass(false)" />
        <input v-model="person.ext" placeholder="Ext. (Jr, Sr)" :class="inputClass(false)" />
      </div>
    </div>

    <div>
      <p class="mb-1 text-[11px] text-slate-400">
        Age / Sex <span v-if="isRequired('age')" class="text-red-500">*</span> · Date of Birth /
        Place of Birth
      </p>
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <input
          v-model="person.age"
          type="number"
          placeholder="Age"
          :class="inputClass(showAttempted && errors.age)"
        />
        <select v-model="person.sex" :class="inputClass(showAttempted && errors.sex)">
          <option value="">Sex</option>
          <option>Male</option>
          <option>Female</option>
        </select>
        <input
          v-model="person.dateOfBirth"
          type="date"
          :class="[inputClass(false), 'col-span-2 sm:col-span-1']"
        />
        <input
          v-model="person.placeOfBirth"
          placeholder="Place of Birth"
          :class="inputClass(false)"
        />
      </div>
    </div>

    <div>
      <p class="mb-1 text-[11px] text-slate-400">
        Purok / Barangay <span v-if="isRequired('barangay')" class="text-red-500">*</span> / Civil
        Status
      </p>
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <input v-model="person.purok" placeholder="Purok" :class="inputClass(false)" />
        <BarangaySelect v-model="person.barangay" />
        <select v-model="person.civilStatus" :class="inputClass(false)">
          <option value="">Civil Status</option>
          <option v-for="c in civilStatusOptions" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-3">
      <input
        v-model="person.highestEducation"
        placeholder="Highest Educational Attainment"
        :class="inputClass(false)"
      />
      <input v-model="person.occupation" placeholder="Occupation" :class="inputClass(false)" />
    </div>

    <div v-if="'monthlyIncome' in person" class="grid grid-cols-2 gap-3">
      <input
        v-model="person.monthlyIncome"
        type="number"
        placeholder="Monthly Income (₱)"
        :class="inputClass(false)"
      />
      <input
        v-if="'religion' in person"
        v-model="person.religion"
        placeholder="Religion"
        :class="inputClass(false)"
      />
    </div>

    <div v-if="'contact' in person">
      <p class="mb-1 text-[11px] text-slate-400">
        Contact Number <span v-if="isRequired('contact')" class="text-red-500">*</span>
      </p>
      <input
        v-model="person.contact"
        placeholder="e.g. 09XXXXXXXXX"
        :class="[inputClass(showAttempted && errors.contact), 'w-full']"
      />
    </div>
  </div>
</template>
