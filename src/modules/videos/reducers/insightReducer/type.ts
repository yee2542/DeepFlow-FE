import {
  AnnotationResultType,
  LabelPresentType,
  PersonPresentType,
} from 'Modules/videos/models/types';
import { ErrorState } from 'Stores/common/types/error';

const INSIGHT = 'INSIGHT';

type initInsightStateType = {
  data: AnnotationResultType;
  present: {
    precision: number;
    model: string;
    person: PersonPresentType[];
    label: LabelPresentType[];
    selectedPerson: number;
    selectedLabel: string;
  };
  ready: boolean;
  error?: ErrorState;
};

export { INSIGHT };
export type { initInsightStateType };
