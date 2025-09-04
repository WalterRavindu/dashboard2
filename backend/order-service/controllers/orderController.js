// In-memory order list for simplicity
let orders = [
    { id: 1, productId: 1, userId: 1, quantity: 2, status: "Pending" },
    { id: 2, productId: 2, userId: 2, quantity: 1, status: "Completed" }
];

// Get all orders
const getOrders = (req, res) => {
    res.json(orders);
};

// Get order by ID
const getOrderById = (req, res) => {
    const id = parseInt(req.params.id);
    const order = orders.find(o => o.id === id);
    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: "Order not found" });
    }
};

// Create new order
const createOrder = (req, res) => {
    const { productId, userId, quantity, status } = req.body;
    const id = orders.length + 1;
    const newOrder = { id, productId, userId, quantity, status };
    orders.push({message:"Order Created",Order:newOrder});
    res.status(201).json(newOrder);
};

// Update order
const updateOrder = (req, res) => {
    const id = parseInt(req.params.id);
    const { productId, userId, quantity, status } = req.body;
    const order = orders.find(o => o.id === id);
    if (order) {
        order.productId = productId;
        order.userId = userId;
        order.quantity = quantity;
        order.status = status;
        res.json({message:"The Order Updated",Order:order});
    } else {
        res.status(404).json({ message: "Order not found" });
    }
};

// Delete order
const deleteOrder = (req, res) => {
    const id = parseInt(req.params.id);
    const index = orders.findIndex(o => o.id === id);
    if (index !== -1) {
        const deleted = orders.splice(index, 1);
        res.json({message:"order Deleted",Deleted_Order:deleted[0]});
    } else {
        res.status(404).json({ message: "Order not found" });
    }
};

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};
