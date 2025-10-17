// Registre UMA vez em toda a app
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

let _registered = false;

export function ensureChartsRegistered() {
  if (_registered) return;
  ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
  _registered = true;
}
