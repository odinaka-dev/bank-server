const Transaction = require("../models/Payments");

// Create a new transaction
exports.transact = async (req, res) => {
  try {
    const { transfer, bankName, bankAccount, remark } = req.body;

    const newTransaction = await Transaction.create({
      transfer,
      bankName,
      bankAccount,
      remark,
    });

    res.status(201).json({
      message: "Transaction successful",
      data: newTransaction,
    });
  } catch (error) {
    console.error("Transaction error:", error);
    res.status(500).json({ error: "Transaction failed" });
  }
};

// Get all past transactions
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Get transactions error:", error);
    res.status(500).json({ message: "Couldn't get all transactions" });
  }
};
