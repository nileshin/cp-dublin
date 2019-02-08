import React, { Component } from 'react';
import { graphql } from 'gatsby';

class ContactCards extends Component {
  render() {
    return (
      <div>
        Contact Cards
        <pre><code>{JSON.stringify(this.props, null, 1)}</code></pre>
      </div>
    );
  }
}

export default ContactCards;

export const contactCardsFragment = graphql`
  fragment ContactCardsFragment on contactCards_8 {
    contact_cards_repeater {
      eyebrow
      location
      address
      phone
      capabilities_pdf {
        url {
          localFile {
            publicURL
          }
        }
      }
      contact_info {
        name
        title
        email
        image {
          ...WpMediaFragment
        }
      }
    }
  }
`