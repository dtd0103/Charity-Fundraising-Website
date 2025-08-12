const express = require("express");
const cors = require("cors");
const JSend = require("./jsend");
const { specs, swaggerUi } = require("./docs/swagger");
const userRouter = require("./routes/user.route");
const campaignRouter = require("./routes/campaign.route");
const categoryRouter = require("./routes/category.route");
const donationRouter = require("./routes/donation.route");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));
app.get("/", (req, res) => {
    return res.json(JSend.success());
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

userRouter.setup(app);
campaignRouter.setup(app);
categoryRouter.setup(app);
donationRouter.setup(app);

module.exports = app;
