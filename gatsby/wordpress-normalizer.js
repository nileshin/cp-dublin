const deepMap = require('deep-map');
const branch_info = require('./pantheon-branchname');

const filterUrls = entities => {
  const regex = new RegExp(`https?:\/\/${branch_info.pantheon_environment_url}`);
  const regex_netlify = new RegExp(`https?:\/\/(?:.+--)?${branch_info.netlify_url}`);
  return deepMap(entities, (value, key) => {
    if (key === 'url') {
      value = value.replace(regex, '');
      value = value.replace(regex_netlify, '');
      value = value.replace(/https?:\/\/cpcom3.lndo.site/, '');
    }
    return value;
  });
}

const addTaxonomy = (entities, tax_name, post_type) => {
  const all_terms = entities.filter(e => e.__type === `wordpress__wp_${tax_name}`);
  return entities.map(e => {
    if (e.__type === `wordpress__wp_${post_type}`) {
      let hasTerms = e[tax_name] && Array.isArray(e[tax_name]) && e[tax_name].length;
      if (hasTerms) {
        e[`${tax_name}___NODE`] = e[tax_name].map(c => all_terms.find(t => c === t.wordpress_id).id);
        delete e[tax_name];
      }
    }
    return e;
  })
}

const addJobLocations = entities => {
  return addTaxonomy(entities, 'job_location', 'jobs');
}

const addLocations = entities => {
  return addTaxonomy(entities, 'department', 'people');
}

const addTenure = entities => {
  return deepMap(entities, (value, key) => {
    if (key === 'tenure') {
      value = value || "";
    }
    return value;
  })
}

const addTenureBasic = entities => {
  return entities.map(e => {
    if (e && e.__type === 'wordpress__PAGE' && e.slug === 'people') {
      if (e.acf && e.acf.leadership_detail_carousel && e.acf.leadership_detail_carousel.leadership_detail_carousel) {
        const slides = e.acf.leadership_detail_carousel.leadership_detail_carousel.leadership_slides;
        slides.forEach(s => {
          console.log(`\t Setting tenure for ${s.name} - ${JSON.stringify(s.tenure)}`)
          s.tenure = s.tenure || "";
        })
      }
    }
    return e;
  })
}

const normalizers = [filterUrls, addJobLocations, addLocations, addTenure];

module.exports = ({ entities }) => {
  console.log('');
  let transformedEntities = entities;
  normalizers.forEach(normalizer => {
    console.log('performing normalizer: '+normalizer.name);
    transformedEntities = normalizer(transformedEntities);
  });
  return transformedEntities;
}