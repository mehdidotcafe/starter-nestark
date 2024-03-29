import '@testing-library/jest-dom'

import {
  act,
  render,
  renderHook,
  waitFor,
} from '@testing-library/react'

import messagesEn from '@/lang/en.json'
import messagesFr from '@/lang/fr.json'
import {
  allowedLocales, defaultAllowedLocale, IntlProvider, Locale, useIntl,
} from '@/provider/IntlProvider'

const testKey = 'hello'

const TestComponent = ({ localeToSet }: { localeToSet: Locale }) => {
  const { messages, setLocale } = useIntl()

  return (
    <>
      <h1>{messages[testKey]}</h1>
      <button type="submit" onClick={() => localeToSet && setLocale(localeToSet)}>Set locale button</button>
    </>
  )
}

const renderComponent = (defaultLocaleProvider?: Locale, localeToSet?: Locale) => render(
  <IntlProvider defaultLocale={defaultLocaleProvider}>
    <TestComponent localeToSet={localeToSet} />
  </IntlProvider>,
)

describe('IntlProvider', () => {
  describe('with fake consumer component', () => {
    it(`should use default locale (${defaultAllowedLocale})`, async () => {
      const { getByText } = renderComponent()

      await waitFor(() => {
        expect(getByText(messagesEn[testKey])).toBeInTheDocument()
      })
    })

    it(`should use props default locale (${allowedLocales[1]})`, async () => {
      const { getByText } = renderComponent(allowedLocales[1])

      await waitFor(() => {
        expect(getByText(messagesFr[testKey])).toBeInTheDocument()
      })
    })

    it(`should use props default locale (${allowedLocales[0]}) and update to ${allowedLocales[1]} on setLocale hook called`, async () => {
      const { getByText, getByRole } = renderComponent(allowedLocales[0], allowedLocales[1])

      await waitFor(() => {
        expect(getByText(messagesEn[testKey])).toBeInTheDocument()
      })

      // Set locale to fr
      act(() => {
        getByRole('button').click()
      })

      await waitFor(() => {
        // Displayed text should now be french
        expect(getByText(messagesFr[testKey])).toBeInTheDocument()
      })
    })
  })

  describe('with hook', () => {
    it('should return undefined locale and messages without any setting', async () => {
      const { result } = renderHook(() => useIntl(), {
        wrapper: IntlProvider,
      })

      await waitFor(() => {
        expect(result.current.locale).toBe(defaultAllowedLocale)
        expect(result.current.messages[testKey]).toBe(messagesEn[testKey])
      })
    })

    it('should return set locale and messages', async () => {
      const { result } = renderHook(() => useIntl(), {
        wrapper: IntlProvider,
      })

      // First default english locale
      await waitFor(() => {
        expect(result.current.locale).toBe(defaultAllowedLocale)
        expect(result.current.messages[testKey]).toBe(messagesEn[testKey])
      })

      // We set locale to french
      act(() => {
        result.current.setLocale(allowedLocales[1])
      })

      // French locale should be set
      await waitFor(() => {
        expect(result.current.locale).toBe(allowedLocales[1])
        expect(result.current.messages[testKey]).toBe(messagesFr[testKey])
      })
    })
  })
})
