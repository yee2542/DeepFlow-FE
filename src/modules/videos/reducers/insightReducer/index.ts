import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnnotationResultType, LabelPresentType } from 'Modules/videos/models/types';
import { ErrorStateCodeEnum } from 'Stores/common/types/error';
import { fetchInsightData } from './actions';
import { initInsightState } from './init';
import { INSIGHT } from './type';

const insightSlice = createSlice({
  name: INSIGHT,
  initialState: initInsightState,
  reducers: {
    init(state) {
      return { ...state, ...initInsightState };
    },
    setSelectedPerson(state, action: PayloadAction<{ index: number }>) {
      const { index } = action.payload;
      state.present.selectedPerson = index;
    },
    setSelectedLabel(state, action: PayloadAction<{ category: string }>) {
      const { category } = action.payload;
      const oldSelectedLabel = state.present.selectedLabel;
      if (category === oldSelectedLabel) {
        state.present.selectedLabel = '';
        state.present.label.forEach((el) => {
          el.selected = false;
        });
      } else {
        state.present.selectedLabel = category;
        state.present.label.forEach((el) => {
          if (el.cat === category) el.selected = true;
          else el.selected = false;
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInsightData.pending, (state) => {
      state.ready = false;
      state.error = undefined;
    });
    builder.addCase(fetchInsightData.rejected, (state) => {
      state.ready = false;
      state.error = {
        code: ErrorStateCodeEnum.ServerInternalError,
        msg: 'api error',
      };
    });

    builder.addCase(
      fetchInsightData.fulfilled,
      (state, action: PayloadAction<{ data: AnnotationResultType }>) => {
        const { data } = action.payload;
        const { annotations, model, precision } = data;
        state.ready = true;
        state.error = undefined;
        state.data.annotations = annotations;
        state.data.model = model;
        state.data.precision = precision;

        state.present.model = model;
        state.present.precision = precision;

        const distictLabelsSet = new Set(
          annotations.flatMap((el) => el.classes.flatMap((c) => c.cat)),
        );
        const distinctLabels = Array.from(distictLabelsSet);
        const mappedLabel = distinctLabels.map((el) => {
          const filteredFps = annotations
            .filter((f) => f.classes.map((el) => el.cat).includes(el))
            .map((f) => f.nFps);

          const distinctFps = new Set(filteredFps);

          return {
            cat: el,
            nFps: Array.from(distinctFps),
            selected: false,
          };
        }) as LabelPresentType[];
        state.present.label = mappedLabel;

        state.present.person = annotations
          .filter((f) => f.classes.map((el) => el.cat).includes('Person'))
          .map((el) => ({ uri: el.uri, nFps: el.nFps, selected: false }));
      },
    );
  },
});
export default insightSlice.reducer;
export const insightActions = insightSlice.actions;
