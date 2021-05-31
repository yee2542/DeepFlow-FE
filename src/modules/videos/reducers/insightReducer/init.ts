import { initInsightStateType } from './type';

export const initInsightState: initInsightStateType = {
  data: {
    precision: 1,
    model: '',
    annotations: [],
  },
  present: {
    precision: 1,
    model: '',
    person: [],
    label: [],
    selectedPerson: -1,
    selectedLabel: '',
  },
  ready: false,
};
