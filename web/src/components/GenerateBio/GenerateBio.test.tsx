import { render } from '@redwoodjs/testing/web'

import GenerateBio from './GenerateBio'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('GenerateBio', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GenerateBio />)
    }).not.toThrow()
  })
})
