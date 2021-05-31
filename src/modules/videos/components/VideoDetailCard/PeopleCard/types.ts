import { PersonPresentType } from 'Modules/videos/models/types';

export type PeopleCardPropsType = {
  totalPeople: number;
  incidents: PersonPresentType[];
  handleSelectAvatar: (index: number) => void;
};
