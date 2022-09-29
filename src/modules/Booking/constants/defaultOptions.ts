import {
  SourceFundingEnum,
  StatusOfBookingEnum,
  TypeOfBookingEnum,
} from '../types/enums'

export const sourceFundingOptions: [SourceFundingEnum, string][] = [
  [SourceFundingEnum.PRIVATE_INSURANCE, 'PRIVATE_INSURANCE'],
  [SourceFundingEnum.PAID_BY_CITIZENS, 'PAID_BY_CITIZENS'],
  [SourceFundingEnum.PAID_BY_COMPANY, 'PAID_BY_COMPANY'],
  [SourceFundingEnum.CHARITY, 'CHARITY'],
  [SourceFundingEnum.BUDGET_FEDERAL, 'BUDGET_FEDERAL'],
  [SourceFundingEnum.BUDGET_REGION, 'BUDGET_REGION'],
  [SourceFundingEnum.BUDGET_DISTRICT, 'BUDGET_DISTRICT'],
  [SourceFundingEnum.COLLECTIVE_FUNDING_FSS, 'COLLECTIVE_FUNDING_FSS'],
  [SourceFundingEnum.OTHER, 'OTHER'],
]

export const typeOfBookingOptions: [TypeOfBookingEnum, string][] = [
  [TypeOfBookingEnum.INDIVIDUAL, 'INDIVIDUAL'],
  [TypeOfBookingEnum.REPAIR, 'REPAIR'],
  [TypeOfBookingEnum.GROUP, 'GROUP'],
  [TypeOfBookingEnum.INTERNET_WEB, 'INTERNET_WEB'],
  [TypeOfBookingEnum.INTERNET_CHATBOT, 'INTERNET_CHATBOT'],
]

export const statusOfBookingOptions: [StatusOfBookingEnum, string][] = [
  [StatusOfBookingEnum.BOOKED, 'BOOKED'],
  [StatusOfBookingEnum.ENTERED, 'ENTERED'],
  [StatusOfBookingEnum.LEFT, 'LEFT'],
  [StatusOfBookingEnum.AWAITING_ENTERING, 'AWAITING_ENTERING'],
  [StatusOfBookingEnum.AWAITING_LEAVING, 'AWAITING_LEAVING'],
  [StatusOfBookingEnum.AWAITING_BOOKING, 'AWAITING_BOOKING'],
]

export const DAYS_INCREMENT_OPTIONS = [10, 12, 14, 16, 18]
