import { DepartmentModel } from '../../../Department/DepartmentModel'
import { LabelModel } from '../../../Label/LabelModel'
import { PlaceModel } from './PlaceModel'

export interface RoomModel {
  id: number
  capacity: number
  roomNumber: number
  department: DepartmentModel
  label: LabelModel
  places: PlaceModel[]
}
