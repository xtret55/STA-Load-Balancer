export default class LoadBalancer {
  // import vite.config;
  // Очень важное примечание к этому заданию: все полезные нагрузки запросов должны быть заменены числовым значением строки. В противном случае задание будет считаться невыполненным.

  constructor(servers, siguiente) {
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
    let total = this.servers.length;

    if (this.siguiente >= total){
      this.siguiente = 0;
    }

    let acumulado = 0
    const server = this.servers[this.siguiente];
    console.log("Mandando a:" + server.id);
    console.log("Peso" + server.power);


    if (this.acumulado < server.power - 1){
      this.acumulado = this.acumulado + 1;
      console.log("Mandando a:" + server.id);
      console.log("Peso" + server.power);
      console.log("Acumulado" + this.acumulado);
    }
    else{
      this.siguiente = this.siguiente + 1;
      console.log("Sumo server");
      this.acumulado = 0;
      console.log("Siguiente" + this.siguiente);
    }
    

    // Envía la petición al servidor y devuelve su respuesta al cliente.
    return sendToServer(server.id);
  }
}
