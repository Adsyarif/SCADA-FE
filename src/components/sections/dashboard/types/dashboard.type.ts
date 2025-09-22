export interface SystemData {
  kode: string;
  namaInjector: string;
  lokasiInjector: string;
  namaMesin: string;
  flowLine: number;
  settingPress: number;
  tankCap: number;
  status: "normal" | "warning" | "danger";
  temperature: number;
  pressure: number;
  batteryLevel: number;
  lastUpdate: string;
}

export interface DashboardProps {
  session: any;
  userName?: string | null;
}
