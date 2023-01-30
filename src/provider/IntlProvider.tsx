import {
  createContext, PropsWithChildren, useContext, useEffect, useMemo, useState,
} from 'react'
import { IntlProvider as ReactIntlProvider } from 'react-intl'

// First locale is the default locale
export const allowedLocales = ['en', 'fr'] as const
export const defaultAllowedLocale = allowedLocales[0]
export type Locale = typeof allowedLocales[number]

export type IntlMessages = Record<string, string>
type IntlContextType = {
  readonly locale: Locale,
  readonly messages: IntlMessages,
  readonly setLocale: (locale: Locale) => void
}
type IntlContextProps = {
  readonly defaultLocale?: Locale
}

export const IntlContext = createContext<IntlContextType>({} as IntlContextType)

export const IntlProvider = ({
  defaultLocale = defaultAllowedLocale,
  children,
}: PropsWithChildren<IntlContextProps>) => {
  const [messages, setMessages] = useState<IntlMessages>()
  const [locale, setLocale] = useState<Locale>(defaultLocale)
  const value = useMemo(() => ({
    locale,
    messages,
    setLocale,
  }), [locale, messages])

  useEffect(() => {
    import(`../lang/${locale}.json`).then(setMessages)
  }, [locale])

  return messages ? (
    <ReactIntlProvider locale={locale} messages={messages}>
      <IntlContext.Provider value={value}>
        {children}
      </IntlContext.Provider>
    </ReactIntlProvider>
  ) : null
}

export const useIntl = () => useContext(IntlContext)
