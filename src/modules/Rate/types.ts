import { CurrencyType } from '../../types'

export type RateType = 'FOOD_RATE' | 'PLACE_RATE' | 'TREATMENT_RATE'

export interface RateComponentModel {
  id: number
  rate: number
  description: string
  type: RateType
  currency: CurrencyType
}

export interface ComboRateModel {
  id: number
  description: string
  totalRate: number
  components: RateComponentModel[]
}
