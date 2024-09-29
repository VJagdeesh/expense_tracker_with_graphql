import Transaction from "../models/transaction.model.js";
const transactionResolver = {
  Query: {
    transactions: async (_, __, context) => {
      try {
        if (!context.getUser()) throw new Error("Unautorized");
        const userId = await context.getUser()._id;
        const transactions = await Transaction.find({ userId });
        return transactions;
      } catch (err) {
        console.log(err);
        throw new Error("Error getting transactions");
      }
    },
    transaction: async (_, { transactionId }, context) => {
      try {
        const transaction = await Transaction.findById(transactionId);
        return transaction;
      } catch (err) {
        console.log(err);
        throw new Error("Error getting transactions");
      }
    },
  },
  Mutation: {
    createTransaction: async (parent, { input }, context) => {
      try {
        const newTransaction = new Transaction({
          userId: context.getUser()._id,
          ...input,
        });
        await newTransaction.save();
        return newTransaction;
      } catch (err) {
        console.log(err);
        throw new Error("Error creating transaction");
      }
    },
    updateTransaction: async (parent, { input }, context) => {
      try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
          input.transactionId,
          input,
          { new: true }
        );
        return updatedTransaction;
      } catch (err) {
        console.log(err);
        throw new Error("Error updating transaction");
      }
    },
    deleteTransaction: async (parent, { transactionId }) => {
      try {
        const deletedTransaction = await Transaction.findByIdAndDelete(
          transactionId
        );
        return deletedTransaction;
      } catch (err) {
        console.log(err);
        throw new Error("Error deleting transaction");
      }
    },
  },
};

export default transactionResolver;
