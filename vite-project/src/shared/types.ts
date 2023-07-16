export enum SelectedPage {
  Home = "home",
  Features = "features",
  JoinUs="joinus",
}

export interface FeatureType {
  icon: JSX.Element;
  title: string;
  description: string;
}

export interface ClassType {
  name: string;
  description?: string;
  image: string;
}
export default interface IUser {
  roomId?: any | null,
  username?: string | null,
  email?: string,
  roomPassword?: string,
}
