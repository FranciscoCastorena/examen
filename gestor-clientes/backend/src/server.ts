import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import clientesRoutes from './clientes.routes';
import { errorHandler } from './errores';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/clientes', clientesRoutes);

app.get('/', (req, res) => {
  res.json({ message: `Servidor corriendo en http://localhost:${PORT}` });
});

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Ruta no encontrada' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
