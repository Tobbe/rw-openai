// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof GenerateBio> = (args) => {
//   return <GenerateBio {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import GenerateBio from './GenerateBio'

export const generated = () => {
  return <GenerateBio />
}

export default {
  title: 'Components/GenerateBio',
  component: GenerateBio,
} as ComponentMeta<typeof GenerateBio>
