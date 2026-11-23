export default class LoadBalancer {
  // import vite.config;
  // Очень важное примечание к этому заданию: все полезные нагрузки запросов должны быть заменены числовым значением строки. В противном случае задание будет считаться невыполненным.

  constructor(servers) {
    // Ejemplo de un servidor:
    // {
    //   id: "server-2",
    //   power: 3,          // Unidades de trabajo por segundo simulado
    //   activeRequest: { id: "P01", payload: "08319462", work: 4 }, // null si está libre
    //   queuedRequests: [{ id: "P02", payload: "74150328", work: 2 }],
    //   activeProgress: 0.25 // Progreso de 0 a 1 (0 si está libre)
    // }
    // Los datos son de solo lectura y se actualizan durante la simulación.
    this.servers = servers;
    this.siguiente = 0;
    this.acumulado = 0
  }

  async onRequestArrival(request, sendToServer) {
    // Ejemplo de la petición que llega:
    // {
    //   id: "request-17",
    //   payload: "08319462", // Datos que envía el cliente
    //   work: 4              // Unidades de trabajo necesarias
    // }
    let extra = 0;
    let conexiones = [];
    for (const i in this.servers){
      if (this.servers[i].activeRequest != null){
        extra = 1;
      }
      conexiones = conexiones + (this.servers[i].queuedRequests.length + extra);
      extra = 0;
    }

    let minimo = Infinity;
    this.siguiente = 0;

    console.log("Conexiones" + conexiones);

    for (const j in conexiones){
      if(minimo > conexiones[j]){
        minimo = conexiones[j];
        this.siguiente = j;
      }
    }
    const server = this.servers[this.siguiente];
    // Envía la petición al servidor y devuelve su respuesta al cliente.
    return sendToServer(server.id);
  }
}