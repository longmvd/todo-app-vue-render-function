import { ButtonActionEnum } from './enum'

export interface IItem {
  id?: number
  text?: string
  order?: string|number
  state?: ButtonActionEnum
  [key:string]: any
}

export interface IButtonAction {
  text: string
  actionType: ButtonActionEnum
  callBack: (item: IItem, callBack?: (item: IItem) => void) => void,
  afterExecuted?: (item: IItem)=> void;
}
