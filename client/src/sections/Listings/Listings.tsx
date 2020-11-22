import React, { useState } from 'react';
import { server } from '../../lib/api';
import {
  Listing,
  ListingsData,
  DeleteLIstingData,
  DeleteListingVariables,
} from './Types';

const LISTINGS = `
  query Listings {
    listings {
      id
      title 
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING = `
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id ) {
      id
    }
  }
`;

interface Props {
  title: string;
}

export const Listings = (props: Props) => {
  const [listings, setListings] = useState<Listing[] | null>(null);

  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
    setListings(data.listings);
  };

  const deleteListing = async (id: string) => {
    await server.fetch<DeleteLIstingData, DeleteListingVariables>({
      query: DELETE_LISTING,
      variables: {
        id,
      },
    });
    fetchListings();
  };

  const listingsList = listings ? (
    <ul>
      {listings?.map((listing) => {
        return (
          <li key={listing.id}>
            {listing.title}
            <button onClick={() => deleteListing(listing.id)}>
              Delete Listing
            </button>
          </li>
        );
      })}
    </ul>
  ) : null;

  return (
    <div>
      <h2>{props.title}</h2>
      {listingsList}
      <button onClick={fetchListings}>QueryListings</button>
    </div>
  );
};