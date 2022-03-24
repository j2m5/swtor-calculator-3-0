<template>
  <div class="home">
    <div>
      <label for="set">Выберите сет</label>
    </div>
    <div>
      <select v-model="set" id="set">
        <option
          v-for="(item, key) in maxRating"
          :value="item.set"
          :key="key">
          {{ item.set }}
        </option>
      </select>
    </div>
    <div>
      <label for="class_">Выберите класс</label>
    </div>
    <div>
      <select v-model="class_" id="class_">
        <option
          v-for="(item, key) in disciplines.map(el => el.class_)"
          :value="item"
          :key="key">
          {{ item }}
        </option>
      </select>
    </div>
    <div>
      <label for="discipline">Выберите дисциплину</label>
    </div>
    <div>
      <select v-model="discipline" id="discipline">
        <option
          v-for="(item, key) in getDisciplines"
          :value="item"
          :key="key">
          {{ item }}
        </option>
      </select>
    </div>
    <div>
      <label for="rating">Рейтинг</label>
    </div>
    <div>
      <select v-model.number="rating" id="rating">
        <option
          v-for="(item, key) in maxRating.find(el => el.set === set).ratings"
          :value="item"
          :key="key">
          {{ item }}
        </option>
      </select>
    </div>
    <div>
      <label for="attribute">Укажите приоритетный параметр</label>
    </div>
    <div>
      <select v-model="attribute" id="attribute">
        <option
          v-for="(item, key) in getAttributes"
          :value="item"
          :key="key">
          {{ item }}
        </option>
      </select>
    </div>
    <div v-if="attribute === 'Accuracy' || attribute === 'Critical'">
      <input v-model="usingStim" type="checkbox" id="usingStim">
      <label for="usingStim">Использовать стим?</label>
    </div>
    <div>
      <label for="percent">Укажите процент</label>
    </div>
    <div>
      <input v-model.number="percent" type="number" id="percent">
    </div>
    <div>
      <input v-model="usingAugments" type="checkbox" id="usingAugments">
      <label for="usingAugments">Использовать аугменты?</label>
    </div>
    <div v-if="usingAugments">
      <label for="augmentRating">Рейтинг аугментов</label>
    </div>
    <div v-if="usingAugments">
      <select v-model.number="augmentRating" id="augmentRating">
        <option value="286">Advanced Augment 74 (286)</option>
        <option value="300">Superior Augment 77 (300)</option>
      </select>
    </div>
    <div>
      <button @click="calculate" :disabled="disabledIf">Получить результат</button>
    </div>
    <div class="navigation">
      <router-link to="/" exact>Главная</router-link> | <router-link to="/percents" exact>Проценты</router-link>
    </div>
    <div v-if="attribute === 'Alacrity' && hasAlacrityBuff && response.build.length">
      <span>Результат расчитывается с учетом Alacrity buff 3%</span>
    </div>
    <div v-if="response.build.length" class="result">
      <div>Искомое значение: {{ percent }}% ({{ Math.ceil(ratingFromPercent) }})</div>
      <div>Получено: {{ response.total }} ({{ attribute }})</div>
      <div v-for="(item, key) in response.build" :key="key">{{ item.name }} ({{ item.statmodifiers }})</div>
    </div>
  </div>
</template>

<script>
import math_ from '@/mixins/math'
import maxRating from '@/mixins/maxRating'
import disciplines from '@/mixins/disciplines'
import bindings from '@/data/bindings'
import { calculateRatingFromPercent, makeBuild, hasAlacrityBuff } from '@/functions'
export default {
  name: 'GearView',
  mixins: [math_, maxRating, disciplines],
  data () {
    return {
      percent: 0,
      rating: 320,
      ratingFromPercent: 0,
      augmentRating: 286,
      attribute: 'Shield',
      set: 'Noble Decurion',
      class_: 'Juggernaut/Guardian',
      discipline: 'Immortal/Defense',
      usingAugments: false,
      usingStim: false,
      response: {
        build: [],
        total: 0
      },
      bindings
    }
  },
  watch: {
    set () {
      this.clearResponse()
    },
    class_ () {
      this.discipline = this.getDisciplines[0]
      this.attribute = this.getAttributes[0]
      this.clearResponse()
    },
    discipline () {
      this.attribute = this.getAttributes[0]
      this.clearResponse()
    },
    rating () {
      this.clearResponse()
    },
    attribute () {
      this.usingStim = false
      this.clearResponse()
    }
  },
  computed: {
    getDisciplines () {
      return this.disciplines.find(el => el.class_ === this.class_).disciplines
    },
    getAttributes () {
      return this.bindings.find(el => el.discipline === this.discipline).attributes
    },
    hasAlacrityBuff () {
      return hasAlacrityBuff(this.discipline)
    },
    disabledIf () {
      return (!this.percent) ||
      (this.attribute === 'Alacrity' && this.discipline === 'Carnage/Combat' && this.percent < 4) ||
      (this.attribute === 'Alacrity' && this.discipline === 'Arsenal/Gunnery' && this.percent < 4)
    }
  },
  methods: {
    calculate () {
      const number = this.math_.find(el => el.attribute === this.attribute)
      if (this.percent > number.cap * 100 - 0.1) {
        alert('Достигнут предельный процент для этого параметра')
        return false
      }
      this.ratingFromPercent = calculateRatingFromPercent(Math.abs(this.percent), number.cap, number.divisor)
      this.response = makeBuild(
        this.attribute,
        this.discipline,
        this.rating,
        this.augmentRating,
        this.set,
        Math.ceil(this.ratingFromPercent),
        this.usingStim,
        this.usingAugments
      )
    },
    clearResponse () {
      this.response = {
        build: [],
        total: 0
      }
    }
  }
}
</script>

<style scoped>
  .home > div {
    margin: 10px 0;
  }
  .home > div > button {
    margin: 0 5px;
  }
  .navigation {
    margin-top: 10px;
  }
  .result > div {
    margin: 10px 0;
  }
</style>
