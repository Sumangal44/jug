import * as http from "node:http";

export interface JugaadRequest {
  jism: string; // body
  url: string;
  tarika: string; // method (GET, POST, etc.)
}

export interface JugaadResponse {
  stithi: (code: number) => JugaadResponse; // status
  jawab: (data: string | object) => void; // send
  json: (data: object) => void; // send JSON
}

type JugaadHandler = (req: JugaadRequest, res: JugaadResponse) => void | Promise<void>;

export class JugaadServer {
  private routes: Map<string, Map<string, JugaadHandler>> = new Map();

  constructor() {
    this.routes.set("GET", new Map());
    this.routes.set("POST", new Map());
    this.routes.set("PUT", new Map());
    this.routes.set("DELETE", new Map());
  }

  // Define GET route
  aao(path: string, handler: JugaadHandler) {
    this.routes.get("GET")?.set(path, handler);
  }

  // Define POST route
  bhejo(path: string, handler: JugaadHandler) {
    this.routes.get("POST")?.set(path, handler);
  }
  
  // Define PUT route
  rakho(path: string, handler: JugaadHandler) {
    this.routes.get("PUT")?.set(path, handler);
  }

  // Define DELETE route
  hatao(path: string, handler: JugaadHandler) {
    this.routes.get("DELETE")?.set(path, handler);
  }

  private handleRequest(req: http.IncomingMessage, res: http.ServerResponse) {
    const method = req.method || "GET";
    // For simplicity in MVP, we just match exact paths ignoring queries
    const url = (req.url || "/").split("?")[0]; 

    const methodRoutes = this.routes.get(method);
    const handler = methodRoutes?.get(url);

    // Read body
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      let currentStatus = 200;

      const jugaadRes: JugaadResponse = {
        stithi: (code: number) => {
          currentStatus = code;
          return jugaadRes;
        },
        jawab: (data: string | object) => {
          res.writeHead(currentStatus, {
            "Content-Type": typeof data === "string" ? "text/plain" : "application/json"
          });
          res.end(typeof data === "string" ? data : JSON.stringify(data));
        },
        json: (data: object) => {
          res.writeHead(currentStatus, { "Content-Type": "application/json" });
          res.end(JSON.stringify(data));
        }
      };

      if (!handler) {
        jugaadRes.stithi(404).jawab("404: Rasta nahi mila (Not Found)");
        return;
      }

      const jugaadReq: JugaadRequest = {
        jism: body,
        url: req.url || "/",
        tarika: method
      };

      try {
        await handler(jugaadReq, jugaadRes);
      } catch (err: any) {
        console.error("🔥 JugaadWeb Error:", err);
        jugaadRes.stithi(500).jawab("500: Server ki halat kharab hai (Internal Server Error)");
      }
    });
  }

  // Start listening
  sunno(port: number, callback?: () => void) {
    const server = http.createServer((req, res) => this.handleRequest(req, res));
    server.listen(port, callback);
    return server;
  }
}

export function banaoServer() {
  return new JugaadServer();
}
