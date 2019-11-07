const express = require('express');
const expenseController = require('../controllers/expensesController');
const authVerify = require('../middleware/auth');

const router = express.Router();

router.post('/postExpenses',authVerify,expenseController.postExpense);
router.post('/postCredits',authVerify,expenseController.postCredit);

router.get('/deleteEverything',authVerify,expenseController.deleteAll);
router.get('/showExpenses',authVerify,expenseController.showExpenses);
router.get('/showCredtis',authVerify,expenseController.showCredits);

module.exports = router;