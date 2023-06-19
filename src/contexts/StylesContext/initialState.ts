import { backgroundArray } from "../../utilities/backgroundArray";

export interface State {
  background: string;
  blur: string
  bright: string
}

export const initialState = {
  background: backgroundArray[0].path,
  blur: '1',
  bright: '1'
}