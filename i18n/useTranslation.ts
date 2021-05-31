import { UseTranslationOptions, useTranslation as __useTranslation } from 'react-i18next';
import { I18nKey } from './generated/i18n-types';

export function useTranslation(): {
  t: (key: I18nKey, options?: UseTranslationOptions | undefined) => string;
  i18n: typeof i18n;
} {
  const { t: __t, i18n } = __useTranslation();
  const t = (key: I18nKey, options?: UseTranslationOptions) => __t(key, options);

  return { t, i18n };
}
