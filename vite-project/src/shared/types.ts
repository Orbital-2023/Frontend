export enum SelectedPage {
  Home = "home",
  Features = "features",
  AboutUs = "aboutus",
  JoinUs="joinus",
}

export interface BenefitType {
  icon: JSX.Element;
  title: string;
  description: string;
}

export interface ClassType {
  name: string;
  description?: string;
  image: string;
}
