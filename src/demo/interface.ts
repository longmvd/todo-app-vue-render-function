import { ButtonActionEnum } from './enum'

export interface IItem {
  id: number
  text: string
  order: string
  state: ButtonActionEnum
}

export interface IButtonAction {
  text: string
  actionType: ButtonActionEnum
  callBack: (item: IItem) => void
}
