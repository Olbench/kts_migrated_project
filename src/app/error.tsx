'use client'

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section>
      <h1>Something went wrong</h1>
      <p>Try to reload this page.</p>
      <button onClick={reset} type="button">
        Retry
      </button>
    </section>
  )
}
