import { DepartmentModel } from '../../Department/DepartmentModel'
import { LabelModel } from '../../Label/LabelModel'

export * from './models/PlaceModel'
export * from './models/RoomModel'

export interface GroupRoomsForm {
  capacity: number
  firstNumber: number
  increment: number
  lastNumber: number
  department: DepartmentModel
  label: LabelModel
}
