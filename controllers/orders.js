import { error } from "node:console";
import sql from "../utils/dbManager.js";


export async function createOrder(req, res) {
  const conn = req.mysqlDbConn;
  const {productId, quantity, customerName} = req.body
  const product = await fetch(`http://localhost:8000/api/products/${productId}`)
  console.log(await product.json())
  // await sql.insertInto(conn, "orders", [], []);
}
export async function getOrders(req, res) {
  const conn = req.mysqlDbConn;
  const [orders] = await conn.query("SELECT * FROM orders;");
  res.json({ orders: orders });
}

export async function getOrderById(req, res) {
  const id = req.params.id;
  const conn = req.mysqlDbConn;
  const [result] = await conn.query(
    `
    SELECT * FROM orders
    WHERE id = ?
    `,
    [id]
  );
  if (!result.length) {
    res.status(404).json({ error: "not found" });
    return;
  }
  res.json({ order: result });
}
