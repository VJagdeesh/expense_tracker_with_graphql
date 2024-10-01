import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
      _id
      userId
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;

export const GET_TRANSACTION = gql`
  query GetTransaction($input: ID!) {
    transaction(transactionId: $input) {
      _id
      userId
      description
      paymentType
      category
      amount
      location
      date
      user {
        name
        username
      }
    }
  }
`;

export const GET_TRANSACTION_STATISTICS = gql`
  query GetTransactionStatistics {
    categoryStatistics {
      total_amount
      category
    }
  }
`;
