declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NEXT_PUBLIC_MQTT_URI: string;
    readonly NEXT_PUBLIC_MQTT_CLIENTID: string;
  }
}
