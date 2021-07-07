"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    const { name, phone, email, company, message } = ctx.request.body;
    console.log(name, phone, email);
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services["user-inquiry"].create(data, { files });
    } else {
      entity = await strapi.services["user-inquiry"].create(ctx.request.body);
    }
    await strapi.plugins["email"].services.email.send({
      to: "yesrebosmani@gmail.com",
      from: email,
      subject: "Customer Enquiry for Navisa",
      html: `<p>${message}</p>
            <br />
            <div>Phone: ${phone}</div>
            <div>Email: ${email}</div>
            <div>Company: ${company}</div>`,
    });

    return sanitizeEntity(entity, {
      model: strapi.models["user-inquiry"],
    });
  },
};
