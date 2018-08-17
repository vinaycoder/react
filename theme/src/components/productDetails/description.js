import React from 'react';
import * as helper from '../../lib/helper';
import { themeSettings, text } from '../../lib/settings';

class Description extends React.Component{

	render(){
		return(
      <div className="columns">
        <div className="column is-4">
            <div class="productTestMobItem">
              <h3>Directly from Manufacturer</h3>
              <p>No more bad quality. Get the best quality every time you shop from us, because we source directly from the manufacturer.</p>
           </div>
        </div>

        <div className="column is-4">
              <div class="productTestMobItem">
                 <h3>14 Days Return Policy</h3>
                   <p>No Questions Asked Return,
                    IndiaRush will ensure a quick, easy and seamless returns experience for you.
                    </p>
             </div>
        </div>
        <div className="column is-4">
          <div class="productTestMobItem">
              <h3>Shop with confidence!</h3>
              <p>IndiaRush source directly from manufacturers in offering Genuine Product at cheaper prices than your local shops.</p>
          </div>
        </div>
      </div>

		);
	}

}
export default Description;
