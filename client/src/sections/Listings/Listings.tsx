import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from 'react-apollo';
import { Alert, Avatar, Button, Spin, List } from 'antd';
import { ListingsSkeleton } from './components';
import { Listings as ListingsData } from './__generated__/Listings';
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables,
} from './__generated__/DeleteListing';

import './styles/Listings.css';

const LISTINGS = gql`
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

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface Props {
  title: string;
}

export const Listings = (props: Props) => {
  const { data, loading, refetch, error } = useQuery<ListingsData>(LISTINGS);

  const [
    deleteListing,
    { loading: deleteListingLoading, error: deletelistingError },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

  const handledeleteListing = async (id: string) => {
    await deleteListing({ variables: { id } });
    refetch();
  };

  const listings = data ? data.listings : null;

  const listingsList = listings ? (
    <List
      itemLayout='horizontal'
      dataSource={listings}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button type='primary' onClick={() => handledeleteListing(item.id)}>
              Delete
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={item.title}
            description={item.address}
            avatar={<Avatar src={item.image} shape='square' size={48} />}
          />
        </List.Item>
      )}
    />
  ) : null;

  if (loading) {
    return (
      <div className='listings'>
        <ListingsSkeleton title={props.title} />
      </div>
    );
  }

  if (error) {
    return (
      <div className='listings'>
        <ListingsSkeleton title={props.title} error />
      </div>
    );
  }

  const deleteListingErrorAlert = deletelistingError ? (
    <Alert
      type='error'
      message='Cannot delete listing, please try again later'
      className='listings-alert'
    />
  ) : null;

  return (
    <div className='listings'>
      <Spin spinning={deleteListingLoading}>
        {deleteListingErrorAlert}
        <h2>{props.title}</h2>
        {listingsList}
      </Spin>
    </div>
  );
};
