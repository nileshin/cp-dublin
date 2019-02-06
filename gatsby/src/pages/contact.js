import React, { Component } from 'react';
import { graphql } from 'gatsby';
import Header from '../modules/header';
import ContactCards from '../modules/contact-cards';

class Contact extends Component {
  render() {
    const { data: { wordpressPage: { acf: { header, contact_cards } } } } = this.props
    return (
      <div>
        Contact Page
        <Header {...header.header} />
        <ContactCards {...contact_cards.contact_cards} />
        <pre>
          <code>{JSON.stringify(this.props.data, null, 1)}</code>
        </pre>
      </div>
    );
  }
}

export default Contact;

export const query = graphql`
  query {
    wordpressPage(slug: { eq: "contact" }) {
      id
      wordpress_id
      ...YoastMetadataFragment
      acf {
        header {
          header {
            ...HeaderFragment
          }
        }
        contact_cards {
          contact_cards {
            ...ContactCardsFragment
          }
        }
      }
    }
  }
`;
