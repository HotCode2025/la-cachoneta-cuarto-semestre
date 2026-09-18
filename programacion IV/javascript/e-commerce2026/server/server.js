require('dotenv').config()

const ngrok = require("@ngrok/ngrok");
const express = require("express");
const app = express();
const cors = require("cors");
const { MercadoPagoConfig, Preference } = require('mercadopago');
const path = require('path')

// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

console.log(process.env.MP_ACCESS_TOKEN)


app.use(cors({
  origin: '*',
  allowedHeaders: ['Content-Type', 'ngrok-skip-browser-warning']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../client')));

app.get("/", function (req, res) {
	res.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'))
});

app.post("/create_preference", async (req, res) => {
  try {
    const preference = new Preference(client);

    // Mi dominio estático de ngrok
    const NGROK_URL = "https://fiftieth-hacksaw-iciness.ngrok-free.dev";

    const result = await preference.create({
      body: {
        items: [
          {
            title: req.body.description || "compra de ecommerce",
            unit_price: Number(req.body.price),
            quantity: Number(req.body.quantity),
            currency_id: "ARS", // Cambia a "MXN", "CLP", "BRL", etc. si tu cuenta no es de Argentina
          },
        ],
        back_urls: {
          success: `${NGROK_URL}/`,
          failure: `${NGROK_URL}/`,
          pending: `${NGROK_URL}/`,
        },
        auto_return: "approved",
      },
    });

    res.json({ id: result.id });
  } catch (error) {
    console.log("=== DETALLE DEL ERROR DE MERCADOPAGO ===");
    console.log(JSON.stringify(error, null, 2));
    if (error.cause) {
      console.log("=== CAUSA DEL ERROR ===");
      console.log(JSON.stringify(error.cause, null, 2));
    }
    console.log("=======================================");

    res.status(500).json({ error: "Error al crear la preferencia", detail: error });
  }
});

app.get('/feedback', function (req, res) {
	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
});

const PORT = 8080

app.listen(PORT, () => {
	console.log(`The server is now running on http://localhost:${PORT}`);

  startNgrok()
});


// Esto me sirve para poder tener un dominio publico ejecutando desde local mi servidor
async function startNgrok() {
  try {
    const forwarder = await ngrok.forward({
      addr: PORT, // Pasa la variable del puerto (8085)
      authtoken_from_env: true,
      domain: "fiftieth-hacksaw-iciness.ngrok-free.dev",
    });
    console.log(`Tunel de Ngrok activo en: ${forwarder.url()}`);
  } catch (err) {
    console.error("Error al iniciar Ngrok:", err);
  }
}