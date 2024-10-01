import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";
const transactionResolver = {
  Query: {
    transactions: async (_, __, context) => {
      try {
        if (!context.getUser()) throw new Error("Unauthorized");
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
    categoryStatistics: async (_, __, context) => {
      if (!context.getUser()) throw new Error("Unauthorized");
      const userId = context.getUser()._id;
      const transactions = await Transaction.find({ userId });
      const categoryMap = {};
      transactions.forEach((transaction) => {
        if (!categoryMap[transaction.category]) {
          categoryMap[transaction.category] = 0;
        }
        categoryMap[transaction.category] += transaction.amount;
      });
      return Object.entries(categoryMap).map(([category, total_amount]) => ({
        category,
        total_amount,
      }));
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
  Transaction: {
    user: async (parent) => {
      const userId = parent.userId;
      try {
        const user = await User.findById(userId);
        return user;
      } catch (err) {
        console.log(err);
        throw new Error(err.message || "Error in resolver");
      }
    },
  },
};

export default transactionResolver;
