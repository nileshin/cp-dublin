import { graphql } from "gatsby";

export const wpMediaFragment = graphql`
  fragment WpMediaFragment on wordpress__wp_media {
    localFile {
      childImageSharp {
        original {
          src
        }
      }
    }
  }
`;