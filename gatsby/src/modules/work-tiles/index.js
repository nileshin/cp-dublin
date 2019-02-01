import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';

// NB: This module represents all work, and will handle filtering as well.
class WorkTiles extends Component {
  render() {
    return (
      <div>
        Work Tiles
        {/* Sample work tile output below */}
        <ul>
        {
          this.props.filtered_tiles.map(filteredList => {
            const tiles = filteredList.work_tiles.tiles.map((tile, index) => {
              return (<li key={index}>
                <Link to={`/${tile.work_piece.post_type}/${tile.work_piece.post_name}`}>{tile.override_fields.client_name} - {tile.override_fields.project_title}</Link>
              </li>)
            });

            return (<li key={filteredList.filter_name}>
              {filteredList.filter_name}
              <ul>
                {tiles}
              </ul>
            </li>)
          })
        }
        </ul>
        <pre><code>{JSON.stringify(this.props, null, 1)}</code></pre>
      </div>
    );
  }
}

export default WorkTiles;

export const workTilesFragment = graphql`
  fragment WorkTilesFragment on workTiles_7 {
    filtered_tiles {
      filter_name
      work_tiles {
        tiles {
          work_piece {
            post_name
            post_type
            acf {
              client_name
              rich_media_header {
                rich_media_header {
                  project_title
                }
              }
            }
          }
          cta_text
          override_fields {
            client_name
            project_title
          }
          image {
            ...WpMediaFragment
          }
        }
      }
    }
  }
`