/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { GraphQLList as List } from 'graphql';
import fetch from 'node-fetch';
import NewsItemType from '../types/NewsItemType';

// React.js News Feed (RSS)

const redditUrl = `https://www.reddit.com/r/TrueTicTacToe/new.json`;

let items = [];
let lastFetchTask;
let lastFetchTime = new Date(1970, 0, 1);

const news = {
  type: new List(NewsItemType),
  resolve() {
    if (lastFetchTask) {
      return lastFetchTask;
    }
    if (new Date() - lastFetchTime > 1000 * 60 * 10 /* 10 mins */) {
      lastFetchTime = new Date();
      lastFetchTask = fetch(redditUrl)
        .then(response => {
          return response.json();
        })
        .then(data => {
          items = data.data.children.map(dataItem => ({
            title: dataItem.data.title,
            pubDate: Date.now().toString(),
            link: `http://reddit.com/${dataItem.data.permalink}`,
            guid: dataItem.data.permalink,
            author: dataItem.data.name,
            thumbnail: dataItem.data.thumbnail,
            description: dataItem.data.selftext_html,
            content: dataItem.data.selftext_html,
          }));

          lastFetchTask = null;
          return items;
        })
        .catch(err => {
          lastFetchTask = null;
          throw err;
        });

      if (items.length) {
        return items;
      }

      return lastFetchTask;
    }

    return items;
  },
};

export default news;
