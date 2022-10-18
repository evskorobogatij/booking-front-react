import { CurrencyType } from '../../types'

export interface ApplicationModel {
  nameOfAppTitle: string
  nameOfAppSubtitle: string
  footerText: string
  defaultCurrency: CurrencyType
  externalApiConnectorString: string
  externalApiUsername: string
  externalApiPassword: string
  timeDefaultEntering?: string
  timeDefaultLeaving?: string
}
