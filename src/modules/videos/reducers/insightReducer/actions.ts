import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchInsight } from 'Modules/videos/services/fetch.insight';
import { INSIGHT } from './type';

export const fetchInsightData = createAsyncThunk(INSIGHT, async () => {
  //TODO: fetchInsight with keys
  return { data: fetchInsight() };
});
