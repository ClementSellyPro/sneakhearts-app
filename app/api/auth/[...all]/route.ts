export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { auth } from "../../../../lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);
