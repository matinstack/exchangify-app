"use server";

import { db } from "@/db";
import { getSession } from "@/lib/auth-helpers";
import { createAction } from "@/lib/errors/error-handler";
import { contactSupportSchema } from "@/schema/help-and-support";

export const contactSupportAction = createAction(
  async (values: contactSupportSchema) => {
    const session = await getSession();

    const id = session.user.id;

    // await db.insert(table);
  },
);
