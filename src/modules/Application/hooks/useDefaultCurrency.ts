import { useGetApplicationQuery } from '../applicationService'
import { CurrencyType } from '../../../types'

export const useDefaultCurrency = (): CurrencyType | null => {
  const { data } = useGetApplicationQuery(null)

  if (!data) return null

  return data.defaultCurrency
}
