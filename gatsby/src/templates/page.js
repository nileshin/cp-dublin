import React from 'react'
import { graphql } from 'gatsby'

const Page = ({ data }) => {
  const { wordpressPage: page } = data;
  return (
    <section className="page-template">
      <h3>{page.title}</h3>
      <p dangerouslySetInnerHTML={{ __html: page.content }} />
    </section>
  )
}

export default Page;

export const query = graphql`
  query($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
    }
  }
`
