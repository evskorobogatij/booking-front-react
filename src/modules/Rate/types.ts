export type RateType = 'FOOD_RATE' | 'PLACE_RATE' | 'TREATMENT_RATE'

export type CurrencyType =
  | 'JAPAN_YEN'
  | 'ROUBLE'
  | 'DOLLAR'
  | 'EURO'
  | 'POUND_STERLING'

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
  components: RateComponentModel[]
}
