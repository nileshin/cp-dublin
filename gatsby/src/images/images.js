import { graphql } from "gatsby";

export const wpMediaFragment = graphql`
  fragment WpMediaFragment on wordpress__wp_media {
    alt_text
    localFile {
      childImageSharp {
        original {
          src
        }
      }
    }
  }
  fragment WpMediaFragmentFixed on wordpress__wp_media {
    alt_text
    localFile {
      childImageSharp {
        fixed {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
  fragment WpMediaFragmentFluid on wordpress__wp_media {
    alt_text
    localFile {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
  fragment WpMediaFragmentFluid1440 on wordpress__wp_media {
    alt_text
    localFile {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`;