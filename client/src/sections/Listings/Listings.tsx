import React, { FC } from 'react';
import { server } from '../../lib/api';
import {
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
  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
    console.table(data?.listings);
  };
  const deleteListing = async () => {
    const { data } = await server.fetch<
      DeleteLIstingData,
      DeleteListingVariables
    >({
      query: DELETE_LISTING,
      variables: {
        id: '5fb3414c5753101838d8c66d',
      },
    });
    console.log(data);
  };
  return (
    <div>
      <h2>{props.title}</h2>
      <button onClick={fetchListings}>QueryListings</button>
      <button onClick={deleteListing}>Delete a Listing!</button>
    </div>
  );
};
