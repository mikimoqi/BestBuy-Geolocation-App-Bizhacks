const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const axios = require("axios");
const sendGrid = require("@sendgrid/mail");
require("dotenv").config();
// sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

var customer;
var customerID = 0;
var state = {
  customers: [],
};

const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use(express.json()); //req.body

const sendMail = true;

//update state customers
app.post("/sendEmail", (req, res) => {
  const { mins, location, items, id } = req.body;
  if (mins <= 15) {
    customer = {
      time: mins,
      place: location,
      pickup: items,
      custId: id,
    };
    state.customers.push(customer);
    console.log(customers + "line 38");
    let custSend = {
      time: state.customers[customerID].time,
      place: state.customers[customerID].place,
      pickup: state.customers[customerID].pickup,
      custId: state.customers[customerID].custId,
    };
    customerID++;
  }
});

app.get("/send", (req, res) => {
  res.send(
    state.customers.map((customer) => {
      let custSend = {
        time: customer.time,
        place: customer.place,
        pickup: customer.pickup,
        custId: customer.custId,
      };
      console.log(state.customers + "line58");
      return custSend;
    })
  );
});

app.post("/sendParkingInfo", async (req, res) => {
  console.log(req.body);
  console.log(state.customers);
  const { id, parkingLot, description } = req.body;
  state.customers[id].time = "checked in";
  console.log(state.customers[id].time);
});

// sendGrid.send(msg)
//     .then(result => {
//         sendMail = false;
//         console.log("sent email!")
//         res.status(200).json({
//             success: true
//         });

//     })
//     .catch(err => {

//       console.log('error: ', err.response.body);
//       res.status(401).json({
//           success: false
//       });

//   });

// });
// app.post("/sendParkingInfo", async (req, res) => {
//   console.log(req.body);
//   const {id,parkingLot,description} = req.body

// const msg = {
//   to: "corbynkwan@gmail.com",
//   from: "corbynkwan@gmail.com",
//   subject: `Customer ${id} has arrived in ${parkingLot}!`,
//   text: `Parking Lot: ${parkingLot}
// Description: ${description}`,
// };

//     sendGrid.send(msg)
//         .then(result => {
//             console.log("sent email!")
//             res.status(200).json({
//                 success: true
//             });

//         })
//         .catch(err => {
//           console.log('error: ', err);
//           res.status(401).json({
//               success: false
//           });

//       });

// });
// app.post("/calculate", async (req, res) => {
//   const {latitude,longitude,location,items,id} = req.body
//   //console.log({latitude,longitude,location,items,id})
//   if(longitude !=undefined && latitude !=undefined && location!=undefined && items!=undefined && id!=undefined){
//     //console.log("not undefined",{latitude,longitude,location,items,id})
//     console.log({latitude,longitude})
//     await axios({
//     method: 'get',
//     url: `https://maps.googleapis.com/maps/api/directions/json?origin=${latitude},${longitude}&destination=best%20buy%20${location}&key=${process.env.GOOGLE_API_KEY}}`
//   }).then(async function (response) {
//       response
//   }
//     .then(async function (response) {
//       if(sendMail){
//       await axios.put(`https://bestbuy-database-default-rtdb.firebaseio.com/orders/${id}.json`, {id, location,items,timeRemaining: response.data.routes[0].legs[0].duration.text});
//       let mins = response.data.routes[0].legs[0].duration.text.replace(/\D/g,'');
//       console.log(mins+ " mins away");
//       if(mins < 15) {
//         const msg = {
//             to: 'corbynkwan@gmail.com',
//             from: "corbynkwan@gmail.com",
//             subject: `Customer ${id} is coming to ${location} in ${mins} minutes to buy ${items}!`,
//             text: `I'm coming in ${mins} minutes!`
//         }

//         sendGrid.send(msg)
//             .then(result => {
//                 sendMail = false;
//                 res.status(200).json({
//                     success: true
//                 });

//             })
//             .catch(err => {

//               console.log('error: ', err.response.body);
//               res.status(401).json({
//                   success: false
//               });

//           });
//       }
//     }
//       //res.status(200).json(response.data.routes[0].legs[0].duration.text)

//     })
//     .catch(err => {

//       console.log('error: ', err.response.body);
//       console.log("too far away")

//   });
//   }
// });

//get, put, post, delete stuff
app.listen(5000, () => {
  console.log("server has started on port 5000");
});
