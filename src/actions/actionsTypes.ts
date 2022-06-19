import { IncomingMessage, ServerResponse } from "http";

export type Callback = (req: IncomingMessage, res: ServerResponse) => Promise<void>;
