/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../components/Layout';
import ItineraryListPage from './ItineraryListPage';
import { JSON_API_URL } from '../../constants/env';

const title = 'Audioguide'; // @todo make it translatable

async function action({ locale, fetch }) {
  const drupalLocale = locale.substring(0, 2); // @todo improve

  // Fetch the localized terms.
  // Sort by weight is the default value, but we keep this one explicitly.
  const endpoint = `${JSON_API_URL}/${drupalLocale}/jsonapi/taxonomy_term/audio_itinerary?filter[field_is_parent][value]=1&filter[langcode][value]=${drupalLocale}&sort=weight&include=field_image,field_background_image`;
  // const terms = await fetch(endpoint).then(response => response.json());
  const response = await fetch(endpoint, { method: 'GET' });
  const terms = await response.json();

  return {
    chunks: ['itineraries'],
    title,
    component: (
      <Layout>
        <ItineraryListPage title={title} itineraries={terms} />
      </Layout>
    ),
  };
}

export default action;
