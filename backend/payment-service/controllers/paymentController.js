let payments = [
    { id: 1, orderId: 101, amount: 1200, status: "Completed" },
    { id: 2, orderId: 102, amount: 800, status: "Pending" }
];

//Get All Payments
const getPayments = (req, res) => {
    res.json(payments);
}



//Get Paymennt By ID
const getPaymentById = (req, res) => {
    const id = parseInt(req.params.id);
    const payment = payments.find(p => p.id === id);
    if (payment) res.json(payment);
    else res.status(404).json({ message: "Payment not found" });
};



const createPayment = (req, res) => {
    const { orderId, amount, status } = req.body;
    const id = payments.length + 1;

    const newPayment = { 
        id, 
        orderId, 
        amount, 
        status };

    payments.push(newPayment);

    res.status(201).json({
        message:"Payment Entry is Created",
        New_Payment_Entry:newPayment
    });
};


//Update Payment By ID
const updatePayment = (req, res) => {
    const id = parseInt(req.params.id);
    const { orderId, amount, status } = req.body;
    const payment = payments.find(p => p.id === id);
    if (payment) {
        payment.orderId = orderId;
        payment.amount = amount;
        payment.status = status;
        res.json({message:"Payment Entry is Updated",Updated_Payment_Entry:payment});


    } else res.status(404).json({ message: "Payment not found" });
};



const deletePayment = (req, res) => {
    const id = parseInt(req.params.id);
    const index = payments.findIndex(p => p.id === id);


    if (index !== -1) {res.json({
        message:"Payment Entry is Deleted",
        Deleted_Payement_Entry:payments.splice(index, 1)[0]
    });

    }else 
        {res.status(404).json({ 
            message: "Payment not found" 
        });
    }

};

module.exports = {
    getPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment
};
