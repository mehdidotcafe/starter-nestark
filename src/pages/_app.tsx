import { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import { IntlProvider, Locale } from '@/provider/IntlProvider'
import { GlobalStyle } from '@/style/GlobalStyle'

export const App = ({ Component, pageProps }: AppProps) => {
  const { locale } = useRouter()

  return (
    <IntlProvider defaultLocale={locale as Locale}>
      <GlobalStyle />
      <Component {...pageProps} />
    </IntlProvider>
  )
}

export default App
