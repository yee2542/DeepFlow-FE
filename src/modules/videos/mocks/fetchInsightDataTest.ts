import {
  AnnotationResultType,
  PersonPresentType,
  LabelPresentType,
} from '../models/types';

export const expectResult = [
  {
    classes: [
      {
        bbox: {
          ymin: 0,
          ymax: 2,
          xmin: 3,
          xmax: 4,
        },
        prob: 0.35,
        cat: 'Person',
      },
    ],
    uri: 'www.cpe.com',
    nFps: 0,
  },
  {
    classes: [
      {
        bbox: {
          ymin: 0,
          ymax: 2,
          xmin: 3,
          xmax: 4,
        },
        prob: 0.35,
        cat: 'Cat',
      },
      {
        bbox: {
          ymin: 5,
          ymax: 99,
          xmin: 31,
          xmax: 4,
        },
        prob: 0.999,
        cat: 'Person',
      },
    ],
    uri: 'www.cpe.com',
    nFps: 1,
  },
];

export const mockData: AnnotationResultType = {
  precision: 1,
  model: 'ilsvrc_googlenet',
  annotations: expectResult,
};

export const expectedResultPerson: PersonPresentType[] = [
  {
    uri: 'www.cpe.com',
    nFps: 0,
    selected: false,
  },
  {
    uri: 'www.cpe.com',
    nFps: 1,
    selected: false,
  },
];

export const expectedResultLabel: LabelPresentType[] = [
  {
    cat: 'Person',
    selected: false,
    nFps: [0, 1],
  },
  {
    cat: 'Cat',
    selected: false,
    nFps: [1],
  },
];
