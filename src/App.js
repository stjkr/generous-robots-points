import './App.css';
import React, { useEffect, useState } from 'react';
import Logo from './logo.png'
import LogoBig from './logoBig.png'
import Point from './point.png'


function App() {
  const [listings, setListings] = useState([]);
  const [listingsLoaded, setisListingsLoaded] = useState(false);

  useEffect(() => {
    load(0);
  }, []);

  const load = (start) => {
    fetch(`https://gr-api.trackpoints.xyz/listings/start=${start}`)
      .then(response => response.json())
      .then(data => {
        const sortedData = data.sort((a, b) => a.price - b.price);
        setListings(sortedData);
        setisListingsLoaded(true);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const search = () => {
    const tkn = document.getElementById('search-input').value;

    if (tkn !== '') {
      fetch(`https://gr-api.trackpoints.xyz/token/tkn=${tkn}`)
        .then(response => response.text())
        .then(data => {
          const response = data;
          const tr = document.createElement('tr');
          const td1 = document.createElement('td');
          const a1 = document.createElement('a');
          a1.href = `https://magiceden.io/item-details/${tkn}`;
          a1.target = '_blank';
          a1.innerText = `${tkn.substr(0, 3)}...${tkn.substr(41, 44)}`;
          td1.appendChild(a1);

          const td3 = document.createElement('td');
          td3.innerText = response;

          if (response !== 'Unknown.') {
            const point = document.createElement('img');
            point.src = Point;
            td3.appendChild(point);
          }

          tr.appendChild(td1);
          tr.appendChild(td3);
          document.getElementById('search-tbody').appendChild(tr);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  const renderListings = () => {
    return listings.map(listing => (
      <tr key={listing.tkn}>
        <td>
          <a href={`https://magiceden.io/item-details/${listing.tkn}`} target="_blank">
            {`${listing.tkn.substr(0, 3)}...${listing.tkn.substr(41, 44)}`}
          </a>
        </td>
        <td>◎{listing.price.toFixed(2)}</td>
        <td>
          {String(listing.points).padStart(2, '0')}
          {listing.points !== 'Unknown.' && (
            <img src={Point} alt="point" />
          )}

        </td>
      </tr>
    ));
  };

  return (
    <div>

      {listingsLoaded ? (
        <div>
          <div className="header">
            <div className="logo">
              <a href="https://app.generousrobots.com" target="_blank">
                <img src={LogoBig} />
              </a>
            </div>
          </div>
          <section className="main">
            <div className="top">
              <h1> Current Listings </h1>
              <table id="table">
                <thead>
                  <tr>
                    <th>Robot</th>
                    <th>Price</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody id="tbody">
                  {renderListings()}
                </tbody>
              </table>
            </div>
            <div className="bottom">
              <h1> Search for a Specific Robot</h1>
              <div className="search"><input placeholder="Enter the mint address." id="search-input" /><button onClick={search}>Search</button></div>
              <table id="search-table">
                <thead>
                  <tr>
                    <th>Robot</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody id="search-tbody">

                </tbody>
              </table>
            </div>
            {/* <div className="box" /> */}
          </section>
          {/* <div className="footer">
            <a href="https://twitter.com/stjpg_" target="_blank">Made by stjkr.</a>
          </div> */}
        </div>
      ) : (
        <div className="loading" id="loading">
          <img src={Logo} />
        </div>
      )}
    </div>
  )
};

export default App;
