import React from 'react';
import { server, useQuery } from '../../lib/api';
import {
  DeleteLIstingData,
  DeleteListingVariables,
  ListingsData,
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
  const { data, loading, refecth, error } = useQuery<ListingsData>(LISTINGS);

  const deleteListing = async (id: string) => {
    await server.fetch<DeleteLIstingData, DeleteListingVariables>({
      query: DELETE_LISTING,
      variables: {
        id,
      },
    });
    refecth();
  };

  const listings = data ? data.listings : null;

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

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>There was an error retrieving the data</h2>;
  }

  return (
    <div>
      <h2>{props.title}</h2>
      {listingsList}
    </div>
  );
};
