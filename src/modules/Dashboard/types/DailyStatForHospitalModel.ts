import { HospitalModel } from '../../Hospital/HospitalModel'
import { DailyStatModel } from './DailyStatModel'

export interface DailyStatForHospitalModel {
  hospital: HospitalModel
  dailyStat: DailyStatModel
}
