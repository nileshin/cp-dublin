import React from 'react'
import { graphql } from 'gatsby'

const Page = ({ data }) => {
  const { wordpressPage: page } = data;
  const { acf: { home_header: { home_header } } } = page;
  const image_src = home_header.image.localFile.childImageSharp.original.src;
  return (
    <section className="page-template">
      <h3>{home_header.headline}</h3>
      <h4>{home_header.headline_2}</h4>
      <p dangerouslySetInnerHTML={{ __html: home_header.supportive_copy }} />
      <img src={image_src} alt={home_header.image.alt_text} />
      <a href={home_header.cta.url} target={home_header.cta.target}>{home_header.cta.title}</a>
      <pre><code>{JSON.stringify(page.acf.featured_content_page, null, 1)}</code></pre>
    </section>
  )
}

export default Page;

export const query = graphql`
  query {
    wordpressPage(slug: { eq: "home" }) {
      title
      content
      acf {
        home_header {
          home_header {
            headline
            headline_2
            supportive_copy
            cta {
              title
              url
              target
            }
            image {
              alt_text
              localFile{
                childImageSharp {
                  original {
                    src
                  }
                }
              }
            }
          }
        }
        featured_content_page {
          ...on WordPressAcf_press_module {
            press_module {
              eyebrow
              title
              cta {
                title
                url
                target
              }
              image {
                alt_text
                localFile {
                  childImageSharp {
                    original {
                      src
                    }
                  }
                }
              }
            }
          }
          ...on WordPressAcf_content_tile {
            content_tile  {
              eyebrow
              headline
              supportive_text
              cta {
                title
                url
                target
              }
              image {
                alt_text
                localFile {
                  childImageSharp {
                    original {
                      src
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
