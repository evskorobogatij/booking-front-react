import { createTextMask } from 'redux-form-input-masks'

export const dateMask = createTextMask({
  pattern: '9999-99-99',
  stripMask: false,
})

export const dateTimeMask = createTextMask({
  pattern: '9999-99-99 99:99',
  stripMask: false,
})

export const timeMask = createTextMask({
  pattern: '99:99',
  stripMask: false,
})

export const phoneMask = createTextMask({
  pattern: '+9 (999) 999-99 99',
  stripMask: false,
})
