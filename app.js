// // const express = require('express');
// // const mongoose = require('mongoose');
// // const passport = require('passport');
// // const bodyParser = require('body-parser');
// // const session = require('express-session');
// // require('./config/passport'); // include the passport configuration

// // const app = express();

// // app.use(bodyParser.json());

// // app.use(session({ secret: 'yourSecretKey', resave: false, saveUninitialized: false }));
// // app.use(passport.initialize());
// // app.use(passport.session());

// // // MongoDB connection
// // mongoose.connect('mongodb://localhost:27017/yourdbname')
// //   .then(() => console.log('MongoDB connected'))
// //   .catch(err => console.log(err));

// // // Models
// // const BusinessOwner = require('./models/BusinessOwner');
// // const Customer = require('./models/Customer');
// // const Appointment = require('./models/Appointment');

// // // Routes
// // app.use('/api/business-owners', require('./routes/businessOwners'));
// // app.use('/api/customers', require('./routes/customers'));
// // app.use('/api/appointments', require('./routes/appointments'));
// // app.use('/api/auth', require('./routes/auth'));

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const swaggerDocs = require('./config/swagger');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

require('./config/passport'); // include the passport configuration

const app = express();

app.use(bodyParser.json());

app.use(session({ secret: 'yourSecretKey', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
mongoose.connect('mongodb+srv://maayanmalka3697:maayanmalka3697@maayan.yptlels.mongodb.net/?retryWrites=true&w=majority&appName=Maayan')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Models
const BusinessOwner = require('./models/BusinessOwner');
const Customer = require('./models/Customer');
const Appointment = require('./models/Appointment');


// קונפיגורציה של Swagger JSDoc
const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // גרסת OpenAPI שתשמש
    info: {
      title: 'Business Owners API',
      version: '1.0.0',
      description: 'API for managing business owners',
    },
  },
  apis: ['./routes/*.js'], // קבצי הראוטינג שבהם יש Swagger אומץ
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);




// Routes
app.use('/api/business-owners', require('./routes/businessOwners'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/auth', require('./routes/auth'));
// הוספת Swagger middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Swagger setup
swaggerDocs(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));







