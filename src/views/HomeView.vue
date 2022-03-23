<template>
  <div class="home">
    <div>
      <label for="type">Выберите тип расчета</label>
    </div>
    <div>
      <select v-model="type" id="type" @change="output = 0; input = 0">
        <option value="rating2percent">Получить процент от рейтинга</option>
        <option value="percent2rating">Получить рейтинг от процента</option>
      </select>
    </div>
    <div>
      <label for="attribute">Выберите параметр</label>
    </div>
    <div>
      <select v-model="attribute" id="attribute" @change="output = 0; input = 0">
        <option value="alacrity">Alacrity</option>
        <option value="accuracy">Accuracy</option>
        <option value="crit_crit">Critical Chance/Multiplier (Critical Rating)</option>
        <option value="crit_mastery">Critical Chance (Mastery)</option>
        <option value="shield">Shield</option>
        <option value="absorb">Absorb</option>
        <option value="defense">Defense</option>
      </select>
    </div>
    <div>
      <label for="input">Введите значение</label>
    </div>
    <div>
      <input v-model.number="input" type="number" id="input" min="0">
    </div>
    <div>
      <button @click="calculate(type, input)" :disabled="!input">Посчитать</button>
      <button @click="output = 0; input = 0" :disabled="!input">Очистить</button>
    </div>
    <div class="navigation">
      <router-link to="/" exact>Главная</router-link> | <router-link to="/percents" exact>Проценты</router-link>
    </div>
    <h3 v-if="output">{{ (type === 'rating2percent') ? `${output.toFixed(2)}%` : `${Math.ceil(output)} (${output})` }}</h3>
  </div>
</template>

<script>
import { calculatePercentFromRating, calculateRatingFromPercent } from '@/functions'
export default {
  name: 'HomeView',
  data () {
    return {
      type: 'rating2percent',
      attribute: 'alacrity',
      input: 0,
      output: 0
    }
  },
  methods: {
    calculate (type, number) {
      if (type === 'rating2percent') {
        this.calculatePercent(number)
      } else {
        this.calculateRating(number)
      }
    },
    calculatePercent (input) {
      input = Math.abs(input)
      switch (this.attribute) {
        case 'alacrity':
          this.output = calculatePercentFromRating(input, 0.3, 3.2)
          break
        case 'accuracy':
          this.output = calculatePercentFromRating(input, 0.3, 3.2)
          break
        case 'crit_crit':
          this.output = calculatePercentFromRating(input, 0.3, 2.41)
          break
        case 'crit_mastery':
          this.output = calculatePercentFromRating(input, 0.2, 12.93)
          break
        case 'shield':
          this.output = calculatePercentFromRating(input, 0.5, 2.079)
          break
        case 'absorb':
          this.output = calculatePercentFromRating(input, 0.5, 2.189)
          break
        case 'defense':
          this.output = calculatePercentFromRating(input, 0.3, 5)
          break
        default:
          this.output = 'Произошла ошибка'
      }
    },
    calculateRating (input) {
      input = Math.abs(input)
      switch (this.attribute) {
        case 'alacrity':
          this.output = calculateRatingFromPercent(input, 0.3, 3.2)
          break
        case 'accuracy':
          this.output = calculateRatingFromPercent(input, 0.3, 3.2)
          break
        case 'crit_crit':
          this.output = calculateRatingFromPercent(input, 0.3, 2.41)
          break
        case 'crit_mastery':
          this.output = calculateRatingFromPercent(input, 0.2, 12.93)
          break
        case 'shield':
          this.output = calculateRatingFromPercent(input, 0.5, 2.079)
          break
        case 'absorb':
          this.output = calculateRatingFromPercent(input, 0.5, 2.189)
          break
        case 'defense':
          this.output = calculateRatingFromPercent(input, 0.3, 5)
          break
        default:
          this.output = 'Произошла ошибка'
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
</style>
