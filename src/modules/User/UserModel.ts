import type { RoleModel } from 'modules/Role/RoleModel'
import type { DepartmentModel } from '../Department/DepartmentModel'

export interface UserModel {
  id: number
  username: string
  password: string
  roles: RoleModel[]
  department: DepartmentModel
  individualId: string
  name: string
  surname: string
  patrName: string
  dob: string
  gender: 'MALE' | 'FEMALE'
}
