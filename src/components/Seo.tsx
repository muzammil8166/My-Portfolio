import { Helmet } from 'react-helmet-async'

export function Seo(props: {
  title: string
  description: string
  canonicalPath?: string
}) {
  const { title, description, canonicalPath } = props

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="theme-color" content="#0a0a0e" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      {canonicalPath ? (
        <link rel="canonical" href={canonicalPath} />
      ) : null}
    </Helmet>
  )
}

