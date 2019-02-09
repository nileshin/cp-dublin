import React, { Component } from 'react';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import $ from 'jquery';
import './main.scss';


import { ReactComponent as Hamburger} from '../_global/images/hamburger-close.svg';
import { ReactComponent as DownloadIcon} from '../_global/images/icon-dwnld.svg';
import { ReactComponent as PlusIcon} from '../_global/images/icon-plus.svg';

class CapabilitiesTiles extends Component {
  componentDidMount() {
    var popTarget, targetData;

    $(document).ready(function() {
      
      openPopup();
      $(document).keydown(function (e) {
        if (e.keyCode === 27) {
          closePopup();
        }
      });
      $('body').on('click touchstart', function (e) {
        if ($(".pop-up").is(":visible")) {
          if ($(e.target).closest(".popWrap").length === 0) {
            closePopup();
          }
        }
      });

      $(".close").click(function() {
        closePopup();
      });



    });

    function openPopup() {
      $(document).on('click', '.pop-up__btn', function (e) {
        e.preventDefault();
        if ($(this).is('[data-href]')) {
          popTarget = $(this).data("href");
        } else {
          popTarget = $(this).attr("href");
        }
        targetData = $(popTarget)[0].outerHTML;
        $(popTarget).wrap("<span class='pop-up__placeholder'></span>")
        $(popTarget).prependTo(".pop-up__content");
        $(".pop-up__content > *").addClass("popWrap");
        $(".pop-up").fadeIn();
        $("body").addClass("popOpen");
      });
    }

    function closePopup() {
      if ($(".pop-up").is(":visible")) {
        $(".pop-up").fadeOut(function () {
          $("body").removeClass("popOpen");
          $(".pop-up__content > *").removeClass("popWrap");
          $(popTarget).appendTo(".pop-up__placeholder");
          $(popTarget).unwrap();
          $(".pop-up__content").html("");
        });
      }
    }
 
  }
  render() {
    const {title, services_and_capabilities_pdf, capabilities} = this.props;
    return (
    <section className="capabilities-sec">
     
      <div className="hidden">
        Capabilities Tiles
        <pre><code>{JSON.stringify(this.props, null, 1)}</code></pre>
      </div>
    
      <div className="container">
       
        <div className="row">

          <div className="col-6">
            <h2 dangerouslySetInnerHTML={{
              __html: title,
            }} />
          </div>

          <div className="col-6">
            <a href={services_and_capabilities_pdf.url.localFile.publicURL} title="Download Capabilities PDF" className="btn-pdf" target="_blank">Download Capabilities PDF <DownloadIcon className="svg-convert icn" alt="download" /></a>
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