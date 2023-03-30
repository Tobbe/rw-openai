import React, { useState } from 'react'

export type VibeType = 'Professional' | 'Casual' | 'Funny'

const GenerateBio = () => {
  const [bio, setBio] = useState('')
  const [vibe, setVibe] = useState<VibeType>('Professional')
  const [generatedBios, setGeneratedBios] = useState('')
  const [loading, setLoading] = useState(false)

  const generateBio = async () => {
    setGeneratedBios('')
    setLoading(true)

    const funnyInstruction =
      vibe === 'Funny'
        ? "Make sure there is a joke in there and it's a little ridiculous."
        : ''

    const prompt = `Generate 2 ${vibe} twitter biographies with no hashtags and clearly labeled "1." and "2.".
      ${funnyInstruction}
      Make sure each generated biography is less than 160 characters,
      has short sentences that are found in Twitter bios,
      and base them on this context: ${bio}${bio.slice(-1) === '.' ? '' : '.'}`

    const source = new EventSource(
      '/.redwood/functions/generate?prompt=' + prompt
    )
    source.onmessage = function (event) {
      if (event.data === '[DONE]') {
        source.close()
      } else {
        setGeneratedBios(
          (prev) => prev + JSON.parse(event.data).choices[0].text
        )
      }
    }

    setLoading(false)
  }

  return (
    <>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        rows={4}
        placeholder={
          'e.g. Senior Engineer @vercel. Tweeting about web dev & AI.'
        }
      />
      <div>
        <p>Select your vibe.</p>
      </div>
      <div>
        <select
          onChange={(e) => setVibe(e.target.value as VibeType)}
          defaultValue={vibe}
        >
          <option value="Professional">Professional</option>
          <option value="Casual">Casual</option>
          <option value="Funny">Funny</option>
        </select>
      </div>
      <button onClick={generateBio} disabled={loading}>
        {!loading && <>Generate your bio &rarr;</>}
        {loading && <>Loading...</>}
      </button>
      <hr />
      <div>
        {generatedBios && (
          <>
            <div>
              <h2>Your generated bios</h2>
            </div>
            <div>
              {generatedBios
                .substring(generatedBios.indexOf('1') + 3)
                .split('2.')
                .map((generatedBio) => {
                  return (
                    <div key={generatedBio}>
                      <p>{generatedBio}</p>
                    </div>
                  )
                })}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default GenerateBio
