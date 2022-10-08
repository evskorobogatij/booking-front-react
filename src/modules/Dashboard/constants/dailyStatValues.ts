// import { useTranslation } from 'react-i18next'
import { useTranslation } from 'react-i18next'
import i18next from './../../../i18n'
// import i18next from 'i18next'
import { DailyStatKeys } from './DailyStatKeys'

// const { t } = useTranslation()

export const dailyStatValues = [
  { key: DailyStatKeys.bookingIn, label: i18next.t('Booking in') },
  { key: DailyStatKeys.bookingOut, label: i18next.t('Booking out') },
  { key: DailyStatKeys.totalPlaces, label: 'Total places' },
  { key: DailyStatKeys.repairPlaces, label: 'Repair places' },
  { key: DailyStatKeys.placesAvailable, label: 'Places available' },
  { key: DailyStatKeys.placesTaken, label: 'Places taken' },
  { key: DailyStatKeys.placesFree, label: 'Places free' },
]

export const dailyStatValuesFn = () => {
  const { t } = useTranslation()
  return [
    { key: DailyStatKeys.bookingIn, label: t('Booking in') },
    { key: DailyStatKeys.bookingOut, label: t('Booking out') },
    { key: DailyStatKeys.totalPlaces, label: t('Total places') },
    { key: DailyStatKeys.repairPlaces, label: t('Repair places') },
    { key: DailyStatKeys.placesAvailable, label: t('Places available') },
    { key: DailyStatKeys.placesTaken, label: t('Places taken') },
    { key: DailyStatKeys.placesFree, label: t('Places free') },
  ]
}
