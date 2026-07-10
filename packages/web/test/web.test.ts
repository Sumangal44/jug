import { describe, it, expect, vi } from "vitest";
import { banaoServer } from "../src/index";
import * as http from "node:http";
import { EventEmitter } from "node:events";

describe("@jugaad/web - Framework", () => {
  it("should create a server instance", () => {
    const app = banaoServer();
    expect(app).toBeDefined();
    expect(typeof app.sunno).toBe("function");
  });

  it("should register routes and handle requests", () => {
    const app = banaoServer();
    
    // Mock the handler
    const getHandler = vi.fn((req, res) => {
      res.stithi(200).jawab("GET Hello");
    });
    
    app.aao("/hello", getHandler);

    // We can simulate a request by pulling out the handleRequest method,
    // but handleRequest is private. We can access it via (app as any).
    const req = new EventEmitter() as any;
    req.method = "GET";
    req.url = "/hello";

    const res = {
      writeHead: vi.fn(),
      end: vi.fn()
    } as any;

    (app as any).handleRequest(req, res);
    
    // Simulate end of request data
    req.emit("end");

    expect(getHandler).toHaveBeenCalled();
    expect(res.writeHead).toHaveBeenCalledWith(200, { "Content-Type": "text/plain" });
    expect(res.end).toHaveBeenCalledWith("GET Hello");
  });

  it("should return 404 for unknown routes", () => {
    const app = banaoServer();

    const req = new EventEmitter() as any;
    req.method = "GET";
    req.url = "/unknown";

    const res = {
      writeHead: vi.fn(),
      end: vi.fn()
    } as any;

    (app as any).handleRequest(req, res);
    req.emit("end");

    expect(res.writeHead).toHaveBeenCalledWith(404, { "Content-Type": "text/plain" });
    expect(res.end).toHaveBeenCalledWith("404: Rasta nahi mila (Not Found)");
  });
});
