import React, { Component } from 'react';
import { graphql } from 'gatsby';

import './main.scss';
import './main.js';

import { ReactComponent as Hamburger} from '../_global/images/hamburger-close.svg';
import { ReactComponent as DownloadIcon} from '../_global/images/icon-dwnld.svg';
import { ReactComponent as PlusIcon} from '../_global/images/icon-plus.svg';

class CapabilitiesTiles extends Component {
  componentDidMount() {
  }
  render() {
    const {title, services_and_capabilities_pdf, capabilities} = this.props;
    return (
    <section className="capabilities-sec">
    
      <div className="container">
       
        <div className="row">

          <div className="col-6">
            <h2 dangerouslySetInnerHTML={{
              __html: title,
            }} />
          </div>

          <div className="col-6">
            <a href={services_and_capabilities_pdf.url.localFile.publicURL} title="Download Capabilities PDF" className="btn-pdf" target="_blank" rel="noopener noreferrer">Download Capabilities PDF <DownloadIcon className="svg-convert icn" alt="download" /></a>
          </div>
           
          <div className="capabilities col-12">
          
          {capabilities.map((capability, index) => 
            <div className="capabilities__item" key={index}>

              <div className="capabilities__details pop-up__target" id={"capabilities__details-"+index}>
                <span className="close"><Hamburger className="flag" alt="open/close menu" /></span>
                <figure className="bg-img" style={{backgroundImage: "url(" + capability.image.localFile.childImageSharp.fluid.src + ")"}}></figure>
                <blockquote>
                  <p>{capability.leadership_quote}</p>
                  <cite>
                    <small>{capability.leadership_title}:</small> {capability.leadership_name}
                  </cite>
                </blockquote>
              </div>
              <h3 className="capabilities__title pop-up__btn" data-href={"#capabilities__details-"+index}>
                <span dangerouslySetInnerHTML={{
                  __html: capability.name,
                }}/>
                <PlusIcon alt="plus" className="icn" />
              </h3>
              <div dangerouslySetInnerHTML={{
                  __html: capability.sub_capabilities,
                }}>
              </div>

            </div>
            
          )}  
          
          </div>
        </div>        
      </div>
      <div className="pop-up">
        <div className="pop-up__wrap">
          <div className="pop-up__content container"></div>
        </div>
      </div>
    </section>
    );
  }
}

export default CapabilitiesTiles;

export const capabilitiesTilesFragment = graphql`
  fragment CapabilitiesTilesFragment on capabilitiesTiles_8 {
    title
    services_and_capabilities_pdf {
      url {
        localFile {
          publicURL
        }
      }
    }
    capabilities {
      name
      sub_capabilities
      leadership_quote
      leadership_title
      leadership_name
      image {
        ...WpMediaFragmentFluid1440
      }
    }
  }
`