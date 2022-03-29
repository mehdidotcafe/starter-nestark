import styled from 'styled-components'
import { useIntl } from '@/provider/IntlProvider'

const Container = styled.h2`
background-color: red;
`






export const Test = () => {
  const { messages, setLocale, locale } = useIntl()

  return (
    <>
      <Container>{messages.hello}</Container>
      <div>
        <button type="submit" onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}>Change locale</button>
      </div>
    </>
  )
}
