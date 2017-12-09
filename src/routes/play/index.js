/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Board from '../../components/Board';
import Layout from '../../components/Layout';

async function action({ fetch }) {
  return {
    chunks: ['home'],
    title: 'React Starter Kit',
    component: (
      <Layout>
        <Board xPiece="x" oPiece="o" />
      </Layout>
    ),
  };
}

export default action;
