import { backgroundArray } from "../../utilities/backgroundArray";

export interface State {
  background: string;
}

export const initialState = {
  background: backgroundArray[0].path,
}