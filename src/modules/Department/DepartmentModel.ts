import type { HospitalModel } from '../Hospital/HospitalModel'

export interface DepartmentModel {
  id: number
  name: string
  description: string
  hospital: HospitalModel
}
