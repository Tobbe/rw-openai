import { MetaTags } from '@redwoodjs/web'

import GenerateBio from 'src/components/GenerateBio/GenerateBio'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1>HomePage</h1>
      <GenerateBio />
    </>
  )
}

export default HomePage
