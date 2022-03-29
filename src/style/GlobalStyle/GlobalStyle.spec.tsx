import { GlobalStyle } from '@/style/GlobalStyle'

const renderComponent = () => <GlobalStyle />

describe('GlobalStyle', () => {
  it('should render', () => {
    expect(renderComponent()).toBeTruthy()
  })
})
